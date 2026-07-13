import type { Metadata } from "next";
import Link from "next/link";
import FaqLista from "@/components/FaqLista";
import JsonLd from "@/components/JsonLd";
import SeloQuemAssina from "@/components/SeloQuemAssina";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Auditoria-IA. 35 testes e papéis assinados",
  description:
    "Subpágina técnica da Auditoria-IA: 35 testes sobre 10 documentos, papéis de trabalho rascunhados pelo motor, auditados pela camada antagônica e assinados por CFC.",
  alternates: { canonical: "/auditoria-ia" },
};

const BLOCOS_TESTE = [
  {
    grupo: "Circularização e conciliação",
    descricao:
      "Testes de saldo bancário, fornecedores e clientes. O motor concilia, aponta divergência e monta a evidência.",
  },
  {
    grupo: "Receita e corte",
    descricao:
      "Testes de cut-off, reconhecimento e documentação suporte. Rascunho com trilha de auditoria por item.",
  },
  {
    grupo: "Estoque e imobilizado",
    descricao:
      "Recontagem documental, depreciação e impairment. Classificação e extração automáticas com exceções sinalizadas.",
  },
  {
    grupo: "Provisões e contingências",
    descricao:
      "Cruzamento com relatórios jurídicos e recalculo de provisão. A camada antagônica contesta premissas antes do humano.",
  },
  {
    grupo: "Tributos e Reforma CBS IBS",
    descricao:
      "Reclassificação de operações na transição 2026-27, recalculo de créditos e testes de aderência ao novo regime.",
  },
];

const FAQS = [
  {
    pergunta: "O que são os 35 testes sobre 10 documentos?",
    resposta:
      "O escopo padrão do piloto: 35 testes de auditoria aplicados sobre 10 tipos de documento da firma, com papéis de trabalho gerados pelo motor e auditados pela camada antagônica antes do auditor.",
  },
  {
    pergunta: "Quem assina os papéis de trabalho?",
    resposta:
      "Sempre um auditor com registro CFC. O motor rascunha, a camada antagônica contesta, o especialista revisa, decide e assina no ponto de responsabilidade.",
  },
  {
    pergunta: "O motor funciona com o meu sistema contábil?",
    resposta:
      "O motor ingere o corpus da firma: balancetes, razão, notas e políticas, em arquivo ou integração. Legados e planilhas entram na ingestão do corpus.",
  },
];

export default function AuditoriaIaPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cunha Contábil", path: "/cunha-contabil" },
          { name: "Auditoria-IA", path: "/auditoria-ia" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Subpágina técnica · Cunha contábil</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            Auditoria-IA: 35 testes, 10 documentos, papéis de trabalho
            assinados
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            O motor rascunha os papéis de trabalho. A camada antagônica audita
            antes do humano. O auditor CFC decide e assina no ponto de
            responsabilidade.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">Os blocos de teste</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {BLOCOS_TESTE.map((bloco) => (
            <div key={bloco.grupo} className="card">
              <h3 className="text-base font-bold">{bloco.grupo}</h3>
              <p className="mt-2 text-sm text-muted">{bloco.descricao}</p>
            </div>
          ))}
          <div className="card border-neural">
            <h3 className="text-base font-bold text-neural">
              Papéis de trabalho com trilha completa
            </h3>
            <p className="mt-2 text-sm text-muted">
              Cada teste gera papel de trabalho com evidência, contestação da
              camada antagônica e campo de decisão do auditor. Nada sai sem
              assinatura.
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
      </section>

      <section className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-2xl font-extrabold">Perguntas frequentes</h2>
          <div className="mt-6">
            <FaqLista faqs={[...FAQS]} />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/cunha-contabil#quiz" className="btn-primary">
              Fazer teste 4+1 em 60s
            </Link>
            <Link href="/cases/contabil" className="btn-secondary">
              Ver o case medido
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
