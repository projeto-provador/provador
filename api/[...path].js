// Entrada serverless do Vercel. Todas as rotas /api/* caem aqui e são
// tratadas pelo app Express (que já define /api/leads, /api/health, etc.).
// Um app Express é um handler (req, res) válido para funções do Vercel.
import app from '../server/app.js';

export default app;
