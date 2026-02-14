import Link from "next/link";

export const metadata = {
  title: "Account | Yourelegance",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-5xl">Your Account</h1>
      <p className="text-white/70 mt-4">
        Track orders, manage wishlist, and save your Rapport builds for future purchases.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <Card title="Orders" description="View status and delivery timeline for all orders." />
        <Card title="Wishlist" description="Save favorite products and charm combinations." />
        <Card title="Saved Rapport" description="Resume custom bracelet builds from any device." />
      </div>

      <div className="mt-8">
        <Link href="/collections" className="gold-outline-btn px-5 py-2.5 text-xs uppercase tracking-[0.14em]">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="luxury-surface p-5">
      <h2 className="font-serif text-2xl">{title}</h2>
      <p className="text-sm text-white/70 mt-3">{description}</p>
    </div>
  );
}
