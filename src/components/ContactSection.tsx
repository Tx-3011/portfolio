"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import TextScramble from "./TextScramble";
import MagneticButton from "./MagneticButton";

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

        <div className="grid md:grid-cols-2 gap-16">
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
            <div className="flex gap-3">
              {[
                { href: "https://github.com/Tx-3011", label: "GitHub" },
                { href: "https://linkedin.com/in/tejdeepn", label: "LinkedIn" },
              ].map(({ href, label }) => (
                <MagneticButton
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1a1c1d] border border-[#494454]/40 text-white/50 hover:text-[#d0bcff] hover:border-[#d0bcff]/40 transition-colors duration-150"
                >
                  <span className="font-mono text-[11px] uppercase tracking-widest px-2">{label}</span>
                </MagneticButton>
              ))}
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
          className="mt-20 pt-8 border-t border-[#494454]/40 flex items-center justify-between"
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

