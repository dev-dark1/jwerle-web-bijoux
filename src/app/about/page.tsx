export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-gold">About / Heritage</p>
      <h1 className="text-5xl mt-3">Moroccan Royal Craft, Reframed</h1>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <section className="luxury-surface p-6">
          <h2 className="text-3xl">Our Identity</h2>
          <p className="text-white/75 mt-4">
            Yourelegance is built on a simple direction: preserve Moroccan symbolic depth and express it through modern architectural minimalism.
          </p>
          <p className="text-white/75 mt-3">
            Every collection is designed around status, memory, and precision, not trend cycles.
          </p>
        </section>
        <section className="luxury-surface p-6">
          <h2 className="text-3xl">Materials & Method</h2>
          <ul className="text-white/75 mt-4 space-y-2 text-sm">
            <li>925 Sterling Silver as a structural base.</li>
            <li>Gold plating for ceremonial accents and contrast.</li>
            <li>Controlled, low-volume production for quality consistency.</li>
            <li>Design language inspired by Moroccan geometry and royal codes.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
