import { organization } from '../data/organization';
import { site } from '../data/site';
import { absoluteUrl } from './seo';

export function organizationSchema() {
  const data: Record<string, unknown> = {
    '@type': 'Organization',
    additionalType: 'https://schema.org/NGO',
    '@id': absoluteUrl('/#organization'),
    name: organization.name,
    url: site.siteUrl,
    logo: absoluteUrl('/favicon.svg'),
    email: organization.email,
    description: organization.description,
    areaServed: 'Lalitpur, Uttar Pradesh, India'
  };
  return data;
}

export function schemaGraph(path: string, title: string, description: string, type = 'WebPage') {
  const pageId = absoluteUrl(`${path}#webpage`);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: site.title, url: site.siteUrl, inLanguage: site.locale },
      { '@type': type, '@id': pageId, url: absoluteUrl(path), name: title, description, isPartOf: { '@id': absoluteUrl('/#website') }, about: { '@id': absoluteUrl('/#organization') } },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') }, ...(path !== '/' ? [{ '@type': 'ListItem', position: 2, name: title, item: absoluteUrl(path) }] : [])] }
    ]
  };
}
