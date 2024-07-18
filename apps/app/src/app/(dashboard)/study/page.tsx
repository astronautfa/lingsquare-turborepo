import React from 'react'
import { Metadata } from 'next'
import { Separator } from '@ui/components/separator'
import { useTranslations } from 'next-intl'

export const metadata: Metadata = {
    title: "Study",
    description: "LingSquare study page",
}

const StudyPage = () => {

    const t = useTranslations('study');

    return (
        <div>
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
                <p className="text-muted-foreground">
                    {t('subtitle')}
                </p>
            </div>
            <Separator className="my-6" />
        </div>
    )
}

export default StudyPage