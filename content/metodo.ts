/**
 * Copy canônica de /metodo — extraída de docs/CONTENT.md e do
 * QuipeAI_ICP_Core_Deck (owner, 2026-07-24). Nada inventado.
 * Nota: o deck cita "success fee de 30% de equity" no modelo de receita —
 * removido a pedido do owner (2026-07-13); ver RECEITA abaixo, sem equity.
 * O deck também nomeia um concorrente na seção "categoria" — generalizado
 * a pedido do owner, sem citar nome de terceiro.
 */

/** Answer-first — a tese (extraível por LLM) */
export const DEFINICAO = {
  eyebrow: "REVOLUÇÃO 5.0",
  titulo: "O método",
  respostaDireta:
    "A QuipeAI não vende software nem “agentes autônomos”. Instala um método: a IA aposenta o trabalho-commodity, o especialista humano decide e assina, e cobra-se por resultado. Os produtos são exemplos de execução do método.",
  desdobramento:
    "A aposta é contrária: nas verticais reguladas, autonomia total é a arquitetura errada. A certa é autonomia limitada com humano no ponto de responsabilidade — o especialista revisa, decide e assina.",
} as const;

/** ICP Deck §02 — o ICP em uma frase */
export const ICP_FRASE = {
  eyebrow: "O ICP EM UMA FRASE",
  texto:
    "O cliente do método é o dono de uma operação intensiva em especialista — com demanda represada, que hoje se afoga na parte-commodity ou paga uma pirâmide de juniores lenta e cara — e a assinatura é sempre dele.",
} as const;

/** ICP Deck §03 — o filtro de qualificação (5 perguntas, 5 sins) */
export const PERGUNTAS_ICP = {
  titulo: "Este negócio é para a QuipeAI?",
  intro: "Cinco perguntas. Cinco sins.",
  perguntas: [
    "Há um especialista caro fazendo trabalho-commodity — ou um time de juniores caro e lento até a 1ª entrega, com alto custo de treinamento e risco de perder o investimento (saída) ou de não adaptação?",
    "A curadoria do especialista é o selo de qualidade que o cliente paga?",
    "Errar tem consequência que o especialista sempre assume?",
    "Mais vazão vira mais faturamento, margem e EBITDA?",
    "O gargalo é capacidade, não demanda — recusa projetos ou tem fila? Sem este sim, não é ICP-A.",
  ],
  nota: "Cinco sins = ICP. Regulação é só onde a pergunta 3 já é lei — por isso a onda 1 começa nela.",
} as const;

/** ICP Deck §04 — o ICP em 4 camadas */
export const CAMADAS_ICP = {
  eyebrow: "O ICP EM 4 CAMADAS",
  titulo: "Quem é, na prática",
  camadas: [
    {
      nome: "Firmográfico",
      texto:
        "Operação intensiva em especialista — contábil, jurídico, perícia, engenharia, compliance, ESG. Já tem pirâmide (sênior + juniores) ou sênior sobrecarregado. ~5–200 pessoas. Brasil-first, ponte global.",
    },
    {
      nome: "Tecnográfico",
      texto:
        "Commodity feito à mão; ferramentas legadas + planilhas; tempo longo até a 1ª entrega. Usa ChatGPT solto, sem confiar para assinar.",
    },
    {
      nome: "Comportamental / intenção",
      texto:
        "Gatilho A: demanda represada (recusa projetos, fila). Gatilho B: Reforma CBS/IBS 2026–27, EU AI Act ago/2026, temporada de auditoria. Gatilho C: custo de treinar juniores + risco de perder o investimento ou de não adaptação.",
    },
    {
      nome: "JTBD · momento de dor",
      texto:
        "“Tenho mais demanda do que entrego. Ou eu me afogo no commodity, ou treino juniores caros e lentos — que ainda posso perder ou que não se adaptam — e a assinatura é sempre minha. Preciso entregar mais, rápido, sem perder a qualidade que é o meu nome.”",
    },
  ],
} as const;

/** ICP Deck §05 — o anti-perfil (quem não é cliente) */
export const ANTI_PERFIL = {
  eyebrow: "O ANTI-PERFIL",
  titulo: "Quem não é cliente",
  intro: "Tão importante quanto quem é — é o que dá foco ao GTM.",
  itens: [
    {
      nome: "Boutique de estilo de vida",
      texto: "Deliberadamente pequeno, sem intenção de escalar. Capacidade extra não vira margem.",
    },
    {
      nome: "Gargalo de demanda",
      texto: "Quem não tem backlog. Dar vazão não resolve o problema dele.",
    },
    {
      nome: "Só quer cortar custo",
      texto:
        "Vai internalizar a ferramenta e trocar de fornecedor. Sem espaço para prêmio por resultado.",
    },
    {
      nome: "Curadoria irrelevante",
      texto: "Onde a qualidade curada não muda a percepção; vira output barato.",
    },
    {
      nome: "Resultado subjetivo",
      texto: "Sem métrica, preço por resultado não é aplicável (fica para ondas posteriores).",
    },
    {
      nome: "Quer autonomia total",
      texto:
        "Quer tirar o humano da jogada. É cliente de outra categoria de fornecedor, não da QuipeAI.",
    },
  ],
} as const;

/** ICP Deck §06 — scoring de fit + prontidão */
export const SCORING = {
  eyebrow: "SCORING",
  titulo: "Fit + prontidão — não descreve, ranqueia",
  faixas: [
    {
      nome: "ICP-A · foco total",
      texto:
        "Capacidade represada + curadoria valorizada + resultado mensurável, com dor de commodity/pirâmide alta.",
    },
    {
      nome: "ICP-B · nutrir",
      texto:
        "Passa nas perguntas, mas gargalo de demanda incerto ou resultado subjetivo — piloto menor.",
    },
    {
      nome: "Fora · não perseguir",
      texto:
        "Boutique de estilo de vida; gargalo de demanda; sem lock-in possível; resultado não mensurável.",
    },
  ],
} as const;

/** ICP Deck §07 — as ondas de entrada */
export const ONDAS = {
  eyebrow: "AS ONDAS DE ENTRADA",
  titulo: "Tese larga, alvo estreito",
  intro: "Uma vertical-cunha por vez. Cada onda só abre com um case medido.",
  ondas: [
    {
      nome: "Onda 1 · a cunha — auditoria contábil-IA, Brasil",
      texto:
        "Responsabilidade é lei (CFC). Resultado objetivo. Gatilho forte: Reforma CBS/IBS 2026–27. Menor atrito.",
    },
    {
      nome: "Onda 2 — não regulado, resultado mensurável",
      texto:
        "Engenharia, perícia, compliance, ESG/MRV. Responsabilidade reputacional forte; resultado ainda objetivo.",
    },
    {
      nome: "Onda 3 — resultado semi-subjetivo",
      texto:
        "Consultoria, arquitetura, agências. Modelo híbrido: retainer + prêmio onde der para medir.",
    },
  ],
} as const;

/** CONTENT.md §10 — modelo de receita (sem equity, ver nota do topo do arquivo) */
export const RECEITA = {
  eyebrow: "COMO COBRAMOS",
  titulo: "Cobrança por resultado",
  corpo:
    "Cobramos por resultado, não por licença de software. O incentivo fica atrelado ao desfecho do cliente, não a uma tarifa fixa.",
} as const;

/** CLAUDE.md §2 / CONTENT.md §6 — o moat, nomeado */
export const MOAT = {
  eyebrow: "O MOAT",
  titulo: "O motor",
  corpo:
    "O lock-in não é a ferramenta. É o motor treinado no contexto do cliente + o acoplamento antagônico entre dados e SLM/LLM + a melhoria contínua específica do projeto. Trocar de fornecedor obrigaria a recomeçar o projeto do zero. O valor está no motor, não no app.",
} as const;

/** ICP Deck §10 — a categoria (generalizado, sem citar concorrente por nome) */
export const CATEGORIA = {
  eyebrow: "A CATEGORIA",
  titulo: "Nem software house, nem “services-as-software”",
  corpo:
    "O consenso do mercado é autonomia total: tratar o humano como uma falha não paga e tirá-lo da jogada. A QuipeAI inverte isso — autonomia limitada, com o especialista no ponto de responsabilidade. A assinatura dele é o produto, e é durável por regulação: boa parte dos reguladores já exige um responsável nomeado (EU AI Act, CFC, reguladores financeiros).",
  frase: "A máquina não vai presa — então alguém tem que assinar.",
} as const;

/** ICP Deck §11 — o gate de validação (versão pública, sem números táticos internos) */
export const VALIDACAO = {
  eyebrow: "COMO VALIDAMOS",
  titulo: "Provar antes de escalar",
  corpo:
    "Antes de abrir uma onda, validamos com entrevistas reais na vertical-cunha. A pergunta que separa cliente de curioso: “Quantos projetos você recusou nos últimos meses por falta de mão?” Só escalamos quando a demanda represada e a disposição a pagar por resultado se confirmam num piloto pago, com métrica auditável e o especialista assinando embaixo.",
} as const;
