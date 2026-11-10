import { existsSync, readFileSync } from 'node:fs';

const envFile = existsSync('.env') ? readFileSync('.env', 'utf8') : '';
const fromFile = envFile.match(/^PUBLIC_SITE_URL\s*=\s*["']?([^"'\s#]+)["']?\s*$/m)?.[1];
const value = process.env.PUBLIC_SITE_URL ?? fromFile;
if (!value) {
  console.error('PUBLIC_SITE_URL is required for production builds. Set it to the confirmed canonical HTTPS domain.');
  process.exit(1);
}
const url = new URL(value);
const hostname = url.hostname.toLowerCase();
const reservedHosts = ['localhost', 'example.com', 'example.org', 'example.net', 'invalid', 'test'];
const isReservedHost = reservedHosts.some((reserved) => hostname === reserved || hostname.endsWith(`.${reserved}`));
if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || url.port || isReservedHost || hostname.endsWith('.example')) {
  console.error('PUBLIC_SITE_URL must be a real HTTPS origin without a path, query, hash or placeholder domain.');
  process.exit(1);
}
