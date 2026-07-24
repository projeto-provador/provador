import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { CtaPiloto } from "@/components/sections/CtaPiloto";
import { MetodoFluxo } from "@/components/sections/MetodoFluxo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { ARCO, COMO_FUNCIONA, FAQ } from "@/content/home";
import {
  ANTI_PERFIL,
  CAMADAS_ICP,
  CATEGORIA,
  DEFINICAO,
  ICP_FRASE,
  MOAT,
  ONDAS,
  PERGUNTAS_ICP,
  RECEITA,
  SCORING,
  VALIDACAO,
} from "@/content/metodo";
import { faqPageSchema } from "@/lib/schema";

/* SEO-AGEO.md §5 — rota /metodo */
export const metadata: Metadata = {
  title: "O Método (Revolução 5.0) — QuipeAI",
  description:
    "Como funciona a IA com autonomia limitada e humano no ponto de responsabilidade. As perguntas que definem se seu negócio é ICP.",
  alternates: { canonical: "/metodo" },
};

export default function MetodoPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQ)} />

      {/* ===== Definição answer-first — resposta direta no topo (SEO-AGEO §7) ===== */}
      <section className="section-pad">
        <div className="container-site flex flex-col items-start gap-6">
          <Breadcrumbs items={[{ name: "Método", path: "/metodo" }]} />
          <p className="eyebrow flex items-center gap-3">
            <NodeGlow size={8} />
            {DEFINICAO.eyebrow}
          </p>
          <h1 className="max-w-[16ch] text-balance">{DEFINICAO.titulo}</h1>
          <p className="prose-width text-lg text-text">{DEFINICAO.respostaDireta}</p>
          <p className="prose-width text-text-muted">{DEFINICAO.desdobramento}</p>
        </div>
      </section>

      {/* ===== ICP em uma frase ===== */}
      <section aria-label="O ICP em uma frase" className="border-t border-border">
        <div className="container-site py-14">
          <p className="eyebrow mb-4">{ICP_FRASE.eyebrow}</p>
          <p className="prose-width font-display text-2xl font-semibold leading-snug text-balance">
            {ICP_FRASE.texto}
          </p>
        </div>
      </section>

      {/* ===== As perguntas do ICP ===== */}
      <section aria-labelledby="icp" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">O FILTRO DE QUALIFICAÇÃO</p>
          <h2 id="icp">{PERGUNTAS_ICP.titulo}</h2>
          <p className="mt-3 text-text-muted">{PERGUNTAS_ICP.intro}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {PERGUNTAS_ICP.perguntas.map((pergunta, i) => (
              <li key={pergunta}>
                <Card className="flex h-full gap-4">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast">
                    <Check aria-hidden className="size-4" />
                    <span className="sr-only">Pergunta {i + 1}:</span>
                  </span>
                  <p className="leading-relaxed">{pergunta}</p>
                </Card>
              </li>
            ))}
          </ol>
          <p className="prose-width mt-6 text-sm text-text-muted">{PERGUNTAS_ICP.nota}</p>
        </div>
      </section>

      {/* ===== ICP em 4 camadas ===== */}
      <section aria-labelledby="camadas" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">{CAMADAS_ICP.eyebrow}</p>
          <h2 id="camadas">{CAMADAS_ICP.titulo}</h2>
          <dl className="mt-10 grid gap-4 md:grid-cols-2">
            {CAMADAS_ICP.camadas.map((camada) => (
              <Card key={camada.nome}>
                <dt className="font-display text-lg font-bold">{camada.nome}</dt>
                <dd className="mt-2 leading-relaxed text-text-muted">{camada.texto}</dd>
              </Card>
            ))}
          </dl>
        </div>
      </section>

      {/* ===== Anti-perfil ===== */}
      <section aria-labelledby="anti-perfil" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">{ANTI_PERFIL.eyebrow}</p>
          <h2 id="anti-perfil">{ANTI_PERFIL.titulo}</h2>
          <p className="mt-3 text-text-muted">{ANTI_PERFIL.intro}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ANTI_PERFIL.itens.map((item) => (
              <li key={item.nome}>
                <Card className="flex h-full gap-3">
                  <X aria-hidden className="mt-0.5 size-5 shrink-0 text-text-subtle" />
                  <div>
                    <p className="font-display font-semibold">{item.nome}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.texto}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Scoring ===== */}
      <section aria-labelledby="scoring" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">{SCORING.eyebrow}</p>
          <h2 id="scoring">{SCORING.titulo}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {SCORING.faixas.map((faixa) => (
              <Card key={faixa.nome} className="h-full">
                <p className="font-display font-bold text-accent-ink">{faixa.nome}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{faixa.texto}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Como funciona (5 passos) — CONTENT.md §6 ===== */}
      <section aria-labelledby="passos" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">PASSO A PASSO</p>
          <h2 id="passos">{COMO_FUNCIONA.titulo}</h2>
          <div className="mt-10">
            <MetodoFluxo passos={COMO_FUNCIONA.passos} />
          </div>
        </div>
      </section>

      {/* ===== As ondas de entrada ===== */}
      <section aria-labelledby="ondas" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">{ONDAS.eyebrow}</p>
          <h2 id="ondas">{ONDAS.titulo}</h2>
          <p className="mt-3 text-text-muted">{ONDAS.intro}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {ONDAS.ondas.map((onda, i) => (
              <li key={onda.nome}>
                <Card className="h-full">
                  <span
                    aria-hidden
                    className="font-display text-sm font-bold text-accent-ink"
                  >{`0${i + 1}`}</span>
                  <p className="mt-2 font-display font-semibold">{onda.nome}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{onda.texto}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Arco — frase-âncora literal (CONTENT.md §3) ===== */}
      <section aria-label="Arco da marca" className="border-t border-border">
        <div className="container-site py-16">
          <blockquote className="rounded-lg bg-surface-alt px-8 py-10 text-center">
            <p className="mx-auto max-w-[36ch] font-display text-2xl font-bold italic text-balance">
              “{ARCO}”
            </p>
          </blockquote>
        </div>
      </section>

      {/* ===== Moat + categoria + modelo de receita ===== */}
      <section aria-labelledby="moat" className="section-pad border-t border-border">
        <div className="container-site grid gap-8 md:grid-cols-3">
          <Card className="h-full">
            <p className="eyebrow">{MOAT.eyebrow}</p>
            <h2 id="moat" className="mt-3 text-2xl">
              {MOAT.titulo}
            </h2>
            <p className="mt-4 leading-relaxed text-text-muted">{MOAT.corpo}</p>
          </Card>
          <Card className="h-full">
            <p className="eyebrow">{CATEGORIA.eyebrow}</p>
            <h2 className="mt-3 text-2xl">{CATEGORIA.titulo}</h2>
            <p className="mt-4 leading-relaxed text-text-muted">{CATEGORIA.corpo}</p>
            <p className="mt-4 font-display italic text-text">“{CATEGORIA.frase}”</p>
          </Card>
          <Card className="h-full">
            <p className="eyebrow">{RECEITA.eyebrow}</p>
            <h2 className="mt-3 text-2xl">{RECEITA.titulo}</h2>
            <p className="mt-4 leading-relaxed text-text-muted">{RECEITA.corpo}</p>
          </Card>
        </div>
      </section>

      {/* ===== Como validamos ===== */}
      <section aria-labelledby="validacao" className="section-pad border-t border-border">
        <div className="container-site">
          <Card>
            <p className="eyebrow">{VALIDACAO.eyebrow}</p>
            <h2 id="validacao" className="mt-3 text-2xl">
              {VALIDACAO.titulo}
            </h2>
            <p className="prose-width mt-4 leading-relaxed text-text-muted">{VALIDACAO.corpo}</p>
          </Card>
        </div>
      </section>

      {/* ===== FAQ — CONTENT.md §12 (schema 1:1 no topo) ===== */}
      <section aria-labelledby="faq" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 id="faq">Perguntas frequentes</h2>
          <div className="mt-10">
            <Faq items={FAQ} />
          </div>
        </div>
      </section>

      <CtaPiloto />
    </>
  );
}
