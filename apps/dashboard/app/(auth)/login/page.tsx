import React from 'react'
import AuthForm from '@/components/auth/auth-form'

const LoginPage = () => {
    return (
        <div className='sm:border rounded-xl sm:shadow-sm sm:p-5 dark:lg:bg-zinc-900'>
            <AuthForm />
        </div>
    )
}

export default LoginPage