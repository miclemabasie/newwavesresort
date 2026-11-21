import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(__dirname, '..');
const distDir = path.join(frontendDir, 'dist');
const siteUrl = (process.env.VITE_SITE_URL || 'https://newwavesresort.com').replace(/\/$/, '');

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/rooms', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/dining', priority: '0.9', changefreq: 'daily' },
  { path: '/gallery', priority: '0.8', changefreq: 'weekly' },
  { path: '/story', priority: '0.8', changefreq: 'monthly' },
  { path: '/experiences', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/culinary', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/intellectual-talks', priority: '0.7', changefreq: 'weekly' },
  { path: '/services/transfers', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/expeditions', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/fleet', priority: '0.7', changefreq: 'monthly' },
  { path: '/services/library', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/booking-status', priority: '0.6', changefreq: 'monthly' },
];

const FALLBACK_ROOM_SLUGS = [
  'nomad-one-bedroom-suite',
  'garden-two-bedroom-suite',
  'atlantic-horizon-two-bedroom-suite',
  'executive-founders-three-bedroom-suite',
];

async function fetchLiveRoomSlugs() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return FALLBACK_ROOM_SLUGS;

  try {
    const res = await fetch(
      `${url.replace(/\/$/, '')}/rest/v1/room_types?select=slug&is_published=eq.true`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      },
    );
    if (!res.ok) return FALLBACK_ROOM_SLUGS;
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return FALLBACK_ROOM_SLUGS;
    return rows.map((r) => r.slug).filter(Boolean);
  } catch {
    return FALLBACK_ROOM_SLUGS;
  }
}

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error('dist/ directory not found. Run vite build first.');
    process.exit(1);
  }

  const roomSlugs = await fetchLiveRoomSlugs();
  const roomRoutes = roomSlugs.map((slug) => ({
    path: `/rooms/${slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const today = new Date().toISOString().slice(0, 10);
  const allRoutes = [...STATIC_ROUTES, ...roomRoutes];

  const urlsXml = allRoutes
    .map(
      (r) => `  <url>
    <loc>${siteUrl}${r.path === '/' ? '' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`Generated dist/sitemap.xml with ${allRoutes.length} routes.`);
}

main();
