import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, X } from "lucide-react";
import { useRef } from "react";

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const k = reduce ? 0 : 1;
  const ySlow = useTransform(scrollYProgress, [0, 1], [60 * k, -60 * k]);
  const yFast = useTransform(scrollYProgress, [0, 1], [180 * k, -180 * k]);
  const yMid = useTransform(scrollYProgress, [0, 1], [110 * k, -110 * k]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={ref}
      id="purity"
      aria-labelledby="purity-title"
      className="relative bg-veil px-5 pt-8 pb-20 md:px-10 md:pt-12 md:pb-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
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
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
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
            <table className="w-full text-left text-sm md:text-base">
              <caption className="sr-only">SRSTI compared with industrial refined oils</caption>
              <thead>
                <tr className="border-b border-foreground/15">
                  <th scope="col" className="py-3 font-normal text-muted-foreground">
                    <span className="sr-only">Attribute</span>
                  </th>
                  <th scope="col" className="py-3 font-display text-xl font-medium">
                    SRSTI
                  </th>
                  <th
                    scope="col"
                    className="py-3 font-display text-xl font-medium text-muted-foreground"
                  >
                    Refined
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([k2, a, b]) => (
                  <tr key={k2} className="border-b border-border">
                    <th scope="row" className="py-4 pr-4 font-normal text-muted-foreground">
                      {k2}
                    </th>
                    <td className="py-4 pr-4">
                      <span className="inline-flex items-center gap-2">
                        <Check className="size-4 text-gold-ink" aria-hidden /> {a}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <X className="size-4" aria-hidden /> {b}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        <dl className="mt-28 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-foreground/10 pt-12 lg:grid-cols-4">
          {[
            { to: 0, suffix: "%", label: "Solvents, bleach or additives" },
            { to: 35, prefix: "<", suffix: "°C", label: "Cold extraction ceiling" },
            { to: 100, suffix: "%", label: "Traceable farm batches" },
            { to: 14, label: "Partner family farms" },
          ].map((c) => (
            <div key={c.label}>
              <dd className="font-display text-[clamp(3.2rem,6vw,5.5rem)] font-medium leading-none text-gold-gradient">
                <Counter to={c.to} prefix={c.prefix} suffix={c.suffix} />
              </dd>
              <dt className="mt-3 max-w-[14rem] text-sm text-muted-foreground">{c.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
