/**
 * ANALYTICS — eventos do funil
 * ----------------------------
 * O quiz emite 6 eventos (src/lib/analytics.ts):
 *  - quiz_start         → clique em "Começar o teste";
 *  - question_answered  → cada pergunta respondida, com `question_number` (1 a 10);
 *  - name_submitted     → envio do primeiro nome (o nome NÃO é enviado);
 *  - result_view        → tela de resultado vista;
 *  - offer_view         → bloco da oferta apareceu na tela;
 *  - checkout_click     → clique no botão da Cakto.
 * Cada evento conta no máximo uma vez por sessão (aba do navegador): voltar,
 * trocar uma resposta ou recarregar a página não conta de novo.
 *
 * O único dado enviado junto é o número da pergunta. NUNCA são enviados o
 * nome, as respostas, o resultado (A/B/C) ou outros dados pessoais.
 * Purchase NÃO é disparado no quiz: a venda só é confirmada na Cakto.
 *
 * Para onde vão:
 *  - Vercel Web Analytics (plano gratuito): cada tela já é uma página
 *    (/, /pergunta/1 … /pergunta/10, /nome, /resultado). A oferta vista e o
 *    clique no checkout aparecem como as páginas virtuais de
 *    `vercelVirtualPages` (abaixo), na mesma lista.
 *  - Vercel Pro: com `vercelCustomEvents: true`, os 6 eventos também vão
 *    para o painel "Events" (no plano gratuito a Vercel não mostra eventos).
 *  - Google Analytics 4: preencha `GA4_MEASUREMENT_ID` para ligar.
 *  - Google Tag Manager: se instalado, recebe os eventos em window.dataLayer.
 * O Meta Pixel tem eventos próprios (ver mais abaixo).
 */
import type { AnalyticsPayload, FunnelEvent } from "@/lib/analytics";

export const analyticsSettings = {
  /** Envia para window.dataLayer quando o GTM estiver presente. */
  pushToDataLayer: true,
  /** Guarda os últimos eventos em sessionStorage para conferência. */
  keepLocalLog: true,
  /** Mostra os eventos no console durante `npm run dev`. */
  logInDevelopment: true,
  /**
   * Páginas "virtuais" do Vercel Analytics (plano gratuito). Não existem de
   * verdade: só aparecem no relatório de páginas. Apague a linha para desligar.
   */
  vercelVirtualPages: {
    offer_view: "/oferta-visualizada",
    checkout_click: "/clique-checkout",
  } as Partial<Record<FunnelEvent, string>>,
  /** Só no plano Pro da Vercel: envia os 6 eventos ao painel "Events". */
  vercelCustomEvents: false,
};

/**
 * GOOGLE ANALYTICS 4
 * Cole aqui o ID da propriedade (ex.: "G-ABC123XYZ") para ligar o GA4.
 * Vazio = GA4 desligado (nenhum código do Google é carregado).
 */
export const GA4_MEASUREMENT_ID = "";

/** Integrações extras, se um dia forem necessárias. */
export const analyticsAdapters: Array<(event: AnalyticsPayload) => void> = [];

/**
 * META PIXEL (Meta Ads)
 * Código oficial carregado em src/app/layout.tsx; eventos em src/lib/meta-pixel.ts.
 * Envia só eventos comerciais — nunca o nome, as respostas ou o resultado:
 *  - PageView a cada tela;
 *  - ViewContent quando a oferta aparece;
 *  - InitiateCheckout no clique do botão de compra;
 *  - QuizStarted (início) e QuizCompleted (nome enviado), personalizados.
 *
 * LIMITAÇÃO DA META (conferida em 09/11/2026): a configuração da própria Meta
 * para este Pixel marca InitiateCheckout e Purchase como "restritos" e
 * QuizStarted/QuizCompleted como "não verificados" — o fbevents descarta esses
 * eventos no navegador. Hoje só PageView e ViewContent chegam à Meta (e sem o
 * caminho da página). Isso só muda no Gerenciador de Eventos da Meta; o site
 * não tenta contornar a restrição com eventos de outro nome.
 * Deixe vazio ("") para desligar o Pixel.
 */
export const META_PIXEL_ID = "1629538182203726";

/**
 * InitiateCheckout no clique do botão de compra.
 * A Cakto, quando o Pixel é configurado no produto, também envia
 * InitiateCheckout ao abrir o checkout. Para não contar duas vezes,
 * mude para `false` se ativar o Pixel na Cakto.
 */
export const META_INITIATE_CHECKOUT_ON_CLICK = true;
