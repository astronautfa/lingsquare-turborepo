import React from 'react'
import { SidebarLayout } from '@/components/sidebar-layout';
import ModalProvider from "@/components/modal/modal-provider";
import ModalOrNot from '@/components/modal/modal-or-not';
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
            <ModalProvider>
                <ModalOrNot>{modal}</ModalOrNot>
            </ModalProvider>
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