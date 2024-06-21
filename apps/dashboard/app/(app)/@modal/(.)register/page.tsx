import React from "react";

import RegisterForm from "@/components/auth/register-form";
import { AuthModal } from "@/components/auth/auth-modal";

export default function RegisterModal() {
  return (
    <AuthModal >
      <RegisterForm />
    </AuthModal>
  );
}
