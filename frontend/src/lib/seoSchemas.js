export const SITE_URL = (
  import.meta?.env?.VITE_SITE_URL || 'https://newwavesresort.com'
).replace(/\/$/, '');

export function buildResortSchema({ phone, email } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    name: 'New Waves Resort, Ngeme Limbe',
    description:
      'A premier coastal hospitality sanctuary and executive digital-nomad retreat in Ngeme, Limbe, Cameroon, built in partnership with the Fisiy Foundation and Leadership Center (FFLC).',
    url: SITE_URL,
    image: `${SITE_URL}/assets/general/image3.jpeg`,
    logo: `${SITE_URL}/assets/general/logo1.png`,
    telephone: phone || '+237 600 000 000',
    email: email || 'residency@newwavesresort.com',
    priceRange: '$$$',
    checkinTime: '14:00',
    checkoutTime: '11:00',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ngeme, Mile 4 Coastal Road',
      addressLocality: 'Limbe',
      addressRegion: 'South West Region',
      addressCountry: 'CM',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 4.0167,
      longitude: 9.1666,
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Enterprise High-Speed Wi-Fi & Starlink', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Ocean-Front Swimming Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24/7 Solar Power Sovereignty', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Executive Conference & Banquet Facilities', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Fisiy Research Library', value: true },
      { '@type': 'LocationFeatureSpecification', name: '100% Organic Atlantic Gastronomy', value: true },
    ],
  };
}

export function buildRoomSchema(room, lang = 'en') {
  if (!room) return null;
  const name = lang === 'fr' ? room.name_fr : room.name_en;
  const description = lang === 'fr' ? room.description_fr || room.short_description_fr : room.description_en || room.short_description_en;
  const url = `${SITE_URL}/rooms/${room.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name,
    description,
    url,
    image: room.cover_image_url ? [room.cover_image_url] : [`${SITE_URL}/assets/general/image11.jpeg`],
    bed: {
      '@type': 'BedDetails',
      numberOfBeds: room.number_of_beds || 1,
      typeOfBed: room.bed_configuration || 'King',
    },
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: (room.max_adults || 2) + (room.max_children || 0),
    },
    floorSize: room.size_sqm
      ? { '@type': 'QuantitativeValue', value: room.size_sqm, unitCode: 'MTK' }
      : undefined,
    offers: {
      '@type': 'Offer',
      price: Number(room.base_price || 0),
      priceCurrency: room.currency || 'XAF',
      availability:
        room.availability_status === 'booked' || room.availability_status === 'maintenance'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      url,
    },
  };
}

export function buildMenuSchema(items = [], lang = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Atlantic Gastronomy — New Waves Resort',
    servesCuisine: ['Cameroonian', 'Atlantic Seafood', 'Organic'],
    url: `${SITE_URL}/services/dining`,
    hasMenu: {
      '@type': 'Menu',
      name: lang === 'fr' ? 'Menu du Jour' : "Today's Menu",
      hasMenuItem: items.slice(0, 20).map((item) => ({
        '@type': 'MenuItem',
        name: lang === 'fr' ? item.name_fr : item.name_en,
        description: lang === 'fr' ? item.description_fr : item.description_en,
        offers: {
          '@type': 'Offer',
          price: Number(item.effective_price_xaf ?? item.price_xaf ?? 0),
          priceCurrency: 'XAF',
        },
      })),
    },
  };
}

export function buildGallerySchema(items = [], lang = 'en') {
  const videos = items
    .filter((i) => i.media_type === 'youtube' && i.youtube_video_id)
    .slice(0, 10)
    .map((v) => ({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: lang === 'fr' ? v.title_fr : v.title_en,
      description: (lang === 'fr' ? v.description_fr : v.description_en) || 'New Waves Resort video showcase',
      thumbnailUrl: `https://i.ytimg.com/vi/${v.youtube_video_id}/hqdefault.jpg`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtube_video_id}`,
      contentUrl: v.youtube_url || `https://www.youtube.com/watch?v=${v.youtube_video_id}`,
      uploadDate: v.youtube_published_at || v.created_at || '2026-01-01T00:00:00Z',
    }));

  const gallery = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'New Waves Resort Visual Gallery',
    url: `${SITE_URL}/gallery`,
  };

  return [gallery, ...videos];
}

export function buildBreadcrumbSchema(crumbs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: c.name,
      item: c.path.startsWith('http') ? c.path : `${SITE_URL}${c.path}`,
    })),
  };
}
