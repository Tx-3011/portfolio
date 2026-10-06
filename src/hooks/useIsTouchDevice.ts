"use client";

import { useState, useEffect } from "react";

export default function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTouch = () => {
      const match = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
      setIsTouch(!match.matches);
    };

    checkTouch();

    const mediaQuery = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const handler = (e: MediaQueryListEvent) => {
      setIsTouch(!e.matches);
    };

    // Support older and newer listener APIs
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return isTouch;
}
