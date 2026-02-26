import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-volcanic pt-24 pb-12 text-sand overflow-hidden relative">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 text-[15rem] font-bold text-white/[0.03] leading-none pointer-events-none select-none">
        NGEME
      </div>

      <div className="container relative z-10">
        {/* Newsletter Section - Fixed Flexibility */}
        <div className="bg-ocean rounded-3xl p-8 md:p-16 mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="text-white text-3xl font-serif mb-4">Stay Informed</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Join our exclusive network for updates on the Ocean-Side Dialogues and Fisiy Foundation progress.
            </p>
          </div>
          
          {/* Changed 'flex' to 'flex-col sm:flex-row' to stack on tiny screens */}
          <form className="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your Professional Email" 
              className="w-full flex-1 bg-white/10 border border-white/30 rounded-lg px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-lush transition-colors"
            />
            {/* Added 'flex-shrink-0' to ensure the button doesn't squish */}
            <button className="bg-white text-ocean hover:bg-lush hover:text-white px-8 py-4 rounded-lg font-bold transition-all uppercase text-[10px] tracking-widest whitespace-nowrap flex-shrink-0">
              Join
            </button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="grid md:grid-cols-4 gap-12 mb-20 border-b border-white/10 pb-20">
          <div className="col-span-2">
            <h4 className="text-white text-2xl font-serif mb-6">Ngeme Resort</h4>
            <p className="max-w-sm text-sm text-white/70 leading-relaxed">
              A premier nomadic hub and hospitality sanctuary in Limbe, Cameroon. 
              As a vehicle for the Fisiy Foundation, we believe in the power of connection and social inclusivity.
            </p>
          </div>
          
          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">The Legacy</h5>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/foundation" className="text-white/70 hover:text-lush transition-colors duration-300 block">Fisiy Foundation</Link>
              </li>
              <li>
                <Link to="/dialogues" className="text-white/70 hover:text-lush transition-colors duration-300 block">Ocean-Side Dialogues</Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-white/70 hover:text-lush transition-colors duration-300 block">Sustainability Report</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Concierge</h5>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/rooms" className="text-white/70 hover:text-lush transition-colors duration-300 block">Book a Suite</Link>
              </li>
              <li>
                <Link to="/nomads" className="text-white/70 hover:text-lush transition-colors duration-300 block">Nomad Programs</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-lush transition-colors duration-300 block">Direct Inquiries</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium">
          <span className="flex items-center gap-2">
            <span className="text-lush">✦</span> Limbe, South West Region, Cameroon
          </span>
          <span>© 2026 Ngeme Resort — All Rights Reserved</span>
          <div className="flex gap-8">
            <a href="#" className="text-white/40 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}