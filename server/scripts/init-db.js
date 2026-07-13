import 'dotenv/config';
import { pool, initSchema } from '../db.js';

try {
  await initSchema();
  console.log('✅ Schema criado/atualizado com sucesso.');
} catch (err) {
  console.error('❌ Falha ao criar schema:', err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
