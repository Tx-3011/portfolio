"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, GitBranch } from "lucide-react";

const projects = [
  {
    name: "PhishShield",
    description:
      "AI-Powered URL Classification Tool — Engineered a real-time URL detection system utilizing Flask and Gemini LLM APIs to identify phishing attempts. Implemented a data pipeline for lexical analysis, extracting features such as entropy and domain structure. Developed a RESTful API backend and integrated it with Google Safe Browsing for multi-layered security validation.",
    tags: ["Python", "Flask", "Google API", "Gemini"],
    github: "#",
    demo: "#",
    color: "from-cyan-400/20 to-blue-500/20",
  },
  {
    name: "NIDS",
    description:
      "Network Intrusion Detection System — Analyzed 125,000+ network connection records to classify traffic as malicious or benign using Random Forest. Automated data cleaning and pre-processing workflows including label encoding and feature scaling. Achieved high detection accuracy through hyperparameter tuning and performance evaluation using F1-scores.",
    tags: ["Python", "Scikit-learn", "Random Forest"],
    github: "#",
    demo: "#",
    color: "from-purple-400/20 to-pink-500/20",
  },
  {
    name: "LogVisualizer",
    description:
      "Real-time Server Log Analytics — Built a web-based dashboard to visualize server traffic patterns and error distributions from uploaded log files. Developed parsing logic to convert unstructured log data into structured JSON format for frontend rendering. Implemented dynamic data visualizations using Chart.js to track HTTP status codes and response time latency.",
    tags: ["JavaScript", "React", "Node.js", "Chart.js"],
    github: "#",
    demo: "#",
    color: "from-emerald-400/20 to-teal-500/20",
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
    transition: { type: "spring" as const, stiffness: 80, damping: 15 },
  },
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="h-screen w-full flex items-center justify-center relative snap-start both-section"
    >
      <div className="max-w-7xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-2">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
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
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden group cursor-pointer transition-all duration-300"
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex gap-2">
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      <GitBranch size={18} />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-gray-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated border */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: "0%" }}
                animate={{
                  width: hovered === index ? "100%" : "0%",
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
