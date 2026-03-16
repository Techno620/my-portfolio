import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero.tsx';
import About from './components/About';
import Projects from './components/Projects';
import CodingStats from './components/CodingStats';
import Resume from './components/Resume';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundSystem from './components/common/BackgroundSystem';
import SectionDivider from './components/common/SectionDivider';
import SkillsSystemArchitecture from './components/SkillsSystemArchitecture';
import { fadeInUp } from './utils/animations';

const SectionWrapper = ({ children, id }) => (
  <motion.div
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    variants={fadeInUp}
  >
    {children}
  </motion.div>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'stats', 'resume', 'contact', 'certifications', 'achievements'];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundSystem />

      <div className="relative z-10">
        <Navbar scrollTo={scrollTo} activeSection={activeSection} />

        <main>
          <SectionWrapper id="home">
            <Hero scrollTo={scrollTo} />
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="about">
            <About />
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="skills">
            <SkillsSystemArchitecture />
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="projects">
            <Projects />
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="stats">
            <CodingStats />
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="resume">
            <Resume />
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="certifications">
            <Certifications />
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="achievements">
            <Achievements />
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="contact">
            <Contact />
          </SectionWrapper>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default App;
