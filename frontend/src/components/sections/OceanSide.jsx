import React from 'react';
import { motion } from "framer-motion";
import { Mic2, GraduationCap } from "lucide-react";

function OceanSide() {
  return (
    <section className="py-20 md:py-35 text-center bg-volcanic relative overflow-hidden">
      {/* Subtle Structural Grain to prevent flat "digital" look */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section Identifier */}
          <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-8 block">
            Intellectual Sanctuary
          </span>

          {/* Primary Title - Pure White for maximum legibility */}
          <h2 className="font-serif italic text-white mb-6 text-5xl md:text-5xl tracking-tight leading-tight">
            The Ocean-Side Dialogues
          </h2>

          {/* Diplomat's Required Facilities - High Contrast Sub-Header */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-lush" />
              <span className="text-white font-bold uppercase tracking-[0.2em] text-[11px]">Learning</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <Mic2 size={16} className="text-lush" />
              <span className="text-white font-bold uppercase tracking-[0.2em] text-[11px]">Podcast Facilities</span>
            </div>
          </div>

          {/* Description - Using White with high opacity (90%) for the "Old Man's" eyes */}
          <p className="text-xl md:text-3xl text-white/90 mb-16 leading-relaxed font-light max-w-3xl mx-auto">
            A sanctuary for global thought leaders, convening to address 
            the pertinence of <span className="text-lush font-medium italic">African nature</span> and world issues.
          </p>

          {/* Premium Call to Action */}
          <div className="flex justify-center">
            <button className="bg-white text-volcanic px-14 py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] hover:bg-lush hover:text-white transition-all duration-500 shadow-2xl">
              Request Invitation
            </button>
          </div>
          
        </motion.div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lush/20 to-transparent" />
    </section>
  )
}

export default OceanSide;