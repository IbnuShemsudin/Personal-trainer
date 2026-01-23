import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      id="home" 
      // Increased pt-32 (mobile) and pt-48 (desktop) to clear the professional navbar
      className="relative min-h-screen w-full flex items-center bg-zinc-950 overflow-hidden pt-32 md:pt-48 pb-20"
    >
      
      {/* 1. Background Visual Elements */}
      <div className="absolute inset-0 z-0">
        {/* Massive Background Text - "ETHIOPIA" */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <h2 className="text-[22vw] font-display font-black stroke-text opacity-5 leading-none uppercase italic tracking-tighter">
            ETHIOPIA
          </h2>
        </div>
        
        {/* Refined Ambient Glows */}
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* 2. Content Column (Left) */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            {/* Animated Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-emerald-600/5 border border-emerald-500/20 px-4 py-2 w-fit mb-6"
            >
              <Zap size={14} className="text-emerald-500 fill-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
                Certified Professional Trainer
              </span>
            </motion.div>

            {/* Main Headlines */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl sm:text-7xl md:text-[130px] font-display font-black text-white leading-[0.8] uppercase tracking-tighter italic">
                LEVEL <span className="text-emerald-500">UP</span>
              </h1>
              <h1 className="text-6xl sm:text-7xl md:text-[130px] font-display font-black stroke-text leading-[0.8] uppercase tracking-tighter">
                YOUR FITNESS
              </h1>
            </motion.div>

            {/* Paragraph Text */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-10 text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light"
            >
              Built on <span className="text-white font-bold italic">discipline</span>, fueled by <span className="text-white font-bold italic">passion</span>. Join Ethiopia's elite training program designed for those who demand real results and ultimate transformations.
            </motion.p>

            {/* Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-col sm:flex-row gap-5"
            >
              <button className="group relative bg-emerald-600 hover:bg-white text-white hover:text-black px-12 py-5 font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-4">
                Start Training
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button className="group border border-white/10 hover:border-emerald-500/50 px-12 py-5 font-black uppercase tracking-widest text-white transition-all duration-300 flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                <Play size={16} className="fill-emerald-500 text-emerald-500 group-hover:scale-110 transition-transform" />
                Free Consultation
              </button>
            </motion.div>

            {/* Trust Factors */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-20 flex items-center gap-12 border-t border-white/5 pt-12"
            >
              <div className="flex flex-col">
                <span className="text-4xl font-display font-black text-white">10<span className="text-emerald-500">+</span></span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Years Exp</span>
              </div>
              <div className="w-[1px] h-12 bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-4xl font-display font-black text-white">500<span className="text-emerald-500">+</span></span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Results</span>
              </div>
              <div className="hidden sm:block w-[1px] h-12 bg-zinc-800" />
              <div className="hidden sm:flex flex-col">
                <span className="text-4xl font-display font-black text-white italic">Elite</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Coaching</span>
              </div>
            </motion.div>
          </div>

          {/* 3. Hero Image Column (Right) */}
          <div className="lg:col-span-4 relative hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              {/* Outer Glow Frame */}
              <div className="absolute -inset-4 border border-emerald-500/20 -z-10 translate-x-6 translate-y-6 blur-[1px]" />
              
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070" 
                alt="Elite Trainer" 
                className="w-full grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
              />
              
              {/* Vertical Label */}
              <div className="absolute bottom-0 -left-12 bg-emerald-600 py-4 px-8 -rotate-90 origin-bottom-left">
                <p className="text-white font-black uppercase tracking-[0.5em] text-[10px] whitespace-nowrap">
                  EST. 2024 • ADDIS ABABA
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 4. Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-emerald-500 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;