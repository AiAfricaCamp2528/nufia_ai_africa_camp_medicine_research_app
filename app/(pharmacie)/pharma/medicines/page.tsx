"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlassSurface from "@/components/GlassSurface";
import { getPharmacyInventory, deleteFromInventory, InventoryRow } from "@/lib/api/inventory";
import { Navigation2 } from "@deemlol/next-icons";

interface Pharmacy {
  id: string;
  name: string;
  [key: string]: any;
}

const PharmacistMedicines = () => {
  const router = useRouter();
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [inventory, setInventory] = useState<InventoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if pharmacy is logged in
    const pharmacyAuth = localStorage.getItem('pharmacyAuth');
    if (!pharmacyAuth) {
      router.push("/pharma/signin");
      return;
    }

    try {
      const pharmacyData: Pharmacy = JSON.parse(pharmacyAuth);
      setPharmacy(pharmacyData);

      // Load inventory
      getPharmacyInventory(pharmacyData.id)
        .then((data) => {
          setInventory(data);
        })
        .catch((err) => {
          console.error('Failed to load inventory', err);
        })
        .finally(() => {
          setLoading(false);
        });

    } catch (e) {
      console.error('Failed to load pharmacy:', e);
      router.push("/pharma/signin");
      return;
    }
  }, [router]);

  const filteredInventory = useMemo(() => {
    if (!searchTerm.trim()) return inventory;
    const query = searchTerm.toLowerCase();
    return inventory.filter((item) =>
      item.medicines.name.toLowerCase().includes(query) ||
      item.medicines.manufacturer?.toLowerCase().includes(query)
    );
  }, [searchTerm, inventory]);

  const handleDelete = async (inventoryId: string) => {
    if (!pharmacy) return;
    if (confirm("Êtes-vous sûr de vouloir supprimer ce médicament de votre inventaire ?")) {
      try {
        await deleteFromInventory(pharmacy.id, inventoryId);
        setInventory(prev => prev.filter(item => item.id !== inventoryId));
      } catch (error) {
        console.error("Failed to delete", error);
        alert("Erreur lors de la suppression");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <p className="text-gray-600 text-lg">Chargement...</p>
      </div>
    );
  }

  if (!pharmacy) return null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#f8f9fa]">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-10"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 -z-10"></div>

      {/* Header */}
      <header className="relative z-20 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-[800]">
              Gestion des médicaments
              <Image
                src="/images/star.png"
                alt="star"
                width={50}
                height={50}
                className="inline-block ml-2 -mt-2"
              />
            </h1>
          </div>
          <div className="flex gap-4">
            <Link
              href="/pharma/medicines/add"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition shadow-lg"
            >
              + Ajouter un médicament
            </Link>
            <Link
              href="/pharma/dashboard"
              className="text-black/60 hover:text-black font-semibold transition py-2"
            >
              ← Tableau de bord
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col items-center">
        {/* Search Bar */}
        <GlassSurface borderRadius={400} className="!w-auto mb-12">
          <input
            type="text"
            className="px-6 py-4 mr-2 rounded-full w-[700px] text-xl bg-transparent focus:outline-none"
            placeholder="Rechercher dans votre stock..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

        <div className="text-md text-black/50 w-full mb-4 max-w-[1200px]">
          Votre stock{" "}
          <span className="font-semibold">({filteredInventory.length})</span>{" "}
        </div>

        {/* Grid */}
        <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredInventory.map((item) => (
            <div
              key={item.id}
              className="h-50 group cursor-pointer mb-6 relative"
              onClick={() => router.push(`/pharma/medicines/${item.id}`)}
            >
              {/* Card Content */}
              <div className="h-30 w-full rounded-md bg-black/10 overflow-hidden group-hover:scale-105 duration-300 relative">
                <Image
                  src="/images/hand.png"
                  alt={item.medicines.name}
                  width={20}
                  height={20}
                  className="w-full h-full object-cover opacity-50"
                />
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link
                    href={`/pharma/medicines/${item.id}/edit`}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white p-2 rounded-full hover:bg-gray-100"
                    title="Modifier"
                  >
                    ✏️
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="bg-white p-2 rounded-full hover:bg-red-50 text-red-500"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="pt-2 space-y-1">
                <div className="font-semibold">{item.medicines.name}</div>

                <div className="text-sm text-black/40 flex justify-between">
                  <span className="font-medium text-green-600">{item.price} FCFA</span>
                  <span className="text-xs">{item.medicines.manufacturer}</span>
                </div>

                <div className="text-xs text-black/30">
                  {item.medicines.dosage} — {item.medicines.form}
                </div>

                <div className={`text-xs font-medium ${item.availability === "in_stock" ? "text-green-600" :
                    item.availability === "low_stock" ? "text-orange-500" : "text-red-500"
                  }`}>
                  {item.availability === "in_stock" && "En stock"}
                  {item.availability === "low_stock" && "Stock limité"}
                  {item.availability === "out_of_stock" && "Rupture"}
                  <span className="text-black/40 ml-1">({item.stock} unités)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-black/60">Aucun médicament trouvé dans votre inventaire.</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default PharmacistMedicines;
