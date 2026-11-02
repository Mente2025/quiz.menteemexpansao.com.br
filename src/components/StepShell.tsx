import Link from "next/link";
import type { ReactNode } from "react";
import { StepProgress } from "@/components/StepProgress";
import { ArrowLeftIcon } from "@/components/icons";
import { funnelSettings } from "@/config/funnel";
import { getStepNav } from "@/lib/navigation";
import type { StepId } from "@/lib/types";

/**
 * Moldura comum das etapas escuras: fundo, textura, coluna central,
 * botão de voltar (a partir da etapa 2) e progresso no topo.
 * Cada etapa coloca o próprio conteúdo dentro.
 */
export function StepShell({
  stepId,
  children,
}: {
  stepId: StepId;
  children: ReactNode;
}) {
  const { prevHref } = getStepNav(stepId);

  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden bg-atmosphere">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grain opacity-[0.07] mix-blend-soft-light"
      />

      <div className="mx-auto flex w-full max-w-[30rem] flex-1 flex-col px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8 md:justify-center md:py-14">
        <div className="flex animate-rise items-center gap-3">
          {prevHref && (
            <Link
              href={prevHref}
              aria-label={funnelSettings.labels.back}
              className="relative -my-2 -ml-1.5 grid size-9 shrink-0 place-items-center rounded-full text-ivory/60 ring-1 ring-inset ring-ivory/10 transition duration-300 ease-out before:absolute before:-inset-1 hover:bg-ivory/[0.06] hover:text-ivory hover:ring-ivory/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory/70"
            >
              <ArrowLeftIcon className="size-4" />
            </Link>
          )}
          <StepProgress stepId={stepId} className="flex-1" />
        </div>
        {children}
      </div>
    </main>
  );
}
