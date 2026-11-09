"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { primaryButtonClass, primaryButtonIconClass } from "@/components/ui";
import { paths } from "@/config/quizData";
import { trackOnce } from "@/lib/analytics";
import { metaTrackCustomOnce } from "@/lib/meta-pixel";

/** "Começar o teste": abre a pergunta 1 e registra quiz_start. */
export function StartButton({ label }: { label: string }) {
  function handleClick() {
    trackOnce("quiz_start");
    metaTrackCustomOnce("QuizStarted");
  }

  return (
    <Link
      href={paths.question(1)}
      onClick={handleClick}
      className={primaryButtonClass}
    >
      <span className="text-balance">{label}</span>
      <ArrowRightIcon className={primaryButtonIconClass} />
    </Link>
  );
}
