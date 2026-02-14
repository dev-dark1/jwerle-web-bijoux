export type ProductCategory = "Rings" | "Necklaces" | "Bracelets" | "Charms";
export type ProductAudience = "women" | "men" | "unisex";

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  audience: ProductAudience;
  priceMad: number;
  image: string;
  summary: string;
  materials: string[];
}

export interface RapportFoundation {
  id: string;
  name: string;
  priceMad: number;
  metal: "gold" | "silver" | "black";
}

export interface HeritageCharm {
  id: number;
  name: string;
  meaning: string;
  priceMad: number;
  metal: "gold" | "silver" | "obsidian";
  image: string;
}

export interface ClientStory {
  id: number;
  client: string;
  city: string;
  title: string;
  story: string;
  charms: string[];
  totalMad: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "royal-fatimid-ring",
    name: "Royal Fatimid Ring",
    category: "Rings",
    audience: "women",
    priceMad: 2450,
    image: "https://placehold.co/900x900/0a0a0a/D4AF37?text=Royal+Fatimid+Ring",
    summary: "Architectural ring inspired by Moroccan geometric heritage.",
    materials: ["925 Silver", "18K Gold Plating"],
  },
  {
    id: 2,
    slug: "atlas-signet-ring",
    name: "Atlas Signet Ring",
    category: "Rings",
    audience: "men",
    priceMad: 2290,
    image: "https://placehold.co/900x900/0a0a0a/C0C0C0?text=Atlas+Signet+Ring",
    summary: "Solid signet silhouette honoring mountain resilience.",
    materials: ["925 Silver", "Oxidized Finish"],
  },
  {
    id: 3,
    slug: "noor-serpent-chain",
    name: "Noor Serpent Chain",
    category: "Necklaces",
    audience: "unisex",
    priceMad: 3150,
    image: "https://placehold.co/900x900/0a0a0a/D4AF37?text=Noor+Serpent+Chain",
    summary: "A fluid chain designed for charm stacking and layering.",
    materials: ["925 Silver", "18K Gold Plating"],
  },
  {
    id: 4,
    slug: "sahara-obsidian-bracelet",
    name: "Sahara Obsidian Bracelet",
    category: "Bracelets",
    audience: "men",
    priceMad: 1890,
    image: "https://placehold.co/900x900/0a0a0a/4B0082?text=Sahara+Obsidian+Bracelet",
    summary: "Matte black leather and polished links for formal contrast.",
    materials: ["Obsidian Beads", "Sterling Silver Lock"],
  },
  {
    id: 5,
    slug: "zellige-star-bracelet",
    name: "Zellige Star Bracelet",
    category: "Bracelets",
    audience: "women",
    priceMad: 2050,
    image: "https://placehold.co/900x900/0a0a0a/D4AF37?text=Zellige+Star+Bracelet",
    summary: "Refined bracelet with subtle star motif and clean lines.",
    materials: ["925 Silver", "Gold Vermeil"],
  },
  {
    id: 6,
    slug: "souk-emblem-necklace",
    name: "Souk Emblem Necklace",
    category: "Necklaces",
    audience: "women",
    priceMad: 2720,
    image: "https://placehold.co/900x900/0a0a0a/C0C0C0?text=Souk+Emblem+Necklace",
    summary: "A centerpiece necklace balancing royal proportion and minimalism.",
    materials: ["925 Silver", "Diamond Dust Inlay"],
  },
  {
    id: 7,
    slug: "royal-rapport-charm-set",
    name: "Royal Rapport Charm Set",
    category: "Charms",
    audience: "unisex",
    priceMad: 1650,
    image: "https://placehold.co/900x900/0a0a0a/D4AF37?text=Royal+Rapport+Charm+Set",
    summary: "Three signature charms to start a symbolic story stack.",
    materials: ["925 Silver", "18K Gold Plating", "Enamel"],
  },
  {
    id: 8,
    slug: "heritage-pendant-duo",
    name: "Heritage Pendant Duo",
    category: "Charms",
    audience: "unisex",
    priceMad: 1420,
    image: "https://placehold.co/900x900/0a0a0a/C0C0C0?text=Heritage+Pendant+Duo",
    summary: "Balanced pair of pendants for modern symbolic layering.",
    materials: ["925 Silver", "Obsidian Accent"],
  },
];

export const rapportFoundations: RapportFoundation[] = [
  { id: "gold-chain", name: "Gold Chain", priceMad: 1500, metal: "gold" },
  { id: "silver-snake", name: "Silver Snake", priceMad: 1200, metal: "silver" },
  { id: "black-leather", name: "Black Leather", priceMad: 980, metal: "black" },
];

export const heritageCharms: HeritageCharm[] = [
  {
    id: 101,
    name: "Hand of Fatima",
    meaning: "Protection and spiritual clarity.",
    priceMad: 450,
    metal: "gold",
    image: "https://placehold.co/600x600/0a0a0a/D4AF37?text=Hand+of+Fatima",
  },
  {
    id: 102,
    name: "Atlas Mountains",
    meaning: "Strength, endurance, and ambition.",
    priceMad: 390,
    metal: "silver",
    image: "https://placehold.co/600x600/0a0a0a/C0C0C0?text=Atlas+Mountains",
  },
  {
    id: 103,
    name: "Obsidian Pyramid",
    meaning: "Grounded focus and personal power.",
    priceMad: 510,
    metal: "obsidian",
    image: "https://placehold.co/600x600/0a0a0a/4B0082?text=Obsidian+Pyramid",
  },
  {
    id: 104,
    name: "Enamel Rose",
    meaning: "Love, loyalty, and refinement.",
    priceMad: 430,
    metal: "gold",
    image: "https://placehold.co/600x600/0a0a0a/D4AF37?text=Enamel+Rose",
  },
  {
    id: 105,
    name: "Moroccan Star",
    meaning: "Identity and royal direction.",
    priceMad: 470,
    metal: "silver",
    image: "https://placehold.co/600x600/0a0a0a/C0C0C0?text=Moroccan+Star",
  },
  {
    id: 106,
    name: "Diamond Emblem",
    meaning: "Prestige and generational legacy.",
    priceMad: 640,
    metal: "gold",
    image: "https://placehold.co/600x600/0a0a0a/D4AF37?text=Diamond+Emblem",
  },
];

export const stories: ClientStory[] = [
  {
    id: 1,
    client: "Yasmine A.",
    city: "Casablanca",
    title: "A wedding bracelet with family symbols",
    story:
      "I built my Rapport with the Hand of Fatima and Moroccan Star to represent protection and our shared future.",
    charms: ["Hand of Fatima", "Moroccan Star", "Enamel Rose"],
    totalMad: 2870,
    image: "https://placehold.co/1200x1400/0a0a0a/D4AF37?text=Casablanca+Story",
  },
  {
    id: 2,
    client: "Karim B.",
    city: "Marrakech",
    title: "A modern heirloom for my son",
    story:
      "The Atlas Mountains and Obsidian Pyramid charms felt right: endurance and discipline for the next generation.",
    charms: ["Atlas Mountains", "Obsidian Pyramid", "Diamond Emblem"],
    totalMad: 2650,
    image: "https://placehold.co/1200x1400/0a0a0a/C0C0C0?text=Marrakech+Story",
  },
  {
    id: 3,
    client: "Leila H.",
    city: "Paris",
    title: "Moroccan identity abroad",
    story:
      "I wanted subtle cultural symbols in a luxury format I can wear daily in meetings and events.",
    charms: ["Moroccan Star", "Diamond Emblem"],
    totalMad: 2290,
    image: "https://placehold.co/1200x1400/0a0a0a/4B0082?text=Paris+Story",
  },
];

export const formatMad = (amount: number) => `${amount.toLocaleString("en-US")} MAD`;

export const findProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
