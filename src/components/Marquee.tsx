"use client";

import React from "react";
import useIsTouchDevice from "../hooks/useIsTouchDevice";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  className?: string;
}

export default function Marquee({
  items,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const isTouch = useIsTouchDevice();
  // Duplicate 2x for mobile/touch, 4x for desktop to maintain seamless loop
  const content = isTouch ? [...items, ...items] : [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden w-full bg-[#121415] border-y border-[#494454]/40 py-3 select-none flex touch-pan-y ${className}`}>
      <div
        className="animate-marquee flex whitespace-nowrap gap-12 pr-12"
        style={{ animationDirection: direction === "right" ? "reverse" : "normal" }}
      >
        {content.map((item, idx) => (
          <span
            key={idx}
            className="text-white/60 hover:text-[#d0bcff] transition-colors duration-150 font-mono text-[12px] uppercase tracking-widest flex items-center gap-4"
          >
            {item}
            <span className="w-1.5 h-1.5 bg-[#8B5CF6] inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
