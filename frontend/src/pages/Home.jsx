import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-ocean selection:text-white">
      <Navbar />
      
      <main>
        <Hero />

        {/* Section 1: The Vision & Foundation Link */}
        <section className="container py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-lush font-bold tracking-[0.3em] uppercase text-xs">A Legacy of Impact</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-serif">Luxury with a Conscience</h2>
              <p className="text-lg text-volcanic/80 mt-6 leading-relaxed">
                Founded by a visionary with a global perspective, Ngeme is more than a retreat. 
                It is a primary vehicle for the <strong>Fisiy Foundation</strong>, where your 
                presence directly fuels social inclusivity and development projects across Cameroon.
              </p>
              <div className="mt-8 p-6 bg-white border-l-4 border-lush shadow-sm">
                <p className="mb-0 italic text-ocean font-medium">
                  "We believe that true luxury lies in the ability to give back while you reconnect."
                </p>
              </div>
            </motion.div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" 
                alt="Luxury and Purpose" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-ocean text-white p-8 rounded-xl hidden md:block">
                <p className="text-3xl font-serif mb-1">100%</p>
                <p className="text-xs uppercase tracking-widest opacity-80">Proceeds to Social Impact</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Digital Nomad & Infrastructure Grid */}
        <section className="bg-ocean text-white py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-white">Work from Paradise</h2>
              <p className="opacity-80">
                Designed for the global professional. We provide the stability of a 
                modern corporate office with the serenity of the Atlantic coast.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Constant Power", desc: "Dual-grid and Solar backup systems ensuring 24/7 uptime.", icon: "⚡" },
                { title: "Ultra-Fast WiFi", desc: "Dedicated Fiber and Starlink redundancy for seamless global calls.", icon: "📡" },
                { title: "Conference Suites", desc: "Professional boardrooms equipped for high-stakes hybrid meetings.", icon: "💼" }
              ].map((feature, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-white text-xl mb-2">{feature.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Unique Strengths (Tours, Rentals, Pool) */}
        <section className="container py-24">
          <div className="text-center mb-16">
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-xs">The Ngeme Experience</span>
            <h2 className="mt-4">Tailored to Every Detail</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Guided Tours", detail: "Explore Mt. Cameroon & Historic Sites", img: "🗺️" },
              { name: "Airport Runs", detail: "Luxury Pickups & Car Rentals", img: "🚗" },
              { name: "Event Hosting", detail: "Perfect for Weddings & Galas", img: "🥂" },
              { name: "Olympic Pool", detail: "The Largest Infinity Pool in Limbe", img: "🏊‍♂️" }
            ].map((item, i) => (
              <div key={i} className="card group hover:bg-ocean hover:text-white transition-all duration-500">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.img}</div>
                <h4 className="group-hover:text-white transition-colors">{item.name}</h4>
                <p className="text-sm opacity-70 mb-0">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Future - The Ocean-Side Dialogues */}
        <section className="bg-sand py-24 border-y border-ocean/5">
          <div className="container text-center max-w-4xl mx-auto">
            <h2 className="font-serif italic text-ocean">Coming Soon: The Ocean-Side Dialogues</h2>
            <p className="text-xl mt-6 font-light leading-relaxed">
              An intellectual hub where world leaders, thinkers, and African innovators 
              gather by the Atlantic to discuss the future of our continent and world.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-lush font-bold uppercase text-xs tracking-widest">
              Join the Intellectual Movement <span className="text-xl">→</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-volcanic text-sand pt-20 pb-10">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="text-white mb-6">Ngeme Resort</h3>
              <p className="text-sm opacity-60">
                A project of the Fisiy Foundation. <br />
                Limbe, South West Region, Cameroon.
              </p>
            </div>
            <div>
              <h4 className="text-white mb-6 uppercase text-xs tracking-widest">The Foundation</h4>
              <p className="text-sm opacity-60">Learn more about our social inclusivity projects across Cameroon.</p>
            </div>
            <div>
              <h4 className="text-white mb-6 uppercase text-xs tracking-widest">Inquiries</h4>
              <p className="text-sm opacity-60">concierge@ngeme-resort.com</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 text-center text-[10px] uppercase tracking-[0.3em] opacity-40">
            © 2026 Crafted with Excellence for The NewWaveResort
          </div>
        </div>
      </footer>
    </div>
  );
}