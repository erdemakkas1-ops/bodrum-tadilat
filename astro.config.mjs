// @ts-check
import { defineConfig } from 'astro/config';

// Swap `site` for the real domain once it is bought; canonical, hreflang and og:image URLs derive from it.
export default defineConfig({
  site: 'https://bodrum-tadilat.vercel.app',
});
