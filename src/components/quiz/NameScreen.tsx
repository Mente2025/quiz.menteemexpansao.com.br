"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type FormEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuizShell } from "@/components/quiz/QuizShell";
import { primaryButtonClass, primaryButtonIconClass } from "@/components/ui";
import { TOTAL_QUESTIONS, nameScreen, paths } from "@/config/quizData";
import { trackOnce } from "@/lib/analytics";
import { metaTrackCustomOnce } from "@/lib/meta-pixel";
import {
  firstUnanswered,
  formatName,
  setName,
  useQuizState,
} from "@/lib/quiz-store";

/**
 * Tela do primeiro nome. O nome fica só neste navegador e serve apenas para
 * personalizar o resultado — nunca vai para análise, URL ou checkout.
 */
export function NameScreen() {
  const router = useRouter();
  const quiz = useQuizState();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    router.prefetch(paths.result);
  }, [router]);

  // Sem todas as respostas: volta para a primeira pergunta sem resposta.
  useEffect(() => {
    if (!quiz.ready) return;
    const missing = firstUnanswered(quiz.answers);
    if (missing !== null) router.replace(paths.question(missing));
  }, [quiz.ready, quiz.answers, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = inputRef.current;
    if (!input) return;
    const name = formatName(input.value);
    if (!name) {
      input.setCustomValidity(nameScreen.required);
      input.reportValidity();
      return;
    }
    setName(name);
    // Só o fato de ter enviado — o nome em si não sai do navegador.
    trackOnce("name_submitted");
    metaTrackCustomOnce("QuizCompleted");
    router.push(paths.result);
  }

  return (
    <QuizShell>
      <QuizHeader backHref={paths.question(TOTAL_QUESTIONS)} progress={1} />

      <form onSubmit={handleSubmit} noValidate className="mt-7">
        <h1 className="text-balance font-display text-[length:clamp(1.5rem,6.4vw,1.875rem)] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
          {nameScreen.title}
        </h1>

        <label
          htmlFor="primeiro-nome"
          className="mt-7 block text-sm font-semibold text-ink"
        >
          {nameScreen.fieldLabel}
        </label>
        <input
          // Recria o campo quando o nome salvo é lido do navegador.
          key={quiz.ready ? "pronto" : "carregando"}
          ref={inputRef}
          id="primeiro-nome"
          name="primeiro-nome"
          type="text"
          required
          defaultValue={quiz.name}
          maxLength={nameScreen.maxLength}
          autoComplete="given-name"
          autoCapitalize="words"
          enterKeyHint="go"
          spellCheck={false}
          onInput={(event) => event.currentTarget.setCustomValidity("")}
          className="mt-2 block h-14 w-full rounded-2xl border border-line bg-paper px-4 text-[1.0625rem] text-ink outline-none transition-colors duration-150 hover:border-line-strong focus:border-ember focus:ring-2 focus:ring-ember/15"
        />

        <button type="submit" className={`${primaryButtonClass} mt-6`}>
          <span>{nameScreen.button}</span>
          <ArrowRightIcon className={primaryButtonIconClass} />
        </button>
      </form>
    </QuizShell>
  );
}
