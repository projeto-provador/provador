# PLAN.md — Plano do novo site QuipeAI

**Modo:** DESIGN · **Reversibilidade:** mista (Onda 0 = Tipo 2, migração de stack = Tipo 1) · **Confiança:** alta (90%)

---

## 1. Objetivo

Reconstruir quipeai.com.br para (1) **existir para máquinas** (Google + LLMs) e (2) **converter humanos** (cliente, investidor, ecossistema). Métrica-mãe: **leads qualificados/mês** e **mention-rate em IAs generativas**. Tudo o mais é meio.

Não-objetivos (v1): e-commerce, área logada, app, blog com centenas de posts. Começar enxuto e denso.

---

## 2. Diagnóstico que motiva o rebuild (resumo do audit)

| Eixo | Estado atual | Consequência |
|:--|:--|:--|
| Render | SPA client-side (Lovable), HTML = `<div id=root>` vazio | invisível para Google e LLMs |
| Meta | title/description genéricos ("Inteligência Aplicada"/"Aplicações para superhumanos") | zero relevância para o ICP |
| AGEO | sem entidade em texto, sem FAQ, sem dados, sem `llms.txt` | não-citável por ChatGPT/Claude/Perplexity |
| SEO | sem conteúdo indexável, sem blog, sem schema | autoridade de domínio ≈ zero |
| Marca | 3 narrativas no ar (site "premium" · Instagram "acelerador" · Facebook "chatbots") | diligence de 10 min destrói percepção de foco |
| Voz | tese forte (método + humano assina + cobra por resultado) **presa em JS** | o maior ativo não circula |
| Conversão | funil não auditável, sem oferta de baixo atrito visível | vazamento em todo o caminho |

**Conclusão:** enquanto o site for CSR, nenhuma copy/SEO/AGEO tem efeito — o texto não chega ao robô. SSR/SSG é pré-condição de tudo.

---

## 3. Estratégia (a aposta)

A QuipeAI **não vence em capital** (é bootstrap; concorrentes internacionais somam centenas de milhões). Vence, se vencer, em **posicionamento contrário + método documentado publicamente + prova por vertical + ser a fonte citável em português** sobre "IA com responsabilidade humana e cobrança por resultado".

O site materializa exatamente isso: transforma a doutrina (hoje em decks) em páginas que Google indexa, LLMs citam e humanos convertem.

Contexto de mercado a favor (vira conteúdo citável, ver `SEO-AGEO.md`): Gartner projeta 40%+ dos projetos de IA agêntica cancelados até 2027 e ~130 fornecedores "reais" num mar de agent-washing; MIT NANDA aponta ~5% dos pilotos de GenAI acelerando receita. A tese "autonomia limitada + humano que assina + paga por resultado" é o antídoto — e o pricing por resultado está do lado certo da curva.

---

## 4. Ondas (roadmap incremental)

### Onda 0 — Destravar (a base que precede tudo)
Objetivo: o site passa a **existir para máquinas** e tem um caminho de conversão mínimo.
- Scaffold Next.js 15 + Tailwind v4 + tema Obsidian claro/escuro (SSR-safe).
- Home SSR com hero + tese + prova (ou `TODO(prova)`) + 3 caminhos + CTA piloto.
- `robots.ts`, `sitemap.ts`, `llms.txt`, JSON-LD Organization, metadata por rota.
- `/contato` com captura segmentada funcionando.
- CI: typecheck + build + Lighthouse.
- **Gate de saída:** "Ver código-fonte" mostra hero/tese/produtos em HTML; Search Console renderiza conteúdo; Rich Results válido.

### Onda 1 — Autoridade e mensagem
Objetivo: a doutrina vira páginas indexáveis e citáveis.
- `/metodo` (Revolução 5.0 + as 4 perguntas como checklist de qualificação).
- `/founder` (Curva C — autoridade, tese contrária) com schema Person.
- `/produtos` + 1–2 `/produtos/[slug]` com prova real (números) e schema Product.
- FAQ com schema nas páginas-chave.

### Onda 2 — Máquina de conteúdo (SEO + AGEO contínuo)
Objetivo: fluxo de conteúdo answer-first que atrai busca e vira citação em IA.
- `/conteudo` (hub) + primeiros artigos mirando keywords do ICP e a narrativa de mercado.
- Schema Article/FAQ; internal linking; dado proprietário citável (métrica que só a QuipeAI tem).
- Monitoramento de mention-rate em ChatGPT/Perplexity/AI Overviews.

### Onda 3 — Refino e escala (contínuo)
- Testes A/B de hero/CTA; i18n EN se houver tração internacional; cases adicionais; otimização de CWV.

---

## 5. Decisão de stack (ADR resumido)

**Contexto:** site de marketing/autoridade que exige SEO + AGEO de excelência, dois temas, blog leve, forms, e coerência com um venture builder AI-first que precisa *provar* domínio técnico.

**Decisão:** **Next.js 15 (App Router) + TS strict + Tailwind v4 + MDX + Vercel.**

**Alternativas consideradas:**
- ✅ **Next.js 15** — SSG/ISR nativo, metadata API, RSC, ecossistema; melhor custo-benefício SEO/AGEO. *Escolhido.*
- ⚠️ Astro — excelente para conteúdo estático puro; menos natural para forms/Server Actions e futura área interativa. Bom, mas Next compõe melhor com o portfólio QuipeAI (Next.js 15 é o stack canônico).
- ❌ Continuar no Lovable/CSR — reprovado: é a causa raiz do problema.
- ❌ WordPress — desalinhado com a marca "AI-first" e com o time.

**Reversibilidade:** Tipo 1 (migração de framework é cara). Confiança alta — Next é o stack canônico QuipeAI.

**Conteúdo:** MDX versionado em git (não CMS pesado) — suficiente para o volume v1, zero custo, editável por quem escreve. Reavaliar CMS só se o volume de conteúdo justificar (>1 autor não-técnico frequente).

---

## 6. Métricas de sucesso

| Camada | Métrica | Alvo v1 (90 dias pós-launch) |
|:--|:--|:--|
| Indexação | páginas indexadas no Google Search Console | 100% das rotas públicas |
| SEO | impressões orgânicas para termos do ICP | tendência de alta mês a mês |
| AGEO | mention-rate em ChatGPT/Perplexity para "venture builder IA Brasil", "IA responsabilidade humana", "service as a software" | aparecer em ≥1 motor |
| Performance | Lighthouse mobile (Perf/SEO/BP) | ≥ 95 |
| CWV | LCP / INP / CLS | verde nas rotas principais |
| Conversão | leads qualificados/mês via `/contato` | baseline definido no launch, crescer |
| Marca | consistência (1 narrativa em site + redes) | 100% |

Gatilhos de replanejamento em `SPEC.md §Gatilhos` e no audit: se após pré-render/SSR a indexação não subir em 3–4 semanas → revisar render; se mention-rate não subir em 60–90 dias pós-conteúdo → revisar entidade/llms.txt/schema; se piloto não fecha → gargalo é oferta/prova, não tráfego.

---

## 7. Riscos e mitigações

| Risco | Prob. | Impacto | Mitigação |
|:--|:--|:--|:--|
| Rebuild vira "yak shaving" e não lança | média | alto | Onda 0 enxuta com gate objetivo; lançar cedo, iterar |
| Falta de prova real (cases com número) | alta | alto | marcar `TODO(prova)`; priorizar 1–2 pilotos documentados na Onda 1 |
| Tema claro quebra contraste do verde neon | média | médio | `DESIGN.md` já define `--accent-ink` acessível para texto no claro |
| Copy escorregar para genérico | média | alto | copy sai só de `CONTENT.md`; DoD bloqueia promessa sem prova |
| Success fee (30% equity) assustar sem contexto | média | médio | `/metodo` explica critérios e transparência; não esconder, enquadrar |
| Concorrente (Enter) já domina jurídico | alta | médio | escolher verticais de ICP fora do jurídico (contábil/fiscal, perícia, saúde) |

---

## 8. Dependências e pendências do owner

- `TODO(prova)`: números reais de 1–2 execuções (vazão ganha, margem, SLA, resultado assumido).
- Definir vertical(is)-cunha de lançamento do ICP.
- Aprovar tom final da página `/founder` (o que expor de Curva C).
- Fornecer/aprovar OG images e favicon definitivos.
- Definir destino da página `run.app` ("AI Infrastructure Layer") e das redes legadas.
