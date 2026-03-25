import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { BookOpen, Search, Globe, Clock, Users, Award, ArrowRight, BookMarked } from "lucide-react";

export default function FisiyLibrary() {
  const { t } = useTranslation();
  const page = t('service_pages.fisiy_library', { returnObjects: true });
  const { hero, collection_title, collection_sub, collection_highlights, services_title, services, residency, cta_title, cta_sub, cta_button } = page;

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
                  <Clock className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.audience}</span>
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
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200"
                alt="Library interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Collection Highlights */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">{collection_title}</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">{collection_sub}</p>
            <div className="grid md:grid-cols-4 gap-8">
              {collection_highlights.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">
                      {idx === 0 && <BookOpen className="w-8 h-8" />}
                      {idx === 1 && <BookMarked className="w-8 h-8" />}
                      {idx === 2 && <BookOpen className="w-8 h-8" />}
                      {idx === 3 && <Award className="w-8 h-8" />}
                    </div>
                  </div>
                  <h3 className="text-lg font-serif text-volcanic mb-1">{item.title}</h3>
                  <p className="text-lush font-bold">{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Library Services */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-12 text-center">{services_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-sand/40 text-center"
              >
                <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-lush">
                    {idx === 0 && <Search className="w-6 h-6" />}
                    {idx === 1 && <Globe className="w-6 h-6" />}
                    {idx === 2 && <Users className="w-6 h-6" />}
                  </div>
                </div>
                <h3 className="text-xl font-serif text-volcanic mb-2">{s.title}</h3>
                <p className="text-volcanic/60">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Residency Info */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-volcanic rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">{residency.title}</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">{residency.description}</p>
                <ul className="space-y-3 text-white/80">
                  {residency.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <button className="mt-8 bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                  {residency.button}
                </button>
              </div>
              <div className="h-[300px] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" 
                  alt="Reading room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">{cta_title}</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">{cta_sub}</p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              {cta_button} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}