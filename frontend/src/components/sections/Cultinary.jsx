import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Culinary() {
  const dishes = [
    { name: "Atlantic Chargrilled Lobster", desc: "Caught daily from the Limbe coast, infused with local herbs.", price: "FCFA 18,000" },
    { name: "Traditional Limbe Sea Bream", desc: "Slow-roasted over volcanic stone heat for authentic depth.", price: "FCFA 12,000" },
    { name: "Mt. Cameroon Garden Salad", desc: "Organic greens from the mountain foothills.", price: "FCFA 6,500" }
  ];

  return (
    <section className="container py-24 bg-white rounded-t-[3rem] -mt-12 relative z-40">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* REPLACED: Image of local coastal cuisine instead of a hamburger */}
        <div className="relative group overflow-hidden rounded-2xl">
          <img 
            src="https://buyam.co/storage/products/medium_507c6d52-0ba8-43a5-b8bd-d4ed94fd5b8a.png" 
            alt="Cameroonian Coastal Gastronomy" 
            className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ocean/10 group-hover:bg-transparent transition-colors" />
        </div>

        <div>
          <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">Gastronomy</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-ocean">Atlantic Flavors & Local Soul</h2>
          
          <p className="text-volcanic/70 text-lg leading-relaxed mb-6">
            Our kitchen is a tribute to the Gulf of Guinea. We blend traditional Cameroonian 
            techniques with global fine-dining standards, sourcing every ingredient from 
            the local Limbe markets and our own organic gardens.
          </p>

          {/* ADDED: Diplomat's specific phrasing */}
          <div className="mb-10 space-y-2">
            <p className="text-lush font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span>✦</span> Organically sourced foods
            </p>
            <p className="text-ocean font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span>✦</span> Promoting Cooking Classes for Long-Term residents/guests
            </p>
          </div>

          <div className="space-y-8">
            {dishes.map((dish, i) => (
              <div key={i} className="flex justify-between items-start border-b border-sand pb-6">
                <div>
                  <h4 className="text-ocean font-bold">{dish.name}</h4>
                  <p className="text-xs text-volcanic/60 mt-1 italic">{dish.desc}</p>
                </div>
                <span className="font-serif italic text-ocean">{dish.price}</span>
              </div>
            ))}
          </div>
          
          <Link to="/dining" className="btn-outline mt-12 inline-block">View Full Menu</Link>
        </div>
      </div>
    </section>
  );
}