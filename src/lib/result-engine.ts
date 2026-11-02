/**
 * MOTOR DA DEVOLUTIVA
 * -------------------
 * Regras determinísticas e transparentes — sem sorteio, sem IA, sem diagnóstico.
 *
 * Como funciona:
 * 1. Cada resposta aponta para uma das quatro áreas (tabelas abaixo).
 * 2. Pesos: comportamento (etapa 2) = 3, obstáculo (etapa 3) = 2, desejo (etapa 4) = 1.
 *    Assim, o resultado depende principalmente das etapas 2 e 3.
 * 3. Vence a área com mais pontos. Em empate, vale a área indicada pelo desejo
 *    (o desejo "ajusta" a recomendação); se o desejo não estiver no empate,
 *    vale a área do comportamento.
 * 4. Se comportamento e obstáculo apontam para áreas diferentes, a devolutiva
 *    é marcada como "mista": o texto fica menos categórico e cita a segunda área.
 */
import {
  behaviorPhrases,
  desirePhrases,
  mixedResultNote,
  obstaclePhrases,
  resultProfiles,
  summaryTemplates,
  type ResultProfile,
} from "@/config/results";
import type {
  Answers,
  BehaviorId,
  DesireId,
  ObstacleId,
  ResultKey,
} from "@/lib/types";

export const WEIGHTS = { comportamento: 3, obstaculo: 2, desejo: 1 } as const;

export const behaviorToArea: Record<BehaviorId, ResultKey> = {
  "me-esforco": "medo-afastamento",
  silencio: "limites-sem-culpa",
  validacao: "autonomia-validacao",
  afasto: "protecao-afastamento",
};

export const obstacleToArea: Record<ObstacleId, ResultKey> = {
  decepcionar: "limites-sem-culpa",
  afastar: "medo-afastamento",
  culpa: "limites-sem-culpa",
  duvida: "autonomia-validacao",
};

export const desireToArea: Record<DesireId, ResultKey> = {
  seguranca: "protecao-afastamento",
  limites: "limites-sem-culpa",
  autonomia: "autonomia-validacao",
  reciprocidade: "medo-afastamento",
};

export interface CompleteAnswers {
  comportamento: BehaviorId;
  obstaculo: ObstacleId;
  desejo: DesireId;
}

export interface ResultOutput {
  key: ResultKey;
  profile: ResultProfile;
  /** true quando comportamento e obstáculo apontam para áreas diferentes. */
  isMixed: boolean;
  /** Segunda área (apenas quando isMixed). */
  secondary?: { key: ResultKey; profile: ResultProfile };
  /** Frase personalizada com o comportamento e o desejo da pessoa. */
  personalizedSentence: string;
  /** Resumo em linguagem natural, só com as opções marcadas. */
  summary: string[];
  /** Primeiro passo sugerido de acordo com o desejo. */
  firstStep: string;
  mixedNote?: string;
  scores: Record<ResultKey, number>;
}

export function hasAllAnswers(answers: Answers): answers is CompleteAnswers {
  return Boolean(answers.comportamento && answers.obstaculo && answers.desejo);
}

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);

/** Resumo em linguagem natural usando apenas as respostas realmente marcadas. */
export function buildSummary(answers: Answers): string[] {
  const lines: string[] = [];
  if (answers.comportamento) {
    lines.push(
      fill(summaryTemplates.comportamento, {
        texto: behaviorPhrases[answers.comportamento].summary,
      }),
    );
  }
  if (answers.obstaculo) {
    lines.push(
      fill(summaryTemplates.obstaculo, {
        texto: obstaclePhrases[answers.obstaculo],
      }),
    );
  }
  if (answers.desejo) {
    lines.push(
      fill(summaryTemplates.desejo, {
        texto: desirePhrases[answers.desejo].summary,
      }),
    );
  }
  return lines;
}

export function computeResult(answers: CompleteAnswers): ResultOutput {
  const behaviorArea = behaviorToArea[answers.comportamento];
  const obstacleArea = obstacleToArea[answers.obstaculo];
  const desireArea = desireToArea[answers.desejo];

  const scores: Record<ResultKey, number> = {
    "limites-sem-culpa": 0,
    "autonomia-validacao": 0,
    "medo-afastamento": 0,
    "protecao-afastamento": 0,
  };
  scores[behaviorArea] += WEIGHTS.comportamento;
  scores[obstacleArea] += WEIGHTS.obstaculo;
  scores[desireArea] += WEIGHTS.desejo;

  const best = Math.max(...Object.values(scores));
  const tied = (Object.keys(scores) as ResultKey[]).filter(
    (key) => scores[key] === best,
  );
  const key = tied.includes(desireArea)
    ? desireArea
    : tied.includes(behaviorArea)
      ? behaviorArea
      : tied[0];

  const isMixed = behaviorArea !== obstacleArea;
  const secondaryKey = isMixed
    ? key === behaviorArea
      ? obstacleArea
      : behaviorArea
    : undefined;

  const profile = resultProfiles[key];
  const personalizedSentence = fill(profile.personalizedTemplate, {
    desejo: desirePhrases[answers.desejo].summary,
    comportamento: behaviorPhrases[answers.comportamento].noun,
  });

  return {
    key,
    profile,
    isMixed,
    secondary: secondaryKey
      ? { key: secondaryKey, profile: resultProfiles[secondaryKey] }
      : undefined,
    personalizedSentence,
    summary: buildSummary(answers),
    firstStep: desirePhrases[answers.desejo].firstStep,
    mixedNote: isMixed ? mixedResultNote : undefined,
    scores,
  };
}
