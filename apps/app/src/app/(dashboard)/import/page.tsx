import { Metadata } from 'next'
import React from 'react'
import EmptyState from '@/components/empty-state';

export const metadata: Metadata = {
    title: "Import",
    description: "LingSquare import page",
}

const ImportPage = () => {
    return (
        <div><EmptyState /></div>
    )
}

export default ImportPage