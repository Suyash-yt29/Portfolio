"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Caveat, Cormorant_Garamond } from "next/font/google";

// Premium Fonts
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const premiumFont = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],
  style: ["normal", "italic"] 
});

// Categories (mapped to the user's requested skill groups)
const categories = [
  { id: "programming", name: "Programming", sunText: "Core", sunColor: "rgba(234,179,8,0.6)", icon: "M12 2L2 7l10 5 10-5-10-5z" },
  { id: "frontend", name: "Frontend", sunText: "UI", sunColor: "rgba(34,211,238,0.6)", icon: "M4 6h16v12H4z" },
  { id: "backend", name: "Backend", sunText: "Server", sunColor: "rgba(34,197,94,0.6)", icon: "M12 2v6M6 12v8h12v-8" },
  { id: "ai_tools", name: "AI & Tools", sunText: "AI", sunColor: "rgba(168,85,247,0.6)", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" },
  { id: "core_strengths", name: "Core Strengths", sunText: "Strengths", sunColor: "rgba(249,115,22,0.6)", icon: "M12 2l4 10-4-2-4 2z" },
  { id: "learning", name: "Currently Learning", sunText: "Now", sunColor: "rgba(59,130,246,0.6)", icon: "M12 2l6 6-6-2-6 2z" }
];

const orbitConfigs = [
  { size: "w-[120px] h-[120px] md:w-[160px] md:h-[160px]", duration: 25 }, 
  { size: "w-[160px] h-[160px] md:w-[220px] md:h-[220px]", duration: 38 }, 
  { size: "w-[200px] h-[200px] md:w-[280px] md:h-[280px]", duration: 20 }, 
  { size: "w-[240px] h-[240px] md:w-[340px] md:h-[340px]", duration: 42 }, 
  { size: "w-[280px] h-[280px] md:w-[400px] md:h-[400px]", duration: 28 }, 
  { size: "w-[320px] h-[320px] md:w-[460px] md:h-[460px]", duration: 48 }, 
  { size: "w-[360px] h-[360px] md:w-[520px] md:h-[520px]", duration: 32 }, 
];

type Skill = {
  id: string;
  categoryId: string;
  name: string;
  percent: number;
  color: string;
  glowColor: string;
  angle: number;
  image: string;
  invertLogo?: boolean;
};

const allSkills: Skill[] = [
  // Programming
  { id: "javascript", categoryId: "programming", name: "JavaScript", percent: 92, color: "from-yellow-300 to-yellow-500", glowColor: "rgba(250,204,21,1)", angle: 0, image: "/skills/javascript.png" },
  { id: "python", categoryId: "programming", name: "Python", percent: 90, color: "from-yellow-400 to-blue-500", glowColor: "rgba(234,179,8,1)", angle: 60, image: "/skills/python.png" },
  { id: "html", categoryId: "programming", name: "HTML", percent: 88, color: "from-orange-400 to-red-500", glowColor: "rgba(249,115,22,1)", angle: 120, image: "/skills/html.png" },
  { id: "css", categoryId: "programming", name: "CSS", percent: 86, color: "from-blue-400 to-indigo-500", glowColor: "rgba(59,130,246,1)", angle: 180, image: "/skills/css.png" },
  { id: "typescript", categoryId: "programming", name: "TypeScript", percent: 88, color: "from-sky-400 to-blue-600", glowColor: "rgba(56,189,248,1)", angle: 240, image: "/skills/typescript.png" },

  // Frontend
  { id: "react", categoryId: "frontend", name: "React", percent: 90, color: "from-cyan-400 to-blue-500", glowColor: "rgba(6,182,212,1)", angle: 30, image: "/skills/react.png" },
  { id: "nextjs", categoryId: "frontend", name: "Next.js", percent: 90, color: "from-white to-gray-400", glowColor: "rgba(255,255,255,1)", angle: 150, image: "/skills/next.png" },
  { id: "tailwind", categoryId: "frontend", name: "Tailwind CSS", percent: 89, color: "from-teal-300 to-cyan-500", glowColor: "rgba(20,184,166,1)", angle: 270, image: "/skills/tailwind.png" },
  { id: "vercel", categoryId: "frontend", name: "Vercel", percent: 84, color: "from-gray-200 to-slate-400", glowColor: "rgba(226,232,240,1)", angle: 30, image: "/skills/vercel.png" },
  { id: "seo", categoryId: "frontend", name: "SEO", percent: 79, color: "from-emerald-300 to-green-500", glowColor: "rgba(52,211,153,1)", angle: 210, image: "/skills/seo.png" },

  // Backend
  { id: "flask", categoryId: "backend", name: "Flask", percent: 85, color: "from-green-400 to-emerald-600", glowColor: "rgba(34,197,94,1)", angle: 0, image: "/skills/flask.png" },
  { id: "nodejs", categoryId: "programming", name: "Node.js", percent: 88, color: "from-green-400 to-emerald-600", glowColor: "rgba(34,197,94,1)", angle: 90, image: "/skills/node.png" },
  { id: "socketio", categoryId: "backend", name: "Socket.IO", percent: 84, color: "from-yellow-400 to-orange-500", glowColor: "rgba(234,179,8,1)", angle: 180, image: "/skills/websockets.png" },
  { id: "express", categoryId: "backend", name: "Express", percent: 86, color: "from-emerald-300 to-green-500", glowColor: "rgba(74,222,128,1)", angle: 300, image: "/skills/express.png" },
  { id: "docker", categoryId: "backend", name: "Docker", percent: 83, color: "from-sky-300 to-cyan-500", glowColor: "rgba(103,232,249,1)", angle: 30, image: "/skills/docker.png" },
  { id: "mysql", categoryId: "backend", name: "MySQL", percent: 82, color: "from-blue-400 to-indigo-500", glowColor: "rgba(96,165,250,1)", angle: 150, image: "/skills/mysql.png" },
  { id: "fastapi", categoryId: "backend", name: "FastAPI", percent: 80, color: "from-teal-300 to-emerald-500", glowColor: "rgba(94,234,212,1)", angle: 210, image: "/skills/fastapi.png" },
  { id: "django", categoryId: "backend", name: "Django", percent: 79, color: "from-emerald-400 to-green-600", glowColor: "rgba(52,211,153,1)", angle: 270, image: "/skills/django.png" },

  // AI & Tools
  { id: "huggingface", categoryId: "ai_tools", name: "Hugging Face", percent: 80, color: "from-purple-400 to-pink-500", glowColor: "rgba(168,85,247,1)", angle: 45, image: "/skills/huggingface.png" },
  { id: "colab", categoryId: "ai_tools", name: "Google Colab", percent: 82, color: "from-blue-400 to-cyan-500", glowColor: "rgba(59,130,246,1)", angle: 135, image: "/skills/colab.png" },
  { id: "git", categoryId: "ai_tools", name: "Git", percent: 90, color: "from-orange-400 to-red-500", glowColor: "rgba(249,115,22,1)", angle: 225, image: "/skills/git.png" },
  { id: "json", categoryId: "ai_tools", name: "JSON", percent: 92, color: "from-gray-300 to-gray-500", glowColor: "rgba(156,163,175,1)", angle: 315, image: "/skills/json.png" },
  { id: "ai_integration", categoryId: "ai_tools", name: "AI Integration", percent: 85, color: "from-amber-400 to-orange-500", glowColor: "rgba(245,158,11,1)", angle: 270, image: "/skills/ai.png" },

  // Core Strengths (as lightweight items)
  { id: "backend_strength", categoryId: "core_strengths", name: "Backend Development", percent: 92, color: "from-green-400 to-emerald-600", glowColor: "rgba(34,197,94,1)", angle: 0, image: "/skills/backend.png" },
  { id: "product_thinking", categoryId: "core_strengths", name: "Product Thinking", percent: 88, color: "from-purple-400 to-pink-600", glowColor: "rgba(168,85,247,1)", angle: 60, image: "/skills/product.png" },
  { id: "fast_learning", categoryId: "core_strengths", name: "Fast Learning", percent: 94, color: "from-blue-400 to-indigo-600", glowColor: "rgba(59,130,246,1)", angle: 120, image: "/skills/learning.png" },
  { id: "uiux_thinking", categoryId: "core_strengths", name: "UI/UX Thinking", percent: 86, color: "from-teal-300 to-cyan-500", glowColor: "rgba(20,184,166,1)", angle: 180, image: "/skills/uiux.png" },
  { id: "realtime", categoryId: "core_strengths", name: "Real-time Systems", percent: 85, color: "from-yellow-400 to-orange-500", glowColor: "rgba(234,179,8,1)", angle: 240, image: "/skills/realtime.png" },
  { id: "problem_solving", categoryId: "core_strengths", name: "Problem Solving", percent: 95, color: "from-amber-400 to-orange-500", glowColor: "rgba(245,158,11,1)", angle: 300, image: "/skills/problem.png" },

  // Currently Learning
  { id: "advanced_backend", categoryId: "learning", name: "Advanced Backend Systems", percent: 60, color: "from-blue-400 to-indigo-600", glowColor: "rgba(59,130,246,1)", angle: 0, image: "/skills/advanced_backend.png" },
  { id: "ai_product", categoryId: "learning", name: "AI Product Workflows", percent: 60, color: "from-purple-400 to-pink-500", glowColor: "rgba(168,85,247,1)", angle: 90, image: "/skills/ai_product.png" },
  { id: "modern_web", categoryId: "learning", name: "Modern Web Architecture", percent: 65, color: "from-cyan-400 to-blue-500", glowColor: "rgba(6,182,212,1)", angle: 180, image: "/skills/modern_web.png" },
  { id: "product_design", categoryId: "learning", name: "Product Design Thinking", percent: 62, color: "from-amber-400 to-orange-500", glowColor: "rgba(245,158,11,1)", angle: 270, image: "/skills/product_design.png" },
  { id: "mlops", categoryId: "learning", name: "MLOps", percent: 62, color: "from-violet-400 to-fuchsia-500", glowColor: "rgba(192,132,252,1)", angle: 330, image: "/skills/mlops.png" },
  { id: "nlp", categoryId: "learning", name: "NLP", percent: 64, color: "from-indigo-400 to-blue-500", glowColor: "rgba(99,102,241,1)", angle: 45, image: "/skills/nlp.png" },
  { id: "rag", categoryId: "learning", name: "RAG", percent: 61, color: "from-cyan-400 to-sky-500", glowColor: "rgba(56,189,248,1)", angle: 135, image: "/skills/rag.png" },
];

const skillDescriptions: Record<string, string> = {
  javascript: "Builds interactive logic behind modern web applications and data-driven interfaces.",
  python: "Powers scripting, automation, and AI prototyping workflows.",
  html: "Structures semantic page layouts that support strong foundations and accessibility.",
  css: "Shapes responsive layouts, visual polish, and interface feel.",
  typescript: "Adds type safety to JavaScript projects and keeps large codebases maintainable.",
  react: "Creates reusable UI components and dynamic state-driven experiences.",
  nextjs: "Delivers production-ready React apps with routing, rendering, and performance in mind.",
  tailwind: "Speeds up design iteration with utility-first styling and consistent UI systems.",
  vercel: "Simplifies deployment pipelines and makes production hosting fast and reliable.",
  seo: "Improves discoverability through metadata, structure, and content visibility strategies.",
  flask: "Provides lightweight backend APIs with a flexible and Python-first approach.",
  nodejs: "Powers event-driven server workflows and real-time application logic.",
  socketio: "Enables low-latency bidirectional communication for live features.",
  express: "Adds a fast routing layer and middleware-driven server architecture.",
  docker: "Packages services consistently for deployment and local environment parity.",
  mysql: "Stores relational data and supports structured query-based application workflows.",
  fastapi: "Creates high-performance async APIs with modern Python tooling.",
  django: "Offers a complete web framework for secure and maintainable backend systems.",
  huggingface: "Connects projects to open-source models and pretrained transformers.",
  colab: "Supports experimentation, training, and rapid prototyping in notebooks.",
  git: "Tracks changes, enables collaboration, and keeps delivery workflows organized.",
  json: "Structures data exchange between frontend, backend, and AI services.",
  ai_integration: "Bridges product ideas with practical AI features and connected workflows.",
  backend_strength: "Focuses on dependable systems architecture and scalable server-side design.",
  product_thinking: "Turns user needs and product goals into practical engineering decisions.",
  fast_learning: "Reflects the ability to absorb new frameworks, tools, and workflows quickly.",
  uiux_thinking: "Combines visual clarity with usability and intent-driven interaction design.",
  realtime: "Builds systems that react instantly and stay responsive under live traffic.",
  problem_solving: "Strengthens debugging, architecture decisions, and tradeoff analysis.",
  advanced_backend: "Explores deeper infrastructure design, scaling, and system resilience.",
  ai_product: "Aligns AI capabilities with real product workflows and user value.",
  modern_web: "Improves architecture and performance for contemporary web experiences.",
  product_design: "Applies design thinking to shape product experiences and interfaces.",
  mlops: "Brings deployment, monitoring, and model lifecycle management into production.",
  nlp: "Works with text understanding, extraction, and language-driven interfaces.",
  rag: "Combines retrieval with generation for grounded, context-aware AI experiences."
};

export default function Skills() {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [selectedSkillId, setSelectedSkillId] = useState(allSkills[0].id);

  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0];
  const currentSkills = useMemo(() => allSkills.filter(s => s.categoryId === activeCategoryId), [activeCategoryId]);
  const activeSkill = currentSkills.find(skill => skill.id === selectedSkillId) ?? currentSkills[0];

  return (
    <section id="skills" className="relative flex w-full min-h-screen flex-col items-center justify-start py-24 z-10 overflow-hidden bg-transparent">
      
      <div className="text-center mb-12 z-20">
        <span className="text-[#d4af37] font-mono font-semibold text-xs md:text-sm tracking-[0.4em] uppercase mb-4 block drop-shadow-md">
          03. Technical Arsenal
        </span>
        <h2 className={`${caveatFont.className} text-6xl md:text-7xl lg:text-[6rem] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4af37] to-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]`}>
          System Capabilities
        </h2>
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full max-w-7xl">
        
        {/* CATEGORY SELECTOR */}
        <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-64 shrink-0 overflow-x-auto pb-4 lg:pb-0 z-20 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 backdrop-blur-md whitespace-nowrap lg:whitespace-normal text-left
                ${activeCategoryId === category.id 
                  ? 'border-[#d4af37] bg-[#d4af37]/10 text-white shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                  : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/30 hover:bg-white/5'}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 shrink-0 transition-colors ${activeCategoryId === category.id ? 'text-[#d4af37]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                <path d={category.icon} />
              </svg>
              <span className="font-mono text-[11px] md:text-xs tracking-widest uppercase font-semibold">{category.name}</span>
            </button>
          ))}
        </div>

        {/* THE SOLAR SYSTEM CONTAINER */}
        <div className="relative w-[380px] h-[380px] md:w-[540px] md:h-[540px] flex items-center justify-center shrink-0 z-10">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategoryId}
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              
              {/* THE SUN CORE */}
              <div 
                className="absolute z-30 flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-full bg-[#0a0a0a] border-2 transition-all duration-700"
                style={{ 
                  boxShadow: `0 0 30px ${activeCategory.sunColor}`,
                  borderColor: activeCategory.sunColor 
                }}
              >
                <span className={`${premiumFont.className} text-[#d4af37] font-bold text-center leading-tight text-sm md:text-lg`}>
                  {activeCategory.sunText}
                </span>
              </div>

              {/* ORBITS & PLANETS */}
              {currentSkills.map((skill, index) => {
                const orbit = orbitConfigs[index % orbitConfigs.length];

                return (
                  <motion.div
                    key={skill.id}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: orbit.duration, ease: "linear" }}
                    className={`absolute rounded-full border border-white/5 ${orbit.size} flex items-center justify-center pointer-events-none transform-gpu will-change-transform`}
                  >
                    <div 
                      className="absolute w-full h-full pointer-events-none"
                      style={{ transform: `rotate(${skill.angle}deg)` }}
                    >
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: orbit.duration, ease: "linear" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto transform-gpu will-change-transform"
                      >
                        {/* UNIFORM SIZING: Every planet is strictly h-12 w-12 (mobile) and h-14 w-14 (desktop) */}
                        <button
                          onClick={() => setSelectedSkillId(skill.id)}
                          style={{ borderColor: activeSkill?.id === skill.id ? skill.glowColor : 'rgba(255,255,255,0.1)' }}
                          className={`group relative flex items-center justify-center rounded-full transition-all duration-300 border-2 bg-[#0a0a0a] h-12 w-12 md:h-14 md:w-14
                            ${activeSkill?.id === skill.id 
                              ? 'scale-110 z-20 shadow-[0_0_15px_var(--glow)] border-[color:var(--glow)]' 
                              : 'z-10 hover:scale-110 hover:shadow-[0_0_15px_var(--glow)]'
                            }`}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = skill.glowColor)}
                          onMouseLeave={(e) => {
                            if (activeSkill?.id !== skill.id) {
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            }
                          }}
                        >
                          <img 
                            src={skill.image} 
                            alt={skill.name} 
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            className={`relative z-10 object-contain drop-shadow-[0_0_4px_rgba(255,255,255,0.2)] w-7 h-7 md:w-8 md:h-8 ${skill.invertLogo ? 'invert' : ''}`} 
                          />

                          <span className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] md:text-xs font-mono font-bold text-white bg-[#0a0a0a] px-3 py-1.5 rounded-md border pointer-events-none z-50 tracking-widest uppercase"
                                style={{ borderColor: skill.glowColor }}>
                            {skill.name}
                          </span>
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* STATIC TELEMETRY PANEL */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col justify-center z-20">
          <AnimatePresence mode="wait">
            {activeSkill && (
              <motion.div
                key={activeSkill.id} 
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.3 }}
                className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#080808]/80 p-6 md:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              >
                <div className={`absolute -inset-20 bg-gradient-to-br ${activeSkill.color} opacity-10 blur-[60px] pointer-events-none`}></div>

                <div className="relative z-10">
                  <span className="text-[#d4af37] font-mono text-[10px] tracking-[0.2em] uppercase mb-2 block">
                    Target Identified // {activeCategory.name}
                  </span>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-[#0a0a0a] border border-white/20 p-2.5 shrink-0 overflow-hidden"
                         style={{ boxShadow: `0 0 15px ${activeSkill.glowColor}` }}>
                      <img src={activeSkill.image} alt="" className={`relative z-10 w-full h-full object-contain ${activeSkill.invertLogo ? 'invert' : ''}`} />
                    </div>
                    <h3 className={`${premiumFont.className} text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md`}>
                      {activeSkill.name}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-400 font-mono text-[10px] tracking-widest uppercase">Mastery Level</span>
                      <span className="text-white font-bold font-mono text-lg">{activeSkill.percent}%</span>
                    </div>
                    
                    <div className="relative h-3 w-full rounded-full bg-white/5 border border-white/10 overflow-hidden shadow-inner backdrop-blur-sm">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${activeSkill.percent}%` }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                        className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${activeSkill.color} shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-50 rounded-full"></div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-sm leading-6 text-gray-200">
                      {skillDescriptions[activeSkill.id] || "This capability helps shape the product experience and delivery flow."}
                    </p>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}