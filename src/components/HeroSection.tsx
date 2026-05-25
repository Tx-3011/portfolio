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
      className="min-h-screen w-full flex items-center relative overflow-hidden bg-mesh pt-28 pb-16"
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
          className="flex flex-wrap items-center gap-4 mb-12"
        >
          <MagneticButton
            href="#contact"
            className="bg-[#8B5CF6] text-black font-mono font-bold uppercase tracking-widest text-xs px-6 py-3.5 hover:bg-[#A78BFA] transition-colors duration-150"
          >
            Get in Touch
          </MagneticButton>
          <MagneticButton
            href="#projects"
            className="bg-transparent text-[#d0bcff] font-mono font-bold uppercase tracking-widest text-xs px-6 py-3.5 border border-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-black transition-all duration-150"
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            href="/Tejdeep_SE_Resume.pdf"
            download
            className="bg-transparent text-white/60 font-mono font-bold uppercase tracking-widest text-xs px-6 py-3.5 border border-[#494454]/60 hover:border-[#d0bcff] hover:text-[#d0bcff] transition-all duration-150 flex items-center gap-2"
          >
            <Download size={14} />
            Resume
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-6"
        >
          {[
            { href: "https://github.com/Tx-3011", label: "GitHub" },
            { href: "https://linkedin.com/in/tejdeepn", label: "LinkedIn" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#d0bcff] transition-colors duration-150 font-mono text-[12px] uppercase tracking-widest flex items-center gap-1.5"
              aria-label={label}
            >
              <span>{label}</span>
              <span className="text-[10px] text-white/20">↗</span>
            </a>
          ))}
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

