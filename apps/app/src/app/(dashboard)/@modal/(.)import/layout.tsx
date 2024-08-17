import { RouteInterceptedModal } from '@/components/modal/route-modal'
import React from 'react'

const AuthModalLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <RouteInterceptedModal className="dark:lg:bg-zinc-900" >
            {children}
        </RouteInterceptedModal>
    )
}

export default AuthModalLayout  