import React from 'react'
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  Users,
  Heart,
  Music,
  Building2,
  Palette,
  Camera,
  Sparkles,
  Gift,
  Globe,
} from "lucide-react";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: Briefcase,
      title: "Corporate Events",
      description:
        "Professional conferences, seminars, product launches, and corporate gatherings",
      features: [
        "Team Building",
        "Product Launches",
        "Conferences",
        "Annual Meetings",
      ],
    },
    {
      icon: Heart,
      title: "Weddings",
      description:
        "Enchanting wedding celebrations that bring your fairy tale to life",
      features: ["Venue Selection", "Décor Design", "Catering", "Entertainment"],
    },
    {
      icon: Gift,
      title: "Private Parties",
      description:
        "Memorable birthday parties, anniversaries, and personal celebrations",
      features: [
        "Birthday Parties",
        "Anniversaries",
        "Engagement",
        "Baby Showers",
      ],
    },
    {
      icon: Building2,
      title: "Exhibitions",
      description:
        "Impressive trade shows and exhibitions that showcase your brand",
      features: [
        "Booth Design",
        "Setup & Logistics",
        "Branding",
        "Staff Management",
      ],
    },
    {
      icon: Music,
      title: "Entertainment",
      description:
        "World-class entertainment solutions for any type of event",
      features: [
        "Live Performances",
        "DJ Services",
        "Cultural Shows",
        "Celebrity Bookings",
      ],
    },
    {
      icon: Palette,
      title: "Event Design",
      description:
        "Creative themes and stunning décor that captivate your guests",
      features: [
        "Theme Development",
        "Décor Setup",
        "Lighting Design",
        "Floral Arrangements",
      ],
    },
    {
      icon: Camera,
      title: "Photography & Video",
      description:
        "Professional coverage to capture every precious moment",
      features: [
        "Event Photography",
        "Videography",
        "Live Streaming",
        "Drone Coverage",
      ],
    },
    {
      icon: Globe,
      title: "Destination Events",
      description:
        "Seamless planning for events at stunning locations across UAE",
      features: [
        "Venue Sourcing",
        "Travel Coordination",
        "Accommodation",
        "Local Support",
      ],
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      aria-labelledby="services-heading"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* SEO Metadata */}
      <meta
        name="description"
        content="Discover Diamond Dreams Events Management's full range of services — corporate events, weddings, exhibitions, private parties, entertainment, design & destination events across UAE."
      />
      <meta
        name="keywords"
        content="Event services UAE, Corporate Event Planner Abu Dhabi, Wedding Planner Dubai, Exhibition Organizer UAE, Private Parties Abu Dhabi"
      />

      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #4A7BFF, transparent)" }}
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #6A5BFF, transparent)" }}
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-[#9CF3FF] tracking-widest mb-4 block"
            id="services-heading"
          >
            OUR SERVICES
          </span>

          <h2 className="text-4xl md:text-6xl gradient-text mb-6">
            Complete Event Solutions
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From concept to execution, we provide comprehensive event management
            services tailored to your unique needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          aria-label="Event services list"
        >
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="glass p-6 rounded-xl group hover:border-[#9CF3FF] smooth-transition cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 0 40px rgba(74, 123, 255, 0.6)",
              }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 gradient-bg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              <div className="relative">
                {/* Icon */}
                <motion.div
                  className="mb-4 relative"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center glass group-hover:glow-blue transition-all">
                    <service.icon
                      aria-hidden="true"
                      className="w-8 h-8 text-[#9CF3FF]"
                    />
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(74, 123, 255, 0)",
                        "0 0 20px rgba(74, 123, 255, 0.5)",
                        "0 0 0px rgba(74, 123, 255, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl text-white mb-3 group-hover:text-[#9CF3FF] transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-2 text-gray-300 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: 0.7 + index * 0.1 + idx * 0.05,
                      }}
                    >
                      <Sparkles
                        aria-hidden="true"
                        className="w-3 h-3 text-[#9CF3FF] flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
        >
          <p className="text-gray-300 mb-6">Ready to make your event unforgettable?</p>

          <motion.a
            href="#contact"
            aria-label="Get a free consultation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 gradient-bg rounded-full text-white glow-blue smooth-transition"
          >
            Get a Free Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
