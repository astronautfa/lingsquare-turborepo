'use server'

import React from 'react'
import { SidebarLayout } from '@/components/sidebar-layout';
import ModalProvider from "@/components/modal/modal-provider";
import ModalOrNot from '@/components/modal/modal-or-not';
import { validateRequest } from '@/lib/auth/validate-request';

const AppLayout = async ({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) => {
    const { user } = await validateRequest();
    return (
        <SidebarLayout user={user}>
            <ModalProvider>
                <ModalOrNot>{modal}</ModalOrNot>
            </ModalProvider>
            {children}
        </SidebarLayout>
    )
}

export default AppLayout