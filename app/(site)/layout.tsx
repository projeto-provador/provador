import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="conteudo-principal">{children}</main>
      <Footer />
    </>
  );
}
