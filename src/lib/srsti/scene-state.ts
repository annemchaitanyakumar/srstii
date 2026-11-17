/**
 * Shared, mutable state read by the 3D water/oil scene every frame.
 * Written by DOM listeners (scroll, pointer, UI selections) — never React state,
 * so 60fps updates never trigger re-renders.
 */
export type Mood = "drizzle" | "saute" | "ritual" | "water";

export interface MoodConfig {
  /** wave speed multiplier — lower = more viscous, higher = lively water */
  speed: number;
  /** wave height multiplier */
  amplitude: number;
  /** liquid body tint (linear-ish rgb 0..1) */
  tint: [number, number, number];
  /** deep water absorption colour */
  deep: [number, number, number];
  /** key light colour */
  light: [number, number, number];
  /** key light strength */
  lightIntensity: number;
  /** Gerstner wave steepness multiplier */
  steepness: number;
  /** capillary micro-chop ripple strength */
  microChop: number;
  /** crest foam and froth intensity */
  foam: number;
}

export const MOODS: Record<Mood, MoodConfig> = {
  // Drizzle: Heritage Sunlit Liquid Gold / Cold-Pressed Amber Oil
  drizzle: {
    speed: 0.95,
    amplitude: 0.95,
    tint: [0.82, 0.68, 0.40],
    deep: [0.46, 0.32, 0.12],
    light: [0.99, 0.96, 0.90],
    lightIntensity: 1.25,
    steepness: 0.85,
    microChop: 0.65,
    foam: 0.55,
  },
  // Saute: Sleek Mineral & Slate Smoke Grey
  saute: {
    speed: 1.75,
    amplitude: 1.45,
    tint: [0.56, 0.60, 0.64],
    deep: [0.22, 0.24, 0.26],
    light: [0.94, 0.96, 0.98],
    lightIntensity: 1.25,
    steepness: 1.05,
    microChop: 0.92,
    foam: 0.85,
  },
  // Ayurvedic Ritual: Rich Dark Chocolate & Roasted Cocoa
  ritual: {
    speed: 0.52,
    amplitude: 0.72,
    tint: [0.42, 0.24, 0.14],
    deep: [0.18, 0.09, 0.04],
    light: [0.96, 0.88, 0.78],
    lightIntensity: 1.05,
    steepness: 0.72,
    microChop: 0.45,
    foam: 0.42,
  },
  // Living Water: Crystal Azure Ocean
  water: {
    speed: 1.15,
    amplitude: 1.15,
    tint: [0.28, 0.68, 0.78],
    deep: [0.08, 0.25, 0.38],
    light: [0.94, 0.98, 1.0],
    lightIntensity: 1.35,
    steepness: 0.92,
    microChop: 0.85,
    foam: 0.82,
  },
};

export const sceneState = {
  /** pointer in normalised device coords (-1..1) */
  pointer: { x: 0, y: 0, moved: false },
  /** set true for one frame when the user taps/clicks, to drop a bigger ripple */
  tap: false,
  /** whole-page scroll progress 0..1 */
  progress: 0,
  /** scroll position in viewport heights */
  viewports: 0,
  /** smoothed absolute scroll velocity (px/frame-ish) */
  velocity: 0,
  mood: "drizzle" as Mood,
  dark: false,
  reducedMotion: false,
};

export function setMood(mood: Mood) {
  sceneState.mood = mood;
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-mood", mood);
  }
}
