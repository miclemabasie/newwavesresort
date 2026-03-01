import { motion } from "framer-motion";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { ArrowRight, Star, Globe, Shield, Leaf } from "lucide-react";

const milestones = [
    {
        year: "2018",
        title: "The Genesis",
        description: "A vision to bridge high-end comfort with deep-rooted social impact.",
        fullStory: "It began as a conversation between lifelong friends—one an architect, the other a social entrepreneur. They sketched a place where global citizens could work and connect while directly contributing to the communities that host them.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
    },
    {
        year: "2020",
        title: "The Fisiy Alliance",
        description: "Standardizing our commitment through a formal foundation partnership.",
        fullStory: "We didn't seek a mere endorsement—we wove the resort into the Fisiy Foundation's fabric. Today, 20% of all resort profits flow directly into foundation programs and local vocational training.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
    },
    {
        year: "2023",
        title: "Laying Foundation",
        description: "Breaking ground on the volcanic shores, turning dreams into reality.",
        fullStory: "Local craftsmen taught our architects traditional building techniques, which now feature prominently in the resort's curved walls and open-air courtyards made of sustainable timber.",
        image: "https://images.unsplash.com/photo-1596701062351-8c0c16913c54?auto=format&fit=crop&q=80&w=800"
    },
    {
        year: "2025",
        title: "A New Wave",
        description: "Official launch of a hub designed for the global intellectual nomad.",
        fullStory: "More than a resort, guests found soundproofed pavilions with high-speed connectivity, a library of Cameroonian literature, and a calendar of residencies for African thinkers.",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800"
    },
];

const impactStats = [
    { value: "120+", label: "Local jobs created" },
    { value: "450", label: "Fisiy scholarships" },
    { value: "15k", label: "Trees planted" },
    { value: "85%", label: "Local Management" },
];

export default function OurStory() {
    return (
        <div className="flex flex-col min-h-screen bg-sand/20">
            <Navbar />

            <main className="flex-grow">
                {/* ===== HERO SECTION ===== */}
                <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
                    <div className="container mx-auto px-6 grid lg:grid-cols-2 items-center gap-16 z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px] mb-6 block">
                                Heritage & Horizon
                            </span>
                            <h1 className="text-5xl md:text-8xl font-serif text-volcanic leading-[1.05] mb-10 tracking-tight">
                                Our Story. <br /> <span className="italic text-lush">Your Legacy.</span>
                            </h1>
                            <p className="text-volcanic/80 text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-8">
                                On the volcanic shores of Limbe, we are weaving a new kind of hospitality—one that honors Cameroonian culture while embracing the global nomad. 
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-5">
                                <Link
                                    to="/contact"
                                    className="group relative flex items-center justify-center bg-volcanic text-white px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em]">Join the Narrative</span>
                                    <div className="absolute inset-0 bg-lush translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="relative h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200"
                                className="w-full h-full object-cover"
                                alt="Resort Aerial View"
                            />
                        </motion.div>
                    </div>
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-1/4 h-full bg-sand/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
                </section>

                {/* ===== IMPACT NUMBERS ===== */}
                <section className="py-20 bg-volcanic text-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                            {impactStats.map((stat, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className="text-5xl md:text-6xl font-serif text-lush mb-3 group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                                    <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== PHILOSOPHY SECTION ===== */}
                <section className="py-32 bg-sand/10">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-24">
                            <div className="lg:w-1/2">
                                <h2 className="text-4xl md:text-6xl font-serif text-volcanic mb-10 leading-tight">
                                    Built for the <br /><span className="italic text-lush">Intellectual Nomad</span>
                                </h2>
                                <p className="text-volcanic/70 leading-relaxed text-xl font-medium mb-8">
                                    We believe in something deeper: the intellectual nomad. Those whose work transcends borders—writers, researchers, and entrepreneurs.
                                </p>
                                <p className="text-volcanic/60 leading-relaxed text-lg font-light">
                                    At Ngeme, productivity is not an escape from paradise—it is a part of it. Our coworking pavilions face the Atlantic, and our library holds volumes curated to inspire.
                                </p>
                            </div>

                            <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
                                <PhilosophyCard 
                                    icon={<Shield className="text-lush w-6 h-6" />}
                                    title="Sovereign Security"
                                    desc="A high-level sanctuary for professional peace of mind."
                                />
                                <PhilosophyCard 
                                    icon={<Leaf className="text-lush w-6 h-6" />}
                                    title="Regenerative"
                                    desc="Every stay contributes to coastal mangrove reforestation."
                                />
                                <PhilosophyCard 
                                    icon={<Globe className="text-lush w-6 h-6" />}
                                    title="Global Vision"
                                    desc="A hub where the world comes to learn from Cameroon."
                                />
                                <PhilosophyCard 
                                    icon={<Star className="text-lush w-6 h-6" />}
                                    title="Elite Standard"
                                    desc="World-class infrastructure meets indigenous wisdom."
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== MILESTONES SECTION ===== */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">Timeline of Intent</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">The Evolution of Impact</h2>
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
                                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-volcanic via-volcanic/40 to-transparent" />
                                    
                                    <div className="absolute bottom-0 p-8 text-white w-full">
                                        <span className="text-lush font-serif text-5xl block mb-4 italic">{item.year}</span>
                                        <h4 className="text-2xl font-serif mb-4 tracking-wide">{item.title}</h4>
                                        <p className="text-sm text-white/70 leading-relaxed font-light group-hover:text-white transition-colors duration-300">
                                            {item.fullStory}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== FINAL CALL TO ACTION ===== */}
                <section className="py-40 bg-sand/30 text-center relative overflow-hidden">
                    <div className="container mx-auto px-6 max-w-4xl relative z-10">
                        <h2 className="text-5xl md:text-7xl font-serif text-volcanic mb-10 leading-[1.1]">Join the <span className="italic">Narrative.</span></h2>
                        <p className="text-volcanic/70 text-xl mb-12 leading-relaxed font-medium">
                            When you become a resident at Ngeme, you're not just booking a room—you're casting a vote for a different kind of travel. One where luxury and legacy coexist.
                        </p>
                        
                        <Link
                            to="/contact"
                            className="group relative inline-flex items-center gap-4 bg-volcanic text-white px-14 py-6 rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                        >
                            <span className="relative z-10 text-[12px] font-black uppercase tracking-[0.4em]">Inquire About Residencies</span>
                            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-lush translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

// Reusable Sub-component for Philosophy
function PhilosophyCard({ icon, title, desc }) {
    return (
        <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-sand/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
            <div className="mb-6">{icon}</div>
            <h3 className="text-xl font-serif text-volcanic mb-4">{title}</h3>
            <p className="text-sm text-volcanic/60 leading-relaxed font-medium">
                {desc}
            </p>
        </div>
    );
}