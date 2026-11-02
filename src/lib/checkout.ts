import { offer } from "@/config/offer";
import { getUtms } from "@/lib/analytics";

/** URL de checkout válida (http/https) ou null se ainda não configurada. */
export function getCheckoutBaseUrl(): string | null {
  const raw = offer.checkout.url.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export const isCheckoutConfigured = getCheckoutBaseUrl() !== null;

/** Monta a URL final, repassando as UTMs da visita quando configurado. */
export function buildCheckoutUrl(): string | null {
  const base = getCheckoutBaseUrl();
  if (!base) return null;
  if (!offer.checkout.forwardUtms) return base;

  const url = new URL(base);
  for (const [key, value] of Object.entries(getUtms())) {
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}
