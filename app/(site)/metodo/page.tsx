import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CtaPiloto } from "@/components/sections/CtaPiloto";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { ARCO, COMO_FUNCIONA, FAQ } from "@/content/home";
import { DEFINICAO, MOAT, QUATRO_PERGUNTAS, RECEITA } from "@/content/metodo";
import { faqPageSchema } from "@/lib/schema";

/* SEO-AGEO.md §5 — rota /metodo */
export const metadata: Metadata = {
  title: "O Método (Revolução 5.0) — QuipeAI",
  description:
    "Como funciona a IA com autonomia limitada e humano no ponto de responsabilidade. As 4 perguntas que definem se seu negócio é ICP.",
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

      {/* ===== As 4 perguntas do ICP — CONTENT.md §4 ===== */}
      <section aria-labelledby="icp" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">AS 4 PERGUNTAS</p>
          <h2 id="icp">{QUATRO_PERGUNTAS.titulo}</h2>
          <p className="mt-3 text-text-muted">{QUATRO_PERGUNTAS.intro}</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {QUATRO_PERGUNTAS.perguntas.map((pergunta, i) => (
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
          <p className="prose-width mt-6 text-sm text-text-muted">{QUATRO_PERGUNTAS.nota}</p>
        </div>
      </section>

      {/* ===== Como funciona (5 passos) — CONTENT.md §6 ===== */}
      <section aria-labelledby="passos" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">PASSO A PASSO</p>
          <h2 id="passos">{COMO_FUNCIONA.titulo}</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COMO_FUNCIONA.passos.map((passo, i) => (
              <li key={passo.titulo}>
                <Card className="h-full">
                  <span
                    aria-hidden
                    className="font-display text-sm font-bold text-accent-ink"
                  >{`0${i + 1}`}</span>
                  <h3 className="mt-2 text-lg">{passo.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{passo.texto}</p>
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

      {/* ===== Moat + modelo de receita ===== */}
      <section aria-labelledby="moat" className="section-pad border-t border-border">
        <div className="container-site grid gap-8 md:grid-cols-2">
          <Card className="h-full">
            <p className="eyebrow">{MOAT.eyebrow}</p>
            <h2 id="moat" className="mt-3 text-2xl">
              {MOAT.titulo}
            </h2>
            <p className="mt-4 leading-relaxed text-text-muted">{MOAT.corpo}</p>
          </Card>
          <Card className="h-full">
            <p className="eyebrow">{RECEITA.eyebrow}</p>
            <h2 className="mt-3 text-2xl">{RECEITA.titulo}</h2>
            <p className="mt-4 leading-relaxed text-text-muted">{RECEITA.corpo}</p>
            {/* TODO(copy): critérios objetivos do gate de equity (pendência do owner) */}
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
