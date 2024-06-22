'use client'

import React from 'react'
import LoginForm from './login-form'
import RegisterForm from './register-form'
import { Button } from "@ui/components/button";
import { useToggle } from '@/hooks/use-toggle';

const AuthForm = () => {
    const [isLoginDisplay, toggleAuthDisplay] = useToggle()
    return (
        <div>
            {isLoginDisplay
                ?
                <div>
                    <LoginForm />
                    <div className="mt-4 text-center text-sm flex gap-2  justify-center items-center">
                        <h4>
                            Don&apos;t have an account?{" "}
                        </h4>
                        <Button variant={'ghost'} onClick={toggleAuthDisplay}>
                            Register
                        </Button>
                    </div>
                </div>
                :
                <div>
                    <RegisterForm />
                    <div className="text-center text-sm flex gap-2 justify-center items-center">
                        <h4>
                            Already have account?
                        </h4>
                        <Button variant={'ghost'} onClick={toggleAuthDisplay}>
                            Login
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AuthForm