import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AlertTriangle, Check, Leaf, ShieldCheck, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import farm from "@/assets/purity-farm.webp";
import refinery from "@/assets/purity-refinery.webp";
import { cn } from "@/lib/utils";
import { Counter, FadeUp, SplitReveal } from "./motion";

// Original Editorial Table Data for PC / Desktop
const COMPARE = [
  ["Extraction heat", "Under 35°C", "200–270°C"],
  ["Chemical solvents", "None", "Hexane"],
  ["Bleaching & deodorising", "Never", "Clay, steam, caustic soda"],
  ["Natural aroma & colour", "Intact", "Stripped"],
  ["Farm traceability", "Every batch", "Blended, untraceable"],
];

// Forensic Pillars for Mobile Cards
interface PurityPillar {
  id: string;
  number: string;
  label: string;
  srsti: {
    metric: string;
    headline: string;
    description: string;
    tag: string;
  };
  refined: {
    metric: string;
    headline: string;
    description: string;
    tag: string;
  };
}

const PURITY_PILLARS: PurityPillar[] = [
  {
    id: "heat",
    number: "01",
    label: "Extraction Heat",
    srsti: {
      metric: "< 35°C",
      headline: "True Cold Pressing",
      description:
        "Slow neem-wood ghani friction maintains temperatures below human body heat. Protects living enzymes, polyphenol antioxidants, and delicate seed aromatics.",
      tag: "Living Biological Nectar",
    },
    refined: {
      metric: "200°–270°C",
      headline: "Extreme Thermal Breakdown",
      description:
        "Industrial high-speed screw presses heat oil past 200°C to extract maximum yield, denaturing proteins and generating harmful trans-fatty acids.",
      tag: "Thermally Degraded",
    },
  },
  {
    id: "solvents",
    number: "02",
    label: "Chemical Solvents",
    srsti: {
      metric: "0.0%",
      headline: "Zero Chemical Solvents",
      description:
        "Extracted purely through mechanical pressure between native seed and aged timber. Never touched by hexane, acetone, or petroleum ether.",
      tag: "Pure Mechanical Press",
    },
    refined: {
      metric: "Hexane Wash",
      headline: "Petroleum Solvent Baths",
      description:
        "Crushed seeds are soaked in neurotoxic hexane solvent baths to force out the final 15% residual oil yield, requiring chemical evaporation.",
      tag: "Petrochemical Flush",
    },
  },
  {
    id: "bleaching",
    number: "03",
    label: "Clarification & Bleaching",
    srsti: {
      metric: "48 Hours",
      headline: "Sunlight Gravity Settle",
      description:
        "Pressed oil rests quietly in stainless tanks while natural gravity settles particulate. Clarified by sunlight and time — never acid-washed.",
      tag: "Natural Sunlight Rest",
    },
    refined: {
      metric: "Acid & Clay",
      headline: "Bleached & Deodorised",
      description:
        "Heated oil is stripped with bentonite clay, caustic soda (lye), and 260°C vacuum steam to disguise oxidized low-grade seeds.",
      tag: "Chemical Stripping",
    },
  },
  {
    id: "aroma",
    number: "04",
    label: "Native Aroma & Colour",
    srsti: {
      metric: "100% Intact",
      headline: "Living Aroma & Golden Viscosity",
      description:
        "Authentic varietal bouquet — sweet native peanut, toasted sesame warmth, virgin coconut cream. Viscous, unfiltered, and honest to the soil.",
      tag: "Full Sensory Character",
    },
    refined: {
      metric: "Stripped Dead",
      headline: "Odorless, Bland Liquid",
      description:
        "All natural aromatics, pigments, and micronutrients are permanently vaporized to manufacture artificial supermarket shelf uniformity.",
      tag: "Sterile Commodity",
    },
  },
  {
    id: "traceability",
    number: "05",
    label: "Harvest Provenance",
    srsti: {
      metric: "Every Batch",
      headline: "Single-Farm Batch Traced",
      description:
        "Every bottle stamped with an individual batch QR code linking directly to partner farm GPS coordinates and third-party NABL gas chromatography purity tests.",
      tag: "Verifiable Lab Report",
    },
    refined: {
      metric: "Untraceable",
      headline: "Blended Bulk Commodity",
      description:
        "Imported and domestic commodity seeds pooled into gargantuan industrial holding silos with zero farm accountability or origin history.",
      tag: "Anonymous Aggregation",
    },
  },
];

export function Purity() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeWorld, setActiveWorld] = useState<"srsti" | "refined">("srsti");

  useEffect(() => {
    const q = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(q.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    q.addEventListener("change", handler);
    return () => q.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const k = reduce || !isDesktop ? 0 : 1;
  const ySlow = useTransform(scrollYProgress, [0, 1], [60 * k, -60 * k]);
  const yFast = useTransform(scrollYProgress, [0, 1], [180 * k, -180 * k]);
  const yMid = useTransform(scrollYProgress, [0, 1], [110 * k, -110 * k]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={ref}
      id="purity"
      aria-labelledby="purity-title"
      className="relative bg-veil px-4 pt-8 pb-20 sm:px-6 md:px-10 md:pt-12 md:pb-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* =========================================================================
            1. PC / DESKTOP VIEW (Original Editorial Layout with Parallax & Table)
           ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:pt-10">
            <p className="eyebrow mb-5">Purity & Traceability</p>
            <SplitReveal
              as="h2"
              text="What we leave out matters most."
              className="font-display text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[0.95] tracking-tight"
            />
            <span id="purity-title" className="sr-only">
              Purity and traceability
            </span>
            <FadeUp delay={0.15}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground font-light">
                Supermarket oil is pressed hot, washed in solvent, bleached and steamed until it has
                no smell, no colour — and no story. Ours keeps all three.
              </p>
            </FadeUp>
          </div>

          <motion.figure style={{ y: ySlow }} className="relative lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-glass md:aspect-[5/4] lg:aspect-[4/5]">
              <motion.img
                style={{ scale: imgScale }}
                src={farm}
                alt="A farmer holding freshly harvested groundnuts above red soil at golden hour"
                loading="lazy"
                width={1100}
                height={1375}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <figcaption className="glass-panel absolute bottom-5 left-5 right-5 rounded-2xl p-4 text-sm md:right-auto md:max-w-xs">
              <span className="eyebrow">SRSTI</span>
              <p className="mt-1">
                Single-origin harvest, Anantapur. Pressed within 21 days of pulling from the soil.
              </p>
            </figcaption>
          </motion.figure>

          <motion.figure
            style={{ y: yFast }}
            className="relative lg:col-span-4 lg:col-start-2 lg:-mt-40"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <img
                src={refinery}
                alt="A sterile industrial oil refinery with steel tanks"
                loading="lazy"
                width={1100}
                height={825}
                className="absolute inset-0 size-full object-cover grayscale"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Industrial refined oil — heated, solvent-washed, bleached.
            </figcaption>
          </motion.figure>

          <motion.div style={{ y: yMid }} className="lg:col-span-6 lg:col-start-7 lg:mt-16">
            {/* Unified Editorial Comparison Table for PC */}
            <div className="glass-panel overflow-hidden rounded-3xl p-6 md:p-8 shadow-xs border border-foreground/10">
              <div className="mb-4 flex items-center justify-between border-b border-foreground/10 pb-3">
                <span className="eyebrow text-xs">Purity Comparison</span>
                <span className="font-display text-xs text-muted-foreground">Certified 20+ Lab Tests</span>
              </div>
              <div className="w-full overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse text-sm md:text-base">
                  <caption className="sr-only">SRSTI compared with industrial refined oils</caption>
                  <thead>
                    <tr className="border-b border-foreground/15">
                      <th scope="col" className="py-3 pr-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground w-[38%]">
                        Specification
                      </th>
                      <th scope="col" className="py-3 px-2 font-display text-base md:text-lg font-bold text-foreground w-[32%]">
                        SRSTI
                      </th>
                      <th scope="col" className="py-3 pl-2 font-display text-base md:text-lg font-medium text-muted-foreground/75 w-[30%]">
                        Refined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10">
                    {COMPARE.map(([attr, srsti, refined]) => (
                      <tr key={attr} className="transition-colors hover:bg-foreground/[0.02]">
                        <th scope="row" className="py-3.5 pr-2 font-normal text-foreground/80 font-display text-xs md:text-sm">
                          {attr}
                        </th>
                        <td className="py-3.5 px-2 font-display text-xs md:text-sm font-semibold text-foreground">
                          <span className="inline-flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400">
                            <Check className="size-3.5 shrink-0 text-gold-ink stroke-[2.5]" aria-hidden />
                            <span>{srsti}</span>
                          </span>
                        </td>
                        <td className="py-3.5 pl-2 font-display text-xs md:text-sm text-muted-foreground/75">
                          <span className="inline-flex items-center gap-1.5">
                            <X className="size-3.5 shrink-0 text-muted-foreground/50 stroke-[2]" aria-hidden />
                            <span>{refined}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            2. MOBILE VIEW (Touch-Optimized Dossier Cards with Zero Table Overflow)
           ========================================================================= */}
        <div className="block lg:hidden">
          {/* Mobile Header */}
          <div className="mb-8">
            <p className="eyebrow mb-3">Purity & Traceability</p>
            <SplitReveal
              as="h2"
              text="What we leave out matters most."
              className="font-display text-[clamp(2.2rem,6vw,3.2rem)] font-medium leading-[0.98] tracking-tight text-foreground"
            />
            <FadeUp delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground font-light">
                Supermarket oil is heated past 200°C, washed in solvent, bleached and steamed until it has no smell, no colour — and no story. Ours keeps all three.
              </p>
            </FadeUp>
          </div>

          {/* Mobile World Switcher */}
          <div className="mb-6 flex rounded-full bg-foreground/[0.06] p-1 border border-foreground/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveWorld("srsti")}
              className={cn(
                "relative flex-1 rounded-full py-2.5 px-3 text-center font-display text-xs uppercase tracking-[0.12em] transition-colors duration-300 flex items-center justify-center gap-1.5",
                activeWorld === "srsti" ? "text-white font-semibold" : "text-foreground/70 hover:text-foreground"
              )}
            >
              {activeWorld === "srsti" && (
                <motion.span
                  layoutId="purity-world-pill-mobile"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1b3324] to-[#122419] shadow-md z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Leaf className="size-3.5 text-gold" />
                <span>SRSTI Living Press</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveWorld("refined")}
              className={cn(
                "relative flex-1 rounded-full py-2.5 px-3 text-center font-display text-xs uppercase tracking-[0.12em] transition-colors duration-300 flex items-center justify-center gap-1.5",
                activeWorld === "refined" ? "text-white font-semibold" : "text-foreground/70 hover:text-foreground"
              )}
            >
              {activeWorld === "refined" && (
                <motion.span
                  layoutId="purity-world-pill-mobile"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#383d42] to-[#25282c] shadow-md z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <AlertTriangle className="size-3.5 text-amber-400" />
                <span>Industrial Refined</span>
              </span>
            </button>
          </div>

          {/* Mobile Single-World Active Card */}
          <AnimatePresence mode="wait">
            {activeWorld === "srsti" ? (
              <motion.div
                key="mobile-srsti"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#131f17] via-[#0d1610] to-[#070d09] text-[#f7f5ed] border border-[#3b5243]/50 shadow-2xl p-5 sm:p-6"
              >
                {/* Visual Artifact Header */}
                <div className="relative mb-5 overflow-hidden rounded-2xl aspect-[16/10] border border-white/10 shadow-inner">
                  <img
                    src={farm}
                    alt="Farmer holding native groundnut harvest at golden hour"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-widest text-gold text-[10px] font-semibold">
                      Anantapur Native Seeds · Vaagai Ghani
                    </span>
                    <span className="rounded-full bg-black/60 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/90 backdrop-blur-md">
                      &lt; 35°C
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold font-medium">
                    The SRSTI Standard
                  </span>
                  <span className="font-mono text-[10px] text-gold/80">Certified 0.0% Chemicals</span>
                </div>

                {/* Mobile Cards List */}
                <div className="space-y-3">
                  {PURITY_PILLARS.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                          {pillar.number} · {pillar.label}
                        </span>
                        <span className="rounded-full bg-gold/10 border border-gold/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold font-medium">
                          {pillar.srsti.tag}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-base font-medium text-white">
                          {pillar.srsti.headline}
                        </h4>
                        <span className="font-display text-xl font-bold text-gold shrink-0">
                          {pillar.srsti.metric}
                        </span>
                      </div>

                      <p className="mt-1.5 text-xs leading-relaxed text-white/75 font-light">
                        {pillar.srsti.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2.5 border-t border-white/10 pt-4 text-xs text-white/60">
                  <ShieldCheck className="size-4 text-gold shrink-0" />
                  <span>Tested for 20+ chemical adulterants by NABL accredited laboratories.</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-refined"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1c1f] via-[#141517] to-[#0d0e10] text-[#f7f5ed] border border-zinc-700/50 shadow-2xl p-5 sm:p-6"
              >
                {/* Visual Artifact Header */}
                <div className="relative mb-5 overflow-hidden rounded-2xl aspect-[16/10] border border-white/10 shadow-inner">
                  <img
                    src={refinery}
                    alt="Industrial oil refinery plant"
                    className="size-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-widest text-zinc-300 text-[10px] font-semibold">
                      Industrial Solvent Extraction Plant
                    </span>
                    <span className="rounded-full bg-red-950/60 border border-red-800/40 px-2 py-0.5 text-[9px] uppercase tracking-wider text-red-300 backdrop-blur-md">
                      200°C–270°C
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-300 font-medium">
                    Supermarket Industry Norm
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400">Heated · Bleached · Deodorised</span>
                </div>

                {/* Mobile Cards List */}
                <div className="space-y-3">
                  {PURITY_PILLARS.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="rounded-2xl border border-zinc-800 bg-white/[0.02] p-4 backdrop-blur-sm"
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                          {pillar.number} · {pillar.label}
                        </span>
                        <span className="rounded-full bg-zinc-800/60 border border-zinc-700 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-red-300 font-medium">
                          {pillar.refined.tag}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-base font-medium text-zinc-200">
                          {pillar.refined.headline}
                        </h4>
                        <span className="font-display text-lg font-bold text-zinc-400 line-through decoration-red-400/60 shrink-0">
                          {pillar.refined.metric}
                        </span>
                      </div>

                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 font-light">
                        {pillar.refined.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2.5 border-t border-white/10 pt-4 text-xs text-zinc-400">
                  <AlertTriangle className="size-4 text-amber-400 shrink-0" />
                  <span>High heat processing strips volatile aromatics, requiring synthetic antioxidants.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated Numerical Metrics Counter Strip (Shared across both) */}
        <dl className="mt-20 sm:mt-28 grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12 border-t border-foreground/10 pt-10 sm:pt-12 lg:grid-cols-4">
          {[
            { to: 0, suffix: "%", label: "Solvents, bleach or additives" },
            { to: 35, prefix: "<", suffix: "°C", label: "Cold extraction ceiling" },
            { to: 100, suffix: "%", label: "Traceable farm batches" },
            { to: 14, label: "Partner family farms" },
          ].map((c) => (
            <div key={c.label}>
              <dd className="font-display text-[clamp(2.2rem,5.5vw,5.5rem)] font-medium leading-none text-gold-gradient">
                <Counter to={c.to} prefix={c.prefix} suffix={c.suffix} />
              </dd>
              <dt className="mt-2 sm:mt-3 max-w-[14rem] text-xs sm:text-sm text-muted-foreground">{c.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
