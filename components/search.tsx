"use client";

import React, { useEffect, useMemo, useState } from "react";
import GlassSurface from "./GlassSurface";
import { Navigation2 } from "@deemlol/next-icons";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link';
import { getMedicines } from "@/lib/api/medicines";
import { getPharmaciesWithMedicine } from "@/lib/api/pharmacies";

interface MedicineHistory {
  id: string | number;
  name: string;
  timestamp: number;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [medicinesList, setMedicinesList] = useState<any[]>([]);
  const [pharmaciesMap, setPharmaciesMap] = useState<Record<string, any[]>>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  // Récupérer le paramètre 'search' de l'URL au montage
  useEffect(() => {
    const queryParam = searchParams.get("search");
    if (queryParam) {
      setSearchQuery(decodeURIComponent(queryParam));
    }
  }, [searchParams]);

  // Load medicines from API on mount
  useEffect(() => {
    let mounted = true;
    getMedicines()
      .then((data) => {
        if (!mounted) return;
        // normalize DB rows to the shape expected by UI
        const normalized = data.map((m: any) => ({
          id: m.id,
          name: m.name,
          dosage: m.dosage ?? '',
          form: m.form ?? '',
          description: m.description ?? '',
          indications: m.indications ?? [],
          contraindications: m.contraindications ?? [],
          sideEffects: m.side_effects ?? [],
          manufacturer: m.manufacturer ?? '',
          availability: m.availability ?? 'in_stock',
          price: m.price ?? 0,
        }));
        setMedicinesList(normalized);

        // preload pharmacies availability for each medicine (small lists only)
        Promise.all(
          normalized.map((med: any) =>
            getPharmaciesWithMedicine(med.id).catch(() => [])
          )
        ).then((results) => {
          if (!mounted) return;
          const map: Record<string, any[]> = {};
          normalized.forEach((med: any, i: number) => {
            map[med.id] = results[i] || [];
          });
          setPharmaciesMap(map);
        });
      })
      .catch((err) => console.error('Failed to load medicines', err));
    return () => {
      mounted = false;
    };
  }, []);

  // Enregistrer un médicament dans l'historique
  const addToHistory = (medicineId: string, medicineName: string) => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("medicineHistory");
      let history: MedicineHistory[] = [];
      if (savedHistory) {
        try {
          history = JSON.parse(savedHistory);
        } catch (error) {
          console.error("Erreur en chargeant l'historique:", error);
        }
      }

      const newEntry: MedicineHistory = {
        id: medicineId,
        name: medicineName,
        timestamp: Date.now(),
      };

      // Ajouter au début et éviter les doublons
      const updated = [
        newEntry,
        ...history.filter((m) => m.id !== medicineId),
      ].slice(0, 10);

      localStorage.setItem("medicineHistory", JSON.stringify(updated));
    }
  };

  // Filtrer les médicaments en temps réel
  const filteredMedicines = useMemo(() => {
    const list = medicinesList;
    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase();
    return list.filter((med) =>
      med.name.toLowerCase().includes(query) ||
      med.dosage.toLowerCase().includes(query) ||
      med.form.toLowerCase().includes(query) ||
      med.manufacturer.toLowerCase().includes(query)
    );
  }, [searchQuery, medicinesList]);

  const showMedicine = (id: string, name: string) => () => {
    addToHistory(id, name);
    router.push(`/home/details/${id}`);
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
        {filteredMedicines.map((item, index) => {
          const pharmaciesAvailable = pharmaciesMap[item.id] ?? [];
          return (
            <div
              onClick={showMedicine(item.id, item.name)}
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

                {/* Prix + fabricant */}
                <div className="text-sm text-black/40 flex justify-between">
                  <span className="font-medium">{item.price} FCFA</span>
                  <span className="text-xs">{item.manufacturer}</span>
                </div>

                {/* Dosage + Forme */}
                <div className="text-xs text-black/30">
                  {item.dosage} — {item.form}
                </div>

                {/* Disponibilité générale */}
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

                {/* Pharmacies disponibles */}
                <div className="text-xs mt-2 pt-2 border-t border-black/10">
                  <div className="text-black/40 font-medium mb-1">
                    Disponible dans {pharmaciesAvailable.length} pharmacie
                    {pharmaciesAvailable.length !== 1 ? "s" : ""}:
                  </div>
                  <div className="space-y-1">
                    {pharmaciesAvailable.slice(0, 2).map((pharm) => (
                      <Link key={pharm.id} href={`/pharmacies/${pharm.id}?key=${item.id}`}>
                        <div onClick={(e) => e.stopPropagation()} className="text-black/60">
                          <span className="font-medium">{pharm.name}</span>
                          <span className="text-black/40"> - {pharm.medicinePrice} FCFA</span>
                        </div>
                      </Link>
                    ))}
                    {pharmaciesAvailable.length > 2 && (
                      <div className="text-blue-600 text-xs font-medium">
                        +{pharmaciesAvailable.length - 2} autre{pharmaciesAvailable.length - 2 !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
