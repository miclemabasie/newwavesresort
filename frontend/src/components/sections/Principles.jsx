import { motion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "Connection & Understanding",
    description: "Fostering deep connectivity between the global diaspora and their local networks through knowledge exchange and intellectual sanctuary.",
    icon: "🤝"
  },
  {
    number: "02",
    title: "Sovereign Security",
    description: "A sanctuary providing absolute physical and digital peace of mind, ensuring a safe space for high-level professional engagement.",
    icon: "🛡️"
  },
  {
    number: "03",
    title: "Sustainable Legacy",
    description: "Living what we preach through clean living, reliable supply-chain communities, and deep-rooted support for the Fisiy Foundation.",
    icon: "🍃"
  },
  {
    number: "04",
    title: "Refined Exclusivity",
    description: "Maintaining a one-week minimum reservation standard to preserve a calm, stable environment for those building lasting stories.",
    icon: "💎"
  }
];

export default function Principles() {
  return (
    <section className="relative py-32 overflow-hidden bg-volcanic">
      {/* Background Image with Cinematic Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469474099711-423907c111e4?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          alt="Atlantic Horizon"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-volcanic via-volcanic/80 to-volcanic" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lush font-bold tracking-[0.5em] uppercase text-[10px]"
          >
            The Ngeme Ethos
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-white mt-4 italic"
          >
            Our Guiding Principles
          </motion.h2>
          <div className="h-px w-24 bg-lush/50 mx-auto mt-8" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-500"
            >
              <div className="text-lush font-serif text-4xl mb-6 opacity-40 group-hover:opacity-100 transition-opacity">
                {p.number}
              </div>
              
              <h3 className="text-white font-serif text-xl mb-4 group-hover:text-lush transition-colors">
                {p.title}
              </h3>
              
              <p className="text-white/60 text-sm leading-relaxed font-light">
                {p.description}
              </p>

              {/* Decorative Corner Icon */}
              <div className="absolute top-8 right-8 text-xl grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                {p.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing "Impact" Tagline */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/30 font-semibold">
            Fostering Understanding <span className="mx-4 text-lush">•</span> Building Community <span className="mx-4 text-lush">•</span> Creating Memories
          </p>
        </motion.div>
      </div>
    </section>
  );
}