import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { BookOpen, Search, Globe, Clock, Users, Award, ArrowRight, BookMarked } from "lucide-react";

const collectionHighlights = [
  { title: "African Philosophy", count: "1,200+ volumes", icon: <BookOpen className="w-8 h-8" /> },
  { title: "Cameroonian Law", count: "800+ texts", icon: <BookMarked className="w-8 h-8" /> },
  { title: "Post-Colonial Literature", count: "600+ titles", icon: <BookOpen className="w-8 h-8" /> },
  { title: "Rare Manuscripts", count: "50+ archival items", icon: <Award className="w-8 h-8" /> },
];

const services = [
  { icon: <Search className="w-6 h-6" />, title: "Research Assistance", description: "Librarians available to help locate materials and navigate databases." },
  { icon: <Globe className="w-6 h-6" />, title: "Digital Access", description: "High-speed internet and subscriptions to academic journals." },
  { icon: <Users className="w-6 h-6" />, title: "Scholar Residencies", description: "Dedicated workspace for visiting researchers." },
];

export default function FisiyLibrary() {
  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Knowledge Hub</span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                The Fisiy <span className="italic text-lush">Research Library</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                A sanctuary for the serious mind. Our library houses a private collection of African literature, law, social science, and rare archival materials, curated over decades by Dr. Cyprian Fisiy and colleagues.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                With reading rooms overlooking the Atlantic, high‑speed internet, and a librarian on hand, it's the perfect environment for deep work, writing, and cross‑continental dialogue.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Clock className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Open daily 8am – 8pm</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Resort guests & visiting scholars</span>
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
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200"
                alt="Library interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Collection Highlights */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-4 text-center">The Collection</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-2xl mx-auto mb-12">
              A living archive focused on African thought, law, and letters.
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              {collectionHighlights.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-lush">{item.icon}</div>
                  </div>
                  <h3 className="text-lg font-serif text-volcanic mb-1">{item.title}</h3>
                  <p className="text-lush font-bold">{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Library Services */}
        <section className="container mx-auto px-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-12 text-center">Beyond the Stacks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-sand/40 text-center"
              >
                <div className="bg-lush/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-lush">{s.icon}</div>
                </div>
                <h3 className="text-xl font-serif text-volcanic mb-2">{s.title}</h3>
                <p className="text-volcanic/60">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Residency Info */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-volcanic rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Scholar Residencies</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  We offer dedicated workspace and accommodation packages for researchers, writers, and academics. Stay for a week or a month, immerse yourself in the collection and the landscape.
                </p>
                <ul className="space-y-3 text-white/80">
                  <li>• Private study carrels with ocean views</li>
                  <li>• Access to rare materials and digital databases</li>
                  <li>• Weekly seminars with fellow residents</li>
                  <li>• Inclusive meal plan at the resort</li>
                </ul>
                <button className="mt-8 bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                  Apply for Residency
                </button>
              </div>
              <div className="h-[300px] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" 
                  alt="Reading room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Plan Your Research Visit</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Whether you're a guest at the resort or a scholar seeking a quiet place to work, we welcome you.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
              Inquire About Access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}