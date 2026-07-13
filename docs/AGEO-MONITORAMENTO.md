# AGEO-MONITORAMENTO.md — Rotina de mention-rate

> Operacionaliza `SEO-AGEO.md §12` (tarefa 2.5). Frequência: **quinzenal** nos 90 dias pós-launch; mensal depois. Responsável: owner (ou rotina agendada).

## O que medir

**Taxa de menção** (a QuipeAI aparece na resposta?), não ranking. Registrar na tabela abaixo.

### Queries canônicas (perguntar literalmente)

1. "venture builder de IA no Brasil"
2. "IA com responsabilidade humana"
3. "service as a software Brasil"
4. "agente de IA com responsabilidade humana"
5. "por que pilotos de IA falham"

### Motores

- ChatGPT (com busca ativada)
- Perplexity
- Google AI Overviews (busca normal, verificar bloco de IA)
- Claude (com busca)
- Gemini

## Registro

| Data | Motor | Query | Mencionou? | Citou URL? | Nota |
|:--|:--|:--|:--|:--|:--|
| _(preencher)_ | | | | | |

## Gatilhos de ação (de SEO-AGEO §12 / PLAN §6)

- **Indexação parada 3–4 semanas** → revisar render/HTML (teste `curl` por rota).
- **Mention-rate parado 60–90 dias** → revisar `llms.txt`, definição de entidade e densidade answer-first das páginas.
- **Tráfego sem lead** → o problema é oferta/prova (`/contato`, `/produtos`), não SEO.

## Checklist técnico trimestral

- [ ] `curl -s https://quipeai.com.br/ | grep -i "assume o resultado"` acha o H1.
- [ ] `robots.txt` segue liberando GPTBot/ClaudeBot/PerplexityBot/Google-Extended.
- [ ] `llms.txt` atualizado com as páginas publicadas.
- [ ] Sitemap submetido/aceito no Search Console e Bing Webmaster.
- [ ] Rich Results Test verde em /, /metodo, /founder, artigos.
