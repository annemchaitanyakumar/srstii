import { useEffect, useRef } from "react";

const VS = `attribute vec2 p;
void main() {
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FS = `precision highp float;
uniform vec2 uResolution;
uniform vec2 uCenters[4];
uniform float uTimes[4];
uniform float uStrengths[4];

// Overhead natural directional light source
const vec3 LD = vec3(-0.35, 0.65, 0.68);

void main() {
  vec2 coord = gl_FragCoord.xy;
  float totalDhx = 0.0;
  float totalDhy = 0.0;
  float totalH = 0.0;
  float maxAlpha = 0.0;

  for (int i = 0; i < 4; i++) {
    if (uStrengths[i] < 0.01) continue;
    float t = uTimes[i];
    if (t < 0.0 || t > 1.0) continue;

    vec2 delta = coord - uCenters[i];
    float dist = length(delta);
    // High-efficiency distance culling: discard calculations outside wave envelope radius
    if (dist > 460.0) continue;

    // Ultra-slow, serene liquid expansion (zen slow-motion)
    float speed = 75.0;
    float front = t * speed;
    float dDist = dist - front;

    // Massive, giant rolling water wave (wavelength 380px: majestic single swell)
    float wavelength = 380.0;
    float phase = dDist / wavelength * 6.28318;
    float packetWidth = 120.0 + t * 260.0; // Naturally blooms outward from touch point

    // Smooth asymmetric wave envelope
    float ahead = max(dDist, 0.0);
    float behind = min(dDist, 0.0);
    float envDist = (ahead * 1.4 + abs(behind) * 0.7) / packetWidth;

    // Organic liquid attack and release:
    // Starts at exact 0.0 (no sudden pop), blooms into full swell, then gently settles to exact 0.0 (no sudden cutoff)
    float easeIn = smoothstep(0.0, 0.22, t);
    float easeOut = smoothstep(1.0, 0.58, t);
    float envTime = easeIn * easeOut;

    float envelope = exp(-envDist * envDist * 0.7) * envTime * uStrengths[i];
    float wave = cos(phase) * envelope;

    // Massive, calm central fluid swell (starts and ends at exact 0.0)
    float coreDist = dist / 140.0;
    float coreEnv = exp(-coreDist * coreDist) * envTime * uStrengths[i];
    float core = -sin(t * 3.14159) * coreEnv * 1.2;

    float h = wave * 2.5 + core * 1.3;
    totalH += h;

    // Exact analytical spatial derivatives for physical surface normals
    float dEnv = -1.4 * (dDist / (packetWidth * packetWidth)) * envelope;
    float dWave = (-sin(phase) * (6.28318 / wavelength) * envelope + cos(phase) * dEnv) * 2.5;
    float dCore = (-2.0 * dist / (140.0 * 140.0) * core) * 1.3;
    float dhdr = dWave + dCore;

    vec2 dir = dist > 0.001 ? delta / dist : vec2(0.0);
    totalDhx += dhdr * dir.x;
    totalDhy += dhdr * dir.y;

    float slope = abs(dhdr);
    float alphaContrib = (abs(h) * 1.4 + slope * 26.0) * envTime;
    maxAlpha = max(maxAlpha, alphaContrib);
  }

  if (maxAlpha < 0.002) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Physical 3D surface normal from wave gradients (smooth, broad)
  vec3 N = normalize(vec3(-totalDhx * 22.0, -totalDhy * 22.0, 1.0));
  vec3 L = normalize(LD);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 R = reflect(-V, N);

  // Wide, silky caustic crest sheen for a massive rolling wave
  float spec = pow(max(dot(R, L), 0.0), 16.0) * 1.6;
  float broadSpec = pow(max(dot(R, L), 0.0), 4.0) * 0.5;

  // Physical Fresnel reflection for pure clear water (index of refraction ~ 1.33)
  float nv = max(dot(N, V), 0.0);
  float F = 0.02 + 0.98 * pow(1.0 - nv, 3.5);

  // Subtle refraction shadow in the wave trough (light deflection)
  float lightDot = dot(N, L);
  float slopeMag = length(vec2(totalDhx, totalDhy));
  float troughShadow = smoothstep(0.48, -0.25, lightDot) * clamp(slopeMag * 24.0, 0.0, 1.0) * 0.28;

  // 100% TRANSPARENT WATER: ZERO GREEN, ZERO COLOR PIGMENT
  // Pure brilliant white highlights for crests, soft crystal glass rim, subtle neutral refraction in troughs
  vec3 highlightCol = vec3(1.0, 1.0, 1.0);
  vec3 shadowCol = vec3(0.08, 0.10, 0.14); // Delicate neutral refraction depth

  float highlight = spec * 1.1 + broadSpec * 0.8 + F * 0.4;
  vec3 rgb = mix(highlightCol, shadowCol, troughShadow / (highlight + troughShadow + 0.001));

  // Transparent alpha: underlying page content (cards, images, text) remains completely visible!
  float alpha = clamp(highlight * 0.8 + troughShadow * 0.35, 0.0, 0.88);

  if (alpha < 0.001) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Premultiplied alpha: crystal-clear transparent water overlay
  gl_FragColor = vec4(rgb * alpha, alpha);
}`;

interface RippleItem {
  x: number;
  y: number;
  startTime: number;
  strength: number;
}

export function WaterTouchRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const pr = gl.createProgram()!;
    gl.attachShader(pr, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    gl.useProgram(pr);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const locP = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(locP);
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(pr, "uResolution");
    const uCenters = gl.getUniformLocation(pr, "uCenters");
    const uTimes = gl.getUniformLocation(pr, "uTimes");
    const uStrengths = gl.getUniformLocation(pr, "uStrengths");

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(window.innerWidth * dpr);
      canvas!.height = Math.round(window.innerHeight * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    window.addEventListener("resize", resize);

    const activeRipples: RippleItem[] = [];
    let animId = 0;
    let isRunning = false;

    function renderLoop(now: number) {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      const centersArr: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
      const timesArr: number[] = [-1, -1, -1, -1];
      const strengthsArr: number[] = [0, 0, 0, 0];

      let anyActive = false;

      // Filter and populate up to 4 ripples (active for exactly 1.0 second)
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const rip = activeRipples[i]!;
        const elapsed = (now - rip.startTime) / 1000;
        if (elapsed > 1.0) {
          activeRipples.splice(i, 1);
        }
      }

      for (let i = 0; i < Math.min(4, activeRipples.length); i++) {
        const rip = activeRipples[i]!;
        const elapsed = (now - rip.startTime) / 1000;
        centersArr[i * 2] = rip.x * dpr;
        centersArr[i * 2 + 1] = rip.y * dpr;
        timesArr[i] = elapsed;
        strengthsArr[i] = rip.strength;
        anyActive = true;
      }

      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      if (anyActive) {
        gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
        gl!.uniform2fv(uCenters, new Float32Array(centersArr));
        gl!.uniform1fv(uTimes, new Float32Array(timesArr));
        gl!.uniform1fv(uStrengths, new Float32Array(strengthsArr));

        // Hardware scissor rect: restrict GPU rasterization to the union bounding box of active ripples
        let minX = canvas!.width;
        let minY = canvas!.height;
        let maxX = 0;
        let maxY = 0;
        const maxR = 460 * dpr;

        for (let i = 0; i < Math.min(4, activeRipples.length); i++) {
          const rip = activeRipples[i]!;
          const rx = rip.x * dpr;
          const ry = rip.y * dpr;
          minX = Math.max(0, Math.min(minX, rx - maxR));
          minY = Math.max(0, Math.min(minY, ry - maxR));
          maxX = Math.min(canvas!.width, Math.max(maxX, rx + maxR));
          maxY = Math.min(canvas!.height, Math.max(maxY, ry + maxR));
        }

        const boxW = Math.max(0, maxX - minX);
        const boxH = Math.max(0, maxY - minY);

        if (boxW > 0 && boxH > 0) {
          gl!.enable(gl!.SCISSOR_TEST);
          gl!.scissor(minX, minY, boxW, boxH);
          gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
          gl!.disable(gl!.SCISSOR_TEST);
        }

        if (!document.hidden) {
          animId = requestAnimationFrame(renderLoop);
        } else {
          isRunning = false;
        }
      } else {
        isRunning = false;
      }
    }

    function triggerRipple(clientX: number, clientY: number, strength = 2.4) {
      const canvasY = window.innerHeight - clientY;
      activeRipples.push({
        x: clientX,
        y: canvasY,
        startTime: performance.now(),
        strength,
      });

      // Keep maximum 4 concurrent ripples
      if (activeRipples.length > 4) {
        activeRipples.shift();
      }

      if (!isRunning && !document.hidden) {
        isRunning = true;
        animId = requestAnimationFrame(renderLoop);
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        'button, [role="button"], [role="tab"], a, input[type="submit"], input[type="button"], .liquid-btn, [data-ripple]'
      ) as HTMLElement | null;

      if (!target) return;
      if (target.hasAttribute("data-no-ripple")) return;

      triggerRipple(e.clientX, e.clientY, 2.4);
    };

    const onCustomRipple = (e: Event) => {
      const ce = e as CustomEvent<{ clientX?: number; clientY?: number; strength?: number }>;
      if (ce.detail?.clientX != null && ce.detail?.clientY != null) {
        triggerRipple(ce.detail.clientX, ce.detail.clientY, ce.detail.strength ?? 2.4);
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
        isRunning = false;
        activeRipples.length = 0;
      }
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animId);
      isRunning = false;
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("srsti-water-ripple", onCustomRipple);
    document.addEventListener("visibilitychange", onVisibilityChange);
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("srsti-water-ripple", onCustomRipple);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(pr);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[99999] size-full block"
      aria-hidden="true"
    />
  );
}
