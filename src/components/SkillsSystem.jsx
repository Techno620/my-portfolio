import React, { useState } from 'react';
import { Server, Layout, Database, Terminal, Cpu, Code2 } from 'lucide-react';

const CATEGORIES = [
  { 
    id: 'frontend', 
    label: 'Frontend', 
    icon: Layout, 
    colorClass: 'text-cyan-400', 
    hex: '#22d3ee', 
    accent: 'cyan' 
  },
  { 
    id: 'backend', 
    label: 'Backend', 
    icon: Server, 
    colorClass: 'text-emerald-400', 
    hex: '#34d399', 
    accent: 'emerald' 
  },
  { 
    id: 'databases', 
    label: 'Databases', 
    icon: Database, 
    colorClass: 'text-orange-400', 
    hex: '#fb923c', 
    accent: 'orange' 
  },
  { 
    id: 'devops', 
    label: 'DevOps & Tools', 
    icon: Terminal, 
    colorClass: 'text-violet-400', 
    hex: '#a78bfa', 
    accent: 'violet' 
  }
];

const TECH_DATA = {
  frontend: ['React.js', 'Next.js', 'Tailwind', 'TypeScript', 'Framer Motion', 'Redux', 'HTML5', 'CSS3'],
  backend: ['Node.js', 'Express.js', 'Python', 'Java', 'GraphQL', 'REST API'],
  databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Supabase'],
  devops: ['Docker', 'AWS', 'GitHub', 'Linux', 'Vercel', 'Nginx', 'CI/CD']
};

const TECH_LOGOS = {
  'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
  'Vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
  'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg',
  'Supabase': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
  'Nginx': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg'
};

const nodePositions = {
  frontend: { x: -120, y: -100 },
  backend: { x: 120, y: -100 },
  databases: { x: -120, y: 120 },
  devops: { x: 120, y: 120 }
};

export default function SkillsSystem() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [displayCategory, setDisplayCategory] = useState(CATEGORIES[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCategoryClick = (category) => {
    if (category.id === activeCategory.id) return;
    
    setIsTransitioning(true);
    setActiveCategory(category);
    
    setTimeout(() => {
      setDisplayCategory(category);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="relative min-h-screen w-full bg-slate-950 overflow-hidden py-24 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Background Ambient Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full mix-blend-screen blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full mix-blend-screen blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* Left Column: Interactive Categories */}
        <div className="lg:w-1/3 flex flex-col space-y-12">
          {/* Section Title */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500">
              Skills System
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              An interactive visualization of my technical stack and core competencies.
            </p>
          </div>
          
          {/* Category List */}
          <div className="flex flex-col space-y-4">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory.id === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  className={`group relative flex items-center p-4 rounded-2xl transition-all duration-300 overflow-hidden text-left border
                    ${isActive 
                      ? `bg-slate-900/80` 
                      : 'bg-slate-900/30 border-slate-800/50 hover:bg-slate-900/50 hover:border-slate-700'}
                  `}
                  style={{
                    borderColor: isActive ? cat.hex : '',
                    boxShadow: isActive ? `0 0 20px -5px ${cat.hex}40` : 'none',
                  }}
                >
                  {/* Active background tint */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 opacity-10 pointer-events-none" 
                      style={{ backgroundColor: cat.hex }}
                    />
                  )}
                  
                  {/* Active left border indicator */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 rounded-l-2xl ${isActive ? 'h-full opacity-100' : 'h-0 opacity-0'}`}
                    style={{ backgroundColor: cat.hex }}
                  />
                  
                  <div className={`p-3 rounded-xl mr-5 transition-colors duration-300 ${isActive ? 'bg-slate-950/80' : 'bg-slate-800/50 group-hover:bg-slate-800'}`}>
                    <cat.icon 
                      className={`w-6 h-6 transition-all duration-300 ${isActive ? cat.colorClass + ' scale-110 drop-shadow-[0_0_8px_currentColor]' : 'text-slate-400 group-hover:text-slate-300'}`} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg transition-colors duration-300 tracking-wide ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-slate-200'}`}>
                      {cat.label}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                      {TECH_DATA[cat.id].length} technologies
                    </p>
                  </div>
                  
                  {isActive && (
                    <div className="absolute right-5 flex items-center justify-center">
                      <div className="absolute w-4 h-4 rounded-full animate-ping opacity-20" style={{ backgroundColor: cat.hex }} />
                      <div className="w-2 h-2 rounded-full pulse" style={{ backgroundColor: cat.hex, boxShadow: `0 0 10px ${cat.hex}` }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Right Column: Visualizer & Details */}
        <div className="lg:w-2/3 flex flex-col gap-8 h-full">
          
          {/* Top: Glassmorphic Node Map */}
          <div className="relative w-full h-[450px] bg-slate-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-800/50 flex items-center justify-center shadow-2xl">
            {/* CSS Grid Pattern Background */}
            <div className="absolute inset-0 bg-[radial-gradient(theme(colors.slate.800)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
            
            {/* SVG Connecting Lines */}
            <svg className="absolute w-[600px] h-[600px] pointer-events-none" viewBox="-300 -300 600 600">
              <defs>
                <style>
                  {`
                    @keyframes flow {
                      to { stroke-dashoffset: -20; }
                    }
                    .line-flow {
                      animation: flow 1s linear infinite;
                    }
                  `}
                </style>
              </defs>
              {CATEGORIES.map(cat => {
                const pos = nodePositions[cat.id];
                const isActive = activeCategory.id === cat.id;
                return (
                  <line 
                    key={`line-${cat.id}`}
                    x1="0" y1="0" x2={pos.x} y2={pos.y}
                    stroke={isActive ? cat.hex : '#334155'}
                    strokeWidth={isActive ? "2.5" : "1"}
                    strokeDasharray="6 6"
                    className={isActive ? 'line-flow opacity-80' : 'opacity-30'}
                  />
                );
              })}
            </svg>
            
            {/* Coordinate System Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Central CORE Node */}
              <div className="absolute z-20 w-24 h-24 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700/50">
                  <Cpu className="w-10 h-10 text-slate-300" strokeWidth={1.5} />
                </div>
              </div>

              {/* Orbiting Category Nodes */}
              {CATEGORIES.map(cat => {
                const pos = nodePositions[cat.id];
                const isActive = activeCategory.id === cat.id;
                
                return (
                  <div 
                    key={`node-${cat.id}`}
                    className="absolute z-10 transition-all duration-500 cursor-pointer group"
                    style={{
                      transform: `translate(${pos.x}px, ${pos.y}px)`,
                    }}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    <div className={`
                      w-20 h-20 rounded-full flex items-center justify-center
                      bg-slate-900 border-2 backdrop-blur-md relative
                      transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2
                      ${isActive ? 'shadow-2xl z-30' : 'border-slate-800 hover:border-slate-600'}
                    `}
                    style={{
                      borderColor: isActive ? cat.hex : undefined,
                      boxShadow: isActive ? `0 15px 35px -10px ${cat.hex}90, inset 0 2px 15px ${cat.hex}40` : undefined
                    }}>
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-950/90 border border-slate-800/80">
                        <cat.icon 
                          className={`w-7 h-7 transition-colors duration-300 ${isActive ? cat.colorClass : 'text-slate-400 group-hover:text-slate-300'}`} 
                          strokeWidth={isActive ? 2 : 1.5}
                        />
                      </div>
                    </div>
                    
                    {/* Minimalist Node Label */}
                    <div className={`
                      absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 
                      rounded-full bg-slate-950/80 border text-sm font-semibold tracking-wide
                      transition-all duration-300 origin-top
                      ${isActive 
                        ? 'opacity-100 translate-y-0 text-white shadow-lg scale-100' 
                        : 'opacity-0 -translate-y-2 text-slate-400 border-slate-800 scale-95 group-hover:opacity-100 group-hover:translate-y-0'}
                    `}
                    style={{ borderColor: isActive ? `${cat.hex}50` : '' }}>
                      {cat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Bottom: Active Layer Details */}
          <div className="relative flex-1 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/60 overflow-hidden min-h-[260px] flex flex-col shadow-xl">
            {/* Animated Top Border Line */}
            <div 
              className="absolute top-0 left-0 h-1 w-full transition-colors duration-500 shadow-[0_0_10px_currentColor]"
              style={{ backgroundColor: displayCategory.hex, color: displayCategory.hex }}
            />
            
            <div className={`p-8 flex flex-col h-full transition-all duration-300 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}>
              {/* Panel Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80 shadow-inner">
                    <displayCategory.icon className={`w-6 h-6 ${displayCategory.colorClass}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100 tracking-tight">{displayCategory.label} Ecosystem</h3>
                    <p className="text-sm text-slate-500 mt-1">Core technologies and tools</p>
                  </div>
                </div>
                <div className="hidden sm:flex px-4 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-sm font-semibold text-slate-300 shadow-inner">
                  {TECH_DATA[displayCategory.id].length} Technologies Active
                </div>
              </div>
              
              {/* Tech Pills Grid */}
              <div className="flex flex-wrap gap-3 mt-auto">
                {TECH_DATA[displayCategory.id].map(tech => (
                  <div 
                    key={tech} 
                    className="group flex items-center gap-3 px-4 py-2.5 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-slate-600 hover:bg-slate-900/80 hover:shadow-lg transition-all duration-300 cursor-default"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      {TECH_LOGOS[tech] ? (
                        <img 
                          src={TECH_LOGOS[tech]} 
                          alt={tech} 
                          title={tech}
                          className={`max-w-full max-h-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-3 ${
                            ['Express.js', 'GitHub', 'Next.js', 'Vercel'].includes(tech) ? 'invert opacity-90' : ''
                          }`} 
                        />
                      ) : (
                        <Code2 className="w-5 h-5 text-slate-400 group-hover:scale-125 transition-transform duration-300" />
                      )}
                    </div>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-300 tracking-wide">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
