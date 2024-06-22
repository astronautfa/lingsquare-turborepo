import AuthForm from "@/components/auth/auth-form"
import RegisterForm from "@/components/auth/register-form"
import React from 'react'

const RegisterPage = () => {
    return (
        <div className='sm:border rounded-xl sm:shadow-sm sm:p-5 bg-background'>
            <AuthForm />
        </div>
    )
}

export default RegisterPage