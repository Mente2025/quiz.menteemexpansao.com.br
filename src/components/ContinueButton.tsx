"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { NextStepNotice } from "@/components/NextStepNotice";
import { ArrowRightIcon } from "@/components/icons";
import { primaryButtonClass, primaryButtonIconClass } from "@/components/ui";
import { funnelSettings } from "@/config/funnel";
import { getStepNav } from "@/lib/navigation";
import { loadProgress, saveProgress } from "@/lib/storage";
import type { StepId } from "@/lib/types";

/**
 * Botão de avançar das etapas sem pergunta. Leva à próxima etapa mantendo
 * todas as respostas salvas; se ela ainda não foi publicada, mostra o aviso
 * de "em breve" no lugar de uma página quebrada.
 */
export function ContinueButton({ stepId, cta }: { stepId: StepId; cta: string }) {
  const router = useRouter();
  const { next, nextHref } = getStepNav(stepId);
  const [showSoon, setShowSoon] = useState(false);

  function handleContinue() {
    if (next && nextHref) {
      const progress = loadProgress();
      saveProgress({
        stepId: next,
        answers: progress?.answers ?? {},
        startedTracked: progress?.startedTracked ?? false,
      });
      router.push(nextHref);
    } else {
      setShowSoon(true);
    }
  }

  return (
    <>
      <button type="button" onClick={handleContinue} className={primaryButtonClass}>
        <span>{cta}</span>
        <ArrowRightIcon className={primaryButtonIconClass} />
      </button>
      <NextStepNotice
        show={showSoon}
        message={funnelSettings.labels.nextStepSoonNoQuestion}
      />
    </>
  );
}
