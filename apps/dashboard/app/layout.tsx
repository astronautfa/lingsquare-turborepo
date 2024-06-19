import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@ui/styles/globals.css"
import "@ui/styles/cmdk.css"


import { cookies } from "next/headers";

import { SidebarLayout } from '@/components/sidebar-layout'
import Providers from "@/components/providers";

import { Toaster } from "@ui/components/sonner"
import { ThemeConfig } from "@/types/config";
import { cn } from "@ui/lib/utils"
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/config/site";

import CommandMenu from "../components/command-menu";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const themeConfig = cookies().get("theme-config");

  const { theme, radius } = JSON.parse(
    themeConfig?.value ?? '{"theme":"default","radius":"default"}'
  ) as ThemeConfig;

  return (
    <html lang="en">
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
        <Providers>
          <CommandMenu />
          <SidebarLayout>
            {children}
          </SidebarLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
