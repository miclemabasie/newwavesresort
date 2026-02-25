// app/components/sections/ImpactSection.jsx
import { motion } from "framer-motion";

export default function ImpactSection() {
  return (
    <section className="container py-24">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-lush"></span>
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-xs">Fisiy Foundation Partnership</span>
          </div>
          <h2 className="text-5xl font-serif mb-8 leading-tight text-ocean">A Purpose-Driven Presence</h2>
          <p className="text-lg text-volcanic/80 mb-6 leading-relaxed">
            Ngeme translates to "Sun of the Sea". More than a resort, this is a center for social inclusivity. 
            As a project born from the <strong>Fisiy Foundation</strong>, your stay contributes directly to community empowerment in Cameroon.
          </p>
          <ul className="space-y-4 mb-10">
            {['Proceeds support local education', 'Socially inclusive employment', 'Sustainable ecosystem growth'].map((text) => (
              <li key={text} className="flex items-center gap-3 text-sm font-medium text-volcanic/70">
                <span className="w-1.5 h-1.5 bg-lush rounded-full"></span> {text}
              </li>
            ))}
          </ul>
          <button
           className="btn-outline"
           onClick={() => window.open('https://fisiyfoundation.org/', '_blank')}
           >Our Foundation Story</button>
        </motion.div>
        
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&q=80" 
            alt="Ngeme Vision" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}