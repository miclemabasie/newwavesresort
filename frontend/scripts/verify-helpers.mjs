import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '../src/lib/youtube.js';
import { formatCurrency, getLimbeTodayISO } from '../src/lib/currency.js';
import { buildBookingWhatsAppUrl, buildInquiryWhatsAppUrl, sanitizeWhatsAppNumber } from '../src/lib/whatsapp.js';
import { buildResortSchema, buildRoomSchema, buildMenuSchema, buildGallerySchema } from '../src/lib/seoSchemas.js';
import { FALLBACK_ROOM_TYPES, FALLBACK_MENU_ITEMS, FALLBACK_GALLERY_MEDIA } from '../src/lib/fallbackData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(__dirname, '..');

// 1. YouTube ID parsing
assert.equal(extractYouTubeId('5Aa9Mc1VqKE'), '5Aa9Mc1VqKE');
assert.equal(extractYouTubeId('https://www.youtube.com/watch?v=5Aa9Mc1VqKE&t=12s'), '5Aa9Mc1VqKE');
assert.equal(extractYouTubeId('https://youtu.be/5Aa9Mc1VqKE?si=abc'), '5Aa9Mc1VqKE');
assert.equal(extractYouTubeId('https://youtube.com/shorts/5Aa9Mc1VqKE'), '5Aa9Mc1VqKE');
assert.equal(extractYouTubeId('https://www.youtube-nocookie.com/embed/5Aa9Mc1VqKE'), '5Aa9Mc1VqKE');
assert.equal(extractYouTubeId('not-a-valid-url'), null);
assert.equal(getYouTubeThumbnail('5Aa9Mc1VqKE'), 'https://i.ytimg.com/vi/5Aa9Mc1VqKE/hqdefault.jpg');
assert.match(getYouTubeEmbedUrl('5Aa9Mc1VqKE'), /^https:\/\/www\.youtube-nocookie\.com\/embed\/5Aa9Mc1VqKE/);

// 2. Currency & Limbe date formatting
assert.equal(formatCurrency(210000, 'XAF'), '210 000 FCFA');
assert.equal(formatCurrency(120000, 'USD', { USD: 600, EUR: 655.957 }), '$200');
assert.equal(formatCurrency(655957, 'EUR', { USD: 600, EUR: 655.957 }), '€1,000');
assert.match(getLimbeTodayISO(), /^\d{4}-\d{2}-\d{2}$/);

// 3. WhatsApp link generation
assert.equal(sanitizeWhatsAppNumber('+237 677-12-34-56'), '237677123456');
const waUrl = buildBookingWhatsAppUrl({
  phone: '+237 677 123 456',
  booking: {
    reference_code: 'WEB-20261119-4821',
    room_type_name: '2-Bedroom Atlantic Horizon Suite',
    check_in_date: '2026-12-01',
    check_out_date: '2026-12-04',
    adults: 2,
    children: 0,
    rooms_requested: 1,
    estimated_total: 630000,
    currency: 'XAF',
    guest_name: 'Dr. Amadou K.',
  },
  language: 'en',
});
assert.ok(waUrl.startsWith('https://wa.me/237677123456?text='));
assert.ok(decodeURIComponent(waUrl).includes('WEB-20261119-4821'));

const inqWaUrl = buildInquiryWhatsAppUrl({
  phone: '+237 677 123 456',
  inquiry: {
    fullName: 'Dr. Amadou K.',
    email: 'amadou@example.org',
    phone: '+237670000001',
    inquiryType: 'Executive Residency',
    message: 'Interested in 2 weeks stay',
  },
  language: 'en',
});
assert.ok(inqWaUrl.startsWith('https://wa.me/237677123456?text='));
assert.ok(decodeURIComponent(inqWaUrl).includes('Dr. Amadou K.'));

// 4. JSON-LD schemas
const resortSchema = buildResortSchema();
assert.equal(resortSchema['@type'], 'Resort');
assert.equal(buildRoomSchema(FALLBACK_ROOM_TYPES[0], 'en')['@type'], 'HotelRoom');
assert.equal(buildMenuSchema(FALLBACK_MENU_ITEMS, 'en')['@type'], 'Restaurant');
const galSchemas = buildGallerySchema(FALLBACK_GALLERY_MEDIA, 'en');
assert.ok(galSchemas.some((s) => s['@type'] === 'ImageGallery'));
assert.ok(galSchemas.some((s) => s['@type'] === 'VideoObject'));

// 5. Locale JSON validity
const enJson = JSON.parse(fs.readFileSync(path.join(frontendDir, 'public/locales/en/translation.json'), 'utf-8'));
const frJson = JSON.parse(fs.readFileSync(path.join(frontendDir, 'public/locales/fr/translation.json'), 'utf-8'));
assert.ok(enJson.nav.brand_name);
assert.ok(frJson.nav.brand_name);
assert.ok(enJson.booking_status.title);
assert.ok(frJson.booking_status.title);
assert.ok(enJson.accommodations.modal.proceed_to_whatsapp);
assert.ok(frJson.accommodations.modal.proceed_to_whatsapp);

// 6. Build output SEO artifacts (dist/sitemap.xml & prerendered HTMLs)
const distDir = path.join(frontendDir, 'dist');
if (fs.existsSync(distDir)) {
  const sitemap = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf-8');
  assert.ok(sitemap.includes('/rooms'));
  assert.ok(sitemap.includes('/services/dining'));
  assert.ok(!sitemap.includes('/admin'), 'sitemap.xml must never expose /admin');

  for (const subPath of ['story', 'rooms', 'gallery', 'contact', 'services/dining']) {
    const htmlPath = path.join(distDir, subPath, 'index.html');
    assert.ok(fs.existsSync(htmlPath), `Missing prerendered ${subPath}/index.html`);
    const html = fs.readFileSync(htmlPath, 'utf-8');
    assert.ok(html.includes('rel="canonical"'), `Missing canonical in ${subPath}/index.html`);
    assert.ok(html.includes('property="og:title"'), `Missing og:title in ${subPath}/index.html`);
  }

  const rootHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
  assert.ok(rootHtml.includes('application/ld+json'), 'Root index.html must contain JSON-LD');
}

console.log('All helper, i18n, schema, and SEO build assertions passed!');
