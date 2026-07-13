import type { Metadata } from "next";
import Link from "next/link";
import FaqLista from "@/components/FaqLista";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Modelo 30%. Equity quando a QuipeAI subsidia o build",
  description:
    "Como funciona o modelo de 30% de participação: a QuipeAI subsidia o build e entra no resultado. Alinha risco no upside, atrai o cliente certo e repele o errado.",
  alternates: { canonical: "/modelo-30-porcento" },
};

const FAQS_EQUITY = [
  {
    pergunta: "Quando os 30% se aplicam?",
    resposta:
      "Quando a QuipeAI subsidia o build do motor no seu contexto. Você não paga o desenvolvimento adiantado e a QuipeAI entra com 30% de participação no resultado gerado.",
  },
  {
    pergunta: "30% de quê, exatamente?",
    resposta:
      "Do resultado da operação alavancada pelo motor, definido em contrato com métrica auditável antes e depois. Não é 30% da sua empresa inteira.",
  },
  {
    pergunta: "E se eu preferir pagar o build?",
    resposta:
      "Existe o caminho de cobrança por resultado sem equity. O modelo 30% existe para alinhar risco: a QuipeAI só ganha se você ganhar.",
  },
  {
    pergunta: "Por que esse modelo repele o cliente errado?",
    resposta:
      "Quem só quer cortar custo não topa dividir upside. Quem tem demanda represada e quer multiplicar vazão topa. O modelo é filtro, não só preço.",
  },
  {
    pergunta: "Quem decide e assina continua sendo meu especialista?",
    resposta:
      "Sempre. O especialista da sua operação decide e assina no ponto de responsabilidade. A assinatura é o produto e continua sendo o seu nome.",
  },
];

export default function Modelo30Page() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS_EQUITY)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Modelo 30%", path: "/modelo-30-porcento" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Camada 2 · Fábrica</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            O modelo 30%: sócios do resultado, não fornecedores de software
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Quando a QuipeAI subsidia o build, entra com 30% de participação no
            resultado. Alinha risco no upside. Não vendemos software. Viramos
            sócios do resultado.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">Como o alinhamento funciona</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="card">
            <h3 className="text-base font-bold">QuipeAI subsidia o build</h3>
            <p className="mt-2 text-sm text-muted">
              O motor é treinado no seu corpus sem custo de desenvolvimento
              adiantado. O risco do build é nosso.
            </p>
          </div>
          <div className="card">
            <h3 className="text-base font-bold">Você multiplica a vazão</h3>
            <p className="mt-2 text-sm text-muted">
              O trabalho-commodity vai para o motor. Seu especialista decide e
              assina no ponto de responsabilidade com muito mais vazão.
            </p>
          </div>
          <div className="card">
            <h3 className="text-base font-bold">Dividimos o upside</h3>
            <p className="mt-2 text-sm text-muted">
              30% do resultado medido, definido em contrato com métrica
              auditável. A QuipeAI só ganha se você ganhar.
            </p>
          </div>
        </div>
        <blockquote className="quote-serif mt-10 max-w-2xl">
          Atrai quem topa dividir upside. Repele quem só quer cortar custo.
        </blockquote>
      </section>

      <section className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-2xl font-extrabold">FAQ do equity</h2>
          <div className="mt-6">
            <FaqLista faqs={[...FAQS_EQUITY]} />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/cunha-contabil#quiz" className="btn-primary">
              Fazer teste 4+1 em 60s
            </Link>
            <Link href="/fabrica" className="btn-secondary">
              Conhecer a Fábrica
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
