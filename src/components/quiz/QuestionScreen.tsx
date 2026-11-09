"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { CheckIcon } from "@/components/icons";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuizShell } from "@/components/quiz/QuizShell";
import {
  TOTAL_QUESTIONS,
  paths,
  questionScreen,
  questions,
} from "@/config/quizData";
import { trackOnce } from "@/lib/analytics";
import { cx } from "@/lib/cx";
import { firstUnanswered, setAnswer, useQuizState } from "@/lib/quiz-store";

/** Tempo para a escolha aparecer marcada antes de avançar sozinho. */
const ADVANCE_DELAY_MS = 220;

/**
 * Uma pergunta por tela. Ao tocar numa opção, a resposta é salva e o quiz
 * avança sozinho. Voltar mostra a resposta já marcada; tocar nela de novo
 * (ou em outra) avança outra vez.
 */
export function QuestionScreen({ number }: { number: number }) {
  const router = useRouter();
  const question = questions[number - 1];
  const quiz = useQuizState();
  const selected = quiz.answers[number];
  const locked = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  const nextHref =
    number < TOTAL_QUESTIONS ? paths.question(number + 1) : paths.name;
  const backHref = number > 1 ? paths.question(number - 1) : paths.start;
  const titleId = `pergunta-${number}-titulo`;

  useEffect(() => {
    router.prefetch(nextHref);
  }, [router, nextHref]);

  // Ao sair da tela (ou ela ficar oculta), libera o toque e cancela o avanço.
  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      locked.current = false;
    },
    [],
  );

  // Sem as respostas anteriores (link direto, outra aba): volta para a
  // primeira pergunta sem resposta.
  useEffect(() => {
    if (!quiz.ready) return;
    const missing = firstUnanswered(quiz.answers);
    if (missing !== null && missing < number) {
      router.replace(paths.question(missing));
    }
  }, [quiz.ready, quiz.answers, number, router]);

  function choose(optionId: string) {
    if (locked.current) return;
    locked.current = true;
    setAnswer(number, optionId);
    trackOnce("question_answered", { question_number: number }, `pergunta-${number}`);
    timer.current = window.setTimeout(() => {
      router.push(nextHref);
    }, ADVANCE_DELAY_MS);
  }

  return (
    <QuizShell>
      <QuizHeader
        backHref={backHref}
        label={questionScreen.counter(number, TOTAL_QUESTIONS)}
        progress={number / TOTAL_QUESTIONS}
      />

      <h1
        id={titleId}
        className="mt-6 text-balance font-display text-[length:clamp(1.5rem,6.4vw,1.875rem)] sm:mt-7 font-medium leading-[1.2] tracking-[-0.015em] text-ink"
      >
        {question.text}
      </h1>

      <div
        role="group"
        aria-labelledby={titleId}
        className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:gap-3"
      >
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => choose(option.id)}
              className={cx(
                "flex min-h-14 w-full items-center gap-3 rounded-2xl border bg-paper px-4 py-3.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2",
                isSelected
                  ? "border-ember bg-ember-wash"
                  : "border-line hover:border-line-strong active:border-line-strong",
              )}
            >
              {/* Só visual: leitores de tela leem apenas o texto da opção. */}
              <span
                aria-hidden="true"
                className="w-6 shrink-0 text-center font-emoji text-[1.125rem] leading-none"
              >
                {option.emoji}
              </span>
              <span className="flex-1 text-pretty text-base leading-snug text-ink">
                {option.label}
              </span>
              <span
                aria-hidden="true"
                className={cx(
                  "grid size-5 shrink-0 place-items-center rounded-full border transition-colors duration-150",
                  isSelected ? "border-ember bg-ember" : "border-line-strong",
                )}
              >
                {isSelected && (
                  <CheckIcon strokeWidth={2.6} className="size-3 text-white" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </QuizShell>
  );
}
