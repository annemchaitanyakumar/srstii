import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Edit2,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/components/srsti/cart";
import { formatINR } from "@/lib/srsti/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — SRSTI Artisanal Oils" },
      {
        name: "description",
        content: "Complete your order with secure delivery.",
      },
    ],
  }),
  component: CheckoutPage,
});

type PaymentType = "upi" | "card" | "cod";
type CheckoutStep = "address" | "payment";

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, isFreeShipping, clearCart } = useCart();

  // Active Stepper: "address" or "payment"
  const [activeStep, setActiveStep] = useState<CheckoutStep>("address");

  // Mobile Order Summary Accordion toggle
  const [summaryOpen, setSummaryOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");

  const [paymentType, setPaymentType] = useState<PaymentType>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderId: string;
    name: string;
    total: number;
    itemsCount: number;
    address: string;
  } | null>(null);

  const shippingFee = isFreeShipping || items.length === 0 ? 0 : 99;
  const total = subtotal + shippingFee;
  const totalItemsCount = items.reduce((acc, i) => acc + i.quantity, 0);

  // Validation before proceeding from Address to Payment
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      toast.error("Incomplete Address", {
        description: "Please fill in all mandatory delivery fields to continue.",
      });
      return;
    }
    setActiveStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Final Order Submission
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentType === "upi" && upiId && !upiId.includes("@")) {
      toast.error("Invalid UPI ID", {
        description: "Please enter a valid VPA (e.g. name@okhdfcbank).",
      });
      return;
    }

    if (paymentType === "card" && cardNumber.replace(/\s+/g, "").length < 16) {
      toast.error("Incomplete Card Number", {
        description: "Please enter your 16-digit debit or credit card number.",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `SRSTI-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`;
      setOrderConfirmed({
        orderId,
        name: fullName,
        total,
        itemsCount: totalItemsCount,
        address: `${address}, ${city}, ${stateName} — ${pincode}`,
      });
      clearCart();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  // ORDER CONFIRMED VIEW
  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] text-[#1C1612] font-display antialiased flex flex-col justify-between py-12 px-5 sm:px-6">
        <div className="max-w-xl mx-auto w-full text-center my-auto">
          <div className="mx-auto mb-6 flex size-20 sm:size-24 items-center justify-center rounded-full bg-gradient-to-tr from-[#D49B3E]/20 to-[#FAF6EE] border border-[#D49B3E]/40 text-[#7A4B0C] shadow-lg">
            <CheckCircle2 className="size-10 sm:size-12 stroke-[1.4]" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal text-[#1C1612]">
            Thank You, {orderConfirmed.name}
          </h1>
          <p className="mt-2.5 text-base sm:text-lg text-[#6E5D4F]">
            Your artisanal harvest order has been placed.
          </p>

          <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-[28px] border border-[#1C1612]/15 bg-white/70 p-5 sm:p-7 text-left space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center text-sm sm:text-base border-b border-[#1C1612]/10 pb-3">
              <span className="text-[#6E5D4F]">Order Reference</span>
              <span className="font-semibold text-base sm:text-lg text-[#1C1612]">{orderConfirmed.orderId}</span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base border-b border-[#1C1612]/10 pb-3">
              <span className="text-[#6E5D4F]">Items Ordered</span>
              <span className="font-medium text-[#1C1612]">{orderConfirmed.itemsCount} bottles</span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base border-b border-[#1C1612]/10 pb-3">
              <span className="text-[#6E5D4F]">Total Amount Paid</span>
              <span className="font-semibold text-base sm:text-lg text-[#1C1612]">{formatINR(orderConfirmed.total)}</span>
            </div>
            <div className="text-xs sm:text-sm text-[#6E5D4F] pt-1">
              <p className="font-medium text-[#1C1612] mb-0.5">Delivery Address:</p>
              <p>{orderConfirmed.address}</p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-[#1C1612] px-7 py-3.5 text-base font-medium text-[#FAF6EE] hover:bg-[#C88A2C] hover:text-white transition-all shadow-md"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CHECKOUT REDIRECT
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] text-[#1C1612] font-display flex flex-col items-center justify-center p-6 text-center">
        <div className="size-20 rounded-full bg-white shadow-xs border border-[#1C1612]/5 flex items-center justify-center mb-4 text-[#6E5D4F]">
          <ShoppingBag className="size-9 stroke-[1.2]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-normal">Your basket is empty</h1>
        <p className="mt-2 text-sm sm:text-base text-[#6E5D4F]">Please select your pressings before proceeding to checkout.</p>
        <Link
          to="/products"
          className="mt-6 rounded-full bg-[#1C1612] px-7 py-3 text-sm sm:text-base font-medium text-[#FAF6EE] hover:bg-[#C88A2C] hover:text-white transition-all"
        >
          Explore Pressing Room
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1C1612] font-display antialiased selection:bg-[#C88A2C]/20 selection:text-[#7A4B0C]">
      {/* Clean Minimalist Header */}
      <header className="border-b border-[#1C1612]/10 bg-white/70 backdrop-blur-md py-3.5 sm:py-4 px-4 sm:px-6 md:px-12 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#6E5D4F] hover:text-[#1C1612] transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Basket</span>
          </Link>

          <Link to="/" className="text-xl sm:text-2xl font-medium tracking-tight text-[#1C1612]">
            SRSTI
          </Link>

          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#6E5D4F] font-mono uppercase tracking-wider">
            <Lock className="size-3 text-[#7A4B0C]" />
            <span className="hidden xs:inline">Secure</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-5 sm:py-8 md:py-12">
        {/* =========================================================================
            MOBILE ORDER SUMMARY ACCORDION BAR (Visible only on < lg)
           ========================================================================= */}
        <div className="lg:hidden mb-5 rounded-2xl border border-[#1C1612]/12 bg-white/80 backdrop-blur-md overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => setSummaryOpen(!summaryOpen)}
            className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-black/[0.02]"
            aria-expanded={summaryOpen}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-4 text-[#7A4B0C]" />
              <span className="text-xs sm:text-sm font-medium text-[#1C1612]">
                {summaryOpen ? "Hide order summary" : `Order summary (${totalItemsCount} ${totalItemsCount === 1 ? "bottle" : "bottles"})`}
              </span>
              <ChevronDown
                className={cn(
                  "size-3.5 text-[#6E5D4F] transition-transform duration-300",
                  summaryOpen && "rotate-180"
                )}
              />
            </div>
            <span className="font-semibold text-sm sm:text-base text-[#1C1612]">
              {formatINR(total)}
            </span>
          </button>

          <AnimatePresence>
            {summaryOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-[#1C1612]/10 bg-[#FAF6EE]/60 px-4 py-3"
              >
                {/* Items List */}
                <ul className="divide-y divide-[#1C1612]/10 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <li key={item.id} className="py-2.5 flex items-center gap-3">
                      <div className="size-11 shrink-0 rounded-xl bg-white p-1 border border-[#1C1612]/10 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-[#1C1612] truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#6E5D4F]">
                          {item.volume} · Qty {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#1C1612]">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Price Breakdown */}
                <div className="pt-3 mt-1 border-t border-[#1C1612]/10 space-y-1.5 text-xs text-[#6E5D4F]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1C1612]">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-medium text-[#1C1612]">
                      {isFreeShipping ? (
                        <span className="text-[#7A4B0C] font-semibold">FREE</span>
                      ) : (
                        formatINR(shippingFee)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#1C1612] pt-1.5 border-t border-[#1C1612]/10">
                    <span>Total Amount</span>
                    <span>{formatINR(total)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14 items-start relative">
          {/* LEFT COLUMN: Stepper + Active Step Form (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Stepper Progress Ribbon */}
            <div className="flex items-center justify-between pb-1 sm:pb-3">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Step 1 Pill */}
                <button
                  type="button"
                  onClick={() => setActiveStep("address")}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all cursor-pointer",
                    activeStep === "address"
                      ? "bg-[#1C1612] text-[#FAF6EE] shadow-xs"
                      : "bg-white/80 text-[#6E5D4F] border border-[#1C1612]/15 hover:text-[#1C1612]"
                  )}
                >
                  <span
                    className={cn(
                      "size-4 sm:size-5 rounded-full flex items-center justify-center text-[10px] sm:text-xs",
                      activeStep === "payment" ? "bg-[#7A4B0C] text-white" : "bg-white/20"
                    )}
                  >
                    {activeStep === "payment" ? <Check className="size-2.5 stroke-[2.5]" /> : "1"}
                  </span>
                  <span>1. Address</span>
                </button>

                {/* Connecting Line */}
                <div
                  className={cn(
                    "h-[1.5px] w-6 sm:w-10 transition-colors",
                    activeStep === "payment" ? "bg-[#7A4B0C]" : "bg-[#1C1612]/15"
                  )}
                />

                {/* Step 2 Pill */}
                <button
                  type="button"
                  onClick={() => {
                    if (fullName && phone && address && city && pincode) {
                      setActiveStep("payment");
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all",
                    activeStep === "payment"
                      ? "bg-[#1C1612] text-[#FAF6EE] shadow-xs cursor-pointer"
                      : "bg-white/40 text-[#6E5D4F]/60 border border-[#1C1612]/10"
                  )}
                >
                  <span className="size-4 sm:size-5 rounded-full flex items-center justify-center text-[10px] sm:text-xs bg-white/20">
                    2
                  </span>
                  <span>2. Payment</span>
                </button>
              </div>

              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] hidden sm:inline">
                Step {activeStep === "address" ? "1 of 2" : "2 of 2"}
              </span>
            </div>

            {/* ======================================================== */}
            {/* STEP 1: DELIVERY ADDRESS FORM */}
            {/* ======================================================== */}
            {activeStep === "address" ? (
              <form onSubmit={handleProceedToPayment} className="space-y-6 animate-in fade-in duration-300">
                <div className="rounded-2xl sm:rounded-[28px] border border-[#1C1612]/15 bg-white/75 p-5 sm:p-8 shadow-xs">
                  <div className="border-b border-[#1C1612]/10 pb-3 mb-5">
                    <h2 className="text-xl sm:text-2xl font-normal text-[#1C1612]">
                      Delivery Address
                    </h2>
                    <p className="text-xs text-[#6E5D4F] mt-0.5">
                      Where should we dispatch your fresh batch?
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#6E5D4F] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Radhika Sharma"
                        className="w-full rounded-xl sm:rounded-2xl border border-[#1C1612]/15 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                      />
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#6E5D4F] mb-1">
                          Phone Number (for delivery updates) *
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 font-mono text-xs sm:text-sm text-[#6E5D4F] pointer-events-none select-none">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            autoComplete="tel"
                            inputMode="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                            placeholder="98765 43210"
                            className="w-full rounded-xl sm:rounded-2xl border border-[#1C1612]/15 bg-white pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#6E5D4F] mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="radhika@example.com"
                          className="w-full rounded-xl sm:rounded-2xl border border-[#1C1612]/15 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                        />
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-[#6E5D4F] mb-1">
                        Street Address / Flat / Floor *
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="street-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House/Flat no., Apartment, Street name"
                        className="w-full rounded-xl sm:rounded-2xl border border-[#1C1612]/15 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                      />
                    </div>

                    {/* City, State, PIN */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#6E5D4F] mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          autoComplete="address-level2"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Bengaluru"
                          className="w-full rounded-xl sm:rounded-2xl border border-[#1C1612]/15 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-[#6E5D4F] mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          autoComplete="address-level1"
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          placeholder="Karnataka"
                          className="w-full rounded-xl sm:rounded-2xl border border-[#1C1612]/15 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs sm:text-sm font-medium text-[#6E5D4F] mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          autoComplete="postal-code"
                          inputMode="numeric"
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                          placeholder="560001"
                          className="w-full rounded-xl sm:rounded-2xl border border-[#1C1612]/15 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Proceed to Payment CTA */}
                  <div className="mt-6 pt-5 border-t border-[#1C1612]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Link
                      to="/cart"
                      className="text-xs sm:text-sm text-[#6E5D4F] hover:text-[#1C1612] transition-colors order-2 sm:order-1"
                    >
                      ← Return to Basket
                    </Link>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1C1612] hover:bg-[#C88A2C] px-8 py-3.5 text-sm sm:text-base font-semibold text-[#FAF6EE] hover:text-white transition-all shadow-md cursor-pointer order-1 sm:order-2"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* ======================================================== */
              /* STEP 2: PAYMENT & CONFIRMATION */
              /* ======================================================== */
              <form onSubmit={handleFinalSubmit} className="space-y-5 animate-in fade-in duration-300">
                {/* Collapsed Address Review Bar with quick "Edit" button */}
                <div className="rounded-2xl border border-[#1C1612]/15 bg-white/70 p-4 sm:p-5 flex items-center justify-between">
                  <div className="text-xs sm:text-sm">
                    <p className="font-medium text-[#1C1612] flex items-center gap-2">
                      <Check className="size-3.5 text-[#7A4B0C] shrink-0" />
                      <span>Delivery to: <strong className="font-semibold">{fullName}</strong> (+91 {phone})</span>
                    </p>
                    <p className="text-[#6E5D4F] mt-0.5 pl-5.5 text-xs">
                      {address}, {city}, {stateName} — {pincode}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep("address")}
                    className="inline-flex items-center gap-1 text-xs text-[#7A4B0C] font-semibold hover:underline cursor-pointer px-2.5 py-1 rounded-full hover:bg-black/5 transition-colors shrink-0"
                  >
                    <Edit2 className="size-3" />
                    <span>Edit</span>
                  </button>
                </div>

                {/* Payment Selection Box */}
                <div className="rounded-2xl sm:rounded-[28px] border border-[#1C1612]/15 bg-white/75 p-5 sm:p-8 shadow-xs">
                  <div className="border-b border-[#1C1612]/10 pb-3 mb-5">
                    <h2 className="text-xl sm:text-2xl font-normal text-[#1C1612]">
                      Payment Method
                    </h2>
                    <p className="text-xs text-[#6E5D4F] mt-0.5">
                      Select your preferred payment mode
                    </p>
                  </div>

                  {/* Payment Choices */}
                  <div className="space-y-3">
                    {/* Choice 1: UPI */}
                    <label
                      className={cn(
                        "flex flex-col rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all",
                        paymentType === "upi"
                          ? "border-[#1C1612] bg-white ring-1 ring-[#1C1612] shadow-xs"
                          : "border-[#1C1612]/15 bg-white/40 hover:bg-white"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value="upi"
                            checked={paymentType === "upi"}
                            onChange={() => setPaymentType("upi")}
                            className="accent-[#1C1612] size-4"
                          />
                          <div>
                            <span className="text-sm sm:text-base font-semibold text-[#1C1612] block">
                              UPI / Instant QR
                            </span>
                            <span className="text-[11px] sm:text-xs text-[#6E5D4F]">
                              Google Pay · PhonePe · Paytm · BHIM
                            </span>
                          </div>
                        </div>
                        <Smartphone className="size-4 sm:size-5 text-[#6E5D4F]" />
                      </div>

                      {paymentType === "upi" && (
                        <div className="mt-3.5 pt-3.5 border-t border-[#1C1612]/10 animate-in fade-in">
                          <label className="block text-xs font-medium text-[#6E5D4F] mb-1">
                            Enter UPI ID / VPA
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okhdfcbank"
                            className="w-full rounded-xl border border-[#1C1612]/20 bg-white px-3.5 py-2.5 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] font-mono"
                          />
                          <p className="text-[11px] text-[#6E5D4F] mt-1">
                            A secure payment authorization request will be sent to your UPI app.
                          </p>
                        </div>
                      )}
                    </label>

                    {/* Choice 2: Cards */}
                    <label
                      className={cn(
                        "flex flex-col rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all",
                        paymentType === "card"
                          ? "border-[#1C1612] bg-white ring-1 ring-[#1C1612] shadow-xs"
                          : "border-[#1C1612]/15 bg-white/40 hover:bg-white"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentType === "card"}
                            onChange={() => setPaymentType("card")}
                            className="accent-[#1C1612] size-4"
                          />
                          <div>
                            <span className="text-sm sm:text-base font-semibold text-[#1C1612] block">
                              Credit or Debit Card
                            </span>
                            <span className="text-[11px] sm:text-xs text-[#6E5D4F]">
                              Visa · Mastercard · RuPay · Amex
                            </span>
                          </div>
                        </div>
                        <CreditCard className="size-4 sm:size-5 text-[#6E5D4F]" />
                      </div>

                      {paymentType === "card" && (
                        <div className="mt-3.5 pt-3.5 border-t border-[#1C1612]/10 space-y-3 animate-in fade-in">
                          <div>
                            <label className="block text-xs font-medium text-[#6E5D4F] mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={19}
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9\s]/g, ""))}
                              placeholder="4111 2222 3333 4444"
                              className="w-full rounded-xl border border-[#1C1612]/20 bg-white px-3.5 py-2.5 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] font-mono"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-[#6E5D4F] mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                maxLength={5}
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="MM / YY"
                                className="w-full rounded-xl border border-[#1C1612]/20 bg-white px-3.5 py-2.5 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#6E5D4F] mb-1">
                                CVV
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                inputMode="numeric"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                placeholder="123"
                                className="w-full rounded-xl border border-[#1C1612]/20 bg-white px-3.5 py-2.5 text-sm sm:text-base text-[#1C1612] outline-none focus:border-[#C88A2C] font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </label>

                    {/* Choice 3: Cash on Delivery */}
                    <label
                      className={cn(
                        "flex items-center justify-between rounded-2xl border p-4 sm:p-5 cursor-pointer transition-all",
                        paymentType === "cod"
                          ? "border-[#1C1612] bg-white ring-1 ring-[#1C1612] shadow-xs"
                          : "border-[#1C1612]/15 bg-white/40 hover:bg-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentType === "cod"}
                          onChange={() => setPaymentType("cod")}
                          className="accent-[#1C1612] size-4"
                        />
                        <div>
                          <span className="text-sm sm:text-base font-semibold text-[#1C1612] block">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-[11px] sm:text-xs text-[#6E5D4F]">
                            Pay via Cash or UPI at your doorstep upon arrival
                          </span>
                        </div>
                      </div>
                      <Wallet className="size-4 sm:size-5 text-[#6E5D4F]" />
                    </label>
                  </div>

                  {/* Submit Action */}
                  <div className="mt-6 pt-5 border-t border-[#1C1612]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveStep("address")}
                      className="text-xs sm:text-sm text-[#6E5D4F] hover:text-[#1C1612] transition-colors order-2 sm:order-1 cursor-pointer"
                    >
                      ← Back to Address
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto rounded-full bg-[#1C1612] hover:bg-[#C88A2C] px-9 py-3.5 text-center text-sm sm:text-base font-semibold text-[#FAF6EE] hover:text-white shadow-md active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer order-1 sm:order-2 flex items-center justify-center gap-2"
                    >
                      <Lock className="size-3.5" />
                      <span>{isSubmitting ? "Processing..." : `Place Order · ${formatINR(total)}`}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Desktop Sticky Order Summary (Visible only on lg+)
             ========================================================================= */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24 self-start">
            <div className="rounded-[28px] bg-[#14100D] p-7 sm:p-8 text-[#FAF6EE] shadow-2xl border border-white/10">
              <div className="border-b border-white/10 pb-4 mb-4 flex items-baseline justify-between">
                <h2 className="text-xl font-medium text-white tracking-tight">
                  Your Selection
                </h2>
                <span className="text-xs text-[#FAF6EE]/60 font-mono">
                  {totalItemsCount} {totalItemsCount === 1 ? "bottle" : "bottles"}
                </span>
              </div>

              {/* Items List */}
              <ul className="divide-y divide-white/10 my-4 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <li key={item.id} className="py-3 flex items-center gap-3.5">
                    <div className="size-14 shrink-0 rounded-2xl bg-white/90 p-1.5 flex items-center justify-center shadow-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#FAF6EE]/60 mt-0.5">
                        {item.volume} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Cost Breakdown */}
              <div className="border-t border-white/10 pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-[#FAF6EE]/75">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatINR(subtotal)}</span>
                </div>

                <div className="flex justify-between text-[#FAF6EE]/75">
                  <span>Delivery</span>
                  <span className="text-white font-medium">
                    {isFreeShipping ? (
                      <span className="text-[#C88A2C]">FREE</span>
                    ) : (
                      formatINR(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between border-t border-white/10 pt-3 text-xl font-semibold text-white">
                  <span>Total Amount</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              {/* Reassurance */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-white/60">
                <ShieldCheck className="size-4 text-[#C88A2C] shrink-0" />
                <span>NABL third-party batch tested · Unopened return guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
