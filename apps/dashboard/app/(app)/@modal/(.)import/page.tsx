import React from 'react'
import { RouteInterceptedModal } from "@/components/modal/route-modal";
import EmptyState from '@/components/empty-state-copy';


// TODO : explore how that flashcard app is doing the step component
// TODO : the x on the dialogue should match the sonner way

const ImportModal = () => {
    return (
        <RouteInterceptedModal >
            <EmptyState />
        </RouteInterceptedModal>
    )
}

export default ImportModal