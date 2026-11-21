import { useTranslation } from 'react-i18next';
import { SITE_URL } from '../lib/seoSchemas.js';

export default function SEO({
  title,
  description,
  path = '/',
  image = '/assets/general/image3.jpeg',
  type = 'website',
  noindex = false,
  schemas = [],
}) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
  const fullImage = image?.startsWith('http') ? image : `${SITE_URL}${image}`;
  const siteTitle = 'New Waves Resort, Ngeme Limbe';
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      {!noindex && <link rel="canonical" href={canonicalUrl} />}
      {!noindex && <link rel="alternate" hrefLang="en" href={canonicalUrl} />}
      {!noindex && <link rel="alternate" hrefLang="fr" href={canonicalUrl} />}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />}

      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={fullImage} />

      {schemas
        .filter(Boolean)
        .map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
    </>
  );
}
