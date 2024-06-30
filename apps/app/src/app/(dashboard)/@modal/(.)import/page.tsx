import React from 'react'
import EmptyState from '@/components/empty-state-copy';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: "Import",
    description: "LingSquare import page",
}

const ImportModal = () => {
    return (
        <EmptyState />
    )
}

export default ImportModal