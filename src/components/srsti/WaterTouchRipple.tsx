import { useEffect, useRef } from "react";
import { sceneState, MOODS } from "@/lib/srsti/scene-state";

const VS = `attribute vec2 p;
void main() {
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FS = `precision highp float;
uniform vec2 uResolution;
uniform vec2 uCenters[4];
uniform float uTimes[4];
uniform float uStrengths[4];
uniform vec3 uColorBody;
uniform vec3 uColorEnvTop;

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
    if (t < 0.0 || t > 3.2) continue;

    vec2 delta = coord - uCenters[i];
    float dist = length(delta);

    // Completely unconstrained, free-flowing wave speed across the entire viewport
    float speed = 620.0;
    float front = t * speed;
    float dDist = dist - front;

    // Broad, natural dispersion wavepacket that rolls outwards across the entire screen
    float wavelength = 68.0;
    float phase = dDist / wavelength * 6.28318;
    float packetWidth = 320.0 + t * 160.0; // Expands freely and covers the whole screen

    // Asymmetric envelope: steep leading wavefront into calm water, long trailing ripples behind
    float ahead = max(dDist, 0.0);
    float behind = min(dDist, 0.0);
    float envDist = (ahead * 1.8 + abs(behind) * 0.75) / packetWidth;
    float envTime = exp(-t * 0.68); // Natural fluid viscous damping
    float envelope = exp(-envDist * envDist * 0.8) * envTime * uStrengths[i];
    float wave = cos(phase) * envelope;

    // Central impact splash cavity and rebound water column
    float coreDist = dist / 70.0;
    float coreEnv = exp(-coreDist * coreDist) * exp(-t * 2.4) * uStrengths[i];
    float core = -cos(t * 7.5) * coreEnv * 1.8;

    float h = wave * 2.2 + core * 1.8;
    totalH += h;

    // Exact analytical spatial derivatives for 3D physical surface normals
    float dEnv = -1.6 * (dDist / (packetWidth * packetWidth)) * envelope;
    float dWave = (-sin(phase) * (6.28318 / wavelength) * envelope + cos(phase) * dEnv) * 2.2;
    float dCore = (-2.0 * dist / (70.0 * 70.0) * core) * 1.8;
    float dhdr = dWave + dCore;

    vec2 dir = dist > 0.001 ? delta / dist : vec2(0.0);
    totalDhx += dhdr * dir.x;
    totalDhy += dhdr * dir.y;

    float slope = abs(dhdr);
    float alphaContrib = (abs(h) * 2.6 + slope * 38.0) * envTime;
    maxAlpha = max(maxAlpha, alphaContrib);
  }

  if (maxAlpha < 0.002) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Exact 3D surface normal from physical wave gradients
  vec3 N = normalize(vec3(-totalDhx * 32.0, -totalDhy * 32.0, 1.0));
  vec3 L = normalize(LD);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 R = reflect(-V, N);

  // Glossy caustic crest highlights (matching Image 2)
  float spec = pow(max(dot(R, L), 0.0), 32.0) * 2.2;
  float broadSpec = pow(max(dot(R, L), 0.0), 8.0) * 0.45;

  // Fresnel reflection
  float nv = max(dot(N, V), 0.0);
  float F = 0.04 + 0.96 * pow(1.0 - nv, 3.5);

  // Realistic liquid surface shading (active mood colors)
  float diff = clamp(dot(N, L) * 0.48 + 0.52, 0.0, 1.0);
  vec3 waterCol = mix(uColorBody * (diff * 0.75 + 0.25), uColorEnvTop, diff * 0.35 + F * 0.65);
  vec3 col = waterCol + vec3(1.0, 1.0, 0.98) * (spec + broadSpec);

  float finalAlpha = clamp(maxAlpha * 0.85 + spec * 1.3 + broadSpec * 0.5 + F * 0.45, 0.0, 0.95);
  gl_FragColor = vec4(col * finalAlpha, finalAlpha);
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
    const uColorBody = gl.getUniformLocation(pr, "uColorBody");
    const uColorEnvTop = gl.getUniformLocation(pr, "uColorEnvTop");

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
      const moodConfig = MOODS[sceneState.mood] ?? MOODS.drizzle;

      const centersArr: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
      const timesArr: number[] = [-1, -1, -1, -1];
      const strengthsArr: number[] = [0, 0, 0, 0];

      let anyActive = false;

      // Filter and populate up to 4 ripples
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const rip = activeRipples[i]!;
        const elapsed = (now - rip.startTime) / 1000;
        if (elapsed > 3.2) {
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
        gl!.uniform3f(uColorBody, moodConfig.tint[0], moodConfig.tint[1], moodConfig.tint[2]);
        gl!.uniform3f(uColorEnvTop, moodConfig.light[0], moodConfig.light[1], moodConfig.light[2]);

        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
        animId = requestAnimationFrame(renderLoop);
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

      if (!isRunning) {
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

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("srsti-water-ripple", onCustomRipple);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("srsti-water-ripple", onCustomRipple);
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
