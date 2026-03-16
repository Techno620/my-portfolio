import React, { useState, useRef, useEffect } from "react";
import { Award, Calendar, Eye, X, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Certificate Images
import awsCert from "../assets/aws.png";
import cloudComputingCert from "../assets/Cloud Computing-NPTEL.png";
import computerCommunicationCert from "../assets/computer_communication.png";
import javascriptCert from "../assets/javascript.png";
import nodeCert from "../assets/node.png";
import genAICert from "../assets/gen-AI.png";
import mernCert from "../assets/MERN.png";

const Certifications = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const certifications = [
        {
            title: "Amazon Web Services (AWS)",
            issuer: "Infosys Springboard",
            date: "April 15, 2024",
            image: awsCert,
            description: "Fundamental knowledge of AWS Cloud services and infrastructure."
        },
        {
            title: "Cloud Computing",
            issuer: "NPTEL",
            date: "Jan-Feb 2025",
            image: cloudComputingCert,
            description: "Advanced concepts in cloud architecture and distributed computing."
        },
        {
            title: "Computer Communication",
            issuer: "Coursera",
            date: "Oct 25, 2024",
            image: computerCommunicationCert,
            description: "In-depth study of networking protocols and data communication."
        },
        {
            title: "JavaScript",
            issuer: "Coursera",
            date: "Feb 8, 2024",
            image: javascriptCert,
            description: "Advanced JavaScript programming and modern web development."
        },
        {
            title: "Backend Application Development",
            issuer: "Coursera / IBM",
            date: "May 21, 2024",
            image: nodeCert,
            description: "Building scalable backend services using Node.js and Express."
        },
        {
            title: "OCI 2025 Certified Generative AI Professional",
            issuer: "Oracle",
            date: "Sept 30, 2025",
            image: genAICert,
            description: "Expertise in OCI Generative AI models and implementation."
        },
        {
            title: "Summer Training in MERN",
            issuer: "CipherSchool",
            date: "Jun-Jul 2025",
            image: mernCert,
            description: "Full-stack development training focusing on the MERN stack."
        }
    ];

    // Triple the array for a truly seamless infinite loop experience
    const movingCerts = [...certifications, ...certifications, ...certifications];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId;
        const speed = 0.7; // Highly readable movement speed

        const step = () => {
            if (!isPaused) {
                scrollContainer.scrollLeft += speed;

                // Reset to middle section for infinite loop feel
                const maxScroll = scrollContainer.scrollWidth / 3;
                if (scrollContainer.scrollLeft >= maxScroll * 2) {
                    scrollContainer.scrollLeft = maxScroll;
                } else if (scrollContainer.scrollLeft <= 0) {
                    scrollContainer.scrollLeft = maxScroll;
                }
            }
            animationFrameId = requestAnimationFrame(step);
        };

        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = container.offsetWidth / 2; // Scroll by half frame
        container.scrollTo({
            left: container.scrollLeft + (direction === 'next' ? scrollAmount : -scrollAmount),
            behavior: 'smooth'
        });
    };

    return (
        <section className="section relative overflow-hidden bg-transparent py-16">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-grid opacity-30" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10 space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-border text-primary text-xs font-mono font-bold uppercase tracking-widest"
                  >
                    <Award size={14} /> Professional Validation
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-heading font-bold text-foreground"
                  >
                    Industry <span className="text-primary">Certifications</span>
                  </motion.h2>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "80px" }}
                    className="section-divider mx-auto"
                  />
                </div>

                {/* Carousel Wrapper */}
                <div 
                    className="relative group/carousel"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Navigation Buttons */}
                    <button 
                        onClick={() => scroll('prev')}
                        className="absolute -left-2 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 text-white border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-primary shadow-xl"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={() => scroll('next')}
                        className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 text-white border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-primary shadow-xl"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* The Scrolling Container */}
                    <div 
                        ref={scrollRef}
                        className="flex gap-4 py-6 overflow-x-auto scrollbar-hide"
                    >
                        {movingCerts.map((cert, i) => (
                            <div
                                key={i}
                                className="w-[280px] md:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)] shrink-0"
                            >
                                <div className="tech-card group/card h-full flex flex-col p-1">
                                    <div 
                                        className="relative h-60 md:h-64 overflow-hidden rounded-t-xl border-b border-border"
                                        onClick={() => setSelectedImage(cert)}
                                    >
                                        <img 
                                            src={cert.image} 
                                            alt={cert.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                                        />
                                        
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 bg-transparent/60 backdrop-blur-sm">
                                            <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center transform scale-50 group-hover/card:scale-100 transition-transform duration-300">
                                                <Eye size={24} />
                                            </div>
                                        </div>

                                        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                                            <CheckCircle2 size={10} className="text-primary" />
                                            Verified
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow space-y-4 bg-surface/30">
                                        <div className="space-y-2 flex-grow">
                                            <div className="flex items-center gap-2 text-primary font-mono font-bold text-[10px] uppercase tracking-widest">
                                                <Award size={12} />
                                                {cert.issuer}
                                            </div>
                                            <h3 className="text-lg font-heading font-bold text-foreground group-hover/card:text-primary transition-colors leading-tight line-clamp-2">
                                                {cert.title}
                                            </h3>
                                        </div>

                                        <div className="pt-4 border-t border-border flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-mono font-bold uppercase tracking-widest">
                                                <Calendar size={12} className="text-primary" />
                                                {cert.date}
                                            </div>
                                            <button 
                                                onClick={() => setSelectedImage(cert)}
                                                className="p-2 rounded-md bg-surface text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all border border-border"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-4 text-white/10 mt-6">
                        <span className="text-[9px] font-black uppercase tracking-[0.5em]">Infinite Flow • Hover to Pause • Arrows to Skip</span>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl w-full bg-transparent rounded-2xl overflow-hidden shadow-2xl border border-border"
                        >
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-surface text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors border border-border"
                            >
                                <X size={20} />
                            </button>
                            
                            <div className="grid md:grid-cols-5 h-full max-h-[85vh] overflow-y-auto">
                                <div className="md:col-span-3 bg-black flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-border">
                                    <img 
                                        src={selectedImage.image} 
                                        alt={selectedImage.title}
                                        className="w-full h-auto object-contain max-h-[70vh] rounded border border-white/10 shadow-[0_0_30px_rgb(56_189_248_/_0.1)]"
                                    />
                                </div>
                                <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center space-y-8">
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-border text-primary text-xs font-mono font-bold uppercase tracking-widest">
                                            <Award size={14} />
                                            {selectedImage.issuer}
                                        </div>
                                        <h2 className="text-3xl font-heading font-bold text-foreground leading-tight">
                                            {selectedImage.title}
                                        </h2>
                                        <div className="flex items-center gap-3 text-muted-foreground text-xs font-mono font-bold uppercase tracking-widest">
                                            <Calendar size={14} className="text-primary" />
                                            {selectedImage.date}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest">Description</h4>
                                        <p className="text-muted-foreground leading-relaxed text-sm">
                                            {selectedImage.description}
                                        </p>
                                    </div>

                                    <div className="pt-6 flex gap-3 border-t border-border/50">
                                        <div className="flex-1 p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center space-y-1">
                                            <CheckCircle2 size={20} className="text-primary mb-1" />
                                            <span className="text-foreground font-mono font-bold text-[10px] uppercase tracking-widest">Verified</span>
                                        </div>
                                        <div className="flex-1 p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center space-y-1">
                                            <Eye size={20} className="text-primary mb-1" />
                                            <span className="text-foreground font-mono font-bold text-[10px] uppercase tracking-widest">Authentic</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;
