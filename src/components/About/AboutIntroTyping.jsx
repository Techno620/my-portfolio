import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const AboutIntroTyping = () => {
  const [done, setDone] = useState(false);

  const introLine = useMemo(
    () =>
      "I am a Full Stack Web Developer passionate about building scalable web applications and solving real‑world problems through technology.",
    []
  );

  return (
    <div className="relative space-y-5">
      {/* Typed intro line */}
      <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed font-medium">
        {done ? (
          <span>{introLine}</span>
        ) : (
          <TypeAnimation
            sequence={[
              introLine,
              300,
              () => {
                setDone(true);
              },
            ]}
            speed={75}
            repeat={0}
            cursor={true}
            wrapper="span"
          />
        )}
      </p>

      {/* Rest of the content appears after typing finishes */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-5 text-[16px] md:text-[17px] text-muted-foreground leading-relaxed font-medium"
      >
        <p>
          I specialize in the{" "}
          <span className="text-white font-black">MERN stack</span> and enjoy designing{" "}
          <span className="text-secondary font-black">efficient backend systems</span>,{" "}
          <span className="text-secondary font-black">responsive user interfaces</span>, and{" "}
          <span className="text-white font-black">reliable full‑stack architectures</span> that feel fast and intuitive.
        </p>

        <p>
          My work focuses on building modern applications with{" "}
          <span className="text-secondary font-black">React.js</span>,{" "}
          <span className="text-secondary font-black">Node.js</span>,{" "}
          <span className="text-white font-black">Express.js</span>, and{" "}
          <span className="text-secondary font-black">MongoDB</span>, while also working with relational databases like{" "}
          <span className="text-white font-black">MySQL</span> and{" "}
          <span className="text-white font-black">PostgreSQL</span>. I build secure{" "}
          <span className="text-secondary font-black">REST APIs</span> with authentication using{" "}
          <span className="text-secondary font-black">JWT</span> and lean on{" "}
          <span className="text-secondary font-black">Docker</span>,{" "}
          <span className="text-white font-black">Git</span>, and{" "}
          <span className="text-white font-black">Linux</span> to ship production‑ready systems.
        </p>

        <p>
          Through projects like a{" "}
          <span className="text-secondary font-black">Recipe Generator</span> platform, a{" "}
          <span className="text-secondary font-black">Smart Agriculture</span> diagnostic system, and a{" "}
          <span className="text-secondary font-black">consultant documentation</span> portal, I’ve gained hands‑on
          experience in{" "}
          <span className="text-white font-black">backend engineering</span>,{" "}
          <span className="text-white font-black">API architecture</span>, and{" "}
          <span className="text-white font-black">database optimization</span>.
        </p>

        <p>
          I’m currently focused on{" "}
          <span className="text-white font-black">scalable system design</span>,{" "}
          <span className="text-secondary font-black">cloud‑native architectures</span>, and shipping products that feel
          as good to maintain as they are to use.
        </p>
      </motion.div>
    </div>
  );
};

export default AboutIntroTyping;
