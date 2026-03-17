import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero.tsx';
import BackgroundSystem from './components/common/BackgroundSystem';
import SectionDivider from './components/common/SectionDivider';
import { fadeInUp } from './utils/animations';

const About = lazy(() => import('./components/About'));
const SkillsSystemArchitecture = lazy(() => import('./components/SkillsSystemArchitecture'));
const Projects = lazy(() => import('./components/Projects'));
const CodingStats = lazy(() => import('./components/CodingStats'));
const Resume = lazy(() => import('./components/Resume'));
const Certifications = lazy(() => import('./components/Certifications'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

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

const SectionFallback = ({ height = 320 }) => (
  <div
    className="w-full rounded-2xl border border-white/5 bg-white/[0.02]"
    style={{ height }}
    aria-busy="true"
    aria-label="Loading section"
  />
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
            <Suspense fallback={<SectionFallback height={360} />}>
              <About />
            </Suspense>
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="skills">
            <Suspense fallback={<SectionFallback height={520} />}>
              <SkillsSystemArchitecture />
            </Suspense>
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="projects">
            <Suspense fallback={<SectionFallback height={520} />}>
              <Projects />
            </Suspense>
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="stats">
            <Suspense fallback={<SectionFallback height={420} />}>
              <CodingStats />
            </Suspense>
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="resume">
            <Suspense fallback={<SectionFallback height={520} />}>
              <Resume />
            </Suspense>
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="certifications">
            <Suspense fallback={<SectionFallback height={420} />}>
              <Certifications />
            </Suspense>
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="achievements">
            <Suspense fallback={<SectionFallback height={420} />}>
              <Achievements />
            </Suspense>
          </SectionWrapper>

          <SectionDivider />
          <SectionWrapper id="contact">
            <Suspense fallback={<SectionFallback height={520} />}>
              <Contact />
            </Suspense>
          </SectionWrapper>

          <Suspense fallback={<div className="h-24" />}>
            <Footer />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default App;
