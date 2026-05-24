"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Coffee, Gamepad2, Music } from "lucide-react";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative snap-start bg-[#121415]"
    >
      <div className="max-w-6xl mx-auto px-6 w-full" ref={ref}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transition}
          className="text-[#d0bcff] text-[13px] font-mono uppercase tracking-widest mb-2"
        >
          About Me
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Wireframe Profile Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...transition, delay: 0.1 }}
            className="relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto border border-[#494454] bg-[#1e2021] flex items-center justify-center">
              <span className="font-sans text-7xl font-extrabold text-[#333536] select-none uppercase tracking-tighter">T</span>
              {/* Decorative wireframe border */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#d0bcff]" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#d0bcff]" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.1 }}
              className="font-sans font-extrabold text-4xl md:text-5xl uppercase text-white mb-6 tracking-tight"
            >
              The Story So Far
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.2 }}
              className="text-white/60 font-mono text-[16px] leading-relaxed mb-6"
            >
              I&apos;m Nookala Tejdeep, a 3rd year BTech Computer Science &amp; Engineering student
              at Manipal Institute of Technology, Bangalore. I have a burning passion for building
              software that makes a difference — from crafting sleek frontends to architecting
              robust backends, I thrive on turning complex problems into elegant solutions.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.3 }}
              className="text-white/60 font-mono text-[16px] leading-relaxed mb-8"
            >
              My expertise spans Python (Pandas, NumPy, Scikit-Learn), Java, C, SQL, and
              JavaScript. I&apos;m proficient with Git/GitHub, Docker, Jupyter, Linux, Flask,
              React, and MongoDB.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...transition, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: Code, label: "Lines of Code", value: "50K+" },
                { icon: Coffee, label: "Cups of Coffee", value: "999+" },
                { icon: Gamepad2, label: "Hackathons", value: "5+" },
                { icon: Music, label: "Open Source PRs", value: "50+" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="p-4 border border-[#494454] bg-[#1e2021] text-center"
                >
                  <Icon className="w-6 h-6 text-[#d0bcff] mx-auto mb-2" />
                  <p className="text-xl font-sans font-extrabold text-white tracking-tight">{value}</p>
                  <p className="text-[13px] font-mono text-white/40 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
