"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  download,
  target,
  rel,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 12 });
  const springY = useSpring(y, { stiffness: 100, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Pull effect towards cursor (max displacement ~15px)
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isLink = !!href;

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: `inline-flex items-center justify-center relative cursor-pointer ${className}`,
    whileTap: disabled ? undefined : { scale: 0.95 },
  };

  if (isLink) {
    return (
      <div ref={ref} className="inline-block">
        <motion.a
          href={href}
          download={download}
          target={target}
          rel={rel}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          {...motionProps}
        >
          {children}
        </motion.a>
      </div>
    );
  }

  return (
    <div ref={ref} className="inline-block">
      <motion.button
        type="button"
        disabled={disabled}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        {...motionProps}
      >
        {children}
      </motion.button>
    </div>
  );
}
