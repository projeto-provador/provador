import type { Metadata } from "next";
import Link from "next/link";
import FaqLista from "@/components/FaqLista";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { CANONICAS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trabalho-commodity. Definição e exemplos por vertical",
  description:
    "Trabalho-commodity: a fatia repetitiva, previsível e sem julgamento do trabalho do especialista. O que a IA aposenta, com exemplos por vertical.",
  alternates: { canonical: "/trabalho-commodity" },
};

const EXEMPLOS_VERTICAL = [
  {
    vertical: "Contábil e auditoria",
    exemplos: "Conciliar lançamentos, triar documentos, rascunhar papéis de trabalho, classificar despesas, extrair dados de notas.",
  },
  {
    vertical: "Jurídico",
    exemplos: "Triar processos, rascunhar minutas, classificar cláusulas, extrair prazos e obrigações de contratos.",
  },
  {
    vertical: "Perícia e engenharia",
    exemplos: "Compilar memoriais, rascunhar laudos, classificar evidências, extrair medições e normas aplicáveis.",
  },
  {
    vertical: "Compliance e ESG",
    exemplos: "Triar alertas, rascunhar relatórios MRV, classificar riscos, extrair indicadores de fontes primárias.",
  },
];

const FAQS = [
  {
    pergunta: "O que é trabalho-commodity?",
    resposta: CANONICAS.trabalhoCommodity,
  },
  {
    pergunta: "Trabalho-commodity é trabalho sem valor?",
    resposta:
      "Não. É trabalho necessário, mas repetível e sem julgamento. O valor do especialista está na curadoria e na assinatura, não na fatia repetitiva.",
  },
  {
    pergunta: "O que acontece com o especialista quando a IA assume o commodity?",
    resposta:
      "Ele sobe para o ponto de responsabilidade. Revisa, decide e assina com mais vazão. Mais vazão vira faturamento, margem e EBITDA.",
  },
];

export default function TrabalhoCommodityPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Trabalho-commodity", path: "/trabalho-commodity" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Definição canônica · Jargão @quipe.ai</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            Trabalho-commodity
          </h1>
          <dl className="mt-8 max-w-2xl">
            <dt className="font-title font-bold text-neural">Definição</dt>
            <dd className="mt-2 text-lg text-muted">{CANONICAS.trabalhoCommodity}</dd>
          </dl>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">Exemplos por vertical</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {EXEMPLOS_VERTICAL.map((item) => (
            <div key={item.vertical} className="card">
              <h3 className="text-base font-bold">{item.vertical}</h3>
              <p className="mt-2 text-sm text-muted">{item.exemplos}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-3xl font-extrabold">
            A IA aposenta o commodity. A assinatura fica
          </h2>
          <p className="mt-4 max-w-3xl text-muted">
            Revolução 5.0: a IA aposenta a fatia repetitiva. O especialista
            decide e assina no ponto de responsabilidade. Errar tem
            consequência e alguém sempre assume. É por isso que a assinatura é
            o produto, não a ferramenta por baixo.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/ponto-de-responsabilidade" className="btn-secondary">
              Ver ponto de responsabilidade
            </Link>
            <Link href="/cunha-contabil#quiz" className="btn-primary">
              Fazer teste 4+1 em 60s
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-2xl font-extrabold">Perguntas frequentes</h2>
        <div className="mt-6">
            <FaqLista faqs={[...FAQS]} />
          </div>
      </section>
    </>
  );
}
