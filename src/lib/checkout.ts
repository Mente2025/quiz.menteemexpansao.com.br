import { checkout } from "@/config/quizData";
import { getClickIds, getUtms } from "@/lib/analytics";

/** URL de checkout válida (http/https) ou null se não estiver configurada. */
export function getCheckoutBaseUrl(): string | null {
  const raw = checkout.url.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * URL final do botão de compra: o link da Cakto + as UTMs e o fbclid da visita
 * (quando `forwardTrackingParams` está ligado). Nunca nome, respostas ou resultado.
 */
export function buildCheckoutUrl(): string | null {
  const base = getCheckoutBaseUrl();
  if (!base || !checkout.forwardTrackingParams) return base;

  const url = new URL(base);
  for (const [key, value] of Object.entries({ ...getUtms(), ...getClickIds() })) {
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}
