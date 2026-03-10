import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { Compass, Mountain, Camera, Map, Users, Calendar, ArrowRight, Shield } from "lucide-react";

const expeditions = [
  { title: "Summit Mount Cameroon", difficulty: "Challenging", duration: "2 days", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" },
  { title: "Bimbia Slave Trade Route", difficulty: "Easy", duration: "4 hours", image: "https://images.unsplash.com/photo-1596649299486-4cdea56fd59d?auto=format&fit=crop&q=80&w=600" },
  { title: "Crater Lakes Hike", difficulty: "Moderate", duration: "6 hours", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600" },
];

const guides = [
  { name: "Emmanuel N.", specialty: "Volcanology & Birding", experience: "12 years", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  { name: "Jeannette M.", specialty: "Cultural History", experience: "8 years", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
];

export default function VolcanicExpeditions() {
  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Exploration</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                Volcanic <span className="italic text-lush">Expeditions</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                Step beyond the resort and into the heart of Cameroon’s geological and cultural wonders. Our private guided tours take you to Mount Cameroon, the highest peak in West Africa, and the historic sites of Bimbia, where the Atlantic meets painful history and resilient memory.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                Each expedition is led by expert local guides who share not only facts but stories, of volcanic eruptions, of the slave trade, of the flora and fauna that thrive in this unique landscape.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Compass className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Private & small groups</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Safety equipment & first aid</span>
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
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200"
                alt="Mount Cameroon"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Expeditions Grid */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">Signature Expeditions</h2>
          <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">
            Choose your adventure, each can be customized to your interests and fitness level.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {expeditions.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-sand/40"
              >
                <img src={exp.image} alt={exp.title} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-serif text-volcanic mb-2">{exp.title}</h3>
                  <div className="flex justify-between text-sm text-volcanic/60 mb-4">
                    <span className="flex items-center gap-1"><Map className="w-4 h-4" /> {exp.difficulty}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {exp.duration}</span>
                  </div>
                  <button className="text-lush font-bold uppercase tracking-wider text-xs flex items-center gap-1 group">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meet the Guides */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-sand/40">
            <h2 className="text-3xl md:text-4xl font-serif text-volcanic mb-12 text-center">Your Guides</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
              {guides.map((guide, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <img src={guide.image} alt={guide.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-lush/20" />
                  <h3 className="text-xl font-serif text-volcanic">{guide.name}</h3>
                  <p className="text-lush font-medium">{guide.specialty}</p>
                  <p className="text-volcanic/60 text-sm">{guide.experience} experience</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Begin Your Journey</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Contact our expeditions team to plan your private tour. Custom itineraries available.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              Inquire About an Expedition <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}