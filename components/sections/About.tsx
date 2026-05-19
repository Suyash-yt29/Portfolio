"use client";

import { motion, Variants } from "framer-motion";
import { Caveat, Cormorant_Garamond } from "next/font/google";

// Premium Fonts
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const premiumParagraphFont = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],
  style: ["italic"] 
});

export default function About() {
  
  // The Cinematic Scroll Reveal for the static heading
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      scale: 1, 
      transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }
    },
  };

  return (
    <section id="about" className="relative flex h-screen w-full flex-col items-center justify-start pt-24 md:pt-32 z-10 bg-transparent overflow-hidden">
      
      {/* 
        ========================================
        1. THE STATIC HEADER (Fixed at the top)
        ========================================
      */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ staggerChildren: 0.2 }}
        className="flex flex-col items-center z-30 shrink-0 mb-2 md:mb-6"
      >
        <motion.p 
          variants={revealVariants}
          className="mb-4 text-xs md:text-sm uppercase tracking-[0.4em] text-[#d4af37] font-sans font-semibold drop-shadow-md"
        >
          01. Introduction
        </motion.p>

        <motion.h2 
          variants={revealVariants}
          className={`${caveatFont.className} text-6xl md:text-7xl lg:text-[7rem] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4af37] to-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]`}
        >
          Who I Am
        </motion.h2>
      </motion.div>

      {/* 
        ========================================
        2. THE 3D STAR WARS CRAWL (Only Paragraphs)
        ========================================
      */}
      <div 
        className="relative w-full flex-1 flex justify-center pointer-events-none overflow-hidden"
        style={{ 
          perspective: "600px", // Increased slightly so the text doesn't stretch too wide
          maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 100%)"
        }}
      >
        
        {/* The Tilted Plane Container */}
        <div 
          className="absolute inset-0 w-full h-full flex justify-center"
          style={{
            transform: "rotateX(55deg)",
            transformOrigin: "50% 100%",
            transformStyle: "preserve-3d",
          }}
        >
          
          {/* 
            The Scrolling Animation
            FIX: Changed to animate specific 'y' viewport heights so it NEVER disappears randomly 
          */}
          <motion.div
            animate={{ y: ["100vh", "-200vh"] }} // Starts at the bottom of the screen, scrolls way past the top
            transition={{
              repeat: Infinity,
              duration: 40, // 40 seconds for a smooth, readable speed
              ease: "linear",
            }}
            // FIX: Made the text block 'absolute' so it ignores normal layout rules
            className="absolute w-full max-w-4xl px-4 md:px-12 flex flex-col items-center text-center"
          >
            
            {/* Paragraphs */}
            <div className={`${premiumParagraphFont.className} space-y-12 md:space-y-16 text-3xl md:text-4xl lg:text-5xl leading-relaxed text-gray-300 tracking-wide drop-shadow-lg`}>
              
              <p>
                I am an innovative Computer Engineering undergraduate at Savitribai Phule Pune University, operating at the intersection of <span className="font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">full-stack development</span> and <span className="font-bold text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]">AI-driven systems</span>.
              </p>
              
              <p>
                My passion lies in architecting scalable web platforms, multi-agent AI analytics tools, and real-time applications. Whether it is deploying containerized microservices or building fluid Next.js interfaces, I focus on delivering <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">production-ready, cinematic digital experiences.</span>
              </p>
              
              <p>
                Currently, I am heavily focused on <span className="text-[#d4af37] border-b-2 border-[#d4af37]/60 pb-1">Retrieval-Augmented Generation</span>, Generative AI APIs, and secure backend architectures to build systems that don't just function—they <span className="font-bold text-white">think</span>.
              </p>

            </div>
            
            {/* Animated decorative line */}
            <div className="mt-20 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent w-full max-w-xl mx-auto drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
            
          </motion.div>
        </div>
      </div>

    </section>
  );
}