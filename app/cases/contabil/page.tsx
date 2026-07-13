import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeloQuemAssina from "@/components/SeloQuemAssina";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Case contábil. De 12 para 2 dias, assinatura CFC",
  description:
    "Case medido da cunha contábil: primeira entrega caiu de 12 dias para 2 dias com qualidade mantida e a mesma assinatura CFC. Antes e depois, sem promessa.",
  alternates: { canonical: "/cases/contabil" },
};

const LINHAS_ANTES_DEPOIS = [
  {
    metrica: "Primeira entrega",
    antes: "12 dias",
    depois: "2 dias",
  },
  {
    metrica: "Quem faz o rascunho",
    antes: "Júnior, com retrabalho do sênior",
    depois: "Motor proprietário, com camada antagônica",
  },
  {
    metrica: "Quem decide e assina",
    antes: "Especialista CFC",
    depois: "Especialista CFC, o mesmo",
  },
  {
    metrica: "Qualidade",
    antes: "Padrão da firma",
    depois: "Padrão da firma, mantido e auditado",
  },
];

export default function CaseContabilPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          titulo: "Case contábil: primeira entrega de 12 dias para 2 dias",
          descricao:
            "Case medido da cunha contábil da QuipeAI com vazão multiplicada, qualidade mantida e a mesma assinatura CFC.",
          path: "/cases/contabil",
          dataPublicacao: "2026-07-13",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cunha Contábil", path: "/cunha-contabil" },
          { name: "Case contábil", path: "/cases/contabil" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Case medido · Prova Veritum</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            De 12 dias para 2 dias até a primeira entrega. Mesma assinatura
            CFC
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Publicamos número medido, não promessa. O motor assumiu o
            trabalho-commodity da auditoria e o especialista continuou
            decidindo e assinando no ponto de responsabilidade.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">Antes e depois</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-borda text-muted">
                <th scope="col" className="pb-3 pr-4">Métrica</th>
                <th scope="col" className="pb-3 pr-4">Antes</th>
                <th scope="col" className="pb-3">Depois</th>
              </tr>
            </thead>
            <tbody>
              {LINHAS_ANTES_DEPOIS.map((linha) => (
                <tr key={linha.metrica} className="border-b border-borda/60 align-top">
                  <td className="py-4 pr-4 font-semibold text-white">{linha.metrica}</td>
                  <td className="py-4 pr-4 text-muted">{linha.antes}</td>
                  <td className="py-4 text-neural">{linha.depois}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-3xl font-extrabold">Como o número aconteceu</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            <li className="card">
              <span className="numero-serif">1</span>
              <h3 className="mt-2 text-base font-bold">Ingestão do corpus da firma</h3>
              <p className="mt-2 text-sm text-muted">
                Normas, políticas contábeis e casos históricos treinaram o
                motor no contexto do cliente. Sem dataset genérico.
              </p>
            </li>
            <li className="card">
              <span className="numero-serif">2</span>
              <h3 className="mt-2 text-base font-bold">
                Rascunho e contestação antagônica
              </h3>
              <p className="mt-2 text-sm text-muted">
                Papéis de trabalho rascunhados pela máquina e contestados pelo
                agente adversarial antes de chegar ao auditor.
              </p>
            </li>
            <li className="card">
              <span className="numero-serif">3</span>
              <h3 className="mt-2 text-base font-bold">Decisão e assinatura</h3>
              <p className="mt-2 text-sm text-muted">
                O especialista revisou, decidiu e assinou. A assinatura é o
                produto e continuou sendo o nome da firma.
              </p>
            </li>
          </ol>
          <div className="mt-8 max-w-md">
            <SeloQuemAssina
              nome="Especialista Veritum"
              registro="Registro CFC ativo"
              iniciais="VT"
              cargo="Auditoria contábil"
            />
          </div>
          <blockquote className="quote-serif mt-10 max-w-2xl">
            O cliente não te troca porque trocar custa o projeto inteiro.
          </blockquote>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-2xl font-extrabold">Quer esse número na sua firma?</h2>
        <p className="mt-4 max-w-2xl text-muted">
          3 vagas de piloto pago na Onda 1, com métrica auditável e
          especialista que decide e assina. Comece pelo teste 4+1.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/cunha-contabil#quiz" className="btn-primary">
            Fazer teste 4+1 em 60s
          </Link>
          <Link href="/auditoria-ia" className="btn-secondary">
            Ver a Auditoria-IA por dentro
          </Link>
        </div>
      </section>
    </>
  );
}
