import React from 'react'
import { SidebarLayout } from '@/components/sidebar-layout';
import { cookies } from "next/headers";

const AppLayout = async ({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) => {
    const defaultLayout = getDefaultLayout();

    return (
        <SidebarLayout defaultLayout={defaultLayout}>
            {children}
        </SidebarLayout>
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