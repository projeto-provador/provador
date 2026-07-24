"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { NEWSLETTER } from "@/content/newsletter";
import { subscribeNewsletter } from "./newsletter-actions";

/** Captura de audiência (Fosso: ativo de audiência para os 95% out-of-market). */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "erro">("idle");
  const [erro, setErro] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEstado("enviando");
    setErro(null);
    const result = await subscribeNewsletter({ email, website });
    if (result.ok) {
      setEstado("ok");
      setEmail("");
    } else {
      setEstado("erro");
      setErro(result.error);
    }
  }

  return (
    <div className="border-b border-border">
      <div className="container-site flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-lg font-bold">{NEWSLETTER.titulo}</p>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">{NEWSLETTER.texto}</p>
        </div>

        {estado === "ok" ? (
          <p role="status" className="text-sm font-semibold text-accent-ink">
            {NEWSLETTER.sucesso}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <label htmlFor="nl-email" className="sr-only">
              Seu email
            </label>
            <input
              id="nl-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-subtle"
            />
            {/* Honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="absolute -left-[9999px]"
            />
            <Button type="submit">{estado === "enviando" ? "Enviando…" : NEWSLETTER.botao}</Button>
          </form>
        )}
      </div>
      {estado === "erro" && erro ? (
        <div className="container-site pb-6">
          <p role="alert" className="text-sm text-text-muted">
            {erro}
          </p>
        </div>
      ) : null}
    </div>
  );
}
