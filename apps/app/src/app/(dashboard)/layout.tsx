import React from 'react'
import { SidebarLayout } from '@/components/sidebar-layout';
import ModalProvider from "@/components/modal/modal-provider";
import ModalOrNot from '@/components/modal/modal-or-not';

const AppLayout = async ({
    children,
    modal,
    tab
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
    tab: React.ReactNode;
}>) => {
    return (
        <SidebarLayout tabContent={tab}>
            <ModalProvider>
                <ModalOrNot>{modal}</ModalOrNot>
            </ModalProvider>
            {children}
        </SidebarLayout>
    )
}

export default AppLayout