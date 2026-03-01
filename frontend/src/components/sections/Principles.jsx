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
    <section className="relative py-10 overflow-hidden bg-sand">
      {/* Subtle Background Texture - Light & Airy */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1469474099711-423907c111e4?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover"
          alt=""
        />
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
            className="text-4xl md:text-6xl font-serif text-ocean mt-4 italic"
          >
            Our Guiding Principles
          </motion.h2>
          <div className="h-1 w-24 bg-lush mx-auto mt-8" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[2rem] bg-white shadow-[0_10px_40px_rgba(26,95,122,0.04)] border border-ocean/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="text-lush font-serif text-5xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity">
                {p.number}
              </div>
              
              <h3 className="text-ocean font-serif text-2xl mb-4 group-hover:text-lush transition-colors">
                {p.title}
              </h3>
              
              <p className="text-volcanic/80 text-base leading-relaxed font-light">
                {p.description}
              </p>

              {/* Decorative Corner Icon */}
              <div className="absolute top-10 right-10 text-2xl opacity-10 group-hover:opacity-100 transition-all">
                {p.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing "Impact" Tagline - High Contrast */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-[12px] uppercase tracking-[0.4em] text-ocean font-bold opacity-40">
            Fostering Understanding <span className="mx-4 text-lush">•</span> Building Community <span className="mx-4 text-lush">•</span> Creating Memories
          </p>
        </motion.div>
      </div>
    </section>
  );
}