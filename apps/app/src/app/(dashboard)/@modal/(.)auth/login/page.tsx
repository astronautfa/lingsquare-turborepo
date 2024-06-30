import React from "react";
import { Login } from "@/components/auth/login";

export default function LoginModal() {
    return (
        <Login className="dark:lg:bg-zinc-900 border-none md:shadow-none" modal />
    );
}