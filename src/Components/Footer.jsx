import React from 'react'
import { motion } from "framer-motion";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Corporate Events",
    "Weddings",
    "Private Parties",
    "Exhibitions",
    "Entertainment",
    "Event Design",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer
      className="relative bg-[#0A0F2A] pt-20 pb-8 overflow-hidden"
      aria-labelledby="footer-title"
    >
      {/* SEO Structured Metadata */}
      <meta
        name="description"
        content="Diamond Dreams Events Management – expert event planners serving Abu Dhabi, Dubai, and UAE. Specializing in weddings, corporate events, exhibitions & entertainment."
      />
      <meta
        name="keywords"
        content="Event Management Abu Dhabi, Wedding Planners UAE, Corporate Events Dubai, Event Designers Abu Dhabi"
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(#4A7BFF 1px, transparent 1px), linear-gradient(90deg, #4A7BFF 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Gradient Orb */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #6A5BFF, transparent)",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo + Description */}
          <section aria-labelledby="footer-company">
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-8 h-8 text-[#9CF3FF]" />

              <div className="flex flex-col">
                <span
                  id="footer-company"
                  className="gradient-text font-bold tracking-wider"
                >
                  DIAMOND DREAMS
                </span>
                <span className="text-[10px] text-[#9CF3FF] tracking-widest">
                  EVENTS MANAGEMENT
                </span>
              </div>
            </motion.div>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Creating unforgettable experiences across Abu Dhabi, Dubai, and
              the UAE. Your vision, our expertise.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-[#9CF3FF] smooth-transition group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-[#9CF3FF] transition-colors" />
                </motion.a>
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <nav aria-label="Footer Quick Links">
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-[#9CF3FF] smooth-transition text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#9CF3FF] group-hover:w-3 transition-all"></span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <section aria-labelledby="footer-services">
            <h3 id="footer-services" className="text-white mb-4">
              Our Services
            </h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <motion.a
                    href="#services"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-[#9CF3FF] smooth-transition text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#9CF3FF] group-hover:w-3 transition-all"></span>
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact Section */}
          <section aria-labelledby="footer-contact">
            <h3 id="footer-contact" className="text-white mb-4">
              Contact Us
            </h3>

            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+971522703351"
                  className="text-gray-400 hover:text-[#9CF3FF] smooth-transition text-sm flex items-start gap-3 group"
                >
                  <Phone className="w-5 h-5 text-[#9CF3FF] mt-0.5" />
                  <span>+971 522703351</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@diamonddreams.ae"
                  className="text-gray-400 hover:text-[#9CF3FF] smooth-transition text-sm flex items-start gap-3 group"
                >
                  <Mail className="w-5 h-5 text-[#9CF3FF] mt-0.5" />
                  <span>info@diamonddreams.ae</span>
                </a>
              </li>

              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#9CF3FF] smooth-transition text-sm flex items-start gap-3 group"
                >
                  <MapPin className="w-5 h-5 text-[#9CF3FF] mt-0.5" />
                  <span>Al Falah St, Abu Dhabi, UAE</span>
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Diamond Dreams Events Management L.L.C S.O.C. All
              rights reserved.
            </p>

            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-[#9CF3FF] smooth-transition text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#9CF3FF] smooth-transition text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
