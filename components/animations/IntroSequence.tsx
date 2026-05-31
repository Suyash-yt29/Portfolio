"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dancing_Script } from "next/font/google"; // Flowing, Apple-style signature font

// Load the cursive font
const signatureFont = Dancing_Script({ 
  subsets: ["latin"], 
  weight: ["400", "700"] 
});

export default function IntroSequence() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // TIMING SYSTEM: 5 SECONDS TOTAL
    // Fade-out starts at 3.5s and takes 1.5s to complete = 5s total experience.
    const hideIntroTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3500); 

    return () => {
      clearTimeout(hideIntroTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(15px)", scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* BACKGROUND VIDEO - Make sure this file is trimmed to 5s to save bandwidth! */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen transform-gpu translate-z-0"
          >
            <source src="/intro-bg.mp4" type="video/mp4" />
          </video>

          {/* Dark Gradient Overlay to ensure text pops */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/10 via-black/80 to-black"></div>

          {/* Handwriting Container */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            
            {/* 1st Line: Writing "Suyash Vishwakarma" */}
            <motion.div
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              // Sped up: Takes 1.5 seconds to write, starts after a 0.5-second pause
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="pl-4 pr-4" 
            >
              <h1 
                className={`${signatureFont.className} text-6xl md:text-8xl lg:text-[9rem] text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] font-bold py-2`}
                style={{ lineHeight: '1.2' }}
              >
                Suyash Vishwakarma
              </h1>
            </motion.div>

            {/* 2nd Line: Writing "Portfolio" right underneath */}
            <motion.div
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              // Sped up: Starts at 1.8s (right as name finishes) and takes 1s to write
              transition={{ duration: 1.0, ease: "easeInOut", delay: 1.8 }}
              className="pl-4 pr-4 -mt-2 md:-mt-6"
            >
              <h2 
                className={`${signatureFont.className} text-4xl md:text-6xl text-red-400 drop-shadow-[0_0_15px_rgba(168,83,186,0.4)] py-2`}
              >
                Portfolio
              </h2>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}