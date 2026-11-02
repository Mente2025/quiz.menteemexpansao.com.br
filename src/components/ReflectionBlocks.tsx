/**
 * Blocos de texto das etapas de reflexão (5 e 6): parágrafos, card em
 * destaque e fechamento. `delay` é o atraso (ms) da animação de entrada.
 */

export function ReflectionParagraphs({
  paragraphs,
  delay,
}: {
  paragraphs: string[];
  delay: number;
}) {
  return (
    <div
      className="mx-auto mt-9 max-w-[34ch] animate-rise space-y-4 text-center text-pretty"
      style={{ animationDelay: `${delay}ms` }}
    >
      {paragraphs.map((paragraph, index) => (
        <p
          key={paragraph}
          className={
            index === 0
              ? "text-[1.0625rem] leading-relaxed text-ivory/90"
              : "text-base leading-relaxed text-ivory/70"
          }
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/** Card avermelhado com um título em serifada itálica e, se houver, um texto. */
export function HighlightCard({
  title,
  text = [],
  delay,
}: {
  title: string;
  text?: string[];
  delay: number;
}) {
  return (
    <div
      className="mt-10 animate-rise rounded-[1.5rem] bg-linear-to-b from-ember/[0.16] to-ember/[0.04] px-6 pb-8 pt-7 text-center shadow-[0_30px_60px_-34px_rgb(179_32_45/0.7)] ring-1 ring-inset ring-ember/40"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        aria-hidden="true"
        className="mx-auto block h-0.5 w-8 rounded-full bg-ember"
      />
      <p className="mt-5 text-balance font-display text-[length:clamp(1.3rem,5.6vw,1.6rem)] italic leading-[1.3] text-ivory">
        {title}
      </p>
      {text.map((paragraph) => (
        <p
          key={paragraph}
          className="mx-auto mt-4 max-w-[32ch] text-base leading-relaxed text-pretty text-ivory/80"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/** Fechamento: primeira linha em destaque, as demais mais suaves. */
export function ClosingLines({
  lines,
  delay,
}: {
  lines: string[];
  delay: number;
}) {
  return (
    <div
      className="mx-auto mt-8 max-w-[32ch] animate-rise space-y-1.5 text-center text-pretty"
      style={{ animationDelay: `${delay}ms` }}
    >
      {lines.map((line, index) => (
        <p
          key={line}
          className={
            index === 0
              ? "text-base font-medium leading-relaxed text-ivory/85"
              : "text-[0.975rem] leading-relaxed text-ivory/60"
          }
        >
          {line}
        </p>
      ))}
    </div>
  );
}
