"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { products, ProductCategory, formatMad } from "@/lib/catalog";
import { useCart } from "@/providers/cart-provider";

const categories: Array<"All" | ProductCategory> = ["All", "Rings", "Necklaces", "Bracelets", "Charms"];

interface ProductGridProps {
  audience?: "women" | "men" | "unisex";
  title?: string;
}

export function ProductGrid({ audience, title = "Collections" }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | ProductCategory>("All");
  const { addItem } = useCart();

  const items = useMemo(
    () =>
      products.filter((product) => {
        if (audience && product.audience !== audience && product.audience !== "unisex") return false;
        if (activeCategory !== "All" && product.category !== activeCategory) return false;
        return true;
      }),
    [activeCategory, audience]
  );

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap gap-4 justify-between items-end mb-8">
          <div>
            <p className="text-gold tracking-[0.16em] text-xs uppercase">Luxury Collections</p>
            <h2 className="text-4xl font-serif mt-2">{title}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                  activeCategory === category
                    ? "bg-gold text-black border-gold"
                    : "border-white/20 text-white/80 hover:border-gold hover:text-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product) => (
            <article key={product.id} className="luxury-surface">
              <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <p className="text-xs text-gold tracking-[0.14em] uppercase">{product.category}</p>
                <h3 className="mt-2 font-serif text-lg">{product.name}</h3>
                <p className="mt-2 text-sm text-white/65">{product.summary}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-gold font-medium">{formatMad(product.priceMad)}</span>
                  <button
                    onClick={() =>
                      addItem({
                        productId: product.id,
                        name: product.name,
                        price: product.priceMad,
                        image: product.image,
                        quantity: 1,
                        options: { metal: "gold" },
                      })
                    }
                    className="border border-white/20 px-3 py-1.5 hover:border-gold hover:text-gold transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
