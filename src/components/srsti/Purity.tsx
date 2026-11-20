import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import farm from "@/assets/purity-farm.webp";
import refinery from "@/assets/purity-refinery.webp";
import { Counter, FadeUp, SplitReveal } from "./motion";

const COMPARE = [
  ["Extraction heat", "Under 35°C", "200–270°C"],
  ["Chemical solvents", "None", "Hexane"],
  ["Bleaching & deodorising", "Never", "Clay, steam, caustic soda"],
  ["Natural aroma & colour", "Intact", "Stripped"],
  ["Farm traceability", "Every batch", "Blended, untraceable"],
];

export function Purity() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

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
            2. MOBILE VIEW (Clean, Natural Comparison Cards without Table Squish)
           ========================================================================= */}
        <div className="block lg:hidden">
          {/* Mobile Header */}
          <div className="mb-6">
            <p className="eyebrow mb-3">Purity &amp; Traceability</p>
            <SplitReveal
              as="h2"
              text="What we leave out matters most."
              className="font-display text-[clamp(2.1rem,6vw,2.8rem)] font-medium leading-[0.98] tracking-tight text-foreground"
            />
            <FadeUp delay={0.1}>
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-muted-foreground font-light">
                Supermarket oil is pressed hot, washed in solvent, bleached and steamed until it has no smell, no colour — and no story. Ours keeps all three.
              </p>
            </FadeUp>
          </div>

          {/* Farm Photo */}
          <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[16/10] border border-foreground/10 shadow-glass">
            <img
              src={farm}
              alt="A farmer holding freshly harvested groundnuts above red soil"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="eyebrow text-[10px] text-gold-ink">SRSTI</span>
              <p className="font-display text-xs sm:text-sm font-medium mt-0.5">
                Single-origin harvest, Anantapur. Pressed within 21 days of pulling from the soil.
              </p>
            </div>
          </div>

          {/* Comparison Cards based directly on COMPARE data (No AI jargon, no squished tables) */}
          <div className="space-y-3">
            {COMPARE.map(([attr, srsti, refined]) => (
              <div
                key={attr}
                className="glass-panel rounded-2xl p-4 border border-foreground/10 shadow-xs"
              >
                <p className="eyebrow text-xs mb-3 text-foreground/80">{attr}</p>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* SRSTI */}
                  <div className="rounded-xl bg-[#FAF6EE] dark:bg-card p-3 border border-foreground/10">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1">
                      <Check className="size-3.5 text-gold-ink stroke-[2.5]" />
                      <span>SRSTI</span>
                    </div>
                    <p className="font-display text-sm font-semibold text-foreground">
                      {srsti}
                    </p>
                  </div>

                  {/* Refined */}
                  <div className="rounded-xl bg-foreground/[0.03] p-3 border border-foreground/10">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <X className="size-3.5 text-muted-foreground/60 stroke-[2]" />
                      <span>Refined</span>
                    </div>
                    <p className="font-display text-sm text-muted-foreground">
                      {refined}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Numerical Metrics Counter Strip (Shared across both PC and Mobile) */}
        <dl className="mt-16 sm:mt-24 grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12 border-t border-foreground/10 pt-10 sm:pt-12 lg:grid-cols-4">
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
