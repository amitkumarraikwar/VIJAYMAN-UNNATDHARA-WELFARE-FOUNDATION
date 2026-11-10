import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { organization } from '../data/organization';
export const GET: APIRoute = () => {
  const base = site.siteUrl;
  const lines = [`# ${organization.name}`, '', `> ${organization.description}`, '', '## Official resources', ...site.indexablePaths.slice(0, 5).map((path) => `- ${path || 'Home'}: ${base ? `${base}/${path}` : `/${path}`}`), '', '## Contact', `- Email: ${organization.email}`, `- Location: ${organization.location}`, '', 'Information is published according to its verification status. Unconfirmed registration details are not represented as government-verified facts.'];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
