import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { QuizShell } from "@/components/quiz/QuizShell";
import { primaryButtonClass, primaryButtonIconClass } from "@/components/ui";
import { notFoundScreen, paths } from "@/config/quizData";

/** Página 404 no mesmo visual branco do quiz. */
export default function NotFound() {
  return (
    <QuizShell>
      <div className="flex flex-1 flex-col justify-center py-10 text-center">
        <h1 className="text-balance font-display text-[length:clamp(1.5rem,6.4vw,1.875rem)] font-medium leading-[1.2] text-ink">
          {notFoundScreen.title}
        </h1>
        <Link href={paths.start} className={`${primaryButtonClass} mt-8`}>
          <span>{notFoundScreen.button}</span>
          <ArrowRightIcon className={primaryButtonIconClass} />
        </Link>
      </div>
    </QuizShell>
  );
}
