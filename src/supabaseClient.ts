import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yiqwosmunviiqkgovfxd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcXdvc211bnZpaXFrZ292ZnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4ODQwNzcsImV4cCI6MjA1MDQ2MDA3N30.QIE4uhh8tfwbsvykrzoysusBCFAoubZlpFo0uNUFpFg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
