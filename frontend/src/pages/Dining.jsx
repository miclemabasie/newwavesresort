import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { Search, Coffee, UtensilsCrossed, Wine, Cookie, Sparkles, Leaf, X } from "lucide-react";

export default function Dining() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilters, setDietaryFilters] = useState({
    vegan: false,
    "gluten-free": false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: "all", label: t('dining.filters.all'), icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: "appetizers", label: t('dining.filters.appetizers'), icon: <Sparkles className="w-4 h-4" /> },
    { id: "mains", label: t('dining.filters.mains'), icon: <Coffee className="w-4 h-4" /> },
    { id: "desserts", label: t('dining.filters.desserts'), icon: <Cookie className="w-4 h-4" /> },
    { id: "drinks", label: t('dining.filters.drinks'), icon: <Wine className="w-4 h-4" /> },
  ];

  const menuItems = t('dining.menuItems', { returnObjects: true });

  const handleCategoryChange = (categoryId) => {
    setFilter(categoryId);
    setSearchQuery("");
  };

  const toggleDietary = (diet) => {
    setDietaryFilters((prev) => ({ ...prev, [diet]: !prev[diet] }));
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (filter !== "all" && item.category !== filter) return false;

      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      const activeDiets = Object.keys(dietaryFilters).filter((d) => dietaryFilters[d]);
      if (activeDiets.length > 0) {
        return activeDiets.some((diet) => item.dietary.includes(diet));
      }

      return true;
    });
  }, [filter, searchQuery, dietaryFilters, menuItems]);

  return (
    <div className="min-h-screen bg-sand/30">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="container mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">
              {t('dining.section_tag')}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
              {t('dining.title')} <br />
              <span className="italic text-lush">{t('dining.title_italic')}</span>
            </h1>
            <p className="text-volcanic/70 text-xl max-w-2xl leading-relaxed">
              {t('dining.description')}
            </p>
          </motion.div>
        </section>

        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all ${
                    filter === cat.id
                      ? "bg-lush border-lush text-volcanic font-bold"
                      : "bg-white border-sand/60 text-volcanic/70 hover:border-lush/50"
                  }`}
                >
                  {cat.icon}
                  <span className="text-xs uppercase tracking-wider">{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic/40" />
                <input
                  type="text"
                  placeholder={t('dining.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-sand/60 bg-white text-volcanic placeholder:text-volcanic/40 focus:outline-none focus:border-lush"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-sand/60 bg-white text-volcanic/70 hover:border-lush"
              >
                <Leaf className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">{t('dining.filters.dietary')}</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 p-6 bg-white rounded-2xl border border-sand/60 flex flex-wrap gap-4">
                  <span className="text-sm font-bold text-volcanic/60 uppercase tracking-wider">Filter by:</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietaryFilters.vegan}
                      onChange={() => toggleDietary("vegan")}
                      className="w-4 h-4 text-lush border-sand rounded focus:ring-lush"
                    />
                    <span className="text-sm">{t('dining.filters.vegan')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietaryFilters["gluten-free"]}
                      onChange={() => toggleDietary("gluten-free")}
                      className="w-4 h-4 text-lush border-sand rounded focus:ring-lush"
                    />
                    <span className="text-sm">{t('dining.filters.gluten_free')}</span>
                  </label>
                  {(dietaryFilters.vegan || dietaryFilters["gluten-free"]) && (
                    <button
                      onClick={() => setDietaryFilters({ vegan: false, "gluten-free": false })}
                      className="ml-auto text-volcanic/50 hover:text-lush"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="container mx-auto px-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-volcanic/50 text-lg">{t('dining.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white rounded-[2rem] overflow-hidden border border-sand/50 shadow-sm hover:shadow-2xl transition-all"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-volcanic/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        {item.dietary.includes("vegan") && (
                          <span className="bg-lush/90 backdrop-blur-sm text-volcanic text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Vegan</span>
                        )}
                        {item.dietary.includes("gluten-free") && (
                          <span className="bg-lush/90 backdrop-blur-sm text-volcanic text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">GF</span>
                        )}
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-serif text-volcanic group-hover:text-lush transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-lush font-serif text-lg">{item.price.toLocaleString()} XAF</span>
                      </div>
                      <p className="text-volcanic/60 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        <section className="container mx-auto px-6 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-volcanic rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, #7aa65a 2px, transparent 2px)`,
              backgroundSize: '40px 40px'
            }} />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif mb-6 italic">{t('dining.chef_note_title')}</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {t('dining.chef_note_quote')}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-px bg-lush/50" />
                <span className="text-lush font-bold uppercase tracking-widest text-xs">{t('dining.chef_note_signature')}</span>
                <div className="w-12 h-px bg-lush/50" />
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}