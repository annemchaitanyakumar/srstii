import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
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

/* =========================================================================
   Botanical Variety SVG Icons (Matching Reference Design)
   ========================================================================= */

function GroundnutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 8C10.5 12 11 18 13.5 22C11 26 10.5 32 14 36C18 39.5 22 36.5 22 32C22 28 19 25 19 22C19 19 22 16 22 12C22 7.5 18 4.5 14 8Z" />
      <path d="M26 8C22.5 12 23 18 25.5 22C23 26 22.5 32 26 36C30 39.5 34 36.5 34 32C34 28 31 25 31 22C31 19 34 16 34 12C34 7.5 30 4.5 26 8Z" />
      <circle cx="16.5" cy="14" r="1" fill="currentColor" />
      <circle cx="16.5" cy="30" r="1" fill="currentColor" />
      <circle cx="28.5" cy="14" r="1" fill="currentColor" />
      <circle cx="28.5" cy="30" r="1" fill="currentColor" />
    </svg>
  );
}

function MustardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6C20 6 9 20 9 27.5C9 33.3 13.9 38 20 38C26.1 38 31 33.3 31 27.5C31 20 20 6 20 6Z" />
      <path d="M20 15C20 15 14 23 14 27.5C14 30.5 16.5 33 20 33" strokeWidth="1.8" />
    </svg>
  );
}

function SunflowerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="7.5" strokeWidth="2.2" />
      <path d="M20 4V8M20 32V36M4 20H8M32 20H36M8.7 8.7L11.5 11.5M28.5 28.5L31.3 31.3M8.7 31.3L11.5 28.5M28.5 11.5L31.3 8.7M13 16C12.5 13.5 14 11 16.5 11M24 11C26.5 11 28 13.5 27.5 16M27.5 24C28 26.5 26.5 29 24 29M16.5 29C14 29 12.5 26.5 13 24" />
    </svg>
  );
}

function CoconutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M31 10C21 6.5 10 14 8 24C6.5 32 13 36 21 35C29 33 35 25 34 16C33.5 13.5 32.5 11.5 31 10Z" />
      <path d="M28 13C19.5 10 11.5 16 10 24C9 30.5 14 33 20 32C26.5 30.5 31 23.5 30 17C29.5 15 29 13.8 28 13Z" />
      <path d="M16 26C19 28 23 27 24 24" strokeWidth="1.8" />
    </svg>
  );
}

function SesameIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="15" cy="15" r="6" />
      <circle cx="25" cy="15" r="6" />
      <circle cx="15" cy="25" r="6" />
      <circle cx="25" cy="25" r="6" />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
    </svg>
  );
}

function GheeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 8H25M17 8V11H23V8M12 16C12 13 15 11 20 11C25 11 28 13 28 16C30 19 30 27 28 31C26 35 23 36 20 36C17 36 14 35 12 31C10 27 10 19 12 16Z" />
      <path d="M20 18V26M17 22L20 18L23 22" strokeWidth="1.6" />
    </svg>
  );
}

function AllOilsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6C20 6 13 15 13 21C13 24.9 16.1 28 20 28C23.9 28 27 24.9 27 21C27 15 20 6 20 6Z" />
      <path d="M10 20C10 20 6 25 6 29C6 31.8 8.2 34 11 34C13.8 34 16 31.8 16 29C16 25 10 20 10 20Z" />
      <path d="M30 20C30 20 24 25 24 29C24 31.8 26.2 34 29 34C31.8 34 34 31.8 34 29C34 25 30 20 30 20Z" />
    </svg>
  );
}

type VarietyId = "all" | "groundnut" | "mustard" | "sunflower" | "coconut" | "sesame" | "ghee";

interface VarietyTab {
  id: VarietyId;
  label: string;
  icon: (props: { className?: string }) => JSX.Element;
}

const VARIETIES: VarietyTab[] = [
  { id: "all", label: "All Pressings", icon: AllOilsIcon },
  { id: "groundnut", label: "Groundnut", icon: GroundnutIcon },
  { id: "mustard", label: "Mustard", icon: MustardIcon },
  { id: "sunflower", label: "Sunflower", icon: SunflowerIcon },
  { id: "coconut", label: "Coconut", icon: CoconutIcon },
  { id: "sesame", label: "Sesame", icon: SesameIcon },
  { id: "ghee", label: "Vedic Ghee", icon: GheeIcon },
];

type SortOption = "featured" | "price-asc" | "price-desc" | "smoke-point" | "rating";

function ProductsCatalogPage() {
  const [selectedVariety, setSelectedVariety] = useState<VarietyId>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedVariety === "groundnut") {
      list = list.filter((p) => p.id.includes("groundnut") || p.name.toLowerCase().includes("groundnut"));
    } else if (selectedVariety === "mustard") {
      list = list.filter((p) => p.id.includes("mustard") || p.name.toLowerCase().includes("mustard"));
    } else if (selectedVariety === "sunflower") {
      list = list.filter((p) => p.id.includes("safflower") || p.id.includes("flaxseed") || p.name.toLowerCase().includes("safflower"));
    } else if (selectedVariety === "coconut") {
      list = list.filter((p) => p.id.includes("coconut") || p.name.toLowerCase().includes("coconut"));
    } else if (selectedVariety === "sesame") {
      list = list.filter((p) => p.id.includes("sesame") || p.name.toLowerCase().includes("sesame"));
    } else if (selectedVariety === "ghee") {
      list = list.filter((p) => p.category === "ghee" || p.id.includes("ghee") || p.id.includes("honey"));
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
        break;
    }

    return list;
  }, [selectedVariety, sortBy]);

  return (
    <div className="min-h-screen bg-background text-foreground font-display selection:bg-gold/20 selection:text-gold-ink">
      <Header />

      <main id="main" className="pt-24 md:pt-32 font-display">
        {/* Botanical Variety Exploration Section (Exact Match to Reference Design) */}
        <section className="px-4 pt-2 pb-4 sm:px-6 md:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Centered Heading */}
            <div className="text-center pt-2 pb-6 sm:pb-8">
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gold-ink tracking-tight">
                Product in Focus:
              </p>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mt-1">
                Explore Our Cold-Pressed Oils
              </h1>
            </div>

            {/* Botanical Variety Icon Tabs Rail */}
            <div className="w-full overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center gap-5 sm:gap-8 md:gap-12 px-2 pb-3 border-b border-foreground/10">
              {VARIETIES.map((v) => {
                const Icon = v.icon;
                const isActive = selectedVariety === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariety(v.id)}
                    className={cn(
                      "group relative flex flex-col items-center gap-2 pb-3 text-center transition-all cursor-pointer shrink-0 min-w-[70px] sm:min-w-[85px]",
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "p-1.5 transition-transform duration-300 group-hover:scale-110",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      <Icon className="size-8 sm:size-10" />
                    </div>
                    <span
                      className={cn(
                        "text-xs sm:text-sm tracking-wide transition-colors whitespace-nowrap",
                        isActive
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {v.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="botanical-active-underline"
                        className="absolute bottom-0 inset-x-0 h-1 bg-foreground rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sub-bar with Item Count & Sort Controls */}
            <div className="mt-4 mb-6 flex items-center justify-between text-xs sm:text-sm font-display text-muted-foreground px-1">
              <span>
                Showing <strong className="text-foreground font-semibold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "reserve" : "reserves"}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  Sort:
                </span>
                <div className="relative">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    aria-label="Sort reserves"
                    className="appearance-none rounded-full border border-foreground/15 bg-background/90 px-3.5 py-1.5 pr-7 font-display text-xs sm:text-sm font-medium text-foreground outline-none transition-colors hover:border-foreground/35 focus:border-gold cursor-pointer shadow-xs"
                  >
                    <option value="featured">Featured Pressings</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="smoke-point">Smoke Point: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3 text-foreground/60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Catalog Grid (2 columns on mobile, 3 on md, 4 on lg) */}
        <section className="px-3 sm:px-6 pb-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-display text-lg text-muted-foreground">
                  No reserves found in this category.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedVariety("all")}
                  className="mt-4 text-sm font-medium text-foreground hover:text-gold-ink underline underline-offset-4 cursor-pointer transition-colors"
                >
                  View all pressings
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Educational Section: The SRSTI Standard */}
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
                <h3 className="mt-3 font-display text-2xl font-medium">Neem &amp; Vaagai Wood Ghani</h3>
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
                <h3 className="mt-3 font-display text-2xl font-medium">Single-Harvest Origin Batches</h3>
                <p className="mt-3 font-display text-base leading-relaxed text-muted-foreground/90">
                  Refined oils combine seed harvests from thousands of undisclosed industrial farms across continents. SRSTI bottles are traced to one partner farm, stamped with harvest date, press date, and chemist batch lab test.
                </p>
                <ul className="mt-6 space-y-2 font-display text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-gold-ink shrink-0" />
                    <span>100% single-variety unblended seeds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-gold-ink shrink-0" />
                    <span>Scannable lab certificate with every bottle</span>
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
