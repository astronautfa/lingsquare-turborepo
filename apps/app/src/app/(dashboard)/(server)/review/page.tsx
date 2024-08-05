import React from 'react'
import { Metadata } from 'next'
import { Separator } from '@ui/components/separator'
import { useTranslations } from 'next-intl'
import ReviewHeatmap from '@/components/review-heatmap'

export const metadata: Metadata = {
    title: "Review",
    description: "LingSquare review page",
}

const StudyPage = () => {

    const t = useTranslations('review');

    return (
        <div>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
                <p className="text-muted-foreground">
                    {t('subtitle')}
                </p>
            </div>
            <Separator className="my-6" />
            <ReviewHeatmap />
        </div>
    )
}

export default StudyPage