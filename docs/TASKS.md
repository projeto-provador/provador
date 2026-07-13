# TASKS.md — Backlog executável

> Decomposição em tarefas ≤ 4h, sequenciadas por onda. Cada tarefa é uma **vertical slice** que funciona no navegador.
> Ao concluir: marcar `[x]`, escrever 1 linha do que mudou, e só então pegar a próxima. Respeitar a ordem — não abrir frentes paralelas.
> Priorização: **P0** = destrava tudo · **P1** = autoridade/conversão · **P2** = escala. (Impacto alto / esforço na coluna E.)

Legenda esforço (E): S ≤1h · M ≤4h · L = quebrar em subtarefas.

---

## ONDA 0 — Destravar (existir para máquinas + conversão mínima)

- [ ] **0.1 · Scaffold** — Next.js 15 (App Router, TS strict) + pnpm + Tailwind v4 + ESLint/Prettier. `pnpm build` limpo. `P0 · M`
  - DoD: repo roda `dev/build/typecheck/lint`; estrutura de pastas conforme `AGENTS.md §7`.
- [ ] **0.2 · Tokens & temas** — criar `styles/tokens.css` com Obsidian Escuro + Claro (`DESIGN.md §4`); mapear no Tailwind (`§12`). `P0 · M`
  - DoD: alternar `data-theme` no `<html>` troca o tema; contraste AA nos dois (checar §5).
- [ ] **0.3 · ThemeToggle SSR-safe** — cookie + `data-theme` no server layout + toggle client sem flash (`DESIGN.md §6`). `P0 · M`
  - DoD: recarregar mantém o tema; sem FOUC; `aria-pressed` correto; respeita `prefers-reduced-motion`.
- [ ] **0.4 · Layout base** — Header (logo-node, nav, toggle, CTA) + Footer (entidade + CTA) + skip-link + `<main>`. `P0 · M`
  - DoD: nav crawlable; foco visível; header sticky com `--overlay-header`.
- [ ] **0.5 · Primitivos UI** — `Button`, `Card`, `SectionHeading`, `NodeGlow`, `JsonLd`. Só tokens. `P0 · M`
- [ ] **0.6 · Home (SSR)** — Hero + Tensão + Arco + 5 passos + Prova(`TODO(prova)`) + 3 caminhos + CTA piloto (`SPEC §1`, copy de `CONTENT`). `P0 · L`
  - DoD: `curl` acha o H1 e a tese; AA nos dois temas; 3 CTAs com evento distinto.
- [ ] **0.7 · Metadata + OG** — Metadata API por rota; OG 1200×630 da home; canonical. `P0 · S`
- [ ] **0.8 · robots.ts + sitemap.ts** — permitir buscadores e IAs; sitemap com rotas (`SEO-AGEO §2–3`). `P0 · S`
- [ ] **0.9 · llms.txt** — servir `/llms.txt` com a definição de entidade (`SEO-AGEO §4`). `P0 · S`
- [ ] **0.10 · JSON-LD Organization** — no layout, válido no Rich Results. `P0 · S`
- [ ] **0.11 · /contato** — form segmentado (`?p=`), zod + RHF, Server Action → Resend/webhook, confirmação inline, evento `lead_submit_*` (`SPEC §6`). `P0 · L`
  - DoD: envia de verdade em staging; a11y de form; honeypot ativo.
- [ ] **0.12 · Analytics** — Plausible ou GA4 + eventos de CTA; Search Console + sitemap submetido. `P0 · S`
- [ ] **0.13 · CI** — GitHub Actions: typecheck + lint + build + Lighthouse-CI (mobile ≥ 95). `P0 · M`
- [ ] **0.14 · GATE ONDA 0** — checklist: "Ver código-fonte" mostra hero/tese/produtos; Search Console renderiza conteúdo; Rich Results válido; Lighthouse ok; tema não pisca. `P0 · S`
  - **Só passa para Onda 1 quando este gate fecha.**

---

## ONDA 1 — Autoridade e mensagem (doutrina vira páginas citáveis)

- [ ] **1.1 · /metodo** — definição answer-first + 4 perguntas (checklist) + arco + moat + modelo de receita + FAQ (schema) (`SPEC §2`, `CONTENT §4,§6,§10`). `P1 · L`
  - DoD: FAQPage schema casa com o FAQ visível; resposta extraível no topo; AA nos dois temas.
- [ ] **1.2 · /founder** — bio + tese contrária + ponto de vista + schema Person (`SPEC §3`, `CONTENT §11`). `TODO(copy)` do owner. `P1 · M`
- [ ] **1.3 · /produtos (índice)** — grid enquadrando produtos como execuções do método; schema ItemList (`SPEC §4`). `P1 · M`
- [ ] **1.4 · /produtos/[slug] (MDX)** — 1–2 produtos com problema/método/**prova**(`TODO(prova)`)/CTA; frontmatter tipado; schema Product (`SPEC §4`). `P1 · L`
- [ ] **1.5 · FAQ global + schema** — componente `Faq` reutilizável (abre sem JS) nas páginas-chave (`DESIGN §9`, `SEO-AGEO §6`). `P1 · M`
- [ ] **1.6 · OG por página** — gerar OG das novas rotas (método/founder/produtos). `P1 · S`
- [ ] **1.7 · Internal linking** — método ↔ produtos ↔ founder ↔ contato; breadcrumbs. `P1 · S`

---

## ONDA 2 — Máquina de conteúdo (SEO + AGEO contínuo)

- [ ] **2.1 · /conteudo (hub)** — lista + filtro por tema + schema; ISR. `P2 · M`
- [ ] **2.2 · Pipeline MDX de artigo** — layout answer-first + schema Article/FAQ + autor Curva C (`SPEC §5`, `SEO-AGEO §7`). `P2 · M`
- [ ] **2.3 · Primeiros 3 artigos** — mirar keywords do ICP + narrativa de mercado (`SEO-AGEO §8`). `P2 · L`
- [ ] **2.4 · Dado proprietário citável** — publicar 1 métrica que só a QuipeAI tem (`SEO-AGEO §9`). `TODO(prova)`. `P2 · M`
- [ ] **2.5 · Monitoramento AGEO** — rotina de checagem de mention-rate em ChatGPT/Perplexity/AI Overviews (`SEO-AGEO §12`). `P2 · S`
- [ ] **2.6 · RSS + descoberta** — feed opcional; pings de sitemap. `P2 · S`

---

## ONDA 3 — Refino e escala (contínuo)

- [ ] **3.1 · A/B de hero/CTA** — testar variações de headline e CTA piloto.
- [ ] **3.2 · Cases adicionais** — mais `/produtos/[slug]` com prova conforme fecham pilotos.
- [ ] **3.3 · i18n EN** — só se houver tração internacional (decisão do owner).
- [ ] **3.4 · Otimização CWV** — cortar o que a medição apontar.
- [ ] **3.5 · Consolidação de marca** — resolver `run.app` e bios legadas (`SEO-AGEO §11`).

---

## Pendências do owner (destravam tarefas acima)

- [ ] `TODO(prova)`: números reais de 1–2 execuções (vazão, margem, SLA, resultado) → habilita 0.6 (Prova), 1.4, 2.4.
- [ ] Vertical(is)-cunha de lançamento do ICP → foca 1.3/1.4 e keywords.
- [ ] Aprovar tom de `/founder` (o que expor de Curva C) → habilita 1.2.
- [ ] OG images + favicon definitivos → 0.7/1.6.
- [ ] Decisão sobre `run.app` e redes legadas → 3.5.
- [ ] Escolha de analytics (Plausible vs GA4) e de envio de lead (Resend vs CRM) → 0.11/0.12.

---

## Como registrar progresso

Ao fechar uma tarefa, editar a linha:
```
- [x] 0.6 · Home (SSR) — hero+tese+5 passos no HTML; prova marcada TODO. (2026-07-12)
```
E, se algo mudou de rumo, atualizar o doc à montante (`SPEC`/`PLAN`) **antes** do código. Documentação retroativa é proibida.
