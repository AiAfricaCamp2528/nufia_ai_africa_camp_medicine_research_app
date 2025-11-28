"use client";

import Image from "next/image";
import React, { useState } from "react";
import GlassSurface from "@/components/GlassSurface";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signinPharmacy } from "@/lib/api/pharmacies-auth";

const PharmacySignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "true";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    try {
      const response = await signinPharmacy({ email, password });
      // Store pharmacy auth data in localStorage
      if (response.pharmacy) {
        localStorage.setItem('pharmacyAuth', JSON.stringify(response.pharmacy));
      }
      router.push("/pharma/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Navbar />
      <div className="absolute z-10 w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="w-[500px] mb-5">
          <div className="text-8xl font-[800] relative mb-4">
            Connexion{" "}
            <Image
              src="/images/star.png"
              alt="star"
              width={90}
              height={90}
              className="absolute -top-7 -left-7"
            />
          </div>
          <div className="text-md text-black/40">
            Saisissez vos identifiants pour vous connecter à votre pharmacie.
          </div>
        </div>

        {registered && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded w-[500px]">
            Inscription réussie! Veuillez maintenant vous connecter.
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded w-[500px]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="px-6 py-2 rounded-full w-[500px] text-md disabled:opacity-50"
                placeholder="Entrer votre email"
              />
            </GlassSurface>
            <GlassSurface borderRadius={400} className="!w-auto !h-15 !p-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="px-6 py-2 rounded-full w-[500px] text-md disabled:opacity-50"
                placeholder="Entrer votre mot de passe"
              />
            </GlassSurface>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white p-6 rounded-full cursor-pointer hover:bg-green-800 duration-400 mt-4 w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Connexion en cours..." : "Se Connecter"}
          </button>
        </form>

        <div className="mt-6 text-black/60">
          Pas encore de compte?{" "}
          <Link href="/pharma/signup" className="text-green-600 font-semibold hover:underline">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PharmacySignIn;
