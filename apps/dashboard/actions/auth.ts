"use server";

import { LoginSchema } from "@/lib/validations";
import { RegisterSchema } from "@/lib/validations";
import { createClient } from "@lingsquare/supabase/client/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TypeOf } from "zod";

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
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/");
  return redirect("/");
}

export async function registerWithEmailAndPassword({
  data,
  emailRedirectTo,
}: {
  data: TypeOf<typeof RegisterSchema>;
  emailRedirectTo?: string;
}) {
  const supabase = await createClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo,
    },
  });
  revalidatePath("/", "layout");
  return JSON.stringify(result);
}

export async function loginWithEmailAndPassword(
  data: TypeOf<typeof LoginSchema>
) {
  const supabase = await createClient();
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  revalidatePath("/", "layout");
  return JSON.stringify(result);
}
