import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';
import BookingModal from '../components/booking/BookingModal';
import { ArrowLeft, BedDouble, Users, Eye, Maximize2, Check, Calendar, ShieldCheck } from 'lucide-react';
import { useRoomTypes } from '../hooks/useRoomTypes.js';
import { useSiteSettings } from '../hooks/useSiteSettings.js';
import { useCurrency } from '../context/currencyHelpers.js';
import { BED_CONFIGURATIONS, VIEW_TYPES, getOptionLabel } from '../lib/constants.js';
import { buildBreadcrumbSchema, buildRoomSchema } from '../lib/seoSchemas.js';

export default function UnitDetail() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const { roomTypes, loading } = useRoomTypes();
  const { settings } = useSiteSettings();
  const { formatPrice } = useCurrency();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  const suite = useMemo(() => roomTypes.find((r) => r.slug === slug), [roomTypes, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sand/30">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center text-volcanic/60">Loading suite...</div>
        <Footer />
      </div>
    );
  }

  if (!suite) {
    return (
      <div className="min-h-screen bg-sand/30">
        <SEO title="Suite Not Found" path={`/rooms/${slug}`} noindex />
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center space-y-6">
          <h1 className="text-4xl font-serif text-volcanic">Suite not found</h1>
          <Link to="/rooms" className="btn-primary">
            {t('accommodations.back_to_suites')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const title = lang === 'fr' ? suite.name_fr : suite.name_en;
  const description = lang === 'fr' ? suite.description_fr || suite.short_description_fr : suite.description_en || suite.short_description_en;
  const gallery =
    Array.isArray(suite.gallery_images) && suite.gallery_images.length > 0
      ? suite.gallery_images
      : [{ url: suite.cover_image_url || '/assets/general/image14.jpeg' }];
  const activePhoto = gallery[activeImgIdx]?.url || suite.cover_image_url || '/assets/general/image14.jpeg';
  const amenities = Array.isArray(suite.amenities) ? suite.amenities : [];

  return (
    <div className="bg-sand/30 min-h-screen">
      <SEO
        title={title}
        description={description}
        path={`/rooms/${suite.slug}`}
        image={activePhoto}
        schemas={[
          buildRoomSchema(suite, lang),
          buildBreadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('nav.accommodations'), path: '/rooms' },
            { name: title, path: `/rooms/${suite.slug}` },
          ]),
        ]}
      />
      <Navbar />

      <main className="pt-16 pb-24">
        <div className="container mx-auto px-6">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean hover:text-lush mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> {t('accommodations.back_to_suites')}
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-white shadow-xl border border-sand">
                <img src={activePhoto} alt={title} className="w-full h-full object-cover" />
              </div>

              {gallery.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {gallery.map((img, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setActiveImgIdx(i)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        activeImgIdx === i ? 'border-lush scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Column */}
            <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 md:p-10 shadow-resort border border-sand space-y-6">
              <div>
                <span className="text-lush font-black tracking-[0.3em] uppercase text-[10px] block mb-2">
                  {suite.suite_category}
                </span>
                <h1 className="text-3xl md:text-4xl font-serif text-volcanic mb-4">{title}</h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-ocean">
                    {formatPrice(suite.base_price)}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-volcanic/60">
                    {t('accommodations.per_night')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-4 border-y border-sand text-sm text-volcanic/80">
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-lush" />
                  <span>
                    {suite.number_of_beds}× {getOptionLabel(BED_CONFIGURATIONS, suite.bed_configuration, lang)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-lush" />
                  <span>
                    {t('accommodations.guests_max', {
                      count: (suite.max_adults || 2) + (suite.max_children || 0),
                    })}
                  </span>
                </div>
                {suite.size_sqm && (
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-lush" />
                    <span>{suite.size_sqm} m²</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-lush" />
                  <span>{getOptionLabel(VIEW_TYPES, suite.view_type, lang)}</span>
                </div>
              </div>

              <p className="text-volcanic/70 leading-relaxed">{description}</p>

              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.25em] text-lush mb-3">
                  {t('accommodations.amenities')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-volcanic/80">
                      <Check className="w-4 h-4 text-lush shrink-0" />
                      <span>{typeof item === 'string' ? item : lang === 'fr' ? item.name_fr : item.name_en}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-sand/40 rounded-2xl p-4 space-y-2 text-xs text-volcanic/70">
                <p className="font-bold text-volcanic uppercase tracking-wider">
                  {t('accommodations.policy_title')}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-ocean" />
                  {t('accommodations.check_in_out', {
                    in: settings.check_in_time || '14:00',
                    out: settings.check_out_time || '11:00',
                  })}
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-ocean" />
                  {t('accommodations.cancellation_policy', {
                    hours: settings.cancellation_hours || 24,
                  })}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="w-full bg-volcanic hover:bg-lush text-white font-black py-4 rounded-xl uppercase text-xs tracking-[0.3em] transition-all shadow-lg"
              >
                {t('accommodations.reserve')}
              </button>
            </div>
          </div>
        </div>
      </main>

      <BookingModal room={suite} isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <Footer />
    </div>
  );
}
