"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef } from "react";

// --- Magnetic Button Wrapper ---
function MagneticWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3); // Magnetic pull strength
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardSpringX = useSpring(cardX, { damping: 30, stiffness: 200 });
  const cardSpringY = useSpring(cardY, { damping: 30, stiffness: 200 });
  const rotateX = useTransform(cardSpringY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(cardSpringX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleCardMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    cardX.set(mouseX / width - 0.5);
    cardY.set(mouseY / height - 0.5);
  };

  return (
    <section id="contact" className="relative flex w-full flex-col items-center justify-center pt-32 pb-12 z-10 overflow-hidden perspective-1000">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 100, filter: "blur(20px)", scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
          className="mx-auto max-w-4xl"
        >
          <span className="text-[#d4af37] font-mono text-sm tracking-widest uppercase mb-4 block">06. Initiate Contact</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-12">
            Let's Build <br/> The Future.
          </h2>

          {/* 3D Holographic Contact Card */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleCardMove}
            onMouseLeave={() => { cardX.set(0); cardY.set(0); }}
            className="relative w-full rounded-[2rem] border border-white/20 bg-[#0a0a0a]/60 p-8 md:p-12 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-8 cursor-none text-left"
          >
            {/* Left Side: Comms Info */}
            <div style={{ transform: "translateZ(40px)" }} className="flex flex-col w-full md:w-1/2">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative flex h-4 w-4 items-center justify-center">
                  <div className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-50"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm font-mono text-green-400 uppercase tracking-widest">Systems Online</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-6">Access Credentials</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Direct Line</span>
                  <a href="tel:+919511229694" className="text-xl md:text-2xl font-medium text-gray-300 hover:text-[#d4af37] transition-colors w-fit cursor-none">+91 9511229694</a>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Secure Comm-Link</span>
                  <a href="mailto:visputemayank007@gmail.com" className="text-xl md:text-2xl font-medium text-gray-300 hover:text-[#d4af37] transition-colors w-fit break-all cursor-none">visputemayank007@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Right Side: Magnetic Buttons */}
            <div style={{ transform: "translateZ(60px)" }} className="flex flex-col items-center md:items-end w-full md:w-1/2 gap-6">
              
              {/* UPDATED: Direct Google Drive Link */}
              <MagneticWrapper>
                <a 
                  href="https://drive.google.com/file/d/1mYgX2x_bSPc7t9VmTsdgw-PwACleHNZx/view?usp=drive_link" 
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-black font-bold transition-all hover:bg-[#d4af37] shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] cursor-none text-lg w-full md:w-auto"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-y-1">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  View / Download Resume
                </a>
              </MagneticWrapper>

              {/* Social Grid */}
              <div className="flex gap-4 mt-4">
                <MagneticWrapper>
                  <a href="https://github.com/mayankvispute7" target="_blank" rel="noreferrer" className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/5 transition-colors hover:bg-white/20 hover:text-[#d4af37] cursor-none shadow-lg">
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path></svg>
                  </a>
                </MagneticWrapper>
                <MagneticWrapper>
                  <a href="https://www.linkedin.com/in/mayank-vispute-a28641251/" target="_blank" rel="noreferrer" className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/5 transition-colors hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white cursor-none shadow-lg">
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </MagneticWrapper>
                <MagneticWrapper>
                  <a href="#" target="_blank" rel="noreferrer" className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/5 transition-colors hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white cursor-none shadow-lg">
                    <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                </MagneticWrapper>
              </div>

            </div>
          </motion.div>
        </motion.div>

      </div>
      
      <div className="mt-24 text-center text-xs font-mono text-gray-600">
        <p>Architected & Engineered by Mayank Vispute © {new Date().getFullYear()}</p>
      </div>
    </section>
  );
}