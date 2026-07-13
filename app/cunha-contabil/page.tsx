import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import FaqLista from "@/components/FaqLista";
import JsonLd from "@/components/JsonLd";
import QuizFiltro from "@/components/QuizFiltro";
import CalculadoraVazao from "@/components/CalculadoraVazao";
import SeloQuemAssina from "@/components/SeloQuemAssina";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cunha contábil. Reforma CBS IBS e demanda represada",
  description:
    "Reforma CBS IBS 2026-27 com escassez de contadores. Auditoria contábil com IA, primeira entrega em 2 dias e assinatura CFC. Teste 4+1 e 3 vagas de piloto.",
  alternates: { canonical: "/cunha-contabil" },
};

const FAQS_CUNHA = [
  {
    pergunta: "Por que a contabilidade é a Onda 1 da QuipeAI?",
    resposta:
      "Responsabilidade é lei pelo CFC, o resultado é objetivo e auditável e a Reforma CBS IBS 2026-27 criou demanda represada com escassez de contadores. Regulado primeiro: o começo mais fácil.",
  },
  {
    pergunta: "O que muda com a Reforma Tributária CBS IBS para firmas contábeis?",
    resposta:
      "Transição 2026-27 com dois regimes convivendo, reclassificação de operações e clientes pedindo mais trabalho ao mesmo tempo. 53% das empresas estão contratando 3 ou mais pessoas para a transição e faltam contadores no mercado.",
  },
  {
    pergunta: "A IA assina a auditoria?",
    resposta:
      "Não. O motor rascunha papéis de trabalho e a camada antagônica audita antes do humano. O auditor com registro CFC revisa, decide e assina no ponto de responsabilidade. A assinatura é o produto.",
  },
  {
    pergunta: "O que é o piloto pago?",
    resposta:
      "3 vagas para firmas ICP-A: vertical única, métrica auditável antes e depois, especialista que decide e assina, cobrança por resultado. Sem prova de conceito gratuita.",
  },
  {
    pergunta: "Quanto tempo até a primeira entrega?",
    resposta:
      "No case medido da cunha, a primeira entrega caiu de 12 dias para 2 dias com a mesma assinatura CFC e qualidade mantida.",
  },
];

export default function CunhaContabilPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          titulo: "Cunha contábil: Reforma CBS IBS, demanda represada e auditoria com IA",
          descricao:
            "Hub da cunha contábil da QuipeAI: dor de demanda represada, Reforma Tributária CBS IBS, calculadora de vazão, case medido e 3 vagas de piloto pago.",
          path: "/cunha-contabil",
          dataPublicacao: "2026-07-13",
        })}
      />
      <JsonLd data={faqSchema(FAQS_CUNHA)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cunha Contábil", path: "/cunha-contabil" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Onda 1 · Caixa · Receita agora</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            Reforma tributária, contabilidade e falta de mão: a cunha contábil
            da QuipeAI
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Sua firma recusa projeto por falta de mão enquanto a Reforma CBS
            IBS 2026-27 dobra a demanda. O motor assume o trabalho-commodity.
            O auditor decide e assina no ponto de responsabilidade.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#quiz" className="btn-primary">
              Fazer teste 4+1 para saber se é ICP-A
            </a>
            <a href="#calculadora" className="btn-secondary">
              Calcular horas de commodity
            </a>
          </div>
        </div>
      </section>

      <section className="container-site py-16" aria-label="A dor da cunha">
        <h2 className="text-3xl font-extrabold">
          A dor: demanda represada e pirâmide cara
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="card">
            <p className="numero-serif">53%</p>
            <p className="mt-2 text-sm text-muted">
              das empresas estão contratando 3 ou mais pessoas para a transição
              da Reforma. Fonte: Robert Half e Fenacon, dezembro de 2025.
            </p>
          </div>
          <div className="card">
            <p className="numero-serif">2026-27</p>
            <p className="mt-2 text-sm text-muted">
              transição CBS IBS com dois regimes convivendo. Auditoria e
              reclassificação em volume que a pirâmide atual não entrega.
            </p>
          </div>
          <div className="card">
            <p className="numero-serif">CFC</p>
            <p className="mt-2 text-sm text-muted">
              responsabilidade é lei. Todo parecer exige assinatura de
              profissional habilitado. A máquina não vai presa. Alguém tem que
              assinar.
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-muted">
          O dono da firma se afoga no commodity ou paga uma pirâmide de
          juniores lenta e cara até a primeira entrega, com risco de perder o
          investimento quando o júnior sai. E a assinatura é sempre dele.
        </p>
      </section>

      <section className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-3xl font-extrabold">A oferta da cunha</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="card">
              <p className="eyebrow">ContabilizAI</p>
              <p className="mt-3 text-sm text-muted">
                Motor treinado no corpus da firma: normas, planos de contas e
                casos históricos. O rascunho-commodity sai da mão do
                especialista.
              </p>
            </div>
            <div className="card">
              <p className="eyebrow">Auditoria-IA</p>
              <p className="mt-3 text-sm text-muted">
                35 testes sobre 10 documentos com papéis de trabalho
                rascunhados pela máquina e auditados pela camada antagônica
                antes do humano.{" "}
                <Link href="/auditoria-ia" className="link-inline">
                  Ver a subpágina técnica
                </Link>
              </p>
            </div>
            <div className="card">
              <p className="eyebrow">Veritum assina</p>
              <p className="mt-3 text-sm text-muted">
                O auditor com registro CFC revisa, decide e assina. A
                assinatura é o produto e continua sendo o nome da firma.
              </p>
            </div>
          </div>
          <div className="mt-8 max-w-md">
            <SeloQuemAssina
              nome="Especialista Veritum"
              registro="Registro CFC ativo"
              iniciais="VT"
              cargo="Auditoria contábil"
            />
          </div>
        </div>
      </section>

      <section id="calculadora" className="container-site scroll-mt-24 py-16">
        <CalculadoraVazao />
      </section>

      <section className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-3xl font-extrabold">Case medido, não promessa</h2>
          <div className="card mt-8 flex flex-wrap items-center gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Antes</p>
              <p className="numero-serif">12 dias</p>
              <p className="text-sm text-muted">até a primeira entrega</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Depois</p>
              <p className="numero-serif">2 dias</p>
              <p className="text-sm text-muted">mesma assinatura CFC</p>
            </div>
            <div className="max-w-sm">
              <p className="text-sm text-muted">
                Qualidade mantida, vazão multiplicada e o especialista no ponto
                de responsabilidade.
              </p>
              <Link href="/cases/contabil" className="link-inline mt-3 inline-block">
                Ver o case completo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-16" aria-label="Teste e vagas de piloto">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <Suspense
            fallback={
              <div id="quiz" className="card scroll-mt-24">
                <p className="eyebrow">Teste 4+1</p>
                <h2 className="mt-2 text-2xl font-extrabold">
                  Descubra em 60s se você é ICP-A da Onda 1
                </h2>
                <p className="mt-4 text-sm text-muted">Carregando o teste...</p>
              </div>
            }
          >
            <QuizFiltro />
          </Suspense>
          <aside className="card h-fit border-neural">
            <p className="eyebrow">3 vagas de piloto pago</p>
            <p className="mt-3 text-sm text-muted">
              Onda 1, vertical única. Firmas ICP-A com demanda represada,
              métrica auditável antes e depois e especialista que decide e
              assina. Cobrança por resultado, com 30% de equity quando a
              QuipeAI subsidia o build.
            </p>
            <p className="mt-4 text-sm text-muted">
              Passou no teste como ICP-A? A agenda de 15 minutos abre na hora,
              toque 1.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-2xl font-extrabold">
            Perguntas frequentes da cunha contábil
          </h2>
          <div className="mt-6">
            <FaqLista faqs={[...FAQS_CUNHA]} />
          </div>
        </div>
      </section>
    </>
  );
}
