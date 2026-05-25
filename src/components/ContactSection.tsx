"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";
import useIsTouchDevice from "../hooks/useIsTouchDevice";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ...transition, type: "spring" as const, stiffness: 80 } },
};

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const isTouch = useIsTouchDevice();

  // Defer rendering of form inputs to avoid extension hydration conflicts, fixed ESLint warning via requestAnimationFrame
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("message", formData.message);

      const response = await fetch("https://formspree.io/f/xdajdzyo", {
        method: "POST",
        body: form,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen w-full flex items-center justify-center relative bg-[#121415] py-24"
    >
      {/* Massive section number background */}
      <div className="absolute right-[5%] top-[-5%] font-sans font-extrabold text-[22vw] text-white/[0.02] leading-none pointer-events-none select-none">
        07
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
            Contact
          </p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase text-white tracking-tight">
            <TextScramble text="LET'S CONNECT" delay={0.15} />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...transition, delay: 0.1 }}
            className="space-y-8"
          >
            <p className="text-white/60 font-mono text-[14px] md:text-[15px] leading-relaxed">
              Whether you want to collaborate on a project, discuss tech, or just say hi — I&apos;d love to hear from you! Drop me a message and I will get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <a href="mailto:iamtejdeepn@gmail.com" className="flex items-center gap-4 group">
                <div className="p-3 bg-[#1a1c1d] border border-[#494454]/40 group-hover:border-[#d0bcff]/40 transition-colors">
                  <Mail className="w-5 h-5 text-[#d0bcff]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Email</p>
                  <p className="text-white font-mono text-[14px] group-hover:text-[#d0bcff] transition-colors">iamtejdeepn@gmail.com</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#1a1c1d] border border-[#494454]/40">
                  <Phone className="w-5 h-5 text-[#d0bcff]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Phone</p>
                  <p className="text-white font-mono text-[14px]">+91-9752520066</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#1a1c1d] border border-[#494454]/40">
                  <MapPin className="w-5 h-5 text-[#d0bcff]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Location</p>
                  <p className="text-white font-mono text-[14px]">Bangalore, India</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap gap-3">
              <MagneticButton
                href="https://github.com/Tx-3011"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#1a1c1d] border border-[#494454]/40 text-white/50 hover:text-[#d0bcff] hover:border-[#d0bcff]/40 transition-colors duration-150"
              >
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  GitHub
                </span>
              </MagneticButton>
              <MagneticButton
                href="https://linkedin.com/in/tejdeepn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#1a1c1d] border border-[#494454]/40 text-white/50 hover:text-[#d0bcff] hover:border-[#d0bcff]/40 transition-colors duration-150"
              >
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </span>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Contact Form */}
          {mounted ? (
            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="contact-name"
                  className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-0 py-3.5 bg-transparent border-b border-[#494454]/40 text-white placeholder-white/20 focus:outline-none focus:border-[#d0bcff] transition-colors duration-150 font-mono text-[14px] rounded-none focus:ring-0"
                  placeholder="Your name"
                  required
                  disabled={status === "sending"}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="contact-email"
                  className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-0 py-3.5 bg-transparent border-b border-[#494454]/40 text-white placeholder-white/20 focus:outline-none focus:border-[#d0bcff] transition-colors duration-150 font-mono text-[14px] rounded-none focus:ring-0"
                  placeholder="your@email.com"
                  required
                  disabled={status === "sending"}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="contact-message"
                  className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-0 py-3.5 bg-transparent border-b border-[#494454]/40 text-white placeholder-white/20 focus:outline-none focus:border-[#d0bcff] transition-colors duration-150 font-mono text-[14px] resize-none rounded-none focus:ring-0"
                  placeholder="Tell me something..."
                  required
                  disabled={status === "sending"}
                />
              </motion.div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[12px] uppercase tracking-wider"
                >
                  <CheckCircle size={16} />
                  Message sent successfully!
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-[12px] uppercase tracking-wider"
                >
                  <AlertCircle size={16} />
                  Error occurred. Please try again.
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="w-full">
                <MagneticButton
                  onClick={() => {}}
                  disabled={status === "sending"}
                  className="w-full py-4 px-6 bg-[#8B5CF6] text-black font-mono font-bold uppercase tracking-widest text-xs hover:bg-[#A78BFA] transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </MagneticButton>
              </motion.div>
            </motion.form>
          ) : (
            /* Server-rendered skeleton */
            <div className="space-y-8 w-full" aria-hidden="true">
              <div>
                <div className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
                  Name
                </div>
                <div className="w-full h-[46px] border-b border-[#494454]/40" />
              </div>
              <div>
                <div className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
                  Email
                </div>
                <div className="w-full h-[46px] border-b border-[#494454]/40" />
              </div>
              <div>
                <div className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
                  Message
                </div>
                <div className="w-full h-[114px] border-b border-[#494454]/40" />
              </div>
              <div className="w-full h-[46px] bg-[#8B5CF6] flex items-center justify-center">
                <span className="font-mono font-bold uppercase tracking-widest text-xs text-black flex items-center gap-2">
                  <Send size={16} />
                  Send Message
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-8 border-t border-[#494454]/40 flex flex-col sm:flex-row gap-4 items-center justify-between text-center sm:text-left"
        >
          <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Nookala Tejdeep. All rights reserved.
          </p>
          <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
            MIT BANGALORE
          </p>
        </motion.div>
      </div>
    </section>
  );
}

