import { absoluteUrl } from "../utils";
import { siteConfig } from "./site";

export const metadata = {
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