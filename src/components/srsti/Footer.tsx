import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { scrollToTarget } from "@/lib/srsti/smooth-scroll";
import { MagneticButton } from "./MagneticButton";

const emailSchema = z.string().trim().email().max(255);

const LINKS: { title: string; items: [string, string][] }[] = [
  {
    title: "Explore",
    items: [
      ["The Craft", "#craft"],
      ["Collection", "#collection"],
      ["Purity", "#purity"],
      ["Rituals", "#rituals"],
    ],
  },
  {
    title: "Care",
    items: [
      ["Trace Your Bottle", "#collection"],
      ["Shipping", "#top"],
      ["Returns", "#top"],
      ["Contact", "#top"],
    ],
  },
];

const CERTS = ["FSSAI Licensed", "NPOP Organic", "NABL Lab Tested", "Plastic-Neutral Packaging"];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const letterY = useTransform(scrollYProgress, [0.35, 1], reduce ? ["0%", "0%"] : ["70%", "0%"]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = emailSchema.safeParse(email);
    if (!r.success) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setEmail("");
    toast.success("You're on the harvest list", {
      description: "We'll write when the next pressing is ready.",
    });
  };

  return (
    <footer
      ref={ref}
      aria-labelledby="footer-title"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pt-[16vh] md:px-10"
    >
      <h2 id="footer-title" className="sr-only">
        SRSTI footer
      </h2>
      <div className="relative z-0 mx-auto mb-6 w-full max-w-[100rem] overflow-hidden" aria-hidden>
        <motion.p
          style={{ y: letterY }}
          className="select-none text-center font-display text-[24vw] font-medium leading-[0.8] tracking-[0.04em] text-gold-gradient"
        >
          SRSTI
        </motion.p>
      </div>
      <div className="glass-panel relative z-10 mx-auto grid w-full max-w-7xl gap-8 sm:gap-10 rounded-[2rem] p-5 sm:p-7 md:grid-cols-[1.4fr_1fr_1fr] md:p-10">
        <div>
          <p className="eyebrow">The Harvest List</p>
          <p className="mt-3 max-w-sm font-display text-2xl sm:text-3xl leading-tight">
            First word on each new pressing, and the farms behind it.
          </p>
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!error}
              aria-describedby={error ? "newsletter-error" : undefined}
              className="min-h-12 flex-1 rounded-full border border-foreground/20 bg-transparent px-5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-gold"
            />
            <MagneticButton type="submit" strength={0.2} className="w-full sm:w-auto">
              Subscribe <ArrowRight className="size-4" />
            </MagneticButton>
          </form>
          {error && (
            <p id="newsletter-error" role="alert" className="mt-2 text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-6 md:contents">
          {LINKS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-1">
                {col.items.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToTarget(href);
                      }}
                      className="inline-flex min-h-10 items-center text-foreground/80 transition-colors hover:text-gold-ink text-sm sm:text-base"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <ul className="flex flex-wrap gap-2 md:col-span-3" aria-label="Certifications">
          {CERTS.map((c) => (
            <li
              key={c}
              className="rounded-full border border-glass-border px-3 py-1.5 text-xs text-muted-foreground"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-wrap justify-between gap-3 border-t border-foreground/10 py-6 text-xs text-muted-foreground">
        <p>© 2026 SRSTI Naturals. Made slowly, in India.</p>
        <p>Wood-pressed · Cold-pressed · Never refined</p>
      </div>
    </footer>
  );
}
