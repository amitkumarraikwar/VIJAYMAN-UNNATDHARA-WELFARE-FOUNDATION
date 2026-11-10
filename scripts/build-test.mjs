import { spawnSync } from 'node:child_process';

// Reserved for local build verification only. It is never used by `pnpm build`
// and must not be treated as the foundation's production domain.
const testOrigin = process.env.PUBLIC_SITE_URL ?? 'https://example.org';
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const result = spawnSync(pnpm, ['exec', 'astro', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, BUILD_MODE: 'test', PUBLIC_SITE_URL: testOrigin }
});

process.exit(result.status ?? 1);
