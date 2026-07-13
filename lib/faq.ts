import { CANONICAS } from "./site";

export type Faq = { pergunta: string; resposta: string };

// FAQ AEO. Cada resposta usa definição canônica. Mínimo 8 perguntas.
export const FAQ_AEO: Faq[] = [
  {
    pergunta: "O que é trabalho-commodity?",
    resposta: CANONICAS.trabalhoCommodity,
  },
  {
    pergunta: "O que é ponto de responsabilidade?",
    resposta: CANONICAS.pontoDeResponsabilidade,
  },
  {
    pergunta: "A QuipeAI vende software?",
    resposta:
      "Não. O core não é produto, é método replicável. Um motor de IA de autonomia limitada, com especialista no ponto de responsabilidade que decide, assina e responde. Cobrança por resultado.",
  },
  {
    pergunta: "A IA substitui o especialista?",
    resposta:
      "Não. A IA aposenta o trabalho-commodity: conciliar, triar, rascunhar. O especialista decide e assina no ponto de responsabilidade. A assinatura é o produto.",
  },
  {
    pergunta: "O que é o filtro 4+1?",
    resposta:
      "Regra de qualificação com 4 perguntas mais 1: trabalho-commodity caro, curadoria é selo, errar tem consequência, vazão vira margem, mais a arena. Regulado é Onda 1, responsabilidade é lei. Quem responde sim às 4 e tem demanda represada é ICP-A.",
  },
  {
    pergunta: "Como funciona o modelo de 30% de equity?",
    resposta:
      "Cobrança por resultado, com 30% de participação quando a QuipeAI subsidia o build. Alinha risco no upside. Atrai quem topa dividir resultado e repele quem só quer cortar custo.",
  },
  {
    pergunta: "O que é o motor proprietário da QuipeAI?",
    resposta: CANONICAS.moat,
  },
  {
    pergunta: "Quem não é cliente da QuipeAI?",
    resposta: CANONICAS.antiPerfil,
  },
  {
    pergunta: "Por que a assinatura humana dura com a regulação?",
    resposta:
      "EU AI Act em agosto de 2026, normas do CFC e BoE FCA exigem responsável identificado. Cerca de 84% dos regimes exigem alguém que decide, assina e responde. A máquina não vai presa. Alguém tem que assinar.",
  },
];
