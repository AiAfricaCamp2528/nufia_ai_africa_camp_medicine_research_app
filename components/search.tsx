"use client";

import React, { useState, useMemo } from "react";
import GlassSurface from "./GlassSurface";
import { Navigation2 } from "@deemlol/next-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { medicines } from "../lib/mocks/medicines";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Filtrer les médicaments en temps réel
  const filteredMedicines = useMemo(() => {
    if (!searchQuery.trim()) return medicines;

    const query = searchQuery.toLowerCase();
    return medicines.filter((med) =>
      med.name.toLowerCase().includes(query) ||
      med.dosage.toLowerCase().includes(query) ||
      med.form.toLowerCase().includes(query) ||
      med.manufacturer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const showMedicine = (index: number) => () => {
    router.push(`/home/details/${index}`);
  };

  return (
    <div className="pt-8 flex flex-col items-center overflow-hidden">
      <GlassSurface borderRadius={400} className="!w-auto mb-12">
        <input
          type="text"
          className="px-6 py-4 mr-2 rounded-full w-[700px] text-xl"
          placeholder="Quel médicament recherchez-vous ?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-green-600 text-white p-4 rounded-full cursor-pointer hover:bg-green-800 duration-400"
        >
          <Navigation2
            size={24}
            color="#FFFFFF"
            style={{ transform: "rotate(90deg)" }}
          />
        </button>
      </GlassSurface>

      <div className="text-md text-black/50 md:w-[1200px] mb-4">
        Listes des médicaments{" "}
        <span className="font-semibold">({filteredMedicines.length})</span>{" "}
      </div>
      <div
        className="md:w-[1200px] h-[calc(100vh-220px)] overflow-y-scroll grid grid-cols-4 gap-6 p-3"
        style={{
          width: "1200px",
          height: "calc(100vh - 220px)",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {filteredMedicines.map((item, index) => (
          <div
            onClick={showMedicine(index)}
            key={index}
            className="h-50 group cursor-pointer mb-6"
          >
            <div className="h-30 w-full rounded-md bg-black/10 overflow-hidden group-hover:scale-105 duration-300">
              <Image
                src="/images/hand.png"
                alt={item.name}
                width={20}
                height={20}
              />
            </div>

            <div className="pt-2 space-y-1">
              {/* Nom du médicament */}
              <div className="font-semibold">{item.name}</div>

              {/* Prix + pharmacie */}
              <div className="text-sm text-black/40 flex justify-between">
                <span className="font-medium">{item.price} FCFA</span>
                <span className="text-xs">{item.manufacturer}</span>
              </div>

              {/* Dosage + Forme (optionnel mais utile) */}
              <div className="text-xs text-black/30">
                {item.dosage} — {item.form}
              </div>

              {/* Disponibilité */}
              <div
                className={`
          text-xs font-medium
          ${item.availability === "in_stock" ? "text-green-600" : ""}
          ${item.availability === "low_stock" ? "text-orange-500" : ""}
          ${item.availability === "out_of_stock" ? "text-red-500" : ""}
        `}
              >
                {item.availability === "in_stock" && "Disponible"}
                {item.availability === "low_stock" && "Stock limité"}
                {item.availability === "out_of_stock" && "Rupture"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
