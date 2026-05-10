"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: 92 },
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "Java", level: 82 },
      { name: "C", level: 78 },
      { name: "SQL (MySQL)", level: 85 },
    ],
  },
  {
    title: "Libraries & Frameworks",
    skills: [
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
      { name: "Scikit-Learn", level: 82 },
      { name: "Flask", level: 80 },
      { name: "React", level: 88 },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git/GitHub", level: 88 },
      { name: "Docker", level: 70 },
      { name: "Jupyter Notebooks", level: 90 },
      { name: "Linux", level: 82 },
      { name: "MongoDB", level: 78 },
    ],
  },
  {
    title: "Core CS & ML",
    skills: [
      { name: "Data Structures & Algorithms", level: 90 },
      { name: "OOP", level: 88 },
      { name: "REST APIs", level: 85 },
      { name: "Random Forest", level: 80 },
      { name: "EDA & Feature Engineering", level: 82 },
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
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="skills"
      className="h-screen w-full flex items-center justify-center relative snap-start bg-[#050505]"
    >
      <div className="max-w-6xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-2">
            Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Tech Stack</h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300 text-xs">{skill.name}</span>
                      <span className="text-gray-500 text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1.2,
                          ease: "easeOut",
                          delay: 0.3,
                        }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
