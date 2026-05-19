"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Caveat, Cormorant_Garamond } from "next/font/google";

// Premium Fonts
const caveatFont = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const premiumFont = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],
  style: ["normal", "italic"] 
});

// Categories
const categories = [
  { id: "ai", name: "AI & Machine Learning", sunText: "AI / ML", sunColor: "rgba(168, 85, 247, 0.6)", icon: "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1.27a1.73 1.73 0 0 1-1.27 3h-1v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1H3a1.73 1.73 0 0 1-1.27-3H3a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 12 2z" },
  { id: "frontend", name: "Frontend & UI", sunText: "UI / UX", sunColor: "rgba(34, 211, 238, 0.6)", icon: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm4 5v2h8v-2H8z" },
  { id: "backend", name: "Backend & Database", sunText: "Backend", sunColor: "rgba(34, 197, 94, 0.6)", icon: "M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 6c-4.42 0-8-1.34-8-3s3.58-3 8-3 8 1.34 8 3-3.58 3-8 3zm0 6c-4.42 0-8-1.34-8-3v.35c0 1.66 3.58 3 8 3s8-1.34 8-3V11c0 1.66-3.58 3-8 3z" },
  { id: "languages", name: "Languages & Core", sunText: "Core", sunColor: "rgba(234, 179, 8, 0.6)", icon: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" },
  { id: "devops", name: "DevOps & Tools", sunText: "DevOps", sunColor: "rgba(249, 115, 22, 0.6)", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { id: "mobile", name: "Mobile App Dev", sunText: "Mobile", sunColor: "rgba(59, 130, 246, 0.6)", icon: "M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" }
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

const allSkills = [
  // --- AI & Machine Learning ---
  { id: "gemini", categoryId: "ai", name: "Gemini API", percent: 95, color: "from-blue-400 to-purple-500", glowColor: "rgba(139, 92, 246, 1)", angle: 0, image: "/skills/gemini.png" },
  { id: "rag", categoryId: "ai", name: "RAG & LangChain", percent: 95, color: "from-amber-400 to-orange-500", glowColor: "rgba(245, 158, 11, 1)", angle: 120, image: "/skills/rag.png", invertLogo: true },
  { id: "chatbot", categoryId: "ai", name: "Chatbot Dev", percent: 95, color: "from-yellow-300 to-amber-500", glowColor: "rgba(234, 179, 8, 1)", angle: 240, image: "/skills/chatbot.png" },
  { id: "openai", categoryId: "ai", name: "OpenAI API", percent: 90, color: "from-green-400 to-emerald-600", glowColor: "rgba(16, 185, 129, 1)", angle: 60, image: "/skills/openai.png" },
  { id: "mlops", categoryId: "ai", name: "MLOps", percent: 85, color: "from-pink-400 to-rose-600", glowColor: "rgba(244, 63, 94, 1)", angle: 180, image: "/skills/mlops.png" },
  { id: "xgboost", categoryId: "ai", name: "XGBoost", percent: 85, color: "from-cyan-400 to-blue-500", glowColor: "rgba(6, 182, 212, 1)", angle: 300, image: "/skills/xgboost.png" },
  { id: "nlp", categoryId: "ai", name: "NLP", percent: 90, color: "from-teal-300 to-green-500", glowColor: "rgba(20, 184, 166, 1)", angle: 90, image: "/skills/nlp.png" },

  // --- Frontend & UI ---
  { id: "next", categoryId: "frontend", name: "Next.js 14", percent: 95, color: "from-white to-gray-400", glowColor: "rgba(255, 255, 255, 1)", angle: 0, image: "/skills/next.png", invertLogo: true }, 
  { id: "tailwind", categoryId: "frontend", name: "Tailwind CSS", percent: 95, color: "from-teal-300 to-cyan-500", glowColor: "rgba(20, 184, 166, 1)", angle: 180, image: "/skills/tailwind.png" },
  { id: "react", categoryId: "frontend", name: "React.js", percent: 90, color: "from-cyan-400 to-blue-500", glowColor: "rgba(6, 182, 212, 1)", angle: 90, image: "/skills/react.png" },
  { id: "htmlcss", categoryId: "frontend", name: "HTML / CSS", percent: 90, color: "from-orange-400 to-red-500", glowColor: "rgba(249, 115, 22, 1)", angle: 270, image: "/skills/html.png" },
  { id: "streamlit", categoryId: "frontend", name: "Streamlit", percent: 85, color: "from-red-400 to-rose-600", glowColor: "rgba(225, 29, 72, 1)", angle: 45, image: "/skills/streamlit.png" },
  { id: "figma", categoryId: "frontend", name: "Figma (UI/UX)", percent: 80, color: "from-purple-400 to-pink-500", glowColor: "rgba(168, 85, 247, 1)", angle: 225, image: "/skills/figma.png" },

  // --- Backend & Database ---
  { id: "supabase", categoryId: "backend", name: "Supabase", percent: 90, color: "from-emerald-400 to-green-600", glowColor: "rgba(16, 185, 129, 1)", angle: 0, image: "/skills/supabase.png" },
  { id: "fastapi", categoryId: "backend", name: "FastAPI", percent: 90, color: "from-teal-400 to-cyan-600", glowColor: "rgba(45, 212, 191, 1)", angle: 180, image: "/skills/fastapi.png" },
  { id: "node", categoryId: "backend", name: "Node.js", percent: 85, color: "from-green-400 to-emerald-600", glowColor: "rgba(34, 197, 94, 1)", angle: 90, image: "/skills/node.png", invertLogo: true }, 
  { id: "express", categoryId: "backend", name: "Express.js", percent: 85, color: "from-gray-300 to-gray-500", glowColor: "rgba(156, 163, 175, 1)", angle: 270, image: "/skills/express.png", invertLogo: true }, 
  { id: "websockets", categoryId: "backend", name: "WebSockets", percent: 85, color: "from-yellow-400 to-orange-500", glowColor: "rgba(234, 179, 8, 1)", angle: 45, image: "/skills/websockets.png" },
  { id: "mysql", categoryId: "backend", name: "MySQL", percent: 85, color: "from-blue-400 to-indigo-600", glowColor: "rgba(59, 130, 246, 1)", angle: 225, image: "/skills/mysql.png" },
  { id: "django", categoryId: "backend", name: "Django", percent: 80, color: "from-green-600 to-emerald-800", glowColor: "rgba(4, 120, 87, 1)", angle: 135, image: "/skills/django.png" },

  // --- Languages & Core ---
  { id: "python", categoryId: "languages", name: "Python", percent: 95, color: "from-yellow-400 to-blue-500", glowColor: "rgba(234, 179, 8, 1)", angle: 0, image: "/skills/python.png" },
  { id: "javascript", categoryId: "languages", name: "JavaScript", percent: 95, color: "from-yellow-300 to-yellow-500", glowColor: "rgba(250, 204, 21, 1)", angle: 180, image: "/skills/javascript.png" },
  { id: "typescript", categoryId: "languages", name: "TypeScript", percent: 90, color: "from-blue-400 to-blue-600", glowColor: "rgba(59, 130, 246, 1)", angle: 90, image: "/skills/typescript.png" },
  { id: "java", categoryId: "languages", name: "Java", percent: 80, color: "from-red-400 to-orange-500", glowColor: "rgba(239, 68, 68, 1)", angle: 270, image: "/skills/java.png" },
  { id: "cpp", categoryId: "languages", name: "C++", percent: 75, color: "from-blue-500 to-indigo-700", glowColor: "rgba(37, 99, 235, 1)", angle: 45, image: "/skills/cpp.png" },

  // --- DevOps & Tools ---
  { id: "vercel", categoryId: "devops", name: "Vercel", percent: 95, color: "from-white to-gray-400", glowColor: "rgba(255, 255, 255, 1)", angle: 0, image: "/skills/vercel.png", invertLogo: true },
  { id: "git", categoryId: "devops", name: "Git / GitHub", percent: 90, color: "from-orange-400 to-red-500", glowColor: "rgba(249, 115, 22, 1)", angle: 180, image: "/skills/git.png" },
  { id: "docker", categoryId: "devops", name: "Docker", percent: 85, color: "from-blue-400 to-cyan-600", glowColor: "rgba(56, 189, 248, 1)", angle: 90, image: "/skills/docker.png" },
  { id: "postman", categoryId: "devops", name: "Postman", percent: 85, color: "from-orange-300 to-orange-500", glowColor: "rgba(249, 115, 22, 1)", angle: 270, image: "/skills/postman.png" },
  { id: "seo", categoryId: "devops", name: "SEO", percent: 80, color: "from-purple-400 to-indigo-500", glowColor: "rgba(168, 85, 247, 1)", angle: 45, image: "/skills/seo.png" },
  { id: "cpanel", categoryId: "devops", name: "cPanel", percent: 80, color: "from-orange-500 to-red-600", glowColor: "rgba(239, 68, 68, 1)", angle: 225, image: "/skills/cpanel.png" },

  // --- Mobile App Dev ---
  { id: "android", categoryId: "mobile", name: "Android Dev", percent: 85, color: "from-green-400 to-emerald-500", glowColor: "rgba(34, 197, 94, 1)", angle: 0, image: "/skills/android.png" },
  { id: "kotlin", categoryId: "mobile", name: "Kotlin", percent: 80, color: "from-purple-400 to-orange-500", glowColor: "rgba(168, 85, 247, 1)", angle: 120, image: "/skills/kotlin.png" },
  { id: "xml", categoryId: "mobile", name: "XML", percent: 85, color: "from-gray-300 to-gray-500", glowColor: "rgba(156, 163, 175, 1)", angle: 240, image: "/skills/xml.png" },
];

export default function Skills() {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [activeSkill, setActiveSkill] = useState(allSkills[0]);

  useEffect(() => {
    const skillsInCategory = allSkills.filter(s => s.categoryId === activeCategoryId);
    if (skillsInCategory.length > 0) {
      setActiveSkill(skillsInCategory[0]);
    }
  }, [activeCategoryId]);

  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0];
  const currentSkills = allSkills.filter(s => s.categoryId === activeCategoryId);

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
                          onClick={() => setActiveSkill(skill)}
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

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}