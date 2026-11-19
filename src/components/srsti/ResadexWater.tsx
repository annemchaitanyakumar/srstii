import { useEffect, useRef } from "react";
import gsap from "gsap";
import { sceneState, type Mood } from "@/lib/srsti/scene-state";

const WATER_PALETTES: Record<
  Mood,
  {
    body: [number, number, number];
    envBottom: [number, number, number];
    envTop: [number, number, number];
    envMid: [number, number, number];
    fog: [number, number, number];
  }
> = {
  // Heritage Liquid Gold: sunlit cold-pressed golden amber oil
  drizzle: {
    body: [0.82, 0.68, 0.40],
    envBottom: [0.70, 0.52, 0.26],
    envTop: [0.99, 0.96, 0.90],
    envMid: [0.82, 0.64, 0.34],
    fog: [0.96, 0.92, 0.84],
  },
  // Crystal azure ocean / spring water
  water: {
    body: [0.28, 0.68, 0.78],
    envBottom: [0.18, 0.46, 0.64],
    envTop: [0.94, 0.98, 1.0],
    envMid: [0.32, 0.65, 0.84],
    fog: [0.74, 0.88, 0.95],
  },
  // Mineral & Slate Smoke Grey
  saute: {
    body: [0.56, 0.60, 0.64],
    envBottom: [0.38, 0.42, 0.46],
    envTop: [0.94, 0.96, 0.98],
    envMid: [0.50, 0.54, 0.58],
    fog: [0.72, 0.76, 0.80],
  },
  // Rich Warm Dark Chocolate & Cocoa
  ritual: {
    body: [0.42, 0.24, 0.14],
    envBottom: [0.24, 0.12, 0.07],
    envTop: [0.95, 0.88, 0.82],
    envMid: [0.34, 0.19, 0.11],
    fog: [0.66, 0.50, 0.40],
  },
};

export interface WaterPalette {
  body: [number, number, number];
  envBottom: [number, number, number];
  envTop: [number, number, number];
  envMid: [number, number, number];
  fog: [number, number, number];
  dark?: boolean;
}

export const STRIDE_OIL_PALETTES: Record<number, WaterPalette> = {
  // 0: Groundnut Oil — Warm Sunlit Amber Liquid Gold
  0: {
    body: [0.84, 0.61, 0.24],
    envBottom: [0.70, 0.48, 0.16],
    envTop: [0.99, 0.96, 0.90],
    envMid: [0.82, 0.60, 0.22],
    fog: [0.96, 0.92, 0.84],
    dark: false,
  },
  // 1: Virgin Coconut Oil — Deep Coastal Emerald Sage Green
  1: {
    body: [0.24, 0.44, 0.35],
    envBottom: [0.15, 0.30, 0.23],
    envTop: [0.92, 0.97, 0.94],
    envMid: [0.28, 0.48, 0.38],
    fog: [0.85, 0.92, 0.89],
    dark: false,
  },
  // 2: Yellow Mustard Oil — Vibrant Rich Mustard Warm Gold
  2: {
    body: [0.82, 0.53, 0.10],
    envBottom: [0.64, 0.39, 0.06],
    envTop: [0.99, 0.96, 0.88],
    envMid: [0.79, 0.50, 0.08],
    fog: [0.96, 0.92, 0.82],
    dark: false,
  },
  // 3: Black Sesame Oil — Deep Roasted Obsidian Sesame
  3: {
    body: [0.22, 0.16, 0.13],
    envBottom: [0.12, 0.08, 0.06],
    envTop: [0.90, 0.86, 0.82],
    envMid: [0.18, 0.13, 0.10],
    fog: [0.55, 0.48, 0.44],
    dark: true,
  },
  // 4: A2 Gir Cow Ghee — Luminous Radiant Clarified Butter Gold
  4: {
    body: [0.91, 0.67, 0.20],
    envBottom: [0.76, 0.53, 0.12],
    envTop: [1.0, 0.98, 0.90],
    envMid: [0.89, 0.64, 0.18],
    fog: [0.98, 0.95, 0.86],
    dark: false,
  },
};

export function colorToWaterPalette(hex: string): WaterPalette {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  if (isNaN(num)) return STRIDE_OIL_PALETTES[0]!;
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  const isDark = brightness < 0.28;

  return {
    body: [r, g, b],
    envBottom: [r * 0.72, g * 0.72, b * 0.72],
    envTop: [Math.min(1, 0.92 + r * 0.08), Math.min(1, 0.92 + g * 0.08), Math.min(1, 0.92 + b * 0.08)],
    envMid: [r * 0.92, g * 0.92, b * 0.92],
    fog: [Math.min(1, 0.80 + r * 0.15), Math.min(1, 0.80 + g * 0.15), Math.min(1, 0.80 + b * 0.15)],
    dark: isDark,
  };
}

const VS = `attribute vec2 p;
void main(){
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FS = `precision highp float;
uniform vec2 R;
uniform float T;
uniform vec2 uPointer;
uniform float uPointerAge;
uniform float uPointerStrength;
uniform float uScroll;
uniform float uCalm;
uniform float uDark;

uniform vec3 uColorBody;
uniform vec3 uColorEnvBottom;
uniform vec3 uColorEnvTop;
uniform vec3 uColorEnvMid;
uniform vec3 uColorFog;

float ph, pr, DY, JK, AF, SY;
vec2 IC;
vec3 DC;

vec3 LD() {
  return normalize(vec3(-0.35, 0.7, 0.5));
}

float H(vec2 p) {
  float d = length(p);
  float a = atan(p.y, p.x + 1e-4);
  float e1 = length(p - IC);
  float w = e1 - (pr * 6.0 + 0.2);

  // Azimuthal organic swirl
  d += (0.03 * sin(a * 3.0 + T * 0.2) + 0.02 * sin(a * 5.0 - T * 0.3 + 1.0)) * smoothstep(0.3, 2.0, d);

  // Primary wave with pow(0.85) physical dispersion
  float h = cos(pow(d + 0.001, 0.85) * 3.4 - T * 1.1) * (0.5 + 0.5 * exp(-d * 0.2)) * smoothstep(0.1, 1.6, d);

  // Secondary crossing harmonic wave
  h += 0.3 * cos(d * 2.1 - T * 0.7 + 1.0) * exp(-d * 0.15) * smoothstep(0.1, 1.6, d);

  // Periodic droplet impact rings
  h += cos(w * 4.0) * exp(-w * w * 0.5) * (1.0 - pr) * step(0.4, ph);

  // Rebound splash cavity & droplet rebound column
  h += exp(-e1 * e1 * 10.0) * (-cos(pr * 9.0) * exp(-pr * 4.0)) * 1.6 * step(0.4, ph);

  // Interactive mouse click ripple (ultra-smooth organic liquid attack & release over 1.0s)
  if (uPointerStrength > 0.001 && uPointerAge < 1.05) {
    float em = length(p - uPointer);
    float wm = em - (uPointerAge * 0.45 + 0.05);
    // Smooth ease-in from 0.0, peaks smoothly, eases down seamlessly to exact 0.0 by 0.95s
    float easeIn = smoothstep(0.0, 0.20, uPointerAge);
    float easeOut = 1.0 - smoothstep(0.45, 0.95, uPointerAge);
    float envAge = easeIn * easeOut;
    // Ultra-slow, massive, broad rolling liquid swell
    h += cos(wm * 0.75) * exp(-wm * wm * 0.14) * envAge * uPointerStrength * 1.5;
    // Calm, slow rebound splash dip and rise
    h += exp(-em * em * 2.5) * (-sin(clamp(uPointerAge / 0.95, 0.0, 1.0) * 3.14159) * envAge) * 1.2 * uPointerStrength;
  }

  return h * 0.11 * AF * (1.0 - uCalm * 0.85);
}

vec3 env(vec3 r) {
  float y = clamp(r.y, -0.2, 1.0);
  vec3 c = mix(uColorEnvBottom, uColorEnvTop, smoothstep(0.28, 0.7, y));
  c = mix(c, uColorEnvMid, smoothstep(0.86, 1.0, y) * 0.6);
  if (uDark > 0.5) {
    c *= 0.35;
  }
  return c + pow(max(dot(r, LD()), 0.0), 10.0) * 0.15;
}

float map(vec3 p) {
  if (ph < 0.4) {
    vec3 q = p - DC;
    q.x += q.y * 0.12 * sin(T * 9.0);
    float sx = 1.0 / sqrt(SY);
    q /= vec3(sx, SY, sx);
    return (length(q) - 0.28) * 0.7;
  }
  return 1e3;
}

vec3 nrm(vec3 p) {
  vec2 e = vec2(0.004, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

vec3 envD(vec3 r) {
  vec3 c = env(r);
  float bx = (1.0 - smoothstep(0.2, 0.3, abs(r.x + 0.32))) * (1.0 - smoothstep(0.18, 0.27, abs(r.y - 0.5)));
  float st = (1.0 - smoothstep(0.02, 0.06, abs(r.x - 0.62))) * (1.0 - smoothstep(0.3, 0.4, abs(r.y - 0.45)));
  c = mix(c, vec3(1.0, 1.0, 0.96), bx * 0.95);
  c = mix(c, uColorEnvTop, st * 0.6);
  return mix(c, uColorEnvBottom * 0.6, smoothstep(0.14, 0.02, r.y) * 0.7);
}

vec3 wApprox(vec2 xz) {
  float d = length(xz);
  float l = mix(0.5, 0.5 + 0.5 * cos(pow(d + 0.001, 0.85) * 3.4 - T * 1.1), exp(-d * 0.3));
  return mix(uColorEnvBottom, uColorEnvTop, l);
}

vec3 dropCol(vec3 rd, vec3 n) {
  float nv = max(dot(n, -rd), 0.0);
  float F = 0.03 + 0.97 * pow(1.0 - nv, 5.0);
  vec3 rf = reflect(rd, n);
  vec3 re = envD(rf);

  vec3 r1 = refract(rd, n, 0.68);
  vec3 ne = n - 2.0 * dot(n, r1) * r1;
  vec3 q = DC + ne * 0.28;
  vec3 r2 = refract(r1, -ne, 1.47);
  if (dot(r2, r2) < 0.01) r2 = reflect(r1, -ne);

  vec3 tr;
  float tt = -q.y / min(r2.y, -0.02);
  tr = mix(envD(r2), wApprox((q + r2 * tt).xz - IC), smoothstep(0.0, -0.2, r2.y));
  float th = -0.56 * dot(n, r1);

  // Absorption and internal body tint dynamically matching the active fluid palette
  vec3 absorb = max(vec3(1.0) - uColorBody, vec3(0.03));
  vec3 body = tr * exp(-absorb * th * 3.0) * mix(0.45, 1.0, smoothstep(0.12, 0.6, nv));
  body += uColorEnvTop * smoothstep(0.4, 0.9, -n.y) * smoothstep(0.0, 0.7, nv) * 0.4;
  float sp = max(dot(rf, LD()), 0.0);
  return mix(body, re, F * 1.1 + 0.04) + pow(sp, 150.0) * 1.5;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * R) / R.y;

  ph = fract(T / 3.6);
  pr = clamp((ph - 0.4) / 0.6, 0.0, 1.0);
  float kk = floor(T / 3.6) + 1.0;

  IC = vec2(
    fract(sin(kk * 12.9898) * 43758.5453) - 0.5,
    fract(sin(kk * 78.233) * 12345.679) - 0.5
  ) * vec2(1.5, 0.9);

  float f = clamp(ph / 0.4, 0.0, 1.0);
  DY = 4.6 - 4.3 * f * f;
  SY = 1.0 + 0.14 * sin(T * 13.0) * (1.0 - 0.3 * f) + 0.14 * f;
  DC = vec3(IC.x + 0.12 * sin(f * 5.0 + kk) * (1.0 - f), DY, IC.y);
  JK = sin(clamp((ph - 0.4) / 0.2, 0.0, 1.0) * 3.14159);

  // Cinematic 3D camera elevation tracking whole-page scroll
  float camY = 4.2 + uScroll * 1.5;
  float camZ = -4.4 - uScroll * 1.2;
  vec3 ro = vec3(0.0, camY, camZ);
  vec3 fw = normalize(vec3(0.0, 0.0, 0.2) - ro);
  vec3 rt = normalize(cross(vec3(0.0, 1.0, 0.0), fw));
  vec3 up = cross(fw, rt);
  vec3 rd = normalize(fw * 0.85 + rt * p.x + up * p.y);

  float tw = 1e4;
  vec3 col = uColorBody * (uDark > 0.5 ? 0.4 : 1.15);
  AF = 1.0;

  if (rd.y < -0.001) {
    float t = -ro.y / rd.y;
    AF = exp(-0.07 * max(t - 7.0, 0.0));
    for (int i = 0; i < 3; i++) {
      vec3 q = ro + rd * t;
      t = (ro.y - H(q.xz)) / (-rd.y);
    }
    tw = t;
    vec3 q = ro + rd * t;
    float e = 0.04 + 0.012 * t;
    vec3 nn = normalize(vec3(
      -(H(q.xz + vec2(e, 0.0)) - H(q.xz - vec2(e, 0.0))) / (2.0 * e) * 1.4,
      1.0,
      -(H(q.xz + vec2(0.0, e)) - H(q.xz - vec2(0.0, e))) / (2.0 * e) * 1.4
    ));

    float cv = max(dot(nn, -rd), 0.0);
    float F = 0.5 + 0.5 * pow(1.0 - cv, 3.0);
    vec3 Rr = reflect(rd, nn);
    vec3 e0 = env(Rr);

    if (ph < 0.6) {
      vec3 c = vec3(0.0, ph < 0.4 ? DY + 0.1 : 0.05 + 0.9 * JK, 0.0);
      vec3 oc = q - c;
      float bb = dot(oc, Rr);
      float cc = dot(oc, oc) - 0.25;
      float ds = bb * bb - cc;
      if (ds > 0.0) {
        float th = -bb - sqrt(ds);
        if (th > 0.0) {
          // Subtle reflection highlight without expensive discarded secondary refraction
          e0 = mix(e0, vec3(1.0, 0.95, 0.85), 0.15);
        }
      }
    }

    vec3 body = uColorBody * (0.8 + 0.2 * nn.y);
    if (uDark > 0.5) body *= 0.35;
    col = mix(body, e0, F) + pow(max(dot(Rr, LD()), 0.0), 60.0) * 0.3;

    if (ph < 0.4) {
      vec2 sc = IC + vec2(0.5 * DY, -0.71 * DY);
      float d2 = length(q.xz - sc);
      col *= 1.0 - 0.22 * exp(-d2 * d2 * 5.0);
      col += vec3(1.0, 1.0, 0.85) * exp(-d2 * d2 * 40.0) * 0.18;
    }

    col = mix(col, uColorFog * (uDark > 0.5 ? 0.35 : 1.0), smoothstep(10.0, 26.0, t) * 0.5);
  }

  // Raymarching the falling 3D water droplet with high-efficiency bounding-sphere culling
  if (ph < 0.6) {
    vec3 toDrop = DC - ro;
    float proj = dot(toDrop, rd);
    float perpDistSq = dot(toDrop, toDrop) - proj * proj;
    // Only raymarch pixels whose rays actually point near the droplet (saves ~96% of GPU work!)
    if (proj > 0.0 && perpDistSq < 0.64) {
      float td = max(proj - 0.8, 0.0);
      bool hit = false;
      for (int i = 0; i < 36; i++) {
        float d = map(ro + rd * td);
        if (d < 0.003) {
          hit = true;
          break;
        }
        td += d;
        if (td > tw || td > 30.0) break;
      }
      if (hit && td < tw) {
        col = dropCol(rd, nrm(ro + rd * td));
      }
    }
  }

  // Vignette
  col *= 1.0 - 0.22 * smoothstep(0.35, 1.0, length(p * vec2(0.8, 1.1)));
  gl_FragColor = vec4(col, 1.0);
}`;

function screenToWaterPlane(clientX: number, clientY: number, scrollProgress: number) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const px = (clientX - 0.5 * width) / height;
  const py = -(clientY - 0.5 * height) / height;

  const camY = 4.2 + scrollProgress * 1.5;
  const camZ = -4.4 - scrollProgress * 1.2;
  const roX = 0;
  const roY = camY;
  const roZ = camZ;

  const fwX = 0 - roX;
  const fwY = 0 - roY;
  const fwZ = 0.2 - roZ;
  const fwLen = Math.hypot(fwX, fwY, fwZ) || 1;
  const nfwX = fwX / fwLen;
  const nfwY = fwY / fwLen;
  const nfwZ = fwZ / fwLen;

  const rtX = nfwZ;
  const rtY = 0;
  const rtZ = -nfwX;
  const rtLen = Math.hypot(rtX, rtZ) || 1;
  const nrtX = rtX / rtLen;
  const nrtY = 0;
  const nrtZ = rtZ / rtLen;

  const upX = nfwY * nrtZ - nfwZ * nrtY;
  const upY = nfwZ * nrtX - nfwX * nrtZ;
  const upZ = nfwX * nrtY - nfwY * nrtX;

  const rdx = nfwX * 0.85 + nrtX * px + upX * py;
  const rdy = nfwY * 0.85 + nrtY * px + upY * py;
  const rdz = nfwZ * 0.85 + nrtZ * px + upZ * py;

  if (rdy >= -0.001) return { x: 0, z: 0 };
  const t = -roY / rdy;
  return {
    x: roX + rdx * t,
    z: roZ + rdz * t,
  };
}

export function ResadexWater() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const glContext = canvas.getContext("webgl", { powerPreference: "high-performance", alpha: false });
    if (!glContext) {
      canvas.style.background = "radial-gradient(ellipse at 50% 50%, #dfe5ee, #8fa0ba)";
      return;
    }
    const gl: WebGLRenderingContext = glContext;

    function createShader(type: number, src: string) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("[Resadex] Shader compile error:", gl.getShaderInfoLog(s));
      }
      return s;
    }

    const pr = gl.createProgram();
    if (!pr) return;

    const vs = createShader(gl.VERTEX_SHADER, VS);
    const fs = createShader(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;

    gl.attachShader(pr, vs);
    gl.attachShader(pr, fs);
    gl.linkProgram(pr);

    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      console.error("[Resadex] Program link error:", gl.getProgramInfoLog(pr));
    }

    gl.useProgram(pr);

    // Quad geometry buffer
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uR = gl.getUniformLocation(pr, "R");
    const uT = gl.getUniformLocation(pr, "T");
    const uPointer = gl.getUniformLocation(pr, "uPointer");
    const uPointerAge = gl.getUniformLocation(pr, "uPointerAge");
    const uPointerStrength = gl.getUniformLocation(pr, "uPointerStrength");
    const uScroll = gl.getUniformLocation(pr, "uScroll");
    const uCalm = gl.getUniformLocation(pr, "uCalm");
    const uDark = gl.getUniformLocation(pr, "uDark");

    const uColorBody = gl.getUniformLocation(pr, "uColorBody");
    const uColorEnvBottom = gl.getUniformLocation(pr, "uColorEnvBottom");
    const uColorEnvTop = gl.getUniformLocation(pr, "uColorEnvTop");
    const uColorEnvMid = gl.getUniformLocation(pr, "uColorEnvMid");
    const uColorFog = gl.getUniformLocation(pr, "uColorFog");

    // Colors state with GSAP interpolation
    const colors = {
      body: [WATER_PALETTES.drizzle.body[0], WATER_PALETTES.drizzle.body[1], WATER_PALETTES.drizzle.body[2]],
      envBottom: [WATER_PALETTES.drizzle.envBottom[0], WATER_PALETTES.drizzle.envBottom[1], WATER_PALETTES.drizzle.envBottom[2]],
      envTop: [WATER_PALETTES.drizzle.envTop[0], WATER_PALETTES.drizzle.envTop[1], WATER_PALETTES.drizzle.envTop[2]],
      envMid: [WATER_PALETTES.drizzle.envMid[0], WATER_PALETTES.drizzle.envMid[1], WATER_PALETTES.drizzle.envMid[2]],
      fog: [WATER_PALETTES.drizzle.fog[0], WATER_PALETTES.drizzle.fog[1], WATER_PALETTES.drizzle.fog[2]],
    };

    let lastMood: Mood = sceneState.mood;
    const darkSim = { value: sceneState.dark ? 1.0 : 0.0 };

    const pointerSim = {
      x: 0,
      y: 0,
      age: 99,
      strength: 0,
    };

    function handleResize() {
      // Clamp DPR to max 1.0 for fluid background: looks visually identical with GPU bilinear filtering, saves up to 75% GPU fill rate
      const dpr = Math.min(window.devicePixelRatio || 1, 1.0);
      canvas!.width = Math.round(canvas!.clientWidth * dpr);
      canvas!.height = Math.round(canvas!.clientHeight * dpr);
      gl.viewport(0, 0, canvas!.width, canvas!.height);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    // User click/touch ripples with GSAP
    const onPointerDown = (e: PointerEvent) => {
      const pos = screenToWaterPlane(e.clientX, e.clientY, sceneState.progress);
      pointerSim.x = pos.x;
      pointerSim.y = pos.z;
      pointerSim.age = 0;
      pointerSim.strength = 2.0;

      gsap.to(pointerSim, {
        strength: 0,
        age: 1.05,
        duration: 1.05,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    const onTriggerRipple = (e: Event) => {
      const ce = e as CustomEvent<{ clientX?: number; clientY?: number; x?: number; y?: number; strength?: number }>;
      let targetX = 0;
      let targetZ = 0;
      if (ce.detail?.clientX != null && ce.detail?.clientY != null) {
        const pos = screenToWaterPlane(ce.detail.clientX, ce.detail.clientY, sceneState.progress);
        targetX = pos.x;
        targetZ = pos.z;
      } else if (ce.detail?.x != null && ce.detail?.y != null) {
        targetX = ce.detail.x;
        targetZ = ce.detail.y;
      }
      pointerSim.x = targetX;
      pointerSim.y = targetZ;
      pointerSim.age = 0;
      pointerSim.strength = ce.detail?.strength ?? 2.0;

      gsap.to(pointerSim, {
        strength: 0,
        age: 1.05,
        duration: 1.05,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("srsti-water-ripple", onTriggerRipple);

    const onPaletteChange = (e: Event) => {
      const ce = e as CustomEvent<{ flavourId?: number; color?: string; name?: string; isDefault?: boolean }>;
      const { flavourId, color, isDefault } = ce.detail || {};
      const defaultPalette = WATER_PALETTES[sceneState.mood] ?? WATER_PALETTES.drizzle;
      const target = isDefault
        ? defaultPalette
        : flavourId != null && STRIDE_OIL_PALETTES[flavourId]
        ? STRIDE_OIL_PALETTES[flavourId]!
        : color
        ? colorToWaterPalette(color)
        : defaultPalette;

      gsap.killTweensOf(colors.body);
      gsap.killTweensOf(colors.envBottom);
      gsap.killTweensOf(colors.envTop);
      gsap.killTweensOf(colors.envMid);
      gsap.killTweensOf(colors.fog);
      gsap.killTweensOf(darkSim);

      gsap.to(colors.body, { 0: target.body[0], 1: target.body[1], 2: target.body[2], duration: 1.1, ease: "power2.out" });
      gsap.to(colors.envBottom, { 0: target.envBottom[0], 1: target.envBottom[1], 2: target.envBottom[2], duration: 1.1, ease: "power2.out" });
      gsap.to(colors.envTop, { 0: target.envTop[0], 1: target.envTop[1], 2: target.envTop[2], duration: 1.1, ease: "power2.out" });
      gsap.to(colors.envMid, { 0: target.envMid[0], 1: target.envMid[1], 2: target.envMid[2], duration: 1.1, ease: "power2.out" });
      gsap.to(colors.fog, { 0: target.fog[0], 1: target.fog[1], 2: target.fog[2], duration: 1.1, ease: "power2.out" });

      const targetDark = isDefault ? (sceneState.dark ? 1.0 : 0.0) : (target.dark ? 1.0 : sceneState.dark ? 1.0 : 0.0);
      gsap.to(darkSim, { value: targetDark, duration: 1.1, ease: "power2.out" });

      // Organic liquid swell ripple on bottle color change inside bottles section
      if (!isDefault) {
        pointerSim.x = 0;
        pointerSim.y = 0.08;
        pointerSim.age = 0;
        pointerSim.strength = 1.4;
        gsap.to(pointerSim, {
          strength: 0,
          age: 1.05,
          duration: 1.05,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };
    window.addEventListener("srsti-water-palette-change", onPaletteChange);

    let animId = 0;
    const t0 = performance.now();
    let frameSkip = 0;

    function render(now: number) {
      if (document.hidden) return;

      // During rapid scroll flings, alternate frames to keep the main thread and compositor at rock-solid 60 FPS
      if (sceneState.velocity > 1.4) {
        frameSkip++;
        if (frameSkip % 2 !== 0) {
          animId = requestAnimationFrame(render);
          return;
        }
      } else {
        frameSkip = 0;
      }

      if (lastMood !== sceneState.mood) {
        lastMood = sceneState.mood;
        const target = WATER_PALETTES[sceneState.mood] ?? WATER_PALETTES.drizzle;
        gsap.to(colors.body, { 0: target.body[0], 1: target.body[1], 2: target.body[2], duration: 1.2, ease: "power2.out" });
        gsap.to(colors.envBottom, { 0: target.envBottom[0], 1: target.envBottom[1], 2: target.envBottom[2], duration: 1.2, ease: "power2.out" });
        gsap.to(colors.envTop, { 0: target.envTop[0], 1: target.envTop[1], 2: target.envTop[2], duration: 1.2, ease: "power2.out" });
        gsap.to(colors.envMid, { 0: target.envMid[0], 1: target.envMid[1], 2: target.envMid[2], duration: 1.2, ease: "power2.out" });
        gsap.to(colors.fog, { 0: target.fog[0], 1: target.fog[1], 2: target.fog[2], duration: 1.2, ease: "power2.out" });
      }

      const elapsed = (now - t0) / 1000;
      gl.uniform2f(uR, canvas!.width, canvas!.height);
      gl.uniform1f(uT, sceneState.reducedMotion ? 1.5 : elapsed);

      gl.uniform2f(uPointer, pointerSim.x, pointerSim.y);
      gl.uniform1f(uPointerAge, pointerSim.age);
      gl.uniform1f(uPointerStrength, pointerSim.strength);

      gl.uniform1f(uScroll, sceneState.progress);
      gl.uniform1f(uCalm, sceneState.progress > 0.88 ? 1.0 : 0.0);
      gl.uniform1f(uDark, darkSim.value);

      gl.uniform3f(uColorBody, colors.body[0]!, colors.body[1]!, colors.body[2]!);
      gl.uniform3f(uColorEnvBottom, colors.envBottom[0]!, colors.envBottom[1]!, colors.envBottom[2]!);
      gl.uniform3f(uColorEnvTop, colors.envTop[0]!, colors.envTop[1]!, colors.envTop[2]!);
      gl.uniform3f(uColorEnvMid, colors.envMid[0]!, colors.envMid[1]!, colors.envMid[2]!);
      gl.uniform3f(uColorFog, colors.fog[0]!, colors.fog[1]!, colors.fog[2]!);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!document.hidden) {
        animId = requestAnimationFrame(render);
      }
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animId);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("srsti-water-ripple", onTriggerRipple);
      window.removeEventListener("srsti-water-palette-change", onPaletteChange);
      gl.deleteBuffer(buf);
      gl.deleteProgram(pr);
    };
  }, []);

  return <canvas ref={canvasRef} id="water" className="absolute inset-0 size-full block" aria-hidden="true" />;
}
