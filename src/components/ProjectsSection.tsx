"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GitBranch } from "lucide-react";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const projects = [
  {
    name: "PhishShield",
    description:
      "AI-Powered URL Classification Tool — Engineered a real-time URL detection system utilizing Flask and Gemini LLM APIs to identify phishing attempts. Implemented a data pipeline for lexical analysis, extracting features such as entropy and domain structure.",
    tags: ["Python", "Flask", "Google API", "Gemini"],
    github: "#",
    color: "#8B5CF6",
  },
  {
    name: "NIDS",
    description:
      "Network Intrusion Detection System — Analyzed 125,000+ network connection records to classify traffic as malicious or benign using Random Forest. Automated data cleaning and pre-processing workflows.",
    tags: ["Python", "Scikit-learn", "Random Forest"],
    github: "#",
    color: "#d0bcff",
  },
  {
    name: "LogVisualizer",
    description:
      "Real-time Server Log Analytics — Built a web-based dashboard to visualize server traffic patterns from uploaded log files. Implemented dynamic data visualizations using Chart.js to track HTTP status codes and response time latency.",
    tags: ["JavaScript", "React", "Node.js", "Chart.js"],
    github: "#",
    color: "#958ea0",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transition, type: "spring" as const, stiffness: 80, damping: 15 },
  },
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="min-h-screen w-full flex items-center justify-center relative snap-start bg-[#121415] py-20 md:py-0"
    >
      <div className="max-w-7xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transition}
          className="mb-10"
        >
          <p className="text-[#d0bcff] text-[13px] font-mono uppercase tracking-widest mb-2">
            Portfolio
          </p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase text-white tracking-tight">
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className="relative p-5 border border-[#494454] bg-[#1e2021] overflow-hidden group cursor-pointer transition-all duration-150"
              style={{ transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)" }}
            >
              {/* Glow border on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                style={{ transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)", boxShadow: `inset 0 0 0 1px ${project.color}` }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-sans font-bold uppercase text-white group-hover:text-[#d0bcff] transition-colors duration-150 tracking-tight">
                    {project.name}
                  </h3>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-[#1a1c1d] border border-[#494454] text-white/50 hover:text-[#d0bcff] transition-colors duration-150"
                    aria-label={`View ${project.name} on GitHub`}
                  >
                    <GitBranch size={18} />
                  </motion.a>
                </div>
                <p className="text-white/50 font-mono text-[13px] leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[12px] font-mono uppercase tracking-widest bg-[#1a1c1d] border border-[#494454] text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated bottom border */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#8B5CF6]"
                initial={{ width: "0%" }}
                animate={{
                  width: hovered === index ? "100%" : "0%",
                }}
                transition={{ duration: 0.15, ease: [0.19, 1, 0.22, 1] }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
