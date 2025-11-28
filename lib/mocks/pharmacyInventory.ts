// Pharmacy Inventory - Links medicines to pharmacies with stock information
export interface PharmacyInventoryItem {
  id: string;
  medicineId: number; // Index in medicines array
  pharmacyId: string;
  stock: number;
  price: number; // Can vary by pharmacy
  availability: "in_stock" | "low_stock" | "out_of_stock";
  lastRestocked: string; // ISO date
}

export const pharmacyInventory: PharmacyInventoryItem[] = [
  // Pharmacie Central - 15 medicines
  {
    id: "inv-001",
    medicineId: 0,
    pharmacyId: "pharm-001",
    stock: 150,
    price: 2500,
    availability: "in_stock",
    lastRestocked: "2025-11-25"
  },
  {
    id: "inv-002",
    medicineId: 1,
    pharmacyId: "pharm-001",
    stock: 80,
    price: 3500,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-003",
    medicineId: 2,
    pharmacyId: "pharm-001",
    stock: 5,
    price: 12000,
    availability: "low_stock",
    lastRestocked: "2025-11-20"
  },
  {
    id: "inv-004",
    medicineId: 3,
    pharmacyId: "pharm-001",
    stock: 120,
    price: 5000,
    availability: "in_stock",
    lastRestocked: "2025-11-25"
  },
  {
    id: "inv-005",
    medicineId: 4,
    pharmacyId: "pharm-001",
    stock: 45,
    price: 8500,
    availability: "in_stock",
    lastRestocked: "2025-11-24"
  },
  {
    id: "inv-006",
    medicineId: 5,
    pharmacyId: "pharm-001",
    stock: 200,
    price: 1800,
    availability: "in_stock",
    lastRestocked: "2025-11-27"
  },
  {
    id: "inv-007",
    medicineId: 6,
    pharmacyId: "pharm-001",
    stock: 0,
    price: 6500,
    availability: "out_of_stock",
    lastRestocked: "2025-11-15"
  },
  {
    id: "inv-008",
    medicineId: 7,
    pharmacyId: "pharm-001",
    stock: 90,
    price: 4200,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-009",
    medicineId: 8,
    pharmacyId: "pharm-001",
    stock: 60,
    price: 7500,
    availability: "in_stock",
    lastRestocked: "2025-11-25"
  },
  {
    id: "inv-010",
    medicineId: 9,
    pharmacyId: "pharm-001",
    stock: 110,
    price: 3200,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-011",
    medicineId: 10,
    pharmacyId: "pharm-001",
    stock: 10,
    price: 15000,
    availability: "low_stock",
    lastRestocked: "2025-11-22"
  },
  {
    id: "inv-012",
    medicineId: 11,
    pharmacyId: "pharm-001",
    stock: 75,
    price: 2900,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-013",
    medicineId: 12,
    pharmacyId: "pharm-001",
    stock: 55,
    price: 5800,
    availability: "in_stock",
    lastRestocked: "2025-11-24"
  },
  {
    id: "inv-014",
    medicineId: 13,
    pharmacyId: "pharm-001",
    stock: 40,
    price: 9200,
    availability: "in_stock",
    lastRestocked: "2025-11-23"
  },
  {
    id: "inv-015",
    medicineId: 14,
    pharmacyId: "pharm-001",
    stock: 70,
    price: 4500,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },

  // Pharmacie Santé Plus - 12 medicines
  {
    id: "inv-016",
    medicineId: 0,
    pharmacyId: "pharm-002",
    stock: 100,
    price: 2400,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-017",
    medicineId: 1,
    pharmacyId: "pharm-002",
    stock: 50,
    price: 3600,
    availability: "in_stock",
    lastRestocked: "2025-11-25"
  },
  {
    id: "inv-018",
    medicineId: 3,
    pharmacyId: "pharm-002",
    stock: 80,
    price: 5100,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-019",
    medicineId: 5,
    pharmacyId: "pharm-002",
    stock: 160,
    price: 1900,
    availability: "in_stock",
    lastRestocked: "2025-11-27"
  },
  {
    id: "inv-020",
    medicineId: 7,
    pharmacyId: "pharm-002",
    stock: 3,
    price: 4300,
    availability: "low_stock",
    lastRestocked: "2025-11-20"
  },
  {
    id: "inv-021",
    medicineId: 9,
    pharmacyId: "pharm-002",
    stock: 95,
    price: 3100,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-022",
    medicineId: 11,
    pharmacyId: "pharm-002",
    stock: 120,
    price: 2800,
    availability: "in_stock",
    lastRestocked: "2025-11-27"
  },
  {
    id: "inv-023",
    medicineId: 13,
    pharmacyId: "pharm-002",
    stock: 65,
    price: 9000,
    availability: "in_stock",
    lastRestocked: "2025-11-25"
  },
  {
    id: "inv-024",
    medicineId: 15,
    pharmacyId: "pharm-002",
    stock: 45,
    price: 6200,
    availability: "in_stock",
    lastRestocked: "2025-11-24"
  },
  {
    id: "inv-025",
    medicineId: 16,
    pharmacyId: "pharm-002",
    stock: 0,
    price: 7800,
    availability: "out_of_stock",
    lastRestocked: "2025-11-18"
  },
  {
    id: "inv-026",
    medicineId: 18,
    pharmacyId: "pharm-002",
    stock: 35,
    price: 11500,
    availability: "in_stock",
    lastRestocked: "2025-11-23"
  },
  {
    id: "inv-027",
    medicineId: 20,
    pharmacyId: "pharm-002",
    stock: 85,
    price: 3800,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },

  // Pharmacie Étoile - 14 medicines
  {
    id: "inv-028",
    medicineId: 0,
    pharmacyId: "pharm-003",
    stock: 130,
    price: 2450,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-029",
    medicineId: 2,
    pharmacyId: "pharm-003",
    stock: 25,
    price: 11800,
    availability: "in_stock",
    lastRestocked: "2025-11-24"
  },
  {
    id: "inv-030",
    medicineId: 4,
    pharmacyId: "pharm-003",
    stock: 38,
    price: 8600,
    availability: "in_stock",
    lastRestocked: "2025-11-25"
  },
  {
    id: "inv-031",
    medicineId: 6,
    pharmacyId: "pharm-003",
    stock: 15,
    price: 6400,
    availability: "low_stock",
    lastRestocked: "2025-11-19"
  },
  {
    id: "inv-032",
    medicineId: 8,
    pharmacyId: "pharm-003",
    stock: 72,
    price: 7400,
    availability: "in_stock",
    lastRestocked: "2025-11-25"
  },
  {
    id: "inv-033",
    medicineId: 10,
    pharmacyId: "pharm-003",
    stock: 28,
    price: 14500,
    availability: "in_stock",
    lastRestocked: "2025-11-23"
  },
  {
    id: "inv-034",
    medicineId: 12,
    pharmacyId: "pharm-003",
    stock: 90,
    price: 5900,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-035",
    medicineId: 14,
    pharmacyId: "pharm-003",
    stock: 55,
    price: 4600,
    availability: "in_stock",
    lastRestocked: "2025-11-25"
  },
  {
    id: "inv-036",
    medicineId: 17,
    pharmacyId: "pharm-003",
    stock: 42,
    price: 8800,
    availability: "in_stock",
    lastRestocked: "2025-11-24"
  },
  {
    id: "inv-037",
    medicineId: 19,
    pharmacyId: "pharm-003",
    stock: 8,
    price: 13200,
    availability: "low_stock",
    lastRestocked: "2025-11-21"
  },
  {
    id: "inv-038",
    medicineId: 1,
    pharmacyId: "pharm-003",
    stock: 65,
    price: 3700,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-039",
    medicineId: 5,
    pharmacyId: "pharm-003",
    stock: 175,
    price: 1850,
    availability: "in_stock",
    lastRestocked: "2025-11-27"
  },
  {
    id: "inv-040",
    medicineId: 11,
    pharmacyId: "pharm-003",
    stock: 105,
    price: 2950,
    availability: "in_stock",
    lastRestocked: "2025-11-26"
  },
  {
    id: "inv-041",
    medicineId: 9,
    pharmacyId: "pharm-003",
    stock: 0,
    price: 3300,
    availability: "out_of_stock",
    lastRestocked: "2025-11-17"
  }
];

// Helper function to get medicines available in a pharmacy
export const getMedicinesByPharmacy = (pharmacyId: string, medicines: any[]) => {
  return pharmacyInventory
    .filter((item) => item.pharmacyId === pharmacyId)
    .map((item) => ({
      ...medicines[item.medicineId],
      pharmacyPrice: item.price,
      pharmacyStock: item.stock,
      inventoryId: item.id
    }))
    .filter((med) => med); // Remove undefined
};

// Helper function to get pharmacies with a specific medicine
export const getPharmaciesWithMedicine = (medicineId: number, pharmaciesData: any[]) => {
  return pharmacyInventory
    .filter((item) => item.medicineId === medicineId)
    .map((item) => {
      const pharmacy = pharmaciesData.find((p) => p.id === item.pharmacyId);
      return {
        ...pharmacy,
        medicinePrice: item.price,
        medicineStock: item.stock,
        availability: item.availability,
        inventoryId: item.id
      };
    })
    .filter((pharm) => pharm && pharm.id); // Remove undefined
};
