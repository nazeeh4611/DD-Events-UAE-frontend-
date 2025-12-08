import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        message: "",
      });
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 2000);
  };

  const contactInfo = [
    { icon: Phone, title: "Phone", details: "+971 522703351", link: "tel:+971522703351" },
    { icon: Mail, title: "Email", details: "info@diamonddreams.ae", link: "mailto:info@diamonddreams.ae" },
    { icon: MapPin, title: "Location", details: "Al Falah St, Abu Dhabi, UAE", link: "https://maps.google.com" },
  ];

  // Page animation
  const pageVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  // Stagger animations
  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Floating BG animation */}
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        <div
          className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, #4A7BFF40, transparent)",
          }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
        >
          <span className="text-[#9CF3FF] tracking-widest mb-4 block">GET IN TOUCH</span>
          <h2 className="text-4xl md:text-6xl gradient-text mb-6">
            Let's Create Magic Together
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to bring your event vision to life? Reach out and let's start planning.
          </p>
        </motion.div>

        {/* GRID WRAPPER with stagger */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12"
          variants={stagger}
        >

          {/* Contact Info */}
          <motion.div variants={fadeUp}>
            <h3 className="text-2xl md:text-3xl text-white mb-4">
              Contact <span className="gradient-text">Information</span>
            </h3>
            <p className="text-gray-400 mb-8">
              We're here to answer your questions and help make your event extraordinary.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  variants={fadeUp}
                  key={index}
                  href={info.link}
                  className="flex items-start gap-4 glass p-6 rounded-xl hover:border-[#9CF3FF] smooth-transition group"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center glass group-hover:glow-blue transition-all">
                    <info.icon className="w-6 h-6 text-[#9CF3FF]" />
                  </div>
                  <div>
                    <div className="text-white mb-1 font-semibold">{info.title}</div>
                    <div className="text-gray-400 group-hover:text-[#9CF3FF] transition-colors">
                      {info.details}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div className="glass p-8 rounded-xl" variants={fadeUp}>
              <h4 className="text-xl text-white mb-4">DIAMOND DREAMS</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                EVENTS MANAGEMENT L.L.C S.O.C <br />
                Abu Dhabi, UAE <br />
                Your premier partner for unforgettable events across the UAE.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeUp}>
            <form onSubmit={handleSubmit} className="glass p-8 rounded-xl">

              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-20 h-20 text-[#9CF3FF] mx-auto mb-4" />
                  <h3 className="text-2xl text-white mb-3">Thank You!</h3>
                  <p className="text-gray-400">
                    We've received your message and will get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-6">
                    <motion.div variants={fadeUp}>
                      <label className="block text-white mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500"
                      />
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <motion.div variants={fadeUp}>
                        <label className="block text-white mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500"
                        />
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <label className="block text-white mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+971 XXX XXXX"
                          className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500"
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={fadeUp}>
                      <label className="block text-white mb-2">Event Type *</label>
                      <select
                        name="eventType"
                        required
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass rounded-lg text-white"
                      >
                        <option value="">Select Event Type</option>
                        <option value="Corporate">Corporate Event</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Exhibition">Exhibition</option>
                        <option value="Private">Private Party</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                      </select>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <label className="block text-white mb-2">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your event..."
                        className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 resize-none"
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-6 px-8 py-4 gradient-bg rounded-full text-white flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </>
              )}

            </form>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}
