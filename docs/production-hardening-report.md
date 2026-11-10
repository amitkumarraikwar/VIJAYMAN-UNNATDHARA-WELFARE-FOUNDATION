# Production hardening report

## Implemented

- Added `PUBLIC_SITE_URL` as the single configurable production origin.
- Added a build guard that fails when the production origin is missing, non-HTTPS, malformed or a placeholder domain.
- Removed the duplicate `/sitemap.xml` endpoint; `/sitemap-index.xml` is now authoritative.
- Generated `robots.txt` and `llms.txt` from the configured origin without hardcoded URLs.
- Added canonical, Open Graph, Twitter card, robots and language metadata centrally in `MainLayout.astro`.
- Added centralized Organization, WebSite, WebPage, BreadcrumbList and page-type JSON-LD generation.
- Added Astro image processing for logo and hero images with explicit dimensions and eager hero loading.
- Removed the external Google Fonts import; the site now uses system font fallbacks without third-party font requests.
- Added keyboard-friendly mobile menu close behavior for link activation and Escape.
- Added Cloudflare Pages-compatible security headers in `public/_headers`.
- Pinned dependency specifiers to the versions represented by the existing lockfile instead of `latest`.
- Added `verify:production` to check generated HTML for placeholder domains and sitemap conflicts.
- Added `.env.example` and updated launch documentation.

## Verification results

- `git diff --check`: passed.
- `package.json` JSON parse: passed.
- `node --check scripts/validate-site-url.mjs`: passed.
- `node --check scripts/verify-production.mjs`: passed.
- Placeholder scan across `astro.config.mjs`, `src`, `public`, `scripts`: passed; no production-source placeholder domain remains.
- Build guard without `PUBLIC_SITE_URL`: failed as intended with an explicit configuration error.
- Build with a test origin: reached Astro invocation, then failed because the local `astro` executable is unavailable.
- `pnpm astro check`: unavailable because dependency installation could not complete.

## Not measured in this environment

Lighthouse, Core Web Vitals, generated HTML inspection, structured-data validators, browser keyboard testing and production deployment headers require a successful dependency install/build and a confirmed production origin. No Lighthouse score is claimed.
