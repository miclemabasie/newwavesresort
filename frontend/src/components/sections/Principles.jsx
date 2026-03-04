import { motion } from "framer-motion";
import { 
  Users, 
  ShieldCheck, 
  Leaf, 
  Sparkles 
} from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Connection & Outreach",
    description: "Fostering deep connectivity between the global diaspora and their local networks through knowledge exchange and intellectual sanctuary.",
    Icon: Users
  },
  {
    number: "02",
    title: "Outstanding Professional Security",
    description: "A sanctuary providing absolute physical and digital peace of mind, ensuring a safe space for high-level professional engagement.",
    Icon: ShieldCheck
  },
  {
    number: "03",
    title: "Sustainable Legacy",
    description: "Living what we preach through clean living, reliable supply-chain communities, and deep-rooted support for the Fisiy Foundation.",
    Icon: Leaf
  },
  {
    number: "04",
    title: "Luxury Redefined",
    subtext: "(Subtle and timeless)",
    description: "An experience where elegance meets purpose, prioritizing quiet quality and an enduring aesthetic that transcends the temporary.",
    Icon: Sparkles
  }
];

export default function Principles() {
  return (
    <section className="relative py-24 md:py-20 overflow-hidden bg-sand">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1469474099711-423907c111e4?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lush font-black tracking-[0.5em] uppercase text-[10px]"
          >
            The Ngeme Ethos
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-lush mt-4 italic"
          >
            Our Guiding Principles
          </motion.h2>
          <div className="h-0.5 w-24 bg-lush mx-auto mt-8 opacity-40" />
        </div>

        {/* 4-Column Grid for Desktop Clarity */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((p, i) => {
            const IconComponent = p.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group relative p-10 rounded-[2.5rem] bg-white shadow-sm border border-ocean/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[420px]"
              >
                {/* Number Accent */}
                <div className="text-ocean/10 font-serif text-6xl mb-6 group-hover:text-lush/20 transition-colors">
                  {p.number}
                </div>
                
                <div className="mb-6">
                  <h3 className="text-ocean font-serif text-2xl leading-tight group-hover:text-lush transition-colors">
                    {p.title}
                  </h3>
                  {p.subtext && (
                    <span className="text-lush/60 text-[10px] font-black uppercase tracking-[0.2em] mt-2 block italic">
                      {p.subtext}
                    </span>
                  )}
                </div>
                
                <p className="text-volcanic/70 text-base leading-relaxed font-light mt-auto">
                  {p.description}
                </p>

                {/* Lucide Icon - Replaced Emoji Rubbish */}
                <div className="absolute top-10 right-10 text-lush opacity-20 group-hover:opacity-100 transition-all duration-500 scale-110">
                  <IconComponent size={32} strokeWidth={1.2} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Tagline */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-ocean font-black opacity-30">
            Strategic Outreach <span className="mx-4 text-lush">•</span> Absolute Security <span className="mx-4 text-lush">•</span> Timeless Luxury
          </p>
        </motion.div>
      </div>
    </section>
  );
}