import React from 'react'
import { RouteInterceptedModal } from "@/components/modal/route-modal";
import EmptyState from '@/components/empty-state-copy';


// TODO : explore how that flashcard app is doing the step component

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