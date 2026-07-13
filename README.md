# Provador Virtual — Landing Page

Landing page do Provador Virtual (QuipeAI) com captação de leads:

- **Next.js** (App Router, TypeScript)
- **PostgreSQL** — leads gravados na tabela `leads`
- **E-mail** — notificação para a equipe + confirmação para o lead (Nodemailer/SMTP)
- **WhatsApp** — notificação de novo lead via **WhatsApp Cloud API** (oficial da Meta)

## Rodando localmente

```bash
# 1. Suba o Postgres local
docker compose up -d

# 2. Configure as variáveis de ambiente
cp .env.example .env
# edite o .env com seu SMTP e (opcional) credenciais do WhatsApp

# 3. Instale e rode
npm install
npm run dev
```

Acesse http://localhost:3000. A tabela `leads` é criada automaticamente na
primeira requisição (ou rode `npm run db:migrate`).

## Variáveis de ambiente

Veja `.env.example` — todas comentadas. Resumo:

| Grupo    | Variáveis | Obrigatório? |
|----------|-----------|--------------|
| Banco    | `DATABASE_URL`, `DATABASE_SSL` | Sim |
| E-mail   | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO`, `MAIL_CONFIRMATION` | Não — sem SMTP o lead ainda é salvo no banco |
| WhatsApp | `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_NOTIFY_TO` | Não — deixe vazio para desativar |

O envio de e-mail/WhatsApp nunca bloqueia o cadastro: se falhar, o lead já está
salvo no banco (colunas `email_sent`/`whatsapp_sent` indicam o status).

## Por que WhatsApp Cloud API em vez de openwa?

O projeto só precisa **enviar** mensagens (notificar a equipe sobre novos
leads). Para isso a Cloud API oficial é bem mais simples e estável:

- uma chamada HTTP — sem manter navegador/sessão do WhatsApp Web rodando 24h;
- sem risco de bloqueio do número (openwa/wa-automate é não-oficial);
- gratuita para esse volume e funciona em qualquer host (Vercel, Railway, VPS).

**Como configurar (±10 min):** em [developers.facebook.com](https://developers.facebook.com)
crie um app → adicione o produto *WhatsApp* → em *API Setup* copie o token e o
`Phone number ID` para o `.env`. Para produção, gere um token permanente
(System User) e cadastre seu número próprio.

Se um dia precisar **receber** mensagens ou usar um número pessoal, o módulo
`src/lib/whatsapp.ts` é o único ponto a trocar (mesma assinatura de função)
por openwa, Baileys ou Evolution API.

## Consultando os leads

```sql
SELECT id, name, email, whatsapp, company, message, created_at
FROM leads ORDER BY created_at DESC;
```

## Deploy

Qualquer host Node funciona (Vercel, Railway, Render, VPS). Configure as
variáveis de ambiente do `.env.example` e um Postgres gerenciado
(Neon/Supabase/RDS — use `DATABASE_SSL=true`).
