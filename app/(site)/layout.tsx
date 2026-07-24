import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="conteudo-principal">{children}</main>
      <Footer />
    </>
  );
}
