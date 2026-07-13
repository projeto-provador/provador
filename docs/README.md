# QuipeAI · Novo Site — Pacote de Documentação (docs-first)

> Fonte única de verdade para reconstruir **quipeai.com.br**.
> Padrão **PQQ / docs-first**: nenhum código antes de `SPEC.md`. Iteração permitida em qualquer estágio, desde que o documento à montante seja atualizado primeiro.
> Língua: português técnico do Brasil. Owner: Luiz Guilherme Ramos Guimarães · QuipeAI.

---

## Por que este projeto existe (uma frase)

O site atual é uma SPA client-side-rendered (Lovable) **invisível para o Google e para as IAs generativas** — o conteúdo, a tese e os produtos não existem para crawler nenhum. Este pacote especifica a reconstrução em **Next.js 15 (SSR/SSG)**, otimizada para SEO + AGEO, alinhada à doutrina e desenhada para **converter**.

---

## Ordem de leitura (para humano e para o agente)

| # | Arquivo | O que responde | Quando ler |
|:--|:--|:--|:--|
| 0 | `README.md` (este) | mapa e como usar | primeiro |
| 1 | `docs/CLAUDE.md` | identidade do projeto, regras de ouro, stack, não-negociáveis | **sempre em contexto** |
| 2 | `docs/AGENTS.md` | como o agente trabalha o repo, comandos, definition of done, guardrails | antes de codar |
| 3 | `docs/PLAN.md` | objetivo, diagnóstico, ondas, arquitetura de informação, métricas | ao planejar |
| 4 | `docs/SPEC.md` | spec página a página, componentes, contratos, requisitos SEO/AGEO por rota | ao construir cada slice |
| 5 | `docs/DESIGN.md` | sistema Obsidian **claro + escuro**, tokens, tipografia, componentes, motion, a11y | ao estilizar |
| 6 | `docs/CONTENT.md` | voz, tese, arco, 4 perguntas, jargões, copy do hero e seções, CTAs por público, bio do founder | ao escrever qualquer texto |
| 7 | `docs/SEO-AGEO.md` | robots, sitemap, llms.txt, schema, meta patterns, regras answer-first, keywords | ao implementar SEO/AGEO |
| 8 | `docs/TASKS.md` | backlog sequenciado por onda, RICE, definition of done por tarefa | ao executar |

**Regra de ouro do agente:** leia `CLAUDE.md` + `AGENTS.md` no início de toda sessão. Nunca hardcode cor, copy ou meta — puxe de `DESIGN.md`, `CONTENT.md`, `SEO-AGEO.md`.

---

## Como usar no Claude Code

1. Copie a pasta `quipeai-site-docs/` para a raiz do repositório novo (ou use `docs/` como está).
2. Coloque `CLAUDE.md` na **raiz do repo** (o Claude Code lê automaticamente). Os demais ficam em `docs/`.
3. Primeiro prompt sugerido:
   > "Leia `CLAUDE.md`, `AGENTS.md`, `PLAN.md` e `SPEC.md`. Confirme o entendimento em 10 linhas e me proponha a primeira vertical slice da Onda 0 seguindo `TASKS.md`. Não escreva código ainda."
4. Trabalhe **uma vertical slice por vez** (Onda 0 → 1 → 2). Atualize `TASKS.md` ao fechar cada tarefa.

---

## Escopo desta entrega

✅ Documentação completa (9 arquivos).
❌ Código (será gerado pelo Claude Code a partir daqui).

Alterou a estratégia? Atualize o doc à montante **antes** de mexer no código. Documentação retroativa vira ficção.
