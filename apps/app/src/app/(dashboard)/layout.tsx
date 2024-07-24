import React from 'react'
import ModalProvider from "@/components/modal/modal-provider";
import ModalOrNot from '@/components/modal/modal-or-not';

const AppLayout = async ({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) => {

    return (
        <>
            <ModalProvider>
                <ModalOrNot>{modal}</ModalOrNot>
            </ModalProvider>
            {children}
        </>
    )
}



export default AppLayout