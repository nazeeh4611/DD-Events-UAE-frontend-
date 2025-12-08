import React from 'react'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Services", href: "services" },
    { name: "Portfolio", href: "portfolio" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <motion.nav
      aria-label="Main Navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      {/* SEO Metadata */}
      <meta
        name="description"
        content="Navigate Diamond Dreams Events Management — services, portfolio, contact, and more. Premium event management in Abu Dhabi & Dubai."
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Brand Logo */}
          <motion.a
            href="#home"
            aria-label="Diamond Dreams Home"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#9CF3FF]" />

            <div className="flex flex-col">
              <span className="gradient-text font-bold tracking-wider text-sm sm:text-base">
                DIAMOND DREAMS
              </span>
              <span className="text-[8px] sm:text-[10px] text-[#9CF3FF] tracking-widest">
                EVENTS MANAGEMENT
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-white hover:text-[#9CF3FF] smooth-transition relative group text-sm font-medium"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4A7BFF] to-[#9CF3FF] group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}

            {/* Admin Button */}
           
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass rounded-lg p-4 w-full"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 text-white hover:text-[#9CF3FF] smooth-transition text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <a
              href="#admin"
              className="block mt-2 px-6 py-3 gradient-bg rounded-full text-white text-center font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
