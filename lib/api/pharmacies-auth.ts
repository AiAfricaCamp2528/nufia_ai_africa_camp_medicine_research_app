const base = '/api/pharmacies';

export interface PharmacySignupData {
  name: string;
  location: string;
  city: string;
  phone: string;
  email: string;
  address: string;
  opening_hours: string;
  description: string;
  password: string;
  latitude: number;
  longitude: number;
}

export interface PharmacySigninData {
  email: string;
  password: string;
}

export async function signupPharmacy(data: PharmacySignupData) {
  const res = await fetch(`${base}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error ?? 'Erreur lors de l\'inscription');
  }
  return res.json();
}

export async function signinPharmacy(data: PharmacySigninData) {
  const res = await fetch(`${base}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error ?? 'Erreur lors de la connexion');
  }
  return res.json();
}
