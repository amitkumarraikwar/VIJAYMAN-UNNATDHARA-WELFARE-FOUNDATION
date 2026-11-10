# Vijayman Unnatdhara Welfare Foundation

Static-first Astro website for the foundation’s official digital presence.

## Run locally

```bash
pnpm install
pnpm dev
```

`pnpm dev` does not require `PUBLIC_SITE_URL`. Without a configured origin,
the site omits absolute canonical/SEO URLs and emits `noindex` metadata so a
local server cannot be mistaken for the production website.

For a local production-output test, use the dedicated test build:

```bash
pnpm build:test
pnpm preview
```

This uses the reserved `https://example.org` origin only inside the local test
output. It is not the foundation’s domain and is never used by `pnpm build`.

Production builds require the confirmed canonical origin:

```bash
cp .env.example .env
# Set PUBLIC_SITE_URL to the confirmed HTTPS domain before building.
PUBLIC_SITE_URL=https://your-confirmed-domain.example pnpm build
```

Build and inspect the production output with:

```bash
pnpm check
pnpm build
pnpm preview
```

The project intentionally has no default production domain. `PUBLIC_SITE_URL`
is required by the production build guard and must be a confirmed HTTPS origin
without a path, query string or hash. The same value drives canonical URLs,
Open Graph URLs, JSON-LD, `llms.txt`, robots and the sitemap.

## Content safety

`src/data/organization.ts` is the single source for organization identity. Every registration field carries a verification status. The website intentionally does not publish directory-only variants as official facts, does not fabricate activities or impact metrics, and keeps donation/form submission flows disabled until real integrations and authorized details exist.

Before launch, confirm the CIN, locality spelling, Section 8 licence, registered address, phone number, approved mission/vision, biographies, activities, documents, donation details and legal copy.

## Current verification status

See [`docs/verification-report.md`](docs/verification-report.md) and [`docs/missing-information.md`](docs/missing-information.md).
