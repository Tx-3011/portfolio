"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, ArrowUp, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const transition = {
  duration: 0.15,
  ease: [0.19, 1, 0.22, 1] as const,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xdajdzyo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // Reset success message after 5 seconds
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
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
            Contact
          </p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl uppercase text-white tracking-tight">
            Let&apos;s Connect
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.p
              variants={itemVariants}
              className="text-white/60 font-mono text-[16px] leading-relaxed"
            >
              Whether you want to collaborate on a project, discuss tech, or just
              say hi — I&apos;d love to hear from you! Drop me a message and I will
              get back to you as soon as possible.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4">
              <a
                href="mailto:iamtejdeepn@gmail.com"
                className="flex items-center gap-4 text-white/70 hover:text-[#d0bcff] transition-colors duration-150 group"
              >
                <div className="p-3 bg-[#1a1c1d] border border-[#494454] group-hover:border-[#d0bcff]/30 transition-colors duration-150">
                  <Mail className="w-5 h-5 text-[#d0bcff]" />
                </div>
                <div>
                  <p className="text-[12px] font-mono text-white/40 uppercase tracking-widest">Email</p>
                  <p className="font-mono text-[13px]">iamtejdeepn@gmail.com</p>
                </div>
              </a>
              <div className="flex items-center gap-4 text-white/70">
                <div className="p-3 bg-[#1a1c1d] border border-[#494454]">
                  <Phone className="w-5 h-5 text-[#d0bcff]" />
                </div>
                <div>
                  <p className="text-[12px] font-mono text-white/40 uppercase tracking-widest">Phone</p>
                  <p className="font-mono text-[13px]">+91-9752520066</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="p-3 bg-[#1a1c1d] border border-[#494454]">
                  <MapPin className="w-5 h-5 text-[#d0bcff]" />
                </div>
                <div>
                  <p className="text-[12px] font-mono text-white/40 uppercase tracking-widest">Location</p>
                  <p className="font-mono text-[13px]">Bangalore, India</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4">
              {[
                { href: "https://github.com/Tx-3011", label: "GitHub" },
                { href: "https://linkedin.com/in/tejdeepn", label: "LinkedIn" },
              ].map(({ href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-[#1a1c1d] border border-[#494454] text-white/50 hover:text-[#d0bcff] hover:border-[#d0bcff]/30 transition-colors duration-150"
                >
                  <span className="font-mono text-[12px] uppercase tracking-widest">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label
                htmlFor="contact-name"
                className="block text-[12px] font-mono text-white/40 uppercase tracking-widest mb-2"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1c1d] border border-[#494454] text-white placeholder-white/30 focus:outline-none focus:border-[#d0bcff] transition-colors duration-150 font-mono text-[13px]"
                placeholder="Your name"
                required
                disabled={status === "sending"}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label
                htmlFor="contact-email"
                className="block text-[12px] font-mono text-white/40 uppercase tracking-widest mb-2"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#1a1c1d] border border-[#494454] text-white placeholder-white/30 focus:outline-none focus:border-[#d0bcff] transition-colors duration-150 font-mono text-[13px]"
                placeholder="your@email.com"
                required
                disabled={status === "sending"}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label
                htmlFor="contact-message"
                className="block text-[12px] font-mono text-white/40 uppercase tracking-widest mb-2"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-[#1a1c1d] border border-[#494454] text-white placeholder-white/30 focus:outline-none focus:border-[#d0bcff] transition-colors duration-150 font-mono text-[13px] resize-none"
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
                className="flex items-center gap-2 p-3 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[13px]"
              >
                <CheckCircle size={16} />
                Message sent successfully! I&apos;ll get back to you soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-[13px]"
              >
                <AlertCircle size={16} />
                Something went wrong. Please try again or email me directly.
              </motion.div>
            )}

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 px-6 bg-[#8B5CF6] text-black font-mono font-bold uppercase tracking-widest text-sm hover:bg-[#A78BFA] transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-[#494454] flex items-center justify-between"
        >
          <p className="text-[13px] font-mono text-white/30 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Nookala Tejdeep. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-[#1a1c1d] border border-[#494454] text-white/30 hover:text-[#d0bcff] hover:border-[#d0bcff]/30 transition-colors duration-150"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
