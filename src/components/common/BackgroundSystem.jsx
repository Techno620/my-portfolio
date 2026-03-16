import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const BackgroundSystem = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background:
          "radial-gradient(800px circle at 18% 12%, rgba(99,102,241,0.18), transparent 55%), radial-gradient(700px circle at 86% 62%, rgba(236,72,153,0.14), transparent 60%), radial-gradient(900px circle at 50% 92%, rgba(34,197,94,0.10), transparent 60%), linear-gradient(180deg, #020617 0%, #030712 100%)",
      }}
    >
      {/* Layer 1: Subtle Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-grid opacity-10" />

      {/* Layer 1.5: Aurora bands */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.18] mix-blend-screen"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(99,102,241,0.0) 0%, rgba(99,102,241,0.18) 25%, rgba(236,72,153,0.16) 55%, rgba(34,197,94,0.12) 75%, rgba(99,102,241,0.0) 100%)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* Layer 2: Animated Depth Blobs (Specific Radial Gradients) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.15),transparent_70%)] blur-[60px]"
        />
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgb(236_72_153_/_0.12),transparent_70%)] blur-[50px]"
        />
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgb(34_197_94_/_0.08),transparent_70%)] blur-[80px]"
        />
      </div>

      {/* Layer 3: Particles (AI/Neural Network Vibe) */}
      {init && (
        <Particles
          id="global-tsparticles"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            particles: {
              color: { value: ["#ffffff", "#6366f1", "#ec4899", "#22c55e"] },
              move: {
                enable: true,
                speed: { min: 0.2, max: 0.9 },
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" },
              },
              number: {
                density: { enable: true, area: 800 },
                value: 170,
              },
              opacity: {
                value: { min: 0.15, max: 0.65 },
                animation: { enable: true, speed: 0.5, sync: false }
              },
              shape: { type: "circle" },
              size: { value: { min: 0.6, max: 2.6 } },
              twinkle: {
                particles: {
                  enable: true,
                  frequency: 0.05,
                  opacity: 1
                }
              },
              links: {
                enable: true,
                distance: 160,
                opacity: 0.06,
                width: 1,
                color: { value: "#6366f1" },
                triangles: { enable: false },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: ["grab"] },
                onClick: { enable: true, mode: ["push"] },
              },
              modes: {
                grab: { distance: 180, links: { opacity: 0.12 } },
                push: { quantity: 4 },
              },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* Layer 4: Cinematic Grain Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      />

      {/* Layer 5: Slow vignette */}
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: "radial-gradient(60% 60% at 50% 45%, transparent 0%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.65) 100%)" }} />
    </div>
  );
};

export default BackgroundSystem;
