import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kdvyavrsagddfviivmsy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkdnlhdnJzYWdkZGZ2aWl2bXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NDQ3NzEsImV4cCI6MjA0NjIyMDc3MX0.7vg0OHYcnMTtN_NB5IPax6oJMfaHnLQZvSLU9oUJd2c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
