import { localeDir } from "@/i18n/routing";

/** Shared motion tokens. Keep durations/eases consistent across components. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const isRtl = (locale: string) => localeDir(locale) === "rtl";

/**
 * Mirrors a horizontal offset for RTL: flipX(40, "ar") === -40.
 * JS counterpart of the CSS `--dir` variable (globals.css), which does the same for CSS motion.
 */
export const flipX = (x: number, locale: string) => (isRtl(locale) ? -x : x);
