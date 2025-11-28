// Pharmacy mock data
export interface Pharmacy {
  id: string;
  name: string;
  location: string;
  city: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  latitude: number;
  longitude: number;
  image: string;
  description: string;
}

export const pharmacies: Pharmacy[] = [
  {
    id: "pharm-001",
    name: "Pharmacie Central",
    location: "Plateau",
    city: "Abidjan",
    phone: "+225 22 44 55 66",
    email: "contact@pharmaciecentral.ci",
    address: "Avenue Marchand, Plateau",
    openingHours: "08:00 - 22:00",
    latitude: 5.3364,
    longitude: -4.0383,
    image: "/images/pharmacy-central.jpg",
    description: "Pharmacie principale avec large sélection de médicaments et services de consultation"
  },
  {
    id: "pharm-002",
    name: "Pharmacie Santé Plus",
    location: "Cocody",
    city: "Abidjan",
    phone: "+225 22 77 88 99",
    email: "sante@santeplusci.ci",
    address: "Boulevard de la Paix, Cocody",
    openingHours: "07:00 - 23:00",
    latitude: 5.3516,
    longitude: -4.0021,
    image: "/images/pharmacy-sante.jpg",
    description: "Pharmacie spécialisée avec équipe de pharmaciens expérimentés"
  },
  {
    id: "pharm-003",
    name: "Pharmacie Étoile",
    location: "Riviera",
    city: "Abidjan",
    phone: "+225 22 11 22 33",
    email: "info@pharmacieetoile.ci",
    address: "Rue du Commerce, Riviera",
    openingHours: "06:00 - 21:00",
    latitude: 5.3741,
    longitude: -4.0144,
    image: "/images/pharmacy-etoile.jpg",
    description: "Pharmacie de proximité avec service de livraison à domicile"
  }
];
