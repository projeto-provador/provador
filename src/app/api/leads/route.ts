import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead, markLeadNotified } from "@/lib/db";
import { sendLeadEmails } from "@/lib/mailer";
import { sendLeadWhatsApp } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120),
  email: z.string().trim().email("E-mail inválido.").max(200),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{8,20}$/, "WhatsApp inválido. Use DDD + número."),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
  }

  const data = parsed.data;

  let lead;
  try {
    lead = await insertLead({
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      company: data.company || undefined,
      message: data.message || undefined,
    });
  } catch (err) {
    console.error("[leads] Falha ao gravar lead no banco:", err);
    return NextResponse.json(
      { ok: false, error: "Não foi possível salvar seus dados. Tente novamente em instantes." },
      { status: 500 }
    );
  }

  // Notificações: falha aqui não invalida o cadastro (o lead já está no banco).
  const [emailResult, whatsappResult] = await Promise.allSettled([
    sendLeadEmails(lead),
    sendLeadWhatsApp(lead),
  ]);

  const emailSent = emailResult.status === "fulfilled" && emailResult.value;
  const whatsappSent = whatsappResult.status === "fulfilled" && whatsappResult.value;
  if (emailResult.status === "rejected") {
    console.error("[leads] Falha ao enviar e-mail:", emailResult.reason);
  }
  if (whatsappResult.status === "rejected") {
    console.error("[leads] Falha ao enviar WhatsApp:", whatsappResult.reason);
  }

  try {
    await markLeadNotified(lead.id, { emailSent, whatsappSent });
  } catch (err) {
    console.error("[leads] Falha ao atualizar status de notificação:", err);
  }

  return NextResponse.json({ ok: true });
}
