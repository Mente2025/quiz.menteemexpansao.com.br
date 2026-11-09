"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { eyebrowClass } from "@/components/ui";
import { questionScreen } from "@/config/quizData";
import { cameFrom } from "@/lib/quiz-store";

/**
 * Topo das perguntas e da tela de nome: botão de voltar, contador
 * ("PERGUNTA X DE 10") e barra de progresso fina.
 */
export function QuizHeader({
  backHref,
  label,
  progress,
}: {
  /** Tela anterior. */
  backHref: string;
  /** Texto do contador. Vazio = sem contador. */
  label?: string;
  /** De 0 a 1. */
  progress: number;
}) {
  const router = useRouter();
  const percent = Math.round(Math.min(Math.max(progress, 0), 1) * 100);

  function goBack() {
    // Volta no histórico quando a tela anterior é a mesma (o botão "voltar"
    // do celular continua coerente); senão, abre a tela anterior.
    if (cameFrom(backHref)) router.back();
    else router.push(backHref);
  }

  return (
    <header>
      <div className="flex min-h-11 items-center gap-2">
        <button
          type="button"
          onClick={goBack}
          aria-label={questionScreen.back}
          className="-ml-2.5 grid size-11 shrink-0 place-items-center rounded-full text-graphite transition-colors duration-200 hover:bg-ember-wash hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        >
          <ArrowLeftIcon className="size-5" />
        </button>
        {label && <p className={`${eyebrowClass} tabular-nums`}>{label}</p>}
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={label || `${percent}%`}
        className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-ember transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  );
}
