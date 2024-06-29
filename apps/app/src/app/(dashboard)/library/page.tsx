import { Separator } from '@ui/components/separator'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Library",
    description: "LingSquare library page",
}

const LibraryPage = () => {
    return (
        <div>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Library</h2>
                <p className="text-muted-foreground">
                </p>
            </div>
            <Separator className="my-6" />
        </div>
    )
}

export default LibraryPage