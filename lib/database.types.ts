/**
 * Supabase Database Types
 * Generated from the schema defined in supabase/migrations/
 * Tables: medicines, pharmacies, pharmacy_inventory
 *
 * To regenerate with full database schema:
 * supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      medicines: {
        Row: {
          id: string; // uuid
          name: string;
          dosage: string | null;
          form: string | null;
          description: string | null;
          indications: string[] | null;
          contraindications: string[] | null;
          side_effects: string[] | null;
          manufacturer: string | null;
          availability: 'in_stock' | 'low_stock' | 'out_of_stock';
          price: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          dosage?: string | null;
          form?: string | null;
          description?: string | null;
          indications?: string[] | null;
          contraindications?: string[] | null;
          side_effects?: string[] | null;
          manufacturer?: string | null;
          availability?: 'in_stock' | 'low_stock' | 'out_of_stock';
          price?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          dosage?: string | null;
          form?: string | null;
          description?: string | null;
          indications?: string[] | null;
          contraindications?: string[] | null;
          side_effects?: string[] | null;
          manufacturer?: string | null;
          availability?: 'in_stock' | 'low_stock' | 'out_of_stock';
          price?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      pharmacies: {
        Row: {
          id: string;
          name: string;
          location: string | null;
          city: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          opening_hours: string | null;
          latitude: number | null;
          longitude: number | null;
          image: string | null;
          description: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          name: string;
          location?: string | null;
          city?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          opening_hours?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          image?: string | null;
          description?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          location?: string | null;
          city?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          opening_hours?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          image?: string | null;
          description?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      pharmacy_inventory: {
        Row: {
          id: string; // uuid
          medicine_id: string; // uuid, fk to medicines
          pharmacy_id: string; // fk to pharmacies
          stock: number;
          price: number;
          availability: 'in_stock' | 'low_stock' | 'out_of_stock';
          last_restocked: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          medicine_id: string;
          pharmacy_id: string;
          stock: number;
          price: number;
          availability?: 'in_stock' | 'low_stock' | 'out_of_stock';
          last_restocked?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          medicine_id?: string;
          pharmacy_id?: string;
          stock?: number;
          price?: number;
          availability?: 'in_stock' | 'low_stock' | 'out_of_stock';
          last_restocked?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
