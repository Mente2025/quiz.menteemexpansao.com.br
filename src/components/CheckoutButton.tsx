"use client";

import type { MouseEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { primaryButtonClass, primaryButtonIconClass } from "@/components/ui";
import { META_INITIATE_CHECKOUT_ON_CLICK } from "@/config/analytics";
import { offer } from "@/config/offer";
import { track } from "@/lib/analytics";
import { buildCheckoutUrl, getCheckoutBaseUrl } from "@/lib/checkout";
import { metaProduct, metaTrack } from "@/lib/meta-pixel";

/** Lido uma vez: `CHECKOUT_URL` (src/config/offer.ts) já validado. */
const checkoutUrl = getCheckoutBaseUrl();

if (!checkoutUrl) {
  throw new Error(
    "CHECKOUT_URL precisa ser um link https válido (src/config/offer.ts).",
  );
}

/**
 * Botão de compra: um link normal para o checkout. Todos os botões de compra
 * usam este componente, e por isso o mesmo `CHECKOUT_URL`.
 */
export function CheckoutButton({ cta }: { cta: string }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Só no clique; a navegação para o checkout segue normalmente.
    if (META_INITIATE_CHECKOUT_ON_CLICK) {
      metaTrack("InitiateCheckout", {
        ...metaProduct,
        value: offer.price.amount,
        currency: offer.price.currency,
      });
    }
    track("checkout_clicked", { step_id: "oferta", checkout_configured: true });
    // Só quando `forwardUtms` estiver ligado: repassa as UTMs da visita.
    const url = buildCheckoutUrl();
    if (url && url !== checkoutUrl) {
      event.preventDefault();
      if (offer.checkout.openInNewTab) window.open(url, "_blank", "noopener");
      else window.location.assign(url);
    }
  }

  return (
    <a
      href={checkoutUrl!}
      onClick={handleClick}
      target={offer.checkout.openInNewTab ? "_blank" : undefined}
      rel="noopener"
      className={primaryButtonClass}
    >
      <span>{cta}</span>
      <ArrowRightIcon className={primaryButtonIconClass} />
    </a>
  );
}
