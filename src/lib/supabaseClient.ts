import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://khgsukntydlvesstjqod.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZ3N1a250eWRsdmVzc3RqcW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDU5MDEsImV4cCI6MjA2NzMyMTkwMX0.VMdc97CoiHv7wOtGQIhqWoQ679yPKowFUI96JljSSAk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 