import 'dotenv/config';
import app from './app.js';
import { initSchema } from './db.js';

const PORT = Number(process.env.PORT || 3000);

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
