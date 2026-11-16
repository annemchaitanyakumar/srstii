import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Moon, ShoppingBag, Sun } from "lucide-react";
import { useState } from "react";

import { scrollToTarget } from "@/lib/srsti/smooth-scroll";
import { cn } from "@/lib/utils";
import { useCart } from "./cart";
import { useTheme } from "./useTheme";

const LINKS = [
  { href: "#craft", label: "The Craft" },
  { href: "#collection", label: "Collection" },
  { href: "#purity", label: "Purity" },
  { href: "#rituals", label: "Rituals" },
];

export function Header() {
  const { dark, toggle } = useTheme();
  const { count } = useCart();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 400);
  });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 md:px-6",
          solid && "glass-panel",
        )}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(0);
          }}
          className="flex min-h-12 items-center font-display text-2xl font-bold tracking-[0.22em]"
          aria-label="SRSTI — back to top"
        >
          SRSTI
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(l.href);
                }}
                className="group relative py-2 font-mono text-xs uppercase tracking-widest text-foreground/80 transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            aria-label={
              dark ? "Switch to Sunlit Harvest light theme" : "Switch to Midnight Press dark theme"
            }
            aria-pressed={dark}
            className="relative grid size-12 place-items-center overflow-hidden rounded-full transition-colors hover:bg-foreground/5"
          >
            <Sun
              className={cn(
                "absolute size-5 transition-all duration-700",
                dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100",
              )}
              strokeWidth={1.4}
            />
            <Moon
              className={cn(
                "absolute size-5 transition-all duration-700",
                dark ? "rotate-0 scale-100" : "-rotate-90 scale-0 opacity-0",
              )}
              strokeWidth={1.4}
            />
          </button>
          <button
            type="button"
            aria-label={`Basket, ${count} ${count === 1 ? "item" : "items"}`}
            onClick={() => scrollToTarget("#collection")}
            className="relative grid size-12 place-items-center rounded-full transition-colors hover:bg-foreground/5"
          >
            <ShoppingBag className="size-5" strokeWidth={1.4} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                className="absolute right-1.5 top-1.5 grid min-w-5 place-items-center rounded-full bg-gold-gradient px-1 text-[10px] font-semibold text-accent-foreground"
              >
                {count}
              </motion.span>
            )}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
