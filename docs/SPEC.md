# SPEC.md — Especificação página a página

> **STATUS: DRAFT — pendente de aprovação do owner.**
> Este arquivo não veio no pacote de documentação original (os demais docs o referenciam por seção). Foi reconstruído a partir de `CLAUDE.md`, `PLAN.md`, `DESIGN.md`, `CONTENT.md`, `SEO-AGEO.md` e `TASKS.md`, sem inventar copy nem requisito novo. Onde faltou definição, está marcado `TODO(spec)`.
> Regra: nenhuma slice é implementada sem contrato aqui. Mudou a estratégia? Atualizar este arquivo **antes** do código.

---

## Convenções desta spec

- **Copy:** toda string visível vem de `CONTENT.md` (seção indicada). Faltando, `TODO(copy)`.
- **Tokens:** todo estilo vem de `DESIGN.md` (tokens semânticos). Zero hex/px em componente.
- **SEO/AGEO:** `<title>`/description por rota conforme `SEO-AGEO.md §5`; JSON-LD conforme `§6`; teste de aceite `curl` conforme `§1`.
- **Render:** SSG por padrão. Todo conteúdo crítico no HTML da primeira resposta.
- **Analytics:** todo CTA emite evento nomeado (`cta_*`, `lead_submit_*`).
- **DoD:** checklist completa em `AGENTS.md §6` — vale para toda rota abaixo.

---

## §0. Layout global (todas as rotas)

**Componentes:** `Header`, `Footer`, `ThemeToggle`, `JsonLd`, skip-link, `<main>`.

- Header sticky: fundo `--overlay-header` + blur, borda inferior `--color-border`. Logo-node à esquerda; nav (`/metodo`, `/produtos`, `/founder`, `/conteudo`) ao centro/direita; `ThemeToggle` + CTA "Peça um piloto" → `/contato` à direita. Nav crawlable (`<Link>`).
- Footer: bloco de **entidade** (2 frases — a tese de `CONTENT.md §2`), navegação, redes canônicas (apenas `@quipe.ai`), repetição do CTA piloto (`CONTENT.md §8`), `© QuipeAI`.
- Tema: cookie `theme` + `data-theme` no `<html>` resolvido no server (`DESIGN.md §6`). Sem FOUC.
- JSON-LD `Organization` em todas as páginas (`SEO-AGEO.md §6`).
- Fonts via `next/font`: Poppins (display) + Inter (texto), self-hosted.

---

## §1. `/` — Home

**Objetivo:** apresentar tese + prova e rotear 3 públicos ao contato. É a página do gate da Onda 0.

**Seções (ordem):**

1. **Hero** — copy literal de `CONTENT.md §5` (eyebrow, H1, subtítulo, CTA primário "Peça um piloto" → `/contato`, CTA secundário "Veja como o método funciona" → `/metodo`). Node/glow como assinatura visual discreta.
2. **Tensão** — o contraste com o mercado: a aposta contrária aos "agentes autônomos que prometem e não entregam" (`CLAUDE.md §2`, voz de `CONTENT.md §1`). Dados de mercado citáveis com fonte nomeada (Gartner, MIT NANDA — `PLAN.md §3`).
3. **Arco** — bloco quote destacado com a frase-âncora literal (`CONTENT.md §3`), estilo `DESIGN.md §9` (Quote/arco).
4. **Como funciona (5 passos)** — `CONTENT.md §6`, incluindo o bloco de lock-in como fechamento.
5. **Prova** — números reais de execuções. Sem número real: renderizar a seção com `TODO(prova)` explícito ou omitir — nunca promessa sem prova (`CLAUDE.md §3.6`).
6. **3 caminhos por público** — cards Cliente / Investidor / Ecossistema com micro-copy e CTAs segmentados de `CONTENT.md §7` (`/contato?p=cliente|investidor|ecossistema`). Eventos distintos: `cta_cliente`, `cta_investidor`, `cta_ecossistema`.
7. **FAQ** (opcional na Onda 0) — subset de `CONTENT.md §12` com schema `FAQPage` casando 1:1 com o visível.
8. **CTA piloto** — bloco final recorrente, copy de `CONTENT.md §8`.

**SEO/AGEO:** title/description de `SEO-AGEO.md §5` (rota `/`). Schema: `Organization` (global) + `FAQPage` se houver FAQ. Aceite: `curl -s / | grep -i "assume o resultado"` acha o H1.

**Componentes:** `Hero`, `SectionHeading`, `Quote`, `Steps`, `ProofBlock`, `AudienceCards`, `Faq`, `CtaPiloto`.

---

## §2. `/metodo` — O método (Revolução 5.0)

**Objetivo:** a doutrina como página citável. Página mais importante para AGEO depois da home.

**Seções (ordem):**

1. **Definição answer-first** — resposta direta em 1–3 frases no topo (a tese, `CONTENT.md §2`), depois o desdobramento (`SEO-AGEO.md §7`).
2. **As 4 perguntas do ICP** — checklist "Este negócio é para a QuipeAI?" literal de `CONTENT.md §4`, incluindo a nota de enquadramento (regulado = onda 1).
3. **Como funciona (5 passos)** — versão estendida de `CONTENT.md §6`.
4. **Arco** — frase-âncora literal (`CONTENT.md §3`).
5. **Moat** — bloco de lock-in (`CONTENT.md §6`, fechamento): motor + acoplamento antagônico dados/SLM-LLM.
6. **Modelo de receita** — enquadramento transparente do resultado + 30% equity (`CONTENT.md §10`). Critérios do gate de equity: `TODO(copy)` (pendência do owner).
7. **FAQ** — perguntas de `CONTENT.md §12` (answer-first, extraível), com schema `FAQPage` 1:1.
8. **CTA piloto** — `CONTENT.md §8`.

**SEO/AGEO:** title/description de `SEO-AGEO.md §5`. Headings como perguntas quando fizer sentido. Schema: `FAQPage` + `BreadcrumbList`. Aceite: `curl -s /metodo | grep -i "trabalho-commodity"`.

---

## §3. `/founder` — Curva C

**Objetivo:** autoridade e tese contrária; a entidade Pessoa por trás da entidade Organização.

**Seções:** diretrizes de `CONTENT.md §11` —

1. **Bio/autoridade** — o que construiu (fábrica de produto, portfólio multi-vertical, método). `TODO(copy)` — tom pendente de aprovação do owner (incluir ou não "yogue no corporativo").
2. **Tese contrária** — por que "humano no ponto de responsabilidade" > "agente autônomo".
3. **Ponto de vista** — 3–5 ideias-âncora (futuros artigos de `/conteudo`).
4. **Prova social** — eventos, publicações, projetos. `TODO(prova)`.
5. **CTA** — conversar → `/contato?p=ecossistema` ou `/contato?p=investidor`. `TODO(spec)`: owner define o público-alvo primário desta página.

**SEO/AGEO:** title/description de `SEO-AGEO.md §5`. Schema: `Person` (name: Luiz Guilherme Ramos Guimarães, `worksFor` → Organization) + `BreadcrumbList`.

---

## §4. `/produtos` e `/produtos/[slug]`

**Objetivo:** portfólio enquadrado como **execuções do método**, não como catálogo de software (`CLAUDE.md §2`).

### Índice `/produtos`

- Intro answer-first: produtos = exemplos de execução do método (1–2 frases extraíveis).
- Grid de cards (`DESIGN.md §9` Card): nome, vertical, 1 frase de problema→desfecho, link para o slug.
- Schema: `ItemList` + `BreadcrumbList`.
- Produtos v1 (dos docs): auditoria-IA, RFEE/SEC risk factors, Terra-Métrica. Vertical-cunha de lançamento: `TODO(spec)` (pendência do owner).

### Detalhe `/produtos/[slug]`

- **Fonte:** MDX em `content/produtos/` com frontmatter tipado: `{ title, slug, vertical, summary, problem, method, proof, status, publishedAt }`.
- **Seções:** Problema (o trabalho-commodity da vertical) → Como o método se aplica (motor, autonomia limitada, quem assina) → **Prova** (números reais; sem número = `TODO(prova)` visível ou página não publica) → CTA piloto (`CONTENT.md §8`).
- Schema: `Product` (name, description, brand → QuipeAI; `Offer` quando fizer sentido) + `BreadcrumbList`.
- Copy dos produtos: `TODO(copy)` por produto — o owner fornece problema/desfecho reais.

---

## §5. `/conteudo` e `/conteudo/[slug]` (Onda 2)

**Objetivo:** máquina de conteúdo answer-first (SEO + AGEO contínuo).

### Hub `/conteudo`

- Lista de artigos (card: título, resumo de 1–2 frases, tema, data). Filtro por tema. ISR.
- Schema: `ItemList`/`Blog` + `BreadcrumbList`.

### Artigo `/conteudo/[slug]`

- **Fonte:** MDX em `content/artigos/` com frontmatter tipado: `{ title, slug, description, theme, keywords, publishedAt, updatedAt, faq? }`.
- **Layout answer-first** (`SEO-AGEO.md §7`): resposta direta no topo (1–3 frases), desdobramento, dado com fonte nomeada, headings como perguntas, FAQ ao final com schema.
- Autor fixo: Curva C (→ `Person` de `/founder`).
- Schema: `Article` (headline, author → Person, datePublished, dateModified) + `FAQPage` quando houver FAQ + `BreadcrumbList`.
- Keywords-alvo: `SEO-AGEO.md §8`.

---

## §6. `/contato` — Conversão

**Objetivo:** transformar clique em lead qualificado, segmentado por público.

**Seções:**

1. **Oferta piloto** — copy de `CONTENT.md §8` ("Topa um piloto? … Se não entregar, você não paga.") como cabeçalho da página. Para `?p=cliente`, reforço com a oferta estendida de `CONTENT.md §7`.
2. **Form segmentado** — o parâmetro `?p=cliente|investidor|ecossistema` pré-seleciona o segmento (select visível e editável; default sem parâmetro: cliente. `TODO(spec)`: owner confirma default).
   - Campos base: nome, email, empresa, segmento, mensagem/caso. `TODO(spec)`: campos extras por segmento, se houver.
   - Stack: react-hook-form + zod; envio via Server Action → Resend **ou** webhook CRM (pendência do owner, `TASKS.md`).
   - Honeypot ativo; erros humanos e específicos (`CONTENT.md §13`); a11y de form (labels, `aria-describedby` em erro, foco no primeiro erro).
   - Confirmação inline (sem redirect), com evento `lead_submit_<segmento>`.
3. **O que acontece depois** — 2–3 passos do processo pós-lead. `TODO(copy)`.

**SEO/AGEO:** title/description de `SEO-AGEO.md §5`. O form é client island; todo o texto da página permanece SSR.

---

## §7. Rotas técnicas

| Rota | Contrato |
|:--|:--|
| `/llms.txt` | conteúdo literal de `SEO-AGEO.md §4`; texto puro, rota estática |
| `/robots.txt` | `app/robots.ts` conforme `SEO-AGEO.md §2` (permitir buscadores + IAs) |
| `/sitemap.xml` | `app/sitemap.ts` conforme `SEO-AGEO.md §3` (rotas + MDX, `lastModified` real) |
| `404` | página útil: entidade em 1 frase + links para `/`, `/metodo`, `/contato` |
| OG images | 1200×630 por página conforme `DESIGN.md §11` — assets definitivos: pendência do owner |

---

## §8. Contratos de componentes (primitivos da Onda 0)

| Componente | Contrato |
|:--|:--|
| `Button` | variants `primary/secondary/ghost` (`DESIGN.md §9`); polimórfico: `<a>` quando navega, `<button>` quando ação; prop `event` para analytics |
| `Card` | superfície padrão; variante interativa com hover só sob motion permitido |
| `SectionHeading` | eyebrow (uppercase, `--color-accent-ink`) + H2 Poppins; padrão em toda seção |
| `NodeGlow` | ponto `--color-accent` + halo `--color-glow`; `aria-hidden="true"` |
| `JsonLd` | `<script type="application/ld+json">` server-rendered; recebe objeto tipado por schema |
| `Faq` | `<details>/<summary>` acessível (abre sem JS); emite `FAQPage` schema 1:1 com o conteúdo |
| `ThemeToggle` | client; atualiza cookie + `data-theme` sem reload; `aria-pressed`; sem FOUC |
| `CtaPiloto` | bloco final recorrente; copy de `CONTENT.md §8`; evento `cta_piloto` |

---

## §Gatilhos (replanejamento — espelha `PLAN.md §6` e `SEO-AGEO.md §12`)

- Indexação não sobe em 3–4 semanas pós-launch → revisar render/HTML (voltar ao teste `curl`).
- Mention-rate parado em 60–90 dias → revisar `llms.txt`, entidade, densidade answer-first.
- Tráfego sem lead → o gargalo é oferta/prova: revisar §6 (`/contato`) e §4 (prova em produtos), não SEO.
- Piloto não fecha → gargalo é oferta/prova, não tráfego.

---

## Pendências que travam slices desta spec

| Pendência (owner) | Trava |
|:--|:--|
| Números reais de prova | §1.5, §4 detalhe, dado citável |
| Vertical-cunha de lançamento | §4 (ordem e destaque do grid) |
| Tom da página founder | §3 |
| Resend vs CRM / Plausible vs GA4 | §6, analytics |
| OG images + favicon definitivos | §7 |
| Critérios do gate de equity | §2.6 |
