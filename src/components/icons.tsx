import type { SVGProps } from "react";
import type { PlaceholderIcon } from "@/config/images";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* Ícones de interface ------------------------------------------------ */

export const ArrowLeftIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const RestartIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);

export const LockIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </Svg>
);

export const InfoIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </Svg>
);

export const SettingsIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
  </Svg>
);

export const QuoteIcon = (p: IconProps) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13 9C8.6 10.4 6 13.9 6 18.6V24h7.5v-7.5H10c.2-2.6 1.6-4.4 4.1-5.3L13 9zm13 0c-4.4 1.4-7 4.9-7 9.6V24h7.5v-7.5H23c.2-2.6 1.6-4.4 4.1-5.3L26 9z" />
  </svg>
);

/* Ícones dos placeholders de imagem ---------------------------------- */

const placeholderPaths: Record<PlaceholderIcon, React.ReactNode> = {
  mirror: (
    <>
      <ellipse cx="12" cy="10" rx="5.5" ry="7.5" />
      <path d="M12 17.5V21M8.5 21h7" />
      <path d="M9.6 6.4c-.9 1-1.3 2.2-1.3 3.6" />
    </>
  ),
  repeat: (
    <>
      <path d="M17 2.5l3.5 3.5L17 9.5" />
      <path d="M3.5 11v-.5A4.5 4.5 0 0 1 8 6h12.5" />
      <path d="M7 21.5L3.5 18 7 14.5" />
      <path d="M20.5 13v.5A4.5 4.5 0 0 1 16 18H3.5" />
    </>
  ),
  pause: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 9v6M14 9v6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9L12 3z" />
      <path d="M19 17v4M17 19h4" />
    </>
  ),
  path: (
    <>
      <path d="M4.5 19c4.5 0 4-7 7.5-7s3-6 7.5-6" />
      <circle cx="4.5" cy="19" r="1.6" />
      <circle cx="19.5" cy="6" r="1.6" />
    </>
  ),
  book: (
    <>
      <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5v-15z" />
      <path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3" />
      <path d="M9 7.5h6M9 11h4" />
    </>
  ),
  audio: (
    <>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="14" width="4" height="6.5" rx="1.6" />
      <rect x="17" y="14" width="4" height="6.5" rx="1.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
    </>
  ),
  notebook: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M9 3v18M12.5 8h3.5M12.5 11.5h3.5" />
    </>
  ),
  circle: (
    <>
      <circle cx="12" cy="6.5" r="2.5" />
      <circle cx="5.5" cy="16" r="2.5" />
      <circle cx="18.5" cy="16" r="2.5" />
      <path d="M10.3 8.6L7.3 13.8M13.7 8.6l3 5.2M8.2 16.8h7.6" />
    </>
  ),
  waves: (
    <>
      <path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </>
  ),
};

export function PlaceholderGlyph({
  icon,
  ...props
}: IconProps & { icon: PlaceholderIcon }) {
  return (
    <Svg strokeWidth={1.3} {...props}>
      {placeholderPaths[icon]}
    </Svg>
  );
}
