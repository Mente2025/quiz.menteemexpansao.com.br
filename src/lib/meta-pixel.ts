/**
 * Meta Pixel — eventos comerciais do funil.
 * O código oficial é carregado no <head> por src/app/layout.tsx; aqui ficam
 * o próprio código e os helpers de evento. Só roda no navegador.
 * Nunca envie o nome, as respostas ou o resultado do quiz por aqui.
 * Limitações atuais da Meta para este Pixel: veja src/config/analytics.ts.
 */
import { META_PIXEL_ID } from "@/config/analytics";
import { product } from "@/config/quizData";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Código oficial do Meta Pixel: inicializa o ID e registra o PageView de entrada. */
export const metaPixelScript = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

/** Identificação do produto — a mesma em ViewContent e InitiateCheckout. */
export const metaProduct = {
  content_name: product.name,
  content_ids: ["eu_me_escolho"],
  content_type: "product",
};

type Params = Record<string, unknown>;

function send(method: "track" | "trackCustom", event: string, params?: Params) {
  if (!META_PIXEL_ID || typeof window === "undefined") return;
  window.fbq?.(method, event, params);
}

/** Evento padrão do Meta (PageView, ViewContent, InitiateCheckout...). */
export function metaTrack(event: string, params?: Params) {
  send("track", event, params);
}

const sentInMemory = new Set<string>();

/** `true` na primeira vez da sessão (aba do navegador); depois, `false`. */
function firstTimeThisSession(event: string) {
  const key = `eme-meta-${event}`;
  try {
    if (window.sessionStorage.getItem(key)) return false;
    window.sessionStorage.setItem(key, "1");
    return true;
  } catch {
    if (sentInMemory.has(key)) return false;
    sentInMemory.add(key);
    return true;
  }
}

/** Evento padrão enviado no máximo uma vez por sessão. */
export function metaTrackOnce(event: string, params?: Params) {
  if (typeof window === "undefined" || !firstTimeThisSession(event)) return;
  send("track", event, params);
}

/** Evento personalizado enviado no máximo uma vez por sessão. */
export function metaTrackCustomOnce(event: string) {
  if (typeof window === "undefined" || !firstTimeThisSession(event)) return;
  send("trackCustom", event);
}
