import Link from "next/link";
import { EditableImageSlot } from "@/components/EditableImageSlot";
import { HighlightedHeadline } from "@/components/HighlightedHeadline";
import { DarkPlaceholder } from "@/components/StepImage";
import { StepShell } from "@/components/StepShell";
import { ArrowRightIcon } from "@/components/icons";
import { primaryButtonClass, primaryButtonIconClass } from "@/components/ui";
import { introStep } from "@/config/funnel";
import { getStepNav } from "@/lib/navigation";

/**
 * ETAPA 1 — Abertura do quiz.
 *
 * Textos: src/config/funnel.ts (`introStep`)
 * Imagem: src/config/images.ts (`welcomeHero`) → public/images/quiz-page-1.png
 * Cores: src/app/globals.css
 */
export function IntroStep() {
  const {
    id,
    image,
    headline,
    headlineHighlight,
    support,
    complement,
    cta,
    microcopy,
  } = introStep;
  const { nextHref } = getStepNav(id);

  return (
    <StepShell stepId={id}>
      {image && (
        <figure className="relative isolate mx-auto mt-7 w-[clamp(15rem,38.4svh,26rem)] max-w-full animate-rise [animation-delay:80ms]">
          {/* Brasa vermelha atrás da imagem */}
          <div
            aria-hidden="true"
            className="absolute inset-x-[6%] -bottom-[6%] top-[30%] -z-10 rounded-full bg-ember opacity-30 blur-3xl"
          />
          <EditableImageSlot
            slot={image}
            preload
            sizes="(max-width: 640px) 80vw, 416px"
            className="rounded-[1.75rem] bg-night-soft shadow-[0_40px_80px_-32px_rgb(0_0_0/0.9)]"
            fallback={<DarkPlaceholder />}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-ivory/10"
          />
        </figure>
      )}

      <h1 className="mt-9 animate-rise text-balance text-center font-display text-[length:clamp(1.875rem,7.8vw,2.625rem)] font-medium leading-[1.08] tracking-[-0.022em] text-ivory [animation-delay:160ms]">
        <HighlightedHeadline text={headline} highlight={headlineHighlight} />
      </h1>

      <div className="mx-auto mt-5 max-w-[36ch] animate-rise space-y-3 text-center text-pretty [animation-delay:260ms]">
        <p className="text-[1.0625rem] leading-relaxed text-ivory/88">
          {support}
        </p>
        <p className="text-[0.975rem] leading-relaxed text-ivory/62">
          {complement}
        </p>
      </div>

      <div className="mt-9 animate-rise [animation-delay:360ms]">
        {nextHref && (
          <Link href={nextHref} className={primaryButtonClass}>
            <span>{cta}</span>
            <ArrowRightIcon className={primaryButtonIconClass} />
          </Link>
        )}

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.8125rem] text-ivory/55">
          {microcopy.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-1 shrink-0 rounded-full bg-ember"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </StepShell>
  );
}
