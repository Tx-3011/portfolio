"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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
      className="min-h-screen w-full flex items-center justify-center relative snap-start overflow-hidden bg-[#121415]"
    >
      {/* Geometric / wireframe decorative background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Violet wireframe square */}
        <div
          className="absolute top-[15%] left-[10%] w-32 h-32 md:w-48 md:h-48 border border-[#494454] opacity-20"
          style={{ transform: "rotate(12deg)" }}
        />
        {/* Smaller wireframe square */}
        <div
          className="absolute bottom-[20%] right-[12%] w-24 h-24 md:w-36 md:h-36 border border-[#494454] opacity-15"
          style={{ transform: "rotate(-15deg)" }}
        />
        {/* Thin horizontal line */}
        <div className="absolute top-[40%] right-[5%] w-48 md:w-72 h-px bg-[#494454] opacity-25" />
        {/* Thin vertical line */}
        <div className="absolute left-[8%] bottom-[25%] h-32 md:h-48 w-px bg-[#494454] opacity-25" />
        {/* Small dot grid */}
        <div className="absolute top-[25%] right-[20%] w-2 h-2 bg-[#d0bcff] opacity-30" />
        <div className="absolute top-[35%] right-[22%] w-1.5 h-1.5 bg-[#8B5CF6] opacity-20" />
        <div className="absolute bottom-[35%] left-[18%] w-2 h-2 bg-[#d0bcff] opacity-25" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-6 text-center relative z-10"
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="text-[#d0bcff] text-[13px] font-mono uppercase tracking-widest mb-6"
        >
          THIRD YEAR BTECH CSE
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-sans font-extrabold uppercase text-white leading-none mb-6"
          style={{
            fontSize: "clamp(3rem, 10vw, 7.5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          <span className="text-glow-violet">NOOKALA TEJDEEP</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-white/80 font-mono text-[16px] mb-4"
        >
          Developer. Problem Solver. Tech Enthusiast.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-white/60 font-mono text-[16px] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I build software that makes a difference. From crafting sleek frontends to
          architecting robust backends, I turn complex problems into elegant solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="#contact"
            className="bg-[#8B5CF6] text-black font-mono font-bold uppercase tracking-widest text-sm px-6 py-3 border-none cursor-pointer hover:bg-[#A78BFA] transition-colors duration-150"
            style={{ transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
          </motion.a>
          <motion.a
            href="#projects"
            className="bg-transparent text-[#d0bcff] font-mono font-bold uppercase tracking-widest text-sm px-6 py-3 border border-[#8B5CF6] cursor-pointer hover:bg-[#8B5CF6] hover:text-black transition-all duration-150"
            style={{ transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="/Tejdeep_SE_Resume.pdf"
            download
            className="bg-transparent text-white/60 font-mono font-bold uppercase tracking-widest text-sm px-6 py-3 border border-[#494454] cursor-pointer hover:border-[#d0bcff] hover:text-[#d0bcff] transition-all duration-150 flex items-center gap-2"
            style={{ transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={16} />
            Resume
          </motion.a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mb-16"
        >
          {[
            { href: "https://github.com/Tx-3011", label: "GitHub" },
            { href: "https://linkedin.com/in/tejdeepn", label: "LinkedIn" },
          ].map(({ href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, color: "#d0bcff" }}
              whileTap={{ scale: 0.9 }}
              className="text-white/50 transition-colors duration-150"
              style={{ transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)" }}
              aria-label={label}
            >
              <span className="font-mono text-[13px] uppercase tracking-widest">{label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Bouncing arrow */}
        <motion.div variants={itemVariants}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="text-white/30 mx-auto" size={28} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
