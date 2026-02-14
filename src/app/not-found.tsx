import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-gold">404</p>
        <h1 className="text-5xl mt-3">Page Not Found</h1>
        <Link href="/" className="inline-block mt-6 gold-outline-btn px-5 py-2.5 text-xs uppercase tracking-[0.14em]">
          Return Home
        </Link>
      </div>
    </div>
  );
}
