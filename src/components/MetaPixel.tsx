"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { metaTrack } from "@/lib/meta-pixel";

/**
 * PageView a cada troca de tela (o quiz muda de URL sem recarregar a página).
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
