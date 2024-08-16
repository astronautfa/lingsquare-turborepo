import { Login } from '@/components/auth/login'
import { validateRequest } from '@lingsquare/auth/validate-request';
import { Paths } from '@lingsquare/misc/constants';
import { redirect } from 'next/navigation';
import React from 'react'

const LoginPage = async () => {

    const { user } = await validateRequest();

    if (user) redirect(Paths.Dashboard);

    return (
        <Login className="dark:lg:bg-zinc-900 border-none md:shadow-none" />
    )
}

export default LoginPage