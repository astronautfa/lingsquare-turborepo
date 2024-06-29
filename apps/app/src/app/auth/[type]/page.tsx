import React from 'react'
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { Paths } from "@/consts/paths";
import { Login } from "@/components/auth/login";

const AuthPage = async ({ params }: { params: { type: string } }) => {

    switch (params.type) {
        case 'login':
            const { user } = await validateRequest();
            if (user) redirect(Paths.Dashboard);
            return (<div><Login /></div>)
        default:
            return (<div>{params.type}</div>)
    }


}

export default AuthPage