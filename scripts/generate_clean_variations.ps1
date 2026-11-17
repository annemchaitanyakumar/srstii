Add-Type -AssemblyName System.Drawing

$target = "c:\Users\chait\Downloads\LOVE\public\assets\particles"

# Clean up any tmp files first
Get-ChildItem -Path $target -Filter "*.tmp.png" | Remove-Item -Force -ErrorAction SilentlyContinue

$flavors = @("groundnut", "coconut", "mustard", "black-sesame", "ghee", "olives")
$rotations = @(0, 45, 90, 150, 220)
$flips = @($false, $true, $false, $true, $false)

foreach ($fl in $flavors) {
    # Only groundnut has two distinct pristine images (pod and split kernel)
    # The others only use their pristine -0.png as the master!
    $base0 = Join-Path $target "$fl-0.png"
    $base1 = if ($fl -eq "groundnut") { Join-Path $target "groundnut-1.png" } else { $null }
    
    $bytes0 = [System.IO.File]::ReadAllBytes($base0)
    $ms0 = New-Object System.IO.MemoryStream(,$bytes0)
    $src0 = [System.Drawing.Image]::FromStream($ms0)
    
    $src1 = $null
    $ms1 = $null
    if ($base1 -ne $null -and (Test-Path $base1)) {
        $bytes1 = [System.IO.File]::ReadAllBytes($base1)
        $ms1 = New-Object System.IO.MemoryStream(,$bytes1)
        $src1 = [System.Drawing.Image]::FromStream($ms1)
    }
    
    # Store bitmaps in memory first before writing
    $results = @()
    
    for ($i = 0; $i -lt 5; $i++) {
        $srcImg = if ($src1 -ne $null -and ($i % 2 -eq 1)) { $src1 } else { $src0 }
        
        $angle = $rotations[$i]
        $doFlip = $flips[$i]
        
        $w = $srcImg.Width
        $h = $srcImg.Height
        
        # Calculate diagonal canvas to ensure zero corner clipping when rotated
        $diag = [int][math]::Ceiling([math]::Sqrt($w * $w + $h * $h)) + 40
        
        $dest = New-Object System.Drawing.Bitmap($diag, $diag, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $g = [System.Drawing.Graphics]::FromImage($dest)
        $g.Clear([System.Drawing.Color]::Transparent)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        
        # Center transform on the diagonal canvas
        $g.TranslateTransform($diag / 2, $diag / 2)
        if ($angle -ne 0) {
            $g.RotateTransform($angle)
        }
        if ($doFlip) {
            $g.ScaleTransform(-1, 1)
        }
        $g.TranslateTransform(-$w / 2, -$h / 2)
        
        $g.DrawImage($srcImg, 0, 0, $w, $h)
        $g.Dispose()
        
        $results += $dest
    }
    
    # Dispose source images so files can be replaced
    $src0.Dispose()
    $ms0.Dispose()
    if ($src1 -ne $null) {
        $src1.Dispose()
        $ms1.Dispose()
    }
    
    # Now write all 5 variation files
    for ($i = 0; $i -lt 5; $i++) {
        $outFile = Join-Path $target "$fl-$i.png"
        if (Test-Path $outFile) { Remove-Item $outFile -Force }
        $results[$i].Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
        $results[$i].Dispose()
        Write-Host "Pristine variation written: $fl-$i.png"
    }
}

Write-Host "All variations generated with diagonal clearance!"
