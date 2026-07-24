import type { Metadata } from "next";
import { CtaPiloto } from "@/components/sections/CtaPiloto";
import { Oferta } from "@/components/sections/Oferta";
import { Prova } from "@/components/sections/Prova";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import { Faq } from "@/components/ui/Faq";
import { HeroNodes } from "@/components/ui/HeroNodes";
import { JsonLd } from "@/components/ui/JsonLd";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { Reveal } from "@/components/ui/Reveal";
import { ARCO, CAMINHOS, COMO_FUNCIONA, FAQ, HERO, TENSAO } from "@/content/home";
import { faqPageSchema } from "@/lib/schema";

/* SEO-AGEO.md §5 — rota "/" */
export const metadata: Metadata = {
  title: "QuipeAI — IA que assume o resultado, com um humano que assina",
  description:
    "Fábrica de produto AI-first. A IA aposenta o trabalho-commodity, o especialista assina, você paga por resultado. Não fazemos agentes autônomos.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPageSchema(FAQ)} />

      {/* ===== Hero — CONTENT.md §5 ===== */}
      <section className="relative overflow-hidden section-pad">
        <HeroNodes className="pointer-events-none absolute -right-24 top-1/2 hidden aspect-square h-[130%] max-h-none -translate-y-1/2 opacity-80 lg:block" />
        <div className="container-site relative flex flex-col items-start gap-6">
          <p className="eyebrow flex items-center gap-3">
            <NodeGlow size={8} />
            {HERO.eyebrow}
          </p>
          <h1 className="max-w-[20ch] text-balance">{HERO.h1}</h1>
          <p className="prose-width text-lg text-text-muted">{HERO.subtitle}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button href={HERO.ctaPrimary.href} event="cta_piloto">
              {HERO.ctaPrimary.label}
            </Button>
            <Button href={HERO.ctaSecondary.href} variant="secondary" event="cta_metodo">
              {HERO.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Tensão — aposta contrária + dados com fonte nomeada (PLAN.md §3) ===== */}
      <section aria-labelledby="tensao" className="section-pad border-t border-border">
        <div className="container-site">
          <p className="eyebrow mb-4">{TENSAO.eyebrow}</p>
          <h2 id="tensao" className="max-w-[32ch] text-balance">
            {TENSAO.claim}
          </h2>
          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {TENSAO.dados.map((dado, i) => (
              <Reveal key={dado.valor} delay={i * 80}>
                <Card>
                  <dt className="sr-only">{dado.fonte}</dt>
                  <dd>
                    <CountUp
                      text={dado.valor}
                      className="block font-display text-3xl font-extrabold text-accent-ink"
                    />
                    <span className="mt-2 block text-sm leading-relaxed text-text-muted">
                      {dado.texto}
                    </span>
                  </dd>
                </Card>
              </Reveal>
            ))}
          </dl>
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

      {/* ===== Como funciona (5 passos) — CONTENT.md §6 ===== */}
      <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="section-pad">
        <div className="container-site">
          <p className="eyebrow mb-4">O MÉTODO</p>
          <h2 id="como-funciona-titulo">{COMO_FUNCIONA.titulo}</h2>
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
            <li>
              <Card className="h-full border-accent/40 bg-surface-alt">
                <span aria-hidden className="font-display text-sm font-bold text-accent-ink">
                  O MOAT
                </span>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {COMO_FUNCIONA.lockIn}
                </p>
              </Card>
            </li>
          </ol>
        </div>
      </section>

      {/* ===== Prova — os 3 produtos ao vivo (Fosso G3, prova própria) ===== */}
      <Prova />

      {/* ===== 3 caminhos por público — CONTENT.md §7 ===== */}
      <section aria-labelledby="caminhos" className="section-pad border-t border-border">
        <div className="container-site">
          {/* TODO(copy): headline própria desta seção, se o owner quiser algo além do rótulo factual */}
          <p className="eyebrow mb-4">TRÊS CAMINHOS POR PÚBLICO</p>
          <h2 id="caminhos">Cliente, investidor e ecossistema tech</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {CAMINHOS.map((caminho) => (
              <Card key={caminho.publico} interactive className="flex h-full flex-col">
                <p className="eyebrow">{caminho.publico}</p>
                <h3 className="mt-3 text-lg">{caminho.titulo}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                  {caminho.texto}
                </p>
                <div className="mt-6">
                  <Button href={caminho.cta.href} variant="secondary" event={caminho.cta.event}>
                    {caminho.cta.label}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Escada de ofertas — Fosso G1 (isca → entrada → core) ===== */}
      <Oferta />

      {/* ===== FAQ — CONTENT.md §12 (schema FAQPage 1:1 acima) ===== */}
      <section aria-labelledby="faq" className="section-pad border-t border-border">
        <div className="container-site">
          {/* TODO(copy): headline própria desta seção, se o owner quiser algo além do rótulo funcional */}
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
