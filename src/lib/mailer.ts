import nodemailer from "nodemailer";
import type { Lead } from "./db";

function isConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // falha rápido se o SMTP estiver inacessível/mal configurado,
    // em vez de segurar a requisição do lead por minutos
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

/**
 * Envia a notificação de novo lead para a equipe e, opcionalmente,
 * um e-mail de confirmação para o próprio lead.
 * Retorna true se a notificação para a equipe foi enviada.
 */
export async function sendLeadEmails(lead: Lead): Promise<boolean> {
  if (!isConfigured()) {
    console.warn("[mailer] SMTP não configurado — e-mail não enviado.");
    return false;
  }

  const transport = getTransport();
  const from = process.env.MAIL_FROM ?? process.env.SMTP_USER!;
  const to = process.env.MAIL_TO ?? process.env.SMTP_USER!;

  await transport.sendMail({
    from,
    to,
    subject: `Novo lead: ${lead.name}`,
    text: [
      `Novo lead recebido pela landing page do Provador Virtual:`,
      ``,
      `Nome: ${lead.name}`,
      `E-mail: ${lead.email}`,
      `WhatsApp: ${lead.whatsapp}`,
      `Empresa/Loja: ${lead.company ?? "-"}`,
      `Mensagem: ${lead.message ?? "-"}`,
      ``,
      `Recebido em: ${new Date(lead.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`,
    ].join("\n"),
  });

  if (process.env.MAIL_CONFIRMATION !== "false") {
    try {
      await transport.sendMail({
        from,
        to: lead.email,
        subject: "Recebemos seu contato — Provador Virtual",
        text: [
          `Olá, ${lead.name}!`,
          ``,
          `Recebemos seu pedido de demonstração do Provador Virtual e nossa equipe`,
          `vai entrar em contato em breve pelo e-mail ou WhatsApp informado.`,
          ``,
          `Até já!`,
          `Equipe QuipeAI`,
        ].join("\n"),
      });
    } catch (err) {
      // a confirmação é cortesia — não falha o fluxo
      console.error("[mailer] Falha ao enviar confirmação ao lead:", err);
    }
  }

  return true;
}
