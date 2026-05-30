"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";
import TiltCard from "./TiltCard";
import useIsTouchDevice from "../hooks/useIsTouchDevice";

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
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ...transition, type: "spring" as const, stiffness: 90 } },
};

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isTouch = useIsTouchDevice();

  return (
    <section
      id="education"
      className="min-h-screen w-full flex items-center justify-center relative bg-[#121415] py-24"
    >
      {/* Massive section number background */}
      <div className="absolute left-[5%] top-[2%] md:top-[-5%] font-sans font-extrabold text-[45vw] md:text-[22vw] text-white/[0.02] leading-none pointer-events-none select-none">
        06
      </div>

      <div className="max-w-4xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transition}
          className="mb-12"
        >
          <p className="text-[#d0bcff] text-[12px] font-mono uppercase tracking-widest mb-2 border-l-2 border-[#8B5CF6] pl-3">
            Education
          </p>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase text-white tracking-tight pr-2">
            Academic Background
          </h2>
        </motion.div>

        {/* Content Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {education.map((edu) => (
            <motion.div key={edu.degree} variants={itemVariants} className="w-full">
              <TiltCard maxRotate={4} className="w-full">
                <div className={`flex gap-5 p-6 md:p-8 border bg-[#1e2021]/60 transition-colors duration-300 relative group ${
                  isTouch ? "border-[#8B5CF6]/30" : "border-[#494454]/40 hover:border-[#8B5CF6]/50"
                }`}>
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-[#1a1c1d] border border-[#494454]/40 text-[#d0bcff]">
                      <GraduationCap className="w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-sans font-bold uppercase text-white tracking-tight pr-2 leading-snug break-words">
                      {edu.degree}
                    </h3>
                    <p className="text-[#d0bcff] text-xs font-mono uppercase tracking-widest mt-1 mb-3">
                      {edu.institution}
                    </p>
                    <p className="text-white/60 font-mono text-[13px] leading-relaxed mb-4">
                      {edu.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/45 font-mono uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {edu.year}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Award size={13} />
                        {edu.grade}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}

          {/* Certifications Card */}
          <motion.div variants={itemVariants} className="w-full">
            <TiltCard maxRotate={3} className="w-full">
              <div className={`p-6 md:p-8 border bg-[#1e2021]/60 transition-colors duration-300 ${
                isTouch ? "border-[#8B5CF6]/30" : "border-[#494454]/40 hover:border-[#8B5CF6]/50"
              }`}>
                <h3 className="text-md font-sans font-bold uppercase text-white tracking-tight mb-4 pb-2 border-b border-[#494454]/40">
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div
                      key={cert}
                      className="flex items-start gap-3 text-[12px] font-mono text-white/60 uppercase tracking-widest leading-relaxed break-words"
                    >
                      <div className="w-1.5 h-1.5 bg-[#d0bcff] rounded-full mt-1.5 flex-shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

