"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TiltCard from "./TiltCard";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript (ES6+)", "Java", "C", "SQL (MySQL)"],
    gridClass: "lg:col-span-2 lg:row-span-1",
  },
  {
    title: "Libraries & Frameworks",
    skills: ["React", "Flask", "Pandas", "NumPy", "Scikit-Learn"],
    gridClass: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "Tools & Platforms",
    skills: ["Git/GitHub", "Docker", "Jupyter Notebooks", "Linux", "MongoDB"],
    gridClass: "lg:col-span-1 lg:row-span-1",
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
    gridClass: "lg:col-span-2 lg:row-span-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
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
      className="min-h-screen w-full flex items-center justify-center relative bg-[#121415] py-24"
    >
      {/* Massive section number background */}
      <div className="absolute right-[5%] top-[-5%] font-sans font-extrabold text-[22vw] text-white/[0.02] leading-none pointer-events-none select-none">
        03
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transition}
          className="mb-12"
        >
          <p className="text-[#d0bcff] text-[12px] font-mono uppercase tracking-widest mb-2 border-l-2 border-[#8B5CF6] pl-3">
            Skills
          </p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase text-white tracking-tight">
            Tech Stack
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className={`${category.gridClass} w-full`}
            >
              <TiltCard maxRotate={6} className="w-full h-full">
                <div className="p-6 md:p-8 border border-[#494454]/40 bg-[#1e2021]/60 flex flex-col justify-between group hover:border-[#8B5CF6]/50 transition-all duration-300 relative overflow-hidden w-full h-full">
                  {/* Decorative accent borders */}
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#494454]/60 group-hover:border-[#d0bcff] transition-colors" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#494454]/60 group-hover:border-[#d0bcff] transition-colors" />

                  <div className="w-full">
                    <h3 className="text-md font-sans font-bold text-white uppercase tracking-tight mb-6 border-b border-[#494454]/40 pb-3 group-hover:border-[#d0bcff]/40 transition-colors">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.04 }}
                          className="px-3.5 py-2 border border-[#494454]/60 hover:border-[#d0bcff] hover:bg-[#8B5CF6]/10 text-white/70 hover:text-[#d0bcff] font-mono text-[11px] uppercase tracking-wider bg-[#121415]/80 transition-all duration-200 cursor-default select-none"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
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

