import React from 'react'
import { SidebarLayout as SidebarLayoutClient } from '@/components/sidebar-layout-client';
import { cookies } from "next/headers";
import '@lingsquare/dockview/dist/styles/dockview.css';

const AppLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const defaultLayout = getDefaultLayout();

    return (
        <SidebarLayoutClient defaultLayout={defaultLayout}>
            {children}
        </SidebarLayoutClient>
    )
}

function getDefaultLayout() {
    const layout = cookies().get("react-resizable-panels:layout");
    if (layout) {
        return JSON.parse(layout.value);
    }
    return [33, 67];
}


export default AppLayout