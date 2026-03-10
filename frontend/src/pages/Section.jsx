import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { 
  Waves, 
  PlaneTakeoff, 
  Car, 
  Compass, 
  Utensils, 
  Mic2, 
  ShieldCheck, 
  Wifi,
  ArrowUpRight,
  Wind,
  Leaf,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "intellectual-talks",
    title: "Ocean-Side Intellectual Talks",
    category: "Thought Leadership",
    icon: <Mic2 className="w-8 h-8" />,
    description: "Curated evening dialogues under the stars. We bring together global thinkers and local leaders to discuss governance, tech, and the future of Africa.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "dining",
    title: "Atlantic Gastronomy",
    category: "Dining",
    icon: <Utensils className="w-8 h-8" />,
    description: "Farm-to-table excellence. Our chefs use volcanic-soil produce and fresh Atlantic catch to redefine Cameroonian fine dining.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "transfers",
    title: "Diplomatic Transfers",
    category: "Transport",
    icon: <PlaneTakeoff className="w-8 h-8" />,
    description: "Seamless airport pickups from Douala International. We handle the logistics so your transition from the world to the sanctuary is effortless.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "expeditions",
    title: "Volcanic Expeditions",
    category: "Exploration",
    icon: <Compass className="w-8 h-8" />,
    description: "Private guided tours to Mount Cameroon and the historic sites of Bimbia. Adventure rooted in deep geographical and social history.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "fleet",
    title: "Premium Fleet",
    category: "Mobility",
    icon: <Car className="w-8 h-8" />,
    description: "Chauffeur-driven or private luxury rentals. High-clearance vehicles maintained to international standards for your regional travels.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "library",
    title: "The Fisiy Research Library",
    category: "Knowledge Hub",
    icon: <BookOpen className="w-8 h-8" />,
    description: "A private collection of African literature, law, and social science. A quiet sanctuary for deep work, research, and cross-continental dialogue.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000"
  },
];

export default function Services() {
  const navigate = useNavigate();
  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero Header */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block"
            >
              The Service Protocol
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-8xl font-serif text-volcanic leading-tight mb-8"
            >
              Seamless <span className="italic text-lush">Infrastructure</span><br />for the Global Mind.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-volcanic/70 text-xl max-w-2xl leading-relaxed"
            >
              At Ngeme Resort, service is a silent partner to your productivity. We provide the 
              logistics, security, and nourishment required for high-stakes intellectual work,
              all while honoring the volcanic soul of Cameroon.
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-sand/50 shadow-lg hover:shadow-2xl transition-all duration-500 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-lush/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-volcanic/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-lush shadow-lg">
                    {service.icon}
                  </div>
                </div>

                <div className="p-10 relative z-20">
                  <span className="text-lush font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">
                    {service.category}
                  </span>
                  <h3 className="text-2xl font-serif text-volcanic mb-4 group-hover:text-lush transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-volcanic/60 leading-relaxed text-sm mb-8">
                    {service.description}
                  </p>
                  
                  <Link 
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-volcanic font-black uppercase tracking-widest text-[9px] border-b border-lush pb-2 group-hover:gap-4 transition-all group-hover:text-lush"
                  >
                    Discover More <ArrowUpRight className="w-4 h-4 text-lush group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bespoke Concierge Section */}
        <section className="container mx-auto px-6 mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-volcanic rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden"
          >
            {/* Volcanic texture overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px), 
                                radial-gradient(circle at 80% 70%, #7aa65a 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
            
            <div className="absolute top-0 right-0 opacity-10">
              <Waves className="w-96 h-96 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 opacity-10 rotate-12">
              <Wind className="w-80 h-80 text-lush/30" />
            </div>
            <div className="absolute top-1/2 left-1/4 opacity-5">
              <Leaf className="w-40 h-40 text-lush" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
                Bespoke <span className="text-lush italic">Requests</span>
              </h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                Our concierge team is trained in diplomatic protocol. Whether you require a private 
                translator, specialized research assistance, or specific dietary logistics,
                from volcanic soil produce to rare archival materials, we are here to facilitate.
              </p>
              <button onClick={() => navigate('/contact')} className="bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-white hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
                Contact the Concierge
              </button>
            </div>
          </motion.div>
        </section>

        {/* Service Philosophy */}
        <section className="container mx-auto px-6 mt-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
                The Ngeme Standard
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">
                Rooted in <span className="italic text-lush">Volcanic Soil</span>, Reaching Global Heights
              </h2>
              <p className="text-volcanic/70 text-lg leading-relaxed">
                Every service we offer is filtered through a lens of cultural integrity and ecological 
                mindfulness. From the vehicles we maintain to the ingredients we source, we prioritize 
                partnerships that uplift local communities and preserve the raw beauty of the Cameroon coastline.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand/40 text-center">
                <Wifi className="w-8 h-8 text-lush mx-auto mb-4" />
                <div className="text-2xl font-serif text-volcanic">High Speed Wifi</div>
                <div className="text-xs text-volcanic/50 uppercase tracking-wider">Global Connectivity</div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-sand/40 text-center">
                <ShieldCheck className="w-8 h-8 text-lush mx-auto mb-4" />
                <div className="text-2xl font-serif text-volcanic">24/7</div>
                <div className="text-xs text-volcanic/50 uppercase tracking-wider">Sovereign Protection</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}