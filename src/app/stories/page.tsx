import Image from "next/image";
import Link from "next/link";
import { stories, formatMad } from "@/lib/catalog";

export const metadata = {
  title: "Stories of the Souk | Yourelegance",
  description: "Shoppable client stories from Morocco and beyond.",
};

export default function StoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.18em] text-gold">Stories of the Souk</p>
      <h1 className="text-5xl mt-3">Client Gallery</h1>
      <p className="text-white/70 max-w-2xl mt-4">
        Click each visual story to discover the charms used, total build value, and the symbolism behind each composition.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {stories.map((entry) => (
          <article key={entry.id} className="luxury-surface overflow-hidden">
            <div className="relative aspect-[4/5]">
              <Image src={entry.image} alt={entry.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <p className="text-xs text-gold tracking-[0.14em] uppercase">{entry.city}</p>
              <h2 className="font-serif text-2xl mt-2">{entry.title}</h2>
              <p className="text-sm text-white/70 mt-2">{entry.story}</p>
              <p className="text-sm mt-4">
                <span className="text-white/60">Charms:</span> {entry.charms.join(" · ")}
              </p>
              <p className="text-gold mt-2">{formatMad(entry.totalMad)}</p>
              <Link href="/rapport-builder" className="inline-block mt-4 text-xs uppercase tracking-[0.14em] border border-gold text-gold px-3 py-2 hover:bg-gold hover:text-black">
                Build Similar Story
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
