import React from "react";
import { useTranslation } from 'react-i18next';
import ServiceDiscoveryCard from "../ui/ServiceDiscoveryCard";

export default function ServiceGrid() {
  const { t } = useTranslation();
  const services = t('service_grid.services', { returnObjects: true });

  return (
    <section className="container mx-auto py-24 bg-sand lg:max-w-7xl px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
          <span className="text-lush font-black tracking-[0.4em] uppercase text-[10px]">
            {t('service_grid.section_tag')}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-volcanic leading-tight">
            {t('service_grid.title')} <br />
            <span className="italic">{t('service_grid.title_italic')}</span>
          </h2>
        </div>
        <p className="text-volcanic/60 max-w-sm pb-2 text-sm leading-relaxed">
          {t('service_grid.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceDiscoveryCard 
            key={index} 
            title={service.title} 
            subtitle={service.subtitle} 
            category={service.category} 
            image={service.image} 
            to={service.to} 
          />
        ))}
      </div>
    </section>
  );
}