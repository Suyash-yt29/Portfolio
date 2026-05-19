"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Caveat, Cormorant_Garamond } from "next/font/google";

// 1. Premium Fonts
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const premiumParagraphFont = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600"],
  style: ["italic"] 
});

const projects = [
  {
    title: "AIONYX",
    subtitle: "Autonomous AI Data Analyst",
    description: "Architected a Multi-Model AI Agent capable of ingesting complex CSV/SQL datasets to generate actionable business insights using RAG and Google Gemini 1.5 Pro.",
    tech: ["Python", "LangChain", "Gemini 1.5 Pro", "Streamlit", "Docker"],
    github: "https://github.com/mayankvispute7/aionyx",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "SentinelX",
    subtitle: "Enterprise Fraud Intelligence Engine",
    description: "Deployed a real-time machine learning microservice using FastAPI and Docker to detect fraudulent financial transactions with an optimized XGBoost classification model.",
    tech: ["FastAPI", "XGBoost", "PostgreSQL", "Docker"],
    github: "https://github.com/mayankvispute7/SentinelX",
    color: "from-emerald-400 to-teal-600",
  },
  {
    title: "The Comeback",
    subtitle: "Intelligent Performance Tracking System",
    description: "Engineered a real-time full-stack platform using Optimistic UI and WebSockets for zero-latency data synchronization. Features a live 'Discipline Score' algorithm.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase"],
    github: "https://github.com/mayankvispute7/Comeback",
    color: "from-orange-400 to-red-600",
  },
  {
    title: "AI Medical Diagnosis Chatbot",
    subtitle: "Predictive Health Triage System",
    description: "Developed a predictive health triage system that analyzes user-reported symptoms using decision-tree algorithms and OpenAI to output preliminary diagnosis probabilities.",
    tech: ["Node.js", "OpenAI API", "JavaScript", "Decision Trees"],
    github: "https://github.com/mayankvispute7", 
    color: "from-purple-400 to-pink-600",
  },
  {
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Web Application",
    description: "Built a fully functional e-commerce web application featuring a shopping cart, product catalog, and secure checkout utilizing Django's MVT architecture.",
    tech: ["Python", "Django", "HTML/CSS", "SQL"],
    github: "https://github.com/mayankvispute7/EcommerceDjano",
    color: "from-gray-400 to-slate-600",
  }
];

export default function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <div id="projects">
      
      {/* DESKTOP VIEW */}
      {/* FIX: Changed bg-[#050505] to bg-transparent so the global video shows through */}
      <section ref={targetRef} className="hidden md:block relative h-[400vh] bg-transparent z-10">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          
          {/* Faded Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none whitespace-nowrap z-0">
            <h2 className="text-[20vw] font-black text-white">PROJECTS</h2>
          </div>

          {/* Section Header - Upgraded with Caveat Font */}
          <div className="absolute top-24 left-12 z-20">
            <span className="text-[#d4af37] font-mono text-sm tracking-widest uppercase mb-2 block">03. Featured Work</span>
            <h2 className={`${caveatFont.className} text-7xl md:text-8xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4af37] to-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]`}>
              The Vault.
            </h2>
          </div>

          <motion.div style={{ x }} className="flex gap-8 px-12 pt-20 z-10">
            {projects.map((project, index) => (
              
              /* FIX: LIQUID GLASS EFFECT applied here (bg-white/5, backdrop-blur-2xl) */
              <div key={index} className="group relative h-[60vh] w-[60vw] lg:w-[40vw] flex-shrink-0 overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-2xl transition-all hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                
                {/* Translucent Color Tint - allows background video to remain visible */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 transition-opacity duration-700 group-hover:opacity-40 mix-blend-screen`}></div>
                
                {/* Bottom fade to ensure text readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                      <span className="text-xl font-bold text-[#d4af37]">0{index + 1}</span>
                    </div>
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/20 transition-all hover:bg-[#d4af37]/20 hover:border-[#d4af37] hover:text-[#d4af37] cursor-none shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
                      </svg>
                    </a>
                  </div>

                  <div>
                    <h3 className="text-4xl font-extrabold text-white mb-2 group-hover:text-[#d4af37] transition-colors drop-shadow-md">{project.title}</h3>
                    <p className="text-sm font-mono text-[#d4af37] uppercase tracking-widest mb-4 drop-shadow-md">{project.subtitle}</p>
                    
                    {/* FIX: Premium Cursive Font applied to the description */}
                    <p className={`${premiumParagraphFont.className} text-gray-200 text-2xl md:text-3xl leading-relaxed mb-8 max-w-lg drop-shadow-lg`}>
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-medium text-gray-200 backdrop-blur-md">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MOBILE VIEW */}
      {/* FIX: bg-transparent for mobile as well */}
      <section className="block md:hidden relative w-full bg-transparent z-10 py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-[#d4af37] font-mono text-sm tracking-widest uppercase mb-2 block">03. Featured Work</span>
          <h2 className={`${caveatFont.className} text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4af37] to-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]`}>
            The Vault.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              /* FIX: LIQUID GLASS EFFECT applied here for mobile */
              className="relative w-full overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-2xl shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 mix-blend-screen`}></div>
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-md">
                    <span className="text-lg font-bold text-[#d4af37]">0{index + 1}</span>
                  </div>
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/20 text-gray-300 shadow-md">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
                    </svg>
                  </a>
                </div>

                <h3 className="text-3xl font-extrabold text-white mb-2 drop-shadow-md">{project.title}</h3>
                <p className="text-xs font-mono text-[#d4af37] uppercase tracking-widest mb-4 drop-shadow-md">{project.subtitle}</p>
                
                {/* FIX: Premium Cursive Font applied to the description for mobile */}
                <p className={`${premiumParagraphFont.className} text-gray-200 text-xl leading-relaxed mb-6 drop-shadow-lg`}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-medium text-gray-200 backdrop-blur-md">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}