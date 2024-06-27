import { Separator } from '@ui/components/separator'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "History",
    description: "LingSquare history page",
}

const HistoryPage = () => {
    return (
        <div>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">History</h2>
                <p className="text-muted-foreground">
                    Previously visited lessons
                </p>
            </div>
            <Separator className="my-6" />
        </div>
    )
}

export default HistoryPage