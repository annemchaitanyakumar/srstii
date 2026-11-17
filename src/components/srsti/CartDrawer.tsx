import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Package, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatINR } from "@/lib/srsti/products";
import { useCart } from "./cart";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    freeShippingThreshold,
    remainingForFreeShipping,
    isFreeShipping,
  } = useCart();

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-l border-glass-border bg-background p-0 sm:max-w-md md:max-w-lg"
      >
        {/* Header */}
        <SheetHeader className="border-b border-border/60 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-gold/15 text-gold-ink">
                <ShoppingBag className="size-4" />
              </span>
              <div>
                <SheetTitle className="font-display text-2xl font-medium tracking-tight">
                  Your Harvest Basket
                </SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  {count === 0 ? "Empty basket" : `${count} ${count === 1 ? "bottle" : "bottles"} reserved from current pressing`}
                </SheetDescription>
              </div>
            </div>
          </div>

          {/* Free Shipping Milestone Progress Bar */}
          <div className="mt-4 rounded-xl border border-glass-border bg-foreground/[0.03] p-3 text-xs">
            <div className="flex items-center justify-between font-mono">
              <span className="flex items-center gap-1.5 text-foreground/85">
                <Truck className="size-3.5 text-gold-ink" />
                {isFreeShipping ? (
                  <span className="font-medium text-gold-ink">You unlocked Complimentary Farm Shipping!</span>
                ) : (
                  <span>
                    Add <strong className="text-foreground">{formatINR(remainingForFreeShipping)}</strong> for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-muted-foreground">{progressPercent}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-full rounded-full bg-gold-gradient transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </SheetHeader>

        {/* Body / Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid size-16 place-items-center rounded-full border border-border bg-foreground/5 text-muted-foreground">
                <Package className="size-8" strokeWidth={1.3} />
              </div>
              <h3 className="mt-4 font-display text-2xl font-medium">Your basket is waiting</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Explore our cold-pressed, wood-ghani oils and pure Vedic A2 ghee, traceable to single-origin farms.
              </p>
              <Link
                to="/products"
                onClick={() => setIsCartOpen(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-gold hover:text-accent-foreground"
              >
                Browse The Pressing Room <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-4 divide-y divide-border/60">
              {items.map((item) => (
                <li key={item.id} className="pt-4 first:pt-0">
                  <div className="flex gap-4">
                    {/* Bottle thumbnail */}
                    <div className="relative flex size-20 shrink-0 items-center justify-center rounded-2xl border border-glass-border bg-linen p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain drop-shadow"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display text-lg font-medium leading-tight text-foreground">
                            {item.name}
                          </h4>
                          <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
                            <span className="rounded bg-foreground/5 px-2 py-0.5 font-medium text-foreground/80">
                              {item.volume}
                            </span>
                            <span>·</span>
                            <span>{item.batch}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      {/* Stepper + Subtotal price */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-border bg-background px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-6 text-center font-mono text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>

                        <p className="font-display text-lg font-medium text-foreground">
                          {formatINR(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border/60 bg-foreground/[0.02] px-6 py-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono text-foreground">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Farm Shipping</span>
                <span className="font-mono text-foreground">
                  {isFreeShipping ? (
                    <span className="font-medium text-gold-ink">FREE</span>
                  ) : (
                    formatINR(99)
                  )}
                </span>
              </div>
              <div className="flex justify-between border-t border-border/40 pt-2 font-display text-xl font-medium text-foreground">
                <span>Estimated Total</span>
                <span>{formatINR(subtotal + (isFreeShipping ? 0 : 99))}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                window.alert(
                  "Thank you for exploring SRSTI! Checkout gateway integration will connect to your payment processor.",
                );
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-center font-medium text-primary-foreground transition-all duration-300 hover:bg-gold hover:text-accent-foreground"
            >
              Proceed to Secure Checkout <ArrowRight className="size-4" />
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-center text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-gold-ink" />
              <span>Single-Origin · Plastic-Neutral Packaging · Lab Certified</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
