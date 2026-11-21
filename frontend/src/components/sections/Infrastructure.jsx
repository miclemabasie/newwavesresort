import { useTranslation } from 'react-i18next';
import ServiceCard from '../ui/ServiceCard';

const defaultRoutes = ['/experiences', '/rooms', '/contact'];

export default function Infrastructure() {
  const { t } = useTranslation();
  const rawFeatures = t('infrastructure.features', { returnObjects: true });
  const features = Array.isArray(rawFeatures) ? rawFeatures : [];

  return (
    <section className="bg-ocean py-24">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-white font-serif italic mb-4">{t('infrastructure.title')}</h2>
          <p className="text-white/70 max-w-2xl">{t('infrastructure.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <ServiceCard
              key={f.title || idx}
              title={f.title}
              description={f.description}
              icon={f.icon}
              to={f.to || defaultRoutes[idx % defaultRoutes.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
