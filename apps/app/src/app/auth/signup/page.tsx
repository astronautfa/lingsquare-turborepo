import { Signup } from '@/components/auth/signup';
import { validateRequest } from '@lingsquare/auth/validate-request';
import { Paths } from '@lingsquare/misc/constants';
import { redirect } from 'next/navigation';
import React from 'react'

const SignUpPage = async () => {

    const { user } = await validateRequest();

    if (user) redirect(Paths.Dashboard);

    return <Signup className="dark:lg:bg-zinc-900 border-none md:shadow-none"/>

}

export default SignUpPage