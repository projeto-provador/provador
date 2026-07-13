export const THEME_COOKIE = "theme";

export type Theme = "dark" | "light";

export const DEFAULT_THEME: Theme = "dark";

/**
 * Roda inline no <head>, antes do primeiro paint (anti-FOUC — docs/adr/0001).
 * Lê o cookie; ausente, resolve prefers-color-scheme e persiste.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_COOKIE}=(dark|light)/);var t=m?m[1]:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);if(!m)document.cookie="${THEME_COOKIE}="+t+";path=/;max-age=31536000;SameSite=Lax"}catch(e){}})()`;
