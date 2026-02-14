"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Gem, Truck, BadgeCheck } from "lucide-react";
import type { ReactNode } from "react";
import { ProductGrid } from "@/components/product-grid";
import { products } from "@/lib/catalog";
import { useCart } from "@/providers/cart-provider";

export default function HomePage() {
  const { addItem } = useCart();
  const bestSellers = products.slice(0, 4);

  return (
    <div className="bg-black text-white">
      <section className="min-h-[85vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.2),transparent_42%),radial-gradient(circle_at_75%_30%,rgba(75,0,130,0.18),transparent_34%),linear-gradient(to_bottom,#000,#060606)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs tracking-[0.2em] uppercase text-gold">Discover Yourelegance</p>
            <h1 className="text-5xl md:text-7xl leading-tight mt-4">
              Every Royal Story
              <br />
              Begins With a Spark.
            </h1>
            <p className="text-white/75 mt-6 max-w-xl">
              Royal Moroccan heritage in modern black and gold. Build identity jewelry designed for status, symbolism, and legacy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/rapport-builder" className="gold-outline-btn px-6 py-3 uppercase tracking-[0.15em] text-xs">
                Build Your Royal Rapport
              </Link>
              <Link href="/collections" className="border border-white/20 px-6 py-3 uppercase tracking-[0.15em] text-xs hover:border-gold hover:text-gold">
                Shop the Collection
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="royal-panel p-7 md:p-10"
          >
            <p className="text-gold uppercase tracking-[0.13em] text-xs">Signature Positioning</p>
            <h2 className="text-3xl mt-3">Modern Royal Identity Jewelry</h2>
            <p className="text-white/75 mt-4 text-sm">
              Not mass luxury. Not accessible jewelry. A high-touch storytelling format designed for Moroccan and global buyers.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 text-sm">
              <Stat label="LCP Target" value="< 1.2s" />
              <Stat label="Conversion Target" value="4-5%" />
              <Stat label="AOV Growth" value="+20%" />
              <Stat label="Abandonment Drop" value="-20pts" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Feature icon={<BadgeCheck className="w-5 h-5 text-gold" />} title="925 Certified" />
          <Feature icon={<ShieldCheck className="w-5 h-5 text-gold" />} title="Secure Payment" />
          <Feature icon={<Truck className="w-5 h-5 text-gold" />} title="Fast Delivery" />
          <Feature icon={<Gem className="w-5 h-5 text-gold" />} title="Authentic Moroccan Craft" />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between gap-4 mb-7">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-gold">Featured Collections</p>
              <h2 className="text-4xl mt-2">For Her / For Him</h2>
            </div>
            <Link href="/collections" className="text-sm text-white/80 hover:text-gold">View all collections</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <CollectionCard
              href="/collections"
              title="For Her"
              description="Structured silhouettes with luminous gold accents."
            />
            <CollectionCard
              href="/collections"
              title="For Him"
              description="Strong forms in silver, obsidian, and minimal geometry."
            />
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-7">
            <h2 className="text-4xl">Best Sellers</h2>
            <Link href="/collections" className="text-sm text-white/80 hover:text-gold">Browse all</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestSellers.map((item) => (
              <article key={item.id} className="luxury-surface p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-gold">{item.category}</p>
                <h3 className="font-serif mt-2">{item.name}</h3>
                <p className="text-sm text-white/70 mt-2">{item.priceMad} MAD</p>
                <button
                  onClick={() =>
                    addItem({
                      productId: item.id,
                      name: item.name,
                      image: item.image,
                      price: item.priceMad,
                      quantity: 1,
                      options: { metal: "gold" },
                    })
                  }
                  className="mt-4 w-full border border-gold text-gold py-2 text-xs uppercase tracking-[0.12em] hover:bg-gold hover:text-black transition-colors"
                >
                  Quick Add
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 royal-panel p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-gold uppercase text-xs tracking-[0.16em]">Main Interactive Feature</p>
            <h2 className="text-4xl mt-3">The Royal Rapport Builder</h2>
            <p className="text-white/75 mt-4 max-w-2xl">
              Choose a foundation, add heritage charms, and arrange your story with live pricing and visual slots.
            </p>
          </div>
          <Link href="/rapport-builder" className="gold-outline-btn px-6 py-3 uppercase tracking-[0.14em] text-xs">
            Start Building
          </Link>
        </div>
      </section>

      <ProductGrid title="Curated Prestige Pieces" />

      <section className="py-16 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-gold">Shoppable Storytelling</p>
            <h2 className="text-4xl mt-2">Stories of the Souk</h2>
          </div>
          <Link href="/stories" className="gold-outline-btn px-5 py-2.5 text-xs uppercase tracking-[0.14em]">
            Explore Client Stories
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Yourelegance",
            description: "Modern Royal Identity Jewelry from Morocco.",
            url: "https://my-web-orpin-three.vercel.app/",
            areaServed: ["MA", "US", "FR"],
          }),
        }}
      />
    </div>
  );
}

function Feature({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="luxury-surface px-4 py-4 flex items-center gap-3 text-sm">
      {icon}
      <span>{title}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/15 px-3 py-3">
      <p className="text-xs text-white/60 uppercase tracking-[0.12em]">{label}</p>
      <p className="text-lg text-gold mt-1">{value}</p>
    </div>
  );
}

function CollectionCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link href={href} className="royal-panel p-8 block group">
      <h3 className="text-3xl">{title}</h3>
      <p className="text-white/70 mt-3">{description}</p>
      <span className="inline-block mt-6 text-xs uppercase tracking-[0.15em] text-gold group-hover:underline">
        Shop Collection
      </span>
    </Link>
  );
}
