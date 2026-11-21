import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(__dirname, '..');
const distDir = path.join(frontendDir, 'dist');
const siteUrl = (process.env.VITE_SITE_URL || 'https://newwavesresort.com').replace(/\/$/, '');
const siteTitle = 'New Waves Resort, Ngeme Limbe';

const ROUTES = [
  {
    path: '/',
    title: `Luxury Coastal Sanctuary in Limbe, Cameroon | ${siteTitle}`,
    description:
      'New Waves Resort in Ngeme, Limbe: 1- to 3-bedroom oceanfront suites, 100% organic Atlantic gastronomy, executive infrastructure, and social impact with the Fisiy Foundation.',
    image: '/assets/general/image3.jpeg',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Resort',
      name: siteTitle,
      url: siteUrl,
      image: `${siteUrl}/assets/general/image3.jpeg`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ngeme, Mile 4 Coastal Road',
        addressLocality: 'Limbe',
        addressRegion: 'South West Region',
        addressCountry: 'CM',
      },
    },
  },
  {
    path: '/story',
    title: `Our Story & Heritage | ${siteTitle}`,
    description:
      'Discover the historical positioning of New Waves Resort in Ngeme, Limbe, Dr. Cyprian F. Fisiy’s legacy, and the Fisiy Foundation and Leadership Center (FFLC).',
    image: '/assets/general/image17.jpeg',
  },
  {
    path: '/rooms',
    title: `Exquisite Sanctuaries & Suites | ${siteTitle}`,
    description:
      'Explore 1-bedroom, 2-bedroom, and 3-bedroom Atlantic suites designed by and for professionals in Limbe, Cameroon. Check availability and reserve online or via WhatsApp.',
    image: '/assets/general/image11.jpeg',
  },
  {
    path: '/services/dining',
    title: `Atlantic Gastronomy — Today's Organic Menu | ${siteTitle}`,
    description:
      'View today’s organic Cameroonian menu crafted from volcanic-soil harvests and fresh Gulf of Guinea seafood at New Waves Resort, Limbe.',
    image: '/assets/general/image1.jpeg',
  },
  {
    path: '/gallery',
    title: `Visual Gallery & YouTube Highlights | ${siteTitle}`,
    description:
      'Browse coastal resort architecture, suites, swimming pool, organic cuisine, and Ocean-Side Intellectual Talks videos from New Waves Resort.',
    image: '/assets/general/image15.jpeg',
  },
  {
    path: '/experiences',
    title: `Experiences & Executive Services | ${siteTitle}`,
    description:
      'Ocean-Side Intellectual Talks, Atlantic Gastronomy, Diplomatic Transfers from Douala, Volcanic Expeditions, Premium Fleet, and the Fisiy Research Library.',
    image: '/assets/general/image2.jpeg',
  },
  {
    path: '/services/culinary',
    title: `Atlantic Gastronomy Experience | ${siteTitle}`,
    description:
      'Farm-to-table organic dining in Ngeme, Limbe featuring the Lighthouse Pavilion, beachfront breakfast, and Chef’s Table.',
    image: '/assets/general/image1.jpeg',
  },
  {
    path: '/services/intellectual-talks',
    title: `Ocean-Side Intellectual Talks | ${siteTitle}`,
    description:
      'Curated evening dialogues uniting global thought leaders and African scholars under the stars in Limbe.',
    image: '/assets/general/image2.jpeg',
  },
  {
    path: '/services/transfers',
    title: `Diplomatic Airport Transfers (DLA → Limbe) | ${siteTitle}`,
    description:
      'Seamless chauffeur-driven pickups from Douala International Airport to New Waves Resort in Ngeme, Limbe.',
    image: '/assets/general/image3.jpeg',
  },
  {
    path: '/services/expeditions',
    title: `Volcanic Expeditions — Mount Cameroon & Bimbia | ${siteTitle}`,
    description:
      'Private guided tours to Mount Cameroon, crater lakes, and historic Bimbia in Cameroon.',
    image: '/assets/general/image5.jpeg',
  },
  {
    path: '/services/fleet',
    title: `Premium Mobility Fleet | ${siteTitle}`,
    description:
      'Luxury 4x4 SUVs and executive vans with optional local chauffeurs for regional travel across Cameroon.',
    image: '/assets/general/image3.jpeg',
  },
  {
    path: '/services/library',
    title: `The Fisiy Research Library | ${siteTitle}`,
    description:
      'Private collection of African philosophy, law, and post-colonial literature overlooking the Atlantic in Limbe.',
    image: '/assets/general/image8.jpeg',
  },
  {
    path: '/contact',
    title: `Concierge & Inquiries | ${siteTitle}`,
    description:
      'Contact New Waves Resort in Ngeme, Limbe for executive residencies, corporate summits, and Fisiy Foundation partnerships.',
    image: '/assets/general/image3.jpeg',
  },
  {
    path: '/booking-status',
    title: `Track Your Reservation | ${siteTitle}`,
    description:
      'Check the live confirmation status of your New Waves Resort booking request.',
    image: '/assets/general/image3.jpeg',
  },
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectHead(baseHtml, route) {
  const canonical = `${siteUrl}${route.path === '/' ? '' : route.path}`;
  const ogImg = route.image.startsWith('http') ? route.image : `${siteUrl}${route.image}`;
  const extraHead = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImg)}" />`,
    route.schema
      ? `<script type="application/ld+json">${JSON.stringify(route.schema)}</script>`
      : '',
  ]
    .filter(Boolean)
    .join('\n    ');

  return baseHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/i,
      `<meta name="description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:title"[\s\S]*?\/>/i,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/i,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:image"[\s\S]*?\/>/i,
      `<meta property="og:image" content="${escapeHtml(ogImg)}" />`,
    )
    .replace('</head>', `    ${extraHead}\n  </head>`);
}

function main() {
  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found. Run vite build first.');
    process.exit(1);
  }
  const baseHtml = fs.readFileSync(indexPath, 'utf-8');

  for (const route of ROUTES) {
    const html = injectHead(baseHtml, route);
    if (route.path === '/') {
      fs.writeFileSync(indexPath, html, 'utf-8');
    } else {
      const targetDir = path.join(distDir, route.path.replace(/^\/+/, ''));
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
    }
  }

  console.log(`Prerendered SEO metadata into ${ROUTES.length} static route HTML files.`);
}

main();
