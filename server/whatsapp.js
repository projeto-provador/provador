// WhatsApp plugável. Provider escolhido por WHATSAPP_PROVIDER:
//   none   -> não envia; só loga um link wa.me (mais simples).
//   cloud  -> WhatsApp Cloud API oficial da Meta (só HTTP, leve).
//   openwa -> @open-wa/wa-automate (navegador + QR; dependência opcional).
// Todas as funções são best-effort: nunca lançam.

const PROVIDER = (process.env.WHATSAPP_PROVIDER || 'none').toLowerCase();

const TIER_LABEL = {
  A: 'Encaixe forte (ICP-A)',
  B: 'Caminho a construir (ICP-B)',
  FORA: 'Ainda não é o momento',
};

// Só dígitos, formato internacional (ex.: 5511999999999).
export function normalizePhone(input) {
  if (!input) return null;
  const digits = String(input).replace(/\D/g, '');
  if (digits.length < 10) return null;
  // Heurística Brasil: 10-11 dígitos sem DDI -> prefixa 55.
  if (digits.length <= 11) return '55' + digits;
  return digits;
}

function teamMessage(lead, meta) {
  const lines = [
    '🟢 *Novo lead — QuipeAI*',
    `Resultado: ${TIER_LABEL[meta.tier] || meta.tier}`,
    lead.nome ? `Nome: ${lead.nome}` : null,
    lead.contato ? `Contato: ${lead.contato}` : null,
    lead.empresa ? `Empresa: ${lead.empresa}` : null,
    lead.cargo ? `Cargo: ${lead.cargo}` : null,
    `Fluxo: ${meta.flow === 'diag' ? 'Diagnóstico' : 'Sou ICP?'} · score ${meta.score}/8 · gate ${meta.gate}`,
  ].filter(Boolean);
  return lines.join('\n');
}

function leadMessage(lead) {
  return (
    `Olá${lead.nome ? ', ' + lead.nome : ''}! Aqui é a QuipeAI. ` +
    'Recebemos suas respostas e em breve entramos em contato. ' +
    'Você decide e assina — a máquina levanta o peso. 🤝'
  );
}

// ----- provider: cloud (Meta WhatsApp Cloud API) -----
async function sendCloud(toPhone, text) {
  const token = process.env.WA_CLOUD_TOKEN;
  const phoneId = process.env.WA_CLOUD_PHONE_ID;
  if (!token || !phoneId) return { ok: false, skipped: 'WA_CLOUD_TOKEN/PHONE_ID ausentes' };

  // Mensagem de texto livre só funciona dentro da janela de 24h. Para iniciar
  // conversa a Meta exige template aprovado; por isso mandamos template ao lead
  // e texto ao time (que normalmente já iniciou conversa). Aqui usamos texto por
  // simplicidade; troque por template se precisar iniciar do zero.
  const body = {
    messaging_product: 'whatsapp',
    to: toPhone,
    type: 'text',
    text: { body: text },
  };
  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const detail = await res.text();
      return { ok: false, error: `HTTP ${res.status}: ${detail.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// ----- provider: openwa (@open-wa/wa-automate) -----
let openwaClient = null;
let openwaInitPromise = null;

async function getOpenwa() {
  if (openwaClient) return openwaClient;
  if (openwaInitPromise) return openwaInitPromise;
  openwaInitPromise = (async () => {
    let create;
    try {
      ({ create } = await import('@open-wa/wa-automate'));
    } catch {
      console.error('[whatsapp] @open-wa/wa-automate não instalado. Rode: npm i @open-wa/wa-automate');
      return null;
    }
    try {
      openwaClient = await create({
        sessionId: process.env.OPENWA_SESSION_ID || 'quipeai',
        multiDevice: true,
        headless: true,
        qrTimeout: 0,
        authTimeout: 0,
        blockCrashLogs: true,
        disableSpins: true,
        useChrome: true,
      });
      console.log('[whatsapp] open-wa pronto.');
      return openwaClient;
    } catch (err) {
      console.error('[whatsapp] falha ao iniciar open-wa:', err.message);
      return null;
    }
  })();
  return openwaInitPromise;
}

async function sendOpenwa(toPhone, text) {
  const client = await getOpenwa();
  if (!client) return { ok: false, skipped: 'open-wa indisponível' };
  try {
    await client.sendText(`${toPhone}@c.us`, text);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// Dispatcher genérico.
async function send(toPhone, text) {
  if (!toPhone) return { ok: false, skipped: 'telefone inválido' };
  if (PROVIDER === 'cloud') return sendCloud(toPhone, text);
  if (PROVIDER === 'openwa') return sendOpenwa(toPhone, text);
  // none: apenas registra o link clicável (envio manual mais simples).
  const link = `https://wa.me/${toPhone}?text=${encodeURIComponent(text)}`;
  console.log('[whatsapp] provider=none — link para envio manual:', link);
  return { ok: false, skipped: 'provider none', link };
}

// Notifica o time.
export async function notifyTeamWhatsapp(lead, meta) {
  const to = normalizePhone(process.env.TEAM_WHATSAPP);
  if (!to) return { ok: false, skipped: 'TEAM_WHATSAPP não configurado' };
  return send(to, teamMessage(lead, meta));
}

// Confirmação ao lead, quando o contato for telefone.
export async function confirmLeadWhatsapp(lead) {
  if (String(process.env.WHATSAPP_CONFIRM_LEAD).toLowerCase() !== 'true') {
    return { ok: false, skipped: 'confirmação desligada' };
  }
  if (lead.contato_tipo !== 'phone') return { ok: false, skipped: 'contato não é telefone' };
  const to = normalizePhone(lead.contato);
  return send(to, leadMessage(lead));
}
