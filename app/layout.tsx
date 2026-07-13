import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuipeAI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
