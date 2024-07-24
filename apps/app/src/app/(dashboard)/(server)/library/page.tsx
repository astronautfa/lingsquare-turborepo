import { Metadata } from 'next'
import { Separator } from '@ui/components/separator'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
    title: "Library",
    description: "LingSquare library page",
}

const LibraryPage = async () => {

    const t = await getTranslations('library');

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

export default LibraryPage