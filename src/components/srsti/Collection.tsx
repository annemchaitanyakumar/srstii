import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Flame, Plus, ScanLine } from "lucide-react";
import { useRef, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formatINR, PRODUCTS, type Product } from "@/lib/srsti/products";
import { cn } from "@/lib/utils";
import { useCart } from "./cart";
import { MagneticButton } from "./MagneticButton";
import { FadeUp, SplitReveal } from "./motion";

const LAYOUT: Record<string, string> = {
  ghee: "lg:col-span-2 lg:row-span-2",
  groundnut: "lg:col-span-2",
  coconut: "",
  sesame: "",
};

function ProductCard({
  product,
  onQuickView,
  index,
}: {
  product: Product;
  onQuickView: () => void;
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
          "glass-panel group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6 md:p-8",
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
            <p className="eyebrow">{product.volume}</p>
            <h3
              className={cn(
                "mt-2 font-display font-medium leading-[1.02]",
                hero ? "text-4xl md:text-5xl" : "text-3xl",
              )}
            >
              {product.name}
            </h3>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-glass-border px-3 py-1.5 text-xs">
            <Flame className="size-3.5 text-gold-ink" aria-hidden />
            <span className="sr-only">Smoke point</span>
            {product.smokePoint}
          </span>
        </div>

        <div
          className={cn(
            "relative z-10 my-4 flex flex-1 items-center justify-center",
            product.id === "groundnut" && "lg:absolute lg:inset-y-0 lg:right-6 lg:my-0 lg:w-1/2",
          )}
          style={{ transform: "translateZ(60px)" }}
        >
          <img
            src={product.image}
            alt={`${product.name} bottle`}
            loading="lazy"
            width={720}
            height={926}
            className={cn(
              "w-auto object-contain drop-shadow-2xl transition-transform duration-700 ease-silk group-hover:-translate-y-2 group-hover:scale-[1.03]",
              hero ? "max-h-[420px] lg:max-h-[520px]" : "max-h-[240px]",
              product.id === "groundnut" && "lg:max-h-[300px]",
            )}
          />
        </div>

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
            <p className="font-display text-2xl">{formatINR(product.price)}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onQuickView}
                className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full border border-foreground/20 px-4 text-sm transition-colors hover:border-gold hover:text-gold-ink"
              >
                <ScanLine className="size-4" aria-hidden /> Quick view
              </button>
              <button
                type="button"
                onClick={() => add(product)}
                aria-label={`Add ${product.name} to basket`}
                className="liquid-btn grid size-12 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:text-accent-foreground"
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

function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { add } = useCart();
  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92svh] max-w-5xl overflow-y-auto rounded-[2rem] border-glass-border bg-background p-0 sm:rounded-[2rem]">
        {product && (
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="grain flex items-center justify-center bg-linen p-8 md:rounded-l-[2rem]">
              <img
                src={product.image}
                alt={`${product.name} bottle`}
                width={720}
                height={926}
                className="max-h-[380px] w-auto object-contain drop-shadow-2xl md:max-h-[520px]"
              />
            </div>
            <div className="p-6 md:p-10">
              <p className="eyebrow">Trace your bottle · {product.trace.batch}</p>
              <DialogTitle className="mt-3 font-display text-4xl font-medium leading-none md:text-5xl">
                {product.name}
              </DialogTitle>
              <DialogDescription className="mt-4 text-base leading-relaxed text-muted-foreground">
                {product.description}
              </DialogDescription>

              <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Batch traceability
              </h4>
              <ol className="relative mt-4 space-y-4 border-l border-gold/40 pl-6">
                {[
                  ["Farm origin", `${product.trace.farm}, ${product.trace.region}`],
                  ["Harvest", product.trace.harvested],
                  ["Press date", product.trace.pressed],
                  ["Method", product.trace.method],
                ].map(([k, v]) => (
                  <li key={k} className="relative">
                    <span
                      className="absolute -left-[29px] top-1.5 size-2.5 rounded-full bg-gold-gradient"
                      aria-hidden
                    />
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{k}</p>
                    <p className="font-display text-xl">{v}</p>
                  </li>
                ))}
              </ol>

              <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Lab purity report
              </h4>
              <table className="mt-3 w-full text-sm">
                <caption className="sr-only">
                  Independent lab results for batch {product.trace.batch}
                </caption>
                <tbody>
                  {product.lab.map((r) => (
                    <tr key={r.label} className="border-b border-border">
                      <th
                        scope="row"
                        className="py-2.5 text-left font-normal text-muted-foreground"
                      >
                        {r.label}
                      </th>
                      <td className="py-2.5 text-right font-medium">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="font-display text-3xl">
                  {formatINR(product.price)}{" "}
                  <span className="text-base text-muted-foreground">/ {product.volume}</span>
                </p>
                <MagneticButton
                  onClick={() => {
                    add(product);
                    onClose();
                  }}
                >
                  Add to basket <Plus className="size-4" />
                </MagneticButton>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Collection() {
  const [active, setActive] = useState<Product | null>(null);
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
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Four pressings, each from a single farm and a single harvest. Open any bottle to see
              where — and when — it was made.
            </p>
          </FadeUp>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={() => setActive(p)} />
          ))}
        </div>
      </div>
      <QuickView product={active} onClose={() => setActive(null)} />
    </section>
  );
}
