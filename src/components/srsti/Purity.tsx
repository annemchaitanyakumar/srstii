import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Check, ChevronRight, Droplets, Flame, Leaf, ShieldCheck, Sparkles, ThermometerSnowflake } from "lucide-react";
import { useState } from "react";

import farm from "@/assets/purity-farm.webp";
import refinery from "@/assets/purity-refinery.webp";
import { cn } from "@/lib/utils";
import { Counter, FadeUp, SplitReveal } from "./motion";

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
  const [activeWorld, setActiveWorld] = useState<"srsti" | "refined">("srsti");
  const [viewMode, setViewMode] = useState<"interactive" | "side-by-side">("side-by-side");
  const reduce = useReducedMotion();

  return (
    <section
      id="purity"
      aria-labelledby="purity-title"
      className="relative bg-veil px-4 pt-10 pb-20 sm:px-6 md:px-10 md:pt-16 md:pb-32 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 right-10 size-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-10 size-96 rounded-full bg-emerald-950/5 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 backdrop-blur-md mb-4 sm:mb-5">
            <Sparkles className="size-3.5 text-gold-ink animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gold-ink font-semibold">
              Forensic Purity &amp; Traceability
            </span>
          </div>

          <SplitReveal
            as="h2"
            text="What we leave out matters most."
            className="font-display text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.96] tracking-tight text-foreground"
          />
          <span id="purity-title" className="sr-only">
            Purity and traceability
          </span>

          <FadeUp delay={0.15}>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground font-light">
              Supermarket oil is heated past 200°C, washed in neurotoxic hexane, bleached with industrial clays, and steamed until it has no smell, no colour — and no biological story. Ours keeps all three.
            </p>
          </FadeUp>
        </div>

        {/* Mobile & Tablet Interactive Mode Switcher */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 lg:hidden">
          <div className="flex w-full rounded-full bg-foreground/[0.06] p-1 border border-foreground/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveWorld("srsti")}
              className={cn(
                "relative flex-1 rounded-full py-2 px-3 text-center font-display text-xs sm:text-sm uppercase tracking-[0.12em] transition-colors duration-300 flex items-center justify-center gap-1.5",
                activeWorld === "srsti" ? "text-white font-semibold" : "text-foreground/70 hover:text-foreground"
              )}
            >
              {activeWorld === "srsti" && (
                <motion.span
                  layoutId="purity-world-pill"
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
                "relative flex-1 rounded-full py-2 px-3 text-center font-display text-xs sm:text-sm uppercase tracking-[0.12em] transition-colors duration-300 flex items-center justify-center gap-1.5",
                activeWorld === "refined" ? "text-white font-semibold" : "text-foreground/70 hover:text-foreground"
              )}
            >
              {activeWorld === "refined" && (
                <motion.span
                  layoutId="purity-world-pill"
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
        </div>

        {/* =========================================================================
            1. MOBILE VIEW: Interactive Single-World Immersive Dossier (Zero Tables!)
           ========================================================================= */}
        <div className="block lg:hidden">
          <AnimatePresence mode="wait">
            {activeWorld === "srsti" ? (
              <motion.div
                key="mobile-srsti"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#131f17] via-[#0d1610] to-[#070d09] text-[#f7f5ed] border border-[#3b5243]/50 shadow-2xl p-5 sm:p-7"
              >
                {/* Visual Artifact Header */}
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[16/10] border border-white/10 shadow-inner">
                  <img
                    src={farm}
                    alt="Farmer holding native groundnut harvest at golden hour"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-widest text-gold text-[10px] font-semibold">
                      Anantapur &amp; Tamil Nadu Single-Origin
                    </span>
                    <span className="rounded-full bg-black/60 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/90 backdrop-blur-md">
                      Harvest 2026
                    </span>
                  </div>
                </div>

                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold font-medium">
                      The Living Standard
                    </span>
                    <h3 className="font-display text-2xl font-normal text-white">
                      Cold-Pressed Artisanal Reserve
                    </h3>
                  </div>
                  <div className="rounded-full bg-gold/15 p-2 text-gold">
                    <ShieldCheck className="size-5" />
                  </div>
                </div>

                {/* 5 Sculptural Spec Cards */}
                <div className="space-y-4">
                  {PURITY_PILLARS.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all"
                    >
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                          {pillar.number} · {pillar.label}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-medium">
                          {pillar.srsti.tag}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-lg font-medium text-white">
                          {pillar.srsti.headline}
                        </h4>
                        <span className="font-display text-xl font-bold text-gold">
                          {pillar.srsti.metric}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-white/75 font-light">
                        {pillar.srsti.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-refined"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1e2023] via-[#16181a] to-[#0f1012] text-[#f7f5ed] border border-zinc-700/50 shadow-2xl p-5 sm:p-7"
              >
                {/* Visual Artifact Header */}
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[16/10] border border-white/10 shadow-inner">
                  <img
                    src={refinery}
                    alt="Sterile industrial refinery tanks"
                    className="size-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-widest text-zinc-400 text-[10px] font-semibold">
                      Industrial Solvent Extraction Facility
                    </span>
                    <span className="rounded-full bg-red-950/80 px-2 py-0.5 text-[9px] uppercase tracking-wider text-red-200 border border-red-800/40 backdrop-blur-md">
                      Commercial Standard
                    </span>
                  </div>
                </div>

                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                      The Industrial Norm
                    </span>
                    <h3 className="font-display text-2xl font-normal text-white">
                      Supermarket Refined Commodity
                    </h3>
                  </div>
                  <div className="rounded-full bg-red-900/25 p-2 text-red-400">
                    <AlertTriangle className="size-5" />
                  </div>
                </div>

                {/* 5 Sculptural Spec Cards */}
                <div className="space-y-4">
                  {PURITY_PILLARS.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="rounded-2xl border border-zinc-800 bg-white/[0.02] p-4 backdrop-blur-sm transition-all"
                    >
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                          {pillar.number} · {pillar.label}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-red-300 font-medium">
                          {pillar.refined.tag}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-lg font-medium text-zinc-200">
                          {pillar.refined.headline}
                        </h4>
                        <span className="font-display text-xl font-bold text-zinc-400 line-through decoration-red-400/60">
                          {pillar.refined.metric}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-zinc-400 font-light">
                        {pillar.refined.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =========================================================================
            2. DESKTOP VIEW: Dual-World Architectural Confrontation (Side-by-Side)
           ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: The SRSTI Living Standard */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#142219] via-[#0d1711] to-[#070d0a] text-[#f7f5ed] border border-[#3b5243]/60 p-8 xl:p-10 shadow-2xl flex flex-col justify-between">
            {/* Ambient golden fluid glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gold/15 blur-3xl" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/15 px-3 py-1 backdrop-blur-md">
                  <span className="size-2 rounded-full bg-gold animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                    The SRSTI Way · Living Cold Press
                  </span>
                </div>
                <span className="font-mono text-xs text-gold/80">Certified 0.0% Chemicals</span>
              </div>

              {/* Visual Artifact Window */}
              <div className="relative my-6 overflow-hidden rounded-2xl aspect-[16/9] border border-white/15 shadow-inner group">
                <img
                  src={farm}
                  alt="A farmer holding freshly harvested groundnuts above red soil at golden hour"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="font-display text-sm font-medium text-white">
                    Anantapur Native Seeds · Vaagai &amp; Neem Ghani
                  </span>
                  <span className="rounded-full bg-gold/20 border border-gold/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold">
                    &lt; 35°C
                  </span>
                </div>
              </div>

              {/* 5 Architectural Forensic Spec Cards */}
              <div className="space-y-4">
                {PURITY_PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4.5 backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                        {pillar.number} · {pillar.label}
                      </span>
                      <span className="rounded-full bg-gold/10 border border-gold/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gold font-medium">
                        {pillar.srsti.tag}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-lg font-medium text-white group-hover:text-gold transition-colors">
                        {pillar.srsti.headline}
                      </h4>
                      <span className="font-display text-2xl font-bold text-gold">
                        {pillar.srsti.metric}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-white/75 font-light">
                      {pillar.srsti.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Seal */}
            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-white/60">
              <ShieldCheck className="size-4 text-gold shrink-0" />
              <span>Tested for 20+ chemical adulterants by independent NABL accredited laboratories.</span>
            </div>
          </div>

          {/* RIGHT: The Industrial Commodity Standard */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a1c1f] via-[#141517] to-[#0d0e10] text-[#f7f5ed] border border-zinc-700/60 p-8 xl:p-10 shadow-2xl flex flex-col justify-between">
            {/* Ambient subtle warning glow */}
            <div className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full bg-red-950/20 blur-3xl" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-800/40 bg-red-950/30 px-3 py-1 backdrop-blur-md">
                  <AlertTriangle className="size-3.5 text-amber-400" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 font-semibold">
                    Supermarket Industry Norm · Refined
                  </span>
                </div>
                <span className="font-mono text-xs text-zinc-400">Heated · Bleached · Deodorised</span>
              </div>

              {/* Visual Artifact Window */}
              <div className="relative my-6 overflow-hidden rounded-2xl aspect-[16/9] border border-white/10 shadow-inner group">
                <img
                  src={refinery}
                  alt="Industrial oil refinery with steel tanks and chimney stacks"
                  className="size-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="font-display text-sm font-medium text-zinc-300">
                    Industrial Solvent Fractionation Plant
                  </span>
                  <span className="rounded-full bg-red-900/30 border border-red-700/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-red-300">
                    200°C–270°C
                  </span>
                </div>
              </div>

              {/* 5 Architectural Contrast Spec Cards */}
              <div className="space-y-4">
                {PURITY_PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="group rounded-2xl border border-zinc-800 bg-white/[0.02] p-4.5 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                        {pillar.number} · {pillar.label}
                      </span>
                      <span className="rounded-full bg-zinc-800/60 border border-zinc-700 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-red-300 font-medium">
                        {pillar.refined.tag}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-lg font-medium text-zinc-200">
                        {pillar.refined.headline}
                      </h4>
                      <span className="font-display text-2xl font-bold text-zinc-400 line-through decoration-red-400/60">
                        {pillar.refined.metric}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 font-light">
                      {pillar.refined.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Caution */}
            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-zinc-400">
              <AlertTriangle className="size-4 text-amber-400 shrink-0" />
              <span>High heat processing strips volatile aromatics, requiring synthetic antioxidants (TBHQ).</span>
            </div>
          </div>
        </div>

        {/* Animated Numerical Metrics Counter Strip */}
        <dl className="mt-16 sm:mt-24 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-foreground/10 pt-10 sm:pt-14 lg:grid-cols-4">
          {[
            { to: 0, suffix: "%", label: "Chemical solvents, hexane or synthetic additives" },
            { to: 35, prefix: "<", suffix: "°C", label: "Neem wood ghani cold extraction ceiling" },
            { to: 100, suffix: "%", label: "Verifiable single-origin farm harvest batches" },
            { to: 14, label: "Generational partner family farms" },
          ].map((c) => (
            <div key={c.label}>
              <dd className="font-display text-[clamp(2.4rem,5vw,5rem)] font-medium leading-none text-gold-gradient">
                <Counter to={c.to} prefix={c.prefix} suffix={c.suffix} />
              </dd>
              <dt className="mt-3 max-w-[15rem] font-display text-xs sm:text-sm text-muted-foreground leading-snug">
                {c.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
