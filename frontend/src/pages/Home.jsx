import { useTranslation } from 'react-i18next';
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

export default function Home() {
  const { i18n } = useTranslation();
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
      <ImpactSection />
      <Values />
      <Principles />
      <Infrastructure />
      <ServiceGrid />
      <Facilities />
      <VideoExperience />
      <OceanSide />
      <Cultinary />
      <Suites />
      <GalleryPreview />
      <Testimonials />
      <Partnerships />

      <Footer />
    </div>
  );
}
