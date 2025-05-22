// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Hämta miljövariablerna
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Skapa en Supabase-klient
export const supabase = createClient(supabaseUrl, supabaseAnonKey);