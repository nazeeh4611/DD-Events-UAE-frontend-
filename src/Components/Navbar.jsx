import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              aria-label="Diamond Dreams Home"
              className="flex items-center gap-2"
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
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <Link
                  to={item.path}
                  className={`text-sm font-medium smooth-transition ${
                    isActive(item.path)
                      ? "text-[#9CF3FF]"
                      : "text-white hover:text-[#9CF3FF]"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Active underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#4A7BFF] to-[#9CF3FF] transition-all duration-300 ${
                    isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            aria-label="Toggle mobile menu"
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden mt-4 glass rounded-lg p-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-3 text-base smooth-transition ${
                  isActive(item.path)
                    ? "text-[#9CF3FF]"
                    : "text-white hover:text-[#9CF3FF]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
