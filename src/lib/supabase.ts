// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Hämta miljövariablerna
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Skapa en Supabase-klient
export const supabase = createClient(supabaseUrl, supabaseAnonKey);