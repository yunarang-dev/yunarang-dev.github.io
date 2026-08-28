import type { APIRoute } from 'astro';

const fallbackSite = new URL('https://yunarang-dev.github.io');

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ?? fallbackSite;
  const sitemapUrl = new URL('/sitemap-index.xml', baseUrl).href;

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
