import { ProductGrid } from "@/components/product-grid";

export default function WomenPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">For Her</p>
        <h1 className="text-5xl mt-3">Women's Royal Collection</h1>
      </div>
      <ProductGrid audience="women" title="Curated for Her" />
    </div>
  );
}
