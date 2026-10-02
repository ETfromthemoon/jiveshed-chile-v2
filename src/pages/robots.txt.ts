import type { APIRoute } from 'astro';

// Se genera desde `site` (astro.config.mjs): al cambiar el dominio no hay que tocar nada más.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
