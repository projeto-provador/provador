// Tipos e contrato do quiz 4+1. A regra de classificação vive em
// quiz-core.mjs para ser testável em Node puro pelos testes de aceite.
import { classificar as classificarCore } from "./quiz-core.mjs";

export type Classificacao = "ICP-A" | "ICP-B" | "FORA";

export type RespostasQuiz = {
  q1: boolean; // trabalho-commodity caro
  q2: boolean; // curadoria é selo
  q3: boolean; // errar tem consequência
  q4: boolean; // vazão vira margem
  projetosRecusados: number; // pergunta de ouro, q5
};

export function classificar(r: RespostasQuiz): Classificacao {
  return classificarCore(r) as Classificacao;
}

export type LeadQuiz = {
  nome: string;
  empresa: string;
  cargo: string;
  whatsapp: string;
  respostas: RespostasQuiz;
  classificacao: Classificacao;
  utm: Record<string, string>;
  criadoEm: string;
};

export const QUIZ_STORAGE_KEY = "quipeai_quiz_41";
