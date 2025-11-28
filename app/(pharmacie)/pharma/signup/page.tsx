"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import GlassSurface from "@/components/GlassSurface";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupPharmacy } from "@/lib/api/pharmacies-auth";

interface FormData {
  name: string;
  location: string;
  city: string;
  phone: string;
  email: string;
  address: string;
  opening_hours: string;
  description: string;
  password: string;
  latitude: number | null;
  longitude: number | null;
}

const PharmacySignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    city: "",
    phone: "",
    email: "",
    address: "",
    opening_hours: "",
    description: "",
    password: "",
    latitude: null,
    longitude: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);
  const router = useRouter();

  // Charger la carte Leaflet
  useEffect(() => {
    const loadMap = async () => {
      if (typeof window !== "undefined" && !window.L) {
        const L = (await import("leaflet")).default;
        await import("leaflet/dist/leaflet.css");
        window.L = L;
      }
      setMapLoaded(true);
    };
    loadMap();
  }, []);

  // Initialiser la carte
  useEffect(() => {
    if (!mapLoaded || !document.getElementById("map")) return;

    const L = window.L;
    if (!map && L) {
      const newMap = L.map("map").setView([6.8276, 6.7924], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(newMap);

      let marker: any = null;

      newMap.on("click", (e: any) => {
        const { lat, lng } = e.latlng;

        if (marker) {
          newMap.removeLayer(marker);
        }

        marker = L.marker([lat, lng]).addTo(newMap);

        setFormData((prev) => ({
          ...prev,
          latitude: parseFloat(lat.toFixed(8)),
          longitude: parseFloat(lng.toFixed(8)),
        }));
      });

      setMap(newMap);
    }
  }, [mapLoaded, map]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !formData.name ||
      !formData.city ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.password
    ) {
      setError("Veuillez remplir tous les champs requis (nom, ville, téléphone, email, adresse, mot de passe)");
      setLoading(false);
      return;
    }

    if (formData.latitude === null || formData.longitude === null) {
      setError("Veuillez sélectionner une localisation sur la carte");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    try {
      await signupPharmacy({
        name: formData.name,
        location: formData.location,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        opening_hours: formData.opening_hours,
        description: formData.description,
        password: formData.password,
        latitude: formData.latitude,
        longitude: formData.longitude,
      });

      // Redirection vers la page de connexion
      router.push("/pharma/signin?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen py-8">
      <Navbar />
      <div className="absolute z-10 w-full flex flex-col items-center justify-center gap-3">
        <div className="w-[900px] mb-5">
          <div className="text-8xl font-[800] relative mb-4">
            S'inscrire{" "}
            <Image
              src="/images/hand.png"
              alt="hand"
              width={80}
              height={80}
              className="absolute -top-7 -left-7"
            />
          </div>
          <div className="text-md text-black/40">
            Soumettez vos informations en tant que pharmacie pour créer un compte.
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-[900px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col w-[900px]">
          {/* Informations Générales */}
          <div className="text-md text-black/40 mb-3 ml-2">
            Informations Générales
          </div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={loading}
                className="px-6 py-2 rounded-full w-[430px] text-md disabled:opacity-50"
                placeholder="Nom de la pharmacie"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={loading}
                className="px-6 py-2 rounded-full w-[430px] text-md disabled:opacity-50"
                placeholder="Ville"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={loading}
                className="px-6 py-2 rounded-full w-[430px] text-md disabled:opacity-50"
                placeholder="Localisation/Description du lieu"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={loading}
                className="px-6 py-2 rounded-full w-[430px] text-md disabled:opacity-50"
                placeholder="Adresse"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={loading}
                className="px-6 py-2 rounded-full w-[430px] text-md disabled:opacity-50"
                placeholder="Téléphone"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="text"
                name="opening_hours"
                value={formData.opening_hours}
                onChange={handleInputChange}
                disabled={loading}
                className="px-6 py-2 rounded-full w-[430px] text-md disabled:opacity-50"
                placeholder="Heures d'ouverture (ex: 08:00 - 22:00)"
              />
            </GlassSurface>
          </div>

          {/* Description */}
          <div className="text-md text-black/40 mb-3 ml-2">
            Description (optionnel)
          </div>
          <div className="mb-6">
            <GlassSurface borderRadius={400} className="!w-auto !h-auto !p-2">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={loading}
                className="px-6 py-2 rounded-2xl w-[880px] text-md disabled:opacity-50 resize-none"
                placeholder="Description de votre pharmacie"
                rows={3}
              />
            </GlassSurface>
          </div>

          {/* Carte Interactive */}
          <div className="text-md text-black/40 mb-3 ml-2">
            Sélectionnez votre localisation sur la carte
          </div>
          <div className="mb-6">
            <div
              id="map"
              className="w-full rounded-2xl overflow-hidden"
              style={{ height: "400px" }}
            />
            {formData.latitude !== null && formData.longitude !== null && (
              <div className="mt-2 p-2 bg-green-50 border border-green-300 rounded text-sm text-green-700">
                Localisation sélectionnée: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
              </div>
            )}
          </div>

          {/* Identifiants de Connexion */}
          <div className="text-md text-black/40 mb-3 ml-2">
            Identifiants de Connexion
          </div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                className="px-6 py-2 rounded-full w-[430px] text-md disabled:opacity-50"
                placeholder="Email"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                className="px-6 py-2 rounded-full w-[430px] text-md disabled:opacity-50"
                placeholder="Mot de passe"
              />
            </GlassSurface>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white p-6 rounded-full cursor-pointer hover:bg-green-800 duration-400 mt-4 w-[300px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-black/60">
          Déjà un compte?{" "}
          <Link href="/pharma/signin" className="text-green-600 font-semibold hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PharmacySignUp;
