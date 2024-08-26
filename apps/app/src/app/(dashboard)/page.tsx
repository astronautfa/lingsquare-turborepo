import { SeparatorGradient } from '@ui/components'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';
import { api } from '@lingsquare/trpc/server'
import { SidebarLayout } from '@/components/sidebar-layout';

export const metadata: Metadata = {
  title: "Explore",
  description: "LingSquare explore page",
}

export default async function HomePage({ modal }: { modal: React.ReactNode; }) {

  const t = await getTranslations('explore');

  const post = await api.post.hello({ text: 'alireza' });

  return (
    <SidebarLayout >
      <div className="space-y-0.5 p-3 pb-0">
        <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
        <p className="text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>
      <SeparatorGradient className="my-6 opacity-30" gradient />
    </SidebarLayout>
  )
}


// TODO : fix animation of account switcher
// TODO : sort out the icons

// TODO : add ripple effect to buttons
// https://www.npmjs.com/package/tailwindcss-ripple
// https://codepen.io/vituja1/pen/oNWzNwq

// TODO : Create notification component

// TODO : add breadcrumb

// TODO : add not defined page

// TODO : add support component

// TODO : explore cmdk with generative ui
// TODO : add the player

// TODO : interface language
// TODO : language settings

// TODO : check how dub.co modals are managed
// TODO : check the infintestune login modals

// TODO : explore zustand vs valtio
// TODO : add paths to command menu