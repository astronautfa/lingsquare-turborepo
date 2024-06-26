import React from "react";

import LoginForm from "@/components/auth/login-form";
import { RouteInterceptedModal } from "@/components/modal/route-modal";
import Link from "next/link";
import { buttonVariants } from "@ui/components/button";

export default function LoginModal() {
    return (
        <RouteInterceptedModal >
            <div>
                <LoginForm />
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className={buttonVariants({ variant: 'ghost' })}>
                        Register
                    </Link>
                </div>
            </div>
        </RouteInterceptedModal>
    );
}