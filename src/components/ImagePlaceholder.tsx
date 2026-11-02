import type { CSSProperties } from "react";
import type { PlaceholderIcon, PlaceholderTone } from "@/config/images";
import { PlaceholderGlyph } from "@/components/icons";
import { cx } from "@/lib/cx";

/**
 * Composição em CSS usada enquanto a imagem real não existe.
 * É decorativa (aria-hidden) e se adapta a qualquer tamanho de quadro.
 */
const tones: Record<
  PlaceholderTone,
  { base: string; glowA: string; glowB: string; line: string; icon: string }
> = {
  deep: {
    base: "linear-gradient(160deg, var(--brand-deep) 0%, color-mix(in oklab, var(--brand-deep) 55%, var(--brand-ocean)) 100%)",
    glowA: "color-mix(in oklab, var(--brand-teal) 55%, transparent)",
    glowB: "color-mix(in oklab, var(--brand-mint) 22%, transparent)",
    line: "text-mint/15",
    icon: "text-mint border-mint/25 bg-mint/5",
  },
  ocean: {
    base: "linear-gradient(160deg, var(--brand-ocean) 0%, color-mix(in oklab, var(--brand-ocean) 50%, var(--brand-teal)) 100%)",
    glowA: "color-mix(in oklab, var(--brand-mint) 35%, transparent)",
    glowB: "color-mix(in oklab, var(--brand-deep) 45%, transparent)",
    line: "text-mint/20",
    icon: "text-cream border-cream/30 bg-cream/10",
  },
  teal: {
    base: "linear-gradient(160deg, var(--brand-teal) 0%, var(--brand-ocean) 100%)",
    glowA: "color-mix(in oklab, var(--brand-mint) 45%, transparent)",
    glowB: "color-mix(in oklab, var(--brand-deep) 40%, transparent)",
    line: "text-cream/20",
    icon: "text-cream border-cream/35 bg-cream/10",
  },
  mint: {
    base: "linear-gradient(160deg, var(--brand-mint) 0%, color-mix(in oklab, var(--brand-mint) 45%, var(--brand-cream)) 100%)",
    glowA: "color-mix(in oklab, var(--brand-teal) 28%, transparent)",
    glowB: "color-mix(in oklab, var(--brand-ocean) 14%, transparent)",
    line: "text-teal/20",
    icon: "text-teal-strong border-teal/25 bg-white/50",
  },
  cream: {
    base: "linear-gradient(160deg, var(--brand-cream) 0%, var(--brand-mint) 100%)",
    glowA: "color-mix(in oklab, var(--brand-teal) 20%, transparent)",
    glowB: "color-mix(in oklab, var(--brand-ocean) 10%, transparent)",
    line: "text-ocean/15",
    icon: "text-ocean border-ocean/20 bg-white/60",
  },
};

export function ImagePlaceholder({
  icon,
  tone,
  className,
}: {
  icon: PlaceholderIcon;
  tone: PlaceholderTone;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <div
      aria-hidden="true"
      className={cx("absolute inset-0 overflow-hidden", className)}
      style={{ background: t.base } as CSSProperties}
    >
      <div
        className="absolute -right-[20%] -top-[25%] size-[85%] rounded-full blur-3xl"
        style={{ background: t.glowA }}
      />
      <div
        className="absolute -bottom-[30%] -left-[20%] size-[75%] rounded-full blur-3xl"
        style={{ background: t.glowB }}
      />
      <svg
        className={cx("absolute inset-0 size-full", t.line)}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.35"
      >
        <circle cx="50" cy="50" r="18" />
        <circle cx="50" cy="50" r="28" />
        <circle cx="50" cy="50" r="40" />
        <circle cx="50" cy="50" r="54" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cx(
            "flex aspect-square w-[34%] max-w-32 min-w-7 items-center justify-center rounded-full border backdrop-blur-sm",
            t.icon,
          )}
        >
          <PlaceholderGlyph icon={icon} className="w-1/2" />
        </div>
      </div>
    </div>
  );
}
