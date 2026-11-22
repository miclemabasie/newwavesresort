import { useTranslation } from 'react-i18next';
import { Leaf, Wifi, Compass, HeartHandshake } from 'lucide-react';
import SEO from '../components/SEO';
import { buildResortSchema } from '../lib/seoSchemas.js';
import { useSiteSettings } from '../hooks/useSiteSettings.js';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ImpactSection from '../components/sections/ImpactSection';
import Infrastructure from '../components/sections/Infrastructure';
import Cultinary from '../components/sections/Cultinary';
import Suites from '../components/sections/Suites';
import GalleryPreview from '../components/sections/GalleryPreview';
import Partnerships from '../components/sections/Partnerships';
import Footer from '../components/sections/Footer';
import Testimonials from '../components/sections/Testimonials';
import Principles from '../components/sections/Principles';
import Facilities from '../components/sections/Facilities';
import Values from '../components/sections/Values';
import ServiceGrid from '../components/sections/ServiceGrid';
import OceanSide from '../components/sections/OceanSide';
import VideoExperience from '../components/sections/VideoExperience';

const HIGHLIGHT_KEYS = [
  { key: 'organic', icon: Leaf },
  { key: 'connectivity', icon: Wifi },
  { key: 'transfer', icon: Compass },
  { key: 'impact', icon: HeartHandshake },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const { settings } = useSiteSettings();
  const isFr = i18n.language?.startsWith('fr');

  return (
    <div className="min-h-screen selection:bg-ocean selection:text-white bg-sand">
      <SEO
        title={isFr ? 'Sanctuaire Côtier de Luxe à Limbé' : 'Luxury Coastal Sanctuary in Limbe, Cameroon'}
        description={
          isFr
            ? 'New Waves Resort à Ngeme, Limbé : suites 1 à 3 chambres, gastronomie biologique atlantique, infrastructure professionnelle et impact social avec la Fondation Fisiy.'
            : 'New Waves Resort in Ngeme, Limbe: 1- to 3-bedroom oceanfront suites, 100% organic Atlantic gastronomy, executive infrastructure, and social impact with the Fisiy Foundation.'
        }
        path="/"
        schemas={[
          buildResortSchema({
            phone: settings.contact_phone,
            email: settings.contact_email,
          }),
        ]}
      />
      <Navbar />

      <Hero />

      {/* Coastal Signature Strip */}
      <section className="bg-ivory border-b border-sand py-8">
        <div className="container mx-auto px-6 lg:max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-sand">
            {HIGHLIGHT_KEYS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="flex items-center gap-3.5 lg:px-6 first:lg:pl-0 last:lg:pr-0"
                >
                  <div className="w-10 h-10 rounded-full bg-lush/15 text-lush flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm font-bold text-midnight mb-0 leading-tight">
                      {t(`home_highlights.${item.key}.title`)}
                    </p>
                    <p className="text-[11px] text-volcanic/60 mb-0 truncate">
                      {t(`home_highlights.${item.key}.subtitle`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Suites />
      <Cultinary />
      <VideoExperience />
      <ServiceGrid />
      <ImpactSection />
      <Values />
      <Principles />
      <Facilities />
      <Infrastructure />
      <GalleryPreview />
      <Testimonials />
      <OceanSide />
      <Partnerships />

      <Footer />
    </div>
  );
}
