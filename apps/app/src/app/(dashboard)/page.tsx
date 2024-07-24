import { Separator } from '@ui/components/separator'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';
import { api } from '@/trpc/server'
import { SidebarLayout } from '@/components/sidebar-layout';
import { cookies } from "next/headers";


import React from 'react'

export const metadata: Metadata = {
  title: "Explore",
  description: "LingSquare explore page",
}

export default async function HomePage({ modal }: { modal: React.ReactNode; }) {

  const t = await getTranslations('explore');

  const post = await api.post.hello({ text: 'alireza' });

  const defaultLayout = getDefaultLayout();

  return (
    <SidebarLayout defaultLayout={defaultLayout}>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">  {t('title')}</h2>
        <p className="text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>
      <Separator className="my-6" />
    </SidebarLayout>
  )
}

function getDefaultLayout() {
  const layout = cookies().get("react-resizable-panels:layout");
  if (layout) {
    return JSON.parse(layout.value);
  }
  return [33, 67];
}


// TODO : find better style for the sidebar collapse button
// TODO : fix animation of account switcher
// TODO : sort out the icons

// TODO : add ripple effect to buttons
// https://www.npmjs.com/package/tailwindcss-ripple
// https://codepen.io/vituja1/pen/oNWzNwq

// TODO : Create notification component

// TODO : add breadcrumb

// TODO : add language flag icons
// TODO : add known language

// TODO : fix background colors not consistent
// TODO : add not defined page

// TODO : add support component
// TODO : open sidebar and close tooltip

// TODO : fullscreen application button

// TODO : fix mode animation

// TODO : explore cmdk with generative ui
// TODO : add the player

// TODO : sort out login

// TODO : interface language
// TODO : language settings

// TODO : check how dub.co modals are managed
// TODO : check the infintestune login modals

// TODO : explore zustand vs valtio
// TODO : add paths to command menu