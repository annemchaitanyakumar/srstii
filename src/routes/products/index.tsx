import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Droplets, Filter, Flame, Plus, ShieldCheck, Sparkles, ThermometerSnowflake } from "lucide-react";
import { useMemo, useState } from "react";

import { useCart } from "@/components/srsti/cart";
import { Footer } from "@/components/srsti/Footer";
import { Header } from "@/components/srsti/Header";
import { formatINR, PRODUCTS, type Product } from "@/lib/srsti/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "The Pressing Room — Single-Origin Cold-Pressed Oils & Ghee | SRSTI" },
      {
        name: "description",
        content:
          "Explore SRSTI's complete pantry collection of single-origin wood-pressed groundnut, coconut, black sesame oils, and A2 Gir cow cultured bilona ghee.",
      },
      { property: "og:title", content: "The Pressing Room — SRSTI Artisanal Oils" },
      {
        property: "og:description",
        content:
          "Artisanal cold-pressed oils from native Indian seeds, pressed in wooden ghanis below 35°C with zero chemical solvents.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProductsCatalogPage,
});

type CategoryFilter = "all" | "cooking" | "wellness" | "ghee";
type SortOption = "featured" | "price-asc" | "price-desc" | "smoke-point" | "rating";

function ProductsCatalogPage() {
  const { add } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "smoke-point":
        list.sort((a, b) => b.smokePointDeg - a.smokePointDeg);
        break;
      case "rating":
        list.sort((a, b) => b.rating.score - a.rating.score);
        break;
      default:
        // featured default order
        break;
    }

    return list;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold/20 selection:text-gold-ink">
      <Header />

      <main id="main" className="pt-28 md:pt-36">
        {/* Editorial Page Header */}
        <section className="relative px-5 pb-12 pt-6 md:px-10 md:pb-16">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">The Pressing Room</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
              <div>
                <p className="eyebrow mb-3 flex items-center gap-2 text-gold-ink">
                  <Droplets className="size-3.5" />
                  Single-Origin Harvest Reserves · Current Pressing
                </p>
                <h1 className="font-display text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[0.96] tracking-tight">
                  The Pressing Room
                </h1>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Every bottle in our pantry is pressed from single-harvest native Indian seeds in traditional Vaagai and Neem wood ghanis turning under 14 RPM. Unfiltered, unbleached, and chemical-free.
                </p>
              </div>

              {/* Sourcing badges grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: <ThermometerSnowflake className="size-4 text-gold-ink" />,
                    title: "< 35°C True Cold Press",
                    desc: "Zero heat degradation of delicate tocopherols",
                  },
                  {
                    icon: <ShieldCheck className="size-4 text-gold-ink" />,
                    title: "0.0% Hexane Solvents",
                    desc: "100% mechanical wood ghani extraction",
                  },
                  {
                    icon: <Droplets className="size-4 text-gold-ink" />,
                    title: "48h Gravity Settle",
                    desc: "Cloth filtered; no chemical bleaching clays",
                  },
                  {
                    icon: <Sparkles className="size-4 text-gold-ink" />,
                    title: "NABL Batch Certified",
                    desc: "Full lab purity report on every bottle",
                  },
                ].map((pill) => (
                  <div
                    key={pill.title}
                    className="glass-panel flex flex-col justify-between rounded-2xl p-4 transition-all hover:border-gold/40"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      {pill.icon}
                      <span className="font-mono text-xs font-medium text-foreground">{pill.title}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug">{pill.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter and Sort Toolbar */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
              {/* Category pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <Filter className="size-3.5" /> Filter:
                </span>
                {[
                  { id: "all", label: "All Pressings (20)" },
                  { id: "cooking", label: "Daily Cooking Oils (8)" },
                  { id: "wellness", label: "Ayurvedic & Wellness (7)" },
                  { id: "ghee", label: "Vedic Ghees & Nectar (5)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
                    className={cn(
                      "rounded-full px-4 py-1.5 font-mono text-xs transition-all cursor-pointer",
                      selectedCategory === tab.id
                        ? "bg-primary text-primary-foreground font-medium shadow-sm"
                        : "border border-border/80 bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="font-mono text-xs text-muted-foreground">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-full border border-border bg-background px-4 py-1.5 font-mono text-xs text-foreground outline-none transition-colors focus:border-gold cursor-pointer"
                >
                  <option value="featured">Featured Pressings</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="smoke-point">Smoke Point: High to Low</option>
                  <option value="rating">Top Rated (Verified Reviews)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Product Catalog Grid */}
        <section className="px-5 pb-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="glass-panel group relative flex flex-col justify-between rounded-[2rem] p-6 transition-all duration-500 hover:shadow-gold hover:border-gold/40"
                >
                  {/* Top Badges */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {product.trace.batch}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-glass-border px-2.5 py-0.5 font-mono text-[11px] text-foreground/80">
                        <Flame className="size-3 text-gold-ink" />
                        {product.smokePoint}
                      </span>
                    </div>

                    {/* Product Names */}
                    <div className="mt-3">
                      <Link
                        to="/products/$slug"
                        params={{ slug: product.slug }}
                        className="group-hover:text-gold-ink transition-colors block"
                      >
                        <h3 className="font-display text-2xl font-medium leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-0.5 font-serif text-xs italic text-muted-foreground">
                        {product.regionalName}
                      </p>
                    </div>

                    {/* Sourcing line */}
                    <p className="mt-2 text-xs text-muted-foreground/90 line-clamp-2">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Bottle Image */}
                  <Link
                    to="/products/$slug"
                    params={{ slug: product.slug }}
                    className="my-6 flex h-60 items-center justify-center p-2"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="max-h-full w-auto object-contain drop-shadow-xl transition-transform duration-700 ease-silk group-hover:-translate-y-2 group-hover:scale-105"
                    />
                  </Link>

                  {/* Bottom: Tasting notes + Pricing + Actions */}
                  <div className="mt-auto space-y-4 pt-2 border-t border-border/40">
                    {/* Tasting notes */}
                    <div className="flex flex-wrap gap-1">
                      {product.notes.slice(0, 3).map((note) => (
                        <span
                          key={note}
                          className="rounded-full bg-foreground/[0.04] px-2 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Price and size */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        <p className="font-display text-2xl font-medium text-foreground">
                          {formatINR(product.price)}
                        </p>
                        <p className="font-mono text-[11px] text-muted-foreground">
                          Default: {product.volume} (Bulk tins available)
                        </p>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-xs text-gold-ink">
                        <span>★ {product.rating.score}</span>
                        <span className="text-muted-foreground text-[10px]">({product.rating.count})</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <Link
                        to="/products/$slug"
                        params={{ slug: product.slug }}
                        className="flex-1 rounded-full border border-foreground/20 py-2.5 text-center font-mono text-xs uppercase tracking-wider text-foreground transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-ink"
                      >
                        Explore Pressing
                      </Link>
                      <button
                        type="button"
                        onClick={() => add(product)}
                        aria-label={`Add ${product.name} to basket`}
                        className="liquid-btn grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-gold hover:text-accent-foreground cursor-pointer"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nūne-inspired Quality Pillars & Farm Traceability */}
        <section className="border-t border-border/60 bg-veil px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold-ink">The SRSTI Standard</p>
              <h2 className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">
                How Ancient Cold-Pressing Outperforms Industrial Refining
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Modern vegetable oils are stripped by chemical solvents like petroleum hexane and deodorized at 240°C. Here is why our wooden ghani method remains irreplaceable.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <div className="glass-panel rounded-3xl p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-ink">01 · Frictionless Wood</span>
                <h3 className="mt-3 font-display text-2xl font-medium">Neem & Vaagai Wood Ghani</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Unlike metal expellers that heat seeds to 90°C and leech metallic ions, our heavy mortar is carved from seasoned wild neem and vaagai timber. It absorbs friction, keeping seed temperature naturally below 35°C.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-gold-ink shrink-0" />
                    <span>Gentle 12 to 14 rotations per minute</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-gold-ink shrink-0" />
                    <span>Preserves delicate polyphenols and Vitamin E</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel rounded-3xl p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-ink">02 · Gravity Clarification</span>
                <h3 className="mt-3 font-display text-2xl font-medium">48-Hour Gravity Sedimentation</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Industrial oil requires bleaching earths and caustic chemical neutralization to remove cloudiness. SRSTI oils rest untouched in stainless decanters for two days — micro seed fibers settle purely by earth’s gravity.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-gold-ink shrink-0" />
                    <span>Zero artificial filtration chemicals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-gold-ink shrink-0" />
                    <span>Filtered solely through pure handloom cotton cloth</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel rounded-3xl p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-ink">03 · Verified Transparency</span>
                <h3 className="mt-3 font-display text-2xl font-medium">NABL Laboratory Batch Reports</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Trust is verifiable. Every harvest batch undergoes independent laboratory gas chromatography to certify 0.0 ppm hexane solvents, zero argemone adulteration, and minimal free fatty acids.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-gold-ink shrink-0" />
                    <span>Batch code printed on each bottle label</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-gold-ink shrink-0" />
                    <span>Full certificate viewable on the product page</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
