import { defineConfig } from 'astro/config';
import { existsSync, readFileSync } from 'node:fs';

const envFile = existsSync('.env') ? readFileSync('.env', 'utf8') : '';
const envSiteUrl = envFile.match(/^PUBLIC_SITE_URL\s*=\s*["']?([^"'\s#]+)["']?\s*$/m)?.[1];
const siteUrl = process.env.PUBLIC_SITE_URL ?? envSiteUrl;

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory' }
});
