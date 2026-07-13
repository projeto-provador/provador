"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setFeedback("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          whatsapp: formData.get("whatsapp"),
          company: formData.get("company"),
          message: formData.get("message"),
        }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data?.ok) {
        setStatus("success");
        setFeedback("Recebemos seu contato! Em breve nossa equipe fala com você. 🎉");
        form.reset();
      } else {
        setStatus("error");
        setFeedback(data?.error ?? "Não foi possível enviar. Tente novamente.");
      }
    } catch {
      setStatus("error");
      setFeedback("Falha de conexão. Verifique sua internet e tente novamente.");
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Nome*</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Seu nome" />
        </div>
        <div className="form-field">
          <label htmlFor="email">E-mail*</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com.br" />
        </div>
        <div className="form-field">
          <label htmlFor="whatsapp">WhatsApp*</label>
          <input id="whatsapp" name="whatsapp" type="tel" required autoComplete="tel" placeholder="(11) 99999-9999" />
        </div>
        <div className="form-field">
          <label htmlFor="company">Empresa / Loja</label>
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Nome da sua loja" />
        </div>
        <div className="form-field full">
          <label htmlFor="message">Mensagem</label>
          <textarea id="message" name="message" placeholder="Conte um pouco sobre sua loja e o que você procura..." />
        </div>
      </div>

      <button type="submit" className="btn btn-primary form-submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Quero uma demonstração"}
      </button>

      {feedback && (
        <p className={`form-feedback ${status === "success" ? "success" : "error"}`} role="status">
          {feedback}
        </p>
      )}

      <p className="form-privacy">
        Seus dados são usados apenas para entrarmos em contato. Nada de spam.
      </p>
    </form>
  );
}
