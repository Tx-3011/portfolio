"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Manipal Institute of Technology, Bangalore",
    year: "2023 – 2027",
    grade: "CGPA: Pursuing",
    description:
      "Currently in 3rd year. Relevant Coursework: Data Structures & Algorithms (DSA), Database Management (SQL), Operating Systems, Probability and Statistics, Computer Networks.",
  },
  {
    degree: "Senior Secondary (XII)",
    institution: "Higher Secondary School",
    year: "Completed",
    grade: "Science Stream",
    description:
      "Science stream with Computer Science. Developed a strong foundation in programming and problem-solving during this period.",
  },
  {
    degree: "Secondary (X)",
    institution: "Secondary School",
    year: "Completed",
    grade: "Mathematics & Science",
    description:
      "Consistent academic performer with keen interest in mathematics and science.",
  },
];

const certifications = [
  "Tools of the Trade: Linux and SQL — Google",
  "Foundations of Cybersecurity — Google",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90 } },
};

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="education"
      className="h-screen w-full flex items-center justify-center relative snap-start both-section"
    >
      <div className="max-w-4xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-2">
            Education
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Academic Background
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4 mb-6"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.degree}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors duration-300"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 rounded-xl bg-cyan-400/10">
                  <GraduationCap className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  {edu.degree}
                </h3>
                <p className="text-cyan-400 text-sm font-medium mb-2">
                  {edu.institution}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {edu.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {edu.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={12} />
                    {edu.grade}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-4 rounded-2xl bg-white/5 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Certifications</h3>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
