// Paths inside the site, prefixed with the deploy base ("/" on Vercel, "/bodrum-tadilat" on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${base}${path}`;

// Canonical and hreflang always point at the primary deployment, so the Pages copy is treated as a mirror.
export const PRIMARY = 'https://bodrum-tadilat.vercel.app';
export const primaryUrl = (pathname: string) => new URL(pathname.slice(base.length) || '/', PRIMARY).href;
