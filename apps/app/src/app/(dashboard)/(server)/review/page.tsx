import React from 'react'
import { Metadata } from 'next'
import { Button, Callout, SeparatorGradient } from '@ui/components'
import { useTranslations } from 'next-intl'
import ReviewHeatmap from '@/components/review-heatmap'
import DeckBox from '@/components/deck-box'
import { ExclamationTriangleRegular } from '@ui/icons'
import { SignedIn, SignedOut } from '@/components/auth/role-gaurd'
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
            <SignedOut>
                <Callout variant="warning" title="You must be Signed In" icon={<ExclamationTriangleRegular className='w-5 h-5' />}>
                    To track your progress and start reviewing your own flashcards you need to Sign In
                </Callout>
            </SignedOut>
            <SignedIn>
                <ReviewHeatmap />
                <DeckBox />
            </SignedIn>
        </div>
    )
}

export default StudyPage