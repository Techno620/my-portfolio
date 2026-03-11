import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";
import BackgroundEffects from "./BackgroundEffects";

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      // Check if env vars are present before sending
      if (!import.meta.env.VITE_EMAILJS_SERVICE_ID) {
        throw new Error("Email service not configured");
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email Error:", error);
      setStatus("Failed to send message. Please try again or email directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className={`relative py-20 px-4 transition-colors duration-300 overflow-hidden ${darkMode ? "bg-transparent text-slate-100" : "bg-slate-50 text-slate-800"
        }`}
    >
      <BackgroundEffects variant="contact" />

      <div className="relative max-w-4xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gradient-contact">Get In Touch</h2>
          <p className={`text-xl ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`glass-card rounded-[2.5rem] p-8 lg:p-14 relative overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.1)] ${darkMode ? "bg-white/5" : "bg-white/60 shadow-blue-200/50"}`}
        >
          {/* subtle interior glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="grid md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold">Contact Info</h3>
              <p className={`text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                Open for opportunities. Let's build something amazing together.
              </p>

              <div className="space-y-6">
                <a href="mailto:prince09372@gmail.com" className={`group flex items-center gap-6 p-5 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${darkMode ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]" : "border-slate-200 bg-white/60 hover:bg-white hover:border-orange-400 hover:shadow-orange-100"}`}>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 text-orange-400 group-hover:from-orange-500 group-hover:to-rose-500 group-hover:text-white transition-all duration-300 shadow-inner">
                    <Mail size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base text-slate-500 font-semibold mb-1">Email</span>
                    <span className="font-bold text-xl group-hover:text-orange-400 transition-colors">prince09372@gmail.com</span>
                  </div>
                </a>

                <a href="https://linkedin.com/in/prince093kumar" target="_blank" rel="noreferrer" className={`group flex items-center gap-6 p-5 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${darkMode ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]" : "border-slate-200 bg-white/60 hover:bg-white hover:border-blue-400 hover:shadow-blue-100"}`}>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:text-white transition-all duration-300 shadow-inner">
                    <Linkedin size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base text-slate-500 font-semibold mb-1">LinkedIn</span>
                    <span className="font-bold text-xl group-hover:text-blue-400 transition-colors">prince093kumar</span>
                  </div>
                </a>

                <a href="https://github.com/prince093kumar" target="_blank" rel="noreferrer" className={`group flex items-center gap-6 p-5 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${darkMode ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]" : "border-slate-200 bg-white/60 hover:bg-white hover:border-purple-400 hover:shadow-purple-100"}`}>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300 shadow-inner">
                    <Github size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base text-slate-500 font-semibold mb-1">GitHub</span>
                    <span className="font-bold text-xl group-hover:text-purple-400 transition-colors">prince093kumar</span>
                  </div>
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-center">
              <div className="group">
                <label className="block text-sm font-bold mb-2 ml-1 text-slate-500 group-focus-within:text-orange-400 transition-colors">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-4 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-400 transition-all duration-300 font-medium ${darkMode ? "bg-white/5 border-white/10 text-white" : "bg-white/50 border-slate-200 text-slate-900"
                    }`}
                  placeholder="Your Name"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold mb-2 ml-1 text-slate-500 group-focus-within:text-orange-400 transition-colors">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-4 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-400 transition-all duration-300 font-medium ${darkMode ? "bg-white/5 border-white/10 text-white" : "bg-white/50 border-slate-200 text-slate-900"
                    }`}
                  placeholder="your@email.com"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold mb-2 ml-1 text-slate-500 group-focus-within:text-orange-400 transition-colors">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full p-4 rounded-2xl border outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-400 transition-all duration-300 font-medium resize-none ${darkMode ? "bg-white/5 border-white/10 text-white" : "bg-white/50 border-slate-200 text-slate-900"
                    }`}
                  placeholder="How can I help you?"
                />
              </div>

              {status && (
                <p className={`text-sm ${status.includes("success") ? "text-green-500" : "text-red-500"}`}>
                  {status}
                </p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-rose-500 text-white font-bold neon-glow-orange transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
              >
                {loading ? "Sending..." : <>Send Message <Send size={18} className="animate-pulse" /></>}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
