/**
 * Navegação entre etapas, derivada de `stepOrder`, `stepPaths` e
 * `funnelSettings.liveSteps` (src/config/funnel.ts).
 */
import { funnelSettings, stepOrder, stepPaths } from "@/config/funnel";
import type { StepId } from "@/lib/types";

const isLive = (id: StepId) => funnelSettings.liveSteps.includes(id);

export function getStepNav(stepId: StepId) {
  const index = stepOrder.indexOf(stepId);
  const prev: StepId | undefined = stepOrder[index - 1];
  const next: StepId | undefined = stepOrder[index + 1];

  return {
    /** Etapa anterior (só quando ela já existe). */
    prevHref: prev && isLive(prev) ? stepPaths[prev] : null,
    next: next ?? null,
    /** Próxima etapa — `null` enquanto a página dela não estiver publicada. */
    nextHref: next && isLive(next) ? stepPaths[next] : null,
  };
}
