import React from "react";

import { Login } from "@/components/auth/login";
import { RouteInterceptedModal } from "@/components/modal/route-modal";
import Link from "next/link";
import { buttonVariants } from "@ui/components/button";

// TODO : turn the header into the style of other headers

export default function LoginModal() {
    return (
        <RouteInterceptedModal className="dark:lg:bg-zinc-900" >
            <div className="w-full">
                <Login className="dark:lg:bg-zinc-900 border-none" />
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className={buttonVariants({ variant: 'ghost' })}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </RouteInterceptedModal>
    );
}