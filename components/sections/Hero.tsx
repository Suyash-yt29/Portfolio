"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Caveat } from "next/font/google"; 

// Cool, aesthetic Gen-Z handwritten font for the name
const caveatFont = Caveat({ subsets: ["latin"], weight: ["700"] });

const ROLES = [
  "AI-Focused Product Developer",
  "Backend Builder",
  "Building Real Digital Experiences",
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [startLoop, setStartLoop] = useState(false);

  // TIMING: The intro sequence takes exactly 5.0 seconds total.
  // Delaying by 4.5 seconds means the Hero text fades in right as the black screen fades out.
  const ANIMATION_DELAY = 4.5; 

  useEffect(() => {
    // Only start the looping text timer AFTER the intro delay is over
    const delayTimer = setTimeout(() => {
      setStartLoop(true);
    }, ANIMATION_DELAY * 1000);

    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    if (!startLoop) return;
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [startLoop]);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
      
      {/* HERO BACKGROUND VIDEO */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        // transform-gpu translate-z-0 protects the browser from animation lag
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-80 transform-gpu translate-z-0"
      >
        <source src="/hero_bg.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/50 to-[#050505]"></div>

      {/* Subtle LED Lighting Effect behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-[#d4af37]/20 rounded-full blur-[100px] opacity-70 mix-blend-screen pointer-events-none z-0"></div>

      {/* Foreground Content */}
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center text-center">

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: ANIMATION_DELAY }}
            className="text-xl md:text-2xl font-light text-gray-400 mb-2"
          >
            Hello! I'm
          </motion.p>

          {/* Name (Premium Platinum Gradient, Reduced Size, Gen-Z Cursive) */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: ANIMATION_DELAY + 0.2, ease: "easeOut" }}
            // FIX: Added pr-4 (padding-right) so the 'e' doesn't get cut off!
            className={`${caveatFont.className} pr-4 text-6xl md:text-7xl lg:text-[6.5rem] tracking-wide mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-500 drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]`}
            style={{ lineHeight: '1.2' }}
          >
            Suyash Vishwakarma
          </motion.h1>
          {/* Looping Roles Animation */}

          {/* One-line bio (small) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: ANIMATION_DELAY + 0.15 }}
            className="max-w-2xl text-sm md:text-base text-gray-300 leading-relaxed mb-4"
          >
            I enjoy transforming ambitious ideas into interactive products that combine technology, usability, and human behavior.
          </motion.p>

          {/* Looping Roles Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: ANIMATION_DELAY + 0.4 }}
            className="h-16 md:h-20 flex items-center justify-center overflow-hidden mb-8"
          >
            {/* The AnimatePresence ensures smooth exiting/entering of the text */}
            {startLoop && (
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentRoleIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#d4af37] via-yellow-100 to-[#d4af37] bg-clip-text text-transparent"
                >
                  {ROLES[currentRoleIndex]}
                </motion.h2>
              </AnimatePresence>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: ANIMATION_DELAY + 0.7 }}
            className="max-w-3xl text-base md:text-lg text-gray-300 leading-relaxed mb-8"
          >
            Building user-first products around AI, social interaction, and intelligent systems. Focused on creating experiences people naturally want to use—not just applications that function.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: ANIMATION_DELAY + 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {/* Primary Button */}
            <a href="#projects" className="group relative flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a href="#contact" className="group relative flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 hover:text-[#d4af37] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              Connect With Me
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://github.com/Suyash29-source" target="_blank" rel="noreferrer" className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 hover:text-[#d4af37] text-gray-300">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
                </svg>
              </a>
              <a href="https://instagram.com/illustrious.29" target="_blank" rel="noreferrer" className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 hover:text-[#d4af37] text-gray-300">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}