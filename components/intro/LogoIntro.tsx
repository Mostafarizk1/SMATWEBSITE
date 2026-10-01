import { Logo } from "@/components/brand/Logo";
import { InlineScript } from "@/components/ui/InlineScript";

/**
 * First-visit logo intro (home page only).
 *
 * - `components/intro/boot.ts` (inline in <head>) decides whether to play: home path, first visit this
 *   session (sessionStorage), no prefers-reduced-motion. It sets <html data-intro="play">.
 * - This overlay is always in the HTML but hidden unless data-intro="play", so the hero underneath
 *   is fully rendered from the first byte and nothing waits on it.
 * - The choreography below is a tiny vanilla script (no React, no Motion): the wordmark builds with CSS
 *   (~1.2s), then a FLIP animation (Web Animations API, transform only) flies it into the header logo
 *   ([data-logo-target]) while the backdrop fades and the hero animations start.
 *   This is the `layoutId` shared-element effect without shipping Motion's layout engine (domMax).
 * - Click, scroll, touch or any key skips it. CSS removes the overlay on its own after 3.4s as a safety net.
 */
export function LogoIntro({ skipLabel }: { skipLabel: string }) {
  return (
    <>
      <div data-intro-root className="intro fixed inset-0 z-[100] place-items-center">
        <div data-intro-backdrop className="absolute inset-0 bg-bg" />
        <div data-intro-logo className="relative origin-center" aria-hidden>
          <Logo animated className="text-[clamp(2.75rem,11vw,6rem)]" />
        </div>
        <button
          type="button"
          data-intro-skip
          className="absolute inset-x-0 bottom-8 mx-auto w-fit rounded-full px-5 py-3 text-sm text-muted transition-colors hover:text-fg"
        >
          {skipLabel}
        </button>
      </div>
      <InlineScript html={introScript} />
    </>
  );
}

const introScript = `(function(){
var h=document.documentElement;if(h.dataset.intro!=="play")return;
var root=document.querySelector("[data-intro-root]"),logo=document.querySelector("[data-intro-logo]"),
bd=document.querySelector("[data-intro-backdrop]"),target=document.querySelector("[data-logo-target]");
if(!root||!logo||!bd||!target||!logo.animate){h.dataset.intro="done";return;}
var started=false,t=setTimeout(function(){go(false)},1250),evs=["wheel","touchstart","keydown","pointerdown"];
function skip(){go(true)}
evs.forEach(function(e){window.addEventListener(e,skip,{passive:true,once:true})});
function go(fast){
 if(started)return;started=true;clearTimeout(t);
 evs.forEach(function(e){window.removeEventListener(e,skip)});
 root.style.animation="none";
 var w=document.querySelector(".hero-word"),a=w&&w.getAnimations&&w.getAnimations()[0];
 if(a&&a.startTime!=null&&document.timeline){h.style.setProperty("--intro-offset",((document.timeline.currentTime-a.startTime)/1000).toFixed(3)+"s")}
 else{h.style.setProperty("--intro-offset","0s")}
 var f=logo.firstElementChild.getBoundingClientRect(),to=target.firstElementChild.getBoundingClientRect(),
 s=to.width/f.width,dx=(to.left+to.width/2)-(f.left+f.width/2),dy=(to.top+to.height/2)-(f.top+f.height/2),
 d=fast?450:850,e="cubic-bezier(0.65,0,0.35,1)";
 bd.animate([{opacity:1},{opacity:0}],{duration:d*0.9,easing:"ease-out",fill:"forwards"});
 logo.animate([{transform:"none"},{transform:"translate("+dx+"px,"+dy+"px) scale("+s+")"}],{duration:d,easing:e,fill:"forwards"})
 .onfinish=function(){h.dataset.intro="done";setTimeout(function(){h.style.removeProperty("--intro-offset")},2500)};
}
root.addEventListener("click",skip);
})();`;
