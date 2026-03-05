import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { Send, MapPin, Globe, Shield, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState("idle");

  return (
    <div className="bg-sand min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="relative pt-32 pb-24 w-full">
        <div className="container mx-auto px-6">
          
          {/* Header Section */}
          <div className="max-w-4xl mb-16 md:mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lush font-black tracking-[0.5em] uppercase text-[10px] block mb-4"
            >
              Concierge & Inquiries
            </motion.span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-8xl font-serif text-volcanic leading-[1.1] tracking-tight"
            >
              Begin Your <br />
              <span className="italic text-lush">Atlantic Residency</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-volcanic/60 text-lg md:text-xl mt-8 max-w-2xl leading-relaxed italic font-light"
            >
              Our team specializes in coordinating long-term stays, corporate retreats, and foundation visits. Reach out to discuss your specific professional or physical requirements.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* RIGHT COLUMN (The Form) - Forced to Top on Mobile using order-1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-7 order-1 lg:order-2 bg-white p-8 md:p-16 lg:p-20 rounded-[3rem] shadow-resort border border-sand"
            >
              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div 
                    key="success" 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-lush/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Send className="text-lush w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-serif text-ocean mb-4">Inquiry Received</h3>
                    <p className="text-volcanic/60 text-sm max-w-xs mx-auto leading-relaxed">
                        Your message has been encrypted and sent to our concierge. Expect a response within 4 professional hours.
                    </p>
                    <button 
                      onClick={() => setFormStatus("idle")} 
                      className="mt-10 text-lush font-black text-[10px] uppercase tracking-[0.3em] border-b-2 border-lush pb-1 hover:text-volcanic hover:border-volcanic transition-colors"
                    >
                        Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    onSubmit={(e) => { 
                        e.preventDefault(); 
                        setFormStatus("sending"); 
                        setTimeout(() => setFormStatus("success"), 2000); 
                    }} 
                    className="space-y-10"
                  >
                    <div className="grid md:grid-cols-2 gap-10">
                      <FormInput label="Full Name" placeholder="e.g. Dr. Amadou K." />
                      <FormInput label="Professional Email" type="email" placeholder="amadou@network.org" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <FormInput label="Phone / WhatsApp" placeholder="+237 ..." />
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-lush/60 ml-1">Nature of Inquiry</label>
                        <select className="w-full bg-sand/40 border-none rounded-2xl px-6 py-5 text-sm focus:ring-2 focus:ring-lush outline-none appearance-none cursor-pointer text-volcanic font-medium">
                          <option>Executive Residency (1 week+)</option>
                          <option>Corporate Summit / Retreat</option>
                          <option>Fisiy Foundation Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-lush/60 ml-1">Special Requirements</label>
                      <textarea 
                        rows="5" 
                        className="w-full bg-sand/40 border-none rounded-[2rem] px-6 py-5 text-sm focus:ring-2 focus:ring-lush outline-none resize-none text-volcanic font-medium" 
                        placeholder="Workspace needs, security coordination, or dietary standards..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === "sending"}
                      className="w-full bg-volcanic hover:bg-lush text-white font-black py-7 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-6 uppercase text-[11px] tracking-[0.5em] group disabled:opacity-70"
                    >
                      {formStatus === "sending" ? "Relaying Message..." : "Send Secure Inquiry"}
                      <Send className={`w-4 h-4 transition-transform duration-500 ${formStatus === "sending" ? "animate-pulse" : "group-hover:translate-x-2 group-hover:-translate-y-1"}`} />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* LEFT COLUMN (Map & Details) - Moves below form on Mobile using order-2 */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-10">
              
              {/* Map Container - Fixed width issue by using w-full */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white relative"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15919.467385551323!2d9.1666!3d4.0167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDEnMDAuMCJOIDnCsDEwJzAwLjAiRQ!5e0!3m2!1sen!2scm!4v1700000000000!5m2!1sen!2scm" 
                  className="w-full h-full border-0 grayscale contrast-125"
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                <div className="absolute bottom-6 left-6 right-6 bg-volcanic/95 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-4 mb-3">
                    <MapPin className="text-lush w-5 h-5" />
                    <p className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Coastal Residency</p>
                  </div>
                  <p className="text-white/80 text-base font-serif italic leading-relaxed">
                    Ngeme, Mile 4 Coastal Road,<br /> Limbe, Cameroon
                  </p>
                </div>
              </motion.div>

              {/* Secure Infrastructure Badge */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 rounded-[2.5rem] bg-lush text-white shadow-2xl relative overflow-hidden group"
              >
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <Shield className="text-lush w-6 h-6" />
                        <h4 className="font-serif italic text-2xl text-white">Secure Infrastructure</h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/70 uppercase tracking-[0.3em] font-bold">
                        Equipped with Starlink enterprise-grade connectivity to ensure 24/7 high-speed dialogue for global professional missions.
                    </p>
                </div>
                <Globe className="absolute -right-10 -bottom-10 w-40 h-40 text-white/5 group-hover:text-white/10 transition-colors duration-700" />
              </motion.div>

              {/* Direct Contacts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactCard 
                    label="Concierge" 
                    value="residency@newwavesresort.com" 
                />
                <ContactCard 
                    label="Foundation" 
                    value="impact@fisiyfoundation.org" 
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Reusable Sub-components for professional consistency
function FormInput({ label, type = "text", placeholder }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] uppercase tracking-[0.3em] font-black text-lush/60 ml-1">{label}</label>
      <input 
        type={type} 
        required 
        className="w-full bg-sand/40 border-none rounded-2xl px-6 py-5 text-sm focus:ring-2 focus:ring-lush transition-all outline-none text-volcanic font-medium" 
        placeholder={placeholder} 
      />
    </div>
  );
}

function ContactCard({ label, value }) {
    return (
        <div className="p-8 bg-white rounded-[2rem] border border-sand shadow-sm hover:shadow-md transition-shadow">
            <span className="block text-[10px] uppercase tracking-widest text-lush font-black mb-3">{label}</span>
            <p className="text-sm font-serif text-ocean break-all">{value}</p>
        </div>
    );
}