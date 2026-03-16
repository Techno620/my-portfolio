import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const AboutIntroTyping = () => {
  const [done, setDone] = useState(false);

  const plainText = useMemo(() => {
    return (
      "I am a Full Stack Web Developer passionate about building scalable web applications and solving real-world problems through technology. I specialize in the MERN stack and enjoy designing efficient backend systems, responsive user interfaces, and reliable full-stack architectures that deliver smooth user experiences.\n\n" +
      "My work focuses on developing modern web applications using React.js, Node.js, Express.js, and MongoDB, while also working with relational databases such as MySQL and PostgreSQL. I build secure REST APIs with authentication mechanisms like JWT and use tools such as Docker, Git, Linux, and cloud platforms to create production-ready systems.\n\n" +
      "Through projects like a Recipe Generator platform, a Smart Agriculture diagnostic system, and a Consultant-based documentation portal, I have gained hands-on experience in backend engineering, API architecture, and database optimization.\n\n" +
      "I aim to continue building high-performance applications while expanding my expertise in scalable system design and cloud technologies."
    );
  }, []);

  return (
    <div className="relative">
      {!done ? (
        <div className="rounded-2xl border-2 border-white/10 bg-black/10 backdrop-blur-xl p-6 md:p-7 relative">
          <button
            type="button"
            onClick={() => setDone(true)}
            className="absolute top-4 right-4 px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-[10px] font-mono font-black uppercase tracking-widest text-slate-300 hover:text-white hover:border-white/20 transition-all"
            aria-label="Skip typing animation"
            title="Skip"
          >
            Skip
          </button>
          <p className="whitespace-pre-wrap text-lg text-slate-200 leading-relaxed font-medium">
            <TypeAnimation
              sequence={[
                plainText,
                80,
                () => {
                  setDone(true);
                },
              ]}
              speed={60}
              deletionSpeed={70}
              repeat={0}
              cursor={true}
              wrapper="span"
            />
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="space-y-6 text-[17px] md:text-lg text-muted-foreground leading-relaxed font-medium"
        >
          <p>
            I am a <span className="text-white font-black">Full Stack Web Developer</span> passionate about building{" "}
            <span className="text-primary font-black">scalable web applications</span> and solving real-world problems through technology. I specialize in the{" "}
            <span className="text-white font-black">MERN stack</span> and enjoy designing{" "}
            <span className="text-secondary font-black">efficient backend systems</span>,{" "}
            <span className="text-highlight font-black">responsive user interfaces</span>, and reliable full-stack architectures that deliver smooth user experiences.
          </p>

          <p>
            My work focuses on developing modern web applications using{" "}
            <span className="text-primary font-black">React.js</span>,{" "}
            <span className="text-secondary font-black">Node.js</span>,{" "}
            <span className="text-white font-black">Express.js</span>, and{" "}
            <span className="text-secondary font-black">MongoDB</span>, while also working with relational databases such as{" "}
            <span className="text-white font-black">MySQL</span> and{" "}
            <span className="text-white font-black">PostgreSQL</span>. I build secure{" "}
            <span className="text-primary font-black">REST APIs</span> with authentication mechanisms like{" "}
            <span className="text-primary font-black">JWT</span> and use tools such as{" "}
            <span className="text-highlight font-black">Docker</span>,{" "}
            <span className="text-white font-black">Git</span>,{" "}
            <span className="text-white font-black">Linux</span>, and cloud platforms to create production-ready systems.
          </p>

          <p>
            Through projects like a{" "}
            <span className="text-primary font-black">Recipe Generator</span> platform, a{" "}
            <span className="text-secondary font-black">Smart Agriculture</span> diagnostic system, and a{" "}
            <span className="text-highlight font-black">Consultant-based</span> documentation portal, I have gained hands-on experience in backend engineering,{" "}
            <span className="text-white font-black">API architecture</span>, and{" "}
            <span className="text-white font-black">database optimization</span>.
          </p>

          <p>
            I aim to continue building high-performance applications while expanding my expertise in{" "}
            <span className="text-white font-black">scalable system design</span> and{" "}
            <span className="text-primary font-black">cloud technologies</span>.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AboutIntroTyping;
