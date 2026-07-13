"use client";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

// Eventos GA4: quiz_start, quiz_complete, icp_a, icp_b, agenda_click.
// Evento custom do Pixel: Conversa_Qualificada_Iniciada.
export function trackGa4(evento: string, params: EventParams = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", evento, params);
  }
}

export function trackPixelCustom(evento: string, params: EventParams = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", evento, params);
  }
}

// Dispara apenas quando número de projetos recusados >=1 e passa nas 4 perguntas.
export function trackConversaQualificada(params: EventParams = {}) {
  trackPixelCustom("Conversa_Qualificada_Iniciada", params);
  trackGa4("icp_a", params);
}
