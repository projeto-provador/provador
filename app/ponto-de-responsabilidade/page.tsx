import type { Metadata } from "next";
import Link from "next/link";
import FaqLista from "@/components/FaqLista";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { CANONICAS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ponto de responsabilidade. O que é e por que dura",
  description:
    "Ponto de responsabilidade: momento onde o risco se concentra e alguém precisa decidir, assinar e responder. Por que a regulação torna a assinatura durável.",
  alternates: { canonical: "/ponto-de-responsabilidade" },
};

const REGULACOES = [
  {
    regime: "EU AI Act",
    vigencia: "Agosto de 2026",
    exigencia:
      "Sistemas de alto risco exigem supervisão humana efetiva e responsável identificado.",
  },
  {
    regime: "CFC (Brasil)",
    vigencia: "Vigente",
    exigencia:
      "Demonstrações e pareceres contábeis exigem assinatura de profissional habilitado. Responsabilidade é lei.",
  },
  {
    regime: "BoE / FCA (Reino Unido)",
    vigencia: "Vigente",
    exigencia:
      "Cerca de 84% dos casos de uso exigem um responsável humano identificado pela decisão.",
  },
];

const FAQS = [
  {
    pergunta: "O que é ponto de responsabilidade?",
    resposta: CANONICAS.pontoDeResponsabilidade,
  },
  {
    pergunta: "A autonomia total elimina o ponto de responsabilidade?",
    resposta:
      "Não. Onde errar tem consequência real, alguém precisa assinar e responder. A máquina não vai presa. Alguém tem que assinar.",
  },
  {
    pergunta: "Por que a assinatura é durável?",
    resposta:
      "Regulação. EU AI Act em agosto de 2026, CFC no Brasil e BoE FCA no Reino Unido exigem responsável humano. A assinatura é o produto e não desaparece com mais IA.",
  },
];

export default function PontoDeResponsabilidadePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Ponto de responsabilidade", path: "/ponto-de-responsabilidade" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Definição canônica</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            Ponto de responsabilidade
          </h1>
          <dl className="mt-8 max-w-2xl">
            <dt className="font-title font-bold text-neural">Definição</dt>
            <dd className="mt-2 text-lg text-muted">
              {CANONICAS.pontoDeResponsabilidade}
            </dd>
          </dl>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">Onde a autonomia para</h2>
        <p className="mt-4 max-w-3xl text-muted">
          O motor QuipeAI produz o rascunho-commodity e a camada antagônica
          audita antes do humano. No ponto de responsabilidade, o especialista
          revisa, decide e assina. Ali a autonomia para, por desenho. Não
          prometemos autonomia total. Tratamos a assinatura como produto,
          enquanto a Sierra trata o handoff como falha.
        </p>
        <blockquote className="quote-serif mt-8 max-w-2xl">
          A máquina não vai presa. Alguém tem que assinar.
        </blockquote>
      </section>

      <section className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-3xl font-extrabold">
            Por que dura: a tabela da regulação
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-borda text-muted">
                  <th scope="col" className="pb-3 pr-4">Regime</th>
                  <th scope="col" className="pb-3 pr-4">Vigência</th>
                  <th scope="col" className="pb-3">Exigência</th>
                </tr>
              </thead>
              <tbody>
                {REGULACOES.map((r) => (
                  <tr key={r.regime} className="border-b border-borda/60 align-top">
                    <td className="py-4 pr-4 font-semibold text-white">{r.regime}</td>
                    <td className="py-4 pr-4 text-neural">{r.vigencia}</td>
                    <td className="py-4 text-muted">{r.exigencia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted">
            Ancoramos em responsabilidade e regulação, não em atacar a
            capacidade dos modelos. Quanto mais IA no commodity, mais valiosa a
            assinatura de quem responde.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-2xl font-extrabold">Perguntas frequentes</h2>
        <div className="mt-6">
            <FaqLista faqs={[...FAQS]} />
          </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/metodo" className="btn-secondary">
            Ver o método completo
          </Link>
          <Link href="/cunha-contabil#quiz" className="btn-primary">
            Fazer teste 4+1 em 60s
          </Link>
        </div>
      </section>
    </>
  );
}
