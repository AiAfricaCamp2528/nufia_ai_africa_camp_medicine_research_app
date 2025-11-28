"use client";
import React, { useState, useEffect, useMemo } from "react";
import GlassSurface from "./GlassSurface";
import { Navigation2 } from "@deemlol/next-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMedicines } from "@/lib/api/medicines";

interface MedicineHistory {
  id: string | number;
  name: string;
  timestamp: number;
}

interface Medicine {
  id: string | number;
  name: string;
  dosage?: string;
  form?: string;
  manufacturer?: string;
  price?: number;
}

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [medicineHistory, setMedicineHistory] = useState<MedicineHistory[]>([]);
  const [allMedicines, setAllMedicines] = useState<Medicine[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Charger l'historique au montage du composant
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("medicineHistory");
      if (savedHistory) {
        try {
          setMedicineHistory(JSON.parse(savedHistory));
        } catch (error) {
          console.error("Erreur en chargeant l'historique:", error);
        }
      }
    }
  }, []);

  // Charger les médicaments pour l'autocomplétion
  useEffect(() => {
    getMedicines()
      .then((data) => {
        const normalized = data.map((m: { id: unknown; name: string; dosage: unknown; form: unknown; manufacturer: unknown; price: unknown; }) => ({
          id: m.id,
          name: m.name,
          dosage: (m.dosage as string) ?? '',
          form: (m.form as string) ?? '',
          manufacturer: (m.manufacturer as string) ?? '',
          price: (m.price as number) ?? 0,
        }));
        setAllMedicines(normalized);
      })
      .catch((err) => console.error('Failed to load medicines', err));
  }, []);

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.autocomplete-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Générer les suggestions basées sur la requête de recherche
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allMedicines
      .filter((med) =>
        med.name.toLowerCase().includes(query) ||
        med.dosage.toLowerCase().includes(query) ||
        med.form.toLowerCase().includes(query) ||
        med.manufacturer.toLowerCase().includes(query)
      )
      .slice(0, 5); // Limiter à 5 suggestions
  }, [searchQuery, allMedicines]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      router.push(`/home?search=${encodedQuery}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (medicine: Medicine) => {
    setSearchQuery(medicine.name);
    setShowSuggestions(false);
    const encodedQuery = encodeURIComponent(medicine.name);
    router.push(`/home?search=${encodedQuery}`);
  };

  const handleMedicineClick = (medicine: MedicineHistory) => {
    // Rediriger vers la page détail du médicament
    router.push(`/home/details/${medicine.id}`);
  };

  // Afficher seulement les 3 derniers médicaments consultés
  const recentMedicines = medicineHistory.slice(0, 3);

  const popularSearches = [
    { name: "Paracétamol", searches: 500 },
    { name: "Foliron", searches: 194 },
    { name: "Ca-C1000", searches: 98 },
  ];


  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute z-10 w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="w-[750px] mb-3">
          <div className="text-8xl font-[800] relative">
            Médiloc{" "}
            <Image
              src="/images/star.png"
              alt="hand"
              width={80}
              height={80}
              className="absolute -top-10 -left-10"
            />
          </div>
          <div className="text-md max-w-[400px] text-black/40">
            Faites des recherches de vos médicaments afin de ne pas vous
            déplacer pour rien.
          </div>
        </div>
        <div className="relative autocomplete-container">
          <GlassSurface borderRadius={400} className="!w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              className="px-6 py-4 mr-2 rounded-full w-[700px] text-xl outline-none"
              placeholder="Quel médicament recherchez-vous ?"
            />
            <button
              onClick={handleSearch}
              className="bg-green-600 text-white p-4 rounded-full cursor-pointer hover:bg-green-800 duration-400"
            >
              <Navigation2
                size={24}
                color="#FFFFFF"
                style={{ transform: "rotate(90deg)" }}
              />
            </button>
          </GlassSurface>

          {/* Dropdown avec suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[700px] bg-white rounded-lg shadow-lg mt-2 z-50 max-h-64 overflow-y-auto">
              {suggestions.map((medicine) => (
                <div
                  key={medicine.id}
                  onClick={() => handleSuggestionClick(medicine)}
                  className="px-6 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0 transition"
                >
                  <div className="font-semibold text-gray-900">{medicine.name}</div>
                  <div className="text-xs text-gray-500">
                    {medicine.dosage} • {medicine.form} • {medicine.manufacturer}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section historique des médicaments consultés */}
        {recentMedicines.length > 0 && (
          <div className="mt-16 w-[750px]">
            <div className="text-sm text-black/40 underline mb-3">
              Vos consultations récentes
            </div>
            <div className="w-full grid grid-cols-3 gap-4">
              {recentMedicines.map((medicine) => (
                <div
                  key={medicine.id}
                  onClick={() => handleMedicineClick(medicine)}
                  className="h-50 group cursor-pointer"
                >
                  <div className="h-30 w-full rounded-md bg-black/10 overflow-hidden group-hover:scale-105 duration-300">
                    <Image
                      src="/images/hand.png"
                      alt={medicine.name}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="h-20 pt-2">
                    <div className="">{medicine.name}</div>
                    <div className="text-sm text-black/30">Consulté récemment</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section recherches populaires (affichée si pas d'historique) */}
        {recentMedicines.length === 0 && (
          <div className="mt-16 w-[750px]">
            <div className="text-sm text-black/40 underline mb-3">
              Les plus recherchés
            </div>
            <div className="w-full grid grid-cols-3 gap-4">
              {popularSearches.map((item, index) => (
                <div key={index} className="h-50 group cursor-pointer">
                  <div className="h-30 w-full rounded-md bg-black/10 overflow-hidden group-hover:scale-105 duration-300">
                    <Image src="/images/hand.png" alt="image" width={20} height={20} />
                  </div>
                  <div className="h-20 pt-2">
                    <div className="">{item.name}</div>
                    <div className="text-sm text-black/30">{item.searches} recherches</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
