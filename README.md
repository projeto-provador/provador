# QuipeAI · Provador

Landing page do **Kit de Qualificação de ICP + Diagnóstico** da QuipeAI, agora com backend real:

- **Front-end** estático (`public/index.html`) — o quiz calcula o score no navegador.
- **Backend** Node/Express (`server/`) — recebe o lead, **persiste no Postgres** e dispara
  **e-mail** (SMTP) e **WhatsApp** (plugável).

O envio ao backend é resiliente: se a API estiver fora do ar, o lead é guardado no
`localStorage` do navegador como fallback e o fluxo do usuário não quebra.

---

## Requisitos

- Node.js ≥ 20
- Um Postgres acessível (local, Supabase, Neon, Render, RDS…)

## Setup rápido

```bash
# 1. Instalar dependências
npm install

# 2. Configurar ambiente
cp .env.example .env
#   edite .env com sua DATABASE_URL e (opcional) SMTP / WhatsApp

# 3. Criar o schema no banco (opcional — o servidor também cria no boot)
npm run db:init

# 4. Subir
npm start        # produção
npm run dev      # com --watch
```

Acesse **http://localhost:3000**.

---

## Configuração (`.env`)

### Banco de dados
Use `DATABASE_URL` **ou** as variáveis `PG*`. Para provedores gerenciados
(Supabase/Neon/Render), defina `PGSSL=true`.

```env
DATABASE_URL=postgres://usuario:senha@host:5432/quipeai
PGSSL=true
```

### E-mail (opcional)
Desligado por padrão. Para ligar:

```env
EMAIL_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=voce@gmail.com
SMTP_PASS=sua-senha-de-app        # Gmail: use "Senha de app"
EMAIL_FROM="QuipeAI <voce@gmail.com>"
TEAM_EMAIL=projeto@quipeai.com.br  # recebe a notificação de cada lead
EMAIL_CONFIRM_LEAD=true            # manda confirmação ao lead se o contato for e-mail
```

### WhatsApp (plugável)
Escolha o `WHATSAPP_PROVIDER`:

| Provider | O que faz | Custo/esforço |
|----------|-----------|----------------|
| `none` (padrão) | **Não envia.** Só registra no log um link `wa.me` pronto para você clicar e mandar manualmente. | Zero — é o "mais simples pra envio". |
| `cloud` | **WhatsApp Cloud API** oficial da Meta (só HTTP). | Precisa de conta no Meta Business + token + número. |
| `openwa` | `@open-wa/wa-automate` — sobe um navegador e você escaneia o QR code. | Dependência pesada; sessão precisa ficar de pé. **Não funciona no Vercel** (só em servidor tradicional). |

```env
# opção simples
WHATSAPP_PROVIDER=none
TEAM_WHATSAPP=5511999999999   # recebe o link/notificação (formato internacional)

# opção oficial
WHATSAPP_PROVIDER=cloud
WA_CLOUD_TOKEN=EAAB...
WA_CLOUD_PHONE_ID=123456789

# opção open-wa (apenas servidor tradicional, NÃO no Vercel)
WHATSAPP_PROVIDER=openwa
npm i @open-wa/wa-automate   # instale à parte; não vem no package.json
```

> Todos os envios (e-mail e WhatsApp) são **best-effort**: uma falha neles nunca
> impede o lead de ser salvo nem retorna erro ao usuário.

---

## API

### `POST /api/leads`
Recebe o payload do quiz, salva e notifica.

```jsonc
{
  "flow": "diag",            // "icp" | "diag"
  "tier": "A",               // "A" | "B" | "FORA"
  "score": 8, "gate": 2,
  "answers": { /* ... */ },
  "xray": { /* só no diag */ },
  "lead": { "nome": "...", "contato": "voce@empresa.com", "empresa": "...", "cargo": "..." },
  "ts": "2026-07-13T12:00:00.000Z"
}
```
Resposta: `{ "ok": true, "id": "<uuid>" }`.

### `GET /api/health`
`{ ok, db, whatsapp }` — checa a conexão com o banco.

### `GET /api/leads` (opcional, protegido)
Só habilita se `ADMIN_TOKEN` estiver definido no `.env`. Envie o header
`X-Admin-Token: <token>` para listar os últimos 200 leads.

---

## Estrutura

```
provador/
├─ public/
│  └─ index.html        # landing + quiz (chama POST /api/leads)
├─ server/
│  ├─ index.js          # Express: rotas e orquestração
│  ├─ db.js             # pool pg + schema + insertLead
│  ├─ email.js          # nodemailer (time + lead)
│  ├─ whatsapp.js       # providers none | cloud | openwa
│  ├─ schema.sql        # referência do schema
│  └─ scripts/init-db.js
├─ .env.example
└─ package.json
```

## Deploy no Vercel

O projeto já vem pronto para o Vercel:

- `public/` é servido como estático (a landing).
- `api/[...path].js` é a função serverless que embrulha o app Express — todas as
  rotas `/api/*` caem nela.
- `vercel.json` define a função e a rota raiz.

### Passo a passo (importando o repositório — recomendado)

1. Tenha um **Postgres gerenciado**. O mais fácil é criar um no próprio Vercel:
   painel do projeto → **Storage → Create Database → Postgres** (Neon). Isso
   injeta a `DATABASE_URL` automaticamente. Alternativas: Supabase, Neon direto.
   > Em serverless, **use a connection string com pooling** (Supabase porta
   > `6543` / Neon "pooled") para não esgotar conexões.
2. No [vercel.com](https://vercel.com) → **Add New → Project** → importe
   `projeto-provador/provador` e selecione a branch.
3. Em **Settings → Environment Variables**, adicione:

   | Variável | Obrigatória | Observação |
   |----------|:---:|------------|
   | `DATABASE_URL` | ✅ | já preenchida se usar o Postgres do Vercel; senão cole a sua |
   | `PGSSL` | ✅ | `true` |
   | `ALLOWED_ORIGINS` | ⛔ | `*` ou o domínio do seu site |
   | `EMAIL_ENABLED` + `SMTP_*` + `TEAM_EMAIL` | ⛔ | para ligar e-mail |
   | `WHATSAPP_PROVIDER` | ⛔ | `none` ou `cloud` (**`openwa` não roda no Vercel**) |
   | `WA_CLOUD_*` | ⛔ | se `WHATSAPP_PROVIDER=cloud` |
   | `ADMIN_TOKEN` | ⛔ | para habilitar `GET /api/leads` |

4. **Deploy**. Não há build step (front estático + funções).
   > **Deployment Protection:** por padrão o Vercel pode deixar o projeto atrás
   > de login (redirect para `vercel.com/sso-api`). Para deixar a landing
   > pública: **Settings → Deployment Protection → Vercel Authentication →
   > desligar** (ou restringir só a Preview).
5. Rode o schema **uma vez** (ou deixe o auto-init cuidar no 1º request):
   ```bash
   psql "$DATABASE_URL" -f server/schema.sql
   ```
   O servidor também cria o schema sozinho no primeiro request
   (`AUTO_INIT_SCHEMA=false` desliga esse comportamento).

### Passo a passo (via CLI)

```bash
npm i -g vercel
vercel login
vercel            # preview
vercel --prod     # produção
# defina as env vars com:  vercel env add DATABASE_URL
```

## Outros hosts (Render, Railway, Fly, VPS)

Nesses, o app roda como servidor tradicional (front + API no mesmo processo):
basta `npm start` com as variáveis do `.env` e um Postgres. Se hospedar a
landing separada da API, aponte o `API_BASE` no topo do `<script>` em
`public/index.html` para a URL do backend e ajuste `ALLOWED_ORIGINS`.
