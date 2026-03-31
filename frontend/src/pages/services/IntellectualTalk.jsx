

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { Mic2, Calendar, Users, MapPin, Star, ArrowRight, Quote, Youtube, Play, X, Clock, BookOpen, Globe, Award, Eye } from "lucide-react";

export default function IntellectualTalks() {
  const { t } = useTranslation();
  const page = t('service_pages.intellectual_talks', { returnObjects: true });
  const { hero, experience_title, experience_sub, experience_features, past_talks_title, past_talks_sub, upcoming_title, upcoming_sub, upcoming_events, free_note, why_title, why_text, why_text2, why_text3, stats, cta_title, cta_sub, cta_button, youtube_button } = page;

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAllTalks, setShowAllTalks] = useState(false);

  const pastTalks = t('service_pages.intellectual_talks.pastTalks', { returnObjects: true }) || [];
  const displayedTalks = showAllTalks ? pastTalks : pastTalks.slice(0, 3);

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">{hero.tag}</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">{hero.title}</h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">{hero.description}</p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">{hero.subdescription}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.schedule}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.archive}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://www.goodthingsguy.com/wp-content/uploads/2023/02/1677225977116.jpeg"
                alt="Intellectual Talk"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-volcanic/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-lush font-bold text-sm mb-2">FEATURED MOMENT</p>
                <p className="text-xl font-serif italic">"{hero.featured_quote}"</p>
                <p className="text-white/70 mt-2">{hero.featured_speaker}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Experience */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6 text-center">{experience_title}</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-3xl mx-auto mb-12">{experience_sub}</p>
            <div className="grid md:grid-cols-3 gap-8">
              {experience_features.map((feat, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    {idx === 0 && <Users className="w-8 h-8 text-lush" />}
                    {idx === 1 && <Globe className="w-8 h-8 text-lush" />}
                    {idx === 2 && <BookOpen className="w-8 h-8 text-lush" />}
                  </div>
                  <h3 className="text-xl font-serif text-volcanic mb-3">{feat.title}</h3>
                  <p className="text-volcanic/60">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Talks */}
        <section className="container mx-auto px-6 mb-20">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic">{past_talks_title}</h2>
              <p className="text-volcanic/60 text-lg mt-2">{past_talks_sub}</p>
            </div>
            {pastTalks.length > 3 && (
              <button onClick={() => setShowAllTalks(!showAllTalks)} className="flex items-center gap-2 text-lush font-bold uppercase tracking-wider text-sm hover:gap-3 transition-all">
                {showAllTalks ? t('service_pages.intellectual_talks.show_less') : t('service_pages.intellectual_talks.view_all')} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {pastTalks.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-16 text-center border border-sand/40">
              <Youtube className="w-16 h-16 text-lush/30 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-volcanic mb-3">{t('service_pages.intellectual_talks.coming_soon.title')}</h3>
              <p className="text-volcanic/50 text-lg max-w-md mx-auto mb-6">{t('service_pages.intellectual_talks.coming_soon.description')}</p>
              <button className="bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
                {t('common.get_notified')}
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedTalks.map((talk, idx) => (
                  <motion.div
                    key={talk.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-[2rem] overflow-hidden border border-sand/40 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                    onClick={() => setSelectedVideo(talk)}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img src={talk.image} alt={talk.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-volcanic/30 group-hover:bg-volcanic/50 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-lush rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-volcanic ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {talk.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lush text-xs font-bold">{talk.date}</span>
                        <span className="text-volcanic/30">•</span>
                        <span className="text-volcanic/50 text-xs">{talk.views} views</span>
                      </div>
                      <h3 className="text-xl font-serif text-volcanic mb-2 line-clamp-2">{talk.title}</h3>
                      <p className="text-volcanic/70 font-medium mb-1">{talk.speaker}</p>
                      <p className="text-volcanic/50 text-sm mb-4">{talk.speakerTitle}</p>
                      <p className="text-volcanic/60 text-sm line-clamp-3">{talk.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {!showAllTalks && pastTalks.length > 3 && (
                <div className="text-center mt-12">
                  <button onClick={() => setShowAllTalks(true)} className="inline-flex items-center gap-2 bg-volcanic text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-lush transition-colors">
                    {t('service_pages.intellectual_talks.load_all', { count: pastTalks.length })} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Upcoming Events */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-volcanic rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 text-center">{upcoming_title}</h2>
              <p className="text-white/60 text-lg text-center max-w-2xl mx-auto mb-12">{upcoming_sub}</p>
              <div className="space-y-4 max-w-3xl mx-auto">
                {upcoming_events.map((event, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-white/20">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-lush font-bold text-sm">{event.date}</span>
                      </div>
                      <h3 className="text-xl font-serif text-white mb-1">{event.topic}</h3>
                      <p className="text-white/70">with {event.speaker}</p>
                    </div>
                    <button className="bg-lush text-volcanic px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors whitespace-nowrap">
                      {t('common.reserve_seat')}
                    </button>
                  </motion.div>
                ))}
              </div>
              <p className="text-white/40 text-center mt-8 text-sm max-w-2xl mx-auto">{free_note}</p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">{t('service_pages.intellectual_talks.why_title')}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">{why_title}</h2>
              <p className="text-volcanic/70 text-lg leading-relaxed mb-6">{why_text}</p>
              <p className="text-volcanic/70 text-lg leading-relaxed mb-6">{why_text2}</p>
              <p className="text-volcanic/70 text-lg leading-relaxed">{why_text3}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Award className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">{stats.talks}</div>
                <div className="text-xs text-volcanic/50">{stats.talks_label}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Users className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">{stats.attendees}</div>
                <div className="text-xs text-volcanic/50">{stats.attendees_label}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Globe className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">{stats.countries}</div>
                <div className="text-xs text-volcanic/50">{stats.countries_label}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Youtube className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">{stats.views}</div>
                <div className="text-xs text-volcanic/50">{stats.views_label}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">{cta_title}</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">{cta_sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
                {cta_button} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://youtube.com/@ngemeresort" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border-2 border-volcanic text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
                <Youtube className="w-4 h-4" /> {youtube_button}
              </a>
            </div>
          </div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-volcanic/80 backdrop-blur-lg" onClick={() => setSelectedVideo(null)}>
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-[2rem] max-w-4xl w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-10 bg-volcanic text-white p-2 rounded-full hover:bg-lush transition-colors"><X className="w-5 h-5" /></button>
                  <div className="relative pt-[56.25%] bg-black">
                    <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`} title={selectedVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif text-volcanic mb-2">{selectedVideo.title}</h3>
                    <p className="text-lush font-medium mb-1">{selectedVideo.speaker}</p>
                    <p className="text-volcanic/50 text-sm mb-4">{selectedVideo.date} • {selectedVideo.duration}</p>
                    <p className="text-volcanic/70">{selectedVideo.description}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}