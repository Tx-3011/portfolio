"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const education = [
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Manipal Institute of Technology, Bangalore",
    year: "2023 – 2027",
    grade: "CGPA: 8.64",
    description:
      "Currently in 4th year. Relevant Coursework: Data Structures & Algorithms (DSA), Database Management (SQL), Operating Systems, Probability and Statistics, Computer Networks.",
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
  visible: { opacity: 1, y: 0, transition: { ...transition, type: "spring" as const, stiffness: 90 } },
};

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="education"
      className="min-h-screen w-full flex items-center justify-center relative snap-start bg-[#121415] py-24 md:py-0"
    >
      <div className="max-w-4xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transition}
          className="mb-8"
        >
          <p className="text-[#d0bcff] text-[13px] font-mono uppercase tracking-widest mb-2">
            Education
          </p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase text-white tracking-tight">
            Academic Background
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8 mb-6"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.degree}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="flex gap-4 p-4 border border-[#494454] bg-[#1e2021] hover:border-[#d0bcff]/30 transition-colors duration-150"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="p-3 bg-[#1a1c1d] border border-[#494454]">
                  <GraduationCap className="w-6 h-6 text-[#d0bcff]" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-sans font-bold uppercase text-white tracking-tight mb-1">
                  {edu.degree}
                </h3>
                <p className="text-[#d0bcff] text-sm font-mono uppercase tracking-widest mb-2">
                  {edu.institution}
                </p>
                <p className="text-white/50 font-mono text-[13px] leading-relaxed mb-3">
                  {edu.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-[12px] text-white/40 font-mono uppercase tracking-widest">
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
          transition={{ ...transition, delay: 0.5 }}
          className="p-4 border border-[#494454] bg-[#1e2021]"
        >
          <h3 className="text-lg font-sans font-bold uppercase text-white tracking-tight mb-2">Certifications</h3>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2 text-[13px] font-mono text-white/50 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-[#d0bcff]" />
                {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
