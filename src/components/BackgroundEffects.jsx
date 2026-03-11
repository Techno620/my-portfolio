import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

// Refined deeply saturated fluid orb colors matching the Midnight palette
const ORB_COLORS = [
    'bg-blue-600/40',   // Deep Blue
    'bg-purple-600/40', // Deep Purple
    'bg-cyan-500/30',   // Cyan Highlight
    'bg-indigo-600/40', // Indigo
    'bg-fuchsia-600/30' // Magenta Highlight
];

const FluidOrb = ({ orb, mouseX, mouseY }) => {
    // Combine organic drift animation with mouse tracking
    const hoverX = useTransform(mouseX, v => {
        const offset = orb.reverse ? (50 - v) : (v - 50);
        return `${orb.initialX + (offset * orb.interactStrength)}%`;
    });

    const hoverY = useTransform(mouseY, v => {
        const offset = orb.reverse ? (50 - v) : (v - 50);
        return `${orb.initialY + (offset * orb.interactStrength)}%`;
    });

    return (
        <motion.div
            className={`absolute rounded-full mix-blend-screen blur-[120px] ${orb.colorClass}`}
            style={{
                width: orb.size,
                height: orb.size,
                left: hoverX,
                top: hoverY,
                x: '-50%', // strict centering to left/top coordinates
                y: '-50%'
            }}
            animate={{
                // Add sub-animation drift on top of mouse tracking
                x: ['-50%', `calc(-50% + ${orb.moveX}vw)`, '-50%'],
                y: ['-50%', `calc(-50% + ${orb.moveY}vh)`, '-50%'],
                scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
    );
};

const BackgroundEffects = ({ variant = 'default' }) => {
    const [orbs, setOrbs] = useState([]);
    const [stars, setStars] = useState([]);
    const containerRef = useRef(null);

    // Mouse tracking state via Framer Motion Springs for smooth follow
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        // Handle Mouse Move
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                // Get normalized mouse position relative to container (0 to 1)
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                // Update springs (using percentages 0-100)
                mouseX.set(x * 100);
                mouseY.set(y * 100);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Generate Orbs
        const numOrbs = variant === 'hero' ? 6 : 4;
        const generatedOrbs = Array.from({ length: numOrbs }).map((_, i) => {
            // Give each orb a distinct interactive behavior
            const interactStrength = Math.random() * 0.8 + 0.2; // How strongly it follows mouse
            return {
                id: `orb-${i}`,
                colorClass: ORB_COLORS[i % ORB_COLORS.length],
                size: Math.random() * 400 + 300, // Very large orbs
                initialX: Math.random() * 100, // Percentage
                initialY: Math.random() * 100, // Percentage
                duration: Math.random() * 20 + 20, // Slow organic drift
                delay: Math.random() * -20,
                moveX: (Math.random() - 0.5) * 40, // Drift radius
                moveY: (Math.random() - 0.5) * 40,
                interactStrength,
                reverse: Math.random() > 0.5 // Invert mouse tracking occasionally
            };
        });
        setOrbs(generatedOrbs);

        // Generate subtle floating stars/dust
        const numStars = variant === 'hero' || variant === 'contact' ? 40 : 20;
        setStars(Array.from({ length: numStars }).map((_, i) => ({
            id: `star-${i}`,
            size: Math.random() * 3 + 1,
            initialX: Math.random() * 100,
            initialY: Math.random() * 100,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * -20,
        })));

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [variant, mouseX, mouseY]);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-transparent">

            {/* Ambient Base Light (Follows Mouse Directly) */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] mix-blend-screen pointer-events-none"
                style={{
                    left: useTransform(mouseX, v => `calc(${v}% - 300px)`),
                    top: useTransform(mouseY, v => `calc(${v}% - 300px)`),
                }}
            />

            {/* Dynamic Interactive Fluid Orbs Layer */}
            {orbs.map((orb) => (
                <FluidOrb key={orb.id} orb={orb} mouseX={mouseX} mouseY={mouseY} />
            ))}

            {/* Floating Dust / Stars */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full bg-slate-200 dark:bg-sky-400 opacity-30 shadow-[0_0_8px_rgba(56,189,248,0.8)] mix-blend-screen"
                    style={{
                        width: star.size,
                        height: star.size,
                        left: `${star.initialX}%`,
                        top: `${star.initialY}%`,
                    }}
                    animate={{
                        y: [`0vh`, `-100vh`],
                        opacity: [0, 0.6, 0.8, 0],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{ duration: star.duration, repeat: Infinity, ease: "linear", delay: star.delay }}
                />
            ))}

            {/* Subtle Overlay to ensure readability */}
            <div className="absolute inset-0 bg-slate-50/50 dark:bg-[#030014]/40 pointer-events-none z-[1]"></div>
        </div>
    );
};

export default BackgroundEffects;
