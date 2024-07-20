import React from 'react'
import ImportModalContent from '@/components/import-modal';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: "Import",
    description: "LingSquare import page",
}

const ImportModal = () => {
    return (
        <ImportModalContent />
    )
}

export default ImportModal