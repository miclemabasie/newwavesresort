import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Sparkles, 
  Wifi, 
  ConciergeBell, 
  UtensilsCrossed, 
  ChevronRight, 
  CheckCircle2,
  ChevronDown
} from "lucide-react";

const facilityCategories = [
  {
    id: "living",
    label: "The Residency",
    icon: Home,
    items: ["Adults Only", "Private Entrance", "Hardwood Floors", "Walk-in Closet", "Soundproof/Hypoallergenic", "Air Conditioning", "Laptop Safe"]
  },
  {
    id: "wellness",
    label: "Spa & Wellness",
    icon: Sparkles,
    items: ["Hot Tub/Jacuzzi", "Spa Tub", "Bathrobes & Slippers", "Bidet", "Premium Toiletries", "Rain Shower", "Deep Soak Bathtub"]
  },
  {
    id: "tech",
    label: "Connectivity",
    icon: Wifi,
    items: ["Free High Speed Wifi", "Streaming (Netflix)", "Socket Near Bed", "Flat-screen TV", "Cable Channels", "Global Languages Spoken"]
  },
  {
    id: "concierge",
    label: "Services",
    icon: ConciergeBell,
    items: ["24-Hour Security", "Private Check-in/out", "Airport Shuttle", "Daily Housekeeping", "Laundry & Suit Press", "Free Private Parking"]
  },
  {
    id: "culinary",
    label: "Kitchen & Dining",
    icon: UtensilsCrossed,
    items: ["Full Kitchenette", "Refrigerator", "Dining Area", "Electric Kettle", "Washing Machine", "Room Service", "Landmark View Terrace"]
  }
];

export default function Facilities() {
  const [activeTab, setActiveTab] = useState("living");
  const activeCategory = facilityCategories.find(c => c.id === activeTab);

  return (
    <section className="py-24 md:py-32 bg-white border-y border-sand overflow-hidden">
      <div className="container mx-auto px-6 lg:max-w-7xl">
        
        {/* Header - Using YOUR 'ocean' and 'lush' */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-lush font-bold tracking-[0.4em] uppercase text-[10px]">Unparalleled Provisions</span>
            <h2 className="text-4xl md:text-7xl font-serif mt-4 text-ocean leading-[1.1] tracking-tight">
              World-Class <br className="hidden md:block" /> Amenities
            </h2>
          </div>
          
          <div className="bg-sand p-6 md:p-8 rounded-[2rem] border border-ocean/5 flex items-center gap-6 shadow-sm w-full md:w-auto">
            <span className="text-5xl font-serif text-lush leading-none">5★</span>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-volcanic leading-tight">
                International <br/> Residency Standard
            </div>
          </div>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-start">
          
          {/* Menu Column: Spaced out (space-y-6) and Permanent Chevron */}
          <div className="lg:col-span-4 space-y-6">
            {facilityCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full flex items-center justify-between p-7 rounded-[1.8rem] transition-all duration-500 group border-2 ${
                    isActive 
                    ? "bg-ocean text-white shadow-2xl translate-x-6 border-ocean" 
                    : "bg-transparent text-ocean hover:bg-sand/40 border-transparent hover:border-sand"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <Icon strokeWidth={isActive ? 2 : 1.5} className={`w-6 h-6 transition-colors duration-500 ${isActive ? "text-lush" : "text-ocean/40 group-hover:text-ocean"}`} />
                    <span className="font-bold uppercase tracking-[0.25em] text-[11px]">
                      {cat.label}
                    </span>
                  </div>
                  
                  {/* Chevron is now always visible at low opacity, turns Lush when active */}
                  <ChevronRight 
                    className={`w-5 h-5 transition-all duration-500 ${
                      isActive 
                      ? "opacity-100 translate-x-0 text-lush" 
                      : "opacity-20 group-hover:opacity-100 group-hover:translate-x-1 text-ocean"
                    }`} 
                  />
                </button>
              );
            })}
          </div>

          {/* Content Column - Using YOUR 'ocean' and 'lush' */}
          <div className="lg:col-span-8 bg-sand/20 rounded-[3rem] p-16 md:p-20 relative min-h-[600px] border border-sand shadow-inner flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <div className="flex items-center gap-8 mb-16">
                  <h3 className="text-4xl font-serif text-ocean italic">{activeCategory.label}</h3>
                  <div className="h-px flex-1 bg-ocean/10" />
                </div>
                
                <div className="grid grid-cols-2 gap-y-10 gap-x-16">
                  {activeCategory.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-5">
                      <CheckCircle2 className="w-6 h-6 text-lush mt-0.5 shrink-0" />
                      <span className="text-volcanic font-medium text-lg md:text-xl leading-snug tracking-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}