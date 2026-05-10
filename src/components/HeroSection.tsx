"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Globe, MessageCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="h-screen w-full flex items-center justify-center relative snap-start overflow-hidden bg-[#050505]"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
      >
        <motion.p
          variants={itemVariants}
          className="text-cyan-400 text-sm md:text-base font-mono tracking-widest uppercase mb-4"
        >
          Third Year BTech CSE Student
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
        >
          Hi, I&apos;m <span className="text-glow-cyan">Nookala Tejdeep</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          A passionate software developer crafting elegant solutions through code.
          I build things that live on the internet, solve real-world problems, and
          continuously push the boundaries of what technology can do.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-cyan-400 text-[#050505] font-semibold rounded-full hover:bg-cyan-300 transition-colors"
          >
            Get in Touch
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors"
          >
            View Projects
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: Code2, href: "https://github.com/Tx-3011", label: "GitHub" },
            { icon: Globe, href: "https://linkedin.com/in/tejdeepn", label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label={label}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="text-gray-500 mx-auto" size={32} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
