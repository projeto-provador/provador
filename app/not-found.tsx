import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Button } from "@/components/ui/Button";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { TESE_UMA_LINHA } from "@/lib/site";

/** 404 útil — SPEC.md §7: entidade em 1 frase + caminhos de volta. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="conteudo-principal" className="section-pad">
        <div className="container-site flex flex-col items-start gap-6">
          <p className="eyebrow flex items-center gap-3">
            <NodeGlow size={8} />
            ERRO 404
          </p>
          <h1 className="max-w-[18ch] text-balance">Essa página não existe.</h1>
          <p className="prose-width text-lg text-text-muted">QuipeAI — {TESE_UMA_LINHA}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button href="/">Ir para o início</Button>
            <Button href="/metodo" variant="secondary">
              Conhecer o método
            </Button>
            <Button href="/contato" variant="secondary" event="cta_piloto">
              Peça um piloto
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
