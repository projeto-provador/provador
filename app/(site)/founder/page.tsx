import type { Metadata } from "next";
import { CtaPiloto } from "@/components/sections/CtaPiloto";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { FOUNDER, IDEIAS_ANCORA, TESE_CONTRARIA } from "@/content/founder";
import { personSchema } from "@/lib/schema";

/* SEO-AGEO.md §5 — rota /founder */
export const metadata: Metadata = {
  title: "Curva C — founder da QuipeAI",
  description:
    "A tese contrária: por que humano no ponto de responsabilidade vence agente autônomo nas verticais reguladas.",
  alternates: { canonical: "/founder" },
};

export default function FounderPage() {
  return (
    <>
      <JsonLd data={personSchema} />

      {/* ===== Autoridade ===== */}
      <section className="section-pad">
        <div className="container-site flex flex-col items-start gap-6">
          <Breadcrumbs items={[{ name: "Founder", path: "/founder" }]} />
          <p className="eyebrow flex items-center gap-3">
            <NodeGlow size={8} />
            {FOUNDER.eyebrow}
          </p>
          <h1 className="max-w-[20ch] text-balance">{FOUNDER.nome}</h1>
          <p className="prose-width text-lg text-text-muted">{FOUNDER.bio}</p>
          {/* TODO(copy): tom "yogue no corporativo" — aguarda aprovação do owner (CONTENT §11) */}
          <a
            href={FOUNDER.instagram.url}
            rel="me noopener"
            className="text-sm font-medium text-accent-ink hover:underline"
          >
            Instagram · {FOUNDER.instagram.handle}
          </a>
        </div>
      </section>

      {/* ===== Tese contrária ===== */}
      <section aria-labelledby="tese" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">{TESE_CONTRARIA.eyebrow}</p>
          <h2 id="tese" className="max-w-[28ch] text-balance">
            {TESE_CONTRARIA.titulo}
          </h2>
          <p className="prose-width mt-6 text-lg leading-relaxed text-text-muted">
            {TESE_CONTRARIA.corpo}
          </p>
        </div>
      </section>

      {/* ===== Ponto de vista — ideias-âncora ===== */}
      <section aria-labelledby="ideias" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">PONTO DE VISTA</p>
          <h2 id="ideias">As ideias-âncora</h2>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {IDEIAS_ANCORA.map((ideia) => (
              <Card key={ideia.termo}>
                <dt className="font-display text-lg font-bold">{ideia.termo}</dt>
                <dd className="mt-2 leading-relaxed text-text-muted">{ideia.definicao}</dd>
              </Card>
            ))}
          </dl>
        </div>
      </section>

      {/*
        TODO(prova): prova social — eventos, publicações, projetos
        (pendência do owner, TASKS.md). Sem fato real, a seção não renderiza.
      */}

      <CtaPiloto />
    </>
  );
}
