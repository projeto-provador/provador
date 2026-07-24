"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { OFERTA_CLIENTE, SEGMENTOS } from "@/content/contato";
import { track } from "@/lib/analytics";
import { leadSchema, type LeadInput } from "@/lib/lead";
import { submitLead } from "./actions";

const inputCls =
  "w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-subtle";

function fieldError(id: string, message?: string) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-text-muted" role="alert">
      {message}
    </p>
  );
}

export function LeadForm() {
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    // TODO(spec): default do segmento sem ?p= — assumido "cliente" até o owner confirmar
    defaultValues: { segmento: "cliente", website: "" },
  });

  // ?p= pré-seleciona o segmento sem tirar o form do SSR (evita CLS do
  // bailout de useSearchParams em rota estática).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("p");
    if (p === "investidor" || p === "ecossistema") setValue("segmento", p);
  }, [setValue]);

  const segmento = watch("segmento");

  async function onSubmit(data: LeadInput) {
    setErroEnvio(null);
    const result = await submitLead(data);
    if (result.ok) {
      track(`lead_submit_${data.segmento}`);
      setEnviado(true);
    } else {
      setErroEnvio(result.error);
    }
  }

  if (enviado) {
    return (
      <div role="status" className="rounded-md border border-border bg-surface p-8 shadow-card">
        <p className="font-display text-lg font-bold">Recebido.</p>
        <p className="mt-2 text-sm text-text-muted">Vamos responder pelo email que você deixou.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {segmento === "cliente" ? (
        <p className="rounded-md bg-surface-alt p-4 text-sm leading-relaxed text-text-muted">
          {OFERTA_CLIENTE}
        </p>
      ) : null}

      <div>
        <label htmlFor="nome" className="mb-1.5 block text-sm font-medium">
          Nome
        </label>
        <input
          id="nome"
          autoComplete="name"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? "erro-nome" : undefined}
          className={inputCls}
          {...register("nome")}
        />
        {fieldError("erro-nome", errors.nome?.message)}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "erro-email" : undefined}
          className={inputCls}
          {...register("email")}
        />
        {fieldError("erro-email", errors.email?.message)}
      </div>

      <div>
        <label htmlFor="empresa" className="mb-1.5 block text-sm font-medium">
          Empresa <span className="font-normal text-text-muted">(opcional)</span>
        </label>
        <input
          id="empresa"
          autoComplete="organization"
          className={inputCls}
          {...register("empresa")}
        />
      </div>

      <div>
        <label htmlFor="segmento" className="mb-1.5 block text-sm font-medium">
          Você é
        </label>
        <select id="segmento" className={inputCls} {...register("segmento")}>
          {SEGMENTOS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium">
          O caso real
        </label>
        <textarea
          id="mensagem"
          rows={5}
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? "erro-mensagem" : undefined}
          className={inputCls}
          {...register("mensagem")}
        />
        {fieldError("erro-mensagem", errors.mensagem?.message)}
      </div>

      {/* SRA — a pergunta que enxerga o dark funnel (Fosso, Pilar C). Opcional. */}
      <div>
        <label htmlFor="comoChegou" className="mb-1.5 block text-sm font-medium">
          Como você chegou até aqui? <span className="font-normal text-text-muted">(opcional)</span>
        </label>
        <input
          id="comoChegou"
          autoComplete="off"
          placeholder="Instagram, indicação, uma IA citou a QuipeAI, evento…"
          className={inputCls}
          {...register("comoChegou")}
        />
      </div>

      {/* Honeypot — invisível para humanos, irresistível para bots */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {erroEnvio ? (
        <p role="alert" className="text-sm text-text-muted">
          {erroEnvio}
        </p>
      ) : null}

      <div>
        <Button type="submit">{isSubmitting ? "Enviando…" : "Começar o piloto"}</Button>
      </div>
    </form>
  );
}
