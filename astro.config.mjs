import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vijayman-unnatdhara.example',
  output: 'static',
  compressHTML: true,
  build: { format: 'directory' }
});
