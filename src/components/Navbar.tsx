"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";
import ScrollProgress from "./ScrollProgress";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [time, setTime] = useState("");

  // Local time clock for a custom developer feel
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      };
      setTime(`${date.toLocaleTimeString("en-US", options)} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-10% 0px -70% 0px" }
    );

    navLinks.forEach((link) => {
      const sectionId = link.href.replace("#", "");
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ScrollProgress />
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-[#494454]/40 transition-colors duration-200
        ${scrolled ? "bg-[#121415]/85 backdrop-blur-md" : "bg-[#121415]"}
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#hero");
            }}
            className="font-sans text-lg font-bold tracking-tight text-[#e2e2e3] uppercase group"
          >
            <span className="text-[#d0bcff] group-hover:text-white transition-colors duration-150">T</span>ejdeep
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {/* Clock */}
            <div className="text-white/40 font-mono text-[11px] uppercase tracking-widest mr-6 border-r border-[#494454]/40 pr-6">
              {time || "00:00:00 IST"}
            </div>

            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <MagneticButton
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                  }}
                  className="px-2 py-1"
                >
                  <span
                    className={`font-mono text-[11px] uppercase tracking-widest transition-colors duration-150 relative ${
                      isActive ? "text-[#d0bcff]" : "text-[#e2e2e3]/70 hover:text-[#d0bcff]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavDot"
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#d0bcff] rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </span>
                </MagneticButton>
              );
            })}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-4">
            <div className="text-white/40 font-mono text-[11px] uppercase tracking-widest">
              {time.split(" ")[0] || "00:00:00"}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-[#e2e2e3] p-2 rounded-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mt-4 p-4 rounded-none bg-[#1e2021]/95 backdrop-blur-xl border border-[#494454]/40"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(link.href);
                    }}
                    className={`font-mono text-[12px] uppercase tracking-widest py-2.5 cursor-pointer border-b border-[#333536]/40 last:border-b-0 transition-colors duration-150 flex items-center ${
                      isActive ? "text-[#d0bcff]" : "text-[#e2e2e3] hover:text-[#d0bcff]"
                    }`}
                  >
                    {isActive && (
                      <span className="inline-block w-1.5 h-1.5 bg-[#d0bcff] mr-2 rounded-full" />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
