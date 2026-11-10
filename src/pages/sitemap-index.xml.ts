import type { APIRoute } from 'astro';
import { site as config } from '../data/site';
export const GET: APIRoute = () => {
  if (!config.siteUrl) return new Response('PUBLIC_SITE_URL is required for the production sitemap.', { status: 503 });
  const urls = config.indexablePaths.map((page) => `<url><loc>${config.siteUrl}/${page}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
