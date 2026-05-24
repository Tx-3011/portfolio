"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const experiences = [
  {
    role: "Open Source Contributor",
    company: "Various Projects",
    location: "Remote",
    duration: "2024 – Present",
    description:
      "Active contributor to open-source projects with 50+ merged PRs. Focus on performance optimization, accessibility improvements, and documentation.",
    skills: ["TypeScript", "React", "Git", "CI/CD"],
  },
  {
    role: "Project Lead - PhishShield",
    company: "Academic Project",
    location: "Manipal Institute of Technology",
    duration: "2024",
    description:
      "Led the development of an AI-powered URL classification tool using Flask and Gemini LLM APIs. Engineered the data pipeline for lexical analysis.",
    skills: ["Python", "Flask", "LLM APIs", "REST APIs"],
  },
  {
    role: "Media Head",
    company: "Literature Society",
    location: "Manipal Institute of Technology",
    duration: "2023 – 2024",
    description:
      "Analyzed engagement metrics to lead content strategy, resulting in a 40% increase in reach. Managed social media presence and coordinated events.",
    skills: ["Content Strategy", "Analytics", "Leadership"],
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
  visible: { opacity: 1, y: 0, transition: { ...transition, type: "spring" as const, stiffness: 80 } },
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="experience"
      className="min-h-screen w-full flex items-center justify-center relative snap-start bg-[#121415]"
    >
      <div className="max-w-5xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transition}
          className="mb-10"
        >
          <p className="text-[#d0bcff] text-[13px] font-mono uppercase tracking-widest mb-2">
            Experience
          </p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase text-white tracking-tight">
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
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#494454]" />

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
                    className="w-3 h-3 bg-[#d0bcff] shadow-[0_0_10px_rgba(208,188,255,0.5)]"
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="flex-1 p-5 border border-[#494454] bg-[#1e2021] hover:border-[#d0bcff]/30 transition-colors duration-150"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#1a1c1d] border border-[#494454]">
                      <Briefcase size={18} className="text-[#d0bcff]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-sans font-bold uppercase text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <p className="text-[#d0bcff] text-sm font-mono uppercase tracking-widest">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/50 font-mono text-[13px] leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[12px] text-white/40 mb-3 font-mono uppercase tracking-widest">
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
                        className="px-2 py-0.5 text-[12px] font-mono uppercase tracking-widest bg-[#1a1c1d] border border-[#494454] text-white/50"
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
