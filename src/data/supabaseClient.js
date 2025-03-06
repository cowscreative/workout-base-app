import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nyrrdcwxikyfrindvgyq.supabase.co"; // Replace with your Supabase URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55cnJkY3d4aWt5ZnJpbmR2Z3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTk5MzAsImV4cCI6MjA1Njc5NTkzMH0.fkmicBrSo_rih0N7-RXFw7Gd5CmKyRxpkAO41V2z2xI"; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
