// Cria/atualiza o schema do banco. Uso: npm run db:migrate
// A aplicação também cria a tabela automaticamente na primeira requisição,
// então este script é opcional (útil em pipelines de deploy).
import { readFileSync } from "node:fs";
import pg from "pg";

// carrega .env manualmente para não depender de dotenv
try {
  for (const line of readFileSync(new URL("../.env", import.meta.url), "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match && !(match[1] in process.env)) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  // sem .env — usa variáveis de ambiente já definidas
}

const SQL = `
  CREATE TABLE IF NOT EXISTS leads (
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT        NOT NULL,
    email       TEXT        NOT NULL,
    whatsapp    TEXT        NOT NULL,
    company     TEXT,
    message     TEXT,
    email_sent      BOOLEAN NOT NULL DEFAULT FALSE,
    whatsapp_sent   BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
`;

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

try {
  await pool.query(SQL);
  console.log("✔ Migração concluída: tabela 'leads' pronta.");
} finally {
  await pool.end();
}
