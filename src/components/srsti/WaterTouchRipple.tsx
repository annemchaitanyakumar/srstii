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
  float totalFade = 0.0;

  for (int i = 0; i < 4; i++) {
    if (uStrengths[i] < 0.01) continue;
    float t = uTimes[i];
    if (t < 0.0 || t > 1.05) continue;

    vec2 delta = coord - uCenters[i];
    float dist = length(delta);

    // Infinite propagation — wave travels outward freely across the screen without any circular boundary
    float speed = 220.0;
    float front = t * speed;
    float dDist = dist - front;

    // Organic wavelength and wave packet width
    float wavelength = 340.0;
    float phase = (dDist / wavelength) * 6.28318;
    float packetWidth = 140.0 + t * 260.0;

    // Smooth asymmetric wave packet envelope
    float ahead = max(dDist, 0.0);
    float behind = min(dDist, 0.0);
    float envDist = (ahead * 1.35 + abs(behind) * 0.7) / packetWidth;

    // Gentle physical distance decay so waves naturally settle across space
    float distDecay = 1.0 / (1.0 + dist * 0.0014);

    // Organic liquid attack and release (smooth ease-in and ease-out)
    float easeIn = smoothstep(0.0, 0.18, t);
    float easeOut = 1.0 - smoothstep(0.42, 0.98, t);
    float envTime = easeIn * easeOut;
    totalFade = max(totalFade, envTime);

    // Wave envelope: continuous Gaussian decay, mathematically vanishes without any boundary
    float envelope = exp(-envDist * envDist * 0.75) * envTime * uStrengths[i] * distDecay;
    float wave = cos(phase) * envelope;

    // Calm central fluid depression / swell
    float coreDist = dist / 150.0;
    float coreEnv = exp(-coreDist * coreDist) * envTime * uStrengths[i];
    float core = -sin(clamp(t / 0.98, 0.0, 1.0) * 3.14159) * coreEnv * 1.2;

    float h = wave * 2.4 + core * 1.2;
    totalH += h;

    // Analytical spatial derivatives for surface normals
    float dEnv = -1.5 * (dDist / (packetWidth * packetWidth)) * envelope;
    float dWave = (-sin(phase) * (6.28318 / wavelength) * envelope + cos(phase) * dEnv) * 2.4;
    float dCore = (-2.0 * dist / (150.0 * 150.0) * core) * 1.2;
    float dhdr = dWave + dCore;

    vec2 dir = dist > 0.001 ? delta / dist : vec2(0.0);
    totalDhx += dhdr * dir.x;
    totalDhy += dhdr * dir.y;
  }

  if (totalFade < 0.0005) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float slopeMag = length(vec2(totalDhx, totalDhy));

  // WAVE DISTURBANCE:
  // Exactly 0.0 on calm/flat water. Flat water is 100% transparent (no gray veil, no bubble disc).
  // Only the active crests and troughs of the wave catch light and cast refraction.
  float disturbance = clamp(slopeMag * 22.0 + abs(totalH) * 0.7, 0.0, 1.0);
  if (disturbance < 0.0005) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Physical 3D surface normal
  vec3 N = normalize(vec3(-totalDhx * 24.0, -totalDhy * 24.0, 1.0));
  vec3 L = normalize(LD);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 R = reflect(-V, N);

  // Crest specular sheens (sharp and broad)
  float spec = pow(max(dot(R, L), 0.0), 18.0) * 1.8;
  float broadSpec = pow(max(dot(R, L), 0.0), 5.0) * 0.6;

  // Fresnel reflection on curved wave slopes (0 on flat surface viewed straight-on)
  float nv = max(dot(N, V), 0.0);
  float fresnelTilt = pow(1.0 - nv, 3.0) * 1.5;

  // Refraction shadow in wave troughs
  float lightDot = dot(N, L);
  float troughShadow = smoothstep(0.48, -0.25, lightDot) * clamp(slopeMag * 24.0, 0.0, 1.0) * 0.32;

  // Crystal clear liquid palette
  vec3 highlightCol = vec3(1.0, 1.0, 1.0);
  vec3 shadowCol = vec3(0.06, 0.08, 0.12);

  float highlight = spec * 1.2 + broadSpec * 0.8 + fresnelTilt;
  vec3 rgb = mix(highlightCol, shadowCol, troughShadow / (highlight + troughShadow + 0.001));

  // Opacity is tied directly to wave disturbance:
  // As the wave flattens out, disturbance smoothly reaches 0.0, seamlessly dissolving with zero visible edge!
  float rawAlpha = (highlight * 0.92 + troughShadow * 0.38) * disturbance;
  float alpha = clamp(rawAlpha * totalFade, 0.0, 0.88);

  if (alpha < 0.0005) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Premultiplied alpha
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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.0);
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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.0);

      const centersArr: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
      const timesArr: number[] = [-1, -1, -1, -1];
      const strengthsArr: number[] = [0, 0, 0, 0];

      let anyActive = false;

      // Filter and populate up to 4 ripples (settles to exact 0.0 at 0.95s, cleanup at 1.05s)
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const rip = activeRipples[i]!;
        const elapsed = (now - rip.startTime) / 1000;
        if (elapsed > 1.05) {
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

        // Infinite screen-wide rendering: wave travels without any spatial bounding or clipping
        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

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
