import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Hero from "./Components/Home";
import About from "./Components/About";
import Services from "./Components/Services";
import Portfolio from "./Components/Portfolio";
import Contact from "./Components/Contact";
import Admin from "./Components/Admin";

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <Router>
      {/* ---------- GLOBAL SEO TAGS ---------- */}
      <head>
        <title>
          Diamond Dreams Events Management — Corporate Events, Weddings,
          Exhibitions, Entertainment UAE
        </title>

        <meta
          name="description"
          content="Diamond Dreams Events Management provides world-class event planning services across Abu Dhabi and Dubai."
        />

        <meta
          name="keywords"
          content="Event Management Abu Dhabi, Event Planner Dubai, Corporate Events UAE"
        />

        <meta name="author" content="Diamond Dreams Events Management" />
        <meta property="og:title" content="Diamond Dreams Events Management" />
        <meta
          property="og:description"
          content="Crafting unforgettable events in Abu Dhabi & Dubai."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://diamonddreams.ae" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
        <Navbar />

        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(10, 15, 42, 0.9)",
              border: "1px solid rgba(74, 123, 255, 0.3)",
              color: "#ffffff",
            },
          }}
        />

        {/* ---------- ROUTES ---------- */}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
