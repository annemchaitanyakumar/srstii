import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Staggered word-by-word editorial headline reveal. */
export function SplitReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3";
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  // Isolate gradient text utilities so they attach directly to the text-bearing span
  // instead of the parent container, preventing Chrome/WebKit background-clip stacking context bugs.
  const isGradient =
    className?.includes("text-gold-gradient") || className?.includes("bg-clip-text");
  const outerClass = isGradient
    ? className?.replace(/\btext-gold-gradient\b/g, "").replace(/\bbg-clip-text\b/g, "")
    : className;

  const motionProps = immediate
    ? { animate: { y: "0%", opacity: 1 } }
    : {
      whileInView: reduce ? { opacity: 1 } : { y: "0%", opacity: 1 },
      viewport: { once: true, margin: "0px 0px -5% 0px" },
    };

  return (
      <Tag className={outerClass} aria-label={text}>
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="inline-block overflow-hidden pb-[0.18em] pt-[0.06em] -my-[0.06em] align-bottom"
            aria-hidden
          >
            <motion.span
              className={cn("inline-block", isGradient && "text-gold-gradient")}
              initial={reduce ? { opacity: 0 } : { y: "120%", opacity: 0 }}
              {...motionProps}
              transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.08 }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </Tag>
      );
}

      export function FadeUp({
        children,
        className,
        delay = 0,
}: {
        children: ReactNode;
      className?: string;
      delay?: number;
}) {
  const reduce = useReducedMotion();
      return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: reduce ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -6% 0px" }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.div>
      );
}

      /** Number that counts up once it scrolls into view. */
      export function Counter({
        to,
        prefix = "",
        suffix = "",
        className,
}: {
        to: number;
      prefix?: string | undefined;
      suffix?: string | undefined;
      className?: string | undefined;
}) {
  const ref = useRef<HTMLSpanElement>(null);
        const inView = useInView(ref, {once: true, margin: "-10% 0px" });
        const reduce = useReducedMotion();
        const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
        if (reduce) {
          setVal(to);
        return;
    }
        const c = animate(0, to, {duration: 2.2, ease: EASE, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);

        return (
        <span ref={ref} className={cn("tabular-nums", className)}>
          {prefix}
          {val}
          {suffix}
        </span>
        );
}
