import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TubelightNavbar } from "@/components/ui/tubelight-navbar";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/providers/cart-provider";
import { LuxuryFooter } from "@/components/luxury-footer";
import { AnalyticsTracker } from "@/components/analytics-tracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-web-orpin-three.vercel.app"),
  title: "BIJOUX IYL | Modern Royal Identity Jewelry",
  description:
    "Discover BIJOUX IYL. Royal Moroccan heritage meets modern black and gold jewelry craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} bg-black-bg text-white antialiased selection:bg-gold selection:text-black`}
      >
        <CartProvider>
          <TubelightNavbar />
          <CartDrawer />
          <AnalyticsTracker />
          <main className="min-h-screen pt-28 md:pt-32">{children}</main>
          <LuxuryFooter />
        </CartProvider>
      </body>
    </html>
  );
}
