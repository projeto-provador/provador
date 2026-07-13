/**
 * Eventos de conversão rastreáveis (um nome por objetivo — CLAUDE.md §7).
 * O vendor (Plausible vs GA4) é pendência do owner (TASKS.md 0.12);
 * os CTAs já emitem `data-event`, capturado por AnalyticsListener.
 */
export type AnalyticsEvent =
  | "cta_piloto"
  | "cta_metodo"
  | "cta_cliente"
  | "cta_investidor"
  | "cta_ecossistema"
  | "lead_submit_cliente"
  | "lead_submit_investidor"
  | "lead_submit_ecossistema";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (command: "event", event: string, params?: Record<string, string>) => void;
  }
}

/** Despacha para o vendor disponível; no-op se nenhum estiver instalado. */
export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.plausible?.(event);
  window.gtag?.("event", event);
}
