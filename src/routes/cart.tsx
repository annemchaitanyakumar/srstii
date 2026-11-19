import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/components/srsti/cart";
import { Footer } from "@/components/srsti/Footer";
import { Header } from "@/components/srsti/Header";
import { formatINR, PRODUCTS } from "@/lib/srsti/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — SRSTI Artisanal Oils" },
      {
        name: "description",
        content: "Review your selected cold-pressed oils and ghee.",
      },
    ],
  }),
  component: CartPage,
});

export function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    count,
    subtotal,
    isFreeShipping,
    updateQuantity,
    removeItem,
    clearCart,
    addItem,
  } = useCart();

  const [promoOpen, setPromoOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState<{ code: string; percent: number } | null>(null);

  const discountAmount = discount ? Math.round((subtotal * discount.percent) / 100) : 0;
  const shippingFee = isFreeShipping || items.length === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === "HARVEST10" || clean === "SRSTI10") {
      setDiscount({ code: clean, percent: 10 });
      toast.success("Voucher applied: 10% harvest discount");
      setCouponCode("");
    } else {
      toast.error("Invalid voucher code", {
        description: "Try HARVEST10 for 10% off single-origin pressings.",
      });
    }
  };

  // Curated popular pressings for the bottom circular row
  const popularProducts = PRODUCTS.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1C1612] font-display antialiased selection:bg-[#C88A2C]/20 selection:text-[#7A4B0C]">
      <Header />

      <main id="main" className="pt-28 md:pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {/* Main 2-Column Section */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
            {/* LEFT COLUMN: Shopping Cart items (7 cols) */}
            <div className="lg:col-span-7">
              {/* Heading */}
              <div className="border-b border-[#1C1612]/10 pb-5 mb-6">
                <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1612]">
                  Shopping Cart ({count} {count === 1 ? "item" : "items"})
                </h1>
              </div>

              {/* Items List or Empty State */}
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-white shadow-xs border border-[#1C1612]/5 text-[#6E5D4F]">
                    <ShoppingBag className="size-9 stroke-[1.2]" />
                  </div>
                  <h2 className="text-2xl font-normal text-[#1C1612]">
                    Your basket is empty
                  </h2>
                  <p className="mt-2 text-base text-[#6E5D4F]">
                    Explore our single-origin, wood-pressed pressings below.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#1C1612]/10">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="py-7 flex items-center justify-between gap-5 transition-colors"
                    >
                      {/* Left: Circular Pedestal Thumbnail */}
                      <Link
                        to="/products/$slug"
                        params={{ slug: item.productId }}
                        className="size-24 sm:size-28 shrink-0 rounded-full bg-white shadow-xs border border-[#1C1612]/5 p-3 flex items-center justify-center transition-transform hover:scale-105"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain drop-shadow"
                        />
                      </Link>

                      {/* Middle: Title, specs, price */}
                      <div className="flex-1 min-w-0 pl-1 sm:pl-2">
                        <Link
                          to="/products/$slug"
                          params={{ slug: item.productId }}
                          className="text-lg sm:text-xl font-medium leading-snug text-[#1C1612] hover:text-[#C88A2C] transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-sm text-[#6E5D4F]">
                          Volume: {item.volume}
                        </p>
                        <p className="text-sm text-[#6E5D4F]">
                          Batch: {item.batch}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[#1C1612]">
                          {formatINR(item.price)}
                        </p>
                      </div>

                      {/* Right: Trash Icon & Stepper */}
                      <div className="flex flex-col items-end justify-between self-stretch shrink-0 py-1">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#8C7A6B] hover:text-[#dc2626] transition-colors p-1"
                        >
                          <Trash2 className="size-4 stroke-[1.4]" />
                        </button>

                        <div className="flex items-center gap-3 text-base text-[#1C1612] mt-4">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="size-6 flex items-center justify-center rounded-full hover:bg-black/5 text-[#6E5D4F] transition-colors"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-4 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="size-6 flex items-center justify-center rounded-full hover:bg-black/5 text-[#6E5D4F] transition-colors"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Clear Basket Bar */}
                  <div className="pt-4 flex justify-between items-center text-sm text-[#6E5D4F]">
                    <Link
                      to="/products"
                      className="hover:text-[#1C1612] underline underline-offset-4 transition-colors"
                    >
                      ← Back to Pressing Room
                    </Link>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="hover:text-[#dc2626] transition-colors"
                    >
                      Clear basket
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: High-Contrast Dark Order Summary (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 rounded-[28px] bg-[#14100D] p-7 sm:p-9 text-[#FAF6EE] shadow-2xl border border-[#D49B3E]/15">
                <h2 className="text-2xl font-normal text-white tracking-tight">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-3.5 text-base border-b border-white/10 pb-6">
                  <div className="flex justify-between text-[#FAF6EE]/75">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">{formatINR(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-[#FAF6EE]/75">
                    <span>Delivery</span>
                    <span className="text-white font-medium">
                      {isFreeShipping ? (
                        <span className="text-[#F3C45E]">FREE</span>
                      ) : (
                        formatINR(shippingFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#FAF6EE]/75">
                    <span>Discount</span>
                    <span className="text-[#F3C45E] font-medium">
                      {discount ? `- ${formatINR(discountAmount)}` : "₹00.00"}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-6 flex items-baseline justify-between text-2xl font-semibold text-white">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>

                {/* Primary Radiant Gold Action Button */}
                <div className="mt-7">
                  <button
                    type="button"
                    disabled={items.length === 0}
                    onClick={() => navigate({ to: "/checkout" })}
                    className="w-full rounded-full bg-gradient-to-r from-[#D49B3E] via-[#F3C45E] to-[#E5A93C] py-4 text-center text-lg font-semibold text-[#14100D] shadow-lg transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    Checkout
                  </button>
                </div>

                {/* Promo Code Drawer */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  {!promoOpen && !discount ? (
                    <button
                      type="button"
                      onClick={() => setPromoOpen(true)}
                      className="text-xs text-[#FAF6EE]/60 hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      Have a promo code?
                    </button>
                  ) : discount ? (
                    <div className="flex items-center justify-between text-xs text-[#F3C45E]">
                      <span>Promo code <strong>{discount.code}</strong> applied</span>
                      <button
                        type="button"
                        onClick={() => setDiscount(null)}
                        className="underline hover:text-white cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCode} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. DISCOUNT10"
                        className="flex-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white uppercase outline-none focus:border-[#F3C45E]"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs text-white hover:bg-white/25 cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: "Most Cherished Pressings" (Most Popular Circular Pedestals) */}
          <div className="mt-24 border-t border-[#1C1612]/10 pt-12">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-normal text-[#1C1612]">
                Most Cherished Pressings
              </h2>
              <Link
                to="/products"
                className="text-base text-[#6E5D4F] hover:text-[#1C1612] transition-colors underline underline-offset-4"
              >
                See all
              </Link>
            </div>

            {/* Circular Pedestal Grid / Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
              {popularProducts.map((prod) => (
                <div key={prod.id} className="flex flex-col items-center text-center group">
                  {/* Circular Pedestal */}
                  <Link
                    to="/products/$slug"
                    params={{ slug: prod.id }}
                    className="relative size-36 sm:size-44 md:size-48 rounded-full bg-white shadow-xs border border-[#1C1612]/5 p-4 flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:scale-105"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain drop-shadow"
                    />
                  </Link>

                  {/* Product Title */}
                  <Link
                    to="/products/$slug"
                    params={{ slug: prod.id }}
                    className="mt-4 text-base font-medium text-[#1C1612] hover:text-[#C88A2C] transition-colors line-clamp-1"
                  >
                    {prod.name}
                  </Link>

                  {/* Price */}
                  <p className="mt-1 text-base text-[#6E5D4F]">
                    {formatINR(prod.price)}
                  </p>

                  {/* Quick Add Action */}
                  <button
                    type="button"
                    onClick={() => addItem(prod, prod.volume, prod.price, 1)}
                    className="mt-2 text-xs text-[#C88A2C] hover:text-[#1C1612] font-semibold transition-colors underline underline-offset-4"
                  >
                    + Add to Basket
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
