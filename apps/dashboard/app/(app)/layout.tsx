import React from 'react'
import { SidebarLayout } from '@/components/sidebar-layout';

import ModalOrNot from '@/components/modal/modal-or-not'
import ModalProvider from '@/components/modal/modal-provider';

const AppLayout = ({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode
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