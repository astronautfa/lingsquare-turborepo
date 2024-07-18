import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import { Inter } from "next/font/google";

import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import "@ui/styles/globals.css"
import "@ui/styles/cmdk.css"

import { cookies } from "next/headers";

import ClientProviders from "@/components/client-providers";

import { Toaster } from "@ui/components/sonner"
import { ThemeConfig } from "@/types/config";
import { cn } from "@ui/lib/utils"
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/consts/site";

import dynamic from "next/dynamic";

import { TailwindIndicator } from "@ui/components/tailwind-indicator"
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "@/components/auth/session-provider";
import { validateRequest } from "@/lib/auth/validate-request";

const inter = Inter({ subsets: ["latin"] });

const CommandMenu = dynamic(() => import('../components/command-menu'))

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: {
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  metadataBase: new URL(absoluteUrl("/")),
};

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

  // Providing all messages to the client
  // side is the easiest way to get started
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
