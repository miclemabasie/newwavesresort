import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { Car, Fuel, Settings, Users, Wifi, Shield, ArrowRight, Map, Star } from "lucide-react";

const vehicles = [
  { name: "Land Rover Defender", type: "4x4", capacity: 5, features: ["Off-road ready", "AC", "Bluetooth"], image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600" },
  { name: "Mercedes-Benz V-Class", type: "Luxury Van", capacity: 7, features: ["Leather seats", "Wi-Fi", "Mini-bar"], image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600" },
  { name: "Toyota Land Cruiser", type: "SUV", capacity: 5, features: ["High clearance", "Snorkel", "GPS"], image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600" },
];

const services = [
  { icon: <Car className="w-6 h-6" />, title: "Self-Drive", description: "For those who prefer independence, fully insured, delivered to the resort." },
  { icon: <Users className="w-6 h-6" />, title: "Chauffeur-Driven", description: "Professional local driver who doubles as a guide." },
  { icon: <Map className="w-6 h-6" />, title: "Regional Travel", description: "Available for trips to Yaoundé, Kribi, or further." },
];

export default function PremiumFleet() {
  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Mobility</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                Premium <span className="italic text-lush">Fleet</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                Explore Cameroon at your own pace with our meticulously maintained fleet of luxury vehicles. Whether you prefer the independence of self‑drive or the insight of a local chauffeur, we provide the wheels for your journey.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                All vehicles are equipped for the region,high clearance, air conditioning, and modern safety features. We deliver to the resort and handle all paperwork.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury SUV"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Vehicle Grid */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">Our Vehicles</h2>
          <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">
            Choose from our selection of premium vehicles, each maintained to international standards.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {vehicles.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-sand/40"
              >
                <img src={v.image} alt={v.name} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-serif text-volcanic mb-1">{v.name}</h3>
                  <p className="text-lush text-sm mb-3">{v.type} • {v.capacity} seats</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {v.features.map((f, i) => (
                      <span key={i} className="bg-sand/30 text-volcanic/70 text-xs px-2 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                  <button className="text-lush font-bold uppercase tracking-wider text-xs flex items-center gap-1 group">
                    View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Service Options */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-sand/40">
            <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">How You Want to Drive</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((s, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">{s.icon}</div>
                  </div>
                  <h3 className="text-xl font-serif text-volcanic mb-2">{s.title}</h3>
                  <p className="text-volcanic/60">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Reserve Your Vehicle</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Contact our fleet team to check availability and arrange delivery.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              Inquire About Rental <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}