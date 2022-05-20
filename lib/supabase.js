import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ewdpzvgnqnvjhxmyxdlj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZHB6dmducW52amh4bXl4ZGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMwMjU5ODMsImV4cCI6MTk2ODYwMTk4M30.Oo3susBbRHz4OR1bFBfup4Q20y6u5Ra-KROJzekXhd8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});