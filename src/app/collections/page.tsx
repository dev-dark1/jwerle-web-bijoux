import { ProductGrid } from "@/components/product-grid";

export const metadata = {
  title: "Collections | Yourelegance",
  description: "Explore rings, necklaces, bracelets, and charms crafted with modern Moroccan royal identity.",
};

export default function CollectionsPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs tracking-[0.18em] uppercase text-gold">Collections</p>
        <h1 className="text-5xl mt-3">The Royal Edit</h1>
      </div>
      <ProductGrid title="All Collections" />
    </div>
  );
}
