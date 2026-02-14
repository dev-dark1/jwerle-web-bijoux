"use client";

import Image from "next/image";
import Link from "next/link";
import { products, findProductBySlug, formatMad } from "@/lib/catalog";
import { useCart } from "@/providers/cart-provider";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = findProductBySlug(params.slug);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl">Product not found</h1>
        <Link href="/collections" className="inline-block mt-4 gold-outline-btn px-4 py-2 text-xs uppercase tracking-[0.14em]">
          Back to Collections
        </Link>
      </div>
    );
  }

  const upsell = products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid lg:grid-cols-[120px_1fr_0.9fr] gap-6">
        <div className="hidden lg:grid gap-3 h-fit">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border border-white/20 aspect-square" />
          ))}
        </div>

        <div className="border border-white/15 relative aspect-square">
          <Image src={product.image} alt={product.name} fill className="object-cover" priority />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-gold">{product.category}</p>
          <h1 className="text-5xl mt-2">{product.name}</h1>
          <p className="text-2xl text-gold mt-5">{formatMad(product.priceMad)}</p>
          <p className="text-white/75 mt-6">{product.summary}</p>

          <div className="mt-6 space-y-2 text-sm text-white/80">
            <p><span className="text-white">Materials:</span> {product.materials.join(" · ")}</p>
            <p><span className="text-white">Shipping:</span> 24-72h in Morocco, 3-7 days international.</p>
            <p><span className="text-white">Care:</span> Store dry, avoid direct perfume and saltwater.</p>
          </div>

          <button
            onClick={() =>
              addItem({
                productId: product.id,
                name: product.name,
                image: product.image,
                price: product.priceMad,
                quantity: 1,
                options: { metal: "gold" },
              })
            }
            className="mt-8 w-full border border-gold text-gold py-3 uppercase tracking-[0.14em] text-xs hover:bg-gold hover:text-black transition-colors sticky bottom-4"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-3xl">Complete the Royal Set</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-5">
          {upsell.map((item) => (
            <Link key={item.id} href={`/product/${item.slug}`} className="luxury-surface p-4">
              <p className="text-xs text-gold uppercase tracking-[0.12em]">{item.category}</p>
              <h3 className="font-serif mt-2">{item.name}</h3>
              <p className="text-sm text-white/75 mt-2">{formatMad(item.priceMad)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
