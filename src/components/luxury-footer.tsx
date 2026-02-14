import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import type { ReactNode } from "react";

export function LuxuryFooter() {
  return (
    <footer className="border-t border-white/10 bg-black py-14">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="font-serif text-2xl tracking-[0.16em]">BIJOUX IYL</h2>
          <p className="text-white/70 text-sm mt-4">
            Modern Royal Identity Jewelry. Handcrafted in Tizirit, Morocco with architectural precision.
          </p>
          <div className="flex gap-3 mt-5">
            <SocialCircle label="Instagram" icon={<Instagram className="w-4 h-4" />} />
            <SocialCircle label="Facebook" icon={<Facebook className="w-4 h-4" />} />
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link href="/collections" className="hover:text-gold">Collections</Link></li>
            <li><Link href="/rapport-builder" className="hover:text-gold">Royal Rapport Builder</Link></li>
            <li><Link href="/stories" className="hover:text-gold">Stories of the Souk</Link></li>
            <li><Link href="/blog" className="hover:text-gold">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-2"><MapPin className="w-4 h-4 text-gold mt-0.5" /> Tizirit, Morocco</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 text-gold mt-0.5" /> +212 680 739 497</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 text-gold mt-0.5" /> contact@bijouxiyl.com</li>
          </ul>
          <a
            href="https://wa.me/212680739497"
            target="_blank"
            rel="noreferrer"
            className="inline-flex mt-4 px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-colors text-sm"
          >
            WhatsApp Concierge
          </a>
        </div>

        <div>
          <h3 className="font-serif text-lg">Newsletter</h3>
          <p className="mt-4 text-sm text-white/70">
            Receive private drops, heritage stories, and personalized recommendations.
          </p>
          <form className="mt-4 flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-black border border-white/20 px-3 py-2 text-sm outline-none focus:border-gold"
            />
            <button type="button" className="gold-outline-btn px-3 py-2 text-sm uppercase tracking-wider">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 mt-10 pt-4 border-t border-white/10 text-xs text-white/55 flex flex-wrap gap-3 justify-between">
        <span>© 2026 BIJOUX IYL. All rights reserved.</span>
        <div className="flex gap-3">
          <Link href="/terms" className="hover:text-gold">Terms</Link>
          <Link href="/privacy" className="hover:text-gold">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}

function SocialCircle({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-8 h-8 border border-white/20 grid place-items-center text-white/80 hover:text-gold hover:border-gold transition-colors"
    >
      {icon}
    </a>
  );
}
