import React from 'react'
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { Paths } from "@/consts/paths";
import { Login } from "@/components/auth/login";
import { VerifyCode } from '@/components/auth/verify-code';
import { Signup } from '@/components/auth/signup';
import { SendResetEmail } from '@/components/auth/send-reset-email';
import { notFound } from 'next/navigation'

const AuthPage = async ({ params }: { params: { type: string } }) => {

    const { user } = await validateRequest();

    switch (params.type) {
        case 'login':
            if (user) redirect(Paths.Dashboard);
            return <Login />
        case 'signup':
            if (user) redirect(Paths.Dashboard);
            return <Signup />
        case 'verify-email':
            if (user) redirect(Paths.Dashboard);
            if (!user) redirect(Paths.Signup);
            return <VerifyCode user={user} />
        case 'reset-password':
            if (user) redirect(Paths.Dashboard);
            if (!user) redirect(Paths.Signup);
            return <SendResetEmail />
        default:
            return notFound()
    }


}

export default AuthPage