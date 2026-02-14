import { ProductGrid } from "@/components/product-grid";

export default function MenPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">For Him</p>
        <h1 className="text-5xl mt-3">Men's Royal Collection</h1>
      </div>
      <ProductGrid audience="men" title="Curated for Him" />
    </div>
  );
}
