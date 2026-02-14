"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { heritageCharms, rapportFoundations, formatMad } from "@/lib/catalog";
import { X } from "lucide-react";
import { useCart } from "@/providers/cart-provider";

export default function RapportBuilderPage() {
  const { addItem } = useCart();
  const [foundationId, setFoundationId] = useState(rapportFoundations[0].id);
  const [selectedCharmIds, setSelectedCharmIds] = useState<number[]>([]);

  const foundation = rapportFoundations.find((item) => item.id === foundationId) ?? rapportFoundations[0];
  const selectedCharms = heritageCharms.filter((charm) => selectedCharmIds.includes(charm.id));

  const total = useMemo(
    () => foundation.priceMad + selectedCharms.reduce((sum, charm) => sum + charm.priceMad, 0),
    [foundation.priceMad, selectedCharms]
  );

  const addCharm = (id: number) => {
    setSelectedCharmIds((prev) => {
      if (prev.length >= 6) return prev;
      return [...prev, id];
    });
  };

  const removeCharmAt = (index: number) => {
    setSelectedCharmIds((prev) => prev.filter((_, position) => position !== index));
  };

  const shiftCharm = (index: number, direction: "left" | "right") => {
    setSelectedCharmIds((prev) => {
      const target = direction === "left" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const cloned = [...prev];
      [cloned[index], cloned[target]] = [cloned[target], cloned[index]];
      return cloned;
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <p className="text-gold text-xs uppercase tracking-[0.2em]">Build Your Royal Rapport</p>
      <h1 className="text-5xl mt-3">Create Your Story Bracelet</h1>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 mt-10">
        <section className="luxury-surface p-6">
          <h2 className="text-2xl">Step 1 - Choose Foundation</h2>
          <div className="grid md:grid-cols-3 gap-3 mt-5">
            {rapportFoundations.map((item) => (
              <button
                key={item.id}
                onClick={() => setFoundationId(item.id)}
                className={`border p-4 text-left transition-colors ${
                  item.id === foundationId ? "border-gold bg-gold/10" : "border-white/15 hover:border-gold/60"
                }`}
              >
                <p className="text-sm text-white/65 uppercase tracking-[0.14em]">{item.metal}</p>
                <p className="font-serif text-lg mt-1">{item.name}</p>
                <p className="text-gold mt-2 text-sm">{formatMad(item.priceMad)}</p>
              </button>
            ))}
          </div>

          <h2 className="text-2xl mt-10">Step 2 - Select Heritage Charms</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-5">
            {heritageCharms.map((charm) => (
              <article key={charm.id} className="border border-white/15 p-3">
                <div className="relative aspect-square">
                  <Image src={charm.image} alt={charm.name} fill className="object-cover" />
                </div>
                <h3 className="font-serif mt-3">{charm.name}</h3>
                <p className="text-xs text-white/65 mt-1">{charm.meaning}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-gold text-sm">{formatMad(charm.priceMad)}</span>
                  <button
                    onClick={() => addCharm(charm.id)}
                    className="border border-gold text-gold text-xs uppercase tracking-[0.14em] px-2 py-1 hover:bg-gold hover:text-black"
                  >
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="luxury-surface p-6 h-fit lg:sticky lg:top-32">
          <h2 className="text-2xl">Step 3 - Arrange & Preview</h2>
          <div className="mt-6 border border-gold/30 p-5 bg-black">
            <p className="text-xs uppercase tracking-[0.14em] text-gold">Foundation</p>
            <p className="font-serif mt-1">{foundation.name}</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, slotIndex) => {
                const charmId = selectedCharmIds[slotIndex];
                const charm = heritageCharms.find((item) => item.id === charmId);
                return (
                  <div key={slotIndex} className="border border-white/15 aspect-square relative">
                    {charm ? (
                      <>
                        <Image src={charm.image} alt={charm.name} fill className="object-cover" />
                        <button
                          onClick={() => removeCharmAt(slotIndex)}
                          className="absolute top-1 right-1 bg-black/80 border border-white/20 p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <span className="absolute inset-0 grid place-items-center text-[10px] text-white/45 tracking-[0.12em]">
                        EMPTY
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            {selectedCharms.length > 0 ? (
              <div className="mt-5 space-y-2">
                {selectedCharms.map((charm, index) => (
                  <div key={`${charm.id}-${index}`} className="flex items-center justify-between text-sm border border-white/10 px-3 py-2">
                    <span>{charm.name}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => shiftCharm(index, "left")} className="px-1 border border-white/20">←</button>
                      <button onClick={() => shiftCharm(index, "right")} className="px-1 border border-white/20">→</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-5 border border-white/15 p-4">
            <div className="flex justify-between text-sm text-white/75">
              <span>Foundation</span>
              <span>{formatMad(foundation.priceMad)}</span>
            </div>
            <div className="flex justify-between text-sm text-white/75 mt-2">
              <span>Charms ({selectedCharms.length})</span>
              <span>{formatMad(selectedCharms.reduce((sum, charm) => sum + charm.priceMad, 0))}</span>
            </div>
            <div className="flex justify-between text-base mt-3 border-t border-white/10 pt-3">
              <span>Total</span>
              <strong className="text-gold">{formatMad(total)}</strong>
            </div>
          </div>

          <button
            onClick={() =>
              addItem({
                productId: 9000 + foundation.priceMad,
                name: `Royal Rapport - ${foundation.name}`,
                image: heritageCharms[0].image,
                price: total,
                quantity: 1,
                options: { metal: foundation.metal === "silver" ? "silver" : "gold" },
              })
            }
            className="w-full mt-4 gold-outline-btn px-4 py-3 uppercase tracking-[0.14em] text-xs"
          >
            Add Build to Cart
          </button>
        </aside>
      </div>
    </div>
  );
}
