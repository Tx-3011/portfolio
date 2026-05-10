"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Coffee, Gamepad2, Music } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      className="h-screen w-full flex items-center justify-center relative snap-start both-section"
    >
      <div className="max-w-6xl mx-auto px-6 w-full" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(0,229,255,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
              {/* Profile placeholder — swap with actual image */}
              <div className="w-full h-full flex items-center justify-center bg-[#0a0a0f]">
                <span className="text-6xl font-bold text-gray-700 select-none">T</span>
              </div>
            </div>
            {/* Decorative ring */}
            <motion.div
              animate={{ rotate: 359 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -inset-4 md:-inset-6 border border-dashed border-white/10 rounded-full"
            />
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-2"
            >
              About Me
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-4xl font-bold text-white mb-6"
            >
              The Story So Far
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 leading-relaxed mb-6"
            >
              I&apos;m Nookala Tejdeep, a 3rd year BTech Computer Science &amp; Engineering student
              at Manipal Institute of Technology, Bangalore. I have a burning passion for building 
              software that makes a difference — from crafting sleek frontends to architecting 
              robust backends, I thrive on turning complex problems into elegant solutions.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 leading-relaxed mb-8"
            >
              My expertise spans Python (Pandas, NumPy, Scikit-Learn), Java, C, SQL, and 
              JavaScript. I&apos;m proficient with Git/GitHub, Docker, Jupyter, Linux, Flask, 
              React, and MongoDB. When I&apos;m not coding, you&apos;ll find me exploring new tech stacks,
              contributing to open source, or diving deep into algorithms.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
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
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                >
                  <Icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
