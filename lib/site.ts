export const SITE_URL = "https://www.quipeai.com.br";
export const SITE_NAME = "QuipeAI";
export const FOUNDER = "Luiz Guilherme";

export const NAV_ITEMS = [
  { label: "Método", href: "/metodo" },
  { label: "Cunha Contábil", href: "/cunha-contabil" },
  { label: "Motor", href: "/motor" },
  { label: "Modelo 30%", href: "/modelo-30-porcento" },
  { label: "Fábrica", href: "/fabrica" },
] as const;

export const CTA_PILOTO = { label: "3 Vagas Piloto", href: "/cunha-contabil#quiz" } as const;

// Definições canônicas. Usar exatamente assim em todo o site, sem sinônimos.
export const CANONICAS = {
  trabalhoCommodity:
    "Fatia repetitiva, previsível e sem julgamento do trabalho do especialista. Exemplos: conciliar, triar, rascunhar, classificar, extrair. O que a IA aposenta.",
  pontoDeResponsabilidade:
    "Momento onde o risco se concentra e alguém precisa decidir, assinar e responder. Ali a autonomia para. Sempre um humano. Accountability sink.",
  moat:
    "Valor não está na ferramenta, está no motor treinado no contexto do cliente, no acoplamento antagônico dado e SLM/LLM e na melhoria contínua. Trocar de fornecedor é recomeçar o projeto do zero. Valor acumulado que ninguém recria.",
  antiPerfil:
    "Boutique lifestyle deliberadamente pequeno, gargalo de demanda sem backlog, só quer cortar custo e internalizar ferramenta, curadoria irrelevante, resultado subjetivo sem métrica, quer autonomia total e tirar o humano. Cliente da Sierra, não da QuipeAI.",
} as const;

// Método QuipeAI. 5 etapas imutáveis.
export const METODO_ETAPAS = [
  {
    numero: 1,
    titulo: "Ingestão do corpus",
    texto:
      "Normas, contratos, casos históricos e curadoria do domínio alimentam motor proprietário treinado no contexto do cliente.",
  },
  {
    numero: 2,
    titulo: "Rascunho-commodity",
    texto:
      "SLM/LLM gera trabalho repetível com vazão alta e custo marginal baixo.",
  },
  {
    numero: 3,
    titulo: "Camada antagônica",
    texto:
      "Agente adversarial contesta e audita o rascunho antes do humano. Reduz erro e expõe o que precisa de olho especialista.",
  },
  {
    numero: 4,
    titulo: "Especialista assina",
    texto:
      "Profissional revisa, decide e assina. É o produto. Durável por regulação: EU AI Act, CFC, BoE FCA. Cerca de 84% exigem responsável.",
  },
  {
    numero: 5,
    titulo: "Resultado + equity",
    texto:
      "Cobrança por resultado, com 30% de equity quando a QuipeAI subsidia o build. Alinha risco, ganha no upside.",
  },
] as const;

// Filtro ICP 4+1. Regra de qualificação.
export const FILTRO_4_MAIS_1 = [
  {
    id: "q1",
    curto: "Trabalho-commodity caro",
    pergunta:
      "Especialista caro gasta tempo substancial em trabalho repetível, ou você mantém pirâmide de juniores cara e lenta até a primeira entrega?",
  },
  {
    id: "q2",
    curto: "Curadoria é selo",
    pergunta:
      "O que o cliente paga é a curadoria do especialista, não a ferramenta por baixo?",
  },
  {
    id: "q3",
    curto: "Errar tem consequência",
    pergunta:
      "Erro tem custo real e o especialista sempre assume? Alguém assina?",
  },
  {
    id: "q4",
    curto: "Vazão vira margem",
    pergunta:
      "Mais vazão converte em faturamento, margem e EBITDA?",
  },
  {
    id: "q5",
    curto: "Gargalo é capacidade",
    pergunta:
      "Quantos projetos você recusou nos últimos 6 meses por falta de mão?",
  },
] as const;

export const FRASES_ANCORA = [
  "Não vendemos software. Viramos sócios do resultado.",
  "A máquina não vai presa. Alguém tem que assinar.",
  "O cliente não te troca porque trocar custa o projeto inteiro.",
] as const;

export const METRICA_CASE = {
  antes: "12 dias até a primeira entrega",
  depois: "2 dias",
  contexto: "mesma assinatura CFC",
} as const;
