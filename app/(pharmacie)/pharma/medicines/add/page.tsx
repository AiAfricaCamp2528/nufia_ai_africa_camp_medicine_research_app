"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlassSurface from "@/components/GlassSurface";
import { createNewMedicine } from "@/lib/api/inventory";

interface FormData {
    // Medicine Details
    name: string;
    dosage: string;
    form: string;
    manufacturer: string;
    description: string;

    // Inventory Details
    price: number;
    stock: number;
    availability: "in_stock" | "low_stock" | "out_of_stock";
}

const AddMedicine = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        dosage: "",
        form: "",
        manufacturer: "",
        description: "",
        price: 0,
        stock: 0,
        availability: "in_stock",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [pharmacyId, setPharmacyId] = useState<string | null>(null);

    useEffect(() => {
        const pharmacyAuth = localStorage.getItem('pharmacyAuth');
        if (!pharmacyAuth) {
            router.push("/pharma/signin");
            return;
        }
        try {
            const pharmacyData = JSON.parse(pharmacyAuth);
            setPharmacyId(pharmacyData.id);
        } catch (e) {
            router.push("/pharma/signin");
        }
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pharmacyId) return;
        setLoading(true);
        setError("");

        if (!formData.name || !formData.manufacturer || !formData.price || !formData.stock) {
            setError("Veuillez remplir les champs obligatoires (Nom, Fabricant, Prix, Stock)");
            setLoading(false);
            return;
        }

        try {
            await createNewMedicine(pharmacyId, formData);
            router.push("/pharma/medicines");
        } catch (error) {
            console.error("Failed to add medicine", error);
            setError("Erreur lors de l'ajout du médicament. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    if (!pharmacyId) return null;

    return (
        <div className="relative w-full min-h-screen py-8 bg-[#f8f9fa] overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob -z-10"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 -z-10"></div>

            <div className="absolute z-10 w-full flex flex-col items-center justify-center gap-3">
                <div className="w-[900px] mb-5">
                    <Link href="/pharma/medicines" className="text-black/50 hover:text-black mb-4 inline-block transition">
                        ← Retour aux médicaments
                    </Link>
                    <div className="text-6xl font-[800] relative mb-4">
                        Nouveau Médicament
                        <Image
                            src="/images/hand.png"
                            alt="hand"
                            width={60}
                            height={60}
                            className="absolute -top-5 -left-5"
                        />
                    </div>
                    <div className="text-md text-black/40">
                        Ajoutez un nouveau médicament à votre inventaire et à la base de données globale.
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-[900px]">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col w-[900px]">
                    {/* Informations du Médicament */}
                    <div className="text-md text-black/40 mb-3 ml-2 font-semibold">
                        Informations du Médicament
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="px-6 py-2 rounded-full w-[430px] text-md bg-transparent focus:outline-none placeholder-black/30"
                                placeholder="Nom du médicament *"
                                required
                            />
                        </GlassSurface>
                        <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
                            <input
                                type="text"
                                name="manufacturer"
                                value={formData.manufacturer}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="px-6 py-2 rounded-full w-[430px] text-md bg-transparent focus:outline-none placeholder-black/30"
                                placeholder="Fabricant / Laboratoire *"
                                required
                            />
                        </GlassSurface>
                        <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
                            <input
                                type="text"
                                name="dosage"
                                value={formData.dosage}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="px-6 py-2 rounded-full w-[430px] text-md bg-transparent focus:outline-none placeholder-black/30"
                                placeholder="Dosage (ex: 500mg)"
                            />
                        </GlassSurface>
                        <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
                            <input
                                type="text"
                                name="form"
                                value={formData.form}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="px-6 py-2 rounded-full w-[430px] text-md bg-transparent focus:outline-none placeholder-black/30"
                                placeholder="Forme (ex: Comprimé, Sirop)"
                            />
                        </GlassSurface>
                    </div>

                    {/* Description */}
                    <div className="text-md text-black/40 mb-3 ml-2 font-semibold">
                        Description & Détails
                    </div>
                    <div className="mb-6">
                        <GlassSurface borderRadius={25} className="!w-auto !h-auto !p-4">
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full bg-transparent focus:outline-none text-md resize-none placeholder-black/30"
                                placeholder="Description détaillée, indications, contre-indications..."
                                rows={4}
                            />
                        </GlassSurface>
                    </div>

                    {/* Inventaire & Prix */}
                    <div className="text-md text-black/40 mb-3 ml-2 font-semibold">
                        Inventaire & Prix
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
                            <input
                                type="number"
                                name="price"
                                value={formData.price || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="px-6 py-2 rounded-full w-full text-md bg-transparent focus:outline-none placeholder-black/30"
                                placeholder="Prix (FCFA) *"
                                required
                                min="0"
                            />
                        </GlassSurface>
                        <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock || ''}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="px-6 py-2 rounded-full w-full text-md bg-transparent focus:outline-none placeholder-black/30"
                                placeholder="Stock initial *"
                                required
                                min="0"
                            />
                        </GlassSurface>
                        <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
                            <select
                                name="availability"
                                value={formData.availability}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="px-6 py-2 rounded-full w-full text-md bg-transparent focus:outline-none text-black/70 cursor-pointer"
                            >
                                <option value="in_stock">En stock</option>
                                <option value="low_stock">Stock limité</option>
                                <option value="out_of_stock">Rupture</option>
                            </select>
                        </GlassSurface>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white p-6 rounded-full cursor-pointer hover:bg-green-700 duration-400 mt-4 w-[300px] disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-lg self-end"
                    >
                        {loading ? "Création en cours..." : "Ajouter le médicament"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMedicine;
