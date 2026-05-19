"use client";

import { motion, Variants } from "framer-motion";
import { Caveat } from "next/font/google";

// Premium Cursive Font for the Heading
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

const educationStack = [
  {
    id: "step-1",
    level: "Phase 01: Foundation",
    title: "Secondary School (X)",
    institution: "Maharashtra State Board, Chalisgaon",
    date: "Class of 2021",
    highlight: "Score: 89.00%",
    color: "from-teal-500 to-emerald-700",
    borderColor: "border-teal-500/30",
    accent: "text-teal-400",
    topOffset: "top-[15vh]", // Stops highest on the screen
    zIndex: "z-10",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
  },
  {
    id: "step-2",
    level: "Phase 02: Specialization",
    title: "Diploma in Computer Science",
    institution: "Zeal Polytechnic, Pune",
    date: "2021 - 2024",
    highlight: "Score: 86.33%",
    color: "from-blue-500 to-cyan-700",
    borderColor: "border-blue-500/40",
    accent: "text-blue-400",
    topOffset: "top-[25vh]", // Stops slightly lower, stacking over the first
    zIndex: "z-20",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
  {
    id: "step-3",
    level: "Phase 03: Mastery (Current)",
    title: "Bachelor of Computer Engineering",
    institution: "Savitribai Phule Pune University, Pune",
    date: "2024 - 2027",
    highlight: "Computer Science & Eng.",
    color: "from-[#d4af37] to-yellow-700",
    borderColor: "border-[#d4af37]/60",
    accent: "text-[#d4af37]",
    topOffset: "top-[35vh]", // Stops lowest, capping the stack
    zIndex: "z-30",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ),
  }
];

export default function Education() {
  
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
    <section id="education" className="relative w-full pb-32 pt-24 z-10 bg-transparent">
      
      <div className="container relative z-10 mx-auto px-4 md:px-12 max-w-4xl">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.2 }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <motion.span variants={revealVariants} className="text-[#d4af37] font-sans font-semibold text-xs md:text-sm tracking-[0.4em] uppercase mb-4 block">
            05. Education
          </motion.span>
          
          <motion.h2 
            variants={revealVariants}
            className={`${caveatFont.className} text-6xl md:text-7xl lg:text-[5.5rem] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4af37] to-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]`}
          >
            Academic Progression
          </motion.h2>
          
          <motion.p variants={revealVariants} className="mt-6 text-gray-400 font-mono text-sm tracking-widest uppercase">
            Scroll to climb the ladder ↓
          </motion.p>
        </motion.div>

        {/* The Stacking Container */}
        <div className="relative flex flex-col gap-32 pb-[30vh]">
          {educationStack.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className={`sticky ${step.topOffset} ${step.zIndex} w-full`}
            >
              
              {/* 
                 FIX: Changed from transparent glass to solid bg-[#0a0a0a].
                 This 100% guarantees the text underneath will be hidden.
              */}
              <div 
                className={`w-full overflow-hidden rounded-[2rem] border bg-[#0a0a0a] p-6 md:p-12 shadow-[0_-20px_50px_rgba(0,0,0,0.9)] transition-all ${step.borderColor}`}
              >
                {/* Subtle colored tint inside the solid box to keep the premium feel */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 pointer-events-none`}></div>
                
                {/* Bottom fade for readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
                  
                  {/* Left Side: Icon & Titles */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-black border border-white/10 ${step.accent} shadow-inner`}>
                        {step.icon}
                      </div>
                      <span className="inline-block px-4 py-2 text-xs font-mono text-white bg-[#111] rounded-full border border-white/10 uppercase tracking-widest">
                        {step.level}
                      </span>
                    </div>
                    
                    <h3 className={`text-3xl md:text-4xl font-extrabold mb-3 ${step.accent} drop-shadow-md`}>
                      {step.title}
                    </h3>
                    <p className="text-white text-lg md:text-xl font-medium mb-2">{step.institution}</p>
                    <p className="text-gray-400 text-sm font-mono uppercase tracking-wider">{step.date}</p>
                  </div>

                  {/* Right Side: Score / Highlight Box */}
                  <div className="w-full md:w-auto mt-6 md:mt-0 flex-shrink-0">
                    <div className="flex flex-col justify-center items-start md:items-end p-6 rounded-2xl bg-[#111] border border-white/5 shadow-inner">
                      <span className="text-xs text-gray-400 uppercase font-mono tracking-widest mb-2">Status / Metric</span>
                      <span className={`font-mono text-xl md:text-2xl font-bold ${step.accent}`}>
                        {">"} {step.highlight}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}