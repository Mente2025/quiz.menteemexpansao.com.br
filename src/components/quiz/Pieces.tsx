import { Fragment } from "react";
import type { Piece } from "@/config/quizData";
import { cx } from "@/lib/cx";

/**
 * Mostra as peças de texto da página final (src/config/quizData.ts) com o
 * formato de cada tipo: parágrafo, pergunta em destaque, frase de destaque,
 * sequência de frases curtas e os três processos.
 */
export function Pieces({
  pieces,
  className,
}: {
  pieces: readonly Piece[];
  className?: string;
}) {
  return (
    <div
      className={cx(
        "space-y-4 text-pretty text-[1.0625rem] leading-relaxed text-graphite",
        className,
      )}
    >
      {pieces.map((piece, index) => (
        <PieceView key={index} piece={piece} />
      ))}
    </div>
  );
}

function PieceView({ piece }: { piece: Piece }) {
  if (typeof piece === "string") {
    return (
      <p>
        <Rich text={piece} />
      </p>
    );
  }
  if ("quote" in piece) {
    return (
      <p className="py-2 text-balance text-center font-display text-[1.375rem] italic leading-snug text-ember">
        {piece.quote}
      </p>
    );
  }
  if ("highlight" in piece) {
    return (
      <p className="text-balance font-display text-[1.25rem] font-medium leading-snug text-ink">
        <Rich text={piece.highlight} />
      </p>
    );
  }
  if ("lines" in piece) {
    return (
      <div className="space-y-1.5 border-l-2 border-ember/30 pl-4">
        {piece.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    );
  }
  return <ProcessNames text={piece.processes} />;
}

/** "Esvaziamento. Consciência. Transformação." em três selos numerados. */
export function ProcessNames({ text }: { text: string }) {
  const names = text
    .split(".")
    .map((name) => name.trim())
    .filter(Boolean);
  return (
    <ol
      aria-label={text}
      className="flex flex-wrap justify-center gap-2 py-1"
    >
      {names.map((name, index) => (
        <li
          key={name}
          className="inline-flex items-center gap-2 rounded-full border border-ember/25 bg-ember-wash py-1.5 pl-1.5 pr-3.5 text-[0.9375rem] font-semibold text-ember"
        >
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center rounded-full bg-ember text-xs text-white"
          >
            {index + 1}
          </span>
          {name}
        </li>
      ))}
    </ol>
  );
}

/** Texto com trechos entre **asteriscos** em negrito. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
