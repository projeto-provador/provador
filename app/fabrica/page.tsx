import type { Metadata } from "next";
import Link from "next/link";
import FaqLista from "@/components/FaqLista";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Fábrica. Como especialista técnico vira JV com 30%",
  description:
    "Playbook da Fábrica QuipeAI: etapas para especialista técnico virar joint venture com 30%, contrato modelo, gatilhos de equity e critérios de qualificação.",
  alternates: { canonical: "/fabrica" },
};

const ETAPAS_FABRICA = [
  {
    titulo: "Qualificação do especialista",
    texto:
      "Vertical com trabalho-commodity caro, curadoria que é selo, erro com consequência e vazão que vira margem. O mesmo filtro 4+1 do cliente vale para o sócio.",
  },
  {
    titulo: "Cunha e corpus",
    texto:
      "Escolhe uma vertical-cunha, ingere o corpus do domínio e treina o motor no contexto real. Tese larga, alvo estreito.",
  },
  {
    titulo: "Piloto com métrica",
    texto:
      "3 a 5 operações ICP-A com métrica auditável antes e depois. O especialista decide e assina em todas as entregas.",
  },
  {
    titulo: "JV com 30%",
    texto:
      "Com número medido, a operação vira joint venture. A QuipeAI subsidia o build e entra com 30% do resultado, em contrato modelo com gatilhos claros de equity.",
  },
];

const FAQS = [
  {
    pergunta: "O que é a Fábrica da QuipeAI?",
    resposta:
      "O playbook que multiplica o método: especialistas técnicos de outras verticais viram joint ventures com 30%, replicando o motor da cunha contábil no seu domínio, uma vertical-cunha por vez.",
  },
  {
    pergunta: "Que especialista se qualifica?",
    resposta:
      "Quem passa no mesmo filtro 4+1: trabalho-commodity caro na vertical, curadoria como selo, erro com consequência real e vazão que vira margem. Engenharia, perícia, compliance e ESG MRV são a Onda 2.",
  },
  {
    pergunta: "Quais são os gatilhos de equity?",
    resposta:
      "Três condições cumulativas: piloto pago concluído com a métrica de antes e depois batida, build do motor subsidiado pela QuipeAI e contrato de JV assinado com a régua de medição. Sem número medido não há JV.",
  },
];

const CONTRATO_MODELO = [
  {
    titulo: "O que o contrato modelo cobre",
    texto:
      "Escopo da vertical-cunha, régua de medição do resultado com métrica auditável antes e depois, papéis de cada sócio, propriedade do motor e do corpus, e regras de saída. O especialista responde pela curadoria e pela assinatura. A QuipeAI responde pelo motor.",
  },
  {
    titulo: "Gatilho de entrada dos 30%",
    texto:
      "Os 30% de participação da QuipeAI só entram quando a QuipeAI subsidia o build e o piloto bate a métrica acordada. Antes disso não há equity, há piloto pago com escopo fechado.",
  },
  {
    titulo: "Gatilho de continuidade",
    texto:
      "A participação segue enquanto o motor opera e melhora no contexto da JV. Se a operação encerra, o especialista fica com o domínio e a carteira. O motor treinado e o acoplamento antagônico ficam com a JV.",
  },
];

export default function FabricaPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Fábrica", path: "/fabrica" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Camada 2 · O que multiplica</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            A Fábrica: como especialista técnico vira JV com 30%
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            O método sai da cunha contábil e replica vertical a vertical. O
            especialista entra com o domínio e a assinatura. A QuipeAI entra
            com o motor e o build. O resultado se divide.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <h2 className="text-3xl font-extrabold">O playbook em 4 etapas</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {ETAPAS_FABRICA.map((etapa, index) => (
            <li key={etapa.titulo} className="card">
              <span className="numero-serif">{index + 1}</span>
              <h3 className="mt-2 text-base font-bold">{etapa.titulo}</h3>
              <p className="mt-2 text-sm text-muted">{etapa.texto}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-muted">
          Em toda JV o especialista continua no ponto de responsabilidade:
          decide, assina e responde. O motor não é portável entre verticais sem
          o corpus e a curadoria de quem assina. É isso que protege o valor de
          todos os sócios.
        </p>
      </section>

      <section className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <h2 className="text-3xl font-extrabold">
            Contrato modelo e gatilhos de equity
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CONTRATO_MODELO.map((item) => (
              <div key={item.titulo} className="card">
                <h3 className="text-base font-bold">{item.titulo}</h3>
                <p className="mt-2 text-sm text-muted">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-0">
        <div className="container-site py-16">
          <h2 className="text-2xl font-extrabold">Perguntas frequentes da Fábrica</h2>
          <div className="mt-6">
            <FaqLista faqs={[...FAQS]} />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/modelo-30-porcento" className="btn-secondary">
              Entender o modelo 30%
            </Link>
            <Link href="/cunha-contabil#quiz" className="btn-primary">
              Fazer teste 4+1 em 60s
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
