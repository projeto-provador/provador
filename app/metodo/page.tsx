import type { Metadata } from "next";
import Link from "next/link";
import MotorDiagram from "@/components/MotorDiagram";
import FaqLista from "@/components/FaqLista";
import JsonLd from "@/components/JsonLd";
import { howToMetodoSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { CANONICAS, FILTRO_4_MAIS_1 } from "@/lib/site";

export const metadata: Metadata = {
  title: "Método QuipeAI em 5 etapas",
  description:
    "Página canônica do método: ingestão do corpus, rascunho-commodity, camada antagônica, especialista assina e resultado com equity. A assinatura é o produto.",
  alternates: { canonical: "/metodo" },
};

const FAQS_METODO = [
  {
    pergunta: "O método QuipeAI tira o especialista do processo?",
    resposta:
      "Não. A autonomia é limitada por desenho. O especialista revisa, decide e assina no ponto de responsabilidade. A assinatura é o produto.",
  },
  {
    pergunta: "O que a camada antagônica faz?",
    resposta:
      "Um agente adversarial contesta e audita o rascunho antes do humano. Reduz erro e expõe o que precisa de olho especialista.",
  },
  {
    pergunta: "Como a QuipeAI cobra?",
    resposta:
      "Por resultado. Quando a QuipeAI subsidia o build, entra com 30% de participação. Alinha risco e ganha no upside.",
  },
];

export default function MetodoPage() {
  return (
    <>
      <JsonLd data={howToMetodoSchema()} />
      <JsonLd data={faqSchema(FAQS_METODO)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Método", path: "/metodo" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Página canônica</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            O método QuipeAI: 5 etapas imutáveis, um ponto de responsabilidade
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            A IA aposenta o trabalho-commodity. O especialista decide e assina.
            Cobramos por resultado onde agente autônomo não assume a conta.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">As 5 etapas</h2>
        <div className="mt-10">
          <MotorDiagram />
        </div>
      </section>

      <section className="border-y border-borda bg-card/40">
        <div className="container-site grid gap-8 py-16 md:grid-cols-2">
          <div className="card">
            <h2 className="text-xl font-extrabold">Definições que travam o método</h2>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="font-title font-bold text-neural">
                  Trabalho-commodity
                </dt>
                <dd className="mt-1 text-sm text-muted">
                  {CANONICAS.trabalhoCommodity}{" "}
                  <Link href="/trabalho-commodity" className="link-inline">
                    Definição completa
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="font-title font-bold text-neural">
                  Ponto de responsabilidade
                </dt>
                <dd className="mt-1 text-sm text-muted">
                  {CANONICAS.pontoDeResponsabilidade}{" "}
                  <Link
                    href="/ponto-de-responsabilidade"
                    className="link-inline"
                  >
                    Definição completa
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="font-title font-bold text-neural">Moat e lock-in</dt>
                <dd className="mt-1 text-sm text-muted">
                  {CANONICAS.moat}{" "}
                  <Link href="/motor" className="link-inline">
                    Ver o motor
                  </Link>
                </dd>
              </div>
            </dl>
          </div>

          <div className="card">
            <h2 className="text-xl font-extrabold">Filtro ICP 4+1</h2>
            <p className="mt-3 text-sm text-muted">
              Regra de qualificação. Quatro sins mais a arena.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[320px] text-left text-sm">
                <thead>
                  <tr className="border-b border-borda text-muted">
                    <th scope="col" className="pb-2 pr-3">#</th>
                    <th scope="col" className="pb-2">Pergunta</th>
                  </tr>
                </thead>
                <tbody>
                  {FILTRO_4_MAIS_1.map((item, index) => (
                    <tr key={item.id} className="border-b border-borda/60 align-top">
                      <td className="py-3 pr-3 font-serif font-bold text-blueLight">
                        {index === 4 ? "+1" : index + 1}
                      </td>
                      <td className="py-3 text-muted">
                        <span className="font-semibold text-white">{item.curto}.</span>{" "}
                        {item.pergunta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted">
              Sem o sim na capacidade represada não é ICP-A. Regulado é Onda 1:
              responsabilidade é lei, o começo mais fácil.
            </p>
          </div>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">Anti-perfil. Quem não é cliente</h2>
        <p className="mt-4 max-w-3xl text-muted">{CANONICAS.antiPerfil}</p>
        <blockquote className="quote-serif mt-8 max-w-2xl">
          A máquina não vai presa. Alguém tem que assinar.
        </blockquote>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/cunha-contabil#quiz" className="btn-primary">
            Fazer teste 4+1 em 60s
          </Link>
          <Link href="/modelo-30-porcento" className="btn-secondary">
            Entender o modelo 30%
          </Link>
        </div>
      </section>

      <section className="border-t border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-2xl font-extrabold">Perguntas frequentes do método</h2>
          <div className="mt-6">
            <FaqLista faqs={[...FAQS_METODO]} />
          </div>
        </div>
      </section>
    </>
  );
}
