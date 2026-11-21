import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';
import fisiy from '../assets/general/doctorfisiy.jpg';
import { useSiteSettings } from '../hooks/useSiteSettings.js';
import { buildBreadcrumbSchema } from '../lib/seoSchemas.js';
import {
  Star,
  Globe,
  Shield,
  Leaf,
  Eye,
  Heart,
  Award,
  ExternalLink,
  Home as HomeIcon,
  Briefcase,
  HandHeart,
  Compass,
} from 'lucide-react';

export default function OurStory() {
  const { t, i18n } = useTranslation();
  const { settings } = useSiteSettings();
  const isFr = i18n.language?.startsWith('fr');

  const rawMilestones = t('our_story.milestones.items', { returnObjects: true });
  const rawPrograms = t('our_story.programs.programs', { returnObjects: true });
  const rawPhilosophy = t('our_story.philosophy.cards', { returnObjects: true });

  const milestones = Array.isArray(rawMilestones) ? rawMilestones : [];
  const programs = Array.isArray(rawPrograms) ? rawPrograms : [];
  const philosophyCards = Array.isArray(rawPhilosophy) ? rawPhilosophy : [];

  return (
    <div className="flex flex-col min-h-screen bg-sand/20">
      <SEO
        title={`${t('our_story.hero.title')} ${t('our_story.hero.title_italic')}`}
        description={
          isFr
            ? 'Découvrez l’histoire de New Waves Resort à Ngeme, Limbé, du Rév. Alfred Saker à la vision de Dr. Cyprian F. Fisiy et la Fondation Fisiy.'
            : 'Discover the heritage of New Waves Resort in Ngeme, Limbe, from Rev. Alfred Saker to Dr. Cyprian F. Fisiy and the Fisiy Foundation.'
        }
        path="/story"
        schemas={[
          buildBreadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('nav.our_story'), path: '/story' },
          ]),
        ]}
      />
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center pt-16 pb-20 overflow-hidden bg-white">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 items-center gap-16 z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px] mb-6 block">
                {t('our_story.hero.tag')}
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-[1.05] mb-10 tracking-tight">
                {t('our_story.hero.title')} <br />
                <span className="italic text-lush">{t('our_story.hero.title_italic')}</span>
              </h1>

              <div
                className="text-volcanic/80 text-base md:text-lg leading-relaxed mb-8 prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: t('our_story.hero.description') }}
              />

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to="/contact"
                  className="group relative flex items-center justify-center bg-volcanic text-white px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em]">
                    {t('our_story.hero.button')}
                  </span>
                  <div className="absolute inset-0 bg-lush translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="relative h-[460px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
              >
                <img
                  src="/assets/general/image17.jpeg"
                  className="w-full h-full object-cover"
                  alt="New Waves Resort Ngeme View"
                />
              </motion.div>

              {/* Saker Landing Slot (notes.md item 4 — configurable from Admin Integrations) */}
              {settings.saker_landing_image_url ? (
                <div className="bg-sand/40 rounded-3xl p-4 border border-sand flex items-center gap-4">
                  <img
                    src={settings.saker_landing_image_url}
                    alt={t('our_story.saker_landing_title')}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-serif text-volcanic font-bold mb-1">
                      {t('our_story.saker_landing_title')}
                    </h4>
                    <p className="text-xs text-volcanic/70 mb-0">
                      {t('our_story.saker_landing_caption')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-sand/30 rounded-3xl p-5 border border-sand flex items-start gap-4">
                  <Compass className="w-6 h-6 text-lush shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-serif text-volcanic font-bold mb-1">
                      {t('our_story.saker_landing_title')}
                    </h4>
                    <p className="text-xs text-volcanic/65 mb-0">
                      {t('our_story.saker_landing_caption')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/4 h-full bg-sand/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
        </section>

        {/* IMPACT NUMBERS */}
        <section className="py-20 bg-volcanic text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              <StatCard
                value={t('our_story.impact_stats.title')}
                label={t('our_story.impact_stats.label')}
                detail={t('our_story.impact_stats.detail')}
              />
              <StatCard
                value={t('our_story.impact_stats.jobs')}
                label={t('our_story.impact_stats.jobs_label')}
                detail={t('our_story.impact_stats.jobs_detail')}
              />
              <StatCard
                value={t('our_story.impact_stats.scholarships')}
                label={t('our_story.impact_stats.scholarships_label')}
                detail={t('our_story.impact_stats.scholarships_detail')}
              />
              <StatCard
                value={t('our_story.impact_stats.mangroves')}
                label={t('our_story.impact_stats.mangroves_label')}
                detail={t('our_story.impact_stats.mangroves_detail')}
              />
            </div>
            <p className="text-white/50 text-center text-sm max-w-2xl mx-auto mt-16 italic">
              {t('our_story.impact_tagline')}
            </p>
          </div>
        </section>

        {/* THE VISION */}
        <section className="py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">
                {t('our_story.vision.tag')}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">
                {t('our_story.vision.title')}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <VisionCard
                icon={<Eye className="w-12 h-12 text-lush mb-6" />}
                title={t('our_story.vision.resort_title')}
                desc={t('our_story.vision.resort_desc')}
              />
              <VisionCard
                icon={<Heart className="w-12 h-12 text-lush mb-6" />}
                title={t('our_story.vision.foundation_title')}
                desc={t('our_story.vision.foundation_desc')}
              />
            </div>
          </div>
        </section>

        {/* FOUNDER'S STORY */}
        <section className="py-28 bg-sand/10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">
                {t('our_story.founder.tag')}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">
                {t('our_story.founder.name')}
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30">
                  <img
                    src={fisiy}
                    alt="Dr. Cyprian F. Fisiy"
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-lush text-volcanic p-6 rounded-full shadow-xl">
                  <Award className="w-8 h-8" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg text-volcanic/80"
              >
                <Trans
                  i18nKey="our_story.founder.bio"
                  components={{ span: <span className="text-2xl font-serif text-lush" /> }}
                />
                <div className="flex items-center gap-4 text-volcanic mt-6">
                  <div className="w-12 h-px bg-lush/50" />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    {t('our_story.founder.signature')}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROGRAMS */}
        <section className="py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">
                {t('our_story.programs.tag')}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">
                {t('our_story.programs.title')}
              </h2>
              <p className="text-volcanic/60 text-lg max-w-2xl mx-auto mt-6">
                {t('our_story.programs.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {programs.map((program, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-sand/10 p-10 rounded-[2rem] border border-sand/50 hover:shadow-xl transition-all"
                >
                  <div className="mb-8 p-4 bg-lush/10 rounded-2xl inline-block">
                    {i === 0 && <HomeIcon className="w-8 h-8 text-lush" />}
                    {i === 1 && <Briefcase className="w-8 h-8 text-lush" />}
                    {i === 2 && <HandHeart className="w-8 h-8 text-lush" />}
                  </div>
                  <h3 className="text-2xl font-serif text-volcanic mb-4">{program.title}</h3>
                  <p className="text-volcanic/70 leading-relaxed mb-8">{program.description}</p>
                  <a
                    href={program.link || 'https://fisiyfoundation.org/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lush font-medium hover:text-volcanic transition-colors group"
                  >
                    <span>{program.link_text}</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MILESTONES TIMELINE */}
        <section className="py-28 bg-sand/10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">
                {t('our_story.milestones.tag')}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">
                {t('our_story.milestones.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -15 }}
                  className="relative group bg-volcanic rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-volcanic via-volcanic/40 to-transparent" />

                  <div className="absolute bottom-0 p-8 text-white w-full">
                    <span className="text-lush font-serif text-5xl block mb-4 italic">{item.year}</span>
                    <h4 className="text-2xl font-serif mb-4 tracking-wide text-white">{item.title}</h4>
                    <p className="text-sm text-white/80 leading-relaxed font-light group-hover:text-white transition-colors duration-300 line-clamp-6">
                      {item.fullStory}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-6xl font-serif text-volcanic mb-10 leading-tight">
                  {t('our_story.philosophy.title')} <br />
                  <span className="italic text-lush">{t('our_story.philosophy.title_italic')}</span>
                </h2>
                <p className="text-volcanic/70 leading-relaxed text-xl font-medium mb-8">
                  {t('our_story.philosophy.description')}
                </p>
                <p className="text-volcanic/60 leading-relaxed text-lg font-light">
                  {t('our_story.philosophy.subdescription')}
                </p>
              </div>

              <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
                {philosophyCards.map((card, i) => (
                  <PhilosophyCard
                    key={i}
                    icon={
                      i === 0 ? (
                        <Shield className="text-lush w-6 h-6" />
                      ) : i === 1 ? (
                        <Leaf className="text-lush w-6 h-6" />
                      ) : i === 2 ? (
                        <Globe className="text-lush w-6 h-6" />
                      ) : (
                        <Star className="text-lush w-6 h-6" />
                      )
                    }
                    title={card.title}
                    desc={card.desc}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

function StatCard({ value, label, detail }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center group"
    >
      <div className="text-5xl md:text-6xl font-serif text-lush mb-3 group-hover:scale-110 transition-transform duration-500">
        {value}
      </div>
      <div className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
        {label}
      </div>
      <p className="text-white/40 text-xs max-w-[160px] mx-auto leading-relaxed">{detail}</p>
    </motion.div>
  );
}

function VisionCard({ icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-sand/15 p-12 rounded-[3rem] border border-sand/40"
    >
      {icon}
      <h3 className="text-3xl font-serif text-volcanic mb-6">{title}</h3>
      <p className="text-volcanic/70 text-lg leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function PhilosophyCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-sand/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-serif text-volcanic mb-4">{title}</h3>
      <p className="text-sm text-volcanic/60 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
