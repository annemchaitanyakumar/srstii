import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** Vertical golden oil-drop journey indicator along the right viewport edge. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const top = useTransform(p, (v) => `${v * 100}%`);
  const pct = useTransform(p, (v) => `${Math.round(v * 100)}`);

  return (
    <div
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden h-[52vh] -translate-y-1/2 md:right-6 md:block"
      role="progressbar"
      aria-label="Journey progress"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="relative h-full w-px bg-foreground/15">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-gold-gradient"
          style={{ height: top, width: 1 }}
        />
        <motion.div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top }}>
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            className="animate-drop drop-shadow-[0_0_8px_var(--gold-glow)]"
            aria-hidden
          >
            <defs>
              <linearGradient id="dropg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--gold-glow)" />
                <stop offset="1" stopColor="var(--gold)" />
              </linearGradient>
            </defs>
            <path d="M7 0C7 0 0 9 0 13a7 7 0 0 0 14 0C14 9 7 0 7 0Z" fill="url(#dropg)" />
          </svg>
        </motion.div>
      </div>
      <motion.span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-display text-xs italic text-muted-foreground">
        {pct}
      </motion.span>
    </div>
  );
}
