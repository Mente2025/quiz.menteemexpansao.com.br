/**
 * Camada de eventos do funil. Configuração em src/config/analytics.ts.
 * Os eventos não carregam nome, respostas, resultado nem dados pessoais.
 */
import { pageview as vercelPageview, track as vercelTrack } from "@vercel/analytics";
import {
  GA4_MEASUREMENT_ID,
  analyticsAdapters,
  analyticsSettings,
} from "@/config/analytics";

export type FunnelEvent =
  | "quiz_start"
  | "question_answered"
  | "name_submitted"
  | "result_view"
  | "offer_view"
  | "checkout_click";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/**
 * Única propriedade aceita — de propósito, não há campo para nome,
 * respostas ou resultado.
 */
export interface EventProps {
  question_number?: number;
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
const ONCE_PREFIX = "eme-sent-";

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

/**
 * Identificadores de clique repassados ao checkout (ex.: fbclid, do Meta).
 * Ficam separados das UTMs: só vão para o link da Cakto, nunca para os eventos.
 */
export const CLICK_ID_KEYS = ["fbclid"] as const;

export type ClickIds = Partial<Record<(typeof CLICK_ID_KEYS)[number], string>>;

const CLICK_ID_STORAGE = "eme-click-ids";

function readParams<K extends string>(keys: readonly K[], maxLength: number) {
  const params = new URLSearchParams(window.location.search);
  const found: Partial<Record<K, string>> = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, maxLength);
  }
  return found;
}

/**
 * Lê as UTMs e o fbclid da URL de entrada e guarda para a sessão (a última
 * campanha vence). Usados só para atribuição e para o link do checkout.
 */
export function captureUtms() {
  if (typeof window === "undefined") return;
  const utms = readParams(UTM_KEYS, 200);
  if (Object.keys(utms).length > 0) {
    safeSession((s) => s.setItem(UTM_STORAGE, JSON.stringify(utms)), null);
  }
  const clickIds = readParams(CLICK_ID_KEYS, 500);
  if (Object.keys(clickIds).length > 0) {
    safeSession((s) => s.setItem(CLICK_ID_STORAGE, JSON.stringify(clickIds)), null);
  }
}

export function getClickIds(): ClickIds {
  if (typeof window === "undefined") return {};
  return safeSession((s) => {
    const raw = s.getItem(CLICK_ID_STORAGE);
    return raw ? (JSON.parse(raw) as ClickIds) : {};
  }, {});
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

/**
 * Comando do Google Analytics (gtag). Entra na fila do dataLayer mesmo se
 * o script do Google ainda estiver carregando — nenhum evento se perde.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  // O gtag.js só reconhece o objeto `arguments` original, não um array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/** Envia aos destinos ligados em src/config/analytics.ts. */
function deliver({ event, question_number }: AnalyticsPayload) {
  const data = question_number ? { question_number } : undefined;

  // Vercel (plano gratuito): oferta vista e clique viram páginas no relatório.
  const virtualPage = analyticsSettings.vercelVirtualPages[event];
  if (virtualPage) vercelPageview({ route: virtualPage, path: virtualPage });
  // Vercel Pro: painel "Events".
  if (analyticsSettings.vercelCustomEvents) vercelTrack(event, data);
  // Google Analytics 4.
  if (GA4_MEASUREMENT_ID) gtag("event", event, data ?? {});
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

  // Com o GA4 ligado o dataLayer é dele; empurrar o evento ali duplicaria.
  if (
    analyticsSettings.pushToDataLayer &&
    !GA4_MEASUREMENT_ID &&
    Array.isArray(window.dataLayer)
  ) {
    const { utm, ...rest } = payload;
    window.dataLayer.push({ ...rest, ...utm });
  }

  for (const send of [deliver, ...analyticsAdapters]) {
    try {
      send(payload);
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

const sentInMemory = new Set<string>();

/**
 * Evento enviado no máximo uma vez por sessão (aba do navegador): voltar,
 * avançar ou re-renderizar não conta de novo. `key` diferencia, por exemplo,
 * cada pergunta do mesmo evento.
 */
export function trackOnce(
  event: FunnelEvent,
  props: EventProps = {},
  key: string = event,
) {
  if (typeof window === "undefined") return;
  const storageKey = `${ONCE_PREFIX}${key}`;
  const alreadySent = safeSession((s) => {
    if (s.getItem(storageKey)) return true;
    s.setItem(storageKey, "1");
    return false;
  }, null);
  if (alreadySent) return;
  if (alreadySent === null) {
    // Sem sessionStorage (navegação privada restrita): controle em memória.
    if (sentInMemory.has(storageKey)) return;
    sentInMemory.add(storageKey);
  }
  track(event, props);
}
