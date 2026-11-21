import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import Footer from '../../components/sections/Footer';
import { buildBreadcrumbSchema } from '../../lib/seoSchemas.js';
import { Compass, Map, Calendar, ArrowRight, Shield } from 'lucide-react';

export default function VolcanicExpeditions() {
  const { t } = useTranslation();
  const page = t('service_pages.volcanic_expeditions', { returnObjects: true }) || {};
  const {
    hero = {},
    expeditions_title,
    expeditions_sub,
    expeditions = [],
    guides_title,
    guides = [],
    cta_title,
    cta_sub,
    cta_button,
  } = page;

  return (
    <div className="bg-sand/30 min-h-screen">
      <SEO
        title={hero.title || 'Volcanic Expeditions'}
        description={hero.description}
        path="/services/expeditions"
        schemas={[
          buildBreadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('nav.experiences'), path: '/experiences' },
            { name: hero.title || 'Volcanic Expeditions', path: '/services/expeditions' },
          ]),
        ]}
      />
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">{hero.tag}</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">{hero.title}</h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">{hero.description}</p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">{hero.subdescription}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Compass className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.badge_private}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.badge_safety}</span>
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
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200"
                alt="Mount Cameroon"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">{expeditions_title}</h2>
          <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">{expeditions_sub}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {(Array.isArray(expeditions) ? expeditions : []).map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-sand/40"
              >
                <img src={exp.image} alt={exp.title} loading="lazy" className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-serif text-volcanic mb-2">{exp.title}</h3>
                  <div className="flex justify-between text-sm text-volcanic/60 mb-4">
                    <span className="flex items-center gap-1">
                      <Map className="w-4 h-4" /> {exp.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {exp.duration}
                    </span>
                  </div>
                  <Link
                    to="/contact"
                    className="text-lush font-bold uppercase tracking-wider text-xs inline-flex items-center gap-1 group"
                  >
                    {t('common.learn_more')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-sand/40">
            <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">{guides_title}</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
              {(Array.isArray(guides) ? guides : []).map((guide, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <img
                    src={guide.image}
                    alt={guide.name}
                    loading="lazy"
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-lush/20"
                  />
                  <h3 className="text-xl font-serif text-volcanic">{guide.name}</h3>
                  <p className="text-lush font-medium">{guide.specialty}</p>
                  <p className="text-volcanic/60 text-sm">{guide.experience}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">{cta_title}</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">{cta_sub}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all"
            >
              {cta_button} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
