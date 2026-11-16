import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import drizzle from "@/assets/ritual-drizzle.webp";
import saute from "@/assets/ritual-saute.webp";
import ayurveda from "@/assets/ritual-ayurveda.webp";
import pour from "@/assets/craft-pour.webp";
import { setMood, type Mood } from "@/lib/srsti/scene-state";
import { scrollToTarget } from "@/lib/srsti/smooth-scroll";
import { cn } from "@/lib/utils";
import { SplitReveal } from "./motion";

const RITUALS: {
  id: Mood;
  label: string;
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
    label: "Drizzle",
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
    label: "Sauté",
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
    label: "Ayurvedic Ritual",
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
    label: "Living Water",
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
      const scrollableDistance = sec.offsetHeight - window.innerHeight;
      const targetY = startY + ((idx + 0.5) / RITUALS.length) * scrollableDistance;

      scrollToTarget(targetY);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isManualRef.current = false;
      }, 850);
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

  // ScrollTrigger: Automatically step through the 4 rituals as user scrolls through this section
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sec = sectionRef.current;
    if (!sec) return;

    const trigger = ScrollTrigger.create({
      trigger: sec,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (isManualRef.current) return;
        const p = self.progress;
        // Map 0..1 progress to step 0..3
        const idx = Math.min(RITUALS.length - 1, Math.max(0, Math.floor(p * RITUALS.length)));
        if (idx !== activeIndexRef.current) {
          const prevIdx = activeIndexRef.current;
          setTravelDir(idx > prevIdx ? 1 : -1);
          activeIndexRef.current = idx;
          const target = RITUALS[idx]!;
          setActive(target.id);
          setMood(target.id);
          triggerWaterRipple(idx);
        }
      },
    });

    return () => {
      trigger.kill();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rituals"
      aria-labelledby="rituals-title"
      className="relative min-h-[360vh]"
    >
      {/* Sticky viewport frame that holds the UI in place while user scrolls through the 4 rituals */}
      <div className="sticky top-0 flex min-h-screen flex-col justify-center px-5 py-8 md:px-10 md:py-12">
        <div className="mx-auto w-full max-w-7xl">
          {/* Section Header */}
          <div className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div className="rounded-3xl bg-veil p-5 md:bg-transparent md:p-0">
              <p className="eyebrow mb-4">Culinary & Wellness Rituals</p>
              <SplitReveal
                as="h2"
                text="Choose your ritual."
                className="font-display text-[clamp(2.6rem,5.5vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-foreground"
              />
              <span id="rituals-title" className="sr-only">
                Rituals
              </span>
            </div>

            {/* Interactive Tab Controls with Liquid Water Droplet Highlighter */}
            <div className="self-start md:self-auto">
              <div
                role="tablist"
                aria-label="Ritual mood"
                className="glass-panel relative inline-flex rounded-full p-1.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.08),0_8px_25px_-8px_rgba(0,0,0,0.12)] backdrop-blur-md"
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
                      "relative min-h-11 rounded-full px-4 font-mono text-xs uppercase tracking-wider transition-colors duration-300 md:px-5",
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
                        {/* Liquid droplet body with stretch, squash & organic fluid inertia */}
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
                          {/* Curved liquid meniscus / glassy specular reflection */}
                          <span className="pointer-events-none absolute inset-x-2 top-0.5 h-[48%] rounded-full bg-gradient-to-b from-white/55 via-white/12 to-transparent" />

                          {/* Soft bottom water refraction caustic */}
                          <span className="pointer-events-none absolute inset-x-3 bottom-0.5 h-[28%] rounded-full bg-gradient-to-t from-white/20 to-transparent blur-[0.5px]" />

                          {/* Liquid wave sheen that washes across as it travels */}
                          <motion.span
                            key={`sheen-${active}`}
                            initial={{ x: travelDir >= 0 ? "-120%" : "120%", opacity: 0.85 }}
                            animate={{ x: travelDir >= 0 ? "140%" : "-140%", opacity: [0.85, 0.45, 0] }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="pointer-events-none absolute inset-y-0 w-3/5 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                          />
                        </motion.span>

                        {/* Expanding water ripple ring / droplet shockwave */}
                        <motion.span
                          key={`ripple-${active}`}
                          initial={{ scale: 0.85, opacity: 0.85, borderWidth: "1.5px" }}
                          animate={{ scale: 1.4, opacity: 0, borderWidth: "0.5px" }}
                          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                          className={cn(
                            "pointer-events-none absolute -inset-0.5 rounded-full border",
                            r.id === "saute" && "border-zinc-300/80",
                            r.id === "ritual" && "border-amber-200/75",
                            r.id === "drizzle" && "border-emerald-200/75",
                            r.id === "water" && "border-cyan-200/80",
                          )}
                        />
                      </motion.span>
                    )}
                    <span
                      className={cn(
                        "relative z-10 transition-all duration-300",
                        active === r.id && "drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                      )}
                    >
                      {r.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ritual Panel Card */}
          <div
            id="ritual-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            className={cn(
              "glass-panel grid max-h-[78vh] overflow-hidden rounded-[2rem] shadow-lg transition-colors duration-700 md:grid-cols-2",
              active === "saute" && "border-zinc-400/30",
              active === "ritual" && "border-[#7c4428]/35",
            )}
          >
            {/* Left: Image with crossfade */}
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[480px]">
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

            {/* Right: Content details */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-center overflow-y-auto p-6 md:p-10 lg:p-12"
              >
                <h3 className="font-display text-3xl font-bold leading-[1.02] text-foreground md:text-4xl lg:text-5xl">
                  {current.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-foreground/80 md:mt-5 md:text-base">
                  {current.body}
                </p>
                <ol className="mt-6 space-y-2.5 font-sans md:space-y-3">
                  {current.steps.map((s, i) => (
                    <li key={s} className="flex items-baseline gap-3 text-sm text-foreground/90 md:text-base">
                      <span className={cn(
                        "font-mono text-xs font-semibold transition-colors duration-500",
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
                <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-foreground/10 pt-5 md:gap-6">
                  <div>
                    <dt className="eyebrow">[ Best with ]</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-foreground md:text-xl">
                      {current.oil}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">[ Temperature ]</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-foreground md:text-xl">
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
