import React from 'react'
import { SidebarLayout } from '@/components/sidebar-layout';

const AppLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SidebarLayout >
            {children}
        </SidebarLayout>
    )
}



export default AppLayout