import { createClient } from "@lingsquare/supabase/client/server";

export async function SignedIn({ children }: React.PropsWithChildren) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()

  return user ? <>{children}</> : null;
}

export async function SignedOut({ children }: React.PropsWithChildren) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()

  return user ? null : <>{children}</>;
}
