import { NextResponse } from 'next/server';
import { serverSupabase } from '../../../../lib/supabase';
import { z } from 'zod';

const loginPharmacySchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = loginPharmacySchema.parse(body);

    // Rechercher la pharmacie par email
    const { data: pharmacy, error } = await serverSupabase
      .from('pharmacies')
      .select('*')
      .eq('email', parsed.email)
      .maybeSingle();

    if (error || !pharmacy) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe (simple comparaison pour le moment)
    // TODO: Utiliser bcrypt en production
    if (pharmacy.password !== parsed.password) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Retourner les données de la pharmacie sans le mot de passe
    const { password, ...pharmacyData } = pharmacy;
    return NextResponse.json(
      { 
        message: 'Connexion réussie',
        pharmacy: pharmacyData,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.errors[0].message },
        { status: 400 }
      );
    }
    console.error('Unexpected POST /api/pharmacies/signin error', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
