"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const chars = "!<>-_\\/[]{}—=+*^?#_";

export default function TextScramble({
  text,
  className = "",
  delay = 0,
}: TextScrambleProps) {
  const [displayChar, setDisplayChar] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || animatedRef.current) return;
    animatedRef.current = true;

    let iteration = 0;
    const endIteration = text.length;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayChar(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= endIteration) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className={className}>
      {displayChar}
    </span>
  );
}
