/**
 * Persistência local das respostas (apenas neste navegador).
 * Nada daqui é enviado para servidores ou para ferramentas de analytics.
 *
 * É o estado compartilhado do quiz: cada etapa grava sua resposta em
 * `answers` (comportamento, obstaculo, desejo) sem apagar as outras, e a
 * devolutiva lê tudo daqui. Para ler em um componente, use
 * `useSavedAnswers()` (src/lib/use-saved-answers.ts).
 */
import { funnelSettings } from "@/config/funnel";
import type { Answers, StepId } from "@/lib/types";

export interface SavedProgress {
  stepId: StepId;
  answers: Answers;
  startedTracked: boolean;
  updatedAt: number;
}

const KEY = funnelSettings.storageKey;
const CHANGE_EVENT = "eme:progress";

/**
 * Cópia em memória: mantém as respostas entre as etapas mesmo quando o
 * navegador bloqueia o armazenamento (modo privado, alguns apps).
 */
let memory: SavedProgress | null = null;

export function loadProgress(): SavedProgress | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return memory;
    const parsed = JSON.parse(raw) as Partial<SavedProgress>;
    if (!parsed || typeof parsed !== "object" || !parsed.stepId) return memory;
    return {
      stepId: parsed.stepId,
      answers: parsed.answers ?? {},
      startedTracked: Boolean(parsed.startedTracked),
      updatedAt: parsed.updatedAt ?? Date.now(),
    };
  } catch {
    return memory;
  }
}

export function saveProgress(progress: Omit<SavedProgress, "updatedAt">) {
  memory = { ...progress, updatedAt: Date.now() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(memory));
  } catch {
    // Modo privado ou armazenamento bloqueado: segue com a cópia em memória.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearProgress() {
  memory = null;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignorado
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Avisa quando as respostas mudam (nesta aba ou em outra aba do site). */
export function subscribeProgress(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY || event.key === null) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
