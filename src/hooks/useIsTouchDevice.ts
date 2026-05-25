"use client";

import { useState, useEffect } from "react";

export default function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTouch = () => {
      const match = window.matchMedia("(hover: none)");
      setIsTouch(match.matches || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkTouch();

    const mediaQuery = window.matchMedia("(hover: none)");
    const handler = (e: MediaQueryListEvent) => {
      setIsTouch(e.matches || "ontouchstart" in window || navigator.maxTouchPoints > 0);
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
