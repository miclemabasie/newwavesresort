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

  return (
    <section className="bg-volcanic py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto lg:max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
              {t('gallery_preview.section_tag')}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white italic leading-tight tracking-tight">
              {t('gallery_preview.title')}
            </h2>
          </div>

          <Link
            to="/gallery"
            className="group flex items-center gap-4 text-white font-black uppercase tracking-[0.4em] text-[10px] pb-3 border-b border-lush/50 hover:border-lush transition-all duration-300"
          >
            {t('gallery_preview.button')}
            <ArrowRight className="w-5 h-5 text-lush group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {previewMedia.map((item, index) => {
            const isVideo = item.media_type === 'youtube';
            const title = lang === 'fr' ? item.title_fr : item.title_en;
            const thumb = isVideo
              ? getYouTubeThumbnail(item.youtube_video_id, 'hqdefault')
              : item.image_url;

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedIndex(index)}
                className="cursor-pointer relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 group shadow-2xl"
              >
                <img
                  src={thumb}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-lush/95 text-volcanic flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-volcanic/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-lush font-black uppercase tracking-[0.4em] text-[9px] mb-2">
                    {item.category}
                  </span>
                  <p className="text-white font-serif text-lg italic translate-y-4 group-hover:translate-y-0 transition-all duration-500">
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
            images={previewMedia}
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
