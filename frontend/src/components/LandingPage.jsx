import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Zap, Target, Activity, Cpu, BarChart, Terminal, Fingerprint } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white selection:bg-emerald-500 selection:text-black">
      
      {/* 1. CINEMATIC VIDEO HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        
        {/* VIDEO ENGINE */}
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          {/* Layer 1: Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#050505] z-10" />
          
          {/* Layer 2: Technical Mesh Overlay */}
          <div className="absolute inset-0 z-20 opacity-[0.1] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />
          
          {/* Layer 3: Video Background */}
          <video 
            autoPlay muted loop playsInline 
            poster="/fallback-bg.jpg"
            className="w-full h-full object-cover grayscale brightness-[0.4] contrast-125"
          >
            <source src="/hero-cinematic.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* CONTENT LAYER */}
        <div className="container mx-auto px-6 relative z-30">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <Terminal size={14} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/80">
                Authorized Access Only // Bio-Metric Protocol
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[11rem] font-display font-black italic leading-[0.75] tracking-tighter uppercase mb-12"
            >
              ETHIO HAYDER<br />
              <span className="text-transparent stroke-text-white">AESTHETICS</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col md:flex-row items-end justify-between gap-8 border-t border-white/10 pt-8"
            >
              <div className="flex flex-col gap-4">
                 <p className="max-w-sm text-zinc-500 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                   [System Objective] <br />
                   <span className="text-white">Engineering superior physiques via metabolic architecture and tactical hypertrophy.</span>
                 </p>
                 <div className="flex gap-2">
                    <div className="h-1 w-12 bg-emerald-500" />
                    <div className="h-1 w-4 bg-white/20" />
                    <div className="h-1 w-4 bg-white/20" />
                 </div>
              </div>
              
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <button 
                  onClick={() => navigate('/register')}
                  className="flex-1 md:flex-none bg-white text-black px-12 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all duration-500 flex items-center justify-center gap-3 group"
                >
                  Initiate Enrollment <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="flex-1 md:flex-none border border-white/20 backdrop-blur-md px-12 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3"
                >
                  <Fingerprint size={16} /> Access Portal
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* MARQUEE DATA TICKER */}
        <div className="absolute bottom-0 w-full py-4 bg-emerald-500/5 border-t border-white/5 backdrop-blur-md overflow-hidden whitespace-nowrap z-40">
          <div className="flex animate-marquee gap-12 items-center">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-4">
                <Activity size={10} className="text-emerald-500" /> System_Status: Operational
                <span className="text-zinc-800">//</span>
                Recruitment_Phase: Active
                <span className="text-zinc-800">//</span>
                Bio_Sync: 100%
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE METHODOLOGY (BENTO GRID) */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-4 auto-rows-[240px]">
          
          {/* Main Pillar */}
          <div className="md:col-span-8 bg-zinc-900/40 border border-white/5 p-12 flex flex-col justify-end group hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={120} />
            </div>
            <Cpu className="text-emerald-500 mb-6" size={32} />
            <h3 className="text-4xl font-display font-black italic uppercase">Algorithmic Training</h3>
            <p className="text-zinc-500 text-sm mt-4 max-w-md">Every rep is data. We optimize volume and intensity using progressive overload algorithms designed for your specific biotype.</p>
          </div>

          {/* Callout Pillar */}
          <div className="md:col-span-4 bg-emerald-600 p-12 flex flex-col justify-between group cursor-pointer overflow-hidden relative">
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
            <Shield size={32} className="text-black relative z-10" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-black uppercase italic">Elite Tier Support</h3>
              <p className="text-black/70 text-xs mt-2 font-bold uppercase tracking-wider">Direct encrypted comms with the Commander.</p>
            </div>
          </div>

          {/* Stats/Minor Pillar */}
          <div className="md:col-span-4 bg-zinc-900/40 border border-white/5 p-12 flex flex-col justify-end group hover:border-emerald-500/30 transition-all">
            <Target className="text-emerald-500 mb-6" size={32} />
            <h3 className="text-2xl font-black uppercase italic">Precision</h3>
            <p className="text-zinc-500 text-xs mt-2 leading-relaxed">Nutrition protocols calibrated for local Ethiopian staples and lifestyle efficiency.</p>
          </div>

          {/* Results Pillar with Image */}
          <div className="md:col-span-8 relative overflow-hidden group border border-white/5">
            <img 
              src="/training-bg.jpg" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" 
              alt="Training Results" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
            <div className="relative h-full p-12 flex flex-col justify-end">
               <BarChart className="text-emerald-500 mb-4" size={32} />
               <h3 className="text-4xl font-display font-black italic uppercase">The Metrics</h3>
               <p className="text-zinc-400 text-xs mt-2 uppercase tracking-widest">Visual evidence of biological evolution.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default LandingPage;