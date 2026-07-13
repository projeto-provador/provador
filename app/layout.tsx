import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { organizationSchema, personSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "QuipeAI. O método é a ponta de lança",
    template: "%s | QuipeAI",
  },
  description:
    "Método replicável de IA com autonomia limitada e especialista no ponto de responsabilidade. Cobrança por resultado, 30% de equity quando subsidia o build.",
  openGraph: {
    siteName: "QuipeAI",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={personSchema()} />
      </head>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Nav />
        <main id="conteudo">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
