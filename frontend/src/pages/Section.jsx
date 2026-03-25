import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { ArrowUpRight, Waves, Wind, Leaf, Mic2, Utensils, PlaneTakeoff, Car, Compass, BookOpen, Wifi, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const services = t('services.service_list', { returnObjects: true });

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero Header */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block"
            >
              {t('services.hero.tag')}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-8xl font-serif text-volcanic leading-tight mb-8"
            >
              {t('services.hero.title')} <span className="italic text-lush">{t('services.hero.title_italic')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-volcanic/70 text-xl max-w-2xl leading-relaxed"
            >
              {t('services.hero.description')}
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-sand/50 shadow-lg hover:shadow-2xl transition-all duration-500 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-lush/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-volcanic/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-lush shadow-lg">
                    {/* Icon placeholder - we could map based on id */}
                    {service.id === 'intellectual-talks' && <Mic2 className="w-8 h-8" />}
                    {service.id === 'dining' && <Utensils className="w-8 h-8" />}
                    {service.id === 'transfers' && <PlaneTakeoff className="w-8 h-8" />}
                    {service.id === 'expeditions' && <Compass className="w-8 h-8" />}
                    {service.id === 'fleet' && <Car className="w-8 h-8" />}
                    {service.id === 'library' && <BookOpen className="w-8 h-8" />}
                  </div>
                </div>

                <div className="p-10 relative z-20">
                  <span className="text-lush font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
                    {service.category}
                  </span>
                  <h3 className="text-2xl font-serif text-volcanic mb-4 group-hover:text-lush transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-volcanic/60 leading-relaxed text-sm mb-8">
                    {service.description}
                  </p>
                  
                  <Link 
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-volcanic font-black uppercase tracking-widest text-[9px] border-b border-lush pb-2 group-hover:gap-4 transition-all group-hover:text-lush"
                  >
                    {t('common.learn_more')} <ArrowUpRight className="w-4 h-4 text-lush group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bespoke Concierge Section */}
        <section className="container mx-auto px-6 mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-volcanic rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px), 
                                radial-gradient(circle at 80% 70%, #7aa65a 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
            
            <div className="absolute top-0 right-0 opacity-10">
              <Waves className="w-96 h-96 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 opacity-10 rotate-12">
              <Wind className="w-80 h-80 text-lush/30" />
            </div>
            <div className="absolute top-1/2 left-1/4 opacity-5">
              <Leaf className="w-40 h-40 text-lush" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
                {t('services.bespoke.title')}
              </h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                {t('services.bespoke.description')}
              </p>
              <button onClick={() => navigate('/contact')} className="bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-white hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                {t('services.bespoke.button')}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Service Philosophy */}
        <section className="container mx-auto px-6 mt-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
                {t('services.philosophy.tag')}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">
                {t('services.philosophy.title')} <span className="italic text-lush">{t('services.philosophy.title_italic')}</span>
              </h2>
              <p className="text-volcanic/70 text-lg leading-relaxed">
                {t('services.philosophy.description')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand/40 text-center">
                <Wifi className="w-8 h-8 text-lush mx-auto mb-4" />
                <div className="text-2xl font-serif text-volcanic">{t('services.philosophy.badges.wifi')}</div>
                <div className="text-xs text-volcanic/50 uppercase tracking-wider">{t('services.philosophy.badges.wifi_sub')}</div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand/40 text-center">
                <ShieldCheck className="w-8 h-8 text-lush mx-auto mb-4" />
                <div className="text-2xl font-serif text-volcanic">{t('services.philosophy.badges.security')}</div>
                <div className="text-xs text-volcanic/50 uppercase tracking-wider">{t('services.philosophy.badges.security_sub')}</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}