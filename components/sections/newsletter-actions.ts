"use server";

import { newsletterSchema, type NewsletterResult } from "@/lib/newsletter";

/**
 * Inscrição na newsletter. Entrega por Resend (mesmo mecanismo do lead):
 *   RESEND_API_KEY → notifica o owner de cada inscrito.
 * TODO(owner): trocar por audience/ESP dedicado (Resend Audiences, etc.) quando
 * o volume justificar — por ora captura o email (o ativo) e avisa o time.
 */
const LIST_TO_EMAIL_DEFAULT = "projeto@quipeai.com.br";

export async function subscribeNewsletter(input: unknown): Promise<NewsletterResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { ok: false, error: first?.message ?? "Confere o email e tenta de novo" };
  }

  const { email, website } = parsed.data;

  // Honeypot preenchido = bot. Finge sucesso e descarta.
  if (website) return { ok: true };

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
          to: process.env.NEWSLETTER_TO_EMAIL ?? LIST_TO_EMAIL_DEFAULT,
          reply_to: email,
          subject: "[Newsletter] novo inscrito",
          text: `email: ${email}\norigem: quipeai.com.br`,
        }),
      });
      if (!res.ok) throw new Error(`Resend respondeu ${res.status}`);
      return { ok: true };
    }

    console.warn("[newsletter] RESEND_API_KEY ausente — inscrito não registrado:", email);
    return { ok: true };
  } catch (err) {
    console.error("[newsletter] falha:", err);
    return { ok: false, error: "Não conseguimos inscrever agora. Tenta de novo em instantes?" };
  }
}
