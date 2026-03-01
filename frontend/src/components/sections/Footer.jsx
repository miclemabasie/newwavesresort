import { Link } from "react-router";
import logo from "../../assets/general/logo.png";
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Youtube, 
  MapPin 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-volcanic pt-24 pb-12 text-sand overflow-hidden relative">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 text-[12rem] font-bold text-white/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
        NEW WAVES
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:max-w-7xl">
        {/* Newsletter Section */}
        <div className="bg-ocean rounded-3xl p-8 md:p-16 mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="text-white text-3xl font-serif mb-4 italic">Stay Informed</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Join our exclusive network for updates on the Ocean-Side Dialogues and Fisiy Foundation progress.
            </p>
          </div>
          
          <form className="w-full max-w-md flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your Professional Email" 
              className="w-full flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-lush transition-colors"
            />
            <button className="bg-white text-ocean hover:bg-lush hover:text-white px-8 py-4 rounded-xl font-bold transition-all uppercase text-[10px] tracking-widest whitespace-nowrap flex-shrink-0">
              Join
            </button>
          </form>
        </div>

        {/* Footer Navigation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20 border-b border-white/10 pb-20">
          <div className="lg:col-span-2">
            {/* Branding Section */}
            <div className="flex items-center gap-4 mb-8">
              <img 
                src={logo}
                alt="New Waves Logo" 
                className="w-12 h-12 object-contain" 
              />
              <h4 className="text-white text-2xl font-serif">New Waves Resort</h4>
            </div>
            <p className="max-w-sm text-sm text-white/60 leading-relaxed mb-8">
              A premier nomadic hub and hospitality sanctuary in Limbe, Cameroon. 
              As a vehicle for the Fisiy Foundation, we believe in the power of connection and social inclusivity.
            </p>
            {/* Social Icons - Integrated for High Visibility */}
            <div className="flex gap-5">
              <SocialIcon Icon={Instagram} href="#" />
              <SocialIcon Icon={Linkedin} href="#" />
              <SocialIcon Icon={Facebook} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Youtube} href="#" />
            </div>
          </div>
          
          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">The Legacy</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/foundation" className="text-white/50 hover:text-lush transition-colors duration-300 block">Fisiy Foundation</Link></li>
              <li><Link to="/dialogues" className="text-white/50 hover:text-lush transition-colors duration-300 block">Ocean-Side Dialogues</Link></li>
              <li><Link to="/sustainability" className="text-white/50 hover:text-lush transition-colors duration-300 block">Sustainability Report</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Concierge</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/rooms" className="text-white/50 hover:text-lush transition-colors duration-300 block">Book a Suite</Link></li>
              <li><Link to="/nomads" className="text-white/50 hover:text-lush transition-colors duration-300 block">Nomad Programs</Link></li>
              <li><Link to="/contact" className="text-white/50 hover:text-lush transition-colors duration-300 block">Direct Inquiries</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Contact</h5>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-lush shrink-0 mt-0.5" />
                <span>Limbe, South West Region, Cameroon</span>
              </li>
              <li>concierge@newwaves.com</li>
              <li>+237 000 000 000</li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
          <div className="flex items-center gap-3">
            <span className="text-lush">✦</span> 
            <span>EST. 2025</span>
            <span className="hidden md:block opacity-20">|</span>
            <span>Limbe Sanctuary</span>
          </div>
          <p>© 2026 New Waves Resort — All Rights Reserved</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Stay</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-component for clean Social Icon rendering
function SocialIcon({ Icon, href }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-lush hover:border-lush hover:-translate-y-1 transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={18} strokeWidth={1.5} />
    </a>
  );
}