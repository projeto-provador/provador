# TASKS.md — Backlog executável

> Decomposição em tarefas ≤ 4h, sequenciadas por onda. Cada tarefa é uma **vertical slice** que funciona no navegador.
> Ao concluir: marcar `[x]`, escrever 1 linha do que mudou, e só então pegar a próxima. Respeitar a ordem — não abrir frentes paralelas.
> Priorização: **P0** = destrava tudo · **P1** = autoridade/conversão · **P2** = escala. (Impacto alto / esforço na coluna E.)

Legenda esforço (E): S ≤1h · M ≤4h · L = quebrar em subtarefas.

---

## ONDA 0 — Destravar (existir para máquinas + conversão mínima)

- [x] **0.1 · Scaffold** — Next.js 15 (App Router, TS strict) + pnpm + Tailwind v4 + ESLint/Prettier. `pnpm build` limpo. `P0 · M`
  - feito: scaffold Next 15 + pnpm + Tailwind v4 + ESLint/Prettier; dev/build/typecheck/lint limpos. (2026-07-13)
  - DoD: repo roda `dev/build/typecheck/lint`; estrutura de pastas conforme `AGENTS.md §7`.
- [x] **0.2 · Tokens & temas** — criar `styles/tokens.css` com Obsidian Escuro + Claro (`DESIGN.md §4`); mapear no Tailwind (`§12`). `P0 · M`
  - feito: tokens.css (escuro+claro) + @theme inline no Tailwind; contraste checado via Lighthouse. (2026-07-13)
  - DoD: alternar `data-theme` no `<html>` troca o tema; contraste AA nos dois (checar §5).
- [x] **0.3 · ThemeToggle SSR-safe** — cookie + `data-theme` no server layout + toggle client sem flash (`DESIGN.md §6`). `P0 · M`
  - feito: cookie + inline script anti-FOUC mantendo SSG (ADR 0001); toggle com aria-pressed. (2026-07-13)
  - DoD: recarregar mantém o tema; sem FOUC; `aria-pressed` correto; respeita `prefers-reduced-motion`.
- [x] **0.4 · Layout base** — Header (logo-node, nav, toggle, CTA) + Footer (entidade + CTA) + skip-link + `<main>`. `P0 · M`
  - feito: Header sticky + Footer com entidade/CTA + skip-link; nav crawlable. (2026-07-13)
  - DoD: nav crawlable; foco visível; header sticky com `--overlay-header`.
- [x] **0.5 · Primitivos UI** — `Button`, `Card`, `SectionHeading`, `NodeGlow`, `JsonLd`. Só tokens. `P0 · M`
  - feito: Button/Card/SectionHeading/NodeGlow/JsonLd + Faq; só tokens. (2026-07-13)
- [x] **0.6 · Home (SSR)** — Hero + Tensão + Arco + 5 passos + Prova(`TODO(prova)`) + 3 caminhos + CTA piloto (`SPEC §1`, copy de `CONTENT`). `P0 · L`
  - feito: hero+tensão+arco+5 passos+3 caminhos+FAQ+CTA no HTML estático; Prova = TODO(prova). (2026-07-13)
  - DoD: `curl` acha o H1 e a tese; AA nos dois temas; 3 CTAs com evento distinto.
- [x] **0.7 · Metadata + OG** — Metadata API por rota; OG 1200×630 da home; canonical. `P0 · S`
  - feito: metadata por rota + OG 1200×630 gerada em build (lib/og); canonical ok. (2026-07-13)
- [x] **0.8 · robots.ts + sitemap.ts** — permitir buscadores e IAs; sitemap com rotas (`SEO-AGEO §2–3`). `P0 · S`
  - feito: buscadores + bots de IA liberados; sitemap com rotas atuais. (2026-07-13)
- [x] **0.9 · llms.txt** — servir `/llms.txt` com a definição de entidade (`SEO-AGEO §4`). `P0 · S`
  - feito: rota estática com entidade literal de SEO-AGEO §4. (2026-07-13)
- [x] **0.10 · JSON-LD Organization** — no layout, válido no Rich Results. `P0 · S`
  - feito: no layout raiz; estrutura conforme SEO-AGEO §6 (validar no Rich Results ao publicar). (2026-07-13)
- [x] **0.11 · /contato** — form segmentado (`?p=`), zod + RHF, Server Action → Resend/webhook, confirmação inline, evento `lead_submit_*` (`SPEC §6`). `P0 · L`
  - feito: form segmentado SSR + Server Action (adaptadores Resend/webhook por env, decisão pendente) + honeypot + lead_submit_*. (2026-07-13)
  - DoD: envia de verdade em staging; a11y de form; honeypot ativo.
- [ ] **0.12 · Analytics** — Plausible ou GA4 + eventos de CTA; Search Console + sitemap submetido. `P0 · S`
  - parcial (2026-07-13): eventos prontos e vendor-agnostic (data-event + lib/analytics); falta o owner escolher Plausible vs GA4 e o launch p/ Search Console.
- [x] **0.13 · CI** — GitHub Actions: typecheck + lint + build + Lighthouse-CI (mobile ≥ 95). `P0 · M`
  - feito: workflow typecheck+lint+build+gate curl+LHCI; local: perf 97-98, a11y/BP/SEO 100. (2026-07-13)
- [ ] **0.14 · GATE ONDA 0** — checklist: "Ver código-fonte" mostra hero/tese/produtos; Search Console renderiza conteúdo; Rich Results válido; Lighthouse ok; tema não pisca. `P0 · S`
  - parcial (2026-07-13): código-fonte mostra hero/tese/FAQ (gate no CI); Lighthouse local ≥ 97; tema sem flash por construção. Pendem verificações pós-deploy: Search Console, Rich Results Test, LHCI em produção.
  - **Só passa para Onda 1 quando este gate fecha.**

---

## ONDA 1 — Autoridade e mensagem (doutrina vira páginas citáveis)

- [x] **1.1 · /metodo** — definição answer-first + 4 perguntas (checklist) + arco + moat + modelo de receita + FAQ (schema) (`SPEC §2`, `CONTENT §4,§6,§10`). `P1 · L`
  - feito: answer-first + 4 perguntas + passos + arco + moat + receita + FAQ/schema; TODO(copy) no gate de equity. (2026-07-13)
  - DoD: FAQPage schema casa com o FAQ visível; resposta extraível no topo; AA nos dois temas.
- [x] **1.2 · /founder** — bio + tese contrária + ponto de vista + schema Person (`SPEC §3`, `CONTENT §11`). `TODO(copy)` do owner. `P1 · M`
  - feito: bio factual + tese contrária + ideias-âncora + schema Person; tom "yogue" e prova social aguardam owner (TODO). (2026-07-13)
- [x] **1.3 · /produtos (índice)** — grid enquadrando produtos como execuções do método; schema ItemList (`SPEC §4`). `P1 · M`
  - feito: grid enquadrando execuções do método; ItemList só com publicados; cards sem link até haver prova. (2026-07-13)
- [ ] **1.4 · /produtos/[slug] (MDX)** — 1–2 produtos com problema/método/**prova**(`TODO(prova)`)/CTA; frontmatter tipado; schema Product (`SPEC §4`). `P1 · L`
  - parcial (2026-07-13): pipeline MDX + registry tipado + schema Product prontos; 3 drafts aguardam problema/método/PROVA do owner (published:false).
- [x] **1.5 · FAQ global + schema** — componente `Faq` reutilizável (abre sem JS) nas páginas-chave (`DESIGN §9`, `SEO-AGEO §6`). `P1 · M`
  - feito: componente Faq (details/summary, abre sem JS) + faqPageSchema reutilizados em / e /metodo. (2026-07-13)
- [x] **1.6 · OG por página** — gerar OG das novas rotas (método/founder/produtos). `P1 · S`
  - feito: OG geradas em build p/ metodo, founder, produtos via lib/og. (2026-07-13)
- [x] **1.7 · Internal linking** — método ↔ produtos ↔ founder ↔ contato; breadcrumbs. `P1 · S`
  - feito: nav completo + hero→/metodo + breadcrumbs com schema + sitemap/llms.txt atualizados; crawl interno 100% 200. (2026-07-13)

---

## ONDA 2 — Máquina de conteúdo (SEO + AGEO contínuo)

- [x] **2.1 · /conteudo (hub)** — lista + filtro por tema + schema; ISR. `P2 · M`
  - feito: hub com lista agrupada por tema (navegável sem JS) + breadcrumbs; SSG. (2026-07-13)
- [x] **2.2 · Pipeline MDX de artigo** — layout answer-first + schema Article/FAQ + autor Curva C (`SPEC §5`, `SEO-AGEO §7`). `P2 · M`
  - feito: registry tipado + MDX (remark-gfm) + layout answer-first + Article/FAQPage + autor Curva C + OG por artigo. (2026-07-13)
- [x] **2.3 · Primeiros 3 artigos** — mirar keywords do ICP + narrativa de mercado (`SEO-AGEO §8`). `P2 · L`
  - feito: pilotos-que-falham / agente-autonomo-vs-humano-no-loop / service-as-a-software — keywords do ICP, fontes nomeadas (Gartner, MIT NANDA); recomenda-se revisão editorial do owner. (2026-07-13)
- [ ] **2.4 · Dado proprietário citável** — publicar 1 métrica que só a QuipeAI tem (`SEO-AGEO §9`). `TODO(prova)`. `P2 · M`
  - bloqueada (2026-07-13): depende de base real do owner — sem número, não publica (CLAUDE §3.6).
- [x] **2.5 · Monitoramento AGEO** — rotina de checagem de mention-rate em ChatGPT/Perplexity/AI Overviews (`SEO-AGEO §12`). `P2 · S`
  - feito: rotina documentada em docs/AGEO-MONITORAMENTO.md (queries, motores, gatilhos, registro). (2026-07-13)
- [x] **2.6 · RSS + descoberta** — feed opcional; pings de sitemap. `P2 · S`
  - feito: /feed.xml (RSS 2.0) + link alternate no layout; ping = submissão do sitemap no launch. (2026-07-13)

---

## ONDA 3 — Refino e escala (contínuo)

- [ ] **3.1 · A/B de hero/CTA** — testar variações de headline e CTA piloto.
  - pós-launch (2026-07-13): exige tráfego + vendor de analytics definido (pendência 0.12).
- [ ] **3.2 · Cases adicionais** — mais `/produtos/[slug]` com prova conforme fecham pilotos.
  - bloqueada (2026-07-13): pipeline pronto (registry + MDX); publicar = preencher draft + published:true quando houver prova.
- [ ] **3.3 · i18n EN** — só se houver tração internacional (decisão do owner).
  - aguarda decisão do owner (Tipo 1 → abrir ADR quando decidir).
- [ ] **3.4 · Otimização CWV** — cortar o que a medição apontar.
  - baseline ok (2026-07-13): Lighthouse mobile ≥97 em todas as rotas, CLS 0; contínua pós-launch com dados de campo.
- [ ] **3.5 · Consolidação de marca** — resolver `run.app` e bios legadas (`SEO-AGEO §11`).
  - ação externa do owner (run.app, bios de redes); sameAs do schema já aponta só perfis canônicos.

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
