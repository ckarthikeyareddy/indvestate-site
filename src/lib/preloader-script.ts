// Inline, before the body renders: a repeat visit in this session (or reduced
// motion) marks html[data-pre="done"] so the preloader never paints. Plain
// module (no "use client") so the root layout can embed the string.
export const PRELOADER_KEY = "iv-pre";
export const PRELOADER_SCRIPT = `try{var h=document.documentElement;if(location.pathname.indexOf("/admin")===0||sessionStorage.getItem("${PRELOADER_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)h.dataset.pre="done"}catch(e){}`;
