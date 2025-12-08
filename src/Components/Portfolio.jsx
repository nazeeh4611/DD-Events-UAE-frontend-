import React from 'react'
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Calendar, MapPin } from "lucide-react";
import { api } from "../utils/api";

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    "Corporate",
    "Wedding",
    "Exhibition",
    "Private",
    "Entertainment",
  ];

  const filteredEvents =
    selectedFilter === "All"
      ? events
      : events.filter((event) => event.category === selectedFilter);

  return (
    <section
      id="portfolio"
      ref={ref}
      aria-labelledby="portfolio-title"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* SEO Meta Tags */}
      <meta
        name="description"
        content="Explore Diamond Dreams Events Management's portfolio — weddings, corporate events, exhibitions, entertainment projects & more across Abu Dhabi and Dubai."
      />
      <meta
        name="keywords"
        content="Event Portfolio Abu Dhabi, Wedding Portfolio UAE, Corporate Events Showcase, Exhibition Projects Dubai"
      />

      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, #4A7BFF 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            id="portfolio-title"
            className="text-[#9CF3FF] tracking-widest mb-4 block"
          >
            OUR PORTFOLIO
          </span>

          <h2 className="text-4xl md:text-6xl gradient-text mb-6">
            Events That Inspire
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our collection of spectacular events we've brought to life.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          aria-label="Portfolio category filters"
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full smooth-transition ${
                selectedFilter === category
                  ? "gradient-bg text-white glow-blue"
                  : "glass text-gray-300 hover:text-white hover:border-[#9CF3FF]"
              }`}
              aria-pressed={selectedFilter === category}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-20">
            <motion.div
              className="inline-block w-16 h-16 border-4 border-[#4A7BFF] border-t-[#9CF3FF] rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <p className="text-gray-400 mt-4">Loading amazing events...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Portfolio event listing"
          >
            {filteredEvents.map((event, index) => (
              <motion.article
                key={event.id}
                className="group glass rounded-xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 0 40px rgba(74, 123, 255, 0.6)",
                }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 text-xs gradient-bg rounded-full">
                        {event.category}
                      </span>
                      <ExternalLink
                        aria-hidden="true"
                        className="w-5 h-5 text-[#9CF3FF]"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl text-white mb-2 group-hover:text-[#9CF3FF] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          /* No Events Message */
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glass p-12 rounded-2xl max-w-md mx-auto">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Calendar className="w-16 h-16 text-[#9CF3FF] mx-auto mb-4" />
              </motion.div>

              <h3 className="text-2xl text-white mb-3">Coming Soon!</h3>
              <p className="text-gray-400">
                Our portfolio will be updated with amazing events soon. Check
                back later or contact us to learn more.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA Button */}
        {filteredEvents.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
          >
            <p className="text-gray-300 mb-6">
              Want to see more? Let's discuss your next event!
            </p>

            <motion.a
              href="#contact"
              aria-label="Start your project"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 gradient-bg rounded-full text-white glow-blue smooth-transition"
            >
              Start Your Project
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
