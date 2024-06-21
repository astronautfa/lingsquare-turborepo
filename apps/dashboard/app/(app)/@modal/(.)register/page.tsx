
import { RegisterForm } from "../../../../components/auth/register-form";
import { AuthModal } from "../../../../components/auth/auth-modal";
import React from "react";

export default function SignUpModal() {
  return (
    <AuthModal>
      <RegisterForm />
    </AuthModal>
  );
}
