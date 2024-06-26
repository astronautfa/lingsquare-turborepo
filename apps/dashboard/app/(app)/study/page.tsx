import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Study",
    description: "LingSquare study page",
}

const StudyPage = () => {
    return (
        <div>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Study</h2>
                <p className="text-muted-foreground">
                    Review your flashcards
                </p>
            </div>
        </div>
    )
}

export default StudyPage