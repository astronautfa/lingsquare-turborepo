import React from "react";

import { AuthModal } from "@/components/modal/auth-modal";
import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";
import { buttonVariants } from "@ui/components/button";

export default function RegisterModal() {
    return (
        <AuthModal >
            <div>
                <RegisterForm />
                <div className="text-center text-sm">
                    <h1>
                        Already have account?{" "}
                        <Link
                            href={'/login'}
                            className={buttonVariants({ variant: 'ghost' })}
                        >
                            Login
                        </Link>
                    </h1>
                </div>
            </div>
        </AuthModal>
    );
}