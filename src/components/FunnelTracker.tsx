"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { captureUtms } from "@/lib/analytics";
import { recordPath } from "@/lib/quiz-store";

/**
 * Guarda as UTMs da entrada (para repassar ao checkout) e registra cada troca
 * de tela, para o botão de voltar do quiz seguir o histórico do navegador.
 * Os eventos do funil são disparados pelas próprias telas.
 */
export function FunnelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    captureUtms();
  }, []);

  useEffect(() => {
    recordPath(pathname);
  }, [pathname]);

  return null;
}
