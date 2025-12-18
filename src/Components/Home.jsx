import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Award,
  Star,
  Check,
  ChevronRight,
  Play,
  Building2,
  Heart,
  Briefcase,
  PartyPopper,
  Mic2,
  Camera,
  Music,
  Phone,
  Mail,
  MapPin,
  Quote,
  Users,
  Clock,
  Target,
  Zap,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Share2,
  Heart as HeartIcon,
  Download,
  Maximize2,
  Grid3x3
} from 'lucide-react';
import baseURL from '../Services/Base';

export default function Homepage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState(0);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [portfolioEvents, setPortfolioEvents] = useState([]);
  const [allPortfolioEvents, setAllPortfolioEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [showAllPortfolio, setShowAllPortfolio] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  const words = ["Extraordinary", "Unforgettable", "Magical", "Exceptional"];
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        const featuredResponse = await axios.get(`${baseURL}/events?featured=true&limit=3`);
        setFeaturedEvents(featuredResponse.data.events || []);

        const portfolioResponse = await axios.get(`${baseURL}/events?status=published&limit=12`);
        const events = portfolioResponse.data.events || [];
        setAllPortfolioEvents(events);
        setPortfolioEvents(events.slice(0, 6));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      icon: Building2,
      title: 'Corporate Events',
      description: 'Professional gatherings that inspire and connect your team.',
      color: '#4A7BFF',
      features: ['Team Building', 'Annual Galas', 'Product Launches'],
      image: '/cor.webp'
    },
    {
      icon: Heart,
      title: 'Weddings',
      description: 'Your perfect day, planned to perfection with love and care.',
      color: '#FF6B9D',
      features: ['Full Planning', 'Day Coordination', 'Venue Selection'],
      image: '/wed.webp'
    },
    {
      icon: Briefcase,
      title: 'Exhibitions',
      description: 'Showcase your brand with stunning, impactful displays.',
      color: '#9CF3FF',
      features: ['Booth Design', 'Brand Activation', 'Trade Shows'],
      image: '/ex.webp'
    },
    {
      icon: PartyPopper,
      title: 'Private Celebrations',
      description: 'Birthdays, anniversaries, and milestones worth celebrating.',
      color: '#FFB84D',
      features: ['Themed Parties', 'Milestone Events', 'Intimate Gatherings'],
      image: '/pr.webp'
    },
    {
      icon: Mic2,
      title: 'Conferences',
      description: 'Seamless execution of large-scale professional gatherings.',
      color: '#B088F9',
      features: ['AV Production', 'Registration', 'Logistics'],
      image: '/con.webp'
    },
    {
      icon: Music,
      title: 'Entertainment',
      description: 'World-class performers and production for any occasion.',
      color: '#FF8A5C',
      features: ['Live Bands', 'DJs', 'Cultural Shows'],
      image: '/en.webp'
    }
  ];

  const stats = [
    { value: '500+', label: 'Events', icon: Calendar },
    { value: '300+', label: 'Clients', icon: Award },
    { value: '10+', label: 'Years', icon: Sparkles },
    { value: '50+', label: 'Team Members', icon: Building2 }
  ];

  const process = [
    { step: '01', title: 'Consultation', desc: 'Understanding your vision and requirements', icon: Users },
    { step: '02', title: 'Planning', desc: 'Detailed strategy and creative concept development', icon: Target },
    { step: '03', title: 'Execution', desc: 'Flawless delivery with on-site coordination', icon: Zap },
    { step: '04', title: 'Follow-up', desc: 'Post-event analysis and feedback collection', icon: Clock }
  ];

  const testimonials = [
    {
      name: 'Ahmed Al Mansoori',
      role: 'CEO, Emirates Tech',
      content: 'Diamond Dreams exceeded every expectation. Their professionalism and creativity made our annual gala truly spectacular.',
      rating: 5,
      avatar: 'AM',
      image: '/images/testimonial1.jpg'
    },
    {
      name: 'Sarah Williams',
      role: 'Marketing Director',
      content: 'From the first meeting to the final moment, everything was perfect. Our product launch was a massive success.',
      rating: 5,
      avatar: 'SW',
      image: '/images/testimonial2.jpg'
    },
    {
      name: 'Fatima Al Hashimi',
      role: 'Bride',
      content: 'They made our dream wedding come true. Every detail was handled with care and precision. Absolutely magical!',
      rating: 5,
      avatar: 'FA',
      image: '/images/testimonial3.jpg'
    }
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };

  const handlePrevImage = () => {
    setModalImageIndex(prev => 
      prev === 0 ? (selectedEvent?.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setModalImageIndex(prev => 
      prev === (selectedEvent?.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleViewMore = () => {
    setShowAllPortfolio(!showAllPortfolio);
  };

  // Helper function to format location object
  const formatLocation = (location) => {
    if (!location) return "Abu Dhabi";
    
    if (typeof location === 'string') return location;
    
    if (typeof location === 'object') {
      // Handle location object
      if (location.address) return location.address;
      if (location.city) return location.city;
      if (location.name) return location.name;
    }
    
    return "Abu Dhabi";
  };

  const displayedPortfolioEvents = showAllPortfolio ? allPortfolioEvents : portfolioEvents;

  return (
    <div className="bg-black text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
        }
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #4A7BFF 0%, #9CF3FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #4A7BFF 0%, #6A5BFF 100%);
        }
        
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .word-fade-enter {
          animation: wordFadeIn 0.6s ease-out;
        }
        
        @keyframes wordFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .parallax-bg {
          transition: transform 0.3s ease-out;
        }
        
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shine-effect::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 70%
          );
          transform: translateX(-100%) translateY(-100%);
          transition: transform 0.6s;
        }
        
        .shine-effect:hover::after {
          transform: translateX(100%) translateY(100%);
        }
        
        .image-hover-effect {
          transition: transform 0.5s ease, filter 0.5s ease;
        }
        
        .image-hover-effect:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        
        .modal-content {
          width: 100%;
          max-width: 1200px;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .modal-image-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .modal-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        
        @media (max-width: 768px) {
          .modal-content {
            max-height: 95vh;
          }
          
          .modal-image-container {
            height: 300px;
          }
        }
      `}</style>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass rounded-3xl overflow-hidden">
                <div className="relative h-[400px] md:h-[500px] bg-black">
                  <div className="modal-image-container">
                    <img 
                      src={selectedEvent.images && selectedEvent.images[modalImageIndex] ? selectedEvent.images[modalImageIndex] : '/images/placeholder.jpg'} 
                      alt={`${selectedEvent.title || 'Event'} - Image ${modalImageIndex + 1}`}
                      className="modal-image"
                    />
                  </div>
                  
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  {selectedEvent.images && selectedEvent.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedEvent.images && selectedEvent.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModalImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === modalImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">{selectedEvent.title || 'Event'}</h2>
                      <div className="flex items-center gap-4 text-gray-400">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {selectedEvent.formattedDate || selectedEvent.date || 'Date not specified'}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#4A7BFF]/10 text-[#4A7BFF] text-sm">
                          {selectedEvent.eventType || 'Event'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <HeartIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {selectedEvent.description || "An extraordinary event crafted with precision and passion. Every detail was carefully planned and executed to create a memorable experience."}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="glass p-4 rounded-xl">
                          <div className="text-gray-400 text-sm mb-1">Location</div>
                          <div className="font-semibold">{formatLocation(selectedEvent.location)}</div>
                        </div>
                        <div className="glass p-4 rounded-xl">
                          <div className="text-gray-400 text-sm mb-1">Guests</div>
                          <div className="font-semibold">{selectedEvent.guests || selectedEvent.guestCount || "200+"}</div>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Event Highlights</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {selectedEvent.highlights && Array.isArray(selectedEvent.highlights) ? (
                            selectedEvent.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#4A7BFF]" />
                                <span className="text-gray-300">{highlight}</span>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#4A7BFF]" />
                                <span className="text-gray-300">Premium Decor</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#4A7BFF]" />
                                <span className="text-gray-300">Live Entertainment</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#4A7BFF]" />
                                <span className="text-gray-300">Gourmet Catering</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#4A7BFF]" />
                                <span className="text-gray-300">Professional Photography</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">Event Gallery</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedEvent.images && selectedEvent.images.slice(0, 4).map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setModalImageIndex(idx)}
                            className={`aspect-square rounded-xl overflow-hidden ${modalImageIndex === idx ? 'ring-2 ring-[#4A7BFF]' : ''}`}
                          >
                            <img 
                              src={img} 
                              alt={`Gallery ${idx + 1}`}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-black" />
          
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ background: 'radial-gradient(circle, #4A7BFF, transparent)' }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-25 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ background: 'radial-gradient(circle, #9CF3FF, transparent)' }}
          />

          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-20 sm:top-24 md:top-28 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #4A7BFF, #9CF3FF, #4A7BFF)',
                opacity: 0.3,
                filter: 'blur(20px)',
              }}
            />
            <img 
              src="/dlogo.webp" 
              alt="Diamond Dreams"
              className="relative w-full h-full object-contain"
            />
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-48 md:pt-52 lg:pt-56"
          style={{ opacity: headerOpacity, scale: headerScale }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.h1 
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              >
                <span className="text-white">Creating</span>
                <br />
                <motion.span
                  key={currentWord}
                  className="gradient-text word-fade-enter inline-block"
                >
                  {words[currentWord]}
                </motion.span>
                <br />
                <span className="text-white">Moments</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                Premium event management services in Abu Dhabi & Dubai. 
                <br className="hidden sm:block" />
                Where every detail matters and dreams become reality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(74, 123, 255, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 gradient-bg rounded-full text-white font-semibold flex items-center gap-2 shine-effect"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="#portfolio"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 glass rounded-full text-white font-semibold border border-white/10 transition-all"
                >
                  View Our Work
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 max-w-5xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(74, 123, 255, 0.2)" }}
                  className="glass p-6 rounded-2xl transition-all"
                >
                  <stat.icon className="w-6 h-6 text-[#9CF3FF] mx-auto mb-3" />
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronRight className="w-6 h-6 text-[#4A7BFF] rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Featured </span>
              <span className="gradient-text">Events</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A glimpse into our most memorable creations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {loading ? (
              [...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-3xl group cursor-pointer"
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-800 animate-pulse" />
                </motion.div>
              ))
            ) : featuredEvents.length > 0 ? (
              featuredEvents.slice(0, 3).map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleEventClick(event)}
                  className="relative overflow-hidden rounded-3xl group cursor-pointer"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={event.images && event.images[0] ? event.images[0] : '/images/placeholder.jpg'} 
                      alt={event.title || 'Event'}
                      className="w-full h-full object-cover image-hover-effect"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-2xl font-bold mb-2 text-white">{event.title || 'Event'}</h3>
                        <p className="text-gray-300 mb-3">{event.eventType || 'Event Type'}</p>
                        <p className="text-gray-400 text-sm mb-4">{event.formattedDate || event.date || 'Date not specified'}</p>
                        <div className="flex items-center gap-2 text-[#9CF3FF]">
                          <span className="text-sm font-medium">View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                    {event.eventType || 'Event'}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 col-span-3 text-center">No featured events available</p>
            )}
          </div>
        </div>
      </section>

      <section id="services" className="relative py-32 bg-gradient-to-b from-black to-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#9CF3FF]" />
              <span className="text-[#9CF3FF] text-sm font-medium">Our Expertise</span>
            </motion.div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Comprehensive Event</span>
              <br />
              <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Full-service event management tailored to your unique vision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-3xl group cursor-pointer transition-all overflow-hidden"
              >
                <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover image-hover-effect"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <motion.div
                  className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                    border: `1px solid ${service.color}20`
                  }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#9CF3FF] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <Check className="w-4 h-4" style={{ color: service.color }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="relative py-32 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Portfolio</span>
              <span className="text-white"> Gallery</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Visual stories of our most spectacular events
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {loading ? (
              [...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-square overflow-hidden rounded-2xl bg-gray-800 animate-pulse"
                />
              ))
            ) : displayedPortfolioEvents.length > 0 ? (
              displayedPortfolioEvents.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleEventClick(event)}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
                >
                  <img 
                    src={event.images && event.images[0] ? event.images[0] : '/images/placeholder.jpg'} 
                    alt={event.title || 'Event'}
                    className="w-full h-full object-cover image-hover-effect"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <Camera className="w-8 h-8 text-white mb-3" />
                    <h3 className="text-white font-bold text-center text-sm">{event.title || 'Event'}</h3>
                    <p className="text-gray-300 text-xs mt-1 text-center">{event.eventType || 'Event Type'}</p>
                  </div>
                  
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                    {event.eventType || 'Event'}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 col-span-6 text-center">No portfolio events available</p>
            )}
          </div>

          {allPortfolioEvents.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.button
                onClick={handleViewMore}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(74, 123, 255, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 glass rounded-full text-white font-semibold flex items-center gap-3 mx-auto"
              >
                <Grid3x3 className="w-5 h-5" />
                {showAllPortfolio ? 'Show Less' : 'View More Events'}
                {showAllPortfolio ? (
                  <ChevronRight className="w-5 h-5 rotate-90" />
                ) : (
                  <ChevronRight className="w-5 h-5 -rotate-90" />
                )}
              </motion.button>
              
              <p className="text-gray-400 text-sm mt-4">
                {showAllPortfolio 
                  ? `Showing all ${allPortfolioEvents.length} events`
                  : `Showing 6 of ${allPortfolioEvents.length} events`
                }
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative py-32 bg-gradient-to-b from-[#0a0a1a] to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Our </span>
              <span className="gradient-text">Process</span>
            </h2>
            <p className="text-gray-400 text-lg">
              A proven approach to delivering exceptional events
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-2xl text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 text-8xl font-bold opacity-5 gradient-text">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                    style={{ 
                      background: 'linear-gradient(135deg, #4A7BFF15, #9CF3FF15)',
                      border: '1px solid rgba(156, 243, 255, 0.1)'
                    }}
                  >
                    <item.icon className="w-8 h-8 text-[#9CF3FF]" />
                  </div>
                  <div className="text-4xl font-bold gradient-text mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 bg-gradient-to-b from-[#0a0a1a] to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Client </span>
              <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Hear from those who trusted us with their special moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(74, 123, 255, 0.2)" }}
                className="glass p-8 rounded-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                
                <Quote className="w-10 h-10 text-[#4A7BFF] opacity-30 mb-6" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFB84D] text-[#FFB84D]" />
                  ))}
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-32 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 md:p-16 rounded-3xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <img 
                src="/images/cta-bg.jpg" 
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>
            
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, #4A7BFF 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, #9CF3FF 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, #4A7BFF 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Ready to Create </span>
                <span className="gradient-text">Magic?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Let's bring your vision to life. Get in touch today and start planning your unforgettable event.
              </p>

              <motion.a
                href="mailto:info@diamonddreams.ae"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(74, 123, 255, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-12 py-5 gradient-bg rounded-full text-white text-lg font-bold mb-12 shine-effect"
              >
                Get Started
                <ArrowRight className="w-6 h-6" />
              </motion.a>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="flex flex-col items-center gap-3">
                  <Phone className="w-6 h-6 text-[#9CF3FF]" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Abu Dhabi</p>
                    <p className="text-white font-semibold">+971 2 XXX XXXX</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#9CF3FF]" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Dubai</p>
                    <p className="text-white font-semibold">+971 4 XXX XXXX</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Mail className="w-6 h-6 text-[#9CF3FF]" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-white font-semibold">info@diamonddreams.ae</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}