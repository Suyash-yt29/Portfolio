"use client";

import { motion, Variants } from "framer-motion";
import { Caveat, Cormorant_Garamond } from "next/font/google";

// Premium Fonts
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const premiumFont = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],
  style: ["normal", "italic"] 
});

export default function Contact() {
  
  // The Cinematic Scroll Reveal
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
    <section id="contact" className="relative flex w-full min-h-screen flex-col items-center justify-center z-10 overflow-hidden bg-transparent py-24">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-12 text-center flex flex-col items-center">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.2 }}
          className="mx-auto w-full max-w-5xl flex flex-col items-center"
        >
          {/* Subtitle */}
          <motion.span 
            variants={revealVariants} 
            className="text-[#d4af37] font-mono font-semibold text-xs md:text-sm tracking-[0.4em] uppercase mb-4 block drop-shadow-md"
          >
            06. Initiate Contact
          </motion.span>
          
          {/* Main Heading */}
          <motion.h2 
            variants={revealVariants}
            className={`${caveatFont.className} text-6xl md:text-8xl lg:text-[7.5rem] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4af37] to-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] mb-16`}
          >
            Let's Build The Future.
          </motion.h2>

          {/* 
            =========================================
            THE UPGRADED LIQUID GLASS CONTACT CARD 
            ========================================= 
          */}
          <motion.div 
            variants={revealVariants}
            // group class added to trigger hover effects on child elements
            className="group relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-[#d4af37]/40 hover:shadow-[0_0_60px_rgba(212,175,55,0.15)] p-8 md:p-12 lg:p-16 text-left"
          >
            
            {/* 
              Interactive Cyber-Noir Hover Gradient 
              This smoothly fades in a dynamic glowing color wash when the user hovers over the card!
            */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-purple-500/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none z-0"></div>
            
            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
              
              {/* Left Side: Contact Details */}
              <div className="flex flex-col gap-6 lg:gap-8">
                
                {/* Green "Systems Online" Indicator */}
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                  </div>
                  <span className="text-green-400 font-mono text-xs tracking-widest uppercase font-bold drop-shadow-md">Systems Online</span>
                </div>

                {/* Card Title */}
                <h3 className={`${premiumFont.className} text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide drop-shadow-lg`}>
                  Access Credentials
                </h3>

                <div className="flex flex-col gap-8 mt-2">
                  <div className="group/link cursor-pointer">
                    <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-2">Direct Line</p>
                    <p className="text-xl md:text-2xl text-white font-medium transition-all duration-300 group-hover/link:text-[#d4af37] group-hover/link:translate-x-2 inline-block">+91 9511229694</p>
                  </div>
                  <div className="group/link cursor-pointer">
                    <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-2">Secure Comm-Link</p>
                    <p className="text-xl md:text-2xl text-white font-medium transition-all duration-300 group-hover/link:text-[#d4af37] group-hover/link:translate-x-2 inline-block">visputemayank007@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Right Side: Resume Button & Socials */}
              <div className="flex flex-col items-start lg:items-end justify-center gap-8 z-10">
                
                {/* Animated Download Resume Button */}
                <a 
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn relative flex items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-base md:text-lg font-bold text-black transition-all duration-500 hover:scale-105 hover:bg-[#d4af37] hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] w-full sm:w-auto overflow-hidden"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:-translate-y-1 duration-300">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span className="relative z-10">View / Download Resume</span>
                </a>

                {/* Social Icons Container */}
                <div className="flex gap-4 w-full sm:w-auto justify-start lg:justify-end">
                  {/* GitHub */}
                  <a href="https://github.com/mayankvispute7" target="_blank" rel="noreferrer" className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/10 hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
                    </svg>
                  </a>
                  
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/mayank-vispute-a28641251/" target="_blank" rel="noreferrer" className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/10 hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  
                  {/* Instagram */}
                  <a href="#" target="_blank" rel="noreferrer" className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/10 hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 left-0 w-full text-center text-[10px] md:text-xs text-gray-600 z-10 pointer-events-none font-mono tracking-widest">
        <p>DESIGNED & BUILT BY MAYANK VISPUTE © {new Date().getFullYear()}</p>
      </div>
    </section>
  );
}