import React from 'react'
import { SidebarLayout } from '@/components/sidebar-layout';

const AppLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SidebarLayout>
            {children}
        </SidebarLayout>
    )
}

export default AppLayout