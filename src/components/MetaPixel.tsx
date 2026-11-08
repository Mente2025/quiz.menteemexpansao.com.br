"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { metaProduct, metaTrack } from "@/lib/meta-pixel";

/**
 * PageView a cada troca de etapa (o quiz muda de URL sem recarregar a página).
 * O PageView da entrada já vem do código oficial no layout, por isso a
 * primeira renderização não envia nada.
 */
export function MetaPixelPageViews() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    metaTrack("PageView");
  }, [pathname]);

  return null;
}

/** ViewContent da oferta: uma vez quando a etapa 8 aparece na tela. */
export function MetaViewContent() {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    metaTrack("ViewContent", metaProduct);
  }, []);

  return null;
}
