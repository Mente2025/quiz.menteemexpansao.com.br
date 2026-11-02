/**
 * Texto do título com um trecho em itálico e sublinhado à mão em vermelho.
 * Use dentro do <h1> da etapa. Se `highlight` não estiver no texto, mostra
 * o título normal.
 */
export function HighlightedHeadline({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  const start = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || start === -1) return text;

  const before = text.slice(0, start);
  const after = text.slice(start + highlight.length);
  // Mantém a pontuação colada ao destaque (evita um "?" sozinho na linha).
  const glue = after.match(/^\S*/)?.[0] ?? "";

  return (
    <>
      {before}
      <span className="whitespace-nowrap">
        <span className="relative inline-block font-normal italic">
          {highlight}
          <svg
            aria-hidden="true"
            viewBox="0 0 200 16"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            className="pointer-events-none absolute -bottom-[0.2em] left-[-3%] h-[0.38em] w-[106%] animate-draw text-ember [animation-delay:900ms]"
          >
            <path
              strokeWidth="2.4"
              d="M3 10.5C38 6.2 86 4.6 132 5.6c24.6.5 46 1.8 63 3.6"
            />
            <path
              strokeWidth="1.4"
              opacity="0.65"
              d="M16 13.6c44-3.3 98-4 170-1.4"
            />
          </svg>
        </span>
        {glue}
      </span>
      {after.slice(glue.length)}
    </>
  );
}
