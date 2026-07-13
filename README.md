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
| `openwa` | `@open-wa/wa-automate` — sobe um navegador e você escaneia o QR code. | Instala dependência pesada; sessão precisa ficar de pé. |

```env
# opção simples
WHATSAPP_PROVIDER=none
TEAM_WHATSAPP=5511999999999   # recebe o link/notificação (formato internacional)

# opção oficial
WHATSAPP_PROVIDER=cloud
WA_CLOUD_TOKEN=EAAB...
WA_CLOUD_PHONE_ID=123456789

# opção open-wa
WHATSAPP_PROVIDER=openwa
# npm i @open-wa/wa-automate   (é optionalDependency)
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

## Deploy

Serve o front e a API do mesmo processo, então basta hospedar o Node
(Render, Railway, Fly, VPS…) com as variáveis do `.env` e um Postgres.
Se preferir hospedar a landing separada (Vercel/Netlify), aponte o
`API_BASE` no topo do `<script>` em `public/index.html` para a URL do backend
e ajuste `ALLOWED_ORIGINS` no `.env`.
