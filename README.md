# Vijayman Unnatdhara Welfare Foundation

Static-first Astro website for the foundation’s official digital presence.

## Run locally

```bash
pnpm install
pnpm dev
```

Build and inspect the production output with:

```bash
pnpm check
pnpm build
pnpm preview
```

The project currently uses the placeholder production origin in `astro.config.mjs`. Replace it with the foundation’s confirmed domain before launch so canonical URLs, Open Graph URLs and the sitemap use the real domain.

## Content safety

`src/data/organization.ts` is the single source for organization identity. Every registration field carries a verification status. The website intentionally does not publish directory-only variants as official facts, does not fabricate activities or impact metrics, and keeps donation/form submission flows disabled until real integrations and authorized details exist.

Before launch, confirm the CIN, locality spelling, Section 8 licence, registered address, phone number, approved mission/vision, biographies, activities, documents, donation details and legal copy.

## Current verification status

See [`docs/verification-report.md`](docs/verification-report.md) and [`docs/missing-information.md`](docs/missing-information.md).
