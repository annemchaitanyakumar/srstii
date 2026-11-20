import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";

import { scrollToTarget } from "@/lib/srsti/smooth-scroll";
import { MagneticButton } from "./MagneticButton";
import { SplitReveal } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yFore = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);
  const yMeta = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 sm:px-6 md:px-10 pb-20 pt-24 sm:pb-16 sm:pt-32 lg:pt-36"
    >
      <motion.div
        style={{ y: yFore, opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center my-auto"
      >
        {/* Bold condensed Garamond centerpiece */}
        <h1
          id="hero-title"
          className="font-display text-[clamp(2.9rem,10vw,9.2rem)] font-bold leading-[0.95] sm:leading-[0.93] tracking-[-0.035em] text-foreground"
        >
          <SplitReveal text="Pure. Real." className="block font-bold" delay={0.25} immediate />
          <SplitReveal
            text="Liquid Heritage."
            className="block font-medium italic text-gold-gradient"
            delay={0.42}
            immediate
          />
        </h1>

        {/* Descriptive editorial lead */}
        <motion.p
          className="mt-5 sm:mt-7 max-w-lg sm:max-w-xl text-center font-display text-base sm:text-lg md:text-xl font-normal leading-relaxed text-foreground/85 px-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.85 }}
        >
          Heirloom seeds, slow-turned in neem-wood ghanis below 35°C. Never blended,
          never refined — 100% single-origin cold-pressed vitality straight from the harvest.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 font-display w-full sm:w-auto px-4 sm:px-0 max-w-xs sm:max-w-none"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.05 }}
        >
          <MagneticButton onClick={() => scrollToTarget("#craft")} className="w-full sm:w-auto min-h-12 text-base">
            Explore the Harvest <ArrowRight className="size-4" />
          </MagneticButton>
          <MagneticButton variant="outline" onClick={() => scrollToTarget("#collection")} className="w-full sm:w-auto min-h-12 text-base">
            Shop Collection
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Floating Trust Metrics - Hidden on mobile screens, shown on tablet/desktop */}
      <motion.dl
        style={{ y: yMeta, opacity: fade }}
        className="glass-panel relative z-10 mx-auto mt-10 sm:mt-14 lg:mt-16 hidden sm:grid w-full max-w-4xl grid-cols-3 divide-x divide-foreground/10 rounded-2xl p-5 md:p-6 font-display"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 1.25 }}
      >
        {[
          ["< 35°C", "COLD EXTRACTION", "Preserving live nutrients"],
          ["0%", "SOLVENTS OR BLEACH", "Raw, unrefined purity"],
          ["12 RPM", "NEEM-WOOD GHANI", "Artisanal slow turn"],
        ].map(([v, l, sub]) => (
          <div key={l} className="px-3 text-center md:px-6 font-display">
            <span className="font-display text-[11px] sm:text-xs font-medium tracking-[0.14em] sm:tracking-[0.16em] text-foreground/60">[ {l} ]</span>
            <dd className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-0.5 sm:mt-1">{v}</dd>
            <p className="mt-0.5 sm:mt-1 font-display text-xs sm:text-sm text-foreground/65">{sub}</p>
          </div>
        ))}
      </motion.dl>

      {/* Scroll indicator - Visible on both mobile and desktop */}
      <button
        type="button"
        onClick={() => scrollToTarget("#craft")}
        className="absolute bottom-5 sm:bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 font-display text-[10px] sm:text-xs uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-foreground"
        aria-label="Scroll to the craft story"
      >
        <span>[ SCROLL DOWN ]</span>
        <ArrowDown className="size-3.5 animate-bounce" strokeWidth={1.75} />
      </button>
    </section>
  );
}
