import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { 
  PlaneTakeoff, Car, Shield, Clock, MapPin, Wifi, 
  Coffee, Briefcase, ArrowRight, Star 
} from "lucide-react";

const fleetFeatures = [
  { icon: <Shield className="w-6 h-6" />, text: "Chauffeurs trained in diplomatic protocol" },
  { icon: <Clock className="w-6 h-6" />, text: "Flight tracking – we adjust to your schedule" },
  { icon: <Wifi className="w-6 h-6" />, text: "In-vehicle Wi-Fi and charging" },
  { icon: <Coffee className="w-6 h-6" />, text: "Complimentary refreshments" },
];

const testimonials = [
  { quote: "After a long flight, stepping into a waiting Ngeme vehicle felt like coming home. Flawless.", author: "— Ambassador K. Mbaye, Senegal" },
  { quote: "They handled our group of 12 with multiple stops effortlessly. Truly professional.", author: "— Dr. Linda T., USA" },
];

export default function DiplomaticTransfers() {
  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Transport</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                Diplomatic <span className="italic text-lush">Transfers</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                Your journey begins the moment you land. Our professional chauffeurs and late‑model vehicles ensure your transition from Douala International to Ngeme is seamless, safe, and serene.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                We track every flight, handle your luggage with care, and provide amenities designed for the traveler who expects more. Whether you're arriving for business or leisure, we set the tone.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Douala International Airport (DLA)</span>
                </div>
                <div className="flex items-center gap-3">
                  <PlaneTakeoff className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">24/7 availability</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury car"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Fleet Features */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">The Transfer Experience</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">
              More than a ride—we manage every detail so you can arrive refreshed.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {fleetFeatures.map((feat, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">{feat.icon}</div>
                  </div>
                  <p className="text-volcanic/80 font-medium">{feat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle Options */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-12 text-center">Our Fleet</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Executive Sedan", capacity: 3, image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600" },
              { name: "Luxury SUV", capacity: 6, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600" },
              { name: "VIP Van", capacity: 10, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600" },
            ].map((vehicle, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-sand/40">
                <img src={vehicle.image} alt={vehicle.name} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-serif text-volcanic mb-2">{vehicle.name}</h3>
                  <p className="text-volcanic/60">Capacity: {vehicle.capacity} passengers</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">Trusted by Discerning Travelers</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-sand/40">
                <p className="text-volcanic/80 italic mb-4">"{t.quote}"</p>
                <p className="text-volcanic/60 font-bold">{t.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Arrange Your Transfer</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Provide your flight details, and we'll be waiting when you arrive.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              Book a Transfer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}