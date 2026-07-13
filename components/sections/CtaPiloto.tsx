import { Button } from "@/components/ui/Button";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { CTA_PILOTO } from "@/content/home";

/** Bloco final recorrente — CONTENT.md §8. Reutilizável em todas as páginas. */
export function CtaPiloto() {
  return (
    <section aria-labelledby="cta-piloto" className="section-pad border-t border-border">
      <div className="container-site flex flex-col items-center gap-6 text-center">
        <NodeGlow size={12} />
        <h2 id="cta-piloto">{CTA_PILOTO.titulo}</h2>
        <p className="prose-width text-lg text-text-muted">
          {CTA_PILOTO.corpo} <strong className="text-text">{CTA_PILOTO.destaque}</strong>
        </p>
        <Button href={CTA_PILOTO.botao.href} event="cta_piloto">
          {CTA_PILOTO.botao.label}
        </Button>
      </div>
    </section>
  );
}
