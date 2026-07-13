import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Provador Virtual — Experimente roupas com IA | QuipeAI",
  description:
    "Aumente as vendas da sua loja com o Provador Virtual: seus clientes experimentam as roupas com inteligência artificial antes de comprar. Peça uma demonstração.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
