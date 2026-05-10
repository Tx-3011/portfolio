"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Send,
  Code2,
  Globe,
  Mail,
  MapPin,
  ArrowUp,
  Phone,
} from "lucide-react";

const socialLinks = [
  { icon: Code2, href: "https://github.com/Tx-3011", label: "GitHub", color: "hover:text-gray-300" },
  { icon: Globe, href: "https://linkedin.com/in/tejdeepn", label: "LinkedIn", color: "hover:text-blue-400" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
};

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (This is a demo)");
    setFormData({ name: "", email: "", message: "" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="min-h-screen w-full flex items-center justify-center relative snap-start bg-[#050505] py-12"
    >
      <div className="max-w-6xl mx-auto px-6 w-full" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-2">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
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
              className="text-gray-400 leading-relaxed"
            >
              Whether you want to collaborate on a project, discuss tech, or just
              say hi — I&apos;d love to hear from you! Drop me a message and I will
              get back to you as soon as possible.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="p-3 rounded-xl bg-white/5">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">tejdeepn@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="p-3 rounded-xl bg-white/5">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">+91-9752520066</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="p-3 rounded-xl bg-white/5">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">Bangalore, India</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 ${color} transition-colors`}
                  aria-label={label}
                >
                  <Icon size={22} />
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
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                placeholder="Your name"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                placeholder="your@email.com"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                placeholder="Tell me something..."
                required
              />
            </motion.div>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-6 bg-cyan-400 text-[#050505] font-semibold rounded-xl hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Send Message
            </motion.button>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between"
        >
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Nookala Tejdeep. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
