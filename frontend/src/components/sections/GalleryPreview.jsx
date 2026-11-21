import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '../ui/Lightbox';
import { ArrowRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGallery } from '../../hooks/useGallery.js';
import { getYouTubeThumbnail } from '../../lib/youtube.js';

function GalleryPreview() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { items: previewMedia } = useGallery({ featuredOnly: true });

  const displayMedia = previewMedia.slice(0, 5);

  return (
    <section className="bg-midnight py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto lg:max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-8">
          <div className="max-w-xl">
            <span className="text-lush font-black tracking-[0.45em] uppercase text-[10px] mb-4 block">
              {t('gallery_preview.section_tag')}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white italic leading-tight tracking-tight mb-0">
              {t('gallery_preview.title')}
            </h2>
          </div>

          <Link
            to="/gallery"
            className="group flex items-center gap-3 text-white font-bold uppercase tracking-[0.25em] text-[11px] pb-2.5 border-b border-lush/60 hover:border-lush transition-all duration-300"
          >
            {t('gallery_preview.button')}
            <ArrowRight className="w-4 h-4 text-lush group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* Editorial Bento Grid (Lead card spans 2x2 on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[210px] sm:auto-rows-[250px] lg:auto-rows-[260px] gap-4 md:gap-6">
          {displayMedia.map((item, index) => {
            const isVideo = item.media_type === 'youtube';
            const title = lang === 'fr' ? item.title_fr : item.title_en;
            const thumb = isVideo
              ? getYouTubeThumbnail(item.youtube_video_id, 'hqdefault')
              : item.image_url;
            const isHeroTile = index === 0;

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.015 }}
                onClick={() => setSelectedIndex(index)}
                className={`cursor-pointer relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 group shadow-2xl ${
                  isHeroTile ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={thumb}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-lush text-midnight flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </div>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex flex-col justify-end">
                  <span className="text-lush font-black uppercase tracking-[0.35em] text-[9px] mb-1.5">
                    {item.category}
                  </span>
                  <p
                    className={`text-white font-serif italic mb-0 leading-snug ${
                      isHeroTile ? 'text-2xl md:text-3xl' : 'text-base md:text-lg'
                    }`}
                  >
                    {title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            images={displayMedia}
            index={selectedIndex}
            setIndex={setSelectedIndex}
            close={() => setSelectedIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default GalleryPreview;
