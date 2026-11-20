import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import drizzle from "@/assets/ritual-drizzle.webp";
import saute from "@/assets/ritual-saute.webp";
import ayurveda from "@/assets/ritual-ayurveda.webp";
import pour from "@/assets/craft-pour.webp";
import { setMood, type Mood } from "@/lib/srsti/scene-state";
import { scrollRef, scrollToTarget } from "@/lib/srsti/smooth-scroll";
import { cn } from "@/lib/utils";
import { SplitReveal } from "./motion";

const RITUALS: {
  id: Mood;
  number: string;
  subtitle: string;
  label: string;
  shortLabel: string;
  title: string;
  body: string;
  oil: string;
  temp: string;
  image: string;
  alt: string;
  steps: string[];
}[] = [
  {
    id: "drizzle",
    number: "01",
    subtitle: "Raw Finishing & Dressings",
    label: "Drizzle",
    shortLabel: "Drizzle",
    title: "Finish raw, taste everything.",
    body: "Unheated, a cold-pressed oil shows its full character — peanut sweetness, coconut cream, the toastiness of til. Pour it last, over the warm or the fresh.",
    oil: "Virgin Coconut · Groundnut",
    temp: "Room temperature",
    image: drizzle,
    alt: "Golden oil drizzled over a heirloom tomato and burrata salad",
    steps: ["Over warm dal and rice", "On ripe tomatoes and curd", "Into chutneys and podi"],
  },
  {
    id: "saute",
    number: "02",
    subtitle: "The Sacred Flame & Tadka",
    label: "Sauté",
    shortLabel: "Sauté",
    title: "The crackle of a true tadka.",
    body: "High smoke points mean mustard seeds can pop and curry leaves can blister without the oil breaking down. Bold heat, clean flavour.",
    oil: "A2 Ghee · Groundnut",
    temp: "Up to 225–250°C",
    image: saute,
    alt: "Mustard seeds and curry leaves crackling in hot oil in a cast iron kadai",
    steps: [
      "Heat until it shimmers",
      "Mustard, then cumin, then curry leaf",
      "Pour over while it sings",
    ],
  },
  {
    id: "ritual",
    number: "03",
    subtitle: "Ayurvedic Body Ritual",
    label: "Ayurvedic Ritual",
    shortLabel: "Ayurveda",
    title: "Abhyanga, at dusk.",
    body: "Warm black sesame oil, massaged from crown to feet before a bath — the daily ritual Ayurveda prescribes for grounding Vata and nourishing skin.",
    oil: "Black Sesame",
    temp: "Gently warmed, ~40°C",
    image: ayurveda,
    alt: "A brass bowl of sesame oil beside a lit diya, marigolds and jasmine",
    steps: [
      "Warm a small bowl in water",
      "Long strokes on limbs, circles on joints",
      "Rest fifteen minutes, then bathe",
    ],
  },
  {
    id: "water",
    number: "04",
    subtitle: "Sacred Crystalline Hydration",
    label: "Living Water",
    shortLabel: "Water",
    title: "Crystal clarity, sacred hydration.",
    body: "Sacred mountain spring water, living with natural minerals. Experience pure crystal liquid dynamics, sapphire oceanic depth, sunlit caustic shimmer, and diamond crest sparkles.",
    oil: "Spring Water · Vitality",
    temp: "Chilled or room temp, ~18°C",
    image: pour,
    alt: "Pure living spring water pouring with crystalline sunlight reflections",
    steps: [
      "Infused in a pure copper vessel",
      "Sipped slowly at morning dawn",
      "Revitalising every cell with clarity",
    ],
  },
];

export function Rituals() {
  const [active, setActive] = useState<Mood>("drizzle");
  const [travelDir, setTravelDir] = useState<number>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const isManualRef = useRef(false);
  const activeIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = RITUALS.findIndex((r) => r.id === active);
  const current = RITUALS[activeIndex !== -1 ? activeIndex : 0]!;

  const triggerWaterRipple = (idx: number) => {
    if (typeof window === "undefined") return;
    const btn = tabs.current[idx];
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const normX = ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
    const normY = -((rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;
    window.dispatchEvent(
      new CustomEvent("srsti-water-ripple", {
        detail: { x: normX * 1.8, y: normY * 1.2, strength: 1.25 },
      })
    );
  };

  const select = (m: Mood, i?: number) => {
    const idx = i ?? RITUALS.findIndex((r) => r.id === m);
    if (idx === -1) return;

    const prevIdx = activeIndexRef.current;
    if (idx !== prevIdx) {
      setTravelDir(idx > prevIdx ? 1 : -1);
    }

    setActive(m);
    setMood(m);
    activeIndexRef.current = idx;
    triggerWaterRipple(idx);

    const sec = sectionRef.current;
    if (sec) {
      isManualRef.current = true;
      const rect = sec.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const startY = scrollTop + rect.top;
      const scrollableDistance = Math.max(1, sec.offsetHeight - window.innerHeight);
      const targetY = startY + ((idx + 0.5) / RITUALS.length) * scrollableDistance;

      scrollToTarget(targetY);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isManualRef.current = false;
      }, 1200);
    }
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + RITUALS.length) % RITUALS.length;
    select(RITUALS[next]!.id, next);
    tabs.current[next]?.focus();
  };

  // High-performance live scroll tracker: seamlessly steps through the 4 rituals
  // on scroll across all devices (desktop, laptop, tablet, mobile) with zero lag.
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;
    let isTicking = false;

    const updateRitualFromScroll = () => {
      isTicking = false;
      const sec = sectionRef.current;
      if (!sec || isManualRef.current) return;

      const rect = sec.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      // rect.top is 0 when the section top reaches top of viewport.
      // -rect.top is the distance scrolled into the section.
      const rawProgress = -rect.top / totalScrollable;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Map 0..1 to ritual index 0..3
      const idx = Math.min(RITUALS.length - 1, Math.max(0, Math.floor(progress * RITUALS.length)));

      if (idx !== activeIndexRef.current) {
        const prevIdx = activeIndexRef.current;
        setTravelDir(idx > prevIdx ? 1 : -1);
        activeIndexRef.current = idx;
        const target = RITUALS[idx]!;
        setActive(target.id);
        setMood(target.id);
        triggerWaterRipple(idx);
      }
    };

    const onScrollOrResize = () => {
      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(updateRitualFromScroll);
      }
    };

    const onUserCancelManual = () => {
      isManualRef.current = false;
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("wheel", onUserCancelManual, { passive: true });
    window.addEventListener("touchmove", onUserCancelManual, { passive: true });

    // Also attach to Lenis if active
    let unbindLenis: (() => void) | undefined;
    if (scrollRef.lenis) {
      scrollRef.lenis.on("scroll", onScrollOrResize);
      unbindLenis = () => {
        scrollRef.lenis?.off("scroll", onScrollOrResize);
      };
    } else {
      const checkInterval = setInterval(() => {
        if (scrollRef.lenis) {
          scrollRef.lenis.on("scroll", onScrollOrResize);
          unbindLenis = () => {
            scrollRef.lenis?.off("scroll", onScrollOrResize);
          };
          clearInterval(checkInterval);
        }
      }, 150);
      setTimeout(() => clearInterval(checkInterval), 2500);
    }

    // Initial check
    updateRitualFromScroll();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("wheel", onUserCancelManual);
      window.removeEventListener("touchmove", onUserCancelManual);
      cancelAnimationFrame(rafId);
      unbindLenis?.();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rituals"
      aria-labelledby="rituals-title"
      className="relative min-h-[300vh] md:min-h-[320vh] lg:min-h-[340vh]"
    >
      {/* Viewport frame: centered and proportional across mobile and desktop */}
      <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center px-4 py-3 sm:py-6 sm:px-6 md:px-8 md:py-10 lg:px-10">
        <div className="mx-auto w-full max-w-xl md:max-w-7xl">
          {/* Section Header */}
          <div className="mb-2.5 sm:mb-5 md:mb-6 md:flex md:items-end md:justify-between lg:mb-8">
            <div>
              <p className="eyebrow mb-1 text-[10px] sm:text-xs tracking-[0.2em] text-gold-ink font-semibold">
                Culinary &amp; Wellness Rituals
              </p>
              <h2
                id="rituals-title"
                className="font-display text-xl sm:text-3xl md:text-4xl lg:text-[clamp(2.4rem,4.2vw,4.8rem)] font-bold leading-tight tracking-tight text-foreground"
              >
                Choose your ritual.
              </h2>
            </div>

            {/* Interactive Tab Controls */}
            <div className="mt-3 md:mt-0 w-full md:w-auto">
              <div
                role="tablist"
                aria-label="Ritual mood"
                className="glass-panel relative grid grid-cols-4 md:inline-flex w-full md:w-auto rounded-full p-1 sm:p-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.08),0_8px_25px_-8px_rgba(0,0,0,0.12)] backdrop-blur-md text-center"
              >
                {RITUALS.map((r, i) => (
                  <button
                    key={r.id}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${r.id}`}
                    aria-selected={active === r.id}
                    aria-controls="ritual-panel"
                    tabIndex={active === r.id ? 0 : -1}
                    onClick={() => select(r.id, i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={cn(
                      "relative min-h-8 sm:min-h-9 md:min-h-11 rounded-full px-1.5 sm:px-3 md:px-5 font-display text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.08em] sm:tracking-[0.12em] transition-colors duration-300 flex items-center justify-center text-center",
                      active === r.id
                        ? "text-white font-semibold"
                        : "text-foreground/75 hover:text-foreground",
                    )}
                  >
                    {active === r.id && (
                      <motion.span
                        layoutId="ritual-pill"
                        className="pointer-events-none absolute inset-0 z-0"
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 20,
                          mass: 0.65,
                        }}
                      >
                        {/* Liquid droplet body */}
                        <motion.span
                          key={`droplet-${active}`}
                          initial={{
                            scaleX: 1.18,
                            scaleY: 0.88,
                            skewX: travelDir * -6,
                          }}
                          animate={{
                            scaleX: [1.18, 0.94, 1.05, 0.99, 1],
                            scaleY: [0.88, 1.10, 0.97, 1.01, 1],
                            skewX: [travelDir * -8, travelDir * 4, travelDir * -1.5, 0],
                            borderRadius: [
                              "9999px",
                              travelDir >= 0 ? "18px 28px 18px 28px" : "28px 18px 28px 18px",
                              travelDir >= 0 ? "26px 20px 26px 20px" : "20px 26px 20px 26px",
                              "9999px",
                            ],
                          }}
                          transition={{
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={cn(
                            "absolute inset-0 block rounded-full overflow-hidden transition-colors duration-500",
                            r.id === "saute" && "bg-gradient-to-b from-[#5c6674] via-[#454e5b] to-[#343b46]",
                            r.id === "ritual" && "bg-gradient-to-b from-[#6e3c20] via-[#522a15] to-[#3a1c0d]",
                            r.id === "drizzle" && "bg-gradient-to-b from-[#256332] via-[#1a4a24] to-[#103017]",
                            r.id === "water" && "bg-gradient-to-b from-[#2691ad] via-[#186a80] to-[#0e4352]",
                          )}
                          style={{
                            boxShadow:
                              "inset 0 1.5px 2px rgba(255, 255, 255, 0.65), inset 0 -2px 4px rgba(0, 0, 0, 0.35), 0 6px 18px -2px rgba(0, 0, 0, 0.32)",
                          }}
                        >
                          <span className="pointer-events-none absolute inset-x-2 top-0.5 h-[48%] rounded-full bg-gradient-to-b from-white/55 via-white/12 to-transparent" />
                          <span className="pointer-events-none absolute inset-x-3 bottom-0.5 h-[28%] rounded-full bg-gradient-to-t from-white/20 to-transparent blur-[0.5px]" />
                        </motion.span>
                      </motion.span>
                    )}
                    <span
                      className={cn(
                        "relative z-10 transition-all duration-300 truncate",
                        active === r.id && "drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                      )}
                    >
                      <span className="md:hidden">{r.shortLabel}</span>
                      <span className="hidden md:inline">{r.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ritual Panel Card - Natural, self-contained luxury artifact (NO vertical stretching) */}
          <div
            id="ritual-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            className={cn(
              "glass-panel overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border shadow-2xl transition-all duration-700 md:grid md:grid-cols-2",
              active === "saute" && "border-zinc-400/35",
              active === "ritual" && "border-[#7c4428]/40",
              active === "drizzle" && "border-emerald-600/30",
              active === "water" && "border-cyan-600/30",
            )}
          >
            {/* Image Banner: Natural proportional aspect ratio on mobile, full column on desktop */}
            <div className="relative aspect-[16/9] sm:aspect-[16/9] md:aspect-auto md:min-h-[460px] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.alt}
                  loading="lazy"
                  width={1100}
                  height={1375}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Editorial Content: Tight, cohesive luxury spacing */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-10"
              >
                <div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                    {current.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 font-display text-xs sm:text-sm md:text-base leading-relaxed text-foreground/80 font-light">
                    {current.body}
                  </p>

                  {/* Clean Editorial Typographic List (NO pill buttons / survey boxes) */}
                  <ol className="mt-3 sm:mt-5 space-y-1.5 sm:space-y-2 font-display">
                    {current.steps.map((s, i) => (
                      <li key={s} className="flex items-baseline gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-base text-foreground/90">
                        <span className={cn(
                          "font-display text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-500",
                          current.id === "saute" && "text-zinc-500",
                          current.id === "ritual" && "text-[#8c5332]",
                          current.id === "drizzle" && "text-emerald-700",
                          current.id === "water" && "text-cyan-700",
                        )}>
                          0{i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Specs: Anchored directly below step 03 with an elegant hairline divider */}
                <dl className="mt-3.5 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4 border-t border-foreground/10 pt-3 sm:pt-4 md:gap-6 md:pt-5">
                  <div>
                    <dt className="eyebrow text-[9px] sm:text-xs tracking-[0.2em] text-gold-ink font-semibold">
                      [ Best with ]
                    </dt>
                    <dd className="mt-0.5 sm:mt-1 font-display text-xs sm:text-base md:text-lg font-semibold text-foreground">
                      {current.oil}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[9px] sm:text-xs tracking-[0.2em] text-gold-ink font-semibold">
                      [ Temperature ]
                    </dt>
                    <dd className="mt-0.5 sm:mt-1 font-display text-xs sm:text-base md:text-lg font-semibold text-foreground">
                      {current.temp}
                    </dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
