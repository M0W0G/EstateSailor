import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
// Note: The import statement for NEXT_PUBLIC_SUPABASE_URL from .env.local is not possible directly in TypeScript/JavaScript.
// Instead, we use dotenv to load environment variables from a .env.local file.
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key');
}

export const supabase = createClient(supabaseUrl, supabaseKey);