import React from 'react'
import { RouteInterceptedModal } from "@/components/modal/route-modal";
import EmptyState from '@/components/empty-state';

const ImportModal = () => {
    return (
        <RouteInterceptedModal >
            <div>
                <EmptyState />
            </div>
        </RouteInterceptedModal>
    )
}

export default ImportModal