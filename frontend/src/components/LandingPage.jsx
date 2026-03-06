import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Target, BarChart3, Activity, Play } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* VIDEO LAYER */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#050505] z-10" />
          
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover scale-110" // Slight scale to prevent white edges
          >
            {/* Replace with your actual video path */}
            <source src="/assets/hero-bg.mp4" type="video/mp4" />
          </video>

          {/* THE "SCANLINE" CRT EFFECT */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>

        {/* CONTENT LAYER */}
        <div className="container mx-auto px-6 relative z-30 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/30 bg-black/50 backdrop-blur-md mb-8"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">
              Live Feed // Personnel Intake Active
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-[10rem] font-display font-black italic leading-[0.75] tracking-tighter uppercase mb-6"
          >
            COMMAND <br />
            <span className="text-emerald-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">YOUR BODY</span>
          </motion.h1>

          <motion.div
             initial={{ width: 0 }}
             animate={{ width: "100px" }}
             transition={{ delay: 0.5, duration: 1 }}
             className="h-1 bg-emerald-500 mx-auto mb-8"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-medium uppercase tracking-widest mb-12 leading-relaxed"
          >
            The elite performance architecture for the modern athlete. <br /> 
            <span className="text-zinc-500 italic">No compromises. No excuses.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => navigate('/register')}
              className="relative overflow-hidden bg-emerald-600 text-black px-12 py-5 font-black uppercase tracking-[0.2em] text-xs transition-all group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Join the Ranks <ChevronRight size={16} />
              </span>
              <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 opacity-20" />
            </button>

            <button 
              onClick={() => navigate('/login')}
              className="backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 text-white px-12 py-5 font-black uppercase tracking-[0.2em] text-xs transition-all"
            >
              Enter Vault
            </button>
          </motion.div>
        </div>

        {/* Side HUD Elements (Decorative) */}
        <div className="absolute hidden lg:block left-10 bottom-20 z-40">
           <div className="flex flex-col gap-2">
              <div className="w-1 h-12 bg-emerald-500/20" />
              <p className="text-[8px] font-mono text-emerald-500/40 uppercase vertical-text">Aesthetic_Logic_v2.0</p>
           </div>
        </div>
      </section>

      {/* Rest of the Landing Page Sections... */}
    </div>
  );
};

export default LandingPage;