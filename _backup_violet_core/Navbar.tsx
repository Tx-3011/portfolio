"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
      { threshold: 0.35 }
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
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-[#494454]
      ${scrolled ? "bg-[#121415]/90 backdrop-blur-md" : "bg-[#121415]"}
      `}
      style={{ transition: "background-color 150ms cubic-bezier(0.19, 1, 0.22, 1)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#hero");
          }}
          className="font-sans text-xl font-bold tracking-tight text-[#e2e2e3] uppercase"
          style={{ fontFeatureSettings: "'tnum' on, 'zero' on" }}
        >
          <span className="text-[#d0bcff]">T</span>ejdeep
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
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
                className={`font-mono text-[12px] uppercase tracking-widest transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? "text-[#d0bcff]"
                    : "text-[#e2e2e3] hover:text-[#d0bcff]"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="h-px bg-[#d0bcff] mt-0.5"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#e2e2e3] p-2 rounded-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="md:hidden mt-4 p-4 rounded-none bg-[#1e2021]/90 backdrop-blur-xl border border-[#494454]"
        >
          <div className="flex flex-col gap-3">
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
                  className={`font-mono text-[12px] uppercase tracking-widest py-2 cursor-pointer border-b border-[#333536] last:border-b-0 transition-colors duration-150 ${
                    isActive
                      ? "text-[#d0bcff]"
                      : "text-[#e2e2e3] hover:text-[#d0bcff]"
                  }`}
                >
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 bg-[#d0bcff] mr-2" />
                  )}
                  {link.name}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
