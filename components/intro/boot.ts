/**
 * Runs in <head> before first paint (see app/[locale]/layout.tsx).
 * 1. Flags JS as available (`html.js`) so scroll reveals may start hidden. If the reveal observer
 *    hasn't booted after 4s (script error, very slow device), the flag is removed and content shows.
 * 2. Restores the dev palette choice (only when the theme switcher is enabled).
 * 3. Decides whether the first-visit logo intro should play. Storage access is wrapped in
 *    try/catch because it throws in some privacy modes.
 */
export const bootScript = (themeSwitcher: boolean) => `(function(){var h=document.documentElement;
h.classList.add("js");setTimeout(function(){if(!window.__reveal)h.classList.remove("js")},4000);
${themeSwitcher ? `try{var t=localStorage.getItem("smat-theme");if(t)h.dataset.theme=t}catch(e){}` : ""}
try{if(/^\\/(ar|en)\\/?$/.test(location.pathname)&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("smat-intro")){sessionStorage.setItem("smat-intro","1");h.dataset.intro="play"}}catch(e){}
})();`;
