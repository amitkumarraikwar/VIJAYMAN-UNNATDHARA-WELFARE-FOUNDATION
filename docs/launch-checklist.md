# Launch checklist

- Run `pnpm check` and `pnpm build`.
- Set `PUBLIC_SITE_URL` to the confirmed HTTPS origin; the build generates canonical metadata, `robots.txt`, `llms.txt` and the sitemap from it.
- Confirm `/sitemap-index.xml` is the only submitted sitemap endpoint.
- Verify all organization fields against official records and approved materials.
- Add only authentic, consented images and documents.
- Validate the sitemap, canonical tags, Open Graph image and JSON-LD after the domain is set.
- Test keyboard navigation, mobile navigation, reduced motion and all outbound email links.
- Configure forms only after a real backend is available; test delivery and error handling end to end.
- Submit the sitemap to Search Console after deployment and monitor Core Web Vitals.
