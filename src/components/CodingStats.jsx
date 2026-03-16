import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Code, Zap, Trophy, Loader2, BarChart3, Star, GitFork, Activity } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { fadeInUp, staggerContainer } from "../utils/animations";

const GITHUB_USER = "prince093kumar";
const LEETCODE_USER = "Prince62065";

const FALLBACK_GITHUB = {
  followers: 12,
  public_repos: 24,
  chartData: [
    { name: 'RecipeGen', stars: 12, forks: 8 },
    { name: 'TechnoGrow', stars: 18, forks: 12 },
    { name: 'iSmart', stars: 15, forks: 9 },
    { name: 'Portfolio', stars: 25, forks: 15 },
    { name: 'DevOps-Lab', stars: 10, forks: 5 }
  ]
};

const FALLBACK_LEETCODE = {
  totalSolved: 142,
  easySolved: 65,
  mediumSolved: 62,
  hardSolved: 15
};

const CodingStats = () => {
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ghPromise = fetch(`https://api.github.com/users/${GITHUB_USER}`).then(res => res.json());
        const reposPromise = fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=stars&per_page=6`).then(res => res.json());
        const lcPromise = fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USER}`).then(res => res.json());

        const [ghJson, reposJson, lcJson] = await Promise.allSettled([ghPromise, reposPromise, lcPromise]);

        if (ghJson.status === 'fulfilled' && !ghJson.value.message) {
          const chartData = (reposJson.status === 'fulfilled' && Array.isArray(reposJson.value)) 
            ? reposJson.value.map(repo => ({
                name: repo.name.length > 10 ? repo.name.substring(0, 8) + '..' : repo.name,
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0
              }))
            : FALLBACK_GITHUB.chartData;

          setGithubData({ 
            followers: ghJson.value.followers || FALLBACK_GITHUB.followers,
            public_repos: ghJson.value.public_repos || FALLBACK_GITHUB.public_repos,
            chartData 
          });
        } else {
          setGithubData(FALLBACK_GITHUB);
        }

        if (lcJson.status === 'fulfilled' && lcJson.value.status === 'success') {
          setLeetcodeData(lcJson.value);
        } else {
          setLeetcodeData(FALLBACK_LEETCODE);
        }

      } catch {
        setGithubData(FALLBACK_GITHUB);
        setLeetcodeData(FALLBACK_LEETCODE);
      } finally {
        setTimeout(() => setLoading(false), 1000); 
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0f172a]/95 border border-primary/20 p-4 rounded-2xl backdrop-blur-xl shadow-2xl">
          <p className="text-white font-mono font-bold text-xs mb-2">{payload[0].payload.name}</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-yellow-500">
              <Star size={12} />
              <span className="text-[10px] font-mono font-black uppercase">Stars: {payload[0].value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-6">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
          <div className="absolute inset-0 blur-2xl bg-primary/20 animate-pulse rounded-full" />
        </div>
        <p className="text-white font-mono text-sm font-bold tracking-[0.3em] animate-pulse">SYNCING ENGINE METRICS</p>
      </div>
    );
  }

  return (
    <section className="section relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mb-20"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4 text-primary mb-6">
            <span className="w-12 h-px bg-primary/50" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.4em]">Analytics.v3()</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter mb-8 leading-tight">
            SYSTEM <span className="text-gradient">TELEMETRY</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* GitHub Bar Chart Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-8 group"
          >
            <div className="glass-card p-10 rounded-2xl border-white/5 relative overflow-hidden h-full flex flex-col bg-surface/30 backdrop-blur-2xl">
               <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-xl shadow-primary/10">
                      <BarChart3 size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-white tracking-tight">GitHub Impact</h3>
                      <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Star Distribution Analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/40 border border-white/10">
                     <Activity size={14} className="text-green-500 animate-pulse" />
                     <span className="text-[10px] font-mono font-black text-green-500 uppercase">Live Flux</span>
                  </div>
               </div>

               {/* Bar Chart Visualization */}
               <div className="h-[320px] w-full mb-10 group-hover:opacity-100 transition-opacity">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={githubData?.chartData || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.3)" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        dy={15}
                        fontFamily="JetBrains Mono"
                        fontWeight="bold"
                      />
                      <YAxis hide={true} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.05)', radius: [10, 10, 0, 0] }} />
                      <Bar 
                        dataKey="stars" 
                        radius={[10, 10, 0, 0]} 
                        animationDuration={1500}
                      >
                        {githubData?.chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index % 2 === 0 ? '#6366f1' : '#22C55E'} 
                            fillOpacity={0.8}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
               </div>

               <div className="mt-auto grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                    <span className="text-[10px] font-mono font-black text-slate-500 uppercase mb-2">Network Reach</span>
                    <span className="text-3xl font-black text-white">{githubData?.followers} <span className="text-primary text-sm">Followers</span></span>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                    <span className="text-[10px] font-mono font-black text-slate-500 uppercase mb-2">Code Inventory</span>
                    <span className="text-3xl font-black text-white">{githubData?.public_repos} <span className="text-secondary text-sm">Repos</span></span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* LeetCode Analysis Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <div className="glass-card p-10 rounded-2xl border-white/5 relative overflow-hidden h-full flex flex-col bg-surface/30 backdrop-blur-2xl">
               <div className="flex items-center gap-5 mb-12">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 shadow-xl shadow-yellow-500/10">
                    <Code size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-white tracking-tight">Algorithmic</h3>
                    <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">LeetCode Real-time</p>
                  </div>
               </div>

               <div className="space-y-8 flex-grow">
                  {[
                    { label: 'Easy', val: leetcodeData?.easySolved, color: 'bg-green-500' },
                    { label: 'Medium', val: leetcodeData?.mediumSolved, color: 'bg-yellow-500' },
                    { label: 'Hard', val: leetcodeData?.hardSolved, color: 'bg-red-500' }
                  ].map((lvl, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end px-1">
                        <span className={`text-[10px] font-mono font-black uppercase ${lvl.color.replace('bg-', 'text-')}`}>{lvl.label}</span>
                        <span className="text-xl font-black text-white">{lvl.val}</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(lvl.val / leetcodeData?.totalSolved) * 100}%` }}
                          transition={{ duration: 1.5, delay: i * 0.2 }}
                          className={`h-full rounded-full ${lvl.color} shadow-[0_0_15px_rgb(0_0_0_/_0.5)]`}
                        />
                      </div>
                    </div>
                  ))}
               </div>

               <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 text-center relative overflow-hidden group/btn">
                  <div className="relative z-10">
                    <p className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest mb-1">Cumulative Solved</p>
                    <p className="text-4xl font-black text-white mb-6">{leetcodeData?.totalSolved}</p>
                    <a 
                      href={`https://leetcode.com/${LEETCODE_USER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-primary font-mono font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                    >
                      <Trophy size={16} />
                      Performance Log
                    </a>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CodingStats;
