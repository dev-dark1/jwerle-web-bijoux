"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/providers/cart-provider";
import { products } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const categories = ["Rings", "Necklaces", "Bracelets", "Charms", "For Her", "For Him"];

export function TubelightNavbar() {
  const { itemCount, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const suggestions = products
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 4);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-black text-[11px] uppercase tracking-[0.16em] text-gold border-b border-white/10 py-2 text-center">
        Free Delivery in Morocco for orders over 500 MAD
      </div>

      <div
        className={cn(
          "transition-all duration-200 border-b",
          scrolled
            ? "bg-black border-white/15"
            : "bg-gradient-to-b from-black/90 to-transparent border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <nav className="hidden lg:flex items-center gap-5 text-sm tracking-wide">
            {categories.map((item) => (
              <Link
                key={item}
                href={item === "For Her" || item === "For Him" ? "/collections" : "/collections"}
                className="text-white/82 hover:text-gold transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          <button className="lg:hidden" onClick={() => setMobileOpen((prev) => !prev)} aria-label="Open menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="font-serif text-xl md:text-2xl text-white tracking-[0.2em]">
            YOURELEGANCE
          </Link>

          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setSearchOpen(true)} aria-label="Search products">
              <Search className="w-5 h-5 text-white/80 hover:text-gold" />
            </button>
            <Link href="/account" aria-label="Account">
              <User className="w-5 h-5 text-white/80 hover:text-gold" />
            </Link>
            <button onClick={toggleCart} className="relative" aria-label="Open cart">
              <ShoppingBag className="w-5 h-5 text-white/80 hover:text-gold" />
              {itemCount > 0 ? (
                <span className="absolute -right-2 -top-2 w-5 h-5 text-[10px] rounded-full bg-gold text-black grid place-items-center font-semibold">
                  {itemCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="lg:hidden border-t border-white/10 bg-black px-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((item) => (
                <Link
                  key={item}
                  href="/collections"
                  className="px-3 py-2 text-sm border border-white/15 hover:border-gold text-white/90"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {searchOpen ? (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm p-4" onClick={() => setSearchOpen(false)}>
          <div
            className="mx-auto mt-24 max-w-xl bg-black-soft border border-gold/30 p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border border-white/20 px-3 py-2">
              <Search className="w-4 h-4 text-gold" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoFocus
                className="bg-transparent w-full outline-none text-white placeholder:text-white/45"
                placeholder="Search rings, bracelets, charms..."
              />
            </div>

            <div className="mt-4 space-y-2">
              {query.length === 0 ? (
                <p className="text-white/55 text-sm">Type to see suggestions.</p>
              ) : (
                suggestions.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between border border-white/10 px-3 py-2 hover:border-gold"
                  >
                    <span>{product.name}</span>
                    <span className="text-gold text-sm">{product.priceMad} MAD</span>
                  </Link>
                ))
              )}
              {query.length > 0 && suggestions.length === 0 ? (
                <p className="text-white/55 text-sm">No matching products.</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
