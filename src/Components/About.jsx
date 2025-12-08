import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
  Target,
  Users,
  Lightbulb,
  Globe,
  Trophy,
  Shield,
  Clock,
  Zap,
  Smile,
  Award as AwardIcon,
  CheckCircle,
  Users as UsersIcon,
  BarChart
} from 'lucide-react';

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const aboutRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

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

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Perfection in every detail, excellence in every execution',
      color: '#4A7BFF',
      features: ['Quality Assurance', 'Premium Standards', 'Attention to Detail']
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Pushing creative boundaries with cutting-edge solutions',
      color: '#6A5BFF',
      features: ['Creative Concepts', 'Latest Technology', 'Trend Analysis']
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Partnership approach to bring visions to life',
      color: '#9CF3FF',
      features: ['Client Partnership', 'Team Synergy', 'Vendor Network']
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Heartfelt dedication to creating magical moments',
      color: '#FF6B9D',
      features: ['Emotional Connection', 'Personal Touch', 'Memory Creation']
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Trust, transparency, and ethical practices always',
      color: '#4A7BFF',
      features: ['Honest Communication', 'Ethical Practices', 'Reliability']
    },
    {
      icon: Zap,
      title: 'Efficiency',
      description: 'Seamless execution with maximum impact',
      color: '#9CF3FF',
      features: ['Time Management', 'Resource Optimization', 'Quick Solutions']
    }
  ];

  const timeline = [
    {
      year: '2013',
      title: 'The Beginning',
      description: 'Founded in Abu Dhabi with a vision to redefine event management',
      icon: Sparkles
    },
    {
      year: '2015',
      title: 'Expansion',
      description: 'Opened Dubai office, expanding reach across the UAE',
      icon: Building2
    },
    {
      year: '2018',
      title: 'Award Recognition',
      description: 'Received "Best Event Management Company" award',
      icon: Trophy
    },
    {
      year: '2021',
      title: 'Team Growth',
      description: 'Expanded to 50+ dedicated professionals',
      icon: UsersIcon
    },
    {
      year: '2023',
      title: '500+ Events',
      description: 'Milestone of 500 successful events delivered',
      icon: AwardIcon
    },
    {
      year: 'Present',
      title: 'Market Leader',
      description: 'Recognized as premier event management partner in UAE',
      icon: Star
    }
  ];

  const team = [
    {
      name: 'Sarah Al Mansoori',
      role: 'Founder & CEO',
      expertise: '15+ years in luxury events',
      avatar: 'SA',
      color: '#4A7BFF'
    },
    {
      name: 'Ahmed Hassan',
      role: 'Creative Director',
      expertise: 'Award-winning designer',
      avatar: 'AH',
      color: '#9CF3FF'
    },
    {
      name: 'Fatima Al Zaabi',
      role: 'Operations Head',
      expertise: 'Logistics & planning expert',
      avatar: 'FA',
      color: '#FF6B9D'
    },
    {
      name: 'Mohammed Khan',
      role: 'Client Relations',
      expertise: '10+ years in hospitality',
      avatar: 'MK',
      color: '#6A5BFF'
    }
  ];

  const achievements = [
    { icon: Trophy, value: '25+', label: 'Industry Awards', description: 'Recognized excellence' },
    { icon: CheckCircle, value: '100%', label: 'Client Satisfaction', description: 'Perfect track record' },
    { icon: UsersIcon, value: '300+', label: 'Happy Clients', description: 'Trusted partnerships' },
    { icon: BarChart, value: '98%', label: 'Repeat Business', description: 'Loyal client base' }
  ];

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
        
        .timeline-line {
          position: relative;
        }
        
        .timeline-line::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, #4A7BFF, #9CF3FF, transparent);
          opacity: 0.3;
        }
      `}</style>

      {/* Hero Section */}
      <section ref={aboutRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-black" />
          
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ background: 'radial-gradient(circle, #4A7BFF, transparent)' }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ background: 'radial-gradient(circle, #9CF3FF, transparent)' }}
          />

          {[...Array(20)].map((_, i) => (
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
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ opacity: headerOpacity, scale: headerScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#9CF3FF]" />
              <span className="text-[#9CF3FF] text-sm font-medium">Our Journey</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">About</span>
            <br />
            <span className="gradient-text">Diamond Dreams</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            For over a decade, we've been transforming visions into reality across the UAE. 
            Our journey is built on passion, precision, and the relentless pursuit of perfection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#story"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(74, 123, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 gradient-bg rounded-full text-white font-semibold flex items-center gap-2 shine-effect"
            >
              Discover Our Story
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="#team"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 glass rounded-full text-white font-semibold border border-white/10 transition-all"
            >
              Meet Our Team
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto"
          >
            {[
              { value: '10+', label: 'Years Experience', icon: Calendar },
              { value: '500+', label: 'Events', icon: Trophy },
              { value: '300+', label: 'Clients', icon: Users },
              { value: '25+', label: 'Awards', icon: Award }
            ].map((stat, index) => (
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
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="relative py-32 bg-gradient-to-b from-black to-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Our</span>
              <span className="gradient-text"> Story</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              From humble beginnings to becoming the UAE's premier event management partner
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative timeline-line">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative ${index % 2 === 0 ? 'md:mt-20' : 'md:mb-20'} ${index >= 3 ? 'md:mt-20' : ''}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(74, 123, 255, 0.2)" }}
                    className="glass p-8 rounded-3xl relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-20 h-20 opacity-10">
                      <item.icon className="w-full h-full" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #4A7BFF15, #4A7BFF05)',
                            border: '1px solid rgba(74, 123, 255, 0.2)'
                          }}
                        >
                          <item.icon className="w-7 h-7 text-[#4A7BFF]" />
                        </div>
                        <div className="text-4xl font-bold gradient-text">{item.year}</div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mt-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center gradient-bg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To create extraordinary experiences that not only meet but exceed expectations, 
                turning every event into a masterpiece of memories through innovation, dedication, 
                and unparalleled attention to detail.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #9CF3FF15, #9CF3FF05)',
                    border: '1px solid rgba(156, 243, 255, 0.2)'
                  }}
                >
                  <Lightbulb className="w-8 h-8 text-[#9CF3FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To be the most trusted and innovative event management partner in the Middle East, 
                setting new standards of excellence and creating unforgettable moments that last a lifetime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-32 bg-[#0a0a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Our Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              The principles that guide every decision and define our culture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: `0 20px 40px ${value.color}20` }}
                className="glass p-8 rounded-3xl group cursor-pointer transition-all"
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center mx-auto"
                  style={{ 
                    background: `linear-gradient(135deg, ${value.color}15, ${value.color}05)`,
                    border: `1px solid ${value.color}20`
                  }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <value.icon className="w-8 h-8" style={{ color: value.color }} />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white text-center mb-3 group-hover:text-[#9CF3FF] transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-center mb-6 leading-relaxed">
                  {value.description}
                </p>
                
                <div className="space-y-2">
                  {value.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                      <Check className="w-4 h-4" style={{ color: value.color }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-32 bg-gradient-to-b from-[#0a0a1a] to-black">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/3 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{ background: 'radial-gradient(circle, #FF6B9D, transparent)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Meet The</span>
              <span className="gradient-text"> Team</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              The passionate professionals behind every successful event
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(74, 123, 255, 0.2)" }}
                className="glass p-8 rounded-3xl text-center group"
              >
                <motion.div
                  className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${member.color}30, ${member.color}10)`,
                    border: `2px solid ${member.color}40`
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 opacity-10">
                    <Users className="w-full h-full" />
                  </div>
                  <span className="relative z-10">{member.avatar}</span>
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <div className="text-[#9CF3FF] font-medium mb-3">{member.role}</div>
                <p className="text-gray-400 text-sm mb-6">{member.expertise}</p>
                
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-[#FFB84D] text-[#FFB84D]" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl mt-12 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Join Our Team</h3>
              <p className="text-gray-400 mb-6">
                We're always looking for passionate individuals who share our commitment to excellence. 
                If you have the talent and drive to create magic, we'd love to hear from you.
              </p>
              <motion.a
                href="mailto:careers@diamonddreams.ae"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(74, 123, 255, 0.3)" }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-medium"
                style={{
                  background: 'linear-gradient(135deg, rgba(74, 123, 255, 0.1), rgba(156, 243, 255, 0.1))',
                  border: '1px solid rgba(74, 123, 255, 0.2)'
                }}
              >
                <Mail className="w-4 h-4" />
                careers@diamonddreams.ae
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Our</span>
              <span className="gradient-text"> Achievements</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Milestones that define our journey and excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass p-8 rounded-3xl text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 opacity-5">
                  <achievement.icon className="w-full h-full" />
                </div>
                
                <div className="relative z-10">
                  <achievement.icon className="w-12 h-12 text-[#9CF3FF] mx-auto mb-4" />
                  <div className="text-4xl font-bold gradient-text mb-2">{achievement.value}</div>
                  <div className="text-white font-bold mb-2">{achievement.label}</div>
                  <div className="text-gray-400 text-sm">{achievement.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-[#0a0a1a] to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 md:p-16 rounded-3xl text-center relative overflow-hidden"
          >
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
                <span className="text-white">Let's Create</span>
                <span className="gradient-text"> Together</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Ready to bring your vision to life? Partner with the team that turns dreams into reality.
              </p>

              <motion.a
                href="mailto:info@diamonddreams.ae"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(74, 123, 255, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-12 py-5 gradient-bg rounded-full text-white text-lg font-bold mb-8 shine-effect"
              >
                Start Your Journey
                <ArrowRight className="w-6 h-6" />
              </motion.a>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="flex flex-col items-center gap-3">
                  <Phone className="w-6 h-6 text-[#9CF3FF]" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Call Us</p>
                    <p className="text-white font-semibold">+971 522 703 351</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#9CF3FF]" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Visit Us</p>
                    <p className="text-white font-semibold">Al Falah St, Abu Dhabi</p>
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