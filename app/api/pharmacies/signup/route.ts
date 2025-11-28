import { NextResponse } from 'next/server';
import { serverSupabase } from '../../../../lib/supabase';
import type { Database } from '../../../lib/database.types';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

type PharmacyInsert = Database['public']['Tables']['pharmacies']['Insert'];

const createPharmacySchema = z.object({
  name: z.string().min(1, 'Nom de pharmacie requis'),
  location: z.string().optional(),
  city: z.string().min(1, 'Ville requise'),
  phone: z.string().min(1, 'Téléphone requis'),
  email: z.string().email('Email invalide'),
  address: z.string().min(1, 'Adresse requise'),
  opening_hours: z.string().optional(),
  description: z.string().optional(),
  password: z.string().min(6, 'Mot de passe minimum 6 caractères'),
  latitude: z.number().min(-90).max(90, 'Latitude invalide'),
  longitude: z.number().min(-180).max(180, 'Longitude invalide'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createPharmacySchema.parse(body);

    // Vérifier si l'email existe déjà
    const { data: existing } = await serverSupabase
      .from('pharmacies')
      .select('id')
      .eq('email', parsed.email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 409 }
      );
    }

    // Créer la pharmacie
    const pharmacyData: PharmacyInsert = {
      id: uuidv4(),
      name: parsed.name,
      location: parsed.location || null,
      city: parsed.city,
      phone: parsed.phone,
      email: parsed.email,
      address: parsed.address,
      opening_hours: parsed.opening_hours || null,
      description: parsed.description || null,
      password: parsed.password, // TODO: Hash the password in production
      latitude: parsed.latitude,
      longitude: parsed.longitude,
    };

    const { data, error } = await serverSupabase
      .from('pharmacies')
      .insert([pharmacyData])
      .select()
      .maybeSingle();

    if (error) {
      console.error('POST /api/pharmacies/signup error', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { 
        message: 'Pharmacie créée avec succès',
        pharmacy: data,
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.issues[0]?.message || 'Erreur de validation' },
        { status: 400 }
      );
    }
    console.error('Unexpected POST /api/pharmacies/signup error', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
