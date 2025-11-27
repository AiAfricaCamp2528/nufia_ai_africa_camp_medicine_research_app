// ...existing code...
import React from "react";
import Image from "next/image";
import Link from "next/link";

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

/**
 * Small sample dataset — match the indices used when navigating from the search page.
 * You can replace this with a fetch to your API or a shared data module.
 */
const medicines: Medicine[] = [
  {
    name: "Paracétamol",
    dosage: "500mg",
    form: "Comprimé",
    description:
      "Antalgique et antipyrétique utilisé pour soulager la douleur et faire baisser la fièvre.",
    indications: ["Fièvre", "Douleurs légères à modérées", "Céphalées"],
    contraindications: ["Insuffisance hépatique sévère", "Allergie au paracétamol"],
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
    contraindications: ["Ulcère gastrique", "Grossesse 3e trimestre", "Allergie AINS"],
    sideEffects: ["Douleurs abdominales", "Vertiges"],
    manufacturer: "GSK",
    availability: "low_stock",
    price: 1200,
  },
  {
    name: "Amoxicilline",
    dosage: "1g",
    form: "Comprimé",
    description:
      "Antibiotique de la famille des pénicillines utilisé pour traiter diverses infections.",
    indications: ["Infections respiratoires", "Infections ORL", "Infections urinaires"],
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
];

const availabilityLabel = (a: Medicine["availability"]) =>
  a === "in_stock" ? { text: "Disponible", color: "text-green-600" } : a === "low_stock" ? { text: "Stock limité", color: "text-orange-500" } : { text: "Rupture", color: "text-red-500" };

const Page = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const med = Number.isFinite(id) && medicines[id] ? medicines[id] : null;

  if (!med) {
    return (
      <div className="p-6 md:w-[900px] mx-auto">
        <div className="text-xl font-semibold mb-4">Médicament introuvable</div>
        <div className="mb-6 text-sm text-black/60">Aucun médicament correspondant à cet identifiant.</div>
        <Link href="/home" className="text-blue-600 underline">
          Retour à la recherche
        </Link>
      </div>
    );
  }

  const availability = availabilityLabel(med.availability);

  return (
    <div className="p-6 md:w-[900px] mx-auto">
      <div className="flex items-start gap-6">
        <div className="w-48 h-48 bg-black/5 rounded-md flex items-center justify-center overflow-hidden">
          <Image src="/images/hand.png" alt={med.name} width={250} height={250} className="object-contain" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{med.name}</h1>
              <div className="text-sm text-black/50 mt-1">
                {med.dosage} · {med.form} · <span className="font-medium">{med.manufacturer}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-semibold">{med.price} FCFA</div>
              <div className={`text-xs font-medium mt-2 ${availability.color}`}>{availability.text}</div>
            </div>
          </div>

          <div className="mt-4 text-sm text-black/70">{med.description}</div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold mb-2">Indications</div>
              <ul className="list-disc list-inside text-black/70">
                {med.indications.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-2">Contre-indications</div>
              <ul className="list-disc list-inside text-black/70">
                {med.contraindications.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-2">Effets secondaires</div>
              <ul className="list-disc list-inside text-black/70">
                {med.sideEffects.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Link href="/home" className="px-4 py-2 bg-gray-100 rounded-md text-sm">
              ← Retour
            </Link>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm">
              Ajouter au panier
            </button>
            <div className="text-xs text-black/50 ml-auto">{med.manufacturer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;