import { Metadata } from 'next'
import { SeparatorGradient } from '@ui/components'
import { getTranslations } from 'next-intl/server'
import EmptyState from '@/components/placeholders/page-empty-state'
import { ExploreRegular, ImportRegular, PlusRegular } from '@ui/icons'

export const metadata: Metadata = {
    title: "Library",
    description: "LingSquare library page",
}

const LibraryPage = async () => {

    const t = await getTranslations('library');

    return (
        <div>
            <div className="space-y-0.5 p-3 pb-0">
                <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
                <p className="text-muted-foreground">
                    {t('subtitle')}
                </p>
            </div>
            <SeparatorGradient className="my-6 opacity-30" gradient />
            <EmptyState title={t('empty-state.title')} subtitle={t('empty-state.subtitle')} actionBtns={[
                {
                    label: t('empty-state.action-btn.1.label'),
                    href: '/import',
                    icon: <ImportRegular className="w-4 h-4 mr-2" />
                },
                {
                    label: t('empty-state.action-btn.2.label'),
                    href: '/',
                    icon: <ExploreRegular className="w-4 h-4 mr-2" />
                },
            ]} />
        </div>
    )
}

export default LibraryPage