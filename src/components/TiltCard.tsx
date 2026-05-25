"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
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

  // Active tilt coordinates (mouse or touch position)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  // Map position progress (0 to 1) to rotation degree for active tilt
  const activeRotateX = useTransform(springY, [0, 1], [maxRotate, -maxRotate]);
  const activeRotateY = useTransform(springX, [0, 1], [-maxRotate, maxRotate]);

  // Scroll-driven passive X-rotation (cylinder-like roll as it moves through viewport)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Card tilts forward as it enters, flat in middle, backward as it leaves
  const passiveRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [maxRotate * 0.7, 0, -maxRotate * 0.7]
  );
  const springPassiveRotateX = useSpring(passiveRotateX, { stiffness: 80, damping: 15 });

  // Blends between passive scroll tilt (0) and active touch/hover tilt (1)
  const activeProgress = useMotionValue(0);
  const springActiveProgress = useSpring(activeProgress, { stiffness: 100, damping: 15 });

  // Dynamic blends
  const rotateX = useTransform(
    [springPassiveRotateX, activeRotateX, springActiveProgress],
    (latest: any[]) => {
      const p = latest[0] as number;
      const a = latest[1] as number;
      const pr = latest[2] as number;
      return (1 - pr) * p + pr * a;
    }
  );
  const rotateY = useTransform(
    [activeRotateY, springActiveProgress],
    (latest: any[]) => {
      const a = latest[0] as number;
      const pr = latest[1] as number;
      return pr * a;
    }
  );

  // Specular highlight gradient mapping (active tilt only)
  const shineX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(springY, [0, 1], ["0%", "100%"]);

  // Mouse Handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    if (isTouch) return;
    setHovered(true);
    activeProgress.set(1);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setHovered(false);
    activeProgress.set(0);
    x.set(0.5);
    y.set(0.5);
  };

  // Touch Handlers
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!ref.current) return;
    const touch = e.touches[0];
    const rect = ref.current.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    x.set(Math.max(0, Math.min(touchX / rect.width, 1)));
    y.set(Math.max(0, Math.min(touchY / rect.height, 1)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setHovered(true);
    activeProgress.set(1);
    handleTouchMove(e);
  };

  const handleTouchEnd = () => {
    setHovered(false);
    activeProgress.set(0);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className="perspective-[1000px] w-full h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
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

