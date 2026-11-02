/**
 * Camada de eventos do funil. Configuração em src/config/analytics.ts.
 * Os eventos não carregam respostas, devolutivas nem dados pessoais.
 */
import { analyticsAdapters, analyticsSettings } from "@/config/analytics";
import type { StepId } from "@/lib/types";

export type FunnelEvent =
  | "funnel_started"
  | "step_completed"
  | "result_viewed"
  | "offer_viewed"
  | "checkout_clicked";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Únicas propriedades aceitas — de propósito, não há campo para respostas. */
export interface EventProps {
  step_id?: StepId;
  step_number?: number;
  checkout_configured?: boolean;
}

export interface AnalyticsPayload extends EventProps {
  event: FunnelEvent;
  utm: Utm;
  session_id: string;
  timestamp: string;
}

const UTM_STORAGE = "eme-utm";
const SESSION_STORAGE = "eme-session";
const LOG_STORAGE = "eme-events";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function safeSession<T>(fn: (storage: Storage) => T, fallback: T): T {
  try {
    return fn(window.sessionStorage);
  } catch {
    return fallback;
  }
}

/** Lê as UTMs da URL atual e guarda para a sessão (última campanha com UTM vence). */
export function captureUtms() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, 200);
  }
  if (Object.keys(found).length > 0) {
    safeSession((s) => s.setItem(UTM_STORAGE, JSON.stringify(found)), null);
  }
}

export function getUtms(): Utm {
  if (typeof window === "undefined") return {};
  return safeSession((s) => {
    const raw = s.getItem(UTM_STORAGE);
    return raw ? (JSON.parse(raw) as Utm) : {};
  }, {});
}

function getSessionId(): string {
  return safeSession((s) => {
    let id = s.getItem(SESSION_STORAGE);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      s.setItem(SESSION_STORAGE, id);
    }
    return id;
  }, "sem-sessao");
}

export function track(event: FunnelEvent, props: EventProps = {}) {
  if (typeof window === "undefined") return;

  const payload: AnalyticsPayload = {
    event,
    ...props,
    utm: getUtms(),
    session_id: getSessionId(),
    timestamp: new Date().toISOString(),
  };

  if (analyticsSettings.keepLocalLog) {
    safeSession((s) => {
      const log = JSON.parse(s.getItem(LOG_STORAGE) ?? "[]") as unknown[];
      log.push(payload);
      s.setItem(LOG_STORAGE, JSON.stringify(log.slice(-50)));
    }, null);
  }

  window.dispatchEvent(new CustomEvent("eme:analytics", { detail: payload }));

  if (analyticsSettings.pushToDataLayer && Array.isArray(window.dataLayer)) {
    const { utm, ...rest } = payload;
    window.dataLayer.push({ ...rest, ...utm });
  }

  for (const adapter of analyticsAdapters) {
    try {
      adapter(payload);
    } catch {
      // Uma integração com erro não pode travar o funil.
    }
  }

  if (
    analyticsSettings.logInDevelopment &&
    process.env.NODE_ENV === "development"
  ) {
    console.info("[analytics]", event, payload);
  }
}
