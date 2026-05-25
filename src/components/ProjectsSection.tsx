"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GitBranch, ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";
import useIsTouchDevice from "../hooks/useIsTouchDevice";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const projects = [
  {
    id: "01",
    name: "PhishShield",
    description:
      "AI-Powered URL Classification Tool — Engineered a real-time URL detection system utilizing Flask and Gemini LLM APIs to identify phishing attempts. Implemented a data pipeline for lexical analysis, extracting features such as entropy and domain structure.",
    tags: ["Python", "Flask", "Google API", "Gemini"],
    github: "https://github.com/Tx-3011",
    color: "rgba(139, 92, 246, 0.12)",
    borderColor: "#8B5CF6",
  },
  {
    id: "02",
    name: "NIDS",
    description:
      "Network Intrusion Detection System — Analyzed 125,000+ network connection records to classify traffic as malicious or benign using Random Forest. Automated data cleaning and pre-processing workflows.",
    tags: ["Python", "Scikit-learn", "Random Forest"],
    github: "https://github.com/Tx-3011",
    color: "rgba(208, 188, 255, 0.12)",
    borderColor: "#d0bcff",
  },
  {
    id: "03",
    name: "LogVisualizer",
    description:
      "Real-time Server Log Analytics — Built a web-based dashboard to visualize server traffic patterns from uploaded log files. Implemented dynamic data visualizations using Chart.js to track HTTP status codes and response time latency.",
    tags: ["JavaScript", "React", "Node.js", "Chart.js"],
    github: "https://github.com/Tx-3011",
    color: "rgba(149, 142, 160, 0.12)",
    borderColor: "#958ea0",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transition, type: "spring" as const, stiffness: 70, damping: 14 },
  },
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hovered, setHovered] = useState<number | null>(null);
  const isTouch = useIsTouchDevice();

  return (
    <section
      id="projects"
      className="min-h-screen w-full flex items-center justify-center relative bg-[#121415] py-24"
    >
      {/* Massive section number background */}
      <div className="absolute left-[5%] top-[-5%] font-sans font-extrabold text-[22vw] text-white/[0.02] leading-none pointer-events-none select-none">
        04
      </div>

      <div className="max-w-5xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transition}
          className="mb-14"
        >
          <p className="text-[#d0bcff] text-[12px] font-mono uppercase tracking-widest mb-2 border-l-2 border-[#8B5CF6] pl-3">
            Portfolio
          </p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase text-white tracking-tight">
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className="w-full"
            >
              <TiltCard maxRotate={4} className="w-full">
                <div
                  className={`p-5 md:p-10 border bg-[#1e2021]/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 md:gap-8 group relative overflow-hidden transition-all duration-300 ${
                    isTouch ? "border-[#8B5CF6]/30 shadow-lg" : "border-[#494454]/40"
                  }`}
                  style={{
                    boxShadow: !isTouch && hovered === index ? `0 20px 40px rgba(0, 0, 0, 0.4)` : "none",
                  }}
                >
                  {/* Subtle color wash background */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                      isTouch ? "opacity-35" : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${project.color} 0%, transparent 60%)`,
                    }}
                  />

                  {/* Top-Right Glowing Accent Border */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                      isTouch ? "opacity-45" : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      borderTop: `1px solid ${project.borderColor}`,
                      borderRight: `1px solid ${project.borderColor}`,
                    }}
                  />

                  {/* Left Column: Number & Info */}
                  <div className="flex-1 space-y-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-[#d0bcff] font-semibold border border-[#d0bcff]/40 px-2 py-0.5">
                        {project.id}
                      </span>
                      <h3 className={`text-xl md:text-2xl font-sans font-extrabold uppercase tracking-tight transition-colors duration-150 ${
                        isTouch ? "text-[#d0bcff]" : "text-white group-hover:text-[#d0bcff]"
                      }`}>
                        {project.name}
                      </h3>
                    </div>

                    <p className="text-white/60 font-mono text-[13px] md:text-[14px] leading-relaxed max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-[#121415]/80 border transition-colors ${
                            isTouch ? "border-[#d0bcff]/20 text-[#d0bcff]" : "border-[#494454]/60 text-white/55 group-hover:border-[#d0bcff]/30"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: GitHub Button Link */}
                  <div className="relative z-10 flex-shrink-0 w-full md:w-auto md:self-center">
                    <MagneticButton
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto p-4 bg-[#1a1c1d] border border-[#494454]/60 text-white/50 hover:text-[#d0bcff] hover:border-[#d0bcff] transition-all duration-200"
                    >
                      <span className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest px-2 font-semibold">
                        <GitBranch size={16} />
                        <span>Source Code</span>
                        <ArrowUpRight size={14} className="opacity-60" />
                      </span>
                    </MagneticButton>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

