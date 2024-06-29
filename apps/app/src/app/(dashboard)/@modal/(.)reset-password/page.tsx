import React from "react";

import { RouteInterceptedModal } from "@/components/modal/route-modal";
import Link from "next/link";
import { buttonVariants } from "@ui/components/button";
import { SendResetEmail } from "@/components/auth/send-reset-email";

// TODO : turn the header into the style of other headers

export default function ResetPasswordModal() {
    return (
        <RouteInterceptedModal className="dark:lg:bg-zinc-900" >
            <div className="w-full">
                <SendResetEmail className="dark:lg:bg-zinc-900 border-none" />
            </div>
        </RouteInterceptedModal>
    );
}