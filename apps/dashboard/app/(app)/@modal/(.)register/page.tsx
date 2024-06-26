import React from "react";

import { RouteInterceptedModal } from "@/components/modal/route-modal";
import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";
import { buttonVariants } from "@ui/components/button";

export default function RegisterModal() {
    return (
        <RouteInterceptedModal >
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
        </RouteInterceptedModal>
    );
}