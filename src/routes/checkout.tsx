import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CreditCard,
  Edit2,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/components/srsti/cart";
import { formatINR } from "@/lib/srsti/products";

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

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, isFreeShipping, clearCart } = useCart();

  // Active Stepper: "address" or "payment"
  const [activeStep, setActiveStep] = useState<CheckoutStep>("address");

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
      <div className="min-h-screen bg-[#FAF6EE] text-[#1C1612] font-display antialiased flex flex-col justify-between py-16 px-6">
        <div className="max-w-xl mx-auto w-full text-center my-auto">
          <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-gradient-to-tr from-[#D49B3E]/20 to-[#FAF6EE] border border-[#D49B3E]/40 text-[#7A4B0C] shadow-lg">
            <CheckCircle2 className="size-12 stroke-[1.4]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-normal text-[#1C1612]">
            Thank You, {orderConfirmed.name}
          </h1>
          <p className="mt-3 text-lg text-[#6E5D4F]">
            Your order has been placed successfully.
          </p>

          <div className="mt-8 rounded-[28px] border border-[#1C1612]/15 bg-white/70 p-7 text-left space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center text-base border-b border-[#1C1612]/10 pb-3">
              <span className="text-[#6E5D4F]">Order Reference</span>
              <span className="font-semibold text-lg text-[#1C1612]">{orderConfirmed.orderId}</span>
            </div>
            <div className="flex justify-between items-center text-base border-b border-[#1C1612]/10 pb-3">
              <span className="text-[#6E5D4F]">Items Ordered</span>
              <span className="font-medium text-[#1C1612]">{orderConfirmed.itemsCount} bottles</span>
            </div>
            <div className="flex justify-between items-center text-base border-b border-[#1C1612]/10 pb-3">
              <span className="text-[#6E5D4F]">Total Amount Paid</span>
              <span className="font-semibold text-lg text-[#1C1612]">{formatINR(orderConfirmed.total)}</span>
            </div>
            <div className="text-sm text-[#6E5D4F] pt-1">
              <p className="font-medium text-[#1C1612] mb-0.5">Delivery Address:</p>
              <p>{orderConfirmed.address}</p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-[#1C1612] px-8 py-3.5 text-lg font-medium text-[#FAF6EE] hover:bg-[#C88A2C] hover:text-white transition-all shadow-md"
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
        <h1 className="text-3xl font-normal">Your basket is empty</h1>
        <p className="mt-2 text-base text-[#6E5D4F]">Please select your pressings before proceeding to checkout.</p>
        <Link
          to="/products"
          className="mt-6 rounded-full bg-[#1C1612] px-7 py-3 text-base font-medium text-[#FAF6EE] hover:bg-[#C88A2C] hover:text-white transition-all"
        >
          Explore Pressing Room
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1C1612] font-display antialiased selection:bg-[#C88A2C]/20 selection:text-[#7A4B0C]">
      {/* Editorial Header */}
      <header className="border-b border-[#1C1612]/10 bg-white/50 backdrop-blur-md py-5 px-6 md:px-12 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-base text-[#6E5D4F] hover:text-[#1C1612] transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Return to Basket</span>
          </Link>

          <Link to="/" className="text-2xl font-medium tracking-tight text-[#1C1612]">
            SRSTI
          </Link>

          {/* Invisible spacer to balance the back link */}
          <div className="w-28 hidden sm:block pointer-events-none" aria-hidden="true" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
        {/* 2-Column Checkout Layout */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start relative">
          {/* LEFT COLUMN: Stepper + Section Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Stepper Progress Ribbon */}
            <div className="flex items-center gap-4 pb-2">
              {/* Step 1 Pill */}
              <button
                type="button"
                onClick={() => setActiveStep("address")}
                className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                  activeStep === "address"
                    ? "bg-[#1C1612] text-[#FAF6EE] shadow-sm"
                    : "bg-white/80 text-[#6E5D4F] border border-[#1C1612]/15 hover:text-[#1C1612]"
                }`}
              >
                <span className={`size-5 rounded-full flex items-center justify-center text-xs ${
                  activeStep === "payment" ? "bg-[#C88A2C] text-white" : "bg-white/20"
                }`}>
                  {activeStep === "payment" ? <Check className="size-3 stroke-[2.5]" /> : "1"}
                </span>
                <span>1. Delivery Address</span>
              </button>

              {/* Connecting Line */}
              <div className={`h-[1.5px] w-8 sm:w-12 transition-colors ${
                activeStep === "payment" ? "bg-[#C88A2C]" : "bg-[#1C1612]/15"
              }`} />

              {/* Step 2 Pill */}
              <button
                type="button"
                onClick={() => {
                  if (fullName && phone && address && city && pincode) {
                    setActiveStep("payment");
                  }
                }}
                className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeStep === "payment"
                    ? "bg-[#1C1612] text-[#FAF6EE] shadow-sm cursor-pointer"
                    : "bg-white/40 text-[#6E5D4F]/60 border border-[#1C1612]/10 cursor-not-allowed"
                }`}
              >
                <span className="size-5 rounded-full flex items-center justify-center text-xs bg-white/20">
                  2
                </span>
                <span>2. Payment</span>
              </button>
            </div>

            {/* ======================================================== */}
            {/* SECTION 1: DELIVERY ADDRESS */}
            {/* ======================================================== */}
            {activeStep === "address" ? (
              <form onSubmit={handleProceedToPayment} className="space-y-8 animate-in fade-in duration-300">
                <div className="rounded-[28px] border border-[#1C1612]/15 bg-white/70 p-7 sm:p-9 shadow-sm">
                  <div className="border-b border-[#1C1612]/10 pb-4 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-normal text-[#1C1612]">
                      Delivery Address
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-[#6E5D4F] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Radhika Sharma"
                        className="w-full rounded-2xl border border-[#1C1612]/20 bg-white px-4 py-3 text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                      />
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#6E5D4F] mb-1.5">
                          Phone Number (for courier SMS) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-2xl border border-[#1C1612]/20 bg-white px-4 py-3 text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6E5D4F] mb-1.5">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="radhika@example.com"
                          className="w-full rounded-2xl border border-[#1C1612]/20 bg-white px-4 py-3 text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                        />
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <label className="block text-sm font-medium text-[#6E5D4F] mb-1.5">
                        Street Address / Flat / Floor *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House / Apartment no., Street, Landmark"
                        className="w-full rounded-2xl border border-[#1C1612]/20 bg-white px-4 py-3 text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                      />
                    </div>

                    {/* City, State, PIN */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#6E5D4F] mb-1.5">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Bengaluru"
                          className="w-full rounded-2xl border border-[#1C1612]/20 bg-white px-4 py-3 text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6E5D4F] mb-1.5">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          placeholder="Karnataka"
                          className="w-full rounded-2xl border border-[#1C1612]/20 bg-white px-4 py-3 text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6E5D4F] mb-1.5">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="560001"
                          className="w-full rounded-2xl border border-[#1C1612]/20 bg-white px-4 py-3 text-base text-[#1C1612] outline-none focus:border-[#C88A2C] focus:ring-1 focus:ring-[#C88A2C] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Proceed to Payment CTA */}
                  <div className="mt-8 pt-6 border-t border-[#1C1612]/10 flex items-center justify-between">
                    <Link
                      to="/cart"
                      className="text-sm text-[#6E5D4F] hover:text-[#1C1612] transition-colors underline underline-offset-4"
                    >
                      ← Back to Basket
                    </Link>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-[#1C1612] px-8 py-4 text-base font-medium text-[#FAF6EE] hover:bg-[#C88A2C] hover:text-white transition-all shadow-md cursor-pointer"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* ======================================================== */
              /* SECTION 2: PAYMENT & CONFIRMATION */
              /* ======================================================== */
              <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in duration-300">
                {/* Collapsed Address Review Bar with quick "Edit" button */}
                <div className="rounded-2xl border border-[#1C1612]/15 bg-white/60 p-5 flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-medium text-[#1C1612] flex items-center gap-2">
                      <Check className="size-4 text-[#7A4B0C]" />
                      Delivery to: <span className="font-semibold">{fullName}</span> ({phone})
                    </p>
                    <p className="text-[#6E5D4F] mt-0.5 ml-6">
                      {address}, {city}, {stateName} — {pincode}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep("address")}
                    className="inline-flex items-center gap-1.5 text-xs text-[#7A4B0C] font-semibold hover:underline cursor-pointer px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors"
                  >
                    <Edit2 className="size-3" />
                    <span>Edit</span>
                  </button>
                </div>

                {/* Payment Selection Box */}
                <div className="rounded-[28px] border border-[#1C1612]/15 bg-white/70 p-7 sm:p-9 shadow-sm">
                  <div className="border-b border-[#1C1612]/10 pb-4 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-normal text-[#1C1612]">
                      Payment Method
                    </h2>
                  </div>

                  {/* Payment Choices */}
                  <div className="space-y-3.5">
                    {/* Choice 1: UPI */}
                    <label
                      className={`flex flex-col rounded-2xl border p-5 cursor-pointer transition-all ${
                        paymentType === "upi"
                          ? "border-[#C88A2C] bg-white ring-1 ring-[#C88A2C] shadow-sm"
                          : "border-[#1C1612]/15 bg-white/40 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <input
                            type="radio"
                            name="payment"
                            value="upi"
                            checked={paymentType === "upi"}
                            onChange={() => setPaymentType("upi")}
                            className="accent-[#C88A2C] size-4"
                          />
                          <div>
                            <span className="text-lg font-medium text-[#1C1612] block">
                              UPI / Instant QR
                            </span>
                            <span className="text-xs text-[#6E5D4F]">
                              Google Pay · PhonePe · Paytm · BHIM
                            </span>
                          </div>
                        </div>
                      </div>

                      {paymentType === "upi" && (
                        <div className="mt-4 pt-4 border-t border-[#1C1612]/10 animate-in fade-in">
                          <label className="block text-xs font-medium text-[#6E5D4F] mb-1.5">
                            Enter UPI ID / VPA
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okhdfcbank"
                            className="w-full rounded-xl border border-[#1C1612]/20 bg-white px-4 py-2.5 text-base text-[#1C1612] outline-none focus:border-[#C88A2C]"
                          />
                          <p className="text-xs text-[#6E5D4F] mt-1.5">
                            A payment request will be sent to your UPI app.
                          </p>
                        </div>
                      )}
                    </label>

                    {/* Choice 2: Cards */}
                    <label
                      className={`flex flex-col rounded-2xl border p-5 cursor-pointer transition-all ${
                        paymentType === "card"
                          ? "border-[#C88A2C] bg-white ring-1 ring-[#C88A2C] shadow-sm"
                          : "border-[#1C1612]/15 bg-white/40 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentType === "card"}
                            onChange={() => setPaymentType("card")}
                            className="accent-[#C88A2C] size-4"
                          />
                          <div>
                            <span className="text-lg font-medium text-[#1C1612] block">
                              Credit or Debit Card
                            </span>
                            <span className="text-xs text-[#6E5D4F]">
                              Visa · Mastercard · RuPay · American Express
                            </span>
                          </div>
                        </div>
                        <CreditCard className="size-5 text-[#6E5D4F]" />
                      </div>

                      {paymentType === "card" && (
                        <div className="mt-4 pt-4 border-t border-[#1C1612]/10 space-y-3 animate-in fade-in">
                          <div>
                            <label className="block text-xs font-medium text-[#6E5D4F] mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4111 2222 3333 4444"
                              className="w-full rounded-xl border border-[#1C1612]/20 bg-white px-4 py-2.5 text-base text-[#1C1612] outline-none focus:border-[#C88A2C]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-[#6E5D4F] mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="MM / YY"
                                className="w-full rounded-xl border border-[#1C1612]/20 bg-white px-4 py-2.5 text-base text-[#1C1612] outline-none focus:border-[#C88A2C]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#6E5D4F] mb-1">
                                CVV
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                placeholder="123"
                                className="w-full rounded-xl border border-[#1C1612]/20 bg-white px-4 py-2.5 text-base text-[#1C1612] outline-none focus:border-[#C88A2C]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </label>

                    {/* Choice 3: Cash on Delivery */}
                    <label
                      className={`flex items-center justify-between rounded-2xl border p-5 cursor-pointer transition-all ${
                        paymentType === "cod"
                          ? "border-[#C88A2C] bg-white ring-1 ring-[#C88A2C] shadow-sm"
                          : "border-[#1C1612]/15 bg-white/40 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentType === "cod"}
                          onChange={() => setPaymentType("cod")}
                          className="accent-[#C88A2C] size-4"
                        />
                        <div>
                          <span className="text-lg font-medium text-[#1C1612] block">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-xs text-[#6E5D4F]">
                            Pay via Cash or UPI at your doorstep upon delivery
                          </span>
                        </div>
                      </div>
                      <Wallet className="size-5 text-[#6E5D4F]" />
                    </label>
                  </div>

                  {/* Submit Action */}
                  <div className="mt-8 pt-6 border-t border-[#1C1612]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep("address")}
                      className="text-sm text-[#6E5D4F] hover:text-[#1C1612] transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      ← Back to Address
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#D49B3E] via-[#F3C45E] to-[#E5A93C] px-10 py-4 text-center text-lg font-semibold text-[#14100D] shadow-xl hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? "Processing..." : `Place Order · ${formatINR(total)}`}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: Fixed / Sticky Order Summary (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <div className="rounded-[28px] bg-[#14100D] p-7 sm:p-9 text-[#FAF6EE] shadow-2xl border border-[#D49B3E]/15">
              <div className="border-b border-white/10 pb-4 mb-4 flex items-baseline justify-between">
                <h2 className="text-2xl font-normal text-white tracking-tight">
                  Your Selection
                </h2>
                <span className="text-sm text-[#FAF6EE]/60">
                  {totalItemsCount} {totalItemsCount === 1 ? "bottle" : "bottles"}
                </span>
              </div>

              {/* Items List */}
              <ul className="divide-y divide-white/10 my-4 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <li key={item.id} className="py-4 flex items-center gap-4">
                    {/* Circular white thumbnail */}
                    <div className="size-16 shrink-0 rounded-full bg-white p-2 flex items-center justify-center shadow-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain drop-shadow"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-white line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#FAF6EE]/70 mt-0.5">
                        {item.volume} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-base font-semibold text-white">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Cost Breakdown */}
              <div className="border-t border-white/10 pt-4 space-y-3 text-base">
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

                <div className="flex justify-between border-t border-white/10 pt-3 text-2xl font-semibold text-white">
                  <span>Total Amount</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
