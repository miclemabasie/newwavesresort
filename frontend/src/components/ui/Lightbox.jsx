import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getYouTubeEmbedUrl } from '../../lib/youtube.js';

export default function Lightbox({ images, index, setIndex, close }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  useEffect(() => {
    if (index === null || index === undefined) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, images.length, setIndex, close]);

  if (index === null || index === undefined || !images[index]) return null;

  const current = images[index];
  const isVideo = current.media_type === 'youtube' || Boolean(current.youtube_video_id);
  const title = lang === 'fr' ? current.title_fr || current.title : current.title_en || current.title;
  const description =
    lang === 'fr'
      ? current.description_fr || current.description
      : current.description_en || current.description;
  const imgSrc = current.image_url || current.image;

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
      className="fixed inset-0 z-[100] bg-volcanic/95 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close lightbox"
        className="absolute top-6 right-6 z-[110] text-white/70 hover:text-lush p-3 bg-white/10 rounded-full transition-colors"
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <div
          className="hidden md:flex absolute inset-x-8 justify-between items-center pointer-events-none z-[105]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="pointer-events-auto p-3 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="pointer-events-auto p-3 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}

      <div
        className="relative w-full max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id || index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            drag={isVideo ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, { offset }) => {
              if (offset.x > 100) prev();
              else if (offset.x < -100) next();
            }}
            className="w-full flex flex-col items-center"
          >
            {isVideo ? (
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
                <iframe
                  src={getYouTubeEmbedUrl(current.youtube_video_id, { autoplay: true })}
                  title={title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={imgSrc}
                alt={title}
                className="max-h-[68vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            )}

            <div className="mt-6 text-center text-white max-w-2xl px-4">
              <p className="text-lush uppercase tracking-[0.3em] text-[10px] font-black mb-1">
                {current.category}
              </p>
              <h3 className="text-2xl font-serif italic text-white">{title}</h3>
              {description && <p className="text-white/70 text-sm mt-2">{description}</p>}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
