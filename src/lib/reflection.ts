import {
  fallbackReflection,
  reflections,
  type Reflection,
} from "@/config/results";
import type { BehaviorId } from "@/lib/types";

/**
 * Escolhe a reflexão da etapa 5 pela resposta da etapa 2.
 * Sem resposta válida (acesso direto, dado antigo ou corrompido), usa a
 * versão padrão `fallbackReflection` — nunca gera erro.
 */
export function getReflection(comportamento: unknown): Reflection {
  const isKnown =
    typeof comportamento === "string" &&
    Object.prototype.hasOwnProperty.call(reflections, comportamento);
  return reflections[isKnown ? (comportamento as BehaviorId) : fallbackReflection];
}
