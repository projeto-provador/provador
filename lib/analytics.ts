"use client";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Eventos GA4: quiz_start, quiz_complete, icp_a, icp_b, agenda_click.
// Evento custom do Pixel: Conversa_Qualificada_Iniciada.
export function trackGa4(evento: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") {
    // Script ainda carregando: cria o stub padrão do gtag, que enfileira
    // arguments no dataLayer. O gtag.js processa a fila ao carregar, então
    // eventos como quiz_start não se perdem em conexões lentas.
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  window.gtag("event", evento, params);
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
