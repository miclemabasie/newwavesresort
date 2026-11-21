import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Play, Image as ImageIcon, Film } from 'lucide-react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';
import Lightbox from '../components/ui/Lightbox';
import { useGallery } from '../hooks/useGallery.js';
import { getYouTubeThumbnail } from '../lib/youtube.js';
import { GALLERY_CATEGORIES, getOptionLabel } from '../lib/constants.js';
import { buildBreadcrumbSchema, buildGallerySchema } from '../lib/seoSchemas.js';

export default function GalleryPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const { items, loading } = useGallery();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mediaTypeFilter, setMediaTypeFilter] = useState('all'); // 'all' | 'image' | 'youtube'
  const [activeCategory, setActiveCategory] = useState('all');

  const availableCategories = useMemo(() => {
    const present = new Set(items.map((item) => item.category));
    return ['all', ...GALLERY_CATEGORIES.map((c) => c.value).filter((c) => present.has(c))];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (mediaTypeFilter !== 'all' && item.media_type !== mediaTypeFilter) return false;
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      return true;
    });
  }, [items, mediaTypeFilter, activeCategory]);

  const schemas = useMemo(() => {
    return [
      ...buildGallerySchema(items, lang),
      buildBreadcrumbSchema([
        { name: t('nav.home'), path: '/' },
        { name: t('nav.gallery'), path: '/gallery' },
      ]),
    ];
  }, [items, lang, t]);

  return (
    <div className="bg-sand/30 min-h-screen">
      <SEO
        title={t('gallery.title')}
        description={t('gallery.subtitle')}
        path="/gallery"
        schemas={schemas}
      />
      <Navbar />

      <header className="container mx-auto pt-20 pb-10 text-center lg:max-w-5xl px-6">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]"
        >
          {t('gallery.section_tag')}
        </motion.span>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-serif mt-6 text-volcanic tracking-tight"
        >
          {t('gallery.title')}
        </motion.h1>
        <p className="text-volcanic/60 max-w-2xl mx-auto mt-4">{t('gallery.subtitle')}</p>

        {/* Media Type Filter Pills */}
        <div className="flex justify-center gap-2 mt-8">
          {[
            { id: 'all', label: t('gallery.media_types.all'), icon: null },
            { id: 'image', label: t('gallery.media_types.image'), icon: ImageIcon },
            { id: 'youtube', label: t('gallery.media_types.youtube'), icon: Film },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMediaTypeFilter(m.id)}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  mediaTypeFilter === m.id
                    ? 'bg-volcanic text-white shadow'
                    : 'bg-white border border-sand text-volcanic/70 hover:border-lush'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {m.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* STICKY CATEGORY NAV */}
      <nav className="sticky top-[80px] z-40 bg-sand/85 backdrop-blur-md border-y border-volcanic/5 mb-12">
        <div className="container mx-auto overflow-x-auto no-scrollbar py-4 px-6 flex justify-start md:justify-center items-center gap-8 md:gap-10">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`relative whitespace-nowrap text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${
                activeCategory === cat ? 'text-lush' : 'text-volcanic/45 hover:text-volcanic'
              }`}
            >
              {cat === 'all' ? t('gallery.categories.all') : getOptionLabel(GALLERY_CATEGORIES, cat, lang)}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-lush"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* 4-COLUMN GRID */}
      <main className="container mx-auto pb-32 lg:max-w-[1440px] px-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[4/5] rounded-[1.5rem] bg-white animate-pulse border border-sand" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-sand text-volcanic/50">
            {t('gallery.empty')}
          </div>
        ) : (
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => {
                  const isVideo = item.media_type === 'youtube';
                  const title = lang === 'fr' ? item.title_fr : item.title_en;
                  const thumb = isVideo
                    ? getYouTubeThumbnail(item.youtube_video_id, 'hqdefault')
                    : item.image_url;

                  return (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedIndex(index)}
                      className="cursor-pointer group relative"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-volcanic/10 border border-volcanic/5 shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
                        <img
                          src={thumb}
                          alt={title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />

                        {isVideo && (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div className="w-16 h-16 rounded-full bg-lush/95 text-volcanic flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <Play className="w-7 h-7 ml-1 fill-current" />
                              </div>
                            </div>
                            <div className="absolute top-3 right-3 z-10 bg-black/75 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                              {item.youtube_duration || 'YouTube'}
                            </div>
                          </>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-volcanic/90 via-volcanic/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-10">
                          <span className="text-lush font-black uppercase tracking-[0.3em] text-[8px] mb-1">
                            {getOptionLabel(GALLERY_CATEGORIES, item.category, lang)}
                          </span>
                          <h3 className="text-white text-lg font-serif italic leading-tight">{title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
      </main>

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            images={filteredItems}
            index={selectedIndex}
            setIndex={setSelectedIndex}
            close={() => setSelectedIndex(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
