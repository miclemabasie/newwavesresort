import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { ChefHat, Clock, MapPin, ArrowRight, Sun, Sunset, Moon } from "lucide-react";

export default function AtlanticGastronomy() {
  const { t } = useTranslation();
  const page = t('service_pages.atlantic_gastronomy', { returnObjects: true });
  const { hero, experiences_title, experiences_sub, experiences, menu_title, menu_sub, menuHighlights, view_full_menu, chef_table, testimonials_title, testimonials, cta_title, cta_sub, cta_button } = page;

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
                  <Clock className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">{hero.hours}</span>
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
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200"
                alt="Gourmet dining"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-volcanic/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <ChefHat className="text-lush w-8 h-8 mb-2" />
                <p className="text-xl font-serif italic">"{hero.chef_quote}"</p>
                <p className="text-white/70 mt-2">{hero.chef_name}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dining Experiences */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">{experiences_title}</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">{experiences_sub}</p>
            <div className="grid md:grid-cols-3 gap-8">
              {experiences.map((exp, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">
                      {idx === 0 && <Sun className="w-6 h-6" />}
                      {idx === 1 && <Sunset className="w-6 h-6" />}
                      {idx === 2 && <Moon className="w-6 h-6" />}
                    </div>
                  </div>
                  <h3 className="text-xl font-serif text-volcanic mb-2">{exp.title}</h3>
                  <p className="text-volcanic/60">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Highlights */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">{menu_title}</h2>
          <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">{menu_sub}</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {menuHighlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-sand/40 flex justify-between items-start gap-4"
              >
                <div>
                  <h3 className="text-xl font-serif text-volcanic mb-1">{item.name}</h3>
                  <p className="text-volcanic/60 text-sm">{item.description}</p>
                </div>
                <span className="text-lush font-serif text-lg whitespace-nowrap">{item.price.toLocaleString()} XAF</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/dining/menu" className="inline-flex items-center gap-2 text-lush font-bold uppercase tracking-wider text-sm hover:gap-3 transition-all">
              {view_full_menu} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Chef's Table */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-volcanic rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">{chef_table.title}</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">{chef_table.description}</p>
                <ul className="space-y-3 text-white/80">
                  {chef_table.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-lush w-5 h-5 mt-1 flex-shrink-0">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                  {chef_table.button}
                </button>
              </div>
              <div className="h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0f?auto=format&fit=crop&q=80&w=800" 
                  alt="Chef's table"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">{testimonials_title}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-sand/40">
                <div className="flex text-lush mb-4">{"★".repeat(5)}</div>
                <p className="text-volcanic/80 italic mb-4">"{t.quote}"</p>
                <p className="text-volcanic/60 font-bold">{t.author}</p>
              </div>
            ))}
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