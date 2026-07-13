# QuipeAI · Novo site www.quipeai.com.br

Site do método QuipeAI em Next.js 14 App Router + Tailwind. Fonte única de
verdade do conteúdo: `docs/` do projeto master e as definições canônicas em
`lib/site.ts`. Não é catálogo de produtos: é máquina de qualificação do
método, com quiz 4+1, calculadora de vazão e AEO para LLMs.

## Rodar local

```bash
npm install
npm run dev
```

Build e testes de aceite:

```bash
npm run build
npm test        # roda scripts/alpha-check.mjs sobre o build
npm run lint
```

`npm test` valida os critérios de aceite do doc técnico: H1 único por página,
JSON-LD válido (Organization, Person, HowTo 5 etapas, FAQPage, Breadcrumb,
Article), copy sem travessão e sem emoji, menção obrigatória a ponto de
responsabilidade e assinatura nas páginas core, llms.txt e llms-full.md,
robots, sitemap, links internos e a tabela-verdade do quiz 4+1.

## Estrutura

- `app/` páginas. Camada 0: `/`, `/metodo`, `/ponto-de-responsabilidade`,
  `/trabalho-commodity`, `/motor`. Camada 1: `/cunha-contabil`,
  `/auditoria-ia`, `/cases/contabil`. Camada 2: `/fabrica`,
  `/modelo-30-porcento`. Camada 3: `/rfee`, `/manifesto`. Cluster SEO:
  `/blog` com 6 artigos da Reforma CBS IBS.
- `components/` Quiz 4+1, Calculadora de vazão, Diagrama do motor, Selo Quem
  assina, FAQ AEO, Nav, Footer, Analytics.
- `lib/` definições canônicas (`site.ts`), schema JSON-LD (`schema.ts`),
  lógica do quiz (`quiz-core.mjs`, testável em Node puro), UTM
  (`utm.ts`), artigos (`posts.ts`), rotas por onda (`routes.ts`).
- `public/llms.txt` e `public/docs/llms-full.md` para AEO.

## Integrações

Copie `.env.example` para `.env.local` e preencha:

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel. PageView por rota e evento custom `Conversa_Qualificada_Iniciada`, disparado apenas quando o lead responde >=1 projeto recusado e passa nas 4 perguntas. |
| `NEXT_PUBLIC_GA4_ID` | GA4. Eventos `quiz_start`, `quiz_complete`, `icp_a`, `icp_b`, `agenda_click`, `calculadora_vazao`. |
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | Webhook n8n que recebe o lead completo do quiz (nome, empresa, cargo, WhatsApp, respostas, classificação, UTMs) para HubSpot, Sheets e Slack. |
| `NEXT_PUBLIC_CALENDLY_URL` | Agenda do toque 1 (15 min). As UTMs capturadas são repassadas na URL. |

A Conversions API do Meta deve ser configurada no GTM Server Side, fora do
front, usando o mesmo nome de evento `Conversa_Qualificada_Iniciada`.

O formulário do quiz tem honeypot anti-bot no front, mas a URL do webhook é
pública no bundle: valide no workflow n8n (rate limit por IP, formato do
WhatsApp com 10-11 dígitos, rejeição de payload sem os campos do lead) antes
de gravar no HubSpot ou Sheets.

Antes de produção: substituir o placeholder do selo Quem assina
(`Especialista Veritum`) por nome e registro CRC reais, com aprovação de
Luiz Guilherme.

## Fluxo A (Instagram frio) no site

O Manychat envia o lead para o WhatsApp com link para
`/cunha-contabil?recusados=X&utm_source=instagram&utm_medium=reel&utm_campaign=filtro&utm_content=pergunta5`.
O quiz pré-preenche a pergunta de ouro com `recusados` e as UTMs ficam em
`localStorage` até o clique de agenda.

## Regras de copy

Voz tersa, contrária mas calma. Sem travessão, sem emoji, sem hype, sem
promessa de autonomia total. Toda página core menciona ponto de
responsabilidade e assinatura como produto. Definições canônicas são
imutáveis e vivem em `lib/site.ts`; qualquer desvio precisa de aprovação de
Luiz Guilherme antes de produção.
