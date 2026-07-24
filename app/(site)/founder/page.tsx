import type { Metadata } from "next";
import Link from "next/link";
import { AtSign } from "lucide-react";
import { CtaPiloto } from "@/components/sections/CtaPiloto";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { FOUNDER, FOUNDER_REDES, IDEIAS_ANCORA, TESE_CONTRARIA } from "@/content/founder";
import { PRODUTOS_PUBLICADOS } from "@/content/produtos/registry";
import { personSchema } from "@/lib/schema";

/* lucide-react não tem ícones de marca (Instagram/LinkedIn/...) — AtSign genérico para handle. */

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

          {/* Redes sociais — só perfis reais (CONTENT.md §11) */}
          <nav aria-label="Redes sociais do founder" className="flex flex-wrap gap-3">
            {FOUNDER_REDES.map((rede) => (
              <a
                key={rede.url}
                href={rede.url}
                target="_blank"
                rel="me noopener"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent motion-reduce:transition-none"
              >
                <AtSign aria-hidden className="size-4 text-accent-ink" />
                {rede.nome} · {rede.handle}
              </a>
            ))}
          </nav>
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

      {/* ===== Prova de execução — os produtos ao vivo (evidência, não promessa) ===== */}
      <section aria-labelledby="execucao" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">O QUE JÁ ESTÁ NO AR</p>
          <h2 id="execucao" className="max-w-[28ch] text-balance">
            A tese vira produto — em produção, em verticais reguladas
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {PRODUTOS_PUBLICADOS.map((produto) => (
              <li key={produto.slug}>
                <Link
                  href={`/produtos/${produto.slug}`}
                  className="inline-flex rounded-sm border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent motion-reduce:transition-none"
                >
                  {produto.title}
                </Link>
              </li>
            ))}
          </ul>
          {/* TODO(prova): prova social — eventos, publicações, falas (aguarda o owner). */}
          {/* TODO(copy): tom "yogue no corporativo" e POV aprofundado (aguarda o owner). */}
        </div>
      </section>

      <CtaPiloto />
    </>
  );
}
