import React from "react";
import { SendResetEmail } from "@/components/auth/send-reset-email";

export default function ResetPasswordModal() {
    return (
        <SendResetEmail className="dark:lg:bg-zinc-900 border-none md:shadow-none" modal />
    );
}