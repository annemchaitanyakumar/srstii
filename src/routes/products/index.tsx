import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Droplets, ShieldCheck, Sparkles, ThermometerSnowflake } from "lucide-react";
import { useMemo, useState } from "react";

import { Footer } from "@/components/srsti/Footer";
import { Header } from "@/components/srsti/Header";
import { ProductCard } from "@/components/srsti/ProductCard";
import { PRODUCTS } from "@/lib/srsti/products";
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
    <div className="min-h-screen bg-background text-foreground font-display selection:bg-gold/20 selection:text-gold-ink">
      <Header />

      <main id="main" className="pt-28 md:pt-36 font-display">
        {/* Editorial Page Header */}
        <section className="relative px-5 pb-10 pt-6 md:px-10 md:pb-14">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <nav className="mb-5 flex items-center gap-2 font-display text-sm text-muted-foreground/80" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="opacity-40">/</span>
              <span className="text-foreground">The Pressing Room</span>
            </nav>

            <div className="max-w-3xl">
              <p className="mb-3 font-display text-xs uppercase tracking-[0.22em] font-medium text-gold-ink">
                Single-Origin Harvest Reserves · Current Pressing
              </p>
              <h1 className="font-display text-[clamp(2.6rem,5.5vw,4.6rem)] font-normal md:font-medium leading-[1.02] tracking-tight text-foreground">
                The Pressing Room
              </h1>
              <p className="mt-4 max-w-2xl font-display text-lg md:text-xl leading-relaxed text-muted-foreground/90">
                Every bottle in our pantry is pressed from single-harvest native Indian seeds in traditional Vaagai and Neem wood ghanis turning under 14 RPM. Unfiltered, unbleached, and chemical-free.
              </p>

              {/* Minimal inline quality specs */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-display text-sm text-muted-foreground/85">
                <span className="flex items-center gap-1.5">
                  <ThermometerSnowflake className="size-3.5 text-gold-ink" />
                  <span>&lt; 35°C True Cold Press</span>
                </span>
                <span className="opacity-30">·</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-gold-ink" />
                  <span>0.0% Hexane Solvents</span>
                </span>
                <span className="opacity-30">·</span>
                <span className="flex items-center gap-1.5">
                  <Droplets className="size-3.5 text-gold-ink" />
                  <span>48h Gravity Settle</span>
                </span>
                <span className="opacity-30">·</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-gold-ink" />
                  <span>NABL Batch Certified</span>
                </span>
              </div>
            </div>

            {/* Filter and Sort Toolbar */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-5 font-display">
              {/* Category pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "all", label: "All Pressings", count: 20 },
                  { id: "cooking", label: "Daily Cooking Oils", count: 8 },
                  { id: "wellness", label: "Ayurveda & Wellness", count: 7 },
                  { id: "ghee", label: "Vedic Ghees & Nectar", count: 5 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
                    className={cn(
                      "rounded-full px-4 py-1.5 font-display text-sm md:text-base transition-all cursor-pointer flex items-center gap-2",
                      selectedCategory === tab.id
                        ? "bg-primary text-primary-foreground font-medium shadow-sm"
                        : "border border-border/60 bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                    )}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={cn(
                        "text-xs opacity-70",
                        selectedCategory === tab.id ? "text-primary-foreground" : "text-muted-foreground"
                      )}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 font-display text-sm md:text-base">
                <span className="text-muted-foreground">Sort by:</span>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-full border border-border/60 bg-background/80 px-4 py-1.5 font-display text-sm md:text-base text-foreground outline-none transition-colors hover:border-foreground/30 focus:border-gold cursor-pointer"
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
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Nūne-inspired Quality Pillars & Farm Traceability */}
        <section className="border-t border-border/60 bg-veil px-5 py-20 md:px-10 md:py-28 font-display">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="font-display text-xs uppercase tracking-[0.22em] font-medium text-gold-ink">The SRSTI Standard</p>
              <h2 className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">
                How Ancient Cold-Pressing Outperforms Industrial Refining
              </h2>
              <p className="mt-4 font-display text-lg text-muted-foreground/90 leading-relaxed">
                Modern vegetable oils are stripped by chemical solvents like petroleum hexane and deodorized at 240°C. Here is why our wooden ghani method remains irreplaceable.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <div className="glass-panel rounded-3xl p-8 font-display">
                <span className="font-display text-xs uppercase tracking-[0.2em] font-medium text-gold-ink">01 · Frictionless Wood</span>
                <h3 className="mt-3 font-display text-2xl font-medium">Neem & Vaagai Wood Ghani</h3>
                <p className="mt-3 font-display text-base leading-relaxed text-muted-foreground/90">
                  Unlike metal expellers that heat seeds to 90°C and leech metallic ions, our heavy mortar is carved from seasoned wild neem and vaagai timber. It absorbs friction, keeping seed temperature naturally below 35°C.
                </p>
                <ul className="mt-6 space-y-2 font-display text-sm text-foreground/80">
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

              <div className="glass-panel rounded-3xl p-8 font-display">
                <span className="font-display text-xs uppercase tracking-[0.2em] font-medium text-gold-ink">02 · Gravity Clarification</span>
                <h3 className="mt-3 font-display text-2xl font-medium">48-Hour Gravity Sedimentation</h3>
                <p className="mt-3 font-display text-base leading-relaxed text-muted-foreground/90">
                  Industrial oil requires bleaching earths and caustic chemical neutralization to remove cloudiness. SRSTI oils rest untouched in stainless decanters for two days — micro seed fibers settle purely by earth’s gravity.
                </p>
                <ul className="mt-6 space-y-2 font-display text-sm text-foreground/80">
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

              <div className="glass-panel rounded-3xl p-8 font-display">
                <span className="font-display text-xs uppercase tracking-[0.2em] font-medium text-gold-ink">03 · Verified Transparency</span>
                <h3 className="mt-3 font-display text-2xl font-medium">NABL Laboratory Batch Reports</h3>
                <p className="mt-3 font-display text-base leading-relaxed text-muted-foreground/90">
                  Trust is verifiable. Every harvest batch undergoes independent laboratory gas chromatography to certify 0.0 ppm hexane solvents, zero argemone adulteration, and minimal free fatty acids.
                </p>
                <ul className="mt-6 space-y-2 font-display text-sm text-foreground/80">
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
