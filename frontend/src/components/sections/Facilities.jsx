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
        
        {/* Header - REPLACED "5-Star BS" with meaningful context */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-12">
          <div className="max-w-2xl">
            <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
                The Infrastructure
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic leading-[1] tracking-tight mb-6">
              World-Class <br /> Amenities
            </h2>
          </div>
          
          {/* New Explanatory Text Block */}
          <div className="lg:max-w-xs border-l-2 border-lush pl-8 py-2">
            <p className="text-volcanic/80 text-sm md:text-base leading-relaxed italic font-light">
              "We provide the invisible infrastructure that allows the global mind to rest, 
              ensuring every functional detail of your stay is met with diplomatic precision 
              and local warmth."
            </p>
          </div>
        </div>

        {/* --- MOBILE VIEW (Accordion Style) --- */}
        <div className="lg:hidden space-y-4">
          {facilityCategories.map((cat) => {
            const Icon = cat.icon;
            const isOpen = activeTab === cat.id;
            return (
              <div key={cat.id} className="border-b border-sand pb-2">
                <button
                  onClick={() => setActiveTab(isOpen ? "" : cat.id)}
                  className={`w-full flex items-center justify-between py-6 transition-all duration-300 ${isOpen ? "text-lush" : "text-ocean"}`}
                >
                  <div className="flex items-center gap-5">
                    <Icon className={`w-5 h-5 ${isOpen ? "text-lush" : "text-ocean/40"}`} />
                    <span className="font-bold uppercase tracking-[0.2em] text-[12px]">{cat.label}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180 text-lush" : "opacity-30"}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-5 py-6 px-2 bg-sand/20 rounded-2xl mb-4">
                        {cat.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <CheckCircle2 className="w-4 h-4 text-lush shrink-0" />
                            <span className="text-volcanic text-base font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-6">
            {facilityCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full flex items-center justify-between p-8 rounded-[2rem] transition-all duration-500 group border-2 ${
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
                  <ChevronRight className={`w-5 h-5 transition-all duration-500 ${isActive ? "opacity-100 text-lush" : "opacity-20 text-ocean"}`} />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-sand/20 rounded-[4rem] p-24 relative min-h-[650px] border border-sand shadow-inner flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <div className="flex items-center gap-8 mb-16">
                  <h3 className="text-5xl font-serif text-ocean italic">{activeCategory?.label}</h3>
                  <div className="h-px flex-1 bg-ocean/10" />
                </div>
                
                <div className="grid grid-cols-2 gap-y-12 gap-x-16">
                  {activeCategory?.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-6 group">
                      <CheckCircle2 className="w-6 h-6 text-lush mt-0.5 shrink-0" />
                      <span className="text-volcanic font-medium text-xl xl:text-2xl leading-snug tracking-tight">
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