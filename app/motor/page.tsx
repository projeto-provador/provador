import type { Metadata } from "next";
import Link from "next/link";
import MotorDiagram from "@/components/MotorDiagram";
import FaqLista from "@/components/FaqLista";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { CANONICAS, METRICA_CASE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Motor proprietário e acoplamento antagônico",
  description:
    "O motor proprietário orquestra dado, modelo e regra do negócio. O acoplamento antagônico não é portável. Lock-in é valor acumulado, não contrato.",
  alternates: { canonical: "/motor" },
};

const FAQS = [
  {
    pergunta: "O que é o motor proprietário?",
    resposta:
      "Camada que orquestra dado, modelo e regra do negócio do cliente. Treinado no contexto do projeto, melhora a cada ciclo.",
  },
  {
    pergunta: "O que é acoplamento antagônico?",
    resposta:
      "Dados e modelos se calibram mutuamente no contexto do projeto, com um agente adversarial contestando o rascunho antes do humano. Não é portável.",
  },
  {
    pergunta: "Por que o lock-in não é contrato?",
    resposta: CANONICAS.moat,
  },
];

export default function MotorPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Motor", path: "/motor" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Moat</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            Motor proprietário: o valor não está na ferramenta
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{CANONICAS.moat}</p>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">O motor em 5 etapas</h2>
        <p className="mt-4 max-w-2xl text-muted">
          O rascunho é commodity. A auditoria antagônica vem antes do humano. O
          especialista decide e assina no ponto de responsabilidade.
        </p>
        <div className="mt-10">
          <MotorDiagram />
        </div>
      </section>

      <section className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-3xl font-extrabold">Acoplamento antagônico</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="card">
              <h3 className="text-base font-bold">Dado calibra modelo</h3>
              <p className="mt-2 text-sm text-muted">
                Normas, contratos e casos do cliente treinam o motor no
                contexto do projeto. Corpus vivo, não dataset genérico.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-bold">Modelo contesta dado</h3>
              <p className="mt-2 text-sm text-muted">
                O agente adversarial audita o rascunho, aponta inconsistência e
                devolve o que precisa de olho especialista.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-bold">Ciclo melhora o motor</h3>
              <p className="mt-2 text-sm text-muted">
                Cada assinatura realimenta regra e curadoria. Sair é jogar fora
                o aprendizado acumulado.
              </p>
            </div>
          </div>
          <blockquote className="quote-serif mt-10 max-w-2xl">
            O cliente não te troca porque trocar custa o projeto inteiro.
          </blockquote>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">Número medido, não promessa</h2>
        <div className="card mt-8 flex flex-wrap items-center gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">Antes</p>
            <p className="numero-serif">12 dias</p>
            <p className="text-sm text-muted">até a primeira entrega</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">Depois</p>
            <p className="numero-serif">2 dias</p>
            <p className="text-sm text-muted">{METRICA_CASE.contexto}</p>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Vazão sobe, qualidade se mantém, o especialista continua decidindo
            e assinando no ponto de responsabilidade.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/cases/contabil" className="btn-secondary">
            Ver o case completo
          </Link>
          <Link href="/cunha-contabil#quiz" className="btn-primary">
            Fazer teste 4+1 em 60s
          </Link>
        </div>
      </section>

      <section className="border-t border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-2xl font-extrabold">Perguntas frequentes</h2>
          <div className="mt-6">
            <FaqLista faqs={[...FAQS]} />
          </div>
        </div>
      </section>
    </>
  );
}
