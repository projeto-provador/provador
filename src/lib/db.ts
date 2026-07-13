import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __provadorPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __provadorSchemaReady: Promise<void> | undefined;
}

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL não está definida. Copie .env.example para .env e configure.");
  }
  return new Pool({
    connectionString,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    max: 5,
  });
}

export function getPool(): Pool {
  if (!global.__provadorPool) {
    global.__provadorPool = createPool();
  }
  return global.__provadorPool;
}

export const LEADS_TABLE_SQL = `
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

export function ensureSchema(): Promise<void> {
  if (!global.__provadorSchemaReady) {
    global.__provadorSchemaReady = getPool()
      .query(LEADS_TABLE_SQL)
      .then(() => undefined)
      .catch((err) => {
        // permite nova tentativa na próxima requisição
        global.__provadorSchemaReady = undefined;
        throw err;
      });
  }
  return global.__provadorSchemaReady;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  company: string | null;
  message: string | null;
  created_at: string;
}

export async function insertLead(input: {
  name: string;
  email: string;
  whatsapp: string;
  company?: string;
  message?: string;
}): Promise<Lead> {
  await ensureSchema();
  const { rows } = await getPool().query<Lead>(
    `INSERT INTO leads (name, email, whatsapp, company, message)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, whatsapp, company, message, created_at`,
    [input.name, input.email, input.whatsapp, input.company ?? null, input.message ?? null]
  );
  return rows[0];
}

export async function markLeadNotified(
  id: number,
  flags: { emailSent?: boolean; whatsappSent?: boolean }
): Promise<void> {
  await getPool().query(
    `UPDATE leads
     SET email_sent    = COALESCE($2, email_sent),
         whatsapp_sent = COALESCE($3, whatsapp_sent)
     WHERE id = $1`,
    [id, flags.emailSent ?? null, flags.whatsappSent ?? null]
  );
}
