import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { landingPageContent } from "@/content/landing-page";

import "./globals.css";

const editorial = localFont({
  src: "./fonts/cormorant-garamond-latin.woff2",
  variable: "--font-editorial",
  display: "swap",
  weight: "300 700",
});

const sans = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  title: landingPageContent.seo.title,
  description: landingPageContent.seo.description,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${editorial.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
