import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDailyMenu } from '../../hooks/useDailyMenu.js';
import { useCurrency } from '../../context/currencyHelpers.js';

export default function Culinary() {
  const { t, i18n } = useTranslation();
  const { dailyMenu, catalogItems } = useDailyMenu();
  const { formatPrice } = useCurrency();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const todayDishes = (dailyMenu?.entries || [])
    .filter((e) => e.is_available && e.menu_item)
    .map((e) => ({
      ...e.menu_item,
      effective_price: e.daily_price_override ?? e.menu_item.price_xaf,
    }));

  const featuredDishes = (todayDishes.length > 0 ? todayDishes : catalogItems).slice(0, 3);

  return (
    <section className="container py-24 bg-white rounded-t-[3rem] -mt-12 relative z-40">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative group overflow-hidden rounded-2xl">
          <img
            src="/assets/general/image1.jpeg"
            alt="Cameroonian Coastal Gastronomy"
            loading="lazy"
            className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ocean/10 group-hover:bg-transparent transition-colors" />
        </div>

        <div>
          <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">
            {t('culinary.section_tag')}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-volcanic">
            {t('culinary.title')}
          </h2>

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
            {featuredDishes.map((dish) => {
              const name = lang === 'fr' ? dish.name_fr : dish.name_en;
              const desc = lang === 'fr' ? dish.description_fr : dish.description_en;
              const price = dish.effective_price ?? dish.price_xaf;
              return (
                <div key={dish.id || dish.slug} className="flex justify-between items-start border-b border-sand pb-6 gap-4">
                  <div>
                    <h4 className="text-ocean font-bold">{name}</h4>
                    <p className="text-xs text-volcanic/60 mt-1 italic">{desc}</p>
                  </div>
                  <span className="font-serif italic text-ocean whitespace-nowrap">
                    {formatPrice(price)}
                  </span>
                </div>
              );
            })}
          </div>

          <Link to="/services/dining" className="btn-outline hover:text-lush hover:outline-lush mt-12 inline-block">
            {t('culinary.button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
