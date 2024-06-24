"use server";
import { createClient } from "@lingsquare/supabase/client/server";

export default async function getUserSession() {
  const supabase = await createClient();
  return supabase.auth.getSession();
}
