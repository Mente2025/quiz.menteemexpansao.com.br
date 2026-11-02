import { ContinueButton } from "@/components/ContinueButton";
import { HighlightedHeadline } from "@/components/HighlightedHeadline";
import { StepImage } from "@/components/StepImage";
import { StepShell } from "@/components/StepShell";
import { LockIcon, PlaceholderGlyph } from "@/components/icons";
import { journeyStep } from "@/config/funnel";

/** Nomes que não devem quebrar no meio da linha. */
const NAMES = ["Eu Me Escolho", "Entre Pessoas Que Se Escolhem"];

/** Mantém os nomes do produto e da comunidade inteiros na mesma linha. */
function keepNames(text: string) {
  return NAMES.reduce(
    (result, name) => result.replaceAll(name, name.replaceAll(" ", " ")),
    text,
  );
}

/**
 * ETAPA 7 — A jornada e a comunidade.
 *
 * Textos: `journeyStep` em src/config/funnel.ts
 * Imagem: `journeyShowcase` em src/config/images.ts
 */
export function JourneyStep() {
  const {
    id,
    image,
    headline,
    headlineHighlight,
    story,
    pivot,
    presentation,
    pace,
    transition,
    community,
    closing,
    cta,
    microcopy,
  } = journeyStep;

  return (
    <StepShell stepId={id}>
      <h1 className="mt-8 animate-rise text-balance text-center font-display text-[length:clamp(1.625rem,6.9vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ivory [animation-delay:80ms]">
        <HighlightedHeadline text={headline} highlight={headlineHighlight} />
      </h1>

      {image && <StepImage slot={image} delay={180} />}

      {/* Texto de apresentação */}
      <div className="mx-auto mt-10 max-w-[34ch] animate-rise text-center text-pretty [animation-delay:280ms]">
        <div className="space-y-4">
          {story.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-ivory/72"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-7 text-balance font-display text-[length:clamp(1.3rem,5.6vw,1.55rem)] italic leading-[1.3] text-ivory">
          {pivot}
        </p>

        <span
          aria-hidden="true"
          className="mx-auto mt-7 block h-0.5 w-8 rounded-full bg-ember"
        />

        <div className="mt-7 space-y-4">
          {presentation.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-[1.0625rem] font-medium leading-relaxed text-ivory"
                  : "text-base leading-relaxed text-ivory/80"
              }
            >
              {keepNames(paragraph)}
            </p>
          ))}
        </div>

        <div className="mt-6 space-y-1">
          {pace.map((line) => (
            <p key={line} className="text-base leading-relaxed text-ivory/60">
              {line}
            </p>
          ))}
        </div>

        <p className="mt-10 text-balance text-[0.975rem] italic leading-relaxed text-ivory/75">
          {transition}
        </p>
      </div>

      {/* Card da comunidade */}
      <section
        aria-labelledby={`${id}-comunidade`}
        className="relative isolate mt-7 animate-rise overflow-hidden rounded-[1.75rem] bg-linear-to-b from-ivory/[0.08] to-ivory/[0.03] px-6 pb-8 pt-9 text-center ring-1 ring-inset ring-ivory/12 shadow-[0_30px_70px_-40px_rgb(0_0_0/0.9)] [animation-delay:380ms]"
      >
        {/* Brilho quente no alto do card */}
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -z-10 size-56 -translate-x-1/2 rounded-full bg-ember/25 blur-3xl"
        />

        <span
          aria-hidden="true"
          className="mx-auto grid size-12 place-items-center rounded-full bg-ember/15 text-ivory ring-1 ring-inset ring-ember/45"
        >
          <PlaceholderGlyph icon="circle" className="size-6" />
        </span>

        <h2
          id={`${id}-comunidade`}
          className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ivory/70"
        >
          {community.title}
        </h2>

        <p className="mx-auto mt-4 max-w-[26ch] text-balance font-display text-[length:clamp(1.3rem,5.6vw,1.55rem)] font-medium leading-[1.25] text-ivory">
          {community.headline}
        </p>

        <div className="mx-auto mt-6 max-w-[32ch] space-y-3 text-pretty">
          {community.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-ivory/80"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-6 flex items-start gap-3 rounded-2xl bg-night/50 px-4 py-3.5 text-left text-[0.9375rem] leading-relaxed text-ivory/85 ring-1 ring-inset ring-ivory/10">
          <LockIcon
            className="mt-0.5 size-[1.125rem] shrink-0 text-ember"
            strokeWidth={1.8}
          />
          <span>{keepNames(community.unlock)}</span>
        </p>

        <p className="mx-auto mt-6 max-w-[32ch] text-base leading-relaxed text-pretty text-ivory/80">
          {community.ending}
        </p>
      </section>

      {/* Fechamento */}
      <p className="mx-auto mt-10 max-w-[30ch] animate-rise text-balance text-center font-display text-[length:clamp(1.25rem,5.4vw,1.5rem)] italic leading-[1.35] text-ivory/90 [animation-delay:460ms]">
        {closing}
      </p>

      <div className="mt-10 animate-rise [animation-delay:540ms]">
        <ContinueButton stepId={id} cta={cta} />
        <p className="mt-4 text-center text-[0.8125rem] leading-relaxed text-ivory/50">
          {microcopy}
        </p>
      </div>
    </StepShell>
  );
}
