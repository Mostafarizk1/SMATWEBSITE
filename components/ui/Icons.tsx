type P = React.SVGProps<SVGSVGElement>;

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Points in reading direction; add className="btn-arrow" to mirror it in RTL. */
export const ArrowIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base} {...p}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const PlayIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="currentColor" {...p}>
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden fill="currentColor" {...p}>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.15-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.06.9.92-2.98-.2-.31a8.22 8.22 0 1 1 6.84 3.72Zm4.51-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.74 6.74 0 0 1-3.38-2.95c-.26-.44.26-.41.73-1.36.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04c0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);
