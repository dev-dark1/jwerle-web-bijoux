"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "EN" | "FR" | "AR"
type Currency = "MAD" | "USD" | "EUR"

interface SettingsContextType {
  language: Language
  currency: Currency
  setLanguage: (lang: Language) => void
  setCurrency: (curr: Currency) => void
  convertPrice: (priceInMad: number) => string
  t: (key: string) => string
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const TRANSLATIONS = {
  EN: {
    "nav.home": "Home",
    "nav.women": "Women",
    "nav.men": "Men",
    "nav.reviews": "Reviews",
    "nav.about": "About",
    "hero.discover": "DISCOVER YOUR",
    "hero.elegance": "ELEGANCE",
    "hero.subtitle": "Experience the ultra-luxury Moroccan jewelry collection. Royal black heritage meets modern gold aesthetics.",
    "cta.whatsapp": "Shop via WhatsApp",
    "cta.explore": "Explore Collection",
    "collection.our": "Our Collection",
    "collection.curated": "Curated Excellence",
    "footer.rights": "All Rights Reserved.",
    "about.title": "The Soul of Tiznit",
    "reviews.title": "Client Stories"
  },
  FR: {
    "nav.home": "Accueil",
    "nav.women": "Femmes",
    "nav.men": "Hommes",
    "nav.reviews": "Avis",
    "nav.about": "À Propos",
    "hero.discover": "DÉCOUVREZ VOTRE",
    "hero.elegance": "ÉLÉGANCE",
    "hero.subtitle": "Découvrez la collection de bijoux marocains ultra-luxe. L'héritage noir royal rencontre l'esthétique moderne dorée.",
    "cta.whatsapp": "Acheter via WhatsApp",
    "cta.explore": "Explorer la Collection",
    "collection.our": "Notre Collection",
    "collection.curated": "Excellence Curatée",
    "footer.rights": "Tous Droits Réservés.",
    "about.title": "L'Âme de Tiznit",
    "reviews.title": "Témoignages Clients"
  },
  AR: {
    "nav.home": "الرئيسية",
    "nav.women": "نساء",
    "nav.men": "رجال",
    "nav.reviews": "آراء العملاء",
    "nav.about": "قصتنا",
    "hero.discover": "اكتشف",
    "hero.elegance": "أناقتك",
    "hero.subtitle": "استمتع بمجموعة المجوهرات المغربية الفاخرة. التراث الملكي يلتقي بجماليات الذهب الحديثة.",
    "cta.whatsapp": "تسوق عبر واتساب",
    "cta.explore": "استكشف المجموعة",
    "collection.our": "مجموعتنا",
    "collection.curated": "تميز مختار",
    "footer.rights": "جميع الحقوق محفوظة.",
    "about.title": "روح تيزنيت",
    "reviews.title": "قصص عملائنا"
  }
}

const RATES = {
  MAD: 1,
  USD: 0.1077, // 1 USD = 9.2775 MAD
  EUR: 0.0935  // 1 EUR = 10.6938 MAD
}

// Fallback dummy context to prevent crashes outside provider
const defaultContext: SettingsContextType = {
  language: "EN",
  currency: "MAD",
  setLanguage: () => {},
  setCurrency: () => {},
  convertPrice: (p) => `${p} DH`,
  t: (k) => k
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN")
  const [currency, setCurrency] = useState<Currency>("MAD")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const convertPrice = (priceInMad: number) => {
    const rate = RATES[currency]
    const converted = Math.round(priceInMad * rate)
    
    if (currency === "MAD") return `${converted} DH`
    if (currency === "USD") return `$${converted}`
    if (currency === "EUR") return `€${converted}`
    return `${converted}`
  }

  const t = (key: string) => {
    return TRANSLATIONS[language][key as keyof typeof TRANSLATIONS["EN"]] || key
  }

  if (!mounted) return <>{children}</>

  return (
    <SettingsContext.Provider value={{ language, currency, setLanguage, setCurrency, convertPrice, t }}>
      <div dir={language === "AR" ? "rtl" : "ltr"} className={language === "AR" ? "font-sans" : ""}>
        {children}
      </div>
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  // Return default context instead of throwing error to handle Next.js SS/not-found edge cases
  if (!context) return defaultContext
  return context
}
