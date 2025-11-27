export interface Medicine {
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

export const medicines: Medicine[] = [
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
