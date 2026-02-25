import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-volcanic pt-24 pb-12 text-sand overflow-hidden relative">
      {/* Background Accent Text */}
      <div className="absolute top-0 right-0 text-[15rem] font-bold text-white/[0.02] leading-none pointer-events-none select-none">
        NGEME
      </div>

      <div className="container">
        {/* Newsletter Section */}
        <div className="bg-ocean rounded-3xl p-8 md:p-16 mb-24 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="text-white text-3xl font-serif mb-4">Stay Informed</h3>
            <p className="text-white/70 text-sm">Join our network for updates on the Ocean-Side Dialogues and exclusive Fisiy Foundation projects.</p>
          </div>
          <form className="w-full max-w-md flex gap-2">
            <input 
              type="email" 
              placeholder="Your Professional Email" 
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-lush transition-colors"
            />
            <button className="bg-lush hover:bg-white hover:text-lush text-white px-8 py-4 rounded-lg font-bold transition-all">
              Join
            </button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="grid md:grid-cols-4 gap-12 mb-20 border-b border-white/5 pb-20">
          <div className="col-span-2">
            <h4 className="text-white text-xl font-bold tracking-tighter uppercase mb-6">The NewWaveResort</h4>
            <p className="max-w-sm text-sm opacity-60 leading-relaxed">
              Ngeme is a premier nomadic hub and hospitality sanctuary in Limbe, Cameroon. 
              As a vehicle for the Fisiy Foundation, we believe in the power of connection and social inclusivity.
            </p>
          </div>
          <div>
            <h5 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-6">The Legacy</h5>
            <ul className="space-y-3 text-sm opacity-60">
              <li><Link to="/foundation" className="hover:text-lush">Fisiy Foundation</Link></li>
              <li><Link to="/dialogues" className="hover:text-lush">Ocean-Side Dialogues</Link></li>
              <li><Link to="/sustainability" className="hover:text-lush">Sustainability Report</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Concierge</h5>
            <ul className="space-y-3 text-sm opacity-60">
              <li><Link to="/rooms" className="hover:text-lush">Book a Suite</Link></li>
              <li><Link to="/nomads" className="hover:text-lush">Nomad Programs</Link></li>
              <li><Link to="/contact" className="hover:text-lush">Inquiries</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] opacity-40">
          <span>Limbe, South West Region, Cameroon</span>
          <span>© 2026 Crafted with Excellence for Ngeme Resort</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-lush">Instagram</a>
            <a href="#" className="hover:text-lush">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}