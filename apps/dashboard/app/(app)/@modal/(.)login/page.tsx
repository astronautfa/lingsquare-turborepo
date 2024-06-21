import React from "react";

import { LoginForm } from "../../../../components/auth/login-form";
import { AuthModal } from "../../../../components/auth/auth-modal";

export default function LoginModal() {
  return (
    <AuthModal>
      <LoginForm />
    </AuthModal>
  );
}
