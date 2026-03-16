import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Html, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { 
  FaReact, FaNodeJs, FaJava, FaDocker, FaAws, FaGitAlt, FaHtml5, FaCss3Alt 
} from "react-icons/fa";
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiPostgresql, SiPostman 
} from "react-icons/si";
import { DiJavascript1 } from "react-icons/di";
import { motion, AnimatePresence } from 'framer-motion';

const techStack = [
  // Frontend
  { name: 'React.js', icon: FaReact, color: '#61DAFB', layer: 1, role: 'Used for building scalable component-based user interfaces.' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', layer: 1, role: 'Framework for server-rendered React applications.' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', layer: 1, role: 'Typed superset of JavaScript for reliable code.' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38B2AC', layer: 1, role: 'Utility-first CSS framework for rapid UI development.' },
  
  // Backend
  { name: 'Node.js', icon: FaNodeJs, color: '#339933', layer: 2, role: 'Backend runtime powering REST APIs and server logic.' },
  { name: 'Express.js', icon: SiExpress, color: '#FFFFFF', layer: 2, role: 'Fast, unopinionated, minimalist web framework for Node.js.' },
  { name: 'PHP', icon: DiJavascript1, color: '#777BB4', layer: 2, role: 'Server-side scripting language for web development.' },
  
  // Database
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', layer: 3, role: 'NoSQL database used for flexible data models.' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1', layer: 3, role: 'Open-source relational database management system.' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', layer: 3, role: 'Advanced open-source relational database.' },

  // DevOps / Cloud
  { name: 'Docker', icon: FaDocker, color: '#2496ED', layer: 2, role: 'Containerized deployment for scalable infrastructure.' },
  { name: 'AWS', icon: FaAws, color: '#FF9900', layer: 3, role: 'Global cloud platform for scalable computing and storage.' },
];

const TechNode = ({ tech, position }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshBasicMaterial color={tech.color} transparent opacity={0} />
          
          <Html distanceFactor={10} zIndexRange={[100, 0]}>
            <motion.div
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: hovered ? 1.2 : 1, opacity: 1 }}
              className={`relative flex items-center justify-center p-3 rounded-full bg-black/40 backdrop-blur-md border transition-all duration-300 ${hovered ? 'border-primary shadow-[0_0_20px_rgb(34_211_238_/_0.5)] z-50' : 'border-white/10'}`}
              style={{ color: tech.color }}
            >
              <Icon size={24} />
              
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.8 }}
                    animate={{ opacity: 1, x: 20, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.8 }}
                    className="absolute left-full ml-4 w-48 p-4 bg-black/80 backdrop-blur-xl border border-primary/30 rounded-2xl pointer-events-none"
                  >
                    <p className="text-white font-black text-xs mb-1 uppercase tracking-widest">{tech.name}</p>
                    <p className="text-slate-400 text-[10px] leading-relaxed font-bold">{tech.role}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Html>
        </mesh>
      </Float>
      
      {/* Connection Line */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(-position[0], -position[1], -position[2])])} />
        <lineBasicMaterial attach="material" color={tech.color} transparent opacity={0.1} />
      </line>
    </group>
  );
};

const OrbitLayer = ({ layer, radius, speed }) => {
  const groupRef = useRef();
  const techs = useMemo(() => techStack.filter(t => t.layer === layer), [layer]);
  
  const nodes = useMemo(() => {
    return techs.map((tech, i) => {
      const angle = (i / techs.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2.3) * 0.8;
      return { tech, position: [x, y, z] };
    });
  }, [techs, radius]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <TechNode key={node.tech.name} tech={node.tech} position={node.position} />
      ))}
    </group>
  );
};

const TechOrbit = () => {
  return (
    <div className="w-full h-full min-h-[500px] relative">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Central Component */}
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1.2, 64, 64]}>
            <MeshDistortMaterial
              color="#06b6d4"
              speed={2}
              distort={0.4}
              radius={1}
              emissive="#06b6d4"
              emissiveIntensity={0.5}
            />
            <Html center>
              <div className="flex flex-col items-center pointer-events-none text-center">
                <div className="p-4 rounded-full bg-black/40 backdrop-blur-md border border-primary/50 shadow-[0_0_30px_rgb(6_182_212_/_0.3)]">
                  <span className="text-white font-black text-xs uppercase tracking-[0.3em]">System</span>
                  <br />
                  <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">Architecture</span>
                </div>
              </div>
            </Html>
          </Sphere>
        </Float>

        {/* Orbiting Layers */}
        <OrbitLayer layer={1} radius={4} speed={0.2} />
        <OrbitLayer layer={2} radius={6} speed={-0.15} />
        <OrbitLayer layer={3} radius={8} speed={0.1} />

        {/* Background Atmosphere */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <mesh>
          <sphereGeometry args={[15, 32, 32]} />
          <meshBasicMaterial side={THREE.BackSide} transparent opacity={0.05} />
        </mesh>
      </Canvas>
      
      {/* Decorative Grid Overlay (CSS) */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
    </div>
  );
};

export default TechOrbit;
