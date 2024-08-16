import React from 'react'
import { Metadata } from 'next'
import { SeparatorGradient } from '@ui/components'
import { useTranslations } from 'next-intl'
import ReviewHeatmap from '@/components/review-heatmap'
import ReviewEmptyState from '@/components/empty-state/review-empty-state'
// import {
//     BreadCrumb,
//     BreadCrumbItem,
//     BreadCrumbSeparator,
// } from "@ui/components";
// import Link from 'next/link'

export const metadata: Metadata = {
    title: "Review",
    description: "LingSquare review page",
}

const StudyPage = () => {

    const t = useTranslations('review');

    return (
        <div>
            {/* <BreadCrumb
                orientation="horizontal"
                variant={"ghost"}
                className="gap-1 rounded-lg p-1"
            >
                <BreadCrumbItem className="px-2 h-7" index={0}>
                    <Link href="/">Home</Link>
                </BreadCrumbItem>
                <BreadCrumbSeparator>
                    <Slash className="size-3 -rotate-[30deg]" />
                </BreadCrumbSeparator>
                <BreadCrumbItem className="px-2 h-7" index={1}>
                    <Link href="/">Settings</Link>
                </BreadCrumbItem>
                <BreadCrumbSeparator>
                    <Slash className="size-3 -rotate-[30deg]" />
                </BreadCrumbSeparator>
                <BreadCrumbItem className="px-2 h-7" index={2}>
                    Account
                </BreadCrumbItem>
            </BreadCrumb> */}
            <div className="space-y-0.5 p-3 pb-0">
                <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
                <p className="text-muted-foreground">
                    {t('subtitle')}
                </p>
            </div>
            <SeparatorGradient className="my-6 opacity-30" gradient />
            <ReviewHeatmap />
            <ReviewEmptyState />
        </div>
    )
}

export default StudyPage