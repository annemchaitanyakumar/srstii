import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { PRODUCTS, type Product } from "@/lib/srsti/products";
import { FadeUp } from "./motion";
import { ProductCard } from "./ProductCard";

// 5 Flagship signature pressings for the main landing page
const FEATURED_PRODUCTS: Product[] = [
  PRODUCTS.find((p) => p.id === "groundnut") || PRODUCTS[0],
  PRODUCTS.find((p) => p.id === "coconut") || PRODUCTS[1],
  PRODUCTS.find((p) => p.id === "yellow-mustard") || PRODUCTS[2],
  PRODUCTS.find((p) => p.id === "sesame") || PRODUCTS[4],
  PRODUCTS.find((p) => p.id === "ghee") || PRODUCTS[15],
];

export function Collection() {
  return (
    <section
      id="collection"
      aria-labelledby="collection-title"
      className="relative bg-veil px-5 pt-6 pb-4 md:px-10 md:pt-8 md:pb-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 md:mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">The Collection</p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-medium leading-[1.02] tracking-tight text-foreground"
            >
              The Signature Pressings
            </motion.h2>
            <span id="collection-title" className="sr-only">
              Collection
            </span>
          </div>
          <FadeUp delay={0.06}>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.14em] text-gold-ink hover:underline pb-1"
            >
              View all pressings & bulk tins <ArrowRight className="size-3.5" />
            </Link>
          </FadeUp>
        </div>

        {/* Primary 5-item signature minimal grid */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {FEATURED_PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
