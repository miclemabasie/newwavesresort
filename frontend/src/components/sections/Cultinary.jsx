import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Culinary() {
  const { t } = useTranslation();
  const dishes = t('culinary.dishes', { returnObjects: true });

  return (
    <section className="container py-24 bg-white rounded-t-[3rem] -mt-12 relative z-40">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative group overflow-hidden rounded-2xl">
          <img 
            src="https://buyam.co/storage/products/medium_507c6d52-0ba8-43a5-b8bd-d4ed94fd5b8a.png" 
            alt="Cameroonian Coastal Gastronomy" 
            className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ocean/10 group-hover:bg-transparent transition-colors" />
        </div>

        <div>
          <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">{t('culinary.section_tag')}</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-volcanic">{t('culinary.title')}</h2>
          
          <p className="text-volcanic/70 text-lg leading-relaxed mb-6">
            {t('culinary.description')}
          </p>

          <div className="mb-10 space-y-2">
            <p className="text-lush font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span>✦</span> {t('culinary.badges.organic')}
            </p>
            <p className="text-ocean font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span>✦</span> {t('culinary.badges.cooking_classes')}
            </p>
          </div>

          <div className="space-y-8">
            {dishes.map((dish, i) => (
              <div key={i} className="flex justify-between items-start border-b border-sand pb-6">
                <div>
                  <h4 className="text-ocean font-bold">{dish.name}</h4>
                  <p className="text-xs text-volcanic/60 mt-1 italic">{dish.desc}</p>
                </div>
                <span className="font-serif italic text-ocean">{dish.price}</span>
              </div>
            ))}
          </div>
          
          <Link to="/dining" className="btn-outline hover:text-lush hover:outline-lush mt-12 inline-block">{t('culinary.button')}</Link>
        </div>
      </div>
    </section>
  );
}