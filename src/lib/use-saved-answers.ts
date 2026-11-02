import { useMemo, useSyncExternalStore } from "react";
import { loadProgress, subscribeProgress } from "@/lib/storage";
import type { Answers } from "@/lib/types";

const readAnswers = () => JSON.stringify(loadProgress()?.answers ?? {});
const noAnswersOnServer = () => "{}";

/**
 * Respostas salvas das etapas de pergunta, sempre atualizadas:
 * `{ comportamento?, obstaculo?, desejo? }`.
 * Use em componentes de cliente — a etapa 5 usa junto com `getReflection`
 * (src/lib/reflection.ts).
 * No servidor (e no primeiro render) devolve `{}`.
 */
export function useSavedAnswers(): Answers {
  const raw = useSyncExternalStore(
    subscribeProgress,
    readAnswers,
    noAnswersOnServer,
  );
  return useMemo(() => JSON.parse(raw) as Answers, [raw]);
}
