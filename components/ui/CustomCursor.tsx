"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Mouse position coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast spring for the tiny center dot
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 400, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 400, mass: 0.1 });

  // Slower, elegant spring for the outer golden ring
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 150, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 150, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX); 
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect if mouse is over a clickable element to make the cursor expand
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* The Outer Golden Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-[#d4af37]"
        style={{
          x: ringX,
          y: ringY,
          // Offset the ring to center it (-20px for half of 40px width)
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? "60px" : "40px",
          height: isHovering ? "60px" : "40px",
          backgroundColor: isHovering ? "rgba(212, 175, 55, 0.1)" : "transparent",
          boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* The Inner Precise Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full bg-[#d4af37]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: "8px",
          height: "8px",
          boxShadow: "0 0 10px rgba(212, 175, 55, 0.8)",
        }}
      />
    </>
  );
}