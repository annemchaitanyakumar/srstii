export const MAX_RIPPLES = 10;

export const oilVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uWaveSteepness;
uniform float uWind;
uniform float uAgitation;
uniform float uCalm;
uniform vec4 uRipples[${MAX_RIPPLES}];
uniform vec3 uPointer;

varying vec3 vWorld;
varying vec3 vNormal;
varying float vHeight;
varying float vCrest;
varying vec2 vUv;

// 4 Physical Gerstner Wave Components:
// Direction (vec2), steepness, amplitude, wavelength, speed
vec3 calcGerstnerWave(
  vec2 dir,
  float steepness,
  float amp,
  float wavelength,
  float speed,
  vec2 pos,
  float time,
  inout vec3 tangent,
  inout vec3 binormal
) {
  float k = 6.2831853 / wavelength;
  float c = sqrt(9.8 / k) * speed;
  vec2 d = normalize(dir);
  float f = k * (dot(d, pos) - c * time);
  float a = amp;
  float q = steepness / (k * max(a, 0.0001) * 4.0);

  float cosF = cos(f);
  float sinF = sin(f);

  tangent += vec3(
    -d.x * d.x * (steepness * sinF),
    d.x * (k * a * cosF),
    -d.x * d.y * (steepness * sinF)
  );

  binormal += vec3(
    -d.x * d.y * (steepness * sinF),
    d.y * (k * a * cosF),
    -d.y * d.y * (steepness * sinF)
  );

  return vec3(
    q * a * d.x * cosF,
    a * sinF,
    q * a * d.y * cosF
  );
}

void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec2 p = world.xz;
  
  float t = uTime;
  float ampMult = uAmp * (1.0 + uAgitation * 0.5) * (1.0 - uCalm * 0.88);
  float steepMult = uWaveSteepness * (1.0 + uAgitation * 0.4) * (1.0 - uCalm * 0.88);

  vec3 tangent = vec3(0.0);
  vec3 binormal = vec3(0.0);
  vec3 disp = vec3(0.0);

  // 1. Primary oceanic swell
  disp += calcGerstnerWave(vec2(0.894, 0.447), 0.38 * steepMult, 0.18 * ampMult, 8.2, 0.85 * uWind, p, t, tangent, binormal);

  // 2. Secondary crossing swell
  disp += calcGerstnerWave(vec2(-0.6, 0.8), 0.32 * steepMult, 0.13 * ampMult, 5.1, 1.05 * uWind, p, t, tangent, binormal);

  // 3. Wind chop
  disp += calcGerstnerWave(vec2(0.28, 0.96), 0.24 * steepMult, 0.07 * ampMult, 2.8, 1.35 * uWind, p, t, tangent, binormal);

  // 4. Capillary wave train
  disp += calcGerstnerWave(vec2(-0.8, -0.6), 0.18 * steepMult, 0.035 * ampMult, 1.4, 1.75 * uWind, p, t, tangent, binormal);

  // Scroll swirl ahead of viewer
  vec2 cSwirl = p - vec2(0.0, -3.5);
  float aSwirl = atan(cSwirl.y, cSwirl.x);
  float swirlH = sin(length(cSwirl) * 1.4 - t * 2.2 + aSwirl * 2.0) * 0.1 * uAgitation;
  disp.y += swirlH;

  // Ripples from user taps & clicks
  float rippleH = 0.0;
  vec2 rippleDeriv = vec2(0.0);
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec4 rp = uRipples[i];
    if (rp.w <= 0.001) continue;
    vec2 dVec = p - rp.xy;
    float d = length(dVec);
    float age = rp.z;
    float front = age * 2.6;
    float distFromFront = d - front;
    
    // Wave packet with physical radial dispersion and smooth attenuation
    float envelope = exp(-distFromFront * distFromFront * 1.5) * exp(-age * 0.75) / (1.0 + d * 0.4);
    float wavePhase = distFromFront * 7.2 - age * 4.2;
    float waveSin = sin(wavePhase);
    float rH = waveSin * envelope * rp.w * 0.22;
    rippleH += rH;

    if (d > 0.001) {
      vec2 dir = dVec / d;
      float dWave = (7.2 * cos(wavePhase) - 3.0 * distFromFront * waveSin) * envelope * rp.w * 0.22;
      rippleDeriv += dir * dWave;
    }
  }

  // Pointer wake / depression
  vec2 pVec = p - uPointer.xy;
  float pDistSq = dot(pVec, pVec);
  float pWeight = uPointer.z;
  if (pWeight > 0.01) {
    float pDisp = exp(-pDistSq * 1.6) * 0.15 * pWeight;
    float pWake = sin(sqrt(pDistSq) * 6.2 - t * 3.8) * exp(-pDistSq * 0.7) * 0.06 * pWeight;
    rippleH += (-pDisp + pWake);
    rippleDeriv += pVec * (-3.2 * pDisp + 5.0 * pWake);
  }

  disp.y += rippleH * (1.0 - uCalm * 0.9);
  tangent.y += rippleDeriv.x * (1.0 - uCalm * 0.9);
  binormal.y += rippleDeriv.y * (1.0 - uCalm * 0.9);

  // Displace world position
  world.x += disp.x;
  world.y += disp.y;
  world.z += disp.z;

  // Compute exact analytical geometric normal
  vec3 T = vec3(1.0 + tangent.x, tangent.y, tangent.z);
  vec3 B = vec3(binormal.x, binormal.y, 1.0 + binormal.z);
  vNormal = normalize(cross(B, T));

  vWorld = world.xyz;
  vHeight = disp.y;
  vCrest = clamp((disp.y + 0.12) * 2.4 + (tangent.y + binormal.y) * 0.45, 0.0, 1.0);

  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const oilFragment = /* glsl */ `
uniform vec3 uBg;
uniform vec3 uTint;
uniform vec3 uDeep;
uniform vec3 uLight;
uniform vec3 uHorizon;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uLightI;
uniform float uCalm;
uniform float uGlow;
uniform float uTime;
uniform float uMicroChop;
uniform float uFoam;
uniform float uCaustics;
uniform float uAgitation;

varying vec3 vWorld;
varying vec3 vNormal;
varying float vHeight;
varying float vCrest;
varying vec2 vUv;

// High-frequency capillary ripples for realistic water micro-facets
vec2 getCapillaryDeriv(vec2 p, float t) {
  vec2 p1 = p * 3.8 + vec2(t * 0.3, t * 0.22);
  vec2 p2 = p * 7.5 - vec2(t * 0.18, -t * 0.35);
  vec2 p3 = p * 14.2 + vec2(-t * 0.4, t * 0.26);

  vec2 dM = vec2(0.0);
  dM += vec2(cos(p1.x * 1.5 + p1.y * 0.9), sin(p1.y * 1.5 - p1.x * 0.9)) * 0.085;
  dM += vec2(cos(p2.x * 2.2 - p2.y * 1.7), sin(p2.y * 2.2 + p2.x * 1.7)) * 0.052;
  dM += vec2(cos(p3.x * 3.6 + p3.y * 3.1), sin(p3.y * 3.6 - p3.x * 3.1)) * 0.026;
  return dM;
}

// Procedural underwater caustics pattern
float calcCaustics(vec2 p, float t) {
  vec2 q = p * 1.5;
  float ct = t * 0.75;
  vec2 cp1 = q + vec2(sin(q.y * 1.4 + ct), cos(q.x * 1.4 + ct)) * 0.42;
  vec2 cp2 = q * 1.4 - vec2(cos(q.y * 1.8 - ct * 1.1), sin(q.x * 1.8 - ct * 1.1)) * 0.34;
  float c1 = sin(cp1.x * 2.8 + cp1.y * 2.3);
  float c2 = sin(cp2.x * 3.2 - cp2.y * 2.8);
  return pow(abs(c1 * c2), 0.72);
}

void main() {
  vec3 N_geom = normalize(vNormal);
  vec3 V = normalize(cameraPosition - vWorld);
  vec3 L = normalize(uSunDir);

  // Micro-capillary normal perturbation
  vec2 dM = getCapillaryDeriv(vWorld.xz, uTime);
  float microStrength = uMicroChop * (1.0 - uCalm * 0.7);
  vec3 N = normalize(N_geom + vec3(-dM.x, 0.0, -dM.y) * microStrength);

  // Physical Fresnel reflection (Schlick approximation)
  float ndv = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = 0.04 + 0.96 * pow(1.0 - ndv, 5.0);

  // Volumetric depth and absorption (Beer-Lambert attenuation proxy)
  float depthFactor = clamp(0.48 + vHeight * 2.4, 0.0, 1.0);
  vec3 waterBody = mix(uDeep, uTint, depthFactor);

  // Underwater caustic light shimmering inside the water
  float caustPattern = calcCaustics(vWorld.xz, uTime) * uCaustics;
  waterBody += uLight * caustPattern * 0.22 * depthFactor * uLightI;

  // Subsurface scattering: sun shining through wave crests toward camera
  vec3 Hs = normalize(L + N * 0.65);
  float sss = pow(clamp(dot(V, -Hs), 0.0, 1.0), 3.5);
  sss *= (0.32 + 0.68 * vCrest);
  vec3 sssCol = uTint * 1.6 * sss * uLightI;

  // Sky and Horizon reflection
  vec3 R = reflect(-V, N);
  float skyGrad = clamp(R.y * 0.6 + 0.4, 0.0, 1.0);
  vec3 skyReflection = mix(uHorizon, uBg, skyGrad);

  // Base water color blending body, translucency, and sky reflection
  vec3 col = mix(waterBody + sssCol, skyReflection, fresnel * 0.82);

  // Dual-lobe sun specular reflection
  vec3 H = normalize(L + V);
  float ndh = clamp(dot(N, H), 0.0, 1.0);
  // 1. Sharp sun specular disc
  float specSharp = pow(ndh, 540.0) * 3.6;
  // 2. Glossy ocean water sheen
  float specBroad = pow(ndh, 45.0) * 0.36;
  // 3. Diamond micro-facet glints
  vec3 N_micro = normalize(N_geom + vec3(-dM.x, 0.0, -dM.y) * 0.8);
  float sparkle = pow(clamp(dot(N_micro, H), 0.0, 1.0), 780.0) * 2.4;

  // Secondary soft key from side for glossy rims
  vec3 L2 = normalize(vec3(0.65, 0.7, 0.75));
  float ndh2 = clamp(dot(N, normalize(L2 + V)), 0.0, 1.0);
  float specFill = pow(ndh2, 220.0) * 0.45;

  vec3 sunSpec = mix(uSunColor, uLight, 0.25) * (specSharp + specBroad + sparkle) * uLightI;
  col += sunSpec + uLight * specFill * uLightI;

  // Wave crest foam & froth lines
  float foamNoise = sin(vWorld.x * 19.0 + vWorld.z * 17.0) * 0.06;
  float foamEdge = smoothstep(0.72, 0.92, vCrest + foamNoise);
  vec3 foamColor = mix(vec3(0.97, 0.98, 1.0), uLight, 0.25);
  col = mix(col, foamColor, foamEdge * 0.42 * uFoam * (1.0 + uAgitation * 0.6));

  // Atmospheric distance fog to seamlessly melt into horizon
  float dist = length(vWorld.xz - cameraPosition.xz);
  float fog = smoothstep(8.5, 37.0, dist);
  vec3 fogCol = mix(uBg, uHorizon, clamp(uGlow, 0.0, 1.0));
  col = mix(col, fogCol, fog);

  col = clamp(col, 0.0, 4.0);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

export const skyVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const skyFragment = /* glsl */ `
uniform vec3 uBg;
uniform vec3 uHorizon;
uniform float uGlow;
varying vec2 vUv;
void main() {
  float band = exp(-vUv.y * 9.0) * uGlow;
  float halo = exp(-vUv.y * 2.2) * uGlow * 0.25;
  vec3 col = mix(uBg, uHorizon, clamp(band + halo, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;
