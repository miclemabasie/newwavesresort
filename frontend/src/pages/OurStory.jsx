import { motion } from "framer-motion";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { ArrowRight, Star, Globe, Shield, Leaf, Eye, Heart, User, Award, ExternalLink, Home, Briefcase, HandHeart } from "lucide-react";

// Milestones now blend resort and foundation
const milestones = [
    {
        year: "2014",
        title: "Foundation Born",
        description: "Dr. Fisiy establishes the Fisiy Foundation in Washington DC.",
        fullStory: "Long before the resort, there was a vision for accountable governance in Africa. Dr. Cyprian Fisiy founded the Fisiy Foundation and Leadership Center as a 501(c)(3) to address deficits in local governance and foster citizen engagement.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
    },
    {
        year: "2018",
        title: "The Resort Dream",
        description: "A idea to bridge high-end comfort with deep social impact.",
        fullStory: "Dr. Fisiy imagined a place where global travelers could experience Cameroon's beauty while directly fueling the foundation's work. Ngeme was conceived as a self-sustaining engine for change.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800"
    },
    {
        year: "2023",
        title: "Breaking Ground",
        description: "Construction begins on the volcanic shores of Limbe.",
        fullStory: "Local craftsmen taught our architects traditional techniques. Every worker employed was a step toward economic empowerment, a principle Dr. Fisiy held as non‑negotiable.",
        image: "https://images.unsplash.com/photo-1596701062351-8c0c16913c54?auto=format&fit=crop&q=80&w=800"
    },
    {
        year: "2025",
        title: "Opening & Legacy",
        description: "Ngeme launches, committing 20% of profits to the foundation.",
        fullStory: "Today, New Waves Resort stands as a sanctuary for the intellectual nomad, and a testament to how luxury can fund lasting change in local communities.",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800"
    },
];

// Impact stats combine resort and foundation metrics
const impactStats = [
    { value: "20%", label: "Of profits to foundation", detail: "Funding education, infrastructure, and livelihoods" },
    { value: "120+", label: "Local jobs created", detail: "Fair wages and training for community members" },
    { value: "450", label: "Fisiy scholarships", detail: "Awarded through foundation programs" },
    { value: "15k", label: "Mangroves planted", detail: "Coastal restoration with community partners" },
];

// Foundation program areas (with links)
const foundationPrograms = [
    {
        icon: <Home className="w-8 h-8 text-lush" />,
        title: "Cameroon-boxes",
        description: "Small local infrastructure, foot paths, bridges, latrines, built with full community participation.",
        link: "https://fisiyfoundation.org/programs/cameroon-boxes",
    },
    {
        icon: <Briefcase className="w-8 h-8 text-lush" />,
        title: "Vocational Training",
        description: "Multi-purpose centers offering youth skills training, libraries, and internet access.",
        link: "https://fisiyfoundation.org/programs/vocational-training",
    },
    {
        icon: <HandHeart className="w-8 h-8 text-lush" />,
        title: "Livelihood Support",
        description: "Self-help groups gain better access to markets and funding.",
        link: "https://fisiyfoundation.org/programs/livelihood-support",
    },
];

export default function OurStory() {
    return (
        <div className="flex flex-col min-h-screen bg-sand/20">
            <Navbar />

            <main className="flex-grow">
                {/* ===== HERO SECTION (resort-focused) ===== */}
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
                                Our Story. <br /> <span className="italic text-lush">A Legacy of Impact.</span>
                            </h1>
                            <p className="text-volcanic/80 text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-8">
                                On the volcanic shores of Limbe, New Waves Resot was born from a simple idea: that world-class hospitality can be a force for social change. Every stay here supports the Fisiy Foundation's mission to build accountable institutions across Africa.
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
                                alt="Ngeme Resort Aerial View"
                            />
                        </motion.div>
                    </div>
                    <div className="absolute top-0 right-0 w-1/4 h-full bg-sand/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
                </section>

                {/* ===== IMPACT NUMBERS (blended) ===== */}
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
                                    <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{stat.label}</div>
                                    <p className="text-white/20 text-xs max-w-[150px] mx-auto leading-relaxed">{stat.detail}</p>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-white/40 text-center text-sm max-w-2xl mx-auto mt-16 italic">
                            Ngeme exists to make luxury meaningful, by reinvesting in the communities that welcome you.
                        </p>
                    </div>
                </section>

                {/* ===== THE VISION: RESORT + FOUNDATION ===== */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">Two Wings, One Mission</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">Where Luxury Meets Purpose</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="bg-sand/5 p-12 rounded-[3rem] border border-sand/30"
                            >
                                <Eye className="w-12 h-12 text-lush mb-8" />
                                <h3 className="text-3xl font-serif text-volcanic mb-6">Ngeme's Vision</h3>
                                <p className="text-volcanic/70 text-lg leading-relaxed">
                                    To create a sanctuary for the intellectual nomad, where world-class comfort inspires deep work, and where every guest becomes part of a larger story: the renewal of the social contract between citizens and their local governments across Africa.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-sand/5 p-12 rounded-[3rem] border border-sand/30"
                            >
                                <Heart className="w-12 h-12 text-lush mb-8" />
                                <h3 className="text-3xl font-serif text-volcanic mb-6">Foundation's Mission</h3>
                                <p className="text-volcanic/70 text-lg leading-relaxed">
                                    To address deficits in local governance in Sub-Saharan Africa by fostering a culture of service, accountability and mutual respect, building inclusive, resilient institutions for responsive local engagement.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===== FOUNDER'S STORY (accurate, with photo) ===== */}
                <section className="py-32 bg-sand/10">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">The Visionary</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">Dr. Cyprian F. Fisiy</h2>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30">
                                    <img
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                                        alt="Dr. Cyprian F. Fisiy"
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-lush text-volcanic p-6 rounded-full shadow-xl">
                                    <Award className="w-8 h-8" />
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="prose prose-lg text-volcanic/80"
                            >
                                <p className="mb-4">
                                    <span className="text-2xl font-serif text-lush">Dr. Cyprian F. Fisiy</span> is a Principal Social Scientist and Social Development Team Leader in the Africa Region of The World Bank. He has previously served as World Bank co-coordinator for Involuntary Resettlement (1997) and Resettlement Specialist for Africa (1994), working on investment programs in Lesotho, Chad, Cameroon and Côte d'Ivoire.
                                </p>
                                <p className="mb-4">
                                    Prior to the World Bank, he conducted research on sustainable forest management in Cameroon and was a Research Fellow at the African Studies Center in Leiden and the University of Wageningen. He holds a Ph.D. in the Anthropology of Law from the University of Leiden (1992).
                                </p>
                                <p className="mb-4">
                                    In 2014, Dr. Fisiy founded the Fisiy Foundation and Leadership Center in Washington DC as a 501(c)(3) nonprofit. Ngeme Resort is his dream to create a sustainable funding engine for that mission, proving that hospitality can be a catalyst for accountable governance and community empowerment.
                                </p>
                                <p className="mb-6">
                                    He resides in Alexandria with his wife, Grace Forgwei, and their four children.
                                </p>
                                <div className="flex items-center gap-4 text-volcanic">
                                    <div className="w-12 h-px bg-lush/50" />
                                    <span className="text-sm font-bold uppercase tracking-widest">The Visionary Founder</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ===== HOW NGEME SUPPORTS THE FOUNDATION ===== */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">Your Stay Fuels Change</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">Programs You Support</h2>
                            <p className="text-volcanic/60 text-lg max-w-2xl mx-auto mt-6">
                                Through the Fisiy Foundation, a portion of New Wave Resort's profits directly fund these initiatives in Sub-Saharan Africa.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {foundationPrograms.map((program, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-sand/5 p-10 rounded-[2rem] border border-sand/50 hover:shadow-xl transition-all"
                                >
                                    <div className="mb-8 p-4 bg-lush/10 rounded-2xl inline-block">
                                        {program.icon}
                                    </div>
                                    <h3 className="text-2xl font-serif text-volcanic mb-4">{program.title}</h3>
                                    <p className="text-volcanic/70 leading-relaxed mb-8">
                                        {program.description}
                                    </p>
                                    <a 
                                        href={program.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-lush font-medium hover:text-volcanic transition-colors group"
                                    >
                                        <span>Learn more on foundation site</span>
                                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== MILESTONES TIMELINE ===== */}
                <section className="py-32 bg-sand/10">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]">Timeline of Intent</span>
                            <h2 className="text-4xl md:text-6xl font-serif text-volcanic mt-4 italic">From Foundation to Resort</h2>
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
                                        <p className="text-sm text-white/70 leading-relaxed font-light group-hover:text-white transition-colors duration-300 line-clamp-6">
                                            {item.fullStory}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== PHILOSOPHY: INTELLECTUAL NOMAD ===== */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-24">
                            <div className="lg:w-1/2">
                                <h2 className="text-4xl md:text-6xl font-serif text-volcanic mb-10 leading-tight">
                                    Built for the <br /><span className="italic text-lush">Intellectual Nomad</span>
                                </h2>
                                <p className="text-volcanic/70 leading-relaxed text-xl font-medium mb-8">
                                    Ngeme is more than a resort, it's a hub for writers, researchers, and entrepreneurs who seek both inspiration and infrastructure. Our coworking pavilions face the Atlantic, and our library holds volumes that spark dialogue between African thought leaders and the world.
                                </p>
                                <p className="text-volcanic/60 leading-relaxed text-lg font-light">
                                    Every element, from locally woven textiles to menus featuring indigenous ingredients, roots you in Cameroonian authenticity while delivering global standards of comfort.
                                </p>
                            </div>

                            <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
                                <PhilosophyCard 
                                    icon={<Shield className="text-lush w-6 h-6" />}
                                    title="Sovereign Security"
                                    desc="A high‑level sanctuary for professional peace of mind."
                                />
                                <PhilosophyCard 
                                    icon={<Leaf className="text-lush w-6 h-6" />}
                                    title="Regenerative by Design"
                                    desc="Every stay contributes to mangrove reforestation."
                                />
                                <PhilosophyCard 
                                    icon={<Globe className="text-lush w-6 h-6" />}
                                    title="Global Vision, Local Soul"
                                    desc="A hub where the world learns from Cameroon."
                                />
                                <PhilosophyCard 
                                    icon={<Star className="text-lush w-6 h-6" />}
                                    title="Elite Standard"
                                    desc="World‑class infrastructure meets indigenous wisdom."
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* ===== FOOTER (resort + foundation) ===== */}
                <Footer />
            </main>
        </div>
    );
}

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