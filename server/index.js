import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { pool, initSchema, insertLead } from './db.js';
import { notifyTeamEmail, confirmLeadEmail } from './email.js';
import { notifyTeamWhatsapp, confirmLeadWhatsapp } from './whatsapp.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));

// CORS simples e configurável.
const ORIGINS = (process.env.ALLOWED_ORIGINS || '*').split(',').map((s) => s.trim());
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ORIGINS.includes('*')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (origin && ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Front-end estático.
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, db: 'up', whatsapp: process.env.WHATSAPP_PROVIDER || 'none' });
  } catch (err) {
    res.status(500).json({ ok: false, db: 'down', error: err.message });
  }
});

// Detecta se o contato informado é e-mail ou telefone.
function classifyContato(contato) {
  const v = String(contato || '').trim();
  if (!v) return 'unknown';
  if (v.includes('@') && /\S+@\S+\.\S+/.test(v)) return 'email';
  if ((v.match(/\d/g) || []).length >= 8) return 'phone';
  return 'unknown';
}

app.post('/api/leads', async (req, res) => {
  const p = req.body || {};
  const lead = p.lead || {};

  // Validação mínima: precisa de algum contato utilizável.
  const contato = String(lead.contato || '').trim();
  const contato_tipo = classifyContato(contato);
  if (contato_tipo === 'unknown' && !String(lead.nome || '').trim()) {
    return res.status(400).json({ ok: false, error: 'Informe ao menos nome ou um contato válido.' });
  }

  const row = {
    flow: p.flow ?? null,
    tier: p.tier ?? null,
    score: Number.isFinite(p.score) ? p.score : null,
    gate: Number.isFinite(p.gate) ? p.gate : null,
    nome: lead.nome ?? null,
    contato: contato || null,
    contato_tipo,
    empresa: lead.empresa ?? null,
    cargo: lead.cargo ?? null,
    answers: p.answers ?? null,
    xray: p.xray ?? null,
    raw: p,
    user_agent: req.headers['user-agent'] || null,
    ip: (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim(),
  };

  let saved;
  try {
    saved = await insertLead(row);
  } catch (err) {
    console.error('[api] falha ao salvar lead:', err.message);
    return res.status(500).json({ ok: false, error: 'Não foi possível salvar. Tente novamente.' });
  }

  // Responde já ao cliente; notificações são best-effort.
  res.json({ ok: true, id: saved.id });

  const meta = { flow: p.flow, tier: p.tier, score: row.score, gate: row.gate, xray: p.xray };
  const leadForMsg = { ...lead, contato, contato_tipo };
  Promise.allSettled([
    notifyTeamEmail(leadForMsg, meta),
    confirmLeadEmail(leadForMsg, meta),
    notifyTeamWhatsapp(leadForMsg, meta),
    confirmLeadWhatsapp(leadForMsg),
  ]).then((results) => {
    const [te, ce, tw, cw] = results.map((r) => (r.status === 'fulfilled' ? r.value : { ok: false, error: r.reason?.message }));
    console.log(`[api] lead ${saved.id} · email-time:${te.ok} email-lead:${ce.ok} wa-time:${tw.ok} wa-lead:${cw.ok}`);
  });
});

// Listagem protegida (opcional): defina ADMIN_TOKEN para habilitar.
app.get('/api/leads', async (req, res) => {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return res.status(404).json({ ok: false, error: 'não habilitado' });
  if (req.headers['x-admin-token'] !== token) return res.status(401).json({ ok: false, error: 'não autorizado' });
  try {
    const { rows } = await pool.query(
      'SELECT id, created_at, flow, tier, score, gate, nome, contato, contato_tipo, empresa, cargo FROM leads ORDER BY created_at DESC LIMIT 200',
    );
    res.json({ ok: true, count: rows.length, leads: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

async function start() {
  try {
    await initSchema();
    console.log('[db] schema pronto.');
  } catch (err) {
    console.error('[db] falha ao inicializar schema:', err.message);
    console.error('     Verifique DATABASE_URL / PG* no .env e se o Postgres está no ar.');
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`QuipeAI Provador rodando em http://localhost:${PORT}`);
    console.log(`  e-mail: ${String(process.env.EMAIL_ENABLED).toLowerCase() === 'true' ? 'on' : 'off'} · whatsapp: ${process.env.WHATSAPP_PROVIDER || 'none'}`);
  });
}

start();
