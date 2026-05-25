"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only apply on screens wider than 1024px
    if (window.innerWidth < 1024) return;
    
    const handle = requestAnimationFrame(() => setMounted(true));
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.classList.contains("cursor-pointer");

      setHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      cancelAnimationFrame(handle);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Outer Follower */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#d0bcff]/40 pointer-events-none z-[99999] hidden lg:block -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          scale: hovered ? 1.6 : 1,
          borderColor: hovered ? "rgba(139, 92, 246, 0.8)" : "rgba(208, 188, 255, 0.4)",
          backgroundColor: hovered ? "rgba(139, 92, 246, 0.08)" : "rgba(0,0,0,0)",
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#d0bcff] pointer-events-none z-[99999] hidden lg:block -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          scale: hovered ? 0.6 : 1,
          backgroundColor: hovered ? "#8B5CF6" : "#d0bcff",
        }}
      />
    </>
  );
}
