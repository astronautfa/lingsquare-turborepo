'use client'

import React, { useLayoutEffect } from 'react'
import LoginForm from './login-form'
import RegisterForm from './register-form'
import { Button } from "@ui/components/button";
import { useToggle } from '@/hooks/use-toggle';
import { usePathname } from 'next/navigation';

const AuthForm = () => {
    const path = usePathname()

    const [isLoginDisplay, toggleAuthDisplay, setLoginDisplay] = useToggle()

    useLayoutEffect(() => {
        if (path === '/login') {
            setLoginDisplay(true)
        } else {
            setLoginDisplay(false)
        }
    }, [, path])

    return (
        <>
            {isLoginDisplay
                ?
                <div>
                    <LoginForm />
                    <div className="mt-5 text-center text-sm flex gap-2 justify-center items-center">
                        <h4>
                            Don&apos;t have an account?
                        </h4>
                        <Button variant={'ghost'} onClick={toggleAuthDisplay}>
                            Register
                        </Button>
                    </div>
                </div>
                :
                <div>
                    <RegisterForm setLoginDisplay={setLoginDisplay} />
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
        </>
    )
}

export default AuthForm