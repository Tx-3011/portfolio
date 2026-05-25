"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import useIsTouchDevice from "../hooks/useIsTouchDevice";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotate?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxRotate = 10,
}: TiltCardProps) {
  const isTouch = useIsTouchDevice();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  // Map progress (0 to 1) to rotation degree
  const rotateX = useTransform(springY, [0, 1], [maxRotate, -maxRotate]);
  const rotateY = useTransform(springX, [0, 1], [-maxRotate, maxRotate]);

  // specular highlight gradient mapping
  const shineX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(springY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseEnter = () => {
    if (isTouch) return;
    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  if (isTouch) {
    return (
      <div className={`w-full h-full ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className="perspective-[1000px] w-full h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full transition-shadow duration-300 ${className}`}
      >
        <div className="w-full h-full" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          {children}
        </div>

        {/* Specular Highlight / Shine Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-30 mix-blend-overlay"
          style={{
            opacity: hovered ? 0.15 : 0,
            background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 65%)`,
          }}
        />
      </motion.div>
    </div>
  );
}
