"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import TiltCard from "./TiltCard";
import useIsTouchDevice from "../hooks/useIsTouchDevice";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const experiences = [
  {
    role: "Technical Analyst Intern",
    company: "Siemens",
    location: "Bangalore, India",
    duration: "Jun 2026 – Present",
    description:
      "Collaborating with engineering teams to analyze and optimize software workflows. Building automated data processing pipelines, performing database analysis, and assisting in the deployment of system monitoring dashboards.",
    skills: ["System Analysis", "Python", "SQL", "Data Engineering", "Enterprise Systems"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { ...transition, type: "spring" as const, stiffness: 80 } },
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const lineRef = useRef(null);
  const isLineInView = useInView(lineRef, { once: true });
  const isTouch = useIsTouchDevice();

  return (
    <section
      id="experience"
      className="min-h-screen w-full flex items-center justify-center relative bg-[#121415] py-24"
    >
      {/* Massive section number background */}
      <div className="absolute right-[5%] top-[-5%] font-sans font-extrabold text-[22vw] text-white/[0.02] leading-none pointer-events-none select-none">
        05
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
          {/* Vertical line that draws itself */}
          <div ref={lineRef} className="absolute left-[6px] md:left-1/2 top-0 bottom-0 w-px bg-[#494454]/40">
            <motion.div
              initial={{ height: "0%" }}
              animate={isLineInView ? { height: "100%" } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-[#8B5CF6] via-[#d0bcff] to-[#494454]/20"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                variants={itemVariants}
                className={`relative flex items-start gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot with pulse animation */}
                <div className="relative z-10 flex-shrink-0 mt-1.5 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="w-3.5 h-3.5 bg-[#d0bcff] border-2 border-[#121415] rounded-full relative z-20 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full" />
                  </div>
                  <div className="absolute inset-0 bg-[#d0bcff]/30 rounded-full animate-ping z-10" />
                </div>

                {/* Card with TiltCard wrapper */}
                <div className="flex-1 md:w-[calc(50%-2rem)]">
                  <TiltCard maxRotate={5} className="w-full">
                    <div className={`p-6 md:p-8 border bg-[#1e2021]/60 transition-colors duration-300 relative group ${
                      isTouch ? "border-[#8B5CF6]/30" : "border-[#494454]/40 hover:border-[#8B5CF6]/50"
                    }`}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-[#1a1c1d] border border-[#494454]/40 text-[#d0bcff] flex items-center justify-center">
                          {exp.company === "Siemens" ? (
                            <div className="w-5 h-5 relative flex items-center justify-center bg-white rounded-sm p-[2px]">
                              <Image src="/siemens-logo.png" alt="Siemens" fill className="object-contain" />
                            </div>
                          ) : (
                            <Briefcase size={20} />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-sans font-extrabold uppercase text-white tracking-tight leading-snug">
                            {exp.company}
                          </h3>
                          <p className="text-[#d0bcff] text-xs font-mono uppercase tracking-widest mt-1.5 font-semibold">
                            {exp.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-white/60 font-mono text-[13px] leading-relaxed mb-5">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/45 mb-4 font-mono uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          {exp.location}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-[#121415]/80 border transition-colors ${
                              isTouch ? "border-[#d0bcff]/20 text-[#d0bcff]" : "border-[#494454]/60 text-white/50 group-hover:border-[#d0bcff]/20"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </div>

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

