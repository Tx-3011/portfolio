"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transition, type: "spring" as const, stiffness: 80, damping: 12 },
  },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen w-full flex items-center relative overflow-hidden bg-mesh pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      {/* Editorial code grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-[#494454]/40" />
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-[#494454]/40 hidden md:block" />
        <div className="absolute top-[25%] left-0 right-0 h-px bg-[#494454]/40" />
        <div className="absolute top-[65%] left-0 right-0 h-px bg-[#494454]/40" />
      </div>

      {/* Massive section number background */}
      <div className="absolute right-[5%] bottom-[-5%] font-sans font-extrabold text-[22vw] text-white/[0.02] leading-none pointer-events-none select-none">
        01
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-6 text-left relative z-10 w-full"
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="text-[#d0bcff] text-[12px] font-mono uppercase tracking-widest mb-6 border-l-2 border-[#8B5CF6] pl-3"
        >
          FOURTH YEAR BTECH CSE
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-sans font-extrabold uppercase text-white leading-none mb-6 tracking-tighter"
          style={{
            fontSize: "clamp(2rem, 7.5vw, 6.5rem)",
          }}
        >
          <span className="text-glow-violet block text-white/95">
            <TextScramble text="NOOKALA TEJDEEP" delay={0.2} />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-white/90 font-sans font-bold text-[18px] md:text-[22px] mb-4 uppercase tracking-tight"
        >
          Developer. Problem Solver. Tech Enthusiast.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-white/60 font-mono text-[14px] md:text-[15px] max-w-xl leading-relaxed mb-10"
        >
          I build software that makes a difference. From crafting sleek frontends to
          architecting robust backends, I turn complex problems into elegant solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
        >
          <MagneticButton
            href="#contact"
            className="w-full sm:w-auto bg-[#8B5CF6] text-black font-mono font-bold uppercase tracking-widest text-xs px-6 py-3.5 hover:bg-[#A78BFA] transition-colors duration-150"
          >
            Get in Touch
          </MagneticButton>
          <MagneticButton
            href="#projects"
            className="w-full sm:w-auto bg-transparent text-[#d0bcff] font-mono font-bold uppercase tracking-widest text-xs px-6 py-3.5 border border-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-black transition-all duration-150"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            href="/Tejdeep_SE_Resume.pdf"
            download
            className="w-full sm:w-auto bg-transparent text-white/60 font-mono font-bold uppercase tracking-widest text-xs px-6 py-3.5 border border-[#494454]/60 hover:border-[#d0bcff] hover:text-[#d0bcff] transition-all duration-150 flex items-center justify-center gap-2"
          >
            <Download size={14} />
            Resume
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4"
        >
          <a
            href="https://github.com/Tx-3011"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 border border-[#494454]/40 text-white/40 hover:text-[#d0bcff] hover:border-[#d0bcff]/40 transition-all duration-150"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/tejdeepn"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 border border-[#494454]/40 text-white/40 hover:text-[#d0bcff] hover:border-[#d0bcff]/40 transition-all duration-150"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator rotated along the edge */}
      <div className="absolute right-[3%] top-[45%] -translate-y-1/2 rotate-90 origin-right font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 hidden md:flex items-center gap-4 select-none">
        <span>SCROLL DOWN</span>
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="w-8 h-px bg-white/30"
        />
      </div>
    </section>
  );
}

