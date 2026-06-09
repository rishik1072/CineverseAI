import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { AppProviders } from "@/components/providers/app-providers";
import { siteConfig } from "@/config/site";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "CineVerse AI — Premium Movie Discovery",
    template: "%s | CineVerse AI"
  },
  description: siteConfig.description,
  openGraph: {
    title: "CineVerse AI",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "CineVerse AI",
    images: [{ url: "/brand/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CineVerse AI",
    description: siteConfig.description
  }
};

export const viewport: Viewport = {
  themeColor: "#03040a",
  colorScheme: "dark light"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
