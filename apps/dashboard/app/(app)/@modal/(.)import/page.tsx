import { Metadata } from 'next'
import React from 'react'
import EmptyState from '@/components/empty-state-copy';
import { RouteInterceptedModal } from "@/components/modal/route-modal";

export const metadata: Metadata = {
    title: "Import",
    description: "LingSquare import page",
}

const ImportModal = () => {
    return (
        <RouteInterceptedModal>
            <EmptyState />
        </RouteInterceptedModal>
    )
}

export default ImportModal