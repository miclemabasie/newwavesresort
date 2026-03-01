import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState("idle");

  return (
    <div className="bg-sand min-h-screen ">
      <Navbar />

      <main className="relative pt-32 pb-24 w-full lg:max-w-5xl xl:max-w-7xl mx-auto px-6">
        <div className="container px-6">
          
          {/* Header Section - Preserving the Strategic Discussion */}
          <div className="max-w-3xl mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lush font-bold tracking-[0.4em] uppercase text-[10px]"
            >
              Concierge & Inquiries
            </motion.span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-7xl font-serif mt-6 text-ocean leading-tight"
            >
              Begin Your <br />Atlantic Residency
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-volcanic/60 text-lg mt-8 max-w-xl leading-relaxed italic font-light"
            >
              Our team specializes in coordinating long-term stays, corporate retreats, and foundation visits. Reach out to discuss your specific professional or physical requirements.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Map & Institutional Details */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* The Styled Map */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white relative group"
              >
                

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1610.7763101181245!2d9.159385823659113!3d4.009544453200413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1066b5034e01f339%3A0xa9a344da83006564!2sSt%20Michael&#39;s%20Nursery%2C%20Primary%20and%20Secondary%20School%2C%20Ngeme%20Limbe!5e0!3m2!1sen!2scm!4v1772144084660!5m2!1sen!2scm" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-ocean/5">
                  <p className="text-ocean font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Coastal Residency</p>
                  <p className="text-volcanic/70 text-sm font-serif italic">Ngeme, Mile 4 Coastal Road, Limbe, Cameroon</p>
                </div>
              </motion.div>

              {/* Secure Connectivity Note (The "Bad Ass" Detail) */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-[2rem] bg-ocean text-white shadow-xl"
              >
                <h4 className="font-serif italic text-xl mb-3">Secure Infrastructure</h4>
                <p className="text-[11px] leading-relaxed opacity-80 uppercase tracking-widest font-medium">
                  Equipped with high speed WiFi to ensure 24/7 high-speed connectivity for international nomads and global professional missions.
                </p>
              </motion.div>


              {/* Direct Contacts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-2xl border border-ocean/5">
                  <span className="block text-[10px] uppercase tracking-widest text-lush font-bold mb-2">Concierge</span>
                  <p className="text-sm font-serif">residency@newwavesresort.com</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-ocean/5">
                  <span className="block text-[10px] uppercase tracking-widest text-lush font-bold mb-2">Foundation</span>
                  <p className="text-sm font-serif">impact@fisiyfoundation.org</p>
                </div>
              </div>
            </div>

            {/* Right Column: The "Smart" Inquiry Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-white p-8 md:p-16 rounded-[2.5rem] shadow-[0_20px_60px_rgba(26,95,122,0.08)] border border-ocean/5"
            >
              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                    <div className="text-5xl mb-6">🕊️</div>
                    <h3 className="text-3xl font-serif text-ocean mb-4">Inquiry Received</h3>
                    <p className="text-volcanic/60 text-sm max-w-xs mx-auto">Our concierge will contact you within 4 professional hours.</p>
                    <button onClick={() => setFormStatus("idle")} className="mt-10 text-lush font-bold text-[10px] uppercase tracking-[0.3em] border-b border-lush pb-1">Submit another request</button>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setFormStatus("sending"); setTimeout(() => setFormStatus("success"), 2000); }} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <FormInput label="Full Name" placeholder="Dr. Amadou K." />
                      <FormInput label="Professional Email" type="email" placeholder="amadou@network.org" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <FormInput label="Phone / WhatsApp" placeholder="+237 ..." />
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/40 ml-1">Nature of Inquiry</label>
                        <select className="w-full bg-sand/50 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-lush outline-none appearance-none">
                          <option>Executive Residency (1 week+)</option>
                          <option>Corporate Summit / Retreat</option>
                          <option>Fisiy Foundation Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/40 ml-1">Special Requirements</label>
                      <textarea rows="5" className="w-full bg-sand/50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-lush outline-none resize-none" placeholder="Workspace needs, security coordination, or dietary standards..."></textarea>
                    </div>

                    <button type="submit" className="w-full bg-ocean hover:bg-volcanic text-white font-bold py-6 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-4 uppercase text-[10px] tracking-[0.4em] group">
                      {formStatus === "sending" ? "Processing..." : "Send Secure Inquiry"}
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Reusable Sub-component for clean code
function FormInput({ label, type = "text", placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/40 ml-1">{label}</label>
      <input type={type} required className="w-full bg-sand/50 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-lush transition-all outline-none" placeholder={placeholder} />
    </div>
  );
}