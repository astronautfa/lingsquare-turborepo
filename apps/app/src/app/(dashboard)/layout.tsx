import React from 'react'
import { SidebarLayout } from '@/components/sidebar-layout';
import ModalProvider from "@/components/modal/modal-provider";
import ModalOrNot from '@/components/modal/modal-or-not';

const AppLayout = ({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) => {
    console.log(modal)
    return (
        <SidebarLayout>
            <ModalProvider>
                <ModalOrNot>{modal}</ModalOrNot>
            </ModalProvider>
            {children}
        </SidebarLayout>
    )
}

export default AppLayout