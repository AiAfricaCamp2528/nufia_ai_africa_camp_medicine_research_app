"use client";

import React from "react";
import GlassSurface from "./GlassSurface";
import { Navigation2 } from "@deemlol/next-icons";
import Image from "next/image";

interface Medicine {
  name: string;
  dosage: string;
  form: string;
  description: string;
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  manufacturer: string;
  availability: "in_stock" | "low_stock" | "out_of_stock";
  price: number;
}

const search = () => {
  const loadSearchResults = () => {
    // Logic to load search results goes here
  };

  const medicines = [
    {
      name: "Paracétamol",
      dosage: "500mg",
      form: "Comprimé",
      description:
        "Antalgique et antipyrétique utilisé pour soulager la douleur et faire baisser la fièvre.",
      indications: ["Fièvre", "Douleurs légères à modérées", "Céphalées"],
      contraindications: [
        "Insuffisance hépatique sévère",
        "Allergie au paracétamol",
      ],
      sideEffects: ["Nausées", "Éruption cutanée"],
      manufacturer: "Sanofi",
      availability: "in_stock",
      price: 500,
    },
    {
      name: "Ibuprofène",
      dosage: "400mg",
      form: "Comprimé",
      description:
        "Anti-inflammatoire non stéroïdien utilisé contre la douleur et l’inflammation.",
      indications: ["Céphalées", "Douleurs musculaires", "Inflammations"],
      contraindications: [
        "Ulcère gastrique",
        "Grossesse 3e trimestre",
        "Allergie AINS",
      ],
      sideEffects: ["Douleurs abdominales", "Vertiges"],
      manufacturer: "GSK",
      availability: "low_stock",
      price: 1200,
    },
    {
      name: "Foliron",
      dosage: "200mg",
      form: "Gélule",
      description:
        "Supplément de fer utilisé pour traiter l’anémie due à une carence en fer.",
      indications: ["Anémie ferriprive", "Fatigue due au manque de fer"],
      contraindications: ["Hémochromatose", "Allergie au produit"],
      sideEffects: ["Constipation", "Douleurs abdominales"],
      manufacturer: "Ferrer Pharma",
      availability: "in_stock",
      price: 1500,
    },
    {
      name: "Ca-C1000",
      dosage: "1000mg",
      form: "Comprimé effervescent",
      description:
        "Source de vitamine C renforçant l’immunité et réduisant la fatigue.",
      indications: ["Fatigue", "Renforcement immunitaire"],
      contraindications: ["Calculs rénaux", "Excès de vitamine C"],
      sideEffects: ["Diarrhée légère"],
      manufacturer: "Bayer",
      availability: "in_stock",
      price: 1000,
    },
    {
      name: "Amoxicilline",
      dosage: "1g",
      form: "Comprimé",
      description:
        "Antibiotique de la famille des pénicillines utilisé pour traiter diverses infections.",
      indications: [
        "Infections respiratoires",
        "Infections ORL",
        "Infections urinaires",
      ],
      contraindications: ["Allergie aux pénicillines"],
      sideEffects: ["Diarrhée", "Éruptions cutanées"],
      manufacturer: "Sandoz",
      availability: "out_of_stock",
      price: 2500,
    },
    {
      name: "Doliprane",
      dosage: "1000mg",
      form: "Comprimé",
      description: "Antalgique très utilisé pour la fièvre et les douleurs.",
      indications: ["Fièvre", "Douleurs musculaires"],
      contraindications: ["Maladie du foie"],
      sideEffects: ["Allergies cutanées"],
      manufacturer: "Sanofi",
      availability: "in_stock",
      price: 800,
    },
    {
      name: "Cotrimoxazole",
      dosage: "800/160mg",
      form: "Comprimé",
      description:
        "Antibiotique combiné pour traiter des infections bactériennes diverses.",
      indications: ["Infections urinaires", "Bronchites"],
      contraindications: ["Grossesse", "Allergie sulfamides"],
      sideEffects: ["Nausées", "Photosensibilité"],
      manufacturer: "Roche",
      availability: "low_stock",
      price: 2000,
    },
    {
      name: "Metformine",
      dosage: "850mg",
      form: "Comprimé",
      description:
        "Médicament antidiabétique diminuant la production de glucose par le foie.",
      indications: ["Diabète de type 2"],
      contraindications: ["Insuffisance rénale sévère"],
      sideEffects: ["Troubles digestifs"],
      manufacturer: "Merck",
      availability: "in_stock",
      price: 1200,
    },
    {
      name: "Oméprazole",
      dosage: "20mg",
      form: "Gélule",
      description:
        "Inhibiteur de pompe à protons pour réduire l’acidité gastrique.",
      indications: ["Reflux gastro-œsophagien", "Ulcères"],
      contraindications: ["Allergie aux IPP"],
      sideEffects: ["Maux de tête"],
      manufacturer: "Pfizer",
      availability: "in_stock",
      price: 1800,
    },
    {
      name: "Loratadine",
      dosage: "10mg",
      form: "Comprimé",
      description: "Antihistaminique utilisé pour les allergies.",
      indications: ["Rhinite allergique", "Urticaire"],
      contraindications: ["Insuffisance hépatique sévère"],
      sideEffects: ["Somnolence légère"],
      manufacturer: "Teva",
      availability: "in_stock",
      price: 900,
    },
    {
      name: "Cetirizine",
      dosage: "10mg",
      form: "Comprimé",
      description: "Antihistaminique moderne pour les allergies saisonnières.",
      indications: ["Allergies", "Urticaire"],
      contraindications: ["Insuffisance rénale"],
      sideEffects: ["Fatigue"],
      manufacturer: "Sandoz",
      availability: "low_stock",
      price: 700,
    },
    {
      name: "Azythromycine",
      dosage: "500mg",
      form: "Comprimé",
      description:
        "Antibiotique largement utilisé dans les infections respiratoires.",
      indications: ["Angine", "Bronchite"],
      contraindications: ["Allergie macrolides"],
      sideEffects: ["Troubles digestifs"],
      manufacturer: "Pfizer",
      availability: "out_of_stock",
      price: 2800,
    },
    {
      name: "Dolosport",
      dosage: "250mg",
      form: "Gélule",
      description: "Analgésique pour douleurs musculaires et courbatures.",
      indications: ["Douleurs musculaires"],
      contraindications: ["Insuffisance rénale sévère"],
      sideEffects: ["Somnolence"],
      manufacturer: "Biogaran",
      availability: "in_stock",
      price: 600,
    },
    {
      name: "Rhinadvil",
      dosage: "200mg",
      form: "Comprimé",
      description:
        "Médicament contre le rhume associant anti-inflammatoire et décongestionnant.",
      indications: ["Rhume", "Congestion nasale"],
      contraindications: ["Hypertension", "Grossesse"],
      sideEffects: ["Palpitations"],
      manufacturer: "Pfizer",
      availability: "low_stock",
      price: 1500,
    },
    {
      name: "Smecta",
      dosage: "3g",
      form: "Sachet",
      description: "Traitement contre la diarrhée et les douleurs abdominales.",
      indications: ["Diarrhée", "Gastro"],
      contraindications: ["Occlusion intestinale"],
      sideEffects: ["Constipation"],
      manufacturer: "Ipsen",
      availability: "in_stock",
      price: 900,
    },
    {
      name: "Polygel",
      dosage: "5ml",
      form: "Sirop",
      description: "Antiacide utilisé en cas de brûlures d’estomac.",
      indications: ["Reflux", "Brûlures gastriques"],
      contraindications: ["Insuffisance rénale"],
      sideEffects: ["Diarrhée"],
      manufacturer: "Johnson & Johnson",
      availability: "in_stock",
      price: 700,
    },
    {
      name: "Fervex",
      dosage: "Sachet",
      form: "Poudre",
      description: "Traitement symptomatique du rhume et des états grippaux.",
      indications: ["Fièvre", "Rhume", "Douleurs"],
      contraindications: ["Hypertension", "Allergie paracétamol"],
      sideEffects: ["Somnolence"],
      manufacturer: "Upsa",
      availability: "out_of_stock",
      price: 1600,
    },
    {
      name: "Vitamin B Complex",
      dosage: "500mg",
      form: "Comprimé",
      description: "Complément multivitaminé pour énergie et système nerveux.",
      indications: ["Fatigue", "Déficit en vitamines B"],
      contraindications: ["Excès de vitamines B"],
      sideEffects: ["Urines jaunes vives"],
      manufacturer: "Solgar",
      availability: "in_stock",
      price: 2500,
    },
    {
      name: "Zinc Plus",
      dosage: "50mg",
      form: "Comprimé",
      description: "Supplément pour immunité et peau.",
      indications: ["Déficit en zinc", "Acné"],
      contraindications: ["Excès de zinc"],
      sideEffects: ["Nausées"],
      manufacturer: "Nature’s Bounty",
      availability: "in_stock",
      price: 1400,
    },
    {
      name: "Metoprolol",
      dosage: "50mg",
      form: "Comprimé",
      description:
        "Bêtabloquant utilisé pour traiter l’hypertension et les palpitations.",
      indications: ["Hypertension", "Tachycardie"],
      contraindications: ["Asthme sévère"],
      sideEffects: ["Fatigue"],
      manufacturer: "AstraZeneca",
      availability: "low_stock",
      price: 3000,
    },
    {
      name: "Clarithromycine",
      dosage: "500mg",
      form: "Comprimé",
      description:
        "Antibiotique utilisé dans les infections ORL et respiratoires.",
      indications: ["Sinusite", "Bronchite"],
      contraindications: ["Allergie macrolides"],
      sideEffects: ["Goût métallique"],
      manufacturer: "Abbott",
      availability: "out_of_stock",
      price: 2600,
    },
  ];

  return (
    <div className="pt-8 flex flex-col items-center">
      <GlassSurface borderRadius={400} className="!w-auto mb-12">
        <input
          type="text"
          className="px-6 py-4 mr-2 rounded-full w-[700px] text-xl"
          placeholder="Quel médicament recherchez-vous ?"
        />
        <button
          onClick={loadSearchResults}
          className="bg-green-600 text-white p-4 rounded-full cursor-pointer hover:bg-green-800 duration-400"
        >
          <Navigation2
            size={24}
            color="#FFFFFF"
            style={{ transform: "rotate(90deg)" }}
          />
        </button>
      </GlassSurface>

<div className="text-md text-black/50">Listes des médicaments <span className="font-semibold">({medicines.length})</span> </div>
      <div className="md:w-[1200px] h-[calc(100vh-100px)] overflow-y-scroll grid grid-cols-4 gap-6">
        {medicines.map((item, index) => (
          <div key={index} className="h-50 group cursor-pointer mb-6">
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

export default search;
