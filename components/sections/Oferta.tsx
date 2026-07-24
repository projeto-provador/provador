import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { OFERTA } from "@/content/oferta";

/** Escada de ofertas (isca → entrada → core) — Fosso de Marketing G1. */
export function Oferta() {
  return (
    <section aria-labelledby="oferta" className="section-pad border-t border-border">
      <div className="container-site">
        <p className="eyebrow mb-4">{OFERTA.eyebrow}</p>
        <h2 id="oferta" className="max-w-[24ch] text-balance">
          {OFERTA.titulo}
        </h2>
        <p className="prose-width mt-3 text-text-muted">{OFERTA.intro}</p>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {OFERTA.degraus.map((degrau, i) => (
            <li key={degrau.nome}>
              <Card className={`flex h-full flex-col ${degrau.destaque ? "border-accent/50" : ""}`}>
                <span aria-hidden className="font-display text-sm font-bold text-accent-ink">{`0${
                  i + 1
                }`}</span>
                <h3 className="mt-2 text-lg">{degrau.nome}</h3>
                <p className="mt-1 text-sm font-semibold text-accent-ink">{degrau.preco}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                  {degrau.texto}
                </p>
                <div className="mt-6">
                  <Button
                    href={degrau.cta.href}
                    variant={degrau.destaque ? "primary" : "secondary"}
                    event="cta_piloto"
                  >
                    {degrau.cta.label}
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ol>

        <p className="prose-width mt-6 text-sm text-text-muted">{OFERTA.rodape}</p>
      </div>
    </section>
  );
}
