"use client";

// Captura UTMs da URL e preserva até o agendamento (Calendly pass-through).
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const UTM_STORAGE_KEY = "quipeai_utm";

function lerUtmSalva(): Record<string, string> {
  try {
    return JSON.parse(window.localStorage.getItem(UTM_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function capturarUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const chave of UTM_KEYS) {
    const valor = params.get(chave);
    if (valor) utm[chave] = valor;
  }
  if (Object.keys(utm).length > 0) {
    try {
      window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
    } catch {
      // storage bloqueado não pode derrubar a página
    }
    return utm;
  }
  return lerUtmSalva();
}

export function calendlyComUtm(baseUrl: string, utm: Record<string, string>): string {
  try {
    const url = new URL(baseUrl);
    for (const [chave, valor] of Object.entries(utm)) {
      url.searchParams.set(chave, valor);
    }
    return url.toString();
  } catch {
    // URL mal configurada não pode quebrar a etapa de resultado
    return "https://calendly.com/quipeai/15min";
  }
}
