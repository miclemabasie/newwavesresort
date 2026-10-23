import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

// 👇 PASTE YOUR CLOUDINARY LINKS HERE
const VIDEO_URL  = "https://res.cloudinary.com/onuna2fn/video/upload/v1792764145/newwavesresort.mp4";
const POSTER_URL = "https://res.cloudinary.com/onuna2fn/video/upload/so_0,q_auto,f_auto,w_1600/v1792764145/newwavesresort.jpg";

export default function VideoExperience() {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted]     = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else          { v.pause(); setIsPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-volcanic overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="container mx-auto px-6 lg:max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
            {t('video_experience.tag', 'Experience in Motion')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white italic leading-tight">
            {t('video_experience.title', 'A Glimpse of the')}{' '}
            <span className="text-lush not-italic">
              {t('video_experience.title_accent', 'Experience')}
            </span>
          </h2>
        </div>

        {/* Video frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group"
        >
          <video
            ref={videoRef}
            className="w-full h-full aspect-video object-cover"
            src={VIDEO_URL}
            poster={POSTER_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>

          {/* Bottom gradient for control contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-volcanic/60 via-transparent to-transparent pointer-events-none" />

          {/* Controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-lush hover:border-lush transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-lush hover:border-lush transition-all"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}