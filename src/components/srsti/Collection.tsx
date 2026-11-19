import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { PRODUCTS, type Product } from "@/lib/srsti/products";
import { FadeUp } from "./motion";

// 5 Flagship signature pressings for the main landing page
const FEATURED_PRODUCTS: Product[] = [
  PRODUCTS.find((p) => p.id === "groundnut") || PRODUCTS[0],
  PRODUCTS.find((p) => p.id === "coconut") || PRODUCTS[1],
  PRODUCTS.find((p) => p.id === "yellow-mustard") || PRODUCTS[2],
  PRODUCTS.find((p) => p.id === "sesame") || PRODUCTS[4],
  PRODUCTS.find((p) => p.id === "ghee") || PRODUCTS[15],
];

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const reduce = useReducedMotion();
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 5) * 0.05 }}
      className="h-full"
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="group relative flex h-full min-h-[420px] sm:min-h-[440px] flex-col justify-between rounded-[2.2rem] bg-[#e2e6db] p-5 sm:p-6 transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(20,29,24,0.12)] cursor-pointer overflow-hidden border border-[#d3d8cb]/60"
      >
        {/* Top Header: Index & Diagonal Arrow */}
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-lg md:text-xl text-[#1a382b] tracking-wider">
            {formattedIndex}
          </span>
          <ArrowUpRight className="size-5 md:size-6 text-[#1a382b] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 stroke-[2.2]" />
        </div>

        {/* Center: Clean Product Image */}
        <div className="my-auto flex flex-1 items-center justify-center py-5">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="max-h-[200px] sm:max-h-[220px] w-auto object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-silk group-hover:scale-[1.06]"
          />
        </div>

        {/* Bottom Area: Name, Origin & Price */}
        <div className="mt-auto pt-2">
          <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight tracking-tight text-[#141d18] group-hover:text-[#1a382b] transition-colors line-clamp-1">
            {product.short || product.name}
          </h3>

          <div className="mt-2 flex items-baseline justify-between gap-2">
            <p className="text-xs sm:text-sm font-medium text-[#5a6b61] truncate">
              {product.trace?.region ? product.trace.region.split(",")[0] : "Single-Origin Farm"}
            </p>
            <p className="text-sm sm:text-base font-bold text-[#141d18] shrink-0 font-display">
              From Rs. {product.price}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

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
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold-ink hover:underline pb-1"
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
