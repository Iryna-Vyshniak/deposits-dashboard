import type { ReactNode, SVGProps } from 'react';

export type IconName =
  | 'home'
  | 'file'
  | 'gift'
  | 'bank'
  | 'settings'
  | 'mail'
  | 'plus'
  | 'menu'
  | 'close'
  | 'moon'
  | 'sun'
  | 'search'
  | 'arrow-right';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...props }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
    ...props,
  };

  const paths: Record<IconName, ReactNode> = {
    home: (
      <>
        <path d="M3 10.8 12 3l9 7.8" />
        <path d="M5.8 9.7V21h12.4V9.7" />
        <path d="M9.5 21v-6.2h5V21" />
      </>
    ),
    file: (
      <>
        <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
        <path d="M14 3.5V8h4" />
      </>
    ),
    gift: (
      <>
        <path d="M4 10h16v11H4z" />
        <path d="M2.5 6.5h19V10h-19z" />
        <path d="M12 6.5V21" />
        <path d="M12 6.5c-1.6 0-4.5-.8-4.5-2.4C7.5 2.8 8.4 2 9.6 2 11.2 2 12 4 12 6.5Z" />
        <path d="M12 6.5c1.6 0 4.5-.8 4.5-2.4 0-1.3-.9-2.1-2.1-2.1C12.8 2 12 4 12 6.5Z" />
      </>
    ),
    bank: (
      <>
        <path d="M3 9h18L12 4 3 9Z" />
        <path d="M5 10v7M9.5 10v7M14.5 10v7M19 10v7" />
        <path d="M3 20h18M4 17h16" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4.5 7 7.5 6 7.5-6" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    moon: <path d="M20 15.2A8.3 8.3 0 0 1 8.8 4a8.4 8.4 0 1 0 11.2 11.2Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.2 4.2" />
      </>
    ),
    'arrow-right': <path d="M5 12h14M14 7l5 5-5 5" />,
  };

  return <svg {...common}>{paths[name]}</svg>;
}
