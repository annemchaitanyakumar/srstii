import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Droplets,
  Flame,
  HeartHandshake,
  HelpCircle,
  Info,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Thermometer,
  ThermometerSnowflake,
  Truck,
  Utensils,
} from "lucide-react";
import { useState } from "react";

import { useCart } from "@/components/srsti/cart";
import { Footer } from "@/components/srsti/Footer";
import { Header } from "@/components/srsti/Header";
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
    <div className="min-h-screen bg-background text-foreground selection:bg-gold/20 selection:text-gold-ink">
      <Header />

      <main id="main" className="pt-28 md:pt-36">
        {/* Breadcrumbs */}
        <div className="px-5 md:px-10">
          <nav className="mx-auto flex max-w-7xl items-center gap-2 font-mono text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="size-3" />
            <Link to="/products" className="hover:text-foreground transition-colors">The Pressing Room</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground font-medium truncate">{product.name}</span>
          </nav>
        </div>

        {/* HERO SECTION: Gallery (Left) & Sticky Purchase Panel (Right) */}
        <section className="px-5 py-8 md:px-10 md:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* LEFT COLUMN: Gallery & Visual Provenance (7 cols) */}
              <div className="lg:col-span-7">
                <div className="space-y-4">
                  {/* Primary Viewport Card */}
                  <div className="glass-panel relative flex min-h-[460px] md:min-h-[580px] w-full items-center justify-center overflow-hidden rounded-[2.5rem] p-8 md:p-12">
                    {/* Floating Badges */}
                    <div className="absolute left-6 top-6 z-10 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-background/85 px-3 py-1 font-mono text-xs backdrop-blur-md">
                        <Droplets className="size-3 text-gold-ink" />
                        Wood-Ghani Pressed
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-background/85 px-3 py-1 font-mono text-xs backdrop-blur-md">
                        <ThermometerSnowflake className="size-3 text-gold-ink" />
                        Temp &lt; 35°C
                      </span>
                    </div>

                    <div className="absolute right-6 top-6 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 font-mono text-xs font-medium text-gold-ink backdrop-blur-md">
                        <Flame className="size-3.5" />
                        Smoke: {product.smokePoint}
                      </span>
                    </div>

                    {/* Active Image with crossfade */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="flex h-full w-full items-center justify-center"
                      >
                        <img
                          src={product.gallery[activeImageIndex]?.src || product.image}
                          alt={product.gallery[activeImageIndex]?.caption || product.name}
                          className="max-h-[380px] md:max-h-[500px] w-auto object-contain drop-shadow-2xl transition-transform duration-700"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Image Caption Footer */}
                    <div className="absolute bottom-4 inset-x-6 z-10 rounded-xl bg-background/70 px-4 py-2 backdrop-blur-md border border-glass-border/50 text-center">
                      <p className="font-mono text-xs text-muted-foreground truncate">
                        {product.gallery[activeImageIndex]?.caption || product.name}
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail Selector Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {product.gallery.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={cn(
                          "relative flex h-20 md:h-24 items-center justify-center rounded-2xl border bg-linen/70 p-2 transition-all cursor-pointer overflow-hidden",
                          activeImageIndex === idx
                            ? "border-gold ring-2 ring-gold/30 shadow-md"
                            : "border-border/70 hover:border-foreground/30 opacity-70 hover:opacity-100",
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

                  {/* Sourcing summary strip below gallery */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="glass-panel rounded-2xl p-4 text-center">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Origin</p>
                      <p className="mt-1 font-display text-lg font-medium leading-tight">{product.trace.region}</p>
                    </div>
                    <div className="glass-panel rounded-2xl p-4 text-center">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Press Speed</p>
                      <p className="mt-1 font-display text-lg font-medium leading-tight">{product.woodGhaniDetails.rpm} RPM Wood Mortar</p>
                    </div>
                    <div className="glass-panel rounded-2xl p-4 text-center">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Harvest Batch</p>
                      <p className="mt-1 font-display text-lg font-medium leading-tight">{product.trace.batch}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Sticky Purchase Panel (5 cols) */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 space-y-6">
                  {/* Header info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-gold-ink font-semibold">
                        Single-Origin Farm Reserve
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="font-mono text-xs text-muted-foreground">{product.trace.batch}</span>
                    </div>

                    <h1 className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">
                      {product.name}
                    </h1>
                    <p className="mt-1 font-serif text-lg italic text-muted-foreground">
                      {product.regionalName}
                    </p>

                    {/* Rating and review counter */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center gap-1 text-gold-ink">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-4 fill-gold text-gold" />
                        ))}
                        <span className="ml-1.5 font-mono text-xs font-semibold text-foreground">
                          {product.rating.score}
                        </span>
                      </div>
                      <span className="text-muted-foreground text-xs">·</span>
                      <a href="#reviews" className="font-mono text-xs text-muted-foreground underline hover:text-foreground">
                        {product.rating.count} harvest reviews
                      </a>
                    </div>

                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="glass-panel flex items-baseline justify-between rounded-2xl px-5 py-4">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-4xl font-medium text-foreground">
                          {formatINR(selectedVariant.price * quantity)}
                        </span>
                        {selectedVariant.originalPrice && (
                          <span className="font-mono text-base text-muted-foreground line-through">
                            {formatINR(selectedVariant.originalPrice * quantity)}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                        Unit rate: {selectedVariant.perUnit || `approx ${formatINR(selectedVariant.price)}`} · All taxes included
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-mono text-gold-ink font-medium">
                      <Truck className="size-3.5" />
                      Free shipping above ₹1,500
                    </span>
                  </div>

                  {/* Size & Packaging Variant Selector (Nūne signature) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-medium uppercase tracking-wider text-foreground">
                        Select Volume & Vessel:
                      </span>
                      <span className="text-muted-foreground">{selectedVariant.volume}</span>
                    </div>

                    <div className="grid gap-2.5">
                      {product.variants.map((v) => {
                        const isSelected = selectedVariant.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariant(v)}
                            className={cn(
                              "flex items-center justify-between rounded-2xl border p-4 text-left transition-all cursor-pointer",
                              isSelected
                                ? "border-gold bg-gold/10 ring-1 ring-gold/40 shadow-sm"
                                : "border-border bg-background/60 hover:border-foreground/30",
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={cn(
                                  "grid size-5 place-items-center rounded-full border text-[10px]",
                                  isSelected
                                    ? "border-gold bg-gold text-accent-foreground"
                                    : "border-muted-foreground/40",
                                )}
                              >
                                {isSelected && <Check className="size-3 stroke-[3]" />}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-display text-lg font-medium text-foreground">
                                    {v.volume}
                                  </span>
                                  {v.popular && (
                                    <span className="rounded-full bg-gold/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-gold-ink">
                                      Most Cherished
                                    </span>
                                  )}
                                </div>
                                <p className="font-mono text-xs text-muted-foreground">
                                  {v.packaging} · {v.perUnit}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="font-display text-xl font-medium text-foreground">
                                {formatINR(v.price)}
                              </p>
                              {v.originalPrice && (
                                <p className="font-mono text-[11px] text-muted-foreground line-through">
                                  {formatINR(v.originalPrice)}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity Stepper & Add to Basket Button */}
                  <div className="space-y-4 pt-2">
                    <div className="flex gap-3">
                      {/* Stepper */}
                      <div className="inline-flex items-center rounded-full border border-border bg-linen px-3 py-1.5">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                          aria-label="Decrease bottle quantity"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="min-w-10 text-center font-mono text-sm font-semibold">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                          aria-label="Increase bottle quantity"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>

                      {/* Primary CTA button */}
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="liquid-btn flex flex-1 items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 font-medium text-primary-foreground transition-all duration-300 hover:bg-gold hover:text-accent-foreground hover:shadow-gold cursor-pointer"
                      >
                        <Droplets className="size-4" />
                        <span>Add to Harvest Basket · {formatINR(selectedVariant.price * quantity)}</span>
                      </button>
                    </div>

                    {/* Trust assurances strip */}
                    <div className="rounded-2xl border border-glass-border bg-foreground/[0.02] p-4 text-xs space-y-2">
                      <div className="flex items-center gap-2 text-foreground/80">
                        <CheckCircle2 className="size-4 text-gold-ink shrink-0" />
                        <span>Fresh pressing dispatch within 24 hours of order</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/80">
                        <ShieldCheck className="size-4 text-gold-ink shrink-0" />
                        <span>100% Raw & Unrefined: No Hexane, Argemone, or Bleaching</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/80">
                        <Truck className="size-4 text-gold-ink shrink-0" />
                        <span>Eco-friendly shatterproof packaging with tamper-evident seal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABBED IN-DEPTH SECTIONS: The Craft, Culinary Profile, Lab Purity, Ayurveda */}
        <section className="border-t border-border/60 bg-veil px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            {/* Section Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border/60 pb-6">
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
                      "flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs transition-all cursor-pointer",
                      active
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "border border-border/70 bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground",
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
                    <p className="eyebrow text-gold-ink">Provenance & Farm Story</p>
                    <h2 className="mt-2 font-display text-4xl font-medium tracking-tight md:text-5xl">
                      From Native Soil to Your Wooden Spoon
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                      {product.story}
                    </p>

                    <blockquote className="mt-6 border-l-2 border-gold pl-5 font-serif text-lg italic text-foreground/90">
                      "{product.heroQuote}"
                    </blockquote>
                  </div>

                  {/* Sourcing card */}
                  <div className="glass-panel rounded-3xl p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-border/60 pb-4">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Farm Origin</p>
                        <h3 className="font-display text-2xl font-medium">{product.trace.farm}</h3>
                      </div>
                      <span className="grid size-10 place-items-center rounded-full bg-gold/15 text-gold-ink">
                        <MapPin className="size-5" />
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-muted-foreground">Custodian / Farmer:</span>
                        <p className="mt-1 font-medium text-foreground">{product.trace.farmerName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Region & Agro-zone:</span>
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
                <div className="rounded-3xl border border-glass-border bg-linen/50 p-8 md:p-10">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-center md:text-3xl">
                    Temperature Extraction Spectrum: How Heat Destroys Oil
                  </h3>
                  <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
                    High temperatures oxidize unsaturated fats and create inflammatory free radicals. Our wooden ghani protects the living nutrients.
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border-2 border-gold/60 bg-background/90 p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase text-gold-ink font-semibold">SRSTI Wood Ghani</span>
                        <span className="rounded-full bg-gold/15 px-2.5 py-0.5 font-mono text-xs text-gold-ink font-bold">
                          {product.woodGhaniDetails.maxTemperature}
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-foreground/85">
                        Native wood absorbs frictional heat. Tocopherols, polyphenols, and fresh seed fragrance remain 100% active.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background/50 p-5 opacity-80">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase text-muted-foreground">Metal Screw Expeller</span>
                        <span className="rounded-full bg-foreground/10 px-2.5 py-0.5 font-mono text-xs text-muted-foreground font-semibold">
                          85°C – 120°C
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        High-speed iron screws burn the seed mass, creating burnt undertones and depleting delicate vitamins.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background/50 p-5 opacity-70">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase text-muted-foreground">Commercial Solvent Refined</span>
                        <span className="rounded-full bg-foreground/10 px-2.5 py-0.5 font-mono text-xs text-muted-foreground font-semibold">
                          200°C – 240°C
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
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
                      <p className="eyebrow text-gold-ink">Heat Tolerance & Aroma</p>
                      <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">
                        Smoke Point: {product.smokePoint}
                      </h2>
                      <p className="mt-1 font-mono text-xs text-gold-ink font-semibold">
                        {product.smokePointLevel}
                      </p>
                    </div>

                    <p className="text-base leading-relaxed text-muted-foreground">
                      Smoke point is the temperature at which cooking fat ceases to shimmer and begins to break down into smoke and acrid compounds. Because {product.name} is pure and free of moisture impurities, it maintains high thermal integrity.
                    </p>

                    {/* Tasting Wheel / Flavor Notes */}
                    <div className="rounded-2xl border border-glass-border bg-background p-6">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Tasting Wheel & Descriptors
                      </h4>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.notes.map((note) => (
                          <span
                            key={note}
                            className="rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-medium text-gold-ink"
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
                      <div key={p.title} className="glass-panel rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-xl font-medium text-foreground">{p.title}</h4>
                          <span className="font-mono text-xs text-gold-ink font-medium">{p.dish}</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to use checklist */}
                <div className="rounded-3xl border border-glass-border bg-linen p-8">
                  <h3 className="font-display text-2xl font-medium">Kitchen Guidelines & Storage</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="font-mono text-xs uppercase tracking-wider text-foreground/80 font-semibold">How to Use:</p>
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
                      <p className="font-mono text-xs uppercase tracking-wider text-foreground/80 font-semibold">Pantry Storage:</p>
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
                      <p className="eyebrow text-gold-ink">NABL Accredited Certificate</p>
                      <h2 className="mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl">
                        Batch Purity Analysis · {product.trace.batch}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Every single pressing is tested by independent ISO/IEC 17025 accredited laboratories to ensure zero pesticide residues, zero heavy metals, and no petroleum extraction solvents.
                      </p>
                    </div>

                    {/* Lab table */}
                    <div className="overflow-hidden rounded-2xl border border-border bg-background">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="border-b border-border bg-foreground/[0.03] text-muted-foreground">
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
                              <td className="p-3.5 font-sans font-medium text-foreground">{row.label}</td>
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
                    <div className="glass-panel rounded-3xl p-6">
                      <h3 className="font-display text-2xl font-medium">Nutritional Facts</h3>
                      <p className="font-mono text-xs text-muted-foreground">Per serving size: {product.nutrition.servingSize}</p>

                      <div className="mt-6 space-y-3 font-mono text-xs">
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="font-sans text-muted-foreground">Energy</span>
                          <span className="font-bold text-foreground">{product.nutrition.energyKcal} kcal</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="font-sans text-muted-foreground">Total Fat</span>
                          <span className="font-bold text-foreground">{product.nutrition.totalFat}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2 pl-4">
                          <span className="font-sans text-muted-foreground">Monounsaturated (MUFA)</span>
                          <span className="text-foreground">{product.nutrition.mufa}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2 pl-4">
                          <span className="font-sans text-muted-foreground">Polyunsaturated (PUFA)</span>
                          <span className="text-foreground">{product.nutrition.pufa}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2 pl-4">
                          <span className="font-sans text-muted-foreground">Saturated Fat</span>
                          <span className="text-foreground">{product.nutrition.saturatedFat}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="font-sans text-muted-foreground">Trans Fatty Acids</span>
                          <span className="font-bold text-gold-ink">{product.nutrition.transFat} (0.0g)</span>
                        </div>
                        <div className="flex justify-between border-b border-border/60 pb-2">
                          <span className="font-sans text-muted-foreground">Cholesterol</span>
                          <span className="text-foreground">{product.nutrition.cholesterol}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="font-sans text-muted-foreground">Active Vitamin E</span>
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
                    <p className="eyebrow text-gold-ink">Vedic Rasayana</p>
                    <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">
                      Dosha Balance & Tissue Nourishment
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      In classical Ayurveda, unrefined cold-pressed oils and cultured bilona ghee are classified not as inert calories, but as <em>Sneha</em> — sacred lubricating substances that penetrate the seven Dhatus (tissues) to support Ojas (vital radiance).
                    </p>

                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl border border-glass-border bg-background p-5">
                        <span className="font-mono text-xs uppercase tracking-wider text-gold-ink font-semibold">Dosha Profile:</span>
                        <p className="mt-1 font-display text-xl">{product.ayurveda.dosha}</p>
                      </div>

                      <div className="rounded-2xl border border-glass-border bg-background p-5">
                        <span className="font-mono text-xs uppercase tracking-wider text-gold-ink font-semibold">Sanskrit Properties (Gunas):</span>
                        <p className="mt-1 text-sm text-foreground/90">{product.ayurveda.property}</p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits card */}
                  <div className="glass-panel rounded-3xl p-8 space-y-4">
                    <h3 className="font-display text-2xl font-medium">Therapeutic Benefits</h3>
                    <ul className="space-y-4">
                      {product.ayurveda.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-ink font-mono text-xs font-bold">
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
        <section id="reviews" className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-12">
              {/* Summary left */}
              <div className="lg:col-span-4 space-y-4">
                <p className="eyebrow text-gold-ink">Harvest Feedback</p>
                <h2 className="font-display text-4xl font-medium tracking-tight">Customer Testimonials</h2>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-6xl font-medium">{product.rating.score}</span>
                  <div>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">Based on {product.rating.count} reviews</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Real feedback from home cooks, chefs, and Ayurvedic doctors who have introduced SRSTI pressings into their kitchens.
                </p>
              </div>

              {/* Review cards right */}
              <div className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex text-gold">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="size-3.5 fill-gold text-gold" />
                          ))}
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground">{rev.date}</span>
                      </div>
                      <h4 className="mt-3 font-display text-lg font-medium leading-snug">{rev.title}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{rev.comment}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] font-mono">
                      <span className="font-medium text-foreground">{rev.author} · {rev.location}</span>
                      {rev.verified && (
                        <span className="text-gold-ink font-semibold flex items-center gap-1">
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
        <section className="border-t border-border/60 bg-veil px-5 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="eyebrow text-gold-ink">Knowledge & Clarity</p>
              <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Frequently Asked Questions</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Everything you should know about artisanal cold-pressing, natural sedimentation, and pantry care.
              </p>
            </div>

            <div className="mt-12">
              <Accordion type="single" collapsible className="space-y-4">
                {product.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="glass-panel rounded-2xl border border-glass-border px-6 py-2 transition-all hover:border-gold/30"
                  >
                    <AccordionTrigger className="font-display text-xl font-medium text-left text-foreground hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground pt-1 pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* COMPLETE YOUR PANTRY (Related Products Carousel) */}
        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className="eyebrow text-gold-ink">Complementary Pressings</p>
                <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                  Complete Your Kitchen Pantry
                </h2>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-gold-ink hover:underline"
              >
                View all pressings <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="glass-panel group relative flex flex-col justify-between rounded-[2rem] p-6 transition-all duration-500 hover:shadow-gold hover:border-gold/40"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span>{rel.trace.batch}</span>
                      <span className="flex items-center gap-1 text-gold-ink">
                        <Flame className="size-3" /> {rel.smokePoint}
                      </span>
                    </div>

                    <Link
                      to="/products/$slug"
                      params={{ slug: rel.slug }}
                      className="mt-3 block group-hover:text-gold-ink transition-colors"
                    >
                      <h3 className="font-display text-2xl font-medium leading-tight">{rel.name}</h3>
                      <p className="font-serif text-xs italic text-muted-foreground">{rel.regionalName}</p>
                    </Link>
                  </div>

                  <Link
                    to="/products/$slug"
                    params={{ slug: rel.slug }}
                    className="my-6 flex h-48 items-center justify-center"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="max-h-full w-auto object-contain drop-shadow transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="border-t border-border/40 pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-display text-xl font-medium">{formatINR(rel.price)}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">{rel.volume}</p>
                    </div>

                    <Link
                      to="/products/$slug"
                      params={{ slug: rel.slug }}
                      className="rounded-full border border-foreground/20 px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground hover:border-gold hover:text-gold-ink transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
