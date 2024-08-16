import { VerifyCode } from '@/components/auth/verify-code'
import { validateRequest } from '@lingsquare/auth/validate-request';
import { Paths } from '@lingsquare/misc/constants';
import { redirect } from 'next/navigation';
import React from 'react'

const VerifyEmailPage = async () => {

    const { user } = await validateRequest();

    if (user?.emailVerified) redirect(Paths.Dashboard);
    if (!user) redirect(Paths.Login);

    return (
        <VerifyCode user={user} className="dark:lg:bg-zinc-900 border-none md:shadow-none" />
    )
}

export default VerifyEmailPage