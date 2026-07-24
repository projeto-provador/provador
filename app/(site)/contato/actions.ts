"use server";

import { leadSchema, type LeadResult } from "@/lib/lead";

/**
 * Entrega do lead. Ativa-se por env:
 *   RESEND_API_KEY   → email via Resend (destino default: projeto@quipeai.com.br)
 *   LEAD_WEBHOOK_URL → POST JSON no CRM
 * Basta setar RESEND_API_KEY no Vercel para o lead chegar — o destino já tem default.
 */
const LEAD_TO_EMAIL_DEFAULT = "projeto@quipeai.com.br";

export async function submitLead(input: unknown): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { ok: false, error: first?.message ?? "Confere os campos e tenta de novo" };
  }

  const lead = parsed.data;

  // Honeypot preenchido = bot. Finge sucesso e descarta.
  if (lead.website) return { ok: true };

  const payload = {
    nome: lead.nome,
    email: lead.email,
    empresa: lead.empresa ?? "",
    segmento: lead.segmento,
    mensagem: lead.mensagem,
    comoChegou: lead.comoChegou ?? "(não informado)",
    origem: "quipeai.com.br/contato",
  };

  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? "QuipeAI Site <site@quipeai.com.br>",
          to: process.env.LEAD_TO_EMAIL ?? LEAD_TO_EMAIL_DEFAULT,
          reply_to: lead.email,
          subject: `[Lead ${lead.segmento}] ${lead.nome}`,
          text: Object.entries(payload)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n"),
        }),
      });
      if (!res.ok) throw new Error(`Resend respondeu ${res.status}`);
      return { ok: true };
    }

    if (process.env.LEAD_WEBHOOK_URL) {
      const res = await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook respondeu ${res.status}`);
      return { ok: true };
    }

    // Nenhum destino configurado (ambiente de dev / decisão pendente do owner).
    console.warn("[lead] nenhum destino configurado — lead não entregue:", payload);
    return { ok: true };
  } catch (err) {
    console.error("[lead] falha na entrega:", err);
    return { ok: false, error: "Não conseguimos enviar agora. Tenta de novo em instantes?" };
  }
}
