"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Trophy, GitBranch } from "lucide-react";
import TiltCard from "./TiltCard";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-[#121415] py-24"
    >
      {/* Massive section number background */}
      <div className="absolute left-[5%] top-[2%] md:top-[-5%] font-sans font-extrabold text-[45vw] md:text-[22vw] text-white/[0.02] leading-none pointer-events-none select-none">
        02
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full" ref={ref}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transition}
          className="text-[#d0bcff] text-[12px] font-mono uppercase tracking-widest mb-2 border-l-2 border-[#8B5CF6] pl-3"
        >
          About Me
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Profile Visual wrapped in TiltCard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...transition, delay: 0.1 }}
            className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 mx-auto"
          >
            <TiltCard maxRotate={8} className="w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="w-full h-full border border-[#494454]/60 bg-[#1e2021] relative overflow-hidden group">
                <img
                  src="/profile.jpg"
                  alt="Nookala Tejdeep"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#8B5CF6]/5 mix-blend-color-burn pointer-events-none" />
              </div>
            </TiltCard>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.1 }}
              className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase text-white mb-6 tracking-tight pr-2"
            >
              The Story So Far
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.2 }}
              className="text-white/60 font-mono text-[14px] md:text-[15px] leading-relaxed mb-6"
            >
              I&apos;m Nookala Tejdeep, a 4th year BTech Computer Science &amp; Engineering student
              at Manipal Institute of Technology, Bangalore. I have a burning passion for building
              software that makes a difference — from crafting sleek frontends to architecting
              robust backends, I thrive on turning complex problems into elegant solutions.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.25 }}
              className="text-white/60 font-mono text-[14px] md:text-[15px] leading-relaxed mb-10"
            >
              My expertise spans Python (Pandas, NumPy, Scikit-Learn), Java, C, SQL, and
              JavaScript. I&apos;m proficient with Git/GitHub, Docker, Jupyter, Linux, Flask,
              React, and MongoDB.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 md:gap-4"
            >
              {[
                { icon: Code, label: "Years Coding", value: "3+" },
                { icon: Trophy, label: "Hackathons", value: "5+" },
                { icon: GitBranch, label: "Projects Built", value: "10+" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="p-3 md:p-4 border border-[#494454]/40 bg-[#1e2021]/60 text-center hover:border-[#d0bcff]/30 transition-colors duration-200"
                >
                  <Icon className="w-5 h-5 text-[#d0bcff] mx-auto mb-2" />
                  <p className="text-base sm:text-xl font-sans font-extrabold text-white tracking-tight">{value}</p>
                  <p className="text-[8px] sm:text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

