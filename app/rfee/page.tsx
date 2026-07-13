import type { Metadata } from "next";
import Link from "next/link";
import FaqLista from "@/components/FaqLista";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "RFEE. A ponte para o mercado de capitais americano",
  description:
    "RFEE: risk factors com advogado que assina. 200 a 230 IPOs previstos para 2026, backlog de 190 ou mais. Item 105 é ponto de responsabilidade em escala.",
  alternates: { canonical: "/rfee" },
};

const FAQS = [
  {
    pergunta: "O que é o RFEE?",
    resposta:
      "Risk Factor Extraction Engine: a aplicação do método QuipeAI ao Item 105 de risk factors em registros na SEC. O motor rascunha e cruza fatores de risco. O advogado decide e assina.",
  },
  {
    pergunta: "Por que o mercado de capitais é o destino?",
    resposta:
      "Renaissance Capital projeta 200 a 230 IPOs em 2026, com backlog de 190 ou mais. Cada registro carrega risk factors extensos que hoje consomem horas caras de advogado em trabalho-commodity.",
  },
  {
    pergunta: "O advogado continua responsável?",
    resposta:
      "Sempre. Item 105 tem advogado que assina. O ponto de responsabilidade não muda de dono, muda de vazão.",
  },
];

export default function RfeePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "RFEE", path: "/rfee" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Camada 3 · Destino · 2028</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            RFEE: a ponte para o mercado de capitais americano
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            O mesmo método da cunha contábil aplicado ao Item 105 de risk
            factors. O motor rascunha, a camada antagônica contesta, o advogado
            decide e assina.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">O tamanho da fila</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="card">
            <p className="numero-serif">200 a 230</p>
            <p className="mt-2 text-sm text-muted">
              IPOs previstos para 2026 nos Estados Unidos. Fonte: Renaissance
              Capital IPO Outlook 2026.
            </p>
          </div>
          <div className="card">
            <p className="numero-serif">190+</p>
            <p className="mt-2 text-sm text-muted">
              registros em backlog aguardando janela. Cada um com dezenas de
              páginas de risk factors para redigir e revisar.
            </p>
          </div>
          <div className="card">
            <p className="numero-serif">Item 105</p>
            <p className="mt-2 text-sm text-muted">
              a seção de risk factors é obrigatória e um advogado responde por
              ela. Ponto de responsabilidade em escala.
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-muted">
          Rascunhar e cruzar fatores de risco é trabalho-commodity de altíssimo
          custo por hora. A curadoria e a assinatura do advogado são o selo que
          o emissor paga. O filtro 4+1 fecha inteiro, com resultado objetivo e
          fila medida.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/metodo" className="btn-secondary">
            Ver o método que chega lá
          </Link>
          <Link href="/manifesto" className="btn-primary">
            Ler o manifesto
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
