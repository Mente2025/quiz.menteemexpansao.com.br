"use client";

import { useSyncExternalStore } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { primaryButtonClass, primaryButtonIconClass } from "@/components/ui";
import { META_INITIATE_CHECKOUT_ON_CLICK } from "@/config/analytics";
import { checkout, price } from "@/config/quizData";
import { trackOnce } from "@/lib/analytics";
import { buildCheckoutUrl, getCheckoutBaseUrl } from "@/lib/checkout";
import { metaProduct, metaTrackOnce } from "@/lib/meta-pixel";

/** Lido uma vez: `CHECKOUT_URL` (src/config/quizData.ts) já validado. */
const baseUrl = getCheckoutBaseUrl();

if (!baseUrl) {
  throw new Error(
    "CHECKOUT_URL precisa ser um link https válido (src/config/quizData.ts).",
  );
}

const noSubscription = () => () => {};

/**
 * Botão de compra: um link normal para a Cakto, já com as UTMs da visita.
 * Não dispara Purchase — a venda só é confirmada na Cakto.
 */
export function CheckoutButton({ label }: { label: string }) {
  // No servidor, o link puro; no navegador, o link com as UTMs da visita.
  const href = useSyncExternalStore(
    noSubscription,
    () => buildCheckoutUrl() ?? baseUrl!,
    () => baseUrl!,
  );

  function handleClick() {
    trackOnce("checkout_click");
    // Hoje a Meta descarta este evento (restrição do Pixel): veja
    // src/config/analytics.ts. Fica aqui para quando a restrição cair.
    if (META_INITIATE_CHECKOUT_ON_CLICK) {
      metaTrackOnce("InitiateCheckout", {
        ...metaProduct,
        value: price.amount,
        currency: price.currency,
      });
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      target={checkout.openInNewTab ? "_blank" : undefined}
      rel="noopener"
      className={primaryButtonClass}
    >
      <span>{label}</span>
      <ArrowRightIcon className={primaryButtonIconClass} />
    </a>
  );
}
