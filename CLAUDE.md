# CLAUDE.md — QuipeAI Site

> Arquivo mestre de contexto. O agente lê este arquivo **no início de toda sessão**.
> Se algo aqui conflitar com um pedido pontual, este arquivo vence — salvo instrução explícita do owner.

---

## 1. O que estamos construindo

Um **site institucional novo** para a QuipeAI (quipeai.com.br), substituindo a SPA client-side-rendered atual (Lovable). O site é o topo de funil comercial e a camada de autoridade da marca. Dois trabalhos, nesta ordem de prioridade:

1. **Existir para máquinas** — ser indexável pelo Google e **citável** por ChatGPT, Claude, Perplexity, Gemini e AI Overviews.
2. **Converter humanos** — levar cliente, investidor e ecossistema tech do primeiro clique a um lead qualificado.

Meta de negócio: **fazer o site evoluir e converter.** Toda decisão se justifica por um desses dois trabalhos.

---

## 2. Quem é a QuipeAI (definição de entidade — usar como fonte)

QuipeAI é uma **fábrica de produto AI-first** brasileira (São Paulo). O core **não é um produto — é um método replicável** ("Revolução 5.0"): a IA aposenta o trabalho-commodity, o especialista **decide e assina**, e cobra-se **por resultado**. Os produtos (auditoria-IA, RFEE/SEC risk factors, Terra-Métrica, etc.) são **exemplos de execução do método**, não o negócio em si.

- **Modelo:** Service-as-a-Software (entrega desfecho, não dashboard).
- **Moat:** motor proprietário treinado no contexto do cliente + acoplamento antagônico entre dados e SLM/LLM + melhoria contínua específica do projeto. Trocar de fornecedor obrigaria a recomeçar o projeto do zero.
- **Receita:** cobrança por resultado, não por licença de software.
- **Aposta contrária:** contra os "agentes de IA autônomos que prometem e não entregam". A arquitetura certa nas verticais reguladas é **autonomia limitada com humano no ponto de responsabilidade**.
- **Founder:** Luiz Guilherme Ramos Guimarães · persona **Curva C** · "yogue no corporativo".

Arco de marca (frase-âncora, usar no site):
> **O software carrega o conhecimento e os limites. O humano carrega o julgamento e a assinatura.**

Detalhe completo de voz, tese e as 4 perguntas do ICP em `CONTENT.md`.

---

## 3. Regras de ouro (não-negociáveis)

1. **SSR/SSG obrigatório.** Nada de client-side-rendering puro. Todo conteúdo textual crítico (hero, método, produtos, cases, FAQ, rodapé) precisa estar no **HTML da primeira resposta HTTP**, sem depender de JS. É o motivo nº 1 do rebuild — não regredir.
2. **AGEO é first-class, não afterthought.** Conteúdo answer-first, entidade bem definida, FAQ com schema, dados citáveis, `llms.txt` na raiz. Ver `SEO-AGEO.md`.
3. **Tokens, não hardcode.** Cores, tipografia, espaçamento e sombras vêm de `DESIGN.md` (CSS variables + Tailwind theme). Nunca escrever `#00DC82` solto num componente — usar o token semântico.
4. **Dois temas desde o dia zero.** Obsidian **Escuro** (default) e Obsidian **Claro**, ambos AA. Toggle persistido via cookie, SSR-safe (sem flash). Ver `DESIGN.md §6`.
5. **Copy vem de `CONTENT.md`.** O agente não inventa headline nem CTA. Se faltar copy, marcar `TODO(copy)` e perguntar — não preencher com genérico de IA.
6. **Prova > promessa.** Nenhuma afirmação de resultado sem número ou sem marcar `TODO(prova)`. "Cobro por resultado" sem case é o que afunda o concorrente genérico.
7. **Performance é UX e é SEO.** Meta Lighthouse ≥ 95 em Performance, Best Practices, SEO; ≥ 100 em nenhum critério sacrificado por enfeite. Core Web Vitals no verde.
8. **Acessível por padrão.** WCAG 2.1 AA. Foco visível, contraste checado nos dois temas, navegação por teclado, `prefers-reduced-motion` respeitado.
9. **Uma marca, uma história.** O site é a fonte canônica. Não reproduzir resíduos antigos ("acelerador", "mentoria", "chatbots") de redes sociais legadas.
10. **Sem localStorage/sessionStorage para estado de tema em SSR** — usar cookie para evitar FOUC. (A restrição de artifacts não se aplica aqui; é código de produção.)

---

## 4. Stack canônico do projeto

```yaml
linguagem:   typescript@5 (strict: true)
runtime:     node@22 LTS
framework:   next@15 (App Router, RSC, Server Actions)
render:      SSG por padrão + ISR onde fizer sentido (blog); SSR só quando necessário
conteudo:    MDX (content-collections ou @next/mdx) — blog, método, cases versionados em git
ui:          tailwindcss@4 (theme via CSS variables) + shadcn/ui + radix
motion:      framer-motion (respeitando prefers-reduced-motion)
tema:        next-themes (cookie/SSR) OU implementação própria com cookie + inline script anti-FOUC
forms:       react-hook-form + zod; envio via Server Action → Resend (email) ou webhook CRM
icones:      lucide-react
fonts:       next/font — Poppins (display) + Inter (texto). self-hosted, sem FOUT
seo:         next-sitemap ou rota app/sitemap.ts + app/robots.ts; metadata API nativa do Next
schema:      JSON-LD via componente <JsonLd> por página (Organization, Product, FAQPage, Article, Person)
analytics:   Plausible (privacy-first) OU GA4 + Google Search Console + Bing Webmaster
deploy:      vercel (SSG/ISR nativo, edge)
ci:          github-actions (typecheck + lint + build + lighthouse-ci)
```

Justificativa da escolha em `PLAN.md §5`. Decisões pontuais viram ADR em `docs/adr/` quando reversibilidade for Tipo 1.

---

## 5. Arquitetura de informação (rotas)

```
/                     Home — tese + prova + 3 caminhos por público
/metodo               O método (Revolução 5.0) + as 4 perguntas do ICP
/produtos             Portfólio como execuções do método (auditoria-IA, RFEE, Terra-Métrica, ...)
/produtos/[slug]      Página de produto/case com prova (números)
/founder              Curva C — autoridade, tese contrária, ponto de vista
/conteudo             Hub/blog answer-first (SEO + AGEO)
/conteudo/[slug]      Artigo (schema Article + FAQ)
/contato              Conversão: piloto "se não entregar, você não paga" + captura segmentada
/llms.txt             Definição de entidade + índice para LLMs (rota estática)
/sitemap.xml /robots.txt
```

Detalhe de cada rota (seções, componentes, requisitos) em `SPEC.md`.

---

## 6. Definição de "pronto" (resumo — completo em `AGENTS.md`)

Uma página só está pronta quando: renderiza conteúdo em HTML sem JS · tem `<title>`/description/OG únicos · tem JSON-LD válido · passa AA nos dois temas · Lighthouse ≥ 95 (Perf/SEO/BP) · copy vem de `CONTENT.md` (ou `TODO` marcado) · CTA claro e rastreável · sem regressão de CWV.

---

## 7. O que nunca fazer

- ❌ Client-side-rendering de conteúdo indexável.
- ❌ Texto crítico dentro de imagem (mata SEO e AGEO).
- ❌ Cor/fonte/spacing hardcoded fora dos tokens.
- ❌ Headline ou número inventado pela IA.
- ❌ `<div onClick>` como navegação — usar `<Link>`/`<a href>` crawlable.
- ❌ Bloquear GPTBot/ClaudeBot/PerplexityBot/Google-Extended no robots.
- ❌ Um único CTA genérico servindo três públicos diferentes.
- ❌ Animação sem fallback para `prefers-reduced-motion`.

---

## 8. Glossário de projeto

| Termo | Significado |
|:--|:--|
| **Método / Revolução 5.0** | o core replicável: IA aposenta commodity, humano assina, cobra-se por resultado |
| **4 perguntas** | filtro de qualificação do ICP (ver `CONTENT.md §4`) |
| **Motor** | o engine proprietário treinado no contexto do cliente = o moat |
| **Ponto de responsabilidade** | onde o especialista humano decide e assina (accountability sink) |
| **AGEO/GEO** | Generative Engine Optimization — ser citado por LLMs |
| **Obsidian Claro/Escuro** | os dois temas do design system (ver `DESIGN.md`) |
| **Piloto** | oferta de entrada: "se não entregar, você não paga" |
