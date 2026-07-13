import pg from 'pg';

const { Pool } = pg;

function buildConfig() {
  const ssl = String(process.env.PGSSL).toLowerCase() === 'true'
    ? { rejectUnauthorized: false }
    : false;

  if (process.env.DATABASE_URL) {
    return { connectionString: process.env.DATABASE_URL, ssl };
  }
  return {
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT || 5432),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'quipeai',
    ssl,
  };
}

export const pool = new Pool(buildConfig());

pool.on('error', (err) => {
  console.error('[db] erro inesperado no pool de conexões:', err.message);
});

// Cria a tabela de leads se ainda não existir. Idempotente.
export async function initSchema() {
  const sql = `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS leads (
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at  timestamptz NOT NULL DEFAULT now(),
      flow        text,
      tier        text,
      score       integer,
      gate        integer,
      nome        text,
      contato     text,
      contato_tipo text,
      empresa     text,
      cargo       text,
      answers     jsonb,
      xray        jsonb,
      raw         jsonb,
      user_agent  text,
      ip          text
    );

    CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
    CREATE INDEX IF NOT EXISTS leads_tier_idx ON leads (tier);
  `;
  await pool.query(sql);
}

// Insere um lead e devolve a linha criada.
export async function insertLead(row) {
  const q = `
    INSERT INTO leads
      (flow, tier, score, gate, nome, contato, contato_tipo, empresa, cargo, answers, xray, raw, user_agent, ip)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING id, created_at;
  `;
  const values = [
    row.flow,
    row.tier,
    row.score,
    row.gate,
    row.nome,
    row.contato,
    row.contato_tipo,
    row.empresa,
    row.cargo,
    row.answers ? JSON.stringify(row.answers) : null,
    row.xray ? JSON.stringify(row.xray) : null,
    row.raw ? JSON.stringify(row.raw) : null,
    row.user_agent,
    row.ip,
  ];
  const { rows } = await pool.query(q, values);
  return rows[0];
}
