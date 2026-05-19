import IntroSequence from "../components/animations/IntroSequence";
import Navbar from "../components/ui/Navbar"; 
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";
import Contact from "../components/sections/Contact"; 

export default function Home() {
  return (
    <main className="relative flex flex-col w-full min-h-screen bg-black">
      <IntroSequence />
      <Navbar />

      <div className="relative z-10 flex flex-col w-full">
        <Hero />
        
        <div className="h-32 w-full bg-gradient-to-b from-transparent to-[#050505] z-10 absolute top-[100vh] -mt-32 pointer-events-none"></div>
        
        <div className="relative w-full bg-[#050505]">
          
          <div className="sticky top-0 h-screen w-full z-0 overflow-hidden bg-black">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
              /* FIX 1: Bumped opacity back up to 70! */
              className="absolute inset-0 h-full w-full object-cover opacity-70 transform-gpu"
            >
              <source src="/about-bg.mp4" type="video/mp4" />
            </video>
            
            {/* FIX 2: Lightened the middle overlay to via-black/30 so the video is clearly visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-black/30 to-[#050505]/95 pointer-events-none"></div>
          </div>

          <div className="relative z-10 -mt-[100vh] flex flex-col w-full">
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Contact />
          </div>

        </div>
      </div>
    </main>
  );
}