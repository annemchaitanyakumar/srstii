import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { forwardRef, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-primary text-primary-foreground hover:text-accent-foreground",
  outline:
    "border border-foreground/25 text-foreground hover:text-accent-foreground hover:border-transparent",
  ghost: "text-foreground hover:text-accent-foreground",
};

interface Props {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
  strength?: number;
}

/** CTA with magnetic cursor pull and an internal liquid-gold fill on hover. */
export const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { children, variant = "solid", className, onClick, type = "button", ariaLabel, strength = 0.35 },
  _ref,
) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.button
      ref={ref}
      type={type}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
      {...(onClick ? { onClick } : {})}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      {...(reduce ? {} : { whileHover: { scale: 1.03 } })}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(
        "liquid-btn inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 text-sm font-medium tracking-wide transition-colors duration-500",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </motion.button>
  );
});
