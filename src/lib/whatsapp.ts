import type { Lead } from "./db";

/**
 * Envio de WhatsApp pela Cloud API oficial da Meta.
 *
 * Como o projeto só precisa ENVIAR mensagens, a Cloud API é a opção mais
 * simples e estável: uma chamada HTTP, sem manter um navegador/sessão aberta
 * (como o openwa/wa-automate exigiria) e sem risco de bloqueio do número.
 *
 * Configuração (.env): WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_NOTIFY_TO.
 * Se quiser trocar por openwa/Evolution API no futuro, basta reimplementar
 * a função sendWhatsAppText mantendo a mesma assinatura.
 */

function isConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_NOTIFY_TO
  );
}

async function sendWhatsAppText(to: string, body: string): Promise<void> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const res = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body },
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`WhatsApp Cloud API respondeu ${res.status}: ${detail}`);
  }
}

/** Notifica a equipe sobre um novo lead. Retorna true se enviado. */
export async function sendLeadWhatsApp(lead: Lead): Promise<boolean> {
  if (!isConfigured()) {
    console.warn("[whatsapp] Cloud API não configurada — WhatsApp não enviado.");
    return false;
  }

  const body = [
    `🛍️ *Novo lead — Provador Virtual*`,
    ``,
    `*Nome:* ${lead.name}`,
    `*E-mail:* ${lead.email}`,
    `*WhatsApp:* ${lead.whatsapp}`,
    `*Empresa/Loja:* ${lead.company ?? "-"}`,
    `*Mensagem:* ${lead.message ?? "-"}`,
  ].join("\n");

  await sendWhatsAppText(process.env.WHATSAPP_NOTIFY_TO!, body);
  return true;
}
