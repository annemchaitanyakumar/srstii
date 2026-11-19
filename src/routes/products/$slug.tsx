import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Compass,
  Droplets,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Utensils,
} from "lucide-react";
import { useState } from "react";

import { useCart } from "@/components/srsti/cart";
import { Footer } from "@/components/srsti/Footer";
import { Header } from "@/components/srsti/Header";
import { ProductCard } from "@/components/srsti/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatINR, getProductBySlug, PRODUCTS, type Product, type ProductVariant } from "@/lib/srsti/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) {
      throw notFound();
    }
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    return {
      meta: [
        { title: `${product?.name} — Wood-Pressed Liquid Heritage | SRSTI` },
        { name: "description", content: product?.tagline },
        { property: "og:title", content: `${product?.name} · ${product?.regionalName}` },
        { property: "og:description", content: product?.heroQuote },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();

  // Active image in gallery
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Selected packaging variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: "default",
      volume: product.volume,
      packaging: "Apothecary Decanter",
      price: product.price,
      perUnit: "",
    },
  );

  // Quantity stepper
  const [quantity, setQuantity] = useState(1);

  // Active section tab
  const [activeTab, setActiveTab] = useState<"craft" | "culinary" | "lab" | "ayurveda">("craft");

  // Related products (exclude current)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, selectedVariant.volume, selectedVariant.price, quantity);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-display selection:bg-gold/20 selection:text-gold-ink">
      <Header />

      <main id="main" className="pt-28 md:pt-36 font-display">
        {/* Breadcrumbs */}
        <div className="px-5 md:px-10">
          <nav className="mx-auto flex max-w-7xl items-center gap-2 font-display text-xs text-muted-foreground/75" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link to="/products" className="hover:text-foreground transition-colors">The Pressing Room</Link>
            <span className="opacity-40">/</span>
            <span className="text-foreground truncate">{product.name}</span>
          </nav>
        </div>

        {/* HERO SECTION: Heroic Bottle Stage (Left) & Editorial Purchase Experience (Right) */}
        <section className="px-5 py-6 md:px-10 md:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
              {/* LEFT COLUMN: Heroic Bottle Presentation (7 cols) */}
              <div className="lg:col-span-7">
                <div className="flex flex-col items-center">
                  {/* Bottle Stage — Free, breathing, no bounding box clutter */}
                  <div className="relative flex min-h-[480px] sm:min-h-[540px] md:min-h-[620px] w-full items-center justify-center py-8">
                    {/* Subtle ambient light glow behind bottle */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40 blur-3xl rounded-full"
                      style={{
                        background: "radial-gradient(circle at center, rgba(200, 138, 44, 0.16) 0%, transparent 68%)",
                      }}
                      aria-hidden="true"
                    />

                    {/* Active Bottle Image */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.03 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 flex h-full w-full items-center justify-center"
                      >
                        <img
                          src={product.gallery[activeImageIndex]?.src || product.image}
                          alt={product.gallery[activeImageIndex]?.caption || product.name}
                          className="max-h-[420px] sm:max-h-[500px] md:max-h-[580px] w-auto object-contain drop-shadow-[0_28px_50px_rgba(20,29,24,0.18)] transition-transform duration-700 ease-silk hover:scale-[1.02]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Minimal Thumbnails Switcher */}
                  {product.gallery.length > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-4">
                      {product.gallery.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={cn(
                            "relative size-16 md:size-20 rounded-2xl border p-2 transition-all cursor-pointer overflow-hidden flex items-center justify-center",
                            activeImageIndex === idx
                              ? "border-primary ring-1 ring-primary/40 bg-foreground/[0.04] opacity-100 shadow-sm"
                              : "border-border/60 bg-transparent opacity-50 hover:opacity-100 hover:border-foreground/40",
                          )}
                          aria-label={`View ${item.caption}`}
                        >
                          <img
                            src={item.src}
                            alt={item.caption}
                            className="max-h-full max-w-full object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Quiet Editorial Provenance Strip */}
                  <div className="w-full mt-10 pt-6 border-t border-border/40 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-display text-xs text-muted-foreground/80 text-center">
                    <span>Origin: <strong className="font-medium text-foreground">{product.trace.region ? product.trace.region.split(",")[0] : "Single-Origin"}</strong></span>
                    <span className="opacity-30">·</span>
                    <span>Method: <strong className="font-medium text-foreground">{product.woodGhaniDetails.rpm} RPM {product.woodGhaniDetails.woodType}</strong></span>
                    <span className="opacity-30">·</span>
                    <span>Temperature: <strong className="font-medium text-foreground">&lt; 35°C Press</strong></span>
                    <span className="opacity-30">·</span>
                    <span>Smoke: <strong className="font-medium text-gold-ink">{product.smokePoint}</strong></span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Editorial Purchase Narrative (5 cols) */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28 space-y-7">
                  {/* Title & Origin Narrative */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink">
                        Single-Origin Farm Reserve
                      </span>
                      <span className="text-muted-foreground/30">·</span>
                      <span className="font-display text-xs text-muted-foreground">{product.trace.batch}</span>
                    </div>

                    <h1 className="mt-2 font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-foreground">
                      {product.name}
                    </h1>
                    <p className="mt-1 font-display text-lg sm:text-xl italic text-muted-foreground/80">
                      {product.regionalName}
                    </p>

                    {/* Rating & Review Counter */}
                    <div className="mt-3 flex items-center gap-2.5 font-display text-xs">
                      <div className="flex items-center gap-0.5 text-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3.5 fill-gold text-gold" />
                        ))}
                      </div>
                      <span className="font-semibold text-foreground">{product.rating.score}</span>
                      <span className="text-muted-foreground/40">·</span>
                      <a href="#reviews" className="text-muted-foreground underline hover:text-foreground transition-colors">
                        {product.rating.count} harvest reviews
                      </a>
                    </div>

                    {/* Natural Unboxed Price */}
                    <div className="mt-6 flex items-baseline gap-3">
                      <span className="font-display text-4xl sm:text-5xl font-medium text-foreground">
                        {formatINR(selectedVariant.price * quantity)}
                      </span>
                      {selectedVariant.originalPrice && (
                        <span className="font-display text-base text-muted-foreground line-through">
                          {formatINR(selectedVariant.originalPrice * quantity)}
                        </span>
                      )}
                      <span className="font-display text-xs text-muted-foreground/80">
                        ({selectedVariant.volume} · All taxes included)
                      </span>
                    </div>

                    {/* Sensory Tagline */}
                    <p className="mt-4 font-display text-base leading-relaxed text-muted-foreground/90">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Vessel & Volume Selection (Minimal Segmented Grid) */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between font-display text-xs">
                      <span className="uppercase tracking-[0.16em] font-medium text-muted-foreground">
                        Select Vessel & Volume
                      </span>
                      <span className="font-medium text-foreground">
                        {selectedVariant.volume} · {selectedVariant.packaging}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {product.variants.map((v) => {
                        const isSelected = selectedVariant.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariant(v)}
                            className={cn(
                              "rounded-2xl p-3.5 text-left transition-all border cursor-pointer flex flex-col justify-between min-h-[82px]",
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-border/70 bg-transparent text-foreground hover:border-foreground/40",
                            )}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-display text-base sm:text-lg font-medium">{v.volume}</span>
                              {v.popular && (
                                <span
                                  className={cn(
                                    "rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
                                    isSelected
                                      ? "bg-primary-foreground/20 text-primary-foreground"
                                      : "bg-gold/15 text-gold-ink",
                                  )}
                                >
                                  Popular
                                </span>
                              )}
                            </div>
                            <div className="mt-2">
                              <div className={cn("text-xs font-medium font-display", isSelected ? "text-primary-foreground" : "text-foreground")}>
                                {formatINR(v.price)}
                              </div>
                              <div
                                className={cn(
                                  "text-[10px] truncate mt-0.5 font-display",
                                  isSelected ? "text-primary-foreground/75" : "text-muted-foreground",
                                )}
                              >
                                {v.packaging.split(" ")[0]}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity Stepper & Add to Basket Button */}
                  <div className="space-y-3 pt-1">
                    <div className="flex gap-3">
                      {/* Minimal Stepper */}
                      <div className="inline-flex items-center rounded-full border border-border/80 bg-background px-3 py-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center font-display text-sm font-semibold text-foreground">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      {/* Primary Harvest Button */}
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="liquid-btn flex flex-1 items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 font-display text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-gold hover:text-accent-foreground cursor-pointer shadow-md"
                      >
                        <Droplets className="size-4" />
                        <span>Add to Harvest Basket · {formatINR(selectedVariant.price * quantity)}</span>
                      </button>
                    </div>

                    {/* Delivery note */}
                    <div className="flex items-center text-xs font-display text-muted-foreground/80 pt-2 border-t border-border/40">
                      <span className="flex items-center gap-1.5">
                        <Truck className="size-3.5 text-gold-ink" /> Free delivery on orders over ₹1,500
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABBED IN-DEPTH SECTIONS: Craft, Culinary, Lab, Ayurveda */}
        <section className="border-t border-border/60 bg-veil px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            {/* Section Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border/50 pb-5">
              {[
                { id: "craft", label: "The Press & Provenance", icon: Compass },
                { id: "culinary", label: "Culinary & Smoke Point", icon: Utensils },
                { id: "lab", label: "NABL Lab Report & Purity", icon: ShieldCheck },
                { id: "ayurveda", label: "Ayurvedic Wisdom & Rituals", icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-5 py-2 font-display text-xs sm:text-sm transition-all cursor-pointer",
                      active
                        ? "bg-primary text-primary-foreground font-medium shadow-sm"
                        : "border border-border/60 bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                    )}
                  >
                    <Icon className="size-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: The Press & Provenance */}
            {activeTab === "craft" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 space-y-12"
              >
                <div className="grid gap-10 lg:grid-cols-2 items-center">
                  <div>
                    <p className="font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink">Provenance & Farm Story</p>
                    <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight md:text-5xl">
                      From Native Soil to Your Wooden Spoon
                    </h2>
                    <p className="mt-5 font-display text-base leading-relaxed text-muted-foreground/85">
                      {product.story}
                    </p>

                    <blockquote className="mt-6 border-l-2 border-gold pl-5 font-display text-lg italic text-foreground/90">
                      "{product.heroQuote}"
                    </blockquote>
                  </div>

                  {/* Sourcing card */}
                  <div className="rounded-3xl border border-border/60 bg-background/70 p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-border/50 pb-4">
                      <div>
                        <p className="font-display text-xs uppercase tracking-wider text-muted-foreground">Farm Origin</p>
                        <h3 className="font-display text-2xl font-medium text-foreground">{product.trace.farm}</h3>
                      </div>
                      <span className="grid size-10 place-items-center rounded-full bg-gold/15 text-gold-ink">
                        <MapPin className="size-5" />
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-display">
                      <div>
                        <span className="text-muted-foreground">Custodian / Farmer:</span>
                        <p className="mt-1 font-medium text-foreground">{product.trace.farmerName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Region:</span>
                        <p className="mt-1 font-medium text-foreground">{product.trace.region}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Harvest Season:</span>
                        <p className="mt-1 font-medium text-foreground">{product.trace.harvested}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Press Date:</span>
                        <p className="mt-1 font-medium text-foreground">{product.trace.pressed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Extraction Ghani:</span>
                        <p className="mt-1 font-medium text-foreground">{product.woodGhaniDetails.woodType}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">GPS Location:</span>
                        <p className="mt-1 font-medium text-foreground">{product.trace.geoCoordinates}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cold Pressing vs Industrial Refining Comparison Gauge */}
                <div className="rounded-3xl border border-border/60 bg-linen/50 p-8 md:p-10">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-center md:text-3xl text-foreground">
                    Temperature Extraction Spectrum: How Heat Destroys Oil
                  </h3>
                  <p className="mx-auto mt-2 max-w-2xl text-center font-display text-sm text-muted-foreground">
                    High temperatures oxidize unsaturated fats and create inflammatory free radicals. Our wooden ghani protects the living nutrients.
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border-2 border-gold/60 bg-background/90 p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xs uppercase text-gold-ink font-semibold">SRSTI Wood Ghani</span>
                        <span className="rounded-full bg-gold/15 px-2.5 py-0.5 font-display text-xs text-gold-ink font-bold">
                          {product.woodGhaniDetails.maxTemperature}
                        </span>
                      </div>
                      <p className="mt-3 font-display text-xs leading-relaxed text-foreground/85">
                        Native wood absorbs frictional heat. Tocopherols, polyphenols, and fresh seed fragrance remain 100% active.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-background/50 p-5 opacity-80">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xs uppercase text-muted-foreground">Metal Screw Expeller</span>
                        <span className="rounded-full bg-foreground/10 px-2.5 py-0.5 font-display text-xs text-muted-foreground font-semibold">
                          85°C – 120°C
                        </span>
                      </div>
                      <p className="mt-3 font-display text-xs leading-relaxed text-muted-foreground">
                        High-speed iron screws burn the seed mass, creating burnt undertones and depleting delicate vitamins.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-background/50 p-5 opacity-70">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xs uppercase text-muted-foreground">Commercial Solvent Refined</span>
                        <span className="rounded-full bg-foreground/10 px-2.5 py-0.5 font-display text-xs text-muted-foreground font-semibold">
                          200°C – 240°C
                        </span>
                      </div>
                      <p className="mt-3 font-display text-xs leading-relaxed text-muted-foreground">
                        Bathed in hexane petroleum ether, bleached with acid clay, and deodorized at blistering temperatures. Completely dead fat.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: Culinary & Smoke Point */}
            {activeTab === "culinary" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 space-y-12"
              >
                <div className="grid gap-10 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <p className="font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink">Heat Tolerance & Aroma</p>
                      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight">
                        Smoke Point: {product.smokePoint}
                      </h2>
                      <p className="mt-1 font-display text-xs text-gold-ink font-semibold">
                        {product.smokePointLevel}
                      </p>
                    </div>

                    <p className="font-display text-base leading-relaxed text-muted-foreground/85">
                      Smoke point is the temperature at which cooking fat ceases to shimmer and begins to break down into smoke and acrid compounds. Because {product.name} is pure and free of moisture impurities, it maintains high thermal integrity.
                    </p>

                    {/* Tasting Wheel / Flavor Notes */}
                    <div className="rounded-2xl border border-border/60 bg-background/70 p-6">
                      <h4 className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                        Tasting Wheel & Descriptors
                      </h4>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.notes.map((note) => (
                          <span
                            key={note}
                            className="rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 font-display text-xs font-medium text-gold-ink"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Culinary Pairings List */}
                  <div className="lg:col-span-6 space-y-4">
                    <h3 className="font-display text-2xl font-medium">Recommended Culinary Pairings</h3>
                    {product.pairings.map((p) => (
                      <div key={p.title} className="rounded-2xl border border-border/60 bg-background/70 p-5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-xl font-medium text-foreground">{p.title}</h4>
                          <span className="font-display text-xs text-gold-ink font-medium">{p.dish}</span>
                        </div>
                        <p className="mt-2 font-display text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kitchen Guidelines & Storage */}
                <div className="rounded-3xl border border-border/60 bg-linen/60 p-8">
                  <h3 className="font-display text-2xl font-medium">Kitchen Guidelines & Storage</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2 font-display">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-foreground/80 font-semibold">How to Use:</p>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {product.howToUse.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-gold font-bold">·</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-foreground/80 font-semibold">Pantry Storage:</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {product.storage}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: NABL Lab Report & Purity */}
            {activeTab === "lab" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 space-y-10"
              >
                <div className="grid gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <p className="font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink">NABL Accredited Certificate</p>
                      <h2 className="mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl">
                        Batch Purity Analysis · {product.trace.batch}
                      </h2>
                      <p className="mt-2 font-display text-sm text-muted-foreground">
                        Every single pressing is tested by independent ISO/IEC 17025 accredited laboratories to ensure zero pesticide residues, zero heavy metals, and no petroleum extraction solvents.
                      </p>
                    </div>

                    {/* Lab table */}
                    <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/80">
                      <table className="w-full text-left text-xs font-display">
                        <thead className="border-b border-border/60 bg-foreground/[0.03] text-muted-foreground">
                          <tr>
                            <th className="p-3.5">Analytical Parameter</th>
                            <th className="p-3.5">Observed Value</th>
                            <th className="p-3.5">FSSAI / Codex Standard</th>
                            <th className="p-3.5 text-right">Result</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {product.lab.map((row) => (
                            <tr key={row.label} className="hover:bg-foreground/[0.01]">
                              <td className="p-3.5 font-medium text-foreground">{row.label}</td>
                              <td className="p-3.5 font-bold text-foreground">{row.value}</td>
                              <td className="p-3.5 text-muted-foreground">{row.standard}</td>
                              <td className="p-3.5 text-right">
                                <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold-ink">
                                  <Check className="size-3" /> PASS
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Nutrition Card */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="rounded-3xl border border-border/60 bg-background/80 p-6">
                      <h3 className="font-display text-2xl font-medium">Nutritional Facts</h3>
                      <p className="font-display text-xs text-muted-foreground">Per serving size: {product.nutrition.servingSize}</p>

                      <div className="mt-6 space-y-3 font-display text-xs">
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="text-muted-foreground">Energy</span>
                          <span className="font-bold text-foreground">{product.nutrition.energyKcal} kcal</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="text-muted-foreground">Total Fat</span>
                          <span className="font-bold text-foreground">{product.nutrition.totalFat}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2 pl-4">
                          <span className="text-muted-foreground">Monounsaturated (MUFA)</span>
                          <span className="text-foreground">{product.nutrition.mufa}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2 pl-4">
                          <span className="text-muted-foreground">Polyunsaturated (PUFA)</span>
                          <span className="text-foreground">{product.nutrition.pufa}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2 pl-4">
                          <span className="text-muted-foreground">Saturated Fat</span>
                          <span className="text-foreground">{product.nutrition.saturatedFat}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="text-muted-foreground">Trans Fatty Acids</span>
                          <span className="font-bold text-gold-ink">{product.nutrition.transFat} (0.0g)</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="text-muted-foreground">Cholesterol</span>
                          <span className="text-foreground">{product.nutrition.cholesterol}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-muted-foreground">Active Vitamin E</span>
                          <span className="text-foreground">{product.nutrition.vitaminE}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: Ayurvedic Wisdom & Rituals */}
            {activeTab === "ayurveda" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 space-y-10"
              >
                <div className="grid gap-10 lg:grid-cols-2 items-center">
                  <div>
                    <p className="font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink">Vedic Rasayana</p>
                    <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight">
                      Dosha Balance & Tissue Nourishment
                    </h2>
                    <p className="mt-4 font-display text-base leading-relaxed text-muted-foreground">
                      In classical Ayurveda, unrefined cold-pressed oils and cultured bilona ghee are classified not as inert calories, but as <em>Sneha</em> — sacred lubricating substances that penetrate the seven Dhatus (tissues) to support Ojas (vital radiance).
                    </p>

                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-border/60 bg-background/80 p-5 font-display">
                        <span className="text-xs uppercase tracking-wider text-gold-ink font-semibold">Dosha Profile:</span>
                        <p className="mt-1 font-display text-xl">{product.ayurveda.dosha}</p>
                      </div>

                      <div className="rounded-2xl border border-border/60 bg-background/80 p-5 font-display">
                        <span className="text-xs uppercase tracking-wider text-gold-ink font-semibold">Sanskrit Properties (Gunas):</span>
                        <p className="mt-1 text-sm text-foreground/90">{product.ayurveda.property}</p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits card */}
                  <div className="rounded-3xl border border-border/60 bg-background/80 p-8 space-y-4">
                    <h3 className="font-display text-2xl font-medium">Therapeutic Benefits</h3>
                    <ul className="space-y-4 font-display">
                      {product.ayurveda.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-ink text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="text-sm leading-relaxed text-foreground/85">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* REVIEWS & HARVEST FEEDBACK */}
        <section id="reviews" className="px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-12">
              {/* Summary left */}
              <div className="lg:col-span-4 space-y-4">
                <p className="font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink">Harvest Feedback</p>
                <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight">Customer Testimonials</h2>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl md:text-6xl font-medium">{product.rating.score}</span>
                  <div>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="mt-1 font-display text-xs text-muted-foreground">Based on {product.rating.count} reviews</p>
                  </div>
                </div>
                <p className="font-display text-xs text-muted-foreground leading-relaxed">
                  Real feedback from home cooks, chefs, and Ayurvedic doctors who have introduced SRSTI pressings into their kitchens.
                </p>
              </div>

              {/* Review cards right */}
              <div className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="rounded-3xl border border-border/60 bg-background/70 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex text-gold">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="size-3.5 fill-gold text-gold" />
                          ))}
                        </div>
                        <span className="font-display text-xs text-muted-foreground">{rev.date}</span>
                      </div>
                      <h4 className="mt-3 font-display text-lg font-medium leading-snug">{rev.title}</h4>
                      <p className="mt-2 font-display text-xs leading-relaxed text-muted-foreground">{rev.comment}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-3 text-xs font-display">
                      <span className="font-medium text-foreground">{rev.author} · {rev.location}</span>
                      {rev.verified && (
                        <span className="text-gold-ink font-semibold flex items-center gap-1 text-[11px]">
                          <Check className="size-3" /> Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <section className="border-t border-border/60 bg-veil px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink">Knowledge & Clarity</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium tracking-tight">Frequently Asked Questions</h2>
              <p className="mt-3 font-display text-sm text-muted-foreground">
                Everything you should know about artisanal cold-pressing, natural sedimentation, and pantry care.
              </p>
            </div>

            <div className="mt-10">
              <Accordion type="single" collapsible className="space-y-3">
                {product.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="rounded-2xl border border-border/60 bg-background/80 px-6 py-2 transition-all hover:border-gold/30"
                  >
                    <AccordionTrigger className="font-display text-lg md:text-xl font-medium text-left text-foreground hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-display text-sm leading-relaxed text-muted-foreground pt-1 pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* COMPLETE YOUR PANTRY (Related Products) */}
        <section className="px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.22em] font-medium text-gold-ink">Complementary Pressings</p>
                <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                  Complete Your Kitchen Pantry
                </h2>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-wider text-gold-ink hover:underline"
              >
                View all pressings <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {relatedProducts.map((rel, idx) => (
                <ProductCard key={rel.id} product={rel} index={idx} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
