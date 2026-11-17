using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public class PristineMatteProcessor {
    public static void ProcessImage(
        string inputJpg, 
        string outputPng, 
        int bgThreshold, 
        int featherWidth,
        int minColorDiff
    ) {
        using (Bitmap src = new Bitmap(inputJpg)) {
            int w = src.Width;
            int h = src.Height;
            
            BitmapData srcData = src.LockBits(
                new Rectangle(0, 0, w, h), 
                ImageLockMode.ReadOnly, 
                PixelFormat.Format32bppRgb
            );
            
            int stride = srcData.Stride;
            byte[] srcBuf = new byte[stride * h];
            Marshal.Copy(srcData.Scan0, srcBuf, 0, srcBuf.Length);
            src.UnlockBits(srcData);
            
            // 1. Identify Background via Exterior Flood Fill (BFS)
            bool[,] isExteriorBg = new bool[w, h];
            byte[,] alphaMap = new byte[w, h];
            Queue<Point> q = new Queue<Point>();
            
            // Initialize BFS from all 4 borders
            for (int x = 0; x < w; x++) {
                q.Enqueue(new Point(x, 0));
                q.Enqueue(new Point(x, h - 1));
                isExteriorBg[x, 0] = true;
                isExteriorBg[x, h - 1] = true;
            }
            for (int y = 0; y < h; y++) {
                if (!isExteriorBg[0, y]) {
                    q.Enqueue(new Point(0, y));
                    isExteriorBg[0, y] = true;
                }
                if (!isExteriorBg[w - 1, y]) {
                    q.Enqueue(new Point(w - 1, y));
                    isExteriorBg[w - 1, y] = true;
                }
            }
            
            int[] dx = new int[] { -1, 1, 0, 0 };
            int[] dy = new int[] { 0, 0, -1, 1 };
            
            while (q.Count > 0) {
                Point p = q.Dequeue();
                
                for (int i = 0; i < 4; i++) {
                    int nx = p.X + dx[i];
                    int ny = p.Y + dy[i];
                    
                    if (nx >= 0 && nx < w && ny >= 0 && ny < h && !isExteriorBg[nx, ny]) {
                        int idx = ny * stride + nx * 4;
                        byte b = srcBuf[idx];
                        byte g = srcBuf[idx + 1];
                        byte r = srcBuf[idx + 2];
                        
                        int bright = (r + g + b) / 3;
                        int maxC = Math.Max(r, Math.Max(g, b));
                        int minC = Math.Min(r, Math.Min(g, b));
                        int diff = maxC - minC;
                        
                        // Condition to continue exterior background traversal:
                        // Either brightness is above bgThreshold, OR it's neutral light gray (low color difference)
                        bool isBg = false;
                        if (bright >= bgThreshold) {
                            isBg = true;
                        } else if (bright >= (bgThreshold - featherWidth) && diff <= minColorDiff) {
                            isBg = true;
                        }
                        
                        if (isBg) {
                            isExteriorBg[nx, ny] = true;
                            q.Enqueue(new Point(nx, ny));
                        }
                    }
                }
            }
            
            // 2. Compute Alpha Map with Anti-Aliasing
            int minX = w, maxX = 0, minY = h, maxY = 0;
            
            for (int y = 0; y < h; y++) {
                for (int x = 0; x < w; x++) {
                    int idx = y * stride + x * 4;
                    byte b = srcBuf[idx];
                    byte g = srcBuf[idx + 1];
                    byte r = srcBuf[idx + 2];
                    
                    if (isExteriorBg[x, y]) {
                        // Fully transparent exterior
                        alphaMap[x, y] = 0;
                    } else {
                        // Check distance to exterior background for smooth edge anti-aliasing
                        int bright = (r + g + b) / 3;
                        int maxC = Math.Max(r, Math.Max(g, b));
                        int minC = Math.Min(r, Math.Min(g, b));
                        int diff = maxC - minC;
                        
                        byte a = 255;
                        if (bright >= bgThreshold - featherWidth && diff <= minColorDiff) {
                            // Soft edge feathering
                            double t = (double)(bgThreshold - bright) / (double)featherWidth;
                            if (t < 0.0) t = 0.0;
                            if (t > 1.0) t = 1.0;
                            a = (byte)(t * 255);
                        }
                        
                        alphaMap[x, y] = a;
                        
                        if (a > 20) {
                            if (x < minX) minX = x;
                            if (x > maxX) maxX = x;
                            if (y < minY) minY = y;
                            if (y > maxY) maxY = y;
                        }
                    }
                }
            }
            
            if (minX > maxX || minY > maxY) {
                Console.WriteLine("Warning: No foreground found for " + inputJpg);
                minX = 100; maxX = w - 100; minY = 100; maxY = h - 100;
            }
            
            // 3. Render cropped, centered, transparent square PNG
            int objW = maxX - minX + 1;
            int objH = maxY - minY + 1;
            int pad = 24;
            
            int side = Math.Max(objW, objH) + pad * 2;
            int destX = (side - objW) / 2;
            int destY = (side - objH) / 2;
            
            using (Bitmap result = new Bitmap(side, side, PixelFormat.Format32bppArgb)) {
                BitmapData resData = result.LockBits(
                    new Rectangle(0, 0, side, side), 
                    ImageLockMode.WriteOnly, 
                    PixelFormat.Format32bppArgb
                );
                
                int resStride = resData.Stride;
                byte[] resBuf = new byte[resStride * side];
                
                // Copy with exact alpha
                for (int y = 0; y < objH; y++) {
                    int srcY = minY + y;
                    for (int x = 0; x < objW; x++) {
                        int srcX = minX + x;
                        
                        int outX = destX + x;
                        int outY = destY + y;
                        
                        int inIdx = srcY * stride + srcX * 4;
                        int outIdx = outY * resStride + outX * 4;
                        
                        byte a = alphaMap[srcX, srcY];
                        byte b = srcBuf[inIdx];
                        byte g = srcBuf[inIdx + 1];
                        byte r = srcBuf[inIdx + 2];
                        
                        resBuf[outIdx] = b;
                        resBuf[outIdx + 1] = g;
                        resBuf[outIdx + 2] = r;
                        resBuf[outIdx + 3] = a;
                    }
                }
                
                Marshal.Copy(resBuf, 0, resData.Scan0, resBuf.Length);
                result.UnlockBits(resData);
                
                result.Save(outputPng, ImageFormat.Png);
                Console.WriteLine(string.Format("Saved pristine PNG: {0} ({1}x{2})", outputPng, side, side));
            }
        }
    }
}
