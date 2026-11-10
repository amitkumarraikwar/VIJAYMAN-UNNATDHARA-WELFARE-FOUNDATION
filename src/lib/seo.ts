import { site } from '../data/site';

export interface SeoOptions {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

export function absoluteUrl(path: string): string | undefined {
  if (!site.siteUrl) return undefined;
  return `${site.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function seo(options: SeoOptions) {
  return { ...options, canonical: absoluteUrl(options.path), image: absoluteUrl('/og-image.svg') };
}
