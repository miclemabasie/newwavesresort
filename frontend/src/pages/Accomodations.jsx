import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { Check, X, Calendar, Users, Coffee, Waves, Search, ArrowUpDown } from "lucide-react";

const suites = [
  {
    id: "ocean-suite",
    title: "Ocean View Suite",
    price: 350,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000",
    description: "Wake up to the gentle sounds of the Atlantic and panoramic views of the shimmering coastline. Our Ocean View Suites blend modern comfort with traditional Cameroonian elegance.",
    amenities: ["Private Balcony", "King-size Bed", "Spacious Living Area", "En-suite Bathroom", "High-speed Wi-Fi"]
  },
  {
    id: "garden-bungalow",
    title: "Garden Bungalow",
    price: 280,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
    description: "Nestled amidst lush tropical gardens, our Garden Bungalows offer a tranquil escape. Enjoy privacy and serenity with easy access to the resort's facilities.",
    amenities: ["Private Patio", "Queen-size Bed", "Garden Views", "Outdoor Shower", "Personalized Concierge"]
  },
  {
    id: "executive-villa",
    title: "Executive Villa",
    price: 800,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    description: "For those seeking ultimate luxury, our Executive Villas provide an unparalleled experience. Featuring multiple bedrooms, a private pool, and dedicated staff.",
    amenities: ["Private Infinity Pool", "Multiple Bedrooms", "Butler Service", "Gourmet Kitchen", "Panoramic Views"]
  },
  {
    id: "deluxe-room",
    title: "Deluxe Room",
    price: 220,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000",
    description: "Our Deluxe Rooms offer a cozy yet elegant stay. Ideal for couples or solo travelers. Thoughtfully designed with comfort in mind for a peaceful retreat.",
    amenities: ["Comfortable Double Bed", "Modern Furnishings", "Smart TV", "Mini-Bar", "Room Service"]
  }
];

export default function Accommodations() {
  const [selectedSuite, setSelectedSuite] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredSuites = useMemo(() => {
    let filtered = suites.filter(suite =>
      suite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suite.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [searchQuery, sortBy]);

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Header */}
        <section className="container mx-auto px-6 mb-12 text-center">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-lush font-black tracking-[0.5em] uppercase text-[10px] block mb-4"
          >
            The Residency
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif text-volcanic italic">Exquisite Sanctuaries</h1>
          <p className="text-volcanic/60 mt-6 max-w-2xl mx-auto text-lg">
            Designed for the intellectual nomad, our rooms offer the perfect balance of 
            African warmth and executive functionality.
          </p>
        </section>

        {/* Filter Bar */}
        <section className="container mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic/40" />
              <input
                type="text"
                placeholder="Search suites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-sand/60 bg-white text-volcanic placeholder:text-volcanic/40 focus:outline-none focus:border-lush"
              />
            </div>

            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-4 h-4 text-volcanic/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-sand/60 rounded-full py-3 px-5 text-sm text-volcanic focus:outline-none focus:border-lush"
              >
                <option value="default">Sort by</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <p className="text-volcanic/50 text-sm mt-4 text-center md:text-left">
            {filteredSuites.length} {filteredSuites.length === 1 ? 'sanctuary' : 'sanctuaries'} available
          </p>
        </section>

        {/* Suites Grid - 4 columns on large screens */}
        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredSuites.map((suite, idx) => (
                <motion.div 
                  key={suite.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-reset border border-sand group hover:shadow-2xl transition-shadow flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={suite.image} 
                      alt={suite.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                      <span className="text-lush font-serif font-bold text-sm">${suite.price}</span>
                      <span className="text-[8px] text-volcanic/60 uppercase tracking-widest ml-1">/ night</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-serif text-volcanic mb-3">{suite.title}</h3>
                    <p className="text-volcanic/60 text-xs leading-relaxed mb-4 line-clamp-3">
                      {suite.description}
                    </p>

                    <div className="space-y-2 mb-5">
                      <p className="text-[8px] uppercase tracking-[0.3em] font-black text-lush mb-2">Key Amenities</p>
                      <div className="grid grid-cols-1 gap-2">
                        {suite.amenities.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="w-3 h-3 text-lush flex-shrink-0" strokeWidth={3} />
                            <span className="text-[9px] font-bold text-volcanic/80 uppercase tracking-tighter truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedSuite(suite)}
                      className="w-full bg-volcanic hover:bg-lush text-white font-black py-4 rounded-xl transition-all shadow-md uppercase text-[9px] tracking-[0.3em] mt-auto"
                    >
                      Reserve
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* No results */}
        {filteredSuites.length === 0 && (
          <div className="text-center py-20">
            <p className="text-volcanic/40 text-lg">No suites match your search.</p>
          </div>
        )}
      </main>

      {/* Reservation Modal (unchanged, but keep it) */}
      <AnimatePresence>
        {selectedSuite && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSuite(null)}
              className="absolute inset-0 bg-volcanic/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-sand w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl grid lg:grid-cols-2"
            >
              <button 
                onClick={() => setSelectedSuite(null)}
                className="absolute top-6 right-6 z-20 bg-volcanic text-white p-2 rounded-full hover:bg-lush transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Left: Info */}
              <div className="hidden lg:block relative bg-volcanic p-12 text-white">
                <div className="absolute inset-0 opacity-20">
                    <Waves className="w-full h-full text-white p-20" />
                </div>
                <div className="relative z-10">
                    <span className="text-lush font-black tracking-widest text-[10px] uppercase">Reservation Detail</span>
                    <h2 className="text-4xl font-serif mt-4 mb-6">{selectedSuite.title}</h2>
                    <p className="text-white/60 mb-8 italic">"A sanctuary for the global mind, rooted in the volcanic beauty of Limbe."</p>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Coffee className="text-lush" />
                            <span className="text-sm font-medium">Complimentary Organic Breakfast</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Users className="text-lush" />
                            <span className="text-sm font-medium">Concierge Guided Check-in</span>
                        </div>
                    </div>
                </div>
              </div>

              {/* Modal Right: Form */}
              <div className="p-8 md:p-12 bg-white">
                <h3 className="text-2xl font-serif text-volcanic mb-8">Booking Inquiry</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-lush">Arrival</label>
                        <input 
                          type="date" 
                          className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-lush">Departure</label>
                        <input 
                          type="date" 
                          className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors" 
                        />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-lush">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Dr. Julian F." 
                      className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-lush">Special Requirements</label>
                    <textarea 
                      placeholder="e.g. Dietary needs, Airport pickup, Workspace setup..." 
                      className="w-full bg-sand/50 border border-sand/60 rounded-xl p-4 text-sm outline-none focus:border-lush transition-colors resize-none" 
                      rows="3" 
                    />
                  </div>

                  <button className="w-full bg-lush hover:bg-volcanic text-white font-black py-5 rounded-xl uppercase text-[10px] tracking-[0.3em] transition-all">
                    Confirm Availability
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}