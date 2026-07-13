import nodemailer from 'nodemailer';

const ENABLED = String(process.env.EMAIL_ENABLED).toLowerCase() === 'true';

let transporter = null;

function getTransporter() {
  if (!ENABLED) return null;
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
  return transporter;
}

const TIER_LABEL = {
  A: 'Encaixe forte (ICP-A)',
  B: 'Caminho a construir (ICP-B)',
  FORA: 'Ainda não é o momento',
};

function esc(s) {
  return String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function teamHtml(lead, meta) {
  const rows = [
    ['Fluxo', meta.flow === 'diag' ? 'Diagnóstico' : 'Sou ICP?'],
    ['Resultado', TIER_LABEL[meta.tier] || meta.tier],
    ['Score', `${meta.score} · gate ${meta.gate}`],
    ['Nome', lead.nome],
    ['Contato', lead.contato],
    ['Empresa / área', lead.empresa],
    ['Cargo', lead.cargo],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#6B7A94;font:600 13px sans-serif">${esc(k)}</td>` +
        `<td style="padding:6px 12px;color:#0B1120;font:400 14px sans-serif">${esc(v)}</td></tr>`,
    )
    .join('');

  const xray = meta.xray
    ? `<p style="font:600 13px sans-serif;color:#2560E0;margin:16px 0 4px">Raio-X</p>
       <p style="font:400 13px sans-serif;color:#33405C;margin:0">
         ${meta.xray.pctCommodity}% da capacidade sênior presa na parte-commodity ·
         ~${meta.xray.recused} projetos recusados/semestre ·
         ${meta.xray.seniors} especialista(s)
       </p>`
    : '';

  return `
  <div style="max-width:560px;margin:0 auto;font-family:sans-serif">
    <h2 style="color:#0B1120;font-size:18px;margin:0 0 4px">Novo lead — QuipeAI</h2>
    <p style="color:#6B7A94;font-size:13px;margin:0 0 16px">Recebido pela landing de qualificação.</p>
    <table style="border-collapse:collapse;background:#F5F7FC;border-radius:10px;width:100%">${rows}</table>
    ${xray}
  </div>`;
}

function leadHtml(lead, meta) {
  return `
  <div style="max-width:560px;margin:0 auto;font-family:sans-serif">
    <h2 style="color:#0B1120;font-size:20px;margin:0 0 8px">Obrigado, ${esc(lead.nome || '')}!</h2>
    <p style="color:#33405C;font-size:15px;line-height:1.5;margin:0 0 12px">
      Recebemos as suas respostas do ${meta.flow === 'diag' ? 'diagnóstico' : 'quiz de qualificação'} da QuipeAI.
      Em breve entramos em contato para conversar sobre o próximo passo.
    </p>
    <p style="color:#009E5A;font:700 15px sans-serif;font-style:italic;margin:16px 0">
      Você decide e assina. A máquina levanta o peso.
    </p>
    <p style="color:#6B7A94;font-size:12px;margin-top:24px">QuipeAI · @quipe.ai</p>
  </div>`;
}

// Notifica o time. Best-effort: nunca lança — devolve {ok, skipped?, error?}.
export async function notifyTeamEmail(lead, meta) {
  const t = getTransporter();
  if (!t) return { ok: false, skipped: 'email desabilitado' };
  if (!process.env.TEAM_EMAIL) return { ok: false, skipped: 'TEAM_EMAIL não configurado' };
  try {
    await t.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.TEAM_EMAIL,
      subject: `[QuipeAI] Novo lead ${meta.tier} — ${lead.nome || lead.contato || 'sem nome'}`,
      html: teamHtml(lead, meta),
    });
    return { ok: true };
  } catch (err) {
    console.error('[email] falha ao notificar time:', err.message);
    return { ok: false, error: err.message };
  }
}

// Confirmação para o lead, quando o contato for um e-mail.
export async function confirmLeadEmail(lead, meta) {
  const t = getTransporter();
  if (!t) return { ok: false, skipped: 'email desabilitado' };
  if (String(process.env.EMAIL_CONFIRM_LEAD).toLowerCase() !== 'true') {
    return { ok: false, skipped: 'confirmação desligada' };
  }
  if (lead.contato_tipo !== 'email') return { ok: false, skipped: 'contato não é e-mail' };
  try {
    await t.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: lead.contato,
      subject: 'Recebemos suas respostas — QuipeAI',
      html: leadHtml(lead, meta),
    });
    return { ok: true };
  } catch (err) {
    console.error('[email] falha ao confirmar lead:', err.message);
    return { ok: false, error: err.message };
  }
}
