"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/providers/cart-provider";
import { formatMad, products } from "@/lib/catalog";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, cartTotal, isOpen, toggleCart, addItem } = useCart();
  const progress = Math.min((cartTotal / 500) * 100, 100);
  const remaining = Math.max(500 - cartTotal, 0);
  const suggested = products.find((product) => !items.some((item) => item.productId === product.id));

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm" onClick={toggleCart} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.26 }}
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-black border-l border-white/15 flex flex-col"
          >
            <div className="px-5 py-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-serif text-xl">Cart ({items.length})</h2>
              <button onClick={toggleCart}><X className="w-5 h-5" /></button>
            </div>

            <div className="px-5 py-3 border-b border-white/10">
              <div className="flex justify-between text-xs text-white/65">
                <span>Free delivery threshold</span>
                <span>{remaining > 0 ? `${formatMad(remaining)} left` : "Unlocked"}</span>
              </div>
              <div className="h-1.5 bg-white/15 mt-2">
                <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-10 h-10 mx-auto text-white/35" />
                  <p className="text-white/60 text-sm mt-4">Your cart is currently empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <article key={item.id} className="border border-white/15 p-3 flex gap-3">
                    <div className="relative w-16 h-16 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-white/55 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-white/55 mt-1">{item.options.metal ?? "gold"}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center border border-white/20">
                          <button className="px-2 py-1" onClick={() => updateQuantity(item.id, -1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs">{item.quantity}</span>
                          <button className="px-2 py-1" onClick={() => updateQuantity(item.id, 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gold text-sm">{formatMad(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </article>
                ))
              )}

              {suggested ? (
                <div className="border border-gold/40 p-3">
                  <p className="text-xs uppercase tracking-[0.13em] text-gold">Upsell Suggestion</p>
                  <h3 className="font-serif mt-2">{suggested.name}</h3>
                  <p className="text-sm text-white/70 mt-1">{formatMad(suggested.priceMad)}</p>
                  <button
                    onClick={() =>
                      addItem({
                        productId: suggested.id,
                        name: suggested.name,
                        image: suggested.image,
                        price: suggested.priceMad,
                        quantity: 1,
                        options: { metal: "gold" },
                      })
                    }
                    className="mt-3 text-xs uppercase tracking-[0.12em] border border-gold text-gold px-3 py-2 hover:bg-gold hover:text-black"
                  >
                    Quick Add
                  </button>
                </div>
              ) : null}
            </div>

            <div className="px-5 py-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white/75">Total</span>
                <strong className="text-gold">{formatMad(cartTotal)}</strong>
              </div>
              <Link
                href="/checkout"
                onClick={toggleCart}
                className="mt-4 block text-center gold-outline-btn py-3 uppercase tracking-[0.12em] text-xs"
              >
                One-Page Checkout
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
