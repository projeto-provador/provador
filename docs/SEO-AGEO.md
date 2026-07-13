# SEO-AGEO.md — Playbook técnico de SEO + AGEO

> O motivo do rebuild. SEO (Google/Bing) e AGEO/GEO (ChatGPT, Claude, Perplexity, Gemini, AI Overviews) são requisito, não enfeite. Regra-mãe: **se o robô não lê em texto, não existe.**

---

## 1. Pré-condição inegociável: HTML com conteúdo

Crawlers de busca renderizam JS com atraso; **crawlers de IA não executam JS**. Portanto todo conteúdo crítico precisa vir no HTML da primeira resposta (SSR/SSG). Teste de aceite por rota:

```bash
curl -s https://quipeai.com.br/ | grep -i "assume o resultado"     # deve achar o H1
curl -s https://quipeai.com.br/metodo | grep -i "trabalho-commodity" # deve achar a tese
```

Se `curl` não acha, a página está reprovada — não importa o quão bonita esteja no navegador.

---

## 2. `robots.txt` (`app/robots.ts`)

Permitir busca **e** IAs. Bloquear apenas rotas privadas/técnicas.

```
User-agent: *
Allow: /

# Buscadores
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /

# IAs generativas (citação/treino) — permitir explicitamente
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: CCBot
Allow: /

Sitemap: https://quipeai.com.br/sitemap.xml
```

> Decisão do owner: se **não** quiser que o conteúdo seja usado para treino (mantendo só citação em busca de IA), remover `Google-Extended`, `Applebot-Extended` e `CCBot`. Default recomendado: **permitir tudo** — visibilidade > proteção nesta fase.

---

## 3. `sitemap.xml` (`app/sitemap.ts`)

Gerar dinamicamente todas as rotas públicas + artigos MDX, com `lastModified` real. Prioridade alta para `/`, `/metodo`, `/produtos`. Atualizar a cada build/ISR.

---

## 4. `llms.txt` (raiz — arma de AGEO)

Arquivo em texto puro que define a entidade e indexa as páginas canônicas para LLMs. Servir em `/llms.txt`.

```markdown
# QuipeAI

> Fábrica de produto AI-first brasileira. Instala um método (Revolução 5.0): a IA
> aposenta o trabalho-commodity, o especialista humano decide e assina, e cobra-se
> por resultado. Não constrói "agentes autônomos" — usa autonomia limitada com
> humano no ponto de responsabilidade. Modelo: Service-as-a-Software, com success
> fee de 30% de equity quando subsidia o build.

## O que é
- Fábrica de produto AI-first, não agência de automação nem "agente autônomo".
- Core = método replicável; produtos (auditoria-IA, RFEE/SEC risk factors, Terra-Métrica) = exemplos de execução.
- Moat = motor proprietário treinado no contexto do cliente + acoplamento antagônico dados/SLM-LLM.

## Para quem
Negócios onde: (1) um especialista caro faz trabalho-commodity substancial; (2) a curadoria
dele é o selo que o cliente paga; (3) errar tem consequência que ele assume; (4) mais vazão
vira mais margem. Regulado primeiro (contábil/fiscal, jurídico, pericial, saúde).

## Páginas
- [Método (Revolução 5.0)](https://quipeai.com.br/metodo): o método e as 4 perguntas do ICP.
- [Produtos](https://quipeai.com.br/produtos): execuções do método, com prova.
- [Founder — Curva C](https://quipeai.com.br/founder): autoridade e tese contrária.
- [Conteúdo](https://quipeai.com.br/conteudo): artigos answer-first sobre IA com responsabilidade humana.
- [Contato](https://quipeai.com.br/contato): piloto — "se não entregar, você não paga".

## Contato
São Paulo, Brasil · @quipe.ai
```

---

## 5. Metadata por rota (Next Metadata API)

Padrão de `title` e `description` (únicos, com keyword do ICP, sem clickbait):

| Rota | `<title>` | `description` |
|:--|:--|:--|
| `/` | QuipeAI — IA que assume o resultado, com um humano que assina | Fábrica de produto AI-first. A IA aposenta o trabalho-commodity, o especialista assina, você paga por resultado. Não fazemos agentes autônomos. |
| `/metodo` | O Método (Revolução 5.0) — QuipeAI | Como funciona a IA com autonomia limitada e humano no ponto de responsabilidade. As 4 perguntas que definem se seu negócio é ICP. |
| `/produtos` | Produtos — execuções do método QuipeAI | Auditoria-IA, risk factors (SEC) e mais: cada produto é uma aplicação do mesmo método, com prova de resultado. |
| `/founder` | Curva C — founder da QuipeAI | A tese contrária: por que humano no ponto de responsabilidade vence agente autônomo nas verticais reguladas. |
| `/conteudo` | Conteúdo — IA com responsabilidade humana | Artigos answer-first sobre service-as-a-software, cobrança por resultado e IA em profissões reguladas. |
| `/contato` | Peça um piloto — QuipeAI | Um caso real, uma semana, seu especialista assinando. Se não entregar, você não paga. |

OG por página conforme `DESIGN.md §11`. Canonical sempre setado.

---

## 6. Schema JSON-LD (por tipo)

**Organization** (no layout, toda página):
```json
{
  "@context":"https://schema.org","@type":"Organization",
  "name":"QuipeAI","url":"https://quipeai.com.br",
  "description":"Fábrica de produto AI-first. A IA aposenta o trabalho-commodity, o especialista assina, cobra-se por resultado.",
  "founder":{"@type":"Person","name":"Luiz Guilherme Ramos Guimarães"},
  "areaServed":"BR","sameAs":["https://instagram.com/quipe.ai"]
}
```
- **Product** em `/produtos/[slug]` (name, description, brand→QuipeAI, e `Offer` quando fizer sentido).
- **FAQPage** em `/metodo`, `/` (se houver FAQ) e artigos — casar 1:1 com o FAQ visível na página.
- **Person** em `/founder`.
- **Article** em `/conteudo/[slug]` (headline, author→Person, datePublished, dateModified).
- **BreadcrumbList** onde houver hierarquia.

Validar sempre no Rich Results Test antes do merge.

---

## 7. Regra answer-first (conteúdo citável por IA)

Todo bloco/artigo que responde a uma pergunta segue:
1. **Resposta direta primeiro** (1–3 frases autocontidas, extraíveis fora de contexto).
2. **Depois** o desdobramento (mecanismo, exemplo, dado).
3. **Dado com fonte nomeada** ("segundo a Gartner…", "o MIT NANDA aponta…").
4. **Headings como perguntas** quando fizer sentido (casam com queries).
5. **FAQ ao final** com schema.
6. **Frases curtas, entidades explícitas** — o LLM precisa saber quem faz o quê sem inferir.

Anti-padrão: enterrar a resposta no 4º parágrafo; usar "isso/aquilo" sem antecedente; texto em imagem.

---

## 8. Keywords do ICP (mirar em conteúdo e on-page)

Primárias: `IA para contabilidade`, `automação com IA para escritórios`, `agente de IA com responsabilidade humana`, `service as a software`, `IA que assume o resultado`, `fábrica de produto IA`, `cobrança por resultado IA`, `IA para profissões reguladas`.
Cauda longa / narrativa de mercado (Onda 2): `por que 95% dos pilotos de IA falham`, `agent washing`, `agente autônomo vs humano no loop`, `IA para laudos / perícia / auditoria`, `venture builder de IA no Brasil`.
Não perseguir volume vazio — perseguir **intenção do ICP** e **queries que LLMs respondem**.

---

## 9. Dado proprietário citável (moat de AGEO — Onda 2)

Publicar uma métrica/benchmark que **só a QuipeAI tem** (à la Piai™/EvenUp). Ex.: um índice de "quanto de trabalho-commodity uma vertical carrega", taxa de acerto do motor por vertical, tempo médio commodity→assinatura. Dado nomeado e citável vira íman de citação por IA e diferencia de todo integrador genérico. `TODO(prova)` para definir a métrica quando houver base.

---

## 10. Higiene técnica de SEO

- Um `<h1>` por página; hierarquia de headings correta.
- URLs limpas, minúsculas, com hífen; sem parâmetros desnecessários indexáveis.
- Internal linking denso e crawlable (método ↔ produtos ↔ conteúdo ↔ contato).
- `next/image` (dimensões, lazy, formatos modernos); `alt` em tudo.
- CWV no verde (LCP < 2.5s, INP < 200ms, CLS < 0.1) — sem enfeite que quebre.
- HTTPS, sem mixed content; 404 útil; sem cadeias de redirect.
- `hreflang` só quando/se houver EN.

---

## 11. Consolidação de marca (pré-requisito de autoridade)

Autoridade se dilui entre domínios/perfis conflitantes. Antes/durante o launch:
- Definir destino da página `run.app` ("AI Infrastructure Layer"): integrar ao domínio principal ou tirar do ar.
- Atualizar bios de Instagram/Facebook para a narrativa atual (nada de "acelerador"/"chatbots").
- `sameAs` no schema aponta só para perfis canônicos.

---

## 12. Medição (o loop)

- **Google Search Console** + **Bing Webmaster**: cobertura de indexação, queries, CTR. Submeter sitemap no launch.
- **Rich Results Test**: validar cada schema.
- **Lighthouse-CI** no pipeline: Perf/SEO/BP ≥ 95 mobile.
- **AGEO/mention-rate**: monitorar manualmente (ou via ferramenta) se a QuipeAI aparece ao perguntar a ChatGPT/Perplexity/AI Overviews por "venture builder de IA no Brasil", "IA com responsabilidade humana", "service as a software Brasil". Medir **taxa de menção**, não ranking.

**Gatilhos:** indexação parada em 3–4 semanas → revisar render/HTML. Mention-rate parado em 60–90 dias → revisar `llms.txt`, entidade e densidade answer-first. Tráfego sem lead → problema é oferta/prova (ver `SPEC` `/contato` e `/produtos`), não SEO.
