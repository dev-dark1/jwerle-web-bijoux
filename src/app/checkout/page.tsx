"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/cart-provider";
import { formatMad } from "@/lib/catalog";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!success && items.length === 0) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4">
        <div className="text-center">
          <h1 className="text-4xl">Your cart is empty</h1>
          <button onClick={() => router.push("/collections")} className="mt-4 gold-outline-btn px-5 py-2 text-xs uppercase tracking-[0.14em]">
            Shop Collections
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, string>;

    const lines = items
      .map((item) => `- ${item.name} x${item.quantity} (${formatMad(item.price * item.quantity)})`)
      .join("%0A");

    const message = `NEW ORDER - YOURELEGANCE%0AName: ${encodeURIComponent(data.fullName)}%0ACity: ${encodeURIComponent(data.city)}%0APhone: ${encodeURIComponent(data.phone)}%0AAddress: ${encodeURIComponent(data.address)}%0APayment: ${encodeURIComponent(data.payment)}%0A%0AItems:%0A${lines}%0A%0ATotal: ${encodeURIComponent(formatMad(cartTotal))}`;

    const whatsappUrl = `https://wa.me/212680739497?text=${message}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      clearCart();
      setSuccess(true);
      setLoading(false);
    }, 700);
  };

  if (success) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4">
        <div className="text-center border border-gold/40 p-8 max-w-xl">
          <h1 className="text-4xl">Order Confirmed</h1>
          <p className="text-white/70 mt-4">
            Your order has been forwarded to our concierge team. You can complete confirmation through WhatsApp.
          </p>
          <button onClick={() => router.push("/")} className="mt-6 gold-outline-btn px-6 py-3 text-xs uppercase tracking-[0.14em]">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 grid lg:grid-cols-[1fr_0.9fr] gap-6">
      <section className="luxury-surface p-6 h-fit">
        <h2 className="text-3xl">One-Page Checkout</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Field label="Full Name" name="fullName" required />
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Phone Number" name="phone" required />
            <Field label="City" name="city" required />
          </div>
          <Field label="Address" name="address" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Postal Code" name="postalCode" />

          <div>
            <label className="text-xs uppercase tracking-[0.14em] text-gold">Payment Method</label>
            <div className="grid md:grid-cols-3 gap-2 mt-2 text-sm">
              <PaymentOption label="Cash on Delivery (Morocco)" value="COD" defaultChecked />
              <PaymentOption label="Stripe Card" value="Stripe" />
              <PaymentOption label="PayPal" value="PayPal" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-outline-btn py-3 text-xs uppercase tracking-[0.14em] disabled:opacity-50"
          >
            {loading ? "Processing..." : `Place Order · ${formatMad(cartTotal)}`}
          </button>
        </form>
      </section>

      <aside className="luxury-surface p-6 h-fit">
        <h2 className="text-2xl">Order Summary</h2>
        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm border-b border-white/10 pb-2">
              <span className="text-white/80">{item.name} x{item.quantity}</span>
              <span>{formatMad(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-white/10 pt-3 flex justify-between">
          <span>Total</span>
          <strong className="text-gold">{formatMad(cartTotal)}</strong>
        </div>

        <div className="mt-6 border border-white/15 p-3 text-sm text-white/70">
          <p>COD is optimized for Moroccan conversion. Stripe and PayPal are ready for international expansion.</p>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.14em] text-gold">{label}</label>
      <input
        required={required}
        name={name}
        type={type}
        className="mt-1 w-full border border-white/20 bg-black px-3 py-2 outline-none focus:border-gold"
      />
    </div>
  );
}

function PaymentOption({ label, value, defaultChecked = false }: { label: string; value: string; defaultChecked?: boolean }) {
  return (
    <label className="border border-white/20 p-3 cursor-pointer hover:border-gold transition-colors">
      <input type="radio" name="payment" value={value} defaultChecked={defaultChecked} className="sr-only" />
      {label}
    </label>
  );
}
