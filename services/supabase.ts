// สำหรับการตั้งค่าติดต่อกับ Supabase
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hjrsgnhyyztrdqteggja.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcnNnbmh5eXp0cmRxdGVnZ2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MzQ3MDcsImV4cCI6MjA4NzMxMDcwN30.XDWozwpfW4fu6liOkatLGevon0-LNNcS6deYyQ3bwVk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
