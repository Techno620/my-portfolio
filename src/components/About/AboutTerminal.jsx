import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

const AboutTerminal = () => {
  const [done, setDone] = useState(false);

  const text = useMemo(() => {
    return [
      "prince.dev@portfolio:~$ cat about.txt",
      "",
      "I am a Full Stack Web Developer passionate about building scalable web applications and solving real-world problems through technology. I specialize in the MERN stack and enjoy designing efficient backend systems, responsive user interfaces, and reliable full-stack architectures that deliver smooth user experiences.",
      "",
      "My work focuses on developing modern web applications using React.js, Node.js, Express.js, and MongoDB, while also working with relational databases such as MySQL and PostgreSQL. I build secure REST APIs with authentication mechanisms like JWT and use tools such as Docker, Git, Linux, and cloud platforms to create production-ready systems.",
      "",
      "Through projects like a Recipe Generator platform, a Smart Agriculture diagnostic system, and a Consultant-based documentation portal, I have gained hands-on experience in backend engineering, API architecture, and database optimization.",
      "",
      "I aim to continue building high-performance applications while expanding my expertise in scalable system design and cloud technologies.",
      "",
      "prince.dev@portfolio:~$",
    ].join("\n");
  }, []);

  return (
    <div>
      <div className="rounded-[2rem] border-2 border-white/10 bg-black/25 backdrop-blur-xl overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <TerminalSquare size={18} className="text-primary" />
            <p className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-slate-300">
              Console
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
        </div>

        <div className="p-6 md:p-7">
          <motion.pre
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="whitespace-pre-wrap font-mono text-[12px] md:text-[13px] leading-relaxed text-slate-200"
          >
            <TypeAnimation
              sequence={[
                text,
                50,
                () => {
                  setDone(true);
                },
              ]}
              speed={85}
              cursor={!done}
              repeat={0}
              wrapper="span"
            />
          </motion.pre>

          {done && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {[
                { label: "MERN", cls: "border-primary/30 bg-primary/10 text-primary" },
                { label: "REST APIs", cls: "border-secondary/30 bg-secondary/10 text-secondary" },
                { label: "JWT", cls: "border-primary/30 bg-primary/10 text-primary" },
                { label: "MySQL", cls: "border-white/15 bg-white/5 text-white/80" },
                { label: "PostgreSQL", cls: "border-white/15 bg-white/5 text-white/80" },
                { label: "Docker", cls: "border-highlight/30 bg-highlight/10 text-highlight" },
                { label: "Git", cls: "border-white/15 bg-white/5 text-white/80" },
                { label: "Linux", cls: "border-white/15 bg-white/5 text-white/80" },
                { label: "Cloud", cls: "border-primary/20 bg-primary/10 text-primary" },
              ].map((b) => (
                <span
                  key={b.label}
                  className={`px-3 py-2 rounded-xl border text-[10px] font-mono font-black uppercase tracking-widest ${b.cls}`}
                >
                  {b.label}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutTerminal;

