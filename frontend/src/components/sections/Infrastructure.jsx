import { useTranslation } from 'react-i18next';
import ServiceCard from "../ui/ServiceCard";

export default function Infrastructure() {
  const { t } = useTranslation();
  const features = t('infrastructure.features', { returnObjects: true });

  return (
    <section className="bg-ocean py-24">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-white font-serif italic mb-4">{t('infrastructure.title')}</h2>
          <p className="text-white/70 max-w-2xl">{t('infrastructure.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <ServiceCard key={f.title} title={f.title} description={f.description} icon={f.icon} to={f.to} />
          ))}
        </div>
      </div>
    </section>
  );
}