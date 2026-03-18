import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Loader2, 
  Copy,
  Check
} from "lucide-react";
import MagneticButton from "./common/MagneticButton";

const ContactCard = ({ icon: Icon, title, value, href, delay, toneClass }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group relative"
    >
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:from-primary/35 group-hover:to-secondary/25 transition-all duration-300">
        <div
          className={`flex items-center gap-4 p-5 rounded-2xl border-2 border-white/10 backdrop-blur-md transition-all duration-300 bg-gradient-to-br ${toneClass}`}
        >
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/80 border-2 border-white/10 group-hover:border-white/20 group-hover:text-white transition-colors shadow-[0_0_30px_rgb(255_255_255_/_0.04)]">
            <Icon size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-slate-400 font-mono text-[10px] font-black uppercase tracking-[0.22em] mb-0.5">
              {title}
            </p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-heading font-semibold group-hover:text-white transition-colors block truncate"
            >
              {value}
            </a>
          </div>

          <button
            onClick={handleCopy}
            className="p-2.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all shrink-0 border-2 border-transparent hover:border-white/10"
            aria-label={`Copy ${title}`}
            title="Copy"
          >
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FloatingInput = ({ label, name, type = "text", value, onChange, required = true, isTextArea = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  const InputTag = isTextArea ? "textarea" : "input";

  return (
    <div className="relative group/input">
      <InputTag
        required={required}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={isTextArea ? 4 : undefined}
        className={`w-full px-6 py-4 bg-surface/20 border-2 rounded-2xl text-foreground outline-none transition-all duration-200 font-sans text-sm font-semibold backdrop-blur-md
          ${isFocused ? "border-primary bg-primary/5 shadow-[0_0_30px_rgb(34_211_238_/_0.12)]" : "border-white/10 hover:border-white/20"}
          ${isTextArea ? "resize-none min-h-[150px]" : ""}
        `}
      />
      <label
        className={`absolute left-6 transition-all duration-300 pointer-events-none font-mono tracking-widest
          ${(isFocused || hasValue)
            ? "-top-2.5 left-4 px-2 py-0.5 text-[10px] text-secondary bg-surface border-2 border-secondary/25 rounded-lg font-black"
            : "top-4 text-xs text-slate-500 font-black"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
};

const Particle = ({ delay }) => {
  const [randomX] = useState(() => Math.random() * 100 - 50);
  const [randomY] = useState(() => -100 - Math.random() * 100);
  const [randomDuration] = useState(() => 5 + Math.random() * 5);
  const [randomSize] = useState(() => 2 + Math.random() * 2);
  const [randomLeft] = useState(() => `${Math.random() * 100}%`);
  const [randomTop] = useState(() => `${Math.random() * 100}%`);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 0.4, 0],
        y: randomY,
        x: randomX
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      className="absolute bg-primary/20 rounded-full"
      style={{ 
        width: randomSize, 
        height: randomSize,
        left: randomLeft,
        top: randomTop
      }}
    />
  );
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "" , email: "", subject: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="section relative overflow-hidden bg-transparent">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
        <motion.div
          aria-hidden="true"
          className="absolute -top-[18%] -right-[14%] w-[46%] h-[46%] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.22), transparent 60%)" }}
          animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -bottom-[18%] -left-[14%] w-[46%] h-[46%] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(34,197,94,0.18), transparent 60%)" }}
          animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute top-[22%] left-[18%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(236,72,153,0.16), transparent 60%)" }}
          animate={{ y: [0, 12, 0], x: [0, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto mb-20 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-white/5 text-primary text-[10px] font-mono font-bold uppercase tracking-[0.3em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight"
          >
            Let's <span className="text-primary">Connect</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Have a project in mind or just want to say hi? I'm always open to new opportunities and collaborations.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-start max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <ContactCard 
              icon={Mail} 
              title="Email Address" 
              value="princekumar09372@gmail.com" 
              href="mailto:princekumar09372@gmail.com" 
              delay={0.2}
              toneClass="from-primary/10 via-surface/35 to-secondary/10"
            />
            <ContactCard 
              icon={Github} 
              title="GitHub Profile" 
              value="github.com/prince093kumar" 
              href="https://github.com/prince093kumar" 
              delay={0.3}
              toneClass="from-secondary/10 via-surface/35 to-primary/10"
            />
            <ContactCard 
              icon={Linkedin} 
              title="LinkedIn Network" 
              value="linkedin.com/in/prince093kumar" 
              href="https://linkedin.com/in/prince093kumar" 
              delay={0.4}
              toneClass="from-primary/10 via-surface/35 to-secondary/10"
            />
            <ContactCard 
              icon={MapPin} 
              title="Current Location" 
              value="Punjab, India" 
              href="#" 
              delay={0.5}
              toneClass="from-secondary/10 via-surface/35 to-primary/10"
            />
            
            <div className="pt-8 flex items-center gap-6">
               <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
               <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Available for Hire</div>
               <div className="h-[1px] flex-1 bg-gradient-to-l from-white/10 to-transparent" />
            </div>
          </div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="tech-card border-2 p-8 md:p-10 relative overflow-hidden bg-surface/30 backdrop-blur-xl self-start"
          >
            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-3xl bg-success/10 flex items-center justify-center text-success border border-success/20 mb-8 font-bold shadow-[0_0_40px_rgb(34_211_238_/_0.12)] relative">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground text-base max-w-sm">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                    <FloatingInput label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <FloatingInput label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
                  <FloatingInput label="Your Message" name="message" value={formData.message} onChange={handleChange} isTextArea />

                  <MagneticButton
                    disabled={formStatus === "loading"}
                    type="submit"
                    className="w-full py-5"
                  >
                    {formStatus === "loading" ? (
                      <div className="flex items-center gap-3">
                        <Loader2 size={18} className="animate-spin" />
                        <span>SENDING...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span>SEND MESSAGE</span>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Floating Background Particles in the Card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              {[...Array(5)].map((_, i) => (
                <Particle key={i} delay={i * 1.5} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
