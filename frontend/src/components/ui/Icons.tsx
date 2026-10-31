import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const traco = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
});

const preenchido = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
});

export const ArrowRight = ({ size = 16, ...p }: IconProps) => (
  <svg {...traco(size)} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const Plus = ({ size = 22, ...p }: IconProps) => (
  <svg {...traco(size)} strokeWidth={1.2} {...p}>
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const Menu = ({ size = 24, ...p }: IconProps) => (
  <svg {...traco(size)} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = ({ size = 24, ...p }: IconProps) => (
  <svg {...traco(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const LinkedIn = ({ size = 14, ...p }: IconProps) => (
  <svg {...preenchido(size)} {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.85v5.6h-4v-4.96c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.95 1.3-1.95 2.62v5.04h-4v-11Z" />
  </svg>
);

export const Instagram = ({ size = 14, ...p }: IconProps) => (
  <svg {...traco(size)} strokeWidth={2} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const YouTube = ({ size = 14, ...p }: IconProps) => (
  <svg {...preenchido(size)} {...p}>
    <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8ZM10 15V9l5.2 3L10 15Z" />
  </svg>
);
