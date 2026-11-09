/**
 * PONTUAÇÃO DO QUIZ
 * -----------------
 * Função pura e isolada: não lê tela, navegador nem armazenamento.
 * Testes: tests/scoring.test.mjs (rode `npm test`).
 *
 * Regra:
 * 1. Cada resposta das perguntas que pontuam (1 a 9) vale 1 ponto para a
 *    letra da opção escolhida (`score` em src/config/quizData.ts).
 *    Opções sem `score` (pergunta 10) não pontuam.
 * 2. Vence a letra com mais pontos:
 *    A → No Meio da Tempestade · B → Presa no Que Ficou · C → Pronta para Não Repetir.
 * 3. Desempate: se a letra da pergunta 1 estiver entre as empatadas, ela
 *    vence. Caso contrário, vale a prioridade A > B > C.
 *
 * Sem imports em tempo de execução, para os testes rodarem direto no Node.
 */

export type Letter = "A" | "B" | "C";

/** Ordem de prioridade do desempate (quando a pergunta 1 não participa). */
export const LETTER_PRIORITY: readonly Letter[] = ["A", "B", "C"];

export interface ScoringOption {
  id: string;
  score?: Letter;
}

export interface ScoringQuestion {
  number: number;
  options: readonly ScoringOption[];
}

/** Respostas: número da pergunta → id da opção escolhida. */
export type AnswerMap = Readonly<Record<number, string | undefined>>;

export type Scores = Record<Letter, number>;

export interface ScoreResult {
  result: Letter;
  scores: Scores;
  /** Letras empatadas com a maior pontuação (1 item quando não há empate). */
  tied: Letter[];
}

/** Perguntas que entram na pontuação (têm pelo menos uma opção com letra). */
export function scoringQuestions(
  questions: readonly ScoringQuestion[],
): ScoringQuestion[] {
  return questions.filter((q) => q.options.some((o) => o.score));
}

/** Letra da opção escolhida, ou `null` se a resposta não pontua. */
export function letterFor(
  question: ScoringQuestion,
  optionId: string | undefined,
): Letter | null {
  if (!optionId) return null;
  return question.options.find((o) => o.id === optionId)?.score ?? null;
}

/** Soma 1 ponto por resposta, para a letra da opção escolhida. */
export function tallyScores(
  questions: readonly ScoringQuestion[],
  answers: AnswerMap,
): Scores {
  const scores: Scores = { A: 0, B: 0, C: 0 };
  for (const question of questions) {
    const letter = letterFor(question, answers[question.number]);
    if (letter) scores[letter] += 1;
  }
  return scores;
}

/** Escolhe o resultado a partir da pontuação e da letra da pergunta 1. */
export function pickResult(
  scores: Scores,
  firstQuestionLetter: Letter | null,
): { result: Letter; tied: Letter[] } {
  const best = Math.max(...LETTER_PRIORITY.map((letter) => scores[letter]));
  const tied = LETTER_PRIORITY.filter((letter) => scores[letter] === best);
  if (tied.length === 1) return { result: tied[0], tied };
  if (firstQuestionLetter && tied.includes(firstQuestionLetter)) {
    return { result: firstQuestionLetter, tied };
  }
  return { result: tied[0], tied };
}

/**
 * Resultado final. Devolve `null` enquanto alguma pergunta que pontua não
 * tiver uma resposta válida.
 */
export function computeResult(
  questions: readonly ScoringQuestion[],
  answers: AnswerMap,
): ScoreResult | null {
  const scoring = scoringQuestions(questions);
  if (scoring.length === 0) return null;
  const complete = scoring.every(
    (q) => letterFor(q, answers[q.number]) !== null,
  );
  if (!complete) return null;

  const scores = tallyScores(scoring, answers);
  const first = scoring.find((q) => q.number === 1) ?? scoring[0];
  const { result, tied } = pickResult(
    scores,
    letterFor(first, answers[first.number]),
  );
  return { result, scores, tied };
}
