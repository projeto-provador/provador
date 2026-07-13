# AGENTS.md — Como trabalhar este repositório

> Regras operacionais para qualquer agente de IA (Claude Code) e para humanos. Lido junto de `CLAUDE.md` no início da sessão.

---

## 1. Papéis (quem faz o quê nesta sessão)

| Papel | Responsabilidade | Documento-fonte |
|:--|:--|:--|
| **Arquiteto** | decide estrutura, stack, contratos; abre ADR quando Tipo 1 | `PLAN.md`, `SPEC.md` |
| **Builder** | implementa vertical slices end-to-end, com teste | `SPEC.md`, `TASKS.md` |
| **Designer de sistema** | aplica tokens, garante os dois temas e a11y | `DESIGN.md` |
| **Copywriter** | insere copy canônica; nunca inventa | `CONTENT.md` |
| **SEO/AGEO** | meta, schema, sitemap, robots, llms.txt, answer-first | `SEO-AGEO.md` |
| **Revisor** | roda a checklist de Definition of Done antes do merge | este arquivo §6 |

O agente declara, no início da resposta, **em que papel/modo está** (ex.: "Modo: BUILD — vertical slice Home hero").

---

## 2. Fluxo de trabalho (uma slice por vez)

```
1. Ler CLAUDE.md + AGENTS.md
2. Pegar a próxima tarefa em TASKS.md (respeitar a ordem das ondas)
3. Confirmar contrato na SPEC.md; se faltar, atualizar SPEC antes de codar
4. Implementar vertical slice: rota → componente → conteúdo (MDX) → schema → estilo (tokens) → teste
5. Rodar a checklist de Definition of Done (§6)
6. Marcar a tarefa como concluída em TASKS.md + nota de 1 linha do que mudou
7. Próxima slice
```

**Nunca** abrir várias frentes ao mesmo tempo. Vertical slice = uma coisa que funciona ponta a ponta e pode ser vista no navegador.

---

## 3. Convenções de código

- **TypeScript strict.** Sem `any` sem justificativa em comentário. Tipar props e retorno.
- **Server Components por padrão.** `"use client"` só quando há interação/estado de cliente (toggle de tema, form, carrossel).
- **Componentes puros e pequenos.** Um componente, uma responsabilidade. Co-locar no diretório da rota quando for específico; `components/ui` quando reusável.
- **Estilo só por token.** Classes Tailwind mapeadas aos tokens semânticos de `DESIGN.md`. Zero hex/px mágico em componente.
- **Conteúdo em MDX/dados, não em JSX.** Texto de página vem de arquivos de conteúdo (MDX ou objetos tipados), para o copywriter editar sem tocar em código e para versionar em git.
- **Acessibilidade no componente,** não depois: `alt`, `aria-*`, ordem de foco, `<button>` vs `<a>` corretos.
- **Nomes em inglês no código,** conteúdo em pt-BR. Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

---

## 4. Comandos canônicos (preencher ao inicializar o repo)

```bash
pnpm install           # deps
pnpm dev               # dev server
pnpm build             # build de produção (deve passar sem warning de SSR)
pnpm start             # servir build
pnpm typecheck         # tsc --noEmit (deve passar limpo)
pnpm lint              # eslint + prettier check
pnpm test              # vitest (unit) — quando houver
pnpm test:e2e          # playwright — smoke das rotas críticas
pnpm lhci              # lighthouse-ci contra as rotas principais
```

> Ao criar o projeto, o Builder preenche/valida estes scripts no `package.json` e confirma que `pnpm build` gera HTML com conteúdo (ver §6, item 1).

---

## 5. Guardrails (o agente pausa e pergunta se…)

- …for necessário adicionar dependência pesada fora do stack canônico → justificar contra os 3 filtros (usuário/técnico/estratégico) antes.
- …faltar copy ou número de prova → marcar `TODO(copy)` / `TODO(prova)` e perguntar; **não** preencher com genérico.
- …uma decisão for Tipo 1 (cara de reverter): banco/CMS, estratégia de i18n, troca de framework de tema → abrir ADR curto e pedir ok.
- …algo empurrar contra uma regra de ouro de `CLAUDE.md §3` → não fazer; explicar o conflito.

---

## 6. Definition of Done (checklist obrigatória por página/slice)

**Renderização & SEO**
- [ ] Conteúdo textual crítico aparece no HTML **sem JS** (testar: `curl` na rota ou "Ver código-fonte" mostra hero/método/produtos).
- [ ] `<title>` e `meta description` únicos e alinhados a `SEO-AGEO.md`.
- [ ] Open Graph + Twitter card por página (imagem correta, não a genérica do Lovable).
- [ ] `canonical` correto.
- [ ] JSON-LD válido para o tipo da página (Organization/Product/FAQPage/Article/Person) — validar no Rich Results Test.
- [ ] Headings semânticos: um `<h1>`, hierarquia coerente.
- [ ] Links internos crawlable (`<Link>`/`<a href>`).

**AGEO**
- [ ] Blocos answer-first onde aplicável (resposta direta no topo, depois desdobramento).
- [ ] FAQ com schema onde a página responde perguntas.
- [ ] Entidade e claims em texto extraível (não em imagem).

**Design & A11y**
- [ ] Só tokens de `DESIGN.md` (nenhum hex/px solto).
- [ ] Correto e legível nos **dois** temas (Obsidian Claro e Escuro).
- [ ] Contraste AA verificado nos dois temas.
- [ ] Foco visível; navegável por teclado.
- [ ] `prefers-reduced-motion` respeitado.

**Conteúdo & Conversão**
- [ ] Copy vem de `CONTENT.md` (ou `TODO(copy)` marcado).
- [ ] CTA claro, único por objetivo, rastreável (evento de analytics).
- [ ] Nenhuma promessa de resultado sem número ou `TODO(prova)`.

**Qualidade**
- [ ] `pnpm typecheck` e `pnpm lint` limpos.
- [ ] `pnpm build` sem erro/aviso de SSR.
- [ ] Lighthouse ≥ 95 em Performance, SEO e Best Practices (mobile).
- [ ] `TASKS.md` atualizado.

---

## 7. Estrutura de pastas sugerida (o Builder confirma na Onda 0)

```
/                      # CLAUDE.md fica aqui (raiz)
├─ docs/               # este pacote de documentação
│  └─ adr/             # decisões Tipo 1 registradas no caminho
├─ app/                # Next.js App Router
│  ├─ (site)/          # rotas públicas
│  ├─ sitemap.ts
│  ├─ robots.ts
│  └─ llms.txt/route.ts   # ou public/llms.txt estático
├─ components/
│  ├─ ui/              # primitivos (Button, Card, ThemeToggle, JsonLd, ...)
│  └─ sections/        # blocos de página (Hero, Metodo, Prova, CtaPiloto, ...)
├─ content/            # MDX: método, produtos/cases, blog
├─ lib/                # seo, schema, analytics, theme, utils
├─ styles/             # tokens.css (as CSS variables dos dois temas) + globals
└─ public/             # og images, fontes, favicon, llms.txt (se estático)
```

---

## 8. Anti-padrões banidos (recusa explícita)

- Documentação retroativa (spec depois do código).
- Big-bang: refazer tudo numa PR gigante — sempre slice incremental.
- Enfeite que quebra CWV (blur pesado, vídeo autoplay grande no hero).
- Copy "IA genérica" que serviria para qualquer concorrente.
- Estado de tema client-only que causa flash no primeiro paint.
