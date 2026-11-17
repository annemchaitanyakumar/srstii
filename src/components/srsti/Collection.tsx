import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Flame, Plus } from "lucide-react";
import { useRef, useState } from "react";

import { formatINR, PRODUCTS, type Product } from "@/lib/srsti/products";
import { cn } from "@/lib/utils";
import { useCart } from "./cart";
import { FadeUp, SplitReveal } from "./motion";

const LAYOUT: Record<string, string> = {
  ghee: "lg:col-span-2 lg:row-span-2",
  groundnut: "lg:col-span-2",
  coconut: "",
  sesame: "",
};

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { add } = useCart();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 160, damping: 18 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, var(--gold-glow), transparent 45%)`,
  );
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const hero = product.id === "ghee";

  const spawnRipple = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setRipples((r) => [...r.slice(-2), { id, x, y }]);
    window.setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className={cn("[perspective:1200px]", LAYOUT[product.id])}
    >
      <motion.div
        ref={ref}
        style={reduce ? {} : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerEnter={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r || reduce) return;
          spawnRipple(e.clientX - r.left, e.clientY - r.top);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className={cn(
          "glass-panel group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6 md:p-8 transition-shadow duration-500 hover:shadow-gold",
          hero ? "min-h-[560px] lg:min-h-[720px]" : "min-h-[440px]",
        )}
      >
        {ripples.map((r) => (
          <span key={r.id} className="gold-ripple" style={{ left: r.x, top: r.y }} aria-hidden />
        ))}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: glare,
            mixBlendMode: "soft-light",
          }}
        />

        <div
          className="relative z-10 flex items-start justify-between gap-4"
          style={{ transform: "translateZ(30px)" }}
        >
          <div>
            <p className="eyebrow">{product.volume} · {product.trace.batch}</p>
            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
              className="group-hover:text-gold-ink transition-colors block"
            >
              <h3
                className={cn(
                  "mt-2 font-display font-medium leading-[1.02]",
                  hero ? "text-4xl md:text-5xl" : "text-3xl",
                )}
              >
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 font-serif text-xs italic text-muted-foreground">
              {product.regionalName}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-glass-border px-3 py-1.5 text-xs">
            <Flame className="size-3.5 text-gold-ink" aria-hidden />
            <span className="sr-only">Smoke point</span>
            {product.smokePoint}
          </span>
        </div>

        <Link
          to="/products/$slug"
          params={{ slug: product.slug }}
          className={cn(
            "relative z-10 my-4 flex flex-1 items-center justify-center cursor-pointer",
            product.id === "groundnut" && "lg:absolute lg:inset-y-0 lg:right-6 lg:my-0 lg:w-1/2",
          )}
          style={{ transform: "translateZ(60px)" }}
          aria-label={`View ${product.name} full details`}
        >
          <img
            src={product.image}
            alt={`${product.name} bottle`}
            loading="lazy"
            width={720}
            height={926}
            className={cn(
              "w-auto object-contain drop-shadow-2xl transition-transform duration-700 ease-silk group-hover:-translate-y-2 group-hover:scale-[1.04]",
              hero ? "max-h-[420px] lg:max-h-[520px]" : "max-h-[240px]",
              product.id === "groundnut" && "lg:max-h-[300px]",
            )}
          />
        </Link>

        <div
          className={cn("relative z-10 mt-auto", product.id === "groundnut" && "lg:max-w-[50%]")}
          style={{ transform: "translateZ(40px)" }}
        >
          <ul className="flex flex-wrap gap-1.5" aria-label="Tasting notes">
            {product.notes.map((n) => (
              <li
                key={n}
                className="rounded-full bg-foreground/5 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {n}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-display text-2xl font-medium">{formatINR(product.price)}</p>
              <p className="text-[11px] font-mono text-muted-foreground">Free farm shipping eligible</p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/products/$slug"
                params={{ slug: product.slug }}
                className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full border border-foreground/20 px-5 text-sm font-medium transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-ink"
              >
                Explore Pressing <ArrowRight className="size-4" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => add(product)}
                aria-label={`Add ${product.name} to basket`}
                className="liquid-btn grid size-12 place-items-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-gold hover:text-accent-foreground cursor-pointer"
              >
                <Plus className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Collection() {
  return (
    <section
      id="collection"
      aria-labelledby="collection-title"
      className="relative bg-veil px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="eyebrow mb-5">The Collection</p>
            <SplitReveal
              as="h2"
              text="The Signature Pressings"
              className="font-display text-[clamp(2.6rem,5.5vw,5.5rem)] font-medium leading-[0.95] tracking-tight"
            />
            <span id="collection-title" className="sr-only">
              Collection
            </span>
          </div>
          <FadeUp>
            <div className="space-y-4">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                Four pressings, each from a single farm and a single harvest. Explore each bottle to trace the seeds, wood ghani temperature, and certified NABL lab reports.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold-ink hover:underline"
              >
                View all pressings & bulk tins <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </FadeUp>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {PRODUCTS.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* Extended Harvest Reserve Showcase (New Additions) */}
        <div className="mt-20 border-t border-border/60 pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow text-gold-ink">New Harvest Additions</p>
              <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                Explore The Expanded Pantry Reserve
              </h3>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold-ink hover:underline"
            >
              See all 20 pressings <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.slice(4, 12).map((item) => (
              <div
                key={item.id}
                className="glass-panel group relative flex flex-col justify-between rounded-3xl p-5 transition-all duration-500 hover:border-gold/40 hover:shadow-gold"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                    <span>{item.trace.batch}</span>
                    <span className="flex items-center gap-1 text-gold-ink">
                      <Flame className="size-3" /> {item.smokePoint}
                    </span>
                  </div>

                  <Link
                    to="/products/$slug"
                    params={{ slug: item.slug }}
                    className="mt-2 block group-hover:text-gold-ink transition-colors"
                  >
                    <h4 className="font-display text-xl font-medium leading-tight">{item.name}</h4>
                    <p className="font-serif text-xs italic text-muted-foreground">{item.regionalName}</p>
                  </Link>
                </div>

                <Link
                  to="/products/$slug"
                  params={{ slug: item.slug }}
                  className="my-4 flex h-40 items-center justify-center p-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full w-auto object-contain drop-shadow transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="border-t border-border/40 pt-3 flex items-center justify-between">
                  <div>
                    <p className="font-display text-xl font-medium">{formatINR(item.price)}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{item.volume}</p>
                  </div>

                  <Link
                    to="/products/$slug"
                    params={{ slug: item.slug }}
                    className="rounded-full border border-foreground/20 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground hover:border-gold hover:text-gold-ink transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Catalog Banner CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 rounded-full border border-foreground/25 bg-background/80 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-all hover:border-gold hover:bg-gold hover:text-accent-foreground hover:shadow-gold"
          >
            Enter The Pressing Room — Explore All 20 Pressings &amp; Tins <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
