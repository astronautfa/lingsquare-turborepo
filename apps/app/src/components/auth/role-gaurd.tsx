import { validateRequest } from "@lingsquare/auth/validate-request";
import { ReactNode } from "react";

export async function SignedIn({ children }: { children: ReactNode }) {
  const { user } = await validateRequest();
  return user && <>{children}</>;
}

export async function SignedOut({ children }: { children: ReactNode }) {
  const { user } = await validateRequest();
  return !user && <>{children}</>;
}