import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { AnalyticsListener } from "@/components/ui/AnalyticsListener";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const poppins = Poppins({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Cada rota define <title>/description completos conforme SEO-AGEO.md §5
  title: "QuipeAI",
  openGraph: { siteName: "QuipeAI", locale: "pt_BR", type: "website" },
  twitter: { card: "summary_large_image" },
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "QuipeAI — Conteúdo" }] },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <JsonLd data={organizationSchema} />
      </head>
      <body>
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-contrast"
        >
          Pular para o conteúdo
        </a>
        {children}
        <AnalyticsListener />
      </body>
    </html>
  );
}
