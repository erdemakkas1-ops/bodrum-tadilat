// @ts-check
import { defineConfig } from 'astro/config';

// The same site deploys twice: Vercel at the domain root, GitHub Pages under /bodrum-tadilat/.
// The Pages workflow sets DEPLOY_TARGET=github-pages. When a domain is bought, update `site` and PRIMARY in src/url.ts.
const pages = process.env.DEPLOY_TARGET === 'github-pages';

export default defineConfig({
  site: pages ? 'https://erdemakkas1-ops.github.io' : 'https://bodrum-tadilat.vercel.app',
  base: pages ? '/bodrum-tadilat' : '/',
});
