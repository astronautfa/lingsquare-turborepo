import React from "react";

import { RouteInterceptedModal } from "@/components/modal/route-modal";
import { Signup } from "@/components/auth/signup";
import Link from "next/link";
import { buttonVariants } from "@ui/components/button";

export default function RegisterModal() {
    return (
        <RouteInterceptedModal className="dark:lg:bg-zinc-900">
            <div className="w-full">
                <Signup className="dark:lg:bg-zinc-900 border-none" />
            </div>
        </RouteInterceptedModal>
    );
}