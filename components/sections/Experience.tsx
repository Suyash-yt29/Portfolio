"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Caveat } from "next/font/google";

// Premium Cursive Font for the Heading
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

const experiences = [
  {
    id: "widesoftech",
    role: "Full Stack Developer Intern",
    company: "Widesoftech Pvt. Ltd",
    date: "Jan 2026 - Feb 2026",
    location: "Pune, India",
    points: [
      "Architected the full-stack infrastructure for InternMeets.com, ensuring a seamless, responsive experience.",
      "Engineered complex search algorithms for efficient filtering by domain, location, and stipend.",
      "Optimized website performance and SEO strategies, achieving faster load times.",
      "Implemented secure authentication and database systems to manage student registrations."
    ]
  },
  {
    id: "vanshavaly",
    role: "Web & AI Intern",
    company: "Vanshavaly.com",
    date: "July 2025 - Dec 2025",
    location: "Pune, India",
    points: [
      "Engineered and deployed a live AI Chatbot to handle real-time user queries on the production website.",
      "Automated 60% of support tasks by training NLP models on system data.",
      "Managed live site operations using cPanel, ensuring SSL security and database integrity.",
      "Optimized MySQL database queries, improving data retrieval speeds for both the chatbot and main site."
    ]
  }
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExp = experiences[activeIndex];

  // The Cinematic Scroll Reveal (Starts blurred, snaps into focus)
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

  // Terminal "Script Execution" Animation (Prints line by line super fast)
  const terminalContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const terminalLine: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    // Centered exactly on one screen over the global background video
    <section id="experience" className="relative flex min-h-screen w-full flex-col items-center justify-center z-10 overflow-hidden bg-transparent py-20">
      
      {/* Ambient glowing background for the terminal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-12 w-full max-w-5xl">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.2 }}
          className="mb-8 md:mb-12 text-center flex flex-col items-center"
        >
          <motion.p variants={revealVariants} className="mb-2 md:mb-4 text-xs md:text-sm uppercase tracking-[0.4em] text-[#d4af37] font-sans font-semibold">
            04. Accessing Servers
          </motion.p>
          <motion.h2 
            variants={revealVariants}
            className={`${caveatFont.className} text-6xl md:text-7xl lg:text-[5.5rem] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4af37] to-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]`}
          >
            Execution Logs
          </motion.h2>
        </motion.div>

        {/* The Glassmorphic Terminal Window */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={revealVariants}
          className="relative w-full rounded-2xl border border-white/20 bg-black/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(42,138,246,0.1)] overflow-hidden flex flex-col"
        >
          
          {/* Terminal Top Bar (macOS Style) */}
          <div className="flex h-12 w-full items-center justify-between border-b border-white/10 bg-white/5 px-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
              <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              root@mayank-os: ~/experience
            </div>
            <div className="w-12"></div>
          </div>

          {/* Terminal Body (Split Screen) */}
          <div className="flex flex-col md:flex-row flex-1 min-h-[400px]">
            
            {/* Left Sidebar: Directory Tree */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 p-6 flex flex-col gap-2">
              <span className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-widest">Connected Nodes</span>
              
              {experiences.map((exp, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveIndex(index)}
                    className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 text-left font-mono text-sm transition-all cursor-none ${
                      isActive 
                        ? "bg-[#2a8af6]/10 text-[#2a8af6] border border-[#2a8af6]/30" 
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isActive ? "text-[#2a8af6]" : "text-gray-500"}>
                      <polyline points="4 17 10 11 4 5"></polyline>
                      <line x1="12" y1="19" x2="20" y2="19"></line>
                    </svg>
                    ./{exp.id}.sh
                  </button>
                );
              })}
            </div>

            {/* Right Main Area: Terminal Output */}
            <div className="w-full md:w-2/3 p-6 md:p-8 font-mono relative overflow-hidden">
              
              {/* Subtle CRT Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none z-0"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExp.id}
                  variants={terminalContainer}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="relative z-10 flex flex-col h-full text-xs md:text-sm text-gray-300"
                >
                  
                  {/* Command Line Input Simulation */}
                  <motion.div variants={terminalLine} className="mb-4 flex flex-wrap items-center gap-2 text-[#2a8af6]">
                    <span className="text-green-400 font-bold">mayank@admin</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~/experience</span>
                    <span className="text-white">$</span>
                    <span className="text-white">cat {activeExp.id}.json</span>
                  </motion.div>

                  {/* JSON-style Output Formatting (Staggered Lines) */}
                  <div className="space-y-2">
                    <motion.div variants={terminalLine}>
                      <span className="text-white">{'{'}</span>
                    </motion.div>
                    
                    <motion.div variants={terminalLine} className="pl-4">
                      <span className="text-pink-500">"role"</span>
                      <span className="text-white">: </span>
                      <span className="text-yellow-300">"{activeExp.role}"</span>,
                    </motion.div>
                    
                    <motion.div variants={terminalLine} className="pl-4">
                      <span className="text-pink-500">"company"</span>
                      <span className="text-white">: </span>
                      <span className="text-[#d4af37] font-bold">"{activeExp.company}"</span>,
                    </motion.div>
                    
                    <motion.div variants={terminalLine} className="pl-4 flex gap-8">
                      <div>
                        <span className="text-pink-500">"date"</span>
                        <span className="text-white">: </span>
                        <span className="text-green-300">"{activeExp.date}"</span>,
                      </div>
                      <div className="hidden md:block">
                        <span className="text-pink-500">"location"</span>
                        <span className="text-white">: </span>
                        <span className="text-purple-300">"{activeExp.location}"</span>,
                      </div>
                    </motion.div>
                    
                    {/* Array of points */}
                    <motion.div variants={terminalLine} className="pl-4 mt-2">
                      <span className="text-pink-500">"contributions"</span>
                      <span className="text-white">: [</span>
                    </motion.div>
                    
                    <ul className="flex flex-col gap-2 pl-8 border-l border-white/10 ml-6">
                      {activeExp.points.map((point, i) => (
                        <motion.li key={i} variants={terminalLine} className="flex items-start">
                          <span className="text-white mr-2">"</span>
                          <span className="text-gray-300 leading-relaxed">{point}</span>
                          <span className="text-white ml-1">"</span>
                          {i < activeExp.points.length - 1 && <span className="text-white">,</span>}
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.div variants={terminalLine} className="pl-4">
                      <span className="text-white">]</span>
                    </motion.div>
                    
                    <motion.div variants={terminalLine}>
                      <span className="text-white">{'}'}</span>
                    </motion.div>
                  </div>

                  {/* Blinking Cursor at the bottom */}
                  <motion.div variants={terminalLine} className="mt-6 flex items-center text-[#2a8af6]">
                    <span className="text-green-400 font-bold">mayank@admin</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">~/experience</span>
                    <span className="text-white">$</span>
                    <motion.div 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2.5 h-4 bg-white ml-2"
                    ></motion.div>
                  </motion.div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}