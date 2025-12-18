import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import Home from "../Components/Home";
import About from "../Components/About";
import Services from "../Components/Services";
import Portfolio from "../Components/Portfolio";
import Contact from "../Components/Contact";

function User() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default User;
