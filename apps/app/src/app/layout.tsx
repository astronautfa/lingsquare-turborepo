import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import { Inter } from "next/font/google";

import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import "@ui/styles/globals.css"
import { cookies } from "next/headers";
import ClientProviders from "@/components/client-providers";

import { Toaster, TailwindIndicator } from "@ui/components"
import { ThemeConfig } from "@/types/config";
import { cn } from "@lingsquare/misc/utils"
import { metadata as seoMetadata } from "@lingsquare/misc/constants";

import dynamic from "next/dynamic";

import { TRPCReactProvider } from "@lingsquare/trpc/client";
import { SessionProvider } from "@/components/auth/session-provider";
import { validateRequest } from "@lingsquare/auth/validate-request";

const inter = Inter({ subsets: ["latin"] });

const CommandMenu = dynamic(() => import('../components/command-menu'))

export const metadata: Metadata = seoMetadata

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const themeConfig = cookies().get("theme-config");

  const { theme, radius } = JSON.parse(
    themeConfig?.value ?? '{"theme":"default","radius":"default"}'
  ) as ThemeConfig;

  const session = await validateRequest();

  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={cn(
        "min-h-screen font-sans antialiased",
        inter.className,
        `theme-${theme}`
      )}
        style={
          radius === "default" ?
            {}
            : ({ "--radius": `${radius}rem` } as React.CSSProperties)
        }>
        <TRPCReactProvider>
          <NextTopLoader color="#71717A" showSpinner={false} />
          <SessionProvider session={session}>
            <NextIntlClientProvider messages={messages}>
              <ClientProviders >
                <CommandMenu />
                <TailwindIndicator />
                {children}
                <Toaster closeButton toastOptions={{
                  unstyled: false,
                  classNames: {
                    closeButton: 'bg-background rounded dark:hover:bg-primary-foreground dark:border-background dark:hover:border-muted',
                  },
                }} />
              </ClientProviders>
            </NextIntlClientProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html >
  );
}
