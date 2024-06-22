"use server";

import { createClient } from "@lingsquare/supabase/client/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const verifyOtp = async (data: {
  email: string;
  otp: string;
  type: string;
}) => {
  const supabase = createClient();

  const res = await supabase.auth.verifyOtp({
    email: data.email,
    token: data.otp,
    type: "email",
  });
  return JSON.stringify(res);
};

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  return redirect('/');
}
