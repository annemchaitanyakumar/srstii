import gsap from "gsap";
import * as THREE from "three";

/**
 * Resadex exact water wave evaluation.
 * Evaluates the iconic radial dispersion waves, azimuthal swirl, and periodic droplet impacts.
 */
export function getResadexWave(x: number, z: number, t: number, calm = 0.0) {
  const d = Math.hypot(x, z);
  const a = Math.atan2(z, x + 1e-4);
  const swirl = (0.03 * Math.sin(a * 3.0 + t * 0.2) + 0.02 * Math.sin(a * 5.0 - t * 0.3 + 1.0)) *
    Math.min(1, Math.max(0, (d - 0.3) / 1.7));
  const dMod = d + swirl;

  // Primary wave with pow(0.85) physical dispersion
  let h = Math.cos(Math.pow(dMod + 0.001, 0.85) * 3.4 - t * 1.1) *
    (0.5 + 0.5 * Math.exp(-dMod * 0.2)) *
    Math.min(1, Math.max(0, (dMod - 0.1) / 1.5));

  // Secondary crossing harmonic wave
  h += 0.3 * Math.cos(dMod * 2.1 - t * 0.7 + 1.0) *
    Math.exp(-dMod * 0.15) *
    Math.min(1, Math.max(0, (dMod - 0.1) / 1.5));

  // Periodic droplet impact rings
  const ph = (t / 3.6) % 1;
  const pr = Math.min(1, Math.max(0, (ph - 0.4) / 0.6));
  const kk = Math.floor(t / 3.6) + 1;
  const icX = ((Math.sin(kk * 12.9898) * 43758.5453) % 1) * 1.5;
  const icZ = ((Math.sin(kk * 78.233) * 12345.679) % 1) * 0.9;
  const e1 = Math.hypot(x - icX, z - icZ);
  const w = e1 - (pr * 6.0 + 0.2);

  if (ph >= 0.4) {
    h += Math.cos(w * 4.0) * Math.exp(-w * w * 0.5) * (1.0 - pr);
    h += Math.exp(-e1 * e1 * 10.0) * (-Math.cos(pr * 9.0) * Math.exp(-pr * 4.0)) * 1.6;
  }

  return h * 0.11 * (1.0 - calm * 0.85);
}

/**
 * Calculates water elevation and slope normal for floating objects in Resadex water.
 */
export function getResadexBuoyancy(
  x: number,
  z: number,
  t: number,
  baseWaterY = -1.0,
  calm = 0.0,
) {
  const eps = 0.05;
  const h = getResadexWave(x, z, t, calm);
  const hX = getResadexWave(x + eps, z, t, calm);
  const hZ = getResadexWave(x, z + eps, t, calm);

  const dYdX = (hX - h) / eps;
  const dYdZ = (hZ - h) / eps;

  const normal = new THREE.Vector3(-dYdX, 1.0, -dYdZ).normalize();
  const pitch = -Math.atan2(normal.z, normal.y);
  const roll = Math.atan2(normal.x, normal.y);

  return {
    waterY: baseWaterY + h,
    elevation: h,
    pitch,
    roll,
    normal,
  };
}

export interface GerstnerWave {
  dir: [number, number];
  steepness: number;
  amplitude: number;
  wavelength: number;
  speed: number;
}

export const WATER_WAVES: GerstnerWave[] = [
  { dir: [0.894, 0.447], steepness: 0.38, amplitude: 0.18, wavelength: 8.2, speed: 0.85 },
  { dir: [-0.6, 0.8], steepness: 0.32, amplitude: 0.13, wavelength: 5.1, speed: 1.05 },
  { dir: [0.28, 0.96], steepness: 0.24, amplitude: 0.07, wavelength: 2.8, speed: 1.35 },
  { dir: [-0.8, -0.6], steepness: 0.18, amplitude: 0.035, wavelength: 1.4, speed: 1.75 },
];

export function getWaterSurface(
  x: number,
  z: number,
  time: number,
  amp = 1.0,
  agitation = 0.0,
  calm = 0.0,
) {
  let dispX = 0;
  let dispY = 0;
  let dispZ = 0;

  let dYdX = 0;
  let dYdZ = 0;

  const totalWaves = WATER_WAVES.length;
  const ampMult = amp * (1.0 + agitation * 0.5) * (1.0 - calm * 0.88);
  const steepMult = (1.0 + agitation * 0.4) * (1.0 - calm * 0.88);

  for (let i = 0; i < totalWaves; i++) {
    const w = WATER_WAVES[i]!;
    const k = (2 * Math.PI) / w.wavelength;
    const c = Math.sqrt(9.8 / k) * w.speed;
    const dX = w.dir[0];
    const dZ = w.dir[1];
    const f = k * (dX * x + dZ * z) - c * time;

    const a = w.amplitude * ampMult;
    const steepness = w.steepness * steepMult;
    const q = steepness / (k * Math.max(a, 0.001) * totalWaves);

    const cosF = Math.cos(f);
    const sinF = Math.sin(f);

    dispX += q * a * dX * cosF;
    dispY += a * sinF;
    dispZ += q * a * dZ * cosF;

    dYdX += a * k * dX * cosF;
    dYdZ += a * k * dZ * cosF;
  }

  const normal = new THREE.Vector3(-dYdX, 1.0, -dYdZ).normalize();

  return {
    elevation: dispY,
    displacement: new THREE.Vector3(dispX, dispY, dispZ),
    normal,
    crest: Math.max(0, Math.min(1, (dispY + 0.15) * 2.2 + (dYdX + dYdZ) * 0.4)),
  };
}

export function getBuoyancyState(
  x: number,
  z: number,
  time: number,
  waterY: number,
  amp = 1.0,
  agitation = 0.0,
  calm = 0.0,
) {
  // Use Resadex buoyancy for natural alignment with the Resadex water waves
  const resadex = getResadexBuoyancy(x, z, time, waterY, calm);
  return {
    waterY: resadex.waterY,
    pitch: resadex.pitch,
    roll: resadex.roll,
    normal: resadex.normal,
    elevation: resadex.elevation,
  };
}

export class WaterPhysicsController {
  public wind = 1.0;
  public microChop = 0.65;
  public caustics = 0.85;
  public waveSteepness = 0.85;
  public agitation = 0.0;
  private ctx: gsap.Context | null = null;

  constructor() {
    this.initGSAP();
  }

  private initGSAP() {
    this.ctx = gsap.context(() => {
      gsap.timeline({ repeat: -1, yoyo: true })
        .to(this, { wind: 1.45, duration: 4.8, ease: "sine.inOut" })
        .to(this, { wind: 0.78, duration: 5.6, ease: "sine.inOut" });

      gsap.timeline({ repeat: -1, yoyo: true })
        .to(this, { microChop: 0.95, duration: 3.4, ease: "power1.inOut" })
        .to(this, { microChop: 0.48, duration: 4.2, ease: "power1.inOut" });

      gsap.timeline({ repeat: -1, yoyo: true })
        .to(this, { caustics: 1.15, duration: 6.2, ease: "sine.inOut" })
        .to(this, { caustics: 0.68, duration: 5.4, ease: "sine.inOut" });
    });
  }

  public triggerShockwave(intensity = 1.0) {
    gsap.fromTo(
      this,
      { waveSteepness: 1.25 * intensity },
      { waveSteepness: 0.85, duration: 1.6, ease: "elastic.out(1, 0.42)", overwrite: "auto" }
    );
  }

  public surgeAgitation(target: number) {
    gsap.to(this, {
      agitation: target,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  public dispose() {
    this.ctx?.revert();
  }
}
