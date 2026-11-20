import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { Product } from "@/lib/srsti/products";

export function ProductCard({
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
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 8) * 0.04 }}
      className="h-full font-display"
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="group relative flex h-full min-h-[250px] sm:min-h-[360px] md:min-h-[420px] flex-col justify-between rounded-2xl sm:rounded-[2.2rem] bg-[#e2e6db] p-3 sm:p-5 md:p-6 transition-all duration-400 ease-out hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(20,29,24,0.12)] cursor-pointer overflow-hidden border border-[#d3d8cb]/60 font-display"
      >
        {/* Top Header: Index & Diagonal Arrow */}
        <div className="flex items-center justify-between font-display">
          <span className="font-display font-bold text-xs sm:text-base md:text-xl text-[#1a382b] tracking-wider">
            {formattedIndex}
          </span>
          <ArrowUpRight className="size-3.5 sm:size-5 md:size-6 text-[#1a382b] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 stroke-[2.2]" />
        </div>

        {/* Center: Clean Product Image */}
        <div className="my-auto flex flex-1 items-center justify-center py-2 sm:py-4 md:py-5">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="max-h-[115px] sm:max-h-[175px] md:max-h-[220px] w-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-silk group-hover:scale-[1.06]"
          />
        </div>

        {/* Bottom Area: Name, Origin & Price */}
        <div className="mt-auto pt-1 sm:pt-2 font-display">
          <h3 className="font-display text-xs sm:text-base md:text-xl font-bold leading-tight tracking-tight text-[#141d18] group-hover:text-[#1a382b] transition-colors line-clamp-1">
            {product.short || product.name}
          </h3>

          <div className="mt-1 sm:mt-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2 font-display">
            <p className="font-display text-[10px] sm:text-xs md:text-sm font-medium text-[#5a6b61] truncate">
              {product.trace?.region ? product.trace.region.split(",")[0] : "Single-Origin Farm"}
            </p>
            <p className="font-display text-[11px] sm:text-xs md:text-base font-bold text-[#141d18] shrink-0">
              From Rs. {product.price}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
