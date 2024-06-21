import React from 'react'
import ModalOrNot from '@/components/@modal/ModalOrNot';
import ModalProvider from '@/components/@modal/ModalProvider';
import { SidebarLayout } from '@/components/sidebar-layout';

const AppLayout = ({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) => {
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