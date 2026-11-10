import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = join(process.cwd(), 'dist');
const readConfiguredOrigin = () => {
  const envFile = existsSync('.env') ? readFileSync('.env', 'utf8') : '';
  const fromFile = envFile.match(/^PUBLIC_SITE_URL\s*=\s*["']?([^"'\s#]+)["']?\s*$/m)?.[1];
  return process.env.PUBLIC_SITE_URL ?? fromFile;
};

const reservedHosts = ['localhost', 'example.com', 'example.org', 'example.net', 'yourdomain.in', 'invalid', 'test'];
const isReservedHost = (hostname) => reservedHosts.some((reserved) => hostname === reserved || hostname.endsWith(`.${reserved}`)) || hostname.endsWith('.example');
const parseProductionOrigin = (value) => {
  if (!value) throw new Error('PUBLIC_SITE_URL is required to verify production output; no confirmed domain is configured.');
  const url = new URL(value);
  const hostname = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || url.port || isReservedHost(hostname)) {
    throw new Error(`Invalid production domain: ${value}. Use a confirmed HTTPS origin, not a localhost, test or placeholder domain.`);
  }
  return url.origin;
};

if (!existsSync(dist)) throw new Error('dist/ is missing; run a production build first.');
const origin = parseProductionOrigin(readConfiguredOrigin());
const htmlFiles = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) htmlFiles.push(file);
  }
};
walk(dist);

const placeholderPattern = /(https?:\/\/(?:localhost|127\.0\.0\.1|example\.(?:com|org|net)|yourdomain\.in|[^/\s"']+\.example)(?::\d+)?(?:\/[^\s"']*)?)/i;
const generatedTextFiles = ['sitemap-index.xml', 'robots.txt', 'llms.txt'].map((file) => join(dist, file));
const badPlaceholderFiles = [...htmlFiles, ...generatedTextFiles].filter((file) => existsSync(file) && placeholderPattern.test(readFileSync(file, 'utf8')));
if (badPlaceholderFiles.length) throw new Error(`Placeholder URL found in generated output: ${badPlaceholderFiles.map((file) => relative(dist, file)).join(', ')}`);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (!canonical) throw new Error(`Missing canonical URL in ${relative(dist, file)}`);
  if (new URL(canonical).origin !== origin) throw new Error(`Canonical domain mismatch in ${relative(dist, file)}: ${canonical}`);
}

if (existsSync(join(dist, 'sitemap.xml'))) throw new Error('Conflicting sitemap.xml generated; sitemap-index.xml is authoritative.');
const sitemapFile = join(dist, 'sitemap-index.xml');
if (!existsSync(sitemapFile)) throw new Error('Authoritative sitemap-index.xml is missing.');
const sitemap = readFileSync(sitemapFile, 'utf8');
if (!/^<\?xml[\s\S]*<urlset[\s>]/.test(sitemap) || !sitemap.includes('</urlset>')) throw new Error('sitemap-index.xml must contain a valid XML urlset.');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!sitemapUrls.length) throw new Error('sitemap-index.xml contains no URLs.');
if (new Set(sitemapUrls).size !== sitemapUrls.length) throw new Error('sitemap-index.xml contains duplicate URLs.');
for (const sitemapUrl of sitemapUrls) {
  const url = new URL(sitemapUrl);
  if (url.origin !== origin) throw new Error(`Sitemap URL uses the wrong domain: ${sitemapUrl}`);
  const pathname = url.pathname === '/' ? '/index.html' : `${url.pathname}index.html`;
  const target = join(dist, pathname);
  if (!existsSync(target)) throw new Error(`Sitemap URL has no generated page: ${sitemapUrl}`);
  const html = readFileSync(target, 'utf8');
  if (/name="robots" content="noindex/i.test(html)) throw new Error(`Sitemap includes a noindex page: ${sitemapUrl}`);
}

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
const sitemapReference = robots.match(/^Sitemap:\s*(\S+)$/m)?.[1];
if (sitemapReference !== `${origin}/sitemap-index.xml`) throw new Error(`robots.txt sitemap does not match the configured domain: ${sitemapReference ?? 'missing'}`);
console.log(`Verified ${htmlFiles.length} HTML files, ${sitemapUrls.length} indexable sitemap URLs and production origin ${origin}.`);

