-- Schema da landing QuipeAI (Provador).
-- Aplicado automaticamente pelo servidor no boot (initSchema em server/db.js),
-- mas fica aqui como referência / para aplicar manualmente:
--   psql "$DATABASE_URL" -f server/schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS leads (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   timestamptz NOT NULL DEFAULT now(),
  flow         text,          -- 'icp' | 'diag'
  tier         text,          -- 'A' | 'B' | 'FORA'
  score        integer,       -- base 0..8
  gate         integer,       -- eliminatória de demanda 0..3
  nome         text,
  contato      text,          -- e-mail ou telefone informado
  contato_tipo text,          -- 'email' | 'phone' | 'unknown'
  empresa      text,
  cargo        text,
  answers      jsonb,         -- respostas cruas do quiz
  xray         jsonb,         -- raio-X (só no fluxo de diagnóstico)
  raw          jsonb,         -- payload completo recebido do front
  user_agent   text,
  ip           text
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_tier_idx ON leads (tier);
