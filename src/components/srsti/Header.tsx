import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useState } from "react";

import { scrollToTarget } from "@/lib/srsti/smooth-scroll";
import { cn } from "@/lib/utils";
import { useCart } from "./cart";
import { useTheme } from "./useTheme";

export function Header() {
  const { dark, toggle } = useTheme();
  const { count } = useCart();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    // Don't hide header if mobile menu is open
    if (!mobileMenuOpen) {
      setHidden(y > prev && y > 400);
    }
  });

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setMobileMenuOpen(false);
    if (isHome) {
      e.preventDefault();
      scrollToTarget(hash);
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 transform-gpu will-change-transform"
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
          solid ? "glass-panel" : "bg-linen/60 backdrop-blur-md border border-glass-border/40",
        )}
      >
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              scrollToTarget(0);
            }
          }}
          className="flex min-h-12 items-center font-display text-2xl font-bold tracking-[0.22em] text-foreground transition-opacity hover:opacity-85"
          aria-label="SRSTI — home"
        >
          SRSTI
        </Link>
        <ul className="hidden items-center gap-7 lg:flex">
          <li>
            <Link
              to="/products"
              className={cn(
                "group relative py-2 font-display text-sm uppercase tracking-[0.14em] transition-colors hover:text-foreground",
                location.pathname.startsWith("/products")
                  ? "text-gold-ink font-semibold"
                  : "text-foreground/80",
              )}
            >
              All Pressings
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100",
                  location.pathname.startsWith("/products") && "scale-x-100",
                )}
              />
            </Link>
          </li>
          {[
            { href: "/#craft", hash: "#craft", label: "The Craft" },
            { href: "/#purity", hash: "#purity", label: "Purity" },
            { href: "/#rituals", hash: "#rituals", label: "Rituals" },
          ].map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={(e) => handleSectionClick(e, l.hash)}
                className="group relative py-2 font-display text-sm uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
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
            className="relative grid size-11 place-items-center overflow-hidden rounded-full transition-colors hover:bg-foreground/5"
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
          <Link
            to="/cart"
            aria-label={`Harvest Basket, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative grid size-11 place-items-center rounded-full transition-colors hover:bg-foreground/5 cursor-pointer"
          >
            <ShoppingBag className="size-5" strokeWidth={1.4} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                className="absolute right-1 top-1 grid min-w-5 place-items-center rounded-full bg-gold-gradient px-1 text-[10px] font-semibold text-accent-foreground"
              >
                {count}
              </motion.span>
            )}
          </Link>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="grid size-11 place-items-center rounded-full transition-colors hover:bg-foreground/5 lg:hidden text-foreground cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="size-5" strokeWidth={1.6} />
            ) : (
              <Menu className="size-5" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet Navigation Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2.5 max-w-7xl overflow-hidden rounded-3xl glass-panel p-5 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col divide-y divide-foreground/10 font-display">
              <li>
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-3.5 text-base uppercase tracking-[0.14em] font-medium transition-colors hover:text-gold-ink",
                    location.pathname.startsWith("/products")
                      ? "text-gold-ink font-semibold"
                      : "text-foreground",
                  )}
                >
                  <span>All Pressings</span>
                  <span className="text-xs text-gold-ink font-sans tracking-normal">20 Bottles</span>
                </Link>
              </li>
              {[
                { href: "/#craft", hash: "#craft", label: "The Craft" },
                { href: "/#stride-experience", hash: "#stride-experience", label: "3D Pressings" },
                { href: "/#why-choose-srsti", hash: "#why-choose-srsti", label: "Why Choose SRSTI" },
                { href: "/#purity", hash: "#purity", label: "Purity & Tests" },
                { href: "/#rituals", hash: "#rituals", label: "Daily Rituals" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => handleSectionClick(e, l.hash)}
                    className="flex items-center justify-between py-3.5 text-base uppercase tracking-[0.14em] text-foreground transition-colors hover:text-gold-ink"
                  >
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-full bg-gold-gradient px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#14100D] shadow-md transition-all hover:brightness-105"
                >
                  <span>Harvest Basket</span>
                  <span>{count} {count === 1 ? "Item" : "Items"}</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
