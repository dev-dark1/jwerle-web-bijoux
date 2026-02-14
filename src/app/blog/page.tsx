import Link from "next/link";

const posts = [
  {
    slug: "moroccan-jewelry-heritage",
    title: "Moroccan Jewelry Heritage: Symbols That Still Define Status",
    category: "Heritage",
  },
  {
    slug: "royal-styling-guide",
    title: "Royal Styling Guide: Black and Gold Compositions for Formal Events",
    category: "Styling",
  },
  {
    slug: "care-guide-925-silver",
    title: "925 Silver Care Guide: Preserve Luster and Structure",
    category: "Care",
  },
  {
    slug: "gift-guide-rapport-builder",
    title: "Gift Guide: Build a Personalized Rapport for Milestone Moments",
    category: "Gift Guide",
  },
];

export const metadata = {
  title: "Blog | Yourelegance",
  description: "Luxury content strategy for heritage jewelry, styling, and jewelry care.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-gold">Luxury Journal</p>
      <h1 className="text-5xl mt-3">Yourelegance Blog</h1>
      <p className="text-white/70 mt-4">
        SEO-ready editorial content for Moroccan heritage, care guides, and gifting strategy.
      </p>

      <div className="mt-9 space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="luxury-surface p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-gold">{post.category}</p>
            <h2 className="font-serif text-2xl mt-2">{post.title}</h2>
            <Link href="#" className="inline-block mt-4 border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.12em] hover:border-gold hover:text-gold">
              Read Article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
