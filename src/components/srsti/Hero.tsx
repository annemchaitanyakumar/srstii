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
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-32 md:px-10 lg:pt-36"
    >
      <motion.div
        style={{ y: yFore, opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center"
      >
        {/* Graza-style bold condensed Garamond centerpiece */}
        <h1
          id="hero-title"
          className="font-display text-[clamp(3.8rem,9vw,9.2rem)] font-bold leading-[0.88] tracking-[-0.035em] text-foreground"
        >
          <SplitReveal text="Pure. Real." className="block font-bold" delay={0.35} />
          <SplitReveal
            text="Liquid Heritage."
            className="block font-medium italic text-gold-gradient"
            delay={0.52}
          />
        </h1>

        {/* Descriptive editorial lead in clean DM Sans / Aperçu */}
        <motion.p
          className="mt-7 max-w-xl text-center font-sans text-base font-normal leading-relaxed text-foreground/85 md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.85 }}
        >
          Heirloom seeds, slow-turned in neem-wood ghanis below 35°C. Never blended,
          never refined — 100% single-origin cold-pressed vitality straight from the harvest.
        </motion.p>

        {/* Chunky pill action CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.05 }}
        >
          <MagneticButton onClick={() => scrollToTarget("#craft")}>
            Explore the Harvest <ArrowRight className="size-4" />
          </MagneticButton>
          <MagneticButton variant="outline" onClick={() => scrollToTarget("#collection")}>
            Shop Collection
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Floating Trust Metrics in Graza's typewriter packaging label style */}
      <motion.dl
        style={{ y: yMeta, opacity: fade }}
        className="glass-panel relative z-10 mx-auto mt-16 grid w-full max-w-4xl grid-cols-3 divide-x divide-foreground/10 rounded-2xl p-5 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 1.25 }}
      >
        {[
          ["< 35°C", "COLD EXTRACTION", "Preserving live nutrients"],
          ["0%", "SOLVENTS OR BLEACH", "Raw, unrefined purity"],
          ["12 RPM", "NEEM-WOOD GHANI", "Artisanal slow turn"],
        ].map(([v, l, sub]) => (
          <div key={l} className="px-3 text-center md:px-6">
            <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-foreground/60">[ {l} ]</span>
            <dd className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl mt-1">{v}</dd>
            <p className="mt-1 hidden font-sans text-xs text-foreground/65 md:block">{sub}</p>
          </div>
        ))}
      </motion.dl>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => scrollToTarget("#craft")}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-xs uppercase tracking-[0.3em] text-foreground/70 transition-colors hover:text-foreground md:flex"
        aria-label="Scroll to the craft story"
      >
        <span>[ SCROLL DOWN ]</span>
        <ArrowDown className="size-3.5 animate-bounce" strokeWidth={2} />
      </button>
    </section>
  );
}
