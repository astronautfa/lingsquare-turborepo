import React from 'react'
import LoginForm from "@/components/auth/login-form"

const LoginPage = () => {
    return (
        <div className='sm:border rounded-xl sm:p-5 sm:shadow-sm bg-background'>
            <LoginForm />
        </div>
    )
}

export default LoginPage