import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CinematicLoaderProps {
  onComplete?: () => void;
}

// Letter definitions with independent wave properties
const LETTERS_CONFIG = [
  { char: "S", xStart: 110, xEnd: 285, speed: 1.05, phase: 0.0, amp: 8.5, heightOffset: -3, bubbleX: 200 },
  { char: "R", xStart: 280, xEnd: 455, speed: 1.35, phase: 1.8, amp: 10.0, heightOffset: 2, bubbleX: 370 },
  { char: "S", xStart: 450, xEnd: 605, speed: 0.90, phase: 3.5, amp: 7.5, heightOffset: -1, bubbleX: 530 },
  { char: "T", xStart: 600, xEnd: 765, speed: 1.25, phase: 5.1, amp: 9.0, heightOffset: 3, bubbleX: 685 },
  { char: "I", xStart: 760, xEnd: 890, speed: 1.60, phase: 2.3, amp: 6.5, heightOffset: -2, bubbleX: 825 },
];

const LOADER_DAY_KEY = "srsti_loader_day";

export function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const today = new Date().toDateString();
      const lastSeen = localStorage.getItem(LOADER_DAY_KEY);
      return lastSeen !== today;
    } catch {
      return true;
    }
  });

  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [waveTime, setWaveTime] = useState(0);

  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Enforce once-per-day display
    try {
      const today = new Date().toDateString();
      const lastSeen = localStorage.getItem(LOADER_DAY_KEY);
      if (lastSeen === today) {
        setShouldRender(false);
        onComplete?.();
        return;
      }
      // Record today as viewed
      localStorage.setItem(LOADER_DAY_KEY, today);
    } catch {
      // Storage unavailable
    }

    if (!shouldRender) {
      onComplete?.();
      return;
    }

    // Disable scrolling while loader is active
    document.body.style.overflow = "hidden";

    // 1. Fluid wave animation loop (updates wave oscillation phase)
    let time = 0;
    const animateWaves = () => {
      time += 0.055;
      setWaveTime(time);
      animFrameRef.current = requestAnimationFrame(animateWaves);
    };
    animFrameRef.current = requestAnimationFrame(animateWaves);

    // 2. Liquid filling progression: 0% to 100%
    let current = 0;
    let timer: NodeJS.Timeout;

    const fillStep = () => {
      let increment = 1;
      let delay = 22;

      if (current < 15) {
        increment = 1;
        delay = 28;
      } else if (current < 75) {
        increment = Math.floor(Math.random() * 2) + 1;
        delay = 26;
      } else if (current < 94) {
        increment = 1;
        delay = 35;
      } else {
        increment = 1;
        delay = 18;
      }

      current = Math.min(100, current + increment);
      setProgress(current);

      if (current < 100) {
        timer = setTimeout(fillStep, delay);
      } else {
        // Once full: brief golden hold so visitor experiences the filled decanter letters
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = "";

          setTimeout(() => {
            setShouldRender(false);
            onComplete?.();
          }, 950);
        }, 500);
      }
    };

    timer = setTimeout(fillStep, 100);

    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  // Global liquid Y coordinates:
  // Baseline is at y = 215, letter tops are at y = 45. Letter height is 170px.
  // At 0%, liquid level = 245 (below baseline)
  // At 100%, liquid level = 30 (above top of letters)
  const emptyY = 245;
  const fullY = 30;
  const baseLiquidY = emptyY - (progress / 100) * (emptyY - fullY);

  // Generate independent wave paths for each individual letter
  const letterWaves = LETTERS_CONFIG.map((cfg) => {
    const w = cfg.xEnd - cfg.xStart;
    const midX = cfg.xStart + w / 2;

    // Organic height per letter (diminishes as it reaches 100%)
    const heightDamping = Math.max(0, 1 - progress / 100);
    const letterBaseY = baseLiquidY + cfg.heightOffset * heightDamping;

    // Amplitude dampens smoothly as letter fills to the brim
    const amp = Math.max(2, cfg.amp * (1 - progress / 115));
    const letterPhase = waveTime * cfg.speed + cfg.phase;

    // Foreground wave control point
    const ctrlYFore = letterBaseY + Math.sin(letterPhase) * amp;
    // Background wave control point (offset in phase for volumetric depth)
    const ctrlYBack = letterBaseY + Math.cos(letterPhase * 0.9) * (amp * 0.85);

    // 100% valid quadratic SVG bezier paths
    const forePath = `M ${cfg.xStart} ${letterBaseY} Q ${cfg.xStart + w / 4} ${ctrlYFore} ${midX} ${letterBaseY} T ${cfg.xEnd} ${letterBaseY} L ${cfg.xEnd} 360 L ${cfg.xStart} 360 Z`;
    const backPath = `M ${cfg.xStart} ${letterBaseY} Q ${cfg.xStart + w / 4} ${ctrlYBack} ${midX} ${letterBaseY} T ${cfg.xEnd} ${letterBaseY} L ${cfg.xEnd} 360 L ${cfg.xStart} 360 Z`;
    const meniscusPath = `M ${cfg.xStart} ${letterBaseY} Q ${cfg.xStart + w / 4} ${ctrlYFore} ${midX} ${letterBaseY} T ${cfg.xEnd} ${letterBaseY}`;

    // Rising bubble coordinate inside this letter
    const bubbleY = Math.max(
      letterBaseY + 12,
      215 - ((progress * (1.8 + (cfg.speed - 1))) % 150)
    );

    return {
      char: cfg.char,
      forePath,
      backPath,
      meniscusPath,
      bubbleX: cfg.bubbleX,
      bubbleY,
    };
  });

  return (
    <AnimatePresence>
      {!isDone ? (
        <motion.div
          key="srsti-oil-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.9, ease: [0.82, 0, 0.18, 1] },
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#0A0806] px-4 md:px-8 select-none pointer-events-auto"
        >
          {/* Ambient Warm Golden Glow in backdrop */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <div
              className="h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#9A5812]/25 via-[#D49B3E]/20 to-transparent blur-[140px] transition-all duration-500"
              style={{
                transform: `scale(${0.7 + (progress / 100) * 0.5})`,
                opacity: 0.25 + (progress / 100) * 0.55,
              }}
            />
          </div>

          {/* Hidden reference text to force font preload/metrics in SVG */}
          <span
            className="invisible absolute pointer-events-none"
            style={{
              fontFamily: '"EB Garamond", "ITC Garamond", Garamond, Georgia, serif',
            }}
          >
            SRSTI
          </span>

          {/* MAIN LETTERFORMS: EACH LETTER WAVING INDEPENDENTLY */}
          <div className="relative z-10 w-full max-w-[94vw] lg:max-w-6xl">
            <svg
              viewBox="0 0 1000 310"
              className="w-full h-auto overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Text Mask/Clip: Exact match to footer typography */}
                <clipPath id="srsti-text-clip">
                  <text
                    x="500"
                    y="215"
                    textAnchor="middle"
                    style={{
                      fontFamily: '"EB Garamond", "ITC Garamond", Garamond, Georgia, serif',
                      fontSize: "245px",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                    }}
                  >
                    SRSTI
                  </text>
                </clipPath>

                {/* Primary Radiant Liquid Gold Gradient */}
                <linearGradient
                  id="pureOilGold"
                  x1="0"
                  y1="240"
                  x2="0"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#A66107" />
                  <stop offset="25%" stopColor="#C97F14" />
                  <stop offset="55%" stopColor="#E5A122" />
                  <stop offset="85%" stopColor="#F7CA4F" />
                  <stop offset="100%" stopColor="#FFF2D0" />
                </linearGradient>

                {/* Background Volumetric Liquid Layer */}
                <linearGradient
                  id="pureOilBack"
                  x1="0"
                  y1="240"
                  x2="0"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#874703" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#BD720E" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#E0981D" stopOpacity="0.75" />
                </linearGradient>

                {/* Meniscus Surface Glow */}
                <linearGradient id="meniscusBeam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E5A122" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#FFFDF7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#E5A122" stopOpacity="0.3" />
                </linearGradient>

                {/* Dedicated Horizontal Radiant Gold Sheen for OILS */}
                <linearGradient id="oilsGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C97F14" />
                  <stop offset="25%" stopColor="#E5A122" />
                  <stop offset="50%" stopColor="#FFF2D0" />
                  <stop offset="75%" stopColor="#E5A122" />
                  <stop offset="100%" stopColor="#C97F14" />
                </linearGradient>
              </defs>

              {/* 1. Hollow Glass Outline of the Footer Letters */}
              <text
                x="500"
                y="215"
                textAnchor="middle"
                style={{
                  fontFamily: '"EB Garamond", "ITC Garamond", Garamond, Georgia, serif',
                  fontSize: "245px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                }}
                fill="rgba(255, 252, 246, 0.03)"
                stroke="rgba(212, 155, 62, 0.32)"
                strokeWidth="1.8"
              >
                SRSTI
              </text>

              {/* 2. THE RISING OIL: Clipped inside the letters, waving independently per letter */}
              <g clipPath="url(#srsti-text-clip)">
                {letterWaves.map((lw, idx) => (
                  <g key={`${lw.char}-${idx}`}>
                    {/* Deeper back wave for volumetric liquid depth */}
                    <path d={lw.backPath} fill="url(#pureOilBack)" />

                    {/* Foreground radiant golden oil wave */}
                    <path d={lw.forePath} fill="url(#pureOilGold)" />

                    {/* Glowing surface meniscus line on each individual letter */}
                    <path
                      d={lw.meniscusPath}
                      fill="none"
                      stroke="url(#meniscusBeam)"
                      strokeWidth="3.2"
                    />

                    {/* Effervescent golden bubble rising inside this specific letter */}
                    {progress > 8 && (
                      <circle
                        cx={lw.bubbleX}
                        cy={lw.bubbleY}
                        r={idx % 2 === 0 ? 3.5 : 4}
                        fill="#FFF8E7"
                        opacity={0.8}
                      />
                    )}
                  </g>
                ))}
              </g>

              {/* 3. Golden Outer Rim for Glass Tactility */}
              <text
                x="500"
                y="215"
                textAnchor="middle"
                style={{
                  fontFamily: '"EB Garamond", "ITC Garamond", Garamond, Georgia, serif',
                  fontSize: "245px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                }}
                fill="none"
                stroke="rgba(240, 185, 60, 0.45)"
                strokeWidth="1.2"
                pointerEvents="none"
              >
                SRSTI
              </text>

              {/* 4. "OILS" Directly Below "SRSTI" — bold, prominent, and tightly locked */}
              <text
                x="500"
                y="278"
                textAnchor="middle"
                dx="0.14em"
                style={{
                  fontFamily: '"EB Garamond", "ITC Garamond", Garamond, Georgia, serif',
                  fontSize: "62px",
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                }}
                fill="url(#oilsGold)"
                stroke="rgba(255, 242, 208, 0.45)"
                strokeWidth="0.8"
              >
                OILS
              </text>
            </svg>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
