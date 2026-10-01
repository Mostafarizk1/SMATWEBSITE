# SMAT Studio: website V1

Bilingual (Arabic default `/ar`, English `/en`) company-profile site for SMAT Studio.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · Motion. Deploy target: Vercel.

```bash
npm install
npm run dev          # http://localhost:3000 (redirects to /ar)
npm run build        # production build (all pages are statically prerendered)
npm run measure:js   # gzipped first-load JS for /ar and /en (run after build)
npm run placeholders # regenerate placeholder imagery in public/media
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` once the domain is booked
(canonical URLs, sitemap, OpenGraph and JSON-LD all read it).

## Where things live

| What | Where |
| --- | --- |
| All UI copy (AR/EN) | `messages/ar.json`, `messages/en.json` |
| Services, work, clients, stats, markets (CMS-ready, typed) | `content/*.ts` |
| WhatsApp number, email, socials, showreel files | `content/site.ts` |
| Brand colours (3 test palettes) | `app/globals.css` → `:root` / `[data-theme]` tokens |
| Logo (placeholder wordmark, swap in the SVG) | `components/brand/Logo.tsx` |
| Logo intro (first visit per session) | `components/intro/*` |
| Quote form (logs only, ready for Supabase) | `components/contact/QuoteForm.tsx`, `lib/quote.ts` |
| SEO (metadata, hreflang, JSON-LD) | `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts` |

The palette switcher (bottom corner) shows in development only. Set `NEXT_PUBLIC_THEME_SWITCHER=1`
to show it on a preview deploy for the team.

## Performance decisions

- **The hero is painted on the first frame.** Hero word animations are CSS and transform-only, so the h1 is never
  invisible. The poster image is preloaded; the showreel only loads after the page is idle, and not at all
  with reduced motion or Save-Data.
- **The logo intro** is server-rendered markup plus a ~1 KB inline script (Web Animations API FLIP into the header
  logo). It doesn't wait for React hydration and ships no Motion layout engine (`domMax`).
- **No i18n runtime on the client.** Client components receive translated strings as props, so no messages
  JSON and no ICU formatter are downloaded.
- **Motion is scoped.** `LazyMotion` + `m` (strict, async features) wrap only the components that need
  JS-driven animation (currently the quote form). Measured: Motion on the home page cost ~60 KB gz for effects CSS does
  for free (tab/filter transitions, scroll-linked media via `animation-timeline: view()`, scroll reveals via
  one shared IntersectionObserver). Home first-load JS: **146 KB gz** (the Next/React framework alone is ~130 KB).
- **CSS is inlined** (`experimental.inlineCss`): Tailwind output is ~16 KB gz; this removes the render-blocking request.
- RTL: all horizontal motion mirrors via the CSS `--dir` variable (`lib/motion.ts#flipX` for JS).
- `prefers-reduced-motion`: animations become simple fades; marquee and intro are skipped.

## Notes

- `next-intl` is wired without `createNextIntlPlugin`: the plugin eagerly loads `@swc/core` for an optional
  extractor we don't use. `next.config.ts` sets the one alias the plugin would add (`next-intl/config`).
- `.claude/skills/` holds the UI UX Pro Max skill (design guidance for Claude Code). It's not app code.
