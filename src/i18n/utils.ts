import type { Lang } from './translations';

export const LANGS: readonly Lang[] = ['en', 'es', 'pt'];
export const DEFAULT_LANG: Lang = 'en';

/** Idiomas con prefijo en la URL (/es/, /pt/). EN vive en la raíz. */
export const PREFIXED_LANGS: readonly Lang[] = ['es', 'pt'];

const OG_LOCALES: Record<Lang, string> = { en: 'en_US', es: 'es_CL', pt: 'pt_BR' };
const HREFLANGS: Record<Lang, string> = { en: 'en', es: 'es-CL', pt: 'pt-BR' };
const NUMBER_LOCALES: Record<Lang, string> = { en: 'en-US', es: 'es-CL', pt: 'pt-BR' };

export const ogLocale = (lang: Lang): string => OG_LOCALES[lang];
export const hreflang = (lang: Lang): string => HREFLANGS[lang];

/** Prefijo de ruta para un idioma: '' para EN, '/es' o '/pt' para el resto. */
export function langPrefix(lang: Lang): string {
  return lang === DEFAULT_LANG ? '' : `/${lang}`;
}

/** Construye una ruta localizada. `path` debe empezar con '/'. */
export function localePath(lang: Lang, path: string): string {
  return `${langPrefix(lang)}${path}`;
}

/** Quita el prefijo de idioma de una ruta: '/es/packages/' → '/packages/'. */
export function stripLang(pathname: string): string {
  for (const l of PREFIXED_LANGS) {
    if (pathname === `/${l}` || pathname === `/${l}/`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

/** Rutas equivalentes de la página actual en cada idioma. */
export function alternatePaths(pathname: string): Record<Lang, string> {
  const base = stripLang(pathname);
  return {
    en: base,
    es: localePath('es', base),
    pt: localePath('pt', base),
  };
}

/** Formatea un monto CLP según la convención del idioma (300.000 en ES/PT). */
export function formatPrice(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(NUMBER_LOCALES[lang], { maximumFractionDigits: 0 }).format(amount);
}

/** Envuelve la última palabra de una frase en <em>: 'From attention to action.' → '... <em>action.</em>' */
export function emphasizeLastWord(text: string): string {
  return text.replace(/^(.+)\s(\S+)$/, '$1 <em>$2</em>');
}
