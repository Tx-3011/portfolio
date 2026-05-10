"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Open Source Contributor",
    company: "Various Projects",
    location: "Remote",
    duration: "2024 – Present",
    description:
      "Active contributor to open-source projects with 50+ merged PRs. Focus on performance optimization, accessibility improvements, and documentation. Building tools that help developers work more efficiently.",
    skills: ["TypeScript", "React", "Git", "CI/CD"],
  },
  {
    role: "Project Lead - PhishShield",
    company: "Academic Project",
    location: "Manipal Institute of Technology",
    duration: "2024",
    description:
      "Led the development of an AI-powered URL classification tool using Flask and Gemini LLM APIs. Engineered the data pipeline for lexical analysis and integrated Google Safe Browsing for multi-layered security.",
    skills: ["Python", "Flask", "LLM APIs", "REST APIs"],
  },
  {
    role: "Media Head",
    company: "Literature Society",
    location: "Manipal Institute of Technology",
    duration: "2023 – 2024",
    description:
      "Analyzed engagement metrics to lead content strategy, resulting in a 40% increase in reach. Managed social media presence and coordinated events for the society.",
    skills: ["Content Strategy", "Analytics", "Leadership", "Event Management"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="experience"
      className="h-screen w-full flex items-center justify-center relative snap-start bg-[#050505]"
    >
      <div className="max-w-5xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-2">
            Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Work Journey
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/50 to-purple-500/50" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                variants={itemVariants}
                className={`relative flex items-start gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0 mt-1">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="flex-1 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/30 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-400/10">
                      <Briefcase size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-cyan-400 text-sm font-medium">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs rounded-md bg-white/10 text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
