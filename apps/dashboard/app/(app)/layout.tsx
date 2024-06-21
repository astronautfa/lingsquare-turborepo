import { SidebarLayout } from '@/components/sidebar-layout';
import React from 'react'

const AppLayout = ({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) => {
    return (
        <SidebarLayout>
            {modal}
            {children}
        </SidebarLayout>
    )
}

export default AppLayout