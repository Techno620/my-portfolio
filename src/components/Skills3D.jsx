import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

const SKILL_GROUPS = [
  { id: "mern", title: "MERN", color: "#6366F1", skills: ["MongoDB", "Express.js", "React", "Node.js"] },
  { id: "php", title: "PHP", color: "#A855F7", skills: ["PHP 8+", "REST APIs", "Auth", "OOP"] },
  { id: "laravel", title: "Laravel", color: "#EF4444", skills: ["Eloquent", "Queues", "Blade", "API Resources"] },
  { id: "database", title: "Database", color: "#22C55E", skills: ["MySQL", "PostgreSQL", "MongoDB", "Indexes"] },
  { id: "devops", title: "DevOps", color: "#38BDF8", skills: ["Docker", "AWS", "CI/CD", "Linux", "Git"] },
];

const SkillNode = ({ group, position }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.6;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.scale.setScalar(hovered ? 1.12 : 1);
  });

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(group.color),
      roughness: 0.15,
      metalness: 0.35,
      emissive: new THREE.Color(group.color),
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.9,
    });
    return mat;
  }, [group.color]);

  return (
    <group position={position}>
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.2}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[0.55, 1]} />
          <primitive object={material} attach="material" />
        </mesh>

        <Html distanceFactor={12} zIndexRange={[100, 0]} center>
          <div className="pointer-events-none select-none">
            <div
              className="px-4 py-2 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl"
              style={{ boxShadow: `0 0 24px ${group.color}25` }}
            >
              <p className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-white/90">
                {group.title}
              </p>
            </div>

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="mt-3 w-56 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl p-4"
                  style={{ boxShadow: `0 0 32px ${group.color}20` }}
                >
                  <p className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-white mb-3">
                    {group.title} Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Html>
      </Float>
    </group>
  );
};

const SkillsScene = () => {
  const groupRef = useRef(null);

  const nodes = useMemo(() => {
    const radius = 3.2;
    return SKILL_GROUPS.map((group, index) => {
      const angle = (index / SKILL_GROUPS.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * 0.6;
      return { group, position: [x, y, z] };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.18;
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[8, 8, 8]} intensity={1.25} />
      <pointLight position={[-8, -4, -6]} intensity={0.6} />

      <Stars radius={80} depth={40} count={1200} factor={3} fade speed={0.5} />

      <group ref={groupRef}>
        {nodes.map((node) => (
          <SkillNode key={node.group.id} group={node.group} position={node.position} />
        ))}
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </>
  );
};

const Skills3D = () => {
  return (
    <section className="section relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-10">
          <div className="flex items-center gap-4 text-primary mb-6">
            <span className="w-12 h-px bg-primary/50" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.4em]">
              skills.render(3D)
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter mb-6">
            SKILLS <span className="text-gradient">STACK</span>
          </h2>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            Hover a node to expand each skill group. This section is fully data-driven.
          </p>
        </div>

        <div className="relative h-[520px] w-full rounded-[2.5rem] overflow-hidden border-2 border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0.6, 8.2], fov: 50 }}>
            <SkillsScene />
          </Canvas>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              className="tech-card p-7 bg-surface/30 backdrop-blur-xl"
              style={{ boxShadow: `0 0 34px ${group.color}12` }}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-heading font-black tracking-wide text-white">
                  {group.title}
                </p>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: group.color, boxShadow: `0 0 18px ${group.color}55` }}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills3D;

