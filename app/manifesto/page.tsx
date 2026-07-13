import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { FRASES_ANCORA } from "@/lib/site";

export const metadata: Metadata = {
  title: "Manifesto. Autonomia limitada e quem assina é o produto",
  description:
    "O manifesto QuipeAI: a categoria que inverte a Sierra. Eles tratam o handoff como falha. Nós tratamos a assinatura como produto. Revolução 5.0.",
  alternates: { canonical: "/manifesto" },
};

const TESES = [
  {
    titulo: "A IA aposenta o trabalho-commodity",
    texto:
      "Conciliar, triar, rascunhar, classificar, extrair. A fatia repetitiva e sem julgamento sai da mão do especialista. Isso é a Revolução 5.0.",
  },
  {
    titulo: "O especialista decide e assina",
    texto:
      "No ponto de responsabilidade a autonomia para, por desenho. Sempre um humano. A máquina não vai presa. Alguém tem que assinar.",
  },
  {
    titulo: "A assinatura é o produto",
    texto:
      "A Sierra trata o handoff humano como falha a eliminar. Nós tratamos a assinatura como o produto a proteger. Durável por regulação: EU AI Act, CFC, BoE FCA.",
  },
  {
    titulo: "Cobramos onde o agente não assume a conta",
    texto:
      "Resultado medido, antes e depois. Com 30% de equity quando subsidiamos o build. Alinhamos risco no upside, não em licença.",
  },
  {
    titulo: "Lock-in é valor acumulado",
    texto:
      "Motor treinado no contexto do cliente, acoplamento antagônico não portável e melhoria contínua. O cliente não te troca porque trocar custa o projeto inteiro.",
  },
];

export default function ManifestoPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Manifesto", path: "/manifesto" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Camada 3 · A categoria</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            Manifesto: autonomia limitada e quem assina é o produto
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Por Luiz Guilherme, fundador da QuipeAI. Tomamos as posições que o
            concorrente não toma e publicamos números e decisões reais.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <ol className="space-y-6">
          {TESES.map((tese, index) => (
            <li key={tese.titulo} className="card flex gap-6">
              <span className="numero-serif shrink-0">{index + 1}</span>
              <div>
                <h2 className="text-xl font-extrabold">{tese.titulo}</h2>
                <p className="mt-2 text-muted">{tese.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 space-y-4">
          {FRASES_ANCORA.map((frase) => (
            <blockquote key={frase} className="quote-serif">
              {frase}
            </blockquote>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/metodo" className="btn-secondary">
            Ver o método em 5 etapas
          </Link>
          <Link href="/cunha-contabil#quiz" className="btn-primary">
            Fazer teste 4+1 em 60s
          </Link>
        </div>
      </section>
    </>
  );
}
