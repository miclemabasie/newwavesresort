import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-sand/30 flex flex-col">
      <SEO title="404" noindex />
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-24 text-center">
        <div className="max-w-xl space-y-6">
          <span className="text-lush font-black tracking-[0.4em] uppercase text-[10px] block">
            {t('not_found.tag')}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-volcanic italic">
            {t('not_found.title')}
          </h1>
          <p className="text-volcanic/65 text-lg">{t('not_found.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/" className="btn-primary">
              {t('not_found.back_home')}
            </Link>
            <Link to="/rooms" className="btn-outline">
              {t('not_found.explore_rooms')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
