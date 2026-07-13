import type { Metadata } from "next";
import Link from "next/link";
import MotorDiagram from "@/components/MotorDiagram";
import FaqAeo from "@/components/FaqAeo";
import JsonLd from "@/components/JsonLd";
import { howToMetodoSchema } from "@/lib/schema";
import { FAQ_AEO } from "@/lib/faq";
import { FILTRO_4_MAIS_1, METRICA_CASE } from "@/lib/site";

export const metadata: Metadata = {
  title: "QuipeAI. O método é a ponta de lança",
  description:
    "Não vendemos software. Viramos sócios do resultado. Motor de IA de autonomia limitada com especialista no ponto de responsabilidade. Teste 4+1 em 60s.",
  alternates: { canonical: "/" },
};

const CAMADAS = [
  {
    nome: "Caixa",
    titulo: "Cunha contábil. Receita agora",
    texto:
      "Auditoria contábil com IA no Brasil. Responsabilidade é lei pelo CFC. Gatilho Reforma CBS IBS 2026-27. Demanda represada e fila de projetos recusados.",
    href: "/cunha-contabil",
  },
  {
    nome: "Fábrica",
    titulo: "O que multiplica",
    texto:
      "Especialista técnico vira JV com 30%. Playbook replicável, contrato modelo e critérios de qualificação. O método sai da cunha e escala vertical a vertical.",
    href: "/fabrica",
  },
  {
    nome: "Destino",
    titulo: "2028 e autoridade",
    texto:
      "Ponte para o mercado de capitais. Item 105 risk factors tem advogado que assina. A categoria inverte a Sierra: autonomia limitada e quem assina é o produto.",
    href: "/rfee",
  },
];

const PROVA_CARDS = [
  {
    titulo: "Motor proprietário",
    texto:
      "Camada que orquestra dado, modelo e regra do negócio do cliente.",
  },
  {
    titulo: "Acoplamento antagônico",
    texto:
      "Dados e modelos se calibram mutuamente no contexto do projeto. Não é portável.",
  },
  {
    titulo: "Melhoria contínua",
    texto:
      "Cada ciclo melhora o motor específico. Sair é jogar fora o aprendizado.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={howToMetodoSchema()} />

      {/* Hero */}
      <section className="border-b border-borda">
        <div className="container-site py-20 md:py-28">
          <p className="eyebrow">Service as a Software · Curva C · @quipe.ai</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            O método é a ponta de lança. Não vendemos software. Viramos sócios
            do resultado.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            O core não é produto, é método replicável. Um motor de IA de
            autonomia limitada, com especialista no ponto de responsabilidade
            que decide, assina e responde. Cobrança por resultado.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/cunha-contabil#quiz" className="btn-primary">
              Fazer teste 4+1 em 60s
            </Link>
            <a href="#motor" className="btn-secondary">
              Ver motor em 60s
            </a>
          </div>
        </div>
      </section>

      {/* Filtro 4+1 preview */}
      <section className="container-site py-16" aria-label="Filtro 4 mais 1">
        <p className="eyebrow">Filtro 4+1</p>
        <h2 className="mt-3 text-3xl font-extrabold">
          Cinco perguntas dizem se o método serve para a sua operação
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Quatro sins mais a pergunta de ouro. Quem recusa projeto por falta de
          mão é ICP-A da Onda 1.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FILTRO_4_MAIS_1.map((item, index) => (
            <li key={item.id} className="card-2">
              <span className="font-serif text-2xl font-bold text-blueLight">
                {index === 4 ? "+1" : index + 1}
              </span>
              <h3 className="mt-1 text-sm font-bold text-white">{item.curto}</h3>
              <p className="mt-2 text-sm text-muted">{item.pergunta}</p>
            </li>
          ))}
        </ol>
        <div className="card-2 mt-4 border-neural">
          <h3 className="text-sm font-bold text-neural">Resultado</h3>
          <p className="mt-2 text-sm text-muted">
            5 sins é ICP-A, foco total. 4 sins com gargalo incerto é ICP-B,
            nutrir. Menos que isso, fora. Sem constrangimento.
          </p>
        </div>
        <div className="mt-8">
          <Link href="/cunha-contabil#quiz" className="btn-primary">
            Fazer o teste completo
          </Link>
        </div>
      </section>

      {/* Motor 5 etapas */}
      <section id="motor" className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <p className="eyebrow">Método QuipeAI</p>
          <h2 className="mt-3 text-3xl font-extrabold">
            O motor em 5 etapas. A IA aposenta o commodity. O especialista
            assina
          </h2>
          <div className="mt-10">
            <MotorDiagram />
          </div>
          <div className="mt-8">
            <Link href="/metodo" className="btn-secondary">
              Ver o método completo
            </Link>
          </div>
        </div>
      </section>

      {/* Prova e lock-in */}
      <section className="container-site py-16" aria-label="Prova">
        <p className="eyebrow">Prova</p>
        <h2 className="mt-3 text-3xl font-extrabold">
          O lock-in não é contrato, é valor acumulado
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PROVA_CARDS.map((card) => (
            <div key={card.titulo} className="card">
              <h3 className="text-base font-bold">{card.titulo}</h3>
              <p className="mt-2 text-sm text-muted">{card.texto}</p>
            </div>
          ))}
        </div>
        <blockquote className="quote-serif mt-10 max-w-2xl">
          O cliente não te troca porque trocar custa o projeto inteiro.
        </blockquote>
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
            Prova Veritum na cunha contábil. Vazão sobe, qualidade se mantém e
            a assinatura continua sendo o produto.
          </p>
        </div>
      </section>

      {/* 3 camadas do portfólio */}
      <section className="border-y border-borda bg-card/40">
        <div className="container-site py-16">
          <p className="eyebrow">Portfólio em 3 camadas</p>
          <h2 className="mt-3 text-3xl font-extrabold">
            Tese larga, alvo estreito. Uma vertical-cunha por vez
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CAMADAS.map((camada) => (
              <Link key={camada.nome} href={camada.href} className="card block transition hover:border-neural">
                <p className="eyebrow">{camada.nome}</p>
                <h3 className="mt-2 text-base font-bold">{camada.titulo}</h3>
                <p className="mt-2 text-sm text-muted">{camada.texto}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3 vagas piloto */}
      <section className="container-site py-16" aria-label="Vagas de piloto">
        <div className="card border-neural">
          <p className="eyebrow">Onda 1 · Cunha contábil</p>
          <h2 className="mt-3 text-3xl font-extrabold">
            3 vagas de piloto pago com métrica auditável
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Firmas ICP-A com demanda represada. Métrica antes e depois,
            especialista que decide e assina, cobrança por resultado. A máquina
            não vai presa. Alguém tem que assinar.
          </p>
          <div className="mt-6">
            <Link href="/cunha-contabil#quiz" className="btn-primary">
              Quero uma das 3 vagas
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ AEO */}
      <FaqAeo faqs={FAQ_AEO} />
    </>
  );
}
