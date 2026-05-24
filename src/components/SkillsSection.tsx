"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript (ES6+)", "Java", "C", "SQL (MySQL)"],
  },
  {
    title: "Libraries & Frameworks",
    skills: ["React", "Flask", "Pandas", "NumPy", "Scikit-Learn"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git/GitHub", "Docker", "Jupyter Notebooks", "Linux", "MongoDB"],
  },
  {
    title: "Core CS & ML",
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "REST APIs",
      "Random Forest",
      "EDA & Feature Engineering",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transition, type: "spring" as const, stiffness: 100 },
  },
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="skills"
      className="min-h-screen w-full flex items-center justify-center relative snap-start bg-[#121415]"
    >
      <div className="max-w-6xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transition}
          className="mb-10"
        >
          <p className="text-[#d0bcff] text-[13px] font-mono uppercase tracking-widest mb-2">
            Skills
          </p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase text-white tracking-tight">
            Tech Stack
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="p-6 border border-[#494454] bg-[#1e2021] flex flex-col justify-between group hover:border-[#8B5CF6]/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Corner accent lines */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#494454] group-hover:border-[#d0bcff] transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#494454] group-hover:border-[#d0bcff] transition-colors" />

              <div>
                <h3 className="text-lg font-sans font-bold text-white uppercase tracking-tight mb-5 border-b border-[#494454] pb-2 group-hover:border-[#d0bcff] transition-colors">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{
                        scale: 1.05,
                        borderColor: "#d0bcff",
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                      }}
                      className="px-3 py-1.5 border border-[#494454] text-white/80 font-mono text-[12px] tracking-wide bg-[#121415] hover:text-[#d0bcff] transition-all duration-200 cursor-default select-none"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
