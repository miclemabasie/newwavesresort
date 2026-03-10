import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/sections/Footer";
import { 
  Mic2, Calendar, Users, MapPin, Star, ArrowRight, Quote, 
  Youtube, Play, X, Clock, BookOpen, Globe, Award, Eye 
} from "lucide-react";

// Sample past talks data with YouTube links
const pastTalks = [
  {
    id: 1,
    title: "The Future of African Governance: Digital Democracy",
    speaker: "Dr. Ngozi Okonjo-Iweala",
    speakerTitle: "WTO Director-General",
    date: "March 12, 2026",
    description: "In this powerful address, Dr. Okonjo-Iweala explores how digital transformation is reshaping governance across the continent—from blockchain voting systems to AI-driven public service delivery. She argues that Africa has a unique opportunity to leapfrog traditional bureaucratic models and build institutions that are more transparent, accountable, and inclusive than those in the West.",
    youtubeId: "5Aa9Mc1VqKE", // Replace with actual YouTube IDs
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    duration: "54:32",
    views: "2.4K"
  },
  {
    id: 2,
    title: "Planetary Entanglements: Africa in the Anthropocene",
    speaker: "Prof. Achille Mbembe",
    speakerTitle: "Philosopher & Political Theorist",
    date: "February 8, 2026",
    description: "Professor Mbembe delivers a profound meditation on Africa's relationship to the planet—how the continent's ecological wisdom, forged over millennia, offers vital lessons for a world facing climate catastrophe. He challenges the audience to rethink development not as extraction but as reciprocal care between human and non-human worlds.",
    youtubeId: "5Aa9Mc1VqKE",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=600",
    duration: "1:12:18",
    views: "3.1K"
  },
  {
    id: 3,
    title: "The Danger of a Single Story: Reimagining African Narratives",
    speaker: "Chimamanda Ngozi Adichie",
    speakerTitle: "Author",
    date: "January 19, 2026",
    description: "Building on her legendary TED Talk, Chimamanda engages in a intimate conversation about the power of stories to shape perceptions—and the responsibility of African writers to tell their own tales. She reads from unpublished work and discusses how literature can heal the wounds of colonial historiography.",
    youtubeId: "5Aa9Mc1VqKE",
    image: "https://images.unsplash.com/photo-1544717301-9cdcb1f5940f?auto=format&fit=crop&q=80&w=600",
    duration: "1:08:45",
    views: "5.7K"
  },
  {
    id: 4,
    title: "Restorative Justice: Lessons from Post-Apartheid South Africa",
    speaker: "Judge Albie Sachs",
    speakerTitle: "Former Justice, Constitutional Court of South Africa",
    date: "December 5, 2025",
    description: "Judge Sachs shares riveting stories from the Truth and Reconciliation Commission and reflects on how societies torn by conflict can begin to heal. He argues that true justice is not punitive but restorative—a lesson as urgent for divided democracies today as it was in 1994.",
    youtubeId: "5Aa9Mc1VqKE",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    duration: "1:24:09",
    views: "1.8K"
  },
  {
    id: 5,
    title: "AI and the Future of African Governance",
    speaker: "Dr. Fei-Fei Li (via satellite)",
    speakerTitle: "Co-Director, Stanford Human-Centered AI Institute",
    date: "November 22, 2025",
    description: "In a historic satellite link, Dr. Li discusses how artificial intelligence can be harnessed for public good—from predicting disease outbreaks to optimizing crop yields. She emphasizes the need for African leadership in shaping AI ethics, ensuring that algorithms reflect the continent's diverse cultures and values.",
    youtubeId: "5Aa9Mc1VqKE",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
    duration: "1:05:22",
    views: "4.2K"
  }
];

const upcomingEvents = [
  { date: "May 15, 2026", topic: "AI and the Future of African Governance", speaker: "Dr. Fei-Fei Li (via satellite)" },
  { date: "June 3, 2026", topic: "Restorative Justice: Lessons from the Global South", speaker: "Judge Albie Sachs" },
  { date: "July 21, 2026", topic: "African Philosophy in the 21st Century", speaker: "Prof. Souleymane Bachir Diagne" },
];

export default function IntellectualTalks() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAllTalks, setShowAllTalks] = useState(false);

  // For empty state demonstration (comment out the pastTalks array above and uncomment below to test)
  // const pastTalks = [];

  const displayedTalks = showAllTalks ? pastTalks : pastTalks.slice(0, 3);

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero - enriched with more context */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">
                Thought Leadership
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-8">
                Ocean-Side <span className="italic text-lush">Intellectual Talks</span>
              </h1>
              <p className="text-volcanic/70 text-xl leading-relaxed mb-6">
                Where the Atlantic meets the avant‑garde. Our signature series brings together the world's brightest minds for intimate dialogues under the stars. Each session is a deep dive into the ideas shaping our continent and our century—from philosophy and governance to technology and the arts.
              </p>
              <p className="text-volcanic/60 text-lg leading-relaxed mb-8">
                What began in 2023 as intimate conversations around a fire pit has grown into a globally recognized forum. Past speakers include Nobel laureates, heads of state, and cultural icons—all invited not for their titles, but for their willingness to think out loud, to question orthodoxy, and to engage with our guests as equals.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">The Lighthouse Pavilion</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Every Thursday evening</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="text-lush w-5 h-5" />
                  <span className="text-volcanic font-medium">Recorded & archived on YouTube</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-sand/30"
            >
              <img
                src="https://www.goodthingsguy.com/wp-content/uploads/2023/02/1677225977116.jpeg"
                alt="Intellectual Talk"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-volcanic/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-lush font-bold text-sm mb-2">FEATURED MOMENT</p>
                <p className="text-xl font-serif italic">"The future is not something we enter. The future is something we create."</p>
                <p className="text-white/70 mt-2">— Prof. Achille Mbembe, February 2026</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Experience - expanded with more text */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-sand/40">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6 text-center">More Than a Lecture</h2>
            <p className="text-volcanic/60 text-lg text-center max-w-3xl mx-auto mb-12">
              We reject the passive auditorium model. Our talks are designed for genuine intellectual exchange—where the distance between speaker and audience dissolves, and ideas flow freely.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-lush/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-lush" />
                </div>
                <h3 className="text-xl font-serif text-volcanic mb-3">Intimate Setting</h3>
                <p className="text-volcanic/60">Limited to 30 guests, allowing genuine exchange between audience and speaker. No podiums, no barriers—just chairs arranged in a circle under the stars.</p>
              </div>
              <div className="text-center">
                <div className="bg-lush/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-lush" />
                </div>
                <h3 className="text-xl font-serif text-volcanic mb-3">Global Voices, Local Wisdom</h3>
                <p className="text-volcanic/60">We deliberately pair international thought leaders with Cameroonian elders, activists, and artists. The result is a dialogue that transcends cultural boundaries.</p>
              </div>
              <div className="text-center">
                <div className="bg-lush/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-lush" />
                </div>
                <h3 className="text-xl font-serif text-volcanic mb-3">Lasting Archive</h3>
                <p className="text-volcanic/60">Every talk is professionally recorded and made available on our YouTube channel—building a growing library of African intellectual thought for the world.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Past Talks - Video Cards */}
        <section className="container mx-auto px-6 mb-20">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic">Past Talks</h2>
              <p className="text-volcanic/60 text-lg mt-2">Watch full recordings of previous sessions</p>
            </div>
            {pastTalks.length > 3 && (
              <button 
                onClick={() => setShowAllTalks(!showAllTalks)}
                className="flex items-center gap-2 text-lush font-bold uppercase tracking-wider text-sm hover:gap-3 transition-all"
              >
                {showAllTalks ? "Show Less" : "View All Talks"} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {pastTalks.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-16 text-center border border-sand/40">
              <Youtube className="w-16 h-16 text-lush/30 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-volcanic mb-3">Coming Soon</h3>
              <p className="text-volcanic/50 text-lg max-w-md mx-auto mb-6">
                Our inaugural talk series launches in June 2026. We're curating an extraordinary lineup of thinkers—subscribe to be notified.
              </p>
              <button className="bg-lush text-volcanic px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
                Get Notified
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedTalks.map((talk, idx) => (
                  <motion.div
                    key={talk.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-[2rem] overflow-hidden border border-sand/40 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                    onClick={() => setSelectedVideo(talk)}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={talk.image} 
                        alt={talk.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-volcanic/30 group-hover:bg-volcanic/50 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-lush rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-volcanic ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {talk.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lush text-xs font-bold">{talk.date}</span>
                        <span className="text-volcanic/30">•</span>
                        <span className="text-volcanic/50 text-xs">{talk.views} views</span>
                      </div>
                      <h3 className="text-xl font-serif text-volcanic mb-2 line-clamp-2">{talk.title}</h3>
                      <p className="text-volcanic/70 font-medium mb-1">{talk.speaker}</p>
                      <p className="text-volcanic/50 text-sm mb-4">{talk.speakerTitle}</p>
                      <p className="text-volcanic/60 text-sm line-clamp-3">{talk.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {!showAllTalks && pastTalks.length > 3 && (
                <div className="text-center mt-12">
                  <button 
                    onClick={() => setShowAllTalks(true)}
                    className="inline-flex items-center gap-2 bg-volcanic text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-lush transition-colors"
                  >
                    Load All {pastTalks.length} Talks <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Upcoming Events */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-volcanic rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, #7aa65a 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 text-center">Upcoming Dialogues</h2>
              <p className="text-white/60 text-lg text-center max-w-2xl mx-auto mb-12">
                Join us under the stars for these upcoming conversations. Space is limited—reservations recommended.
              </p>
              <div className="space-y-4 max-w-3xl mx-auto">
                {upcomingEvents.map((event, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-white/20"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-lush font-bold text-sm">{event.date}</span>
                      </div>
                      <h3 className="text-xl font-serif text-white mb-1">{event.topic}</h3>
                      <p className="text-white/70">with {event.speaker}</p>
                    </div>
                    <button className="bg-lush text-volcanic px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors whitespace-nowrap">
                      Reserve Seat
                    </button>
                  </motion.div>
                ))}
              </div>
              <p className="text-white/40 text-center mt-8 text-sm max-w-2xl mx-auto">
                All talks are complimentary for resort guests. External attendance is available by prior arrangement—please contact our concierge.
              </p>
            </div>
          </div>
        </section>

        {/* Why This Matters - new section with deeper context */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
                The Vision
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Why Intellectual Talks?</h2>
              <p className="text-volcanic/70 text-lg leading-relaxed mb-6">
                In an age of soundbites and algorithms, we believe in the power of slow, sustained thought. The most urgent problems facing Africa and the world—climate change, inequality, democratic backsliding—cannot be solved by quick fixes. They require deep, interdisciplinary dialogue.
              </p>
              <p className="text-volcanic/70 text-lg leading-relaxed mb-6">
                Our talks are designed to model what that dialogue looks like: rigorous, respectful, and radically open. We invite speakers not to deliver a monologue, but to enter into conversation with our guests, with local thinkers, and with the place itself—the volcanic shores of Limbe, where Africa meets the Atlantic.
              </p>
              <p className="text-volcanic/70 text-lg leading-relaxed">
                Each talk is recorded and archived, creating a growing digital library of African intellectual thought—accessible to anyone, anywhere, for free. Because the conversations that happen here shouldn't end at the water's edge.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Award className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">12</div>
                <div className="text-xs text-volcanic/50">Talks to date</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Users className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">360+</div>
                <div className="text-xs text-volcanic/50">Attendees</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Globe className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">14</div>
                <div className="text-xs text-volcanic/50">Countries represented</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-sand/40 text-center">
                <Youtube className="w-8 h-8 text-lush mx-auto mb-3" />
                <div className="text-2xl font-serif text-volcanic">17K+</div>
                <div className="text-xs text-volcanic/50">YouTube views</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-volcanic mb-6">Join the Conversation</h2>
            <p className="text-volcanic/70 text-lg max-w-2xl mx-auto mb-10">
              Whether you're a guest at Ngeme or a scholar visiting Cameroon, we invite you to be part of these transformative evenings. Subscribe to our newsletter for updates on upcoming talks and new video releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-3 bg-lush text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all">
                Attend a Talk <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="https://youtube.com/@ngemeresort" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border-2 border-volcanic text-volcanic px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-volcanic hover:text-white transition-all"
              >
                <Youtube className="w-4 h-4" /> Watch on YouTube
              </a>
            </div>
          </div>
        </section>

        {/* YouTube Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-volcanic/80 backdrop-blur-lg"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[2rem] max-w-4xl w-full overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 z-10 bg-volcanic text-white p-2 rounded-full hover:bg-lush transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  {/* YouTube Embed */}
                  <div className="relative pt-[56.25%] bg-black">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-serif text-volcanic mb-2">{selectedVideo.title}</h3>
                    <p className="text-lush font-medium mb-1">{selectedVideo.speaker}</p>
                    <p className="text-volcanic/50 text-sm mb-4">{selectedVideo.date} • {selectedVideo.duration}</p>
                    <p className="text-volcanic/70">{selectedVideo.description}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}