/**
 * ANALYTICS (camada preparada)
 * ----------------------------
 * O funil emite 5 eventos: funnel_started, step_completed, result_viewed,
 * offer_viewed e checkout_clicked. Cada evento leva apenas: nome da etapa,
 * número da etapa, UTMs da visita, um id de sessão aleatório e o horário.
 *
 * NUNCA são enviadas as respostas do quiz nem a devolutiva — são dados íntimos.
 *
 * Hoje os eventos:
 *  - ficam registrados localmente (sessionStorage "eme-events") para conferência;
 *  - são disparados como evento do navegador "eme:analytics";
 *  - são enviados ao Google Tag Manager se ele estiver instalado (window.dataLayer);
 *  - aparecem no console do navegador durante o desenvolvimento.
 *
 * Para ligar outra ferramenta, adicione uma função em `analyticsAdapters`.
 * Exemplos (descomente depois de instalar o script da ferramenta no site):
 *
 *   // Google Analytics 4 (gtag.js)
 *   (e) => window.gtag?.("event", e.event, { step_id: e.step_id, ...e.utm }),
 *
 *   // Meta Pixel (fbq) — evento customizado
 *   (e) => window.fbq?.("trackCustom", e.event, { step_id: e.step_id }),
 */
import type { AnalyticsPayload } from "@/lib/analytics";

export const analyticsSettings = {
  /** Envia para window.dataLayer quando o GTM estiver presente. */
  pushToDataLayer: true,
  /** Guarda os últimos eventos em sessionStorage para conferência. */
  keepLocalLog: true,
  /** Mostra os eventos no console durante `npm run dev`. */
  logInDevelopment: true,
};

export const analyticsAdapters: Array<(event: AnalyticsPayload) => void> = [
  // Adicione aqui as integrações reais quando estiverem configuradas.
];
