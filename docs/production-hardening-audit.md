# Production hardening audit

Audit scope: repository at `origin/main`, Astro static site, reviewed before production-hardening changes.

## Prioritized findings

### Critical

1. **Placeholder production origin** — `astro.config.mjs` uses `https://vijayman-unnatdhara.example`; this propagates into canonical URLs and must be configurable without inventing a real domain.
2. **Duplicate sitemap implementations** — both `/sitemap.xml` and `/sitemap-index.xml` are generated, while robots and launch documentation reference different endpoints.
3. **No structured data system** — pages have no centralized JSON-LD for the organization, web pages, breadcrumbs, people, events or articles.
4. **Build verification unavailable in the prior workspace** — dependency installation was not completed there; this hardening pass must run frozen-lockfile install, `astro check` and `astro build` in the repository checkout.

### High

5. **External Google Fonts import** — `src/styles/global.css` makes a render-blocking third-party request and is not privacy/performance friendly.
6. **Metadata is incomplete** — no Twitter card tags, no `og:url`, no `og:site_name`, no page-type-aware metadata and no centralized schema/canonical policy.
7. **No draft/indexability policy** — content collection schemas exist, but routes are static placeholders and sitemap selection is not tied to published content.
8. **Image pipeline is incomplete** — logo JPEGs are used directly and the hero has no explicit fetch priority or responsive image source strategy.

### Medium

9. **Single-page navigation script is not fully hardened** — menu focus behavior and escape/close semantics are not implemented.
10. **No security headers or deployment header policy** — static hosting should receive an explicit CSP-compatible header set and referrer policy.
11. **Latest dependency ranges** — `package.json` uses `latest`, which weakens reproducibility even though `pnpm-lock.yaml` pins Astro 7.4.8 and TypeScript 7.0.2.
12. **Trust/verification data needs a schema boundary** — supplied, reported and verified fields exist, but publication helpers should prevent unverified legal data from entering JSON-LD.

## Constraints retained

- The supplied logo, business card, page architecture and transparency-first content policy remain intact.
- No real production domain, phone number, coordinates, social accounts, donations, impact metrics, certifications or activities are invented.
- No working form backend is claimed where none is configured.

## Verification plan

- Run `pnpm install --frozen-lockfile`.
- Run `pnpm astro check` and `pnpm build`.
- Inspect generated HTML for placeholder URLs, canonical uniqueness, metadata, JSON-LD and image attributes.
- Verify every generated route and the single authoritative sitemap/robots pair.
- Run available Lighthouse/accessibility checks; report unmeasured targets explicitly.
