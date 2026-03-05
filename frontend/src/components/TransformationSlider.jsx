import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Zap, ArrowRight, Activity, Calendar, User } from 'lucide-react';

// Import your local images
import imageBefore from '../assets/heroimage1.png'; // Update with actual before path
import imageAfter from '../assets/heroimage.png';  // Update with actual after path

const TransformationSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const xText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <section id="results" ref={containerRef} className="py-32 bg-zinc-950 overflow-hidden relative border-y border-white/5">
      
      {/* 1. ARCHITECTURAL BACKGROUND */}
      <motion.div 
        style={{ x: xText, opacity }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none uppercase italic leading-none select-none"
      >
        METAMORPHOSIS • EVOLUTION • RESULTS
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-emerald-500"></div>
              <span className="text-emerald-500 font-black tracking-[0.5em] uppercase text-[10px]">Documentation • 001</span>
            </motion.div>
            <h3 className="text-6xl md:text-8xl font-display font-black text-white uppercase italic leading-[0.8] tracking-tighter">
              PROVEN <span className="text-transparent stroke-text">PEAK</span><br />
              CONDITIONING
            </h3>
          </div>
          
          <div className="hidden lg:block border-l border-white/10 pl-8">
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-2">Project Duration</p>
            <div className="flex items-center gap-2 text-white font-display text-2xl font-black italic">
              <Calendar className="text-emerald-500" size={20} /> 90 DAYS / 12 WEEKS
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 xl:gap-24 items-center">
          
          {/* 2. INTERACTIVE SCANNER (THE SLIDER) */}
          <div className="lg:col-span-7">
            <div 
              className="relative aspect-[4/5] md:aspect-[16/10] w-full overflow-hidden cursor-none border border-white/10 group shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-900"
              onMouseMove={(e) => handleMove(e.clientX)}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            >
              {/* After Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale-0 group-hover:scale-105 transition-transform duration-[2s]"
                style={{ backgroundImage: `url('${imageAfter}')` }}
              >
                <div className="absolute bottom-10 right-10 z-20">
                  <span className="bg-emerald-600 text-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                    Phase: Post-Optimization
                  </span>
                </div>
              </div>

              {/* Before Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale border-r border-emerald-500/50"
                style={{ 
                  backgroundImage: `url('${imageBefore}')`,
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
                }}
              >
                <div className="absolute bottom-10 left-10 z-20">
                  <span className="bg-zinc-900 text-white border border-white/10 px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                    Phase: Initial Intake
                  </span>
                </div>
              </div>

              {/* TECHNICAL OVERLAY (SCAN LINE) */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-emerald-500 z-30 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Custom Cursor UI */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-14 h-14 rounded-full border border-emerald-500 bg-zinc-950 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                      <div className="flex gap-1 text-emerald-500">
                        <ChevronLeft size={16} strokeWidth={4} />
                        <ChevronRight size={16} strokeWidth={4} />
                      </div>
                   </div>
                </div>
                {/* Pulsing Scan Effect */}
                <div className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-emerald-500/20 to-transparent -translate-x-full" />
              </div>
            </div>
          </div>

          {/* 3. BIOMETRIC DATA & SOCIAL PROOF */}
          <div className="lg:col-span-5">
            <div className="relative mb-12">
              <Quote className="absolute -top-10 -left-6 text-emerald-500 w-16 h-16 opacity-10" />
              <p className="text-3xl md:text-4xl font-display font-black text-white italic leading-[1.1] relative z-10 uppercase tracking-tighter">
                "The system didn't just strip the fat; it <span className="text-emerald-500">rewired</span> how I move and think."
              </p>
            </div>
            
            <div className="flex items-center gap-5 mb-12 p-4 bg-white/5 border border-white/5">
              <div className="w-16 h-16 bg-emerald-600/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <User size={28} />
              </div>
              <div>
                <p className="text-white font-black uppercase tracking-widest text-xl italic">Abdurezak Shemsu</p>
                <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.3em]">Software Architect • 90-Day Protocol</p>
              </div>
            </div>

            {/* DATA GRID */}
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 mb-12">
              <div className="bg-zinc-950 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={12} className="text-emerald-500" />
                  <p className="text-zinc-500 text-[9px] uppercase font-black tracking-widest">Adipose Tissue</p>
                </div>
                <p className="text-5xl font-display font-black text-white italic">-14.2<span className="text-emerald-500 text-2xl">%</span></p>
              </div>
              <div className="bg-zinc-950 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={12} className="text-emerald-500" />
                  <p className="text-zinc-500 text-[9px] uppercase font-black tracking-widest">Lean Hypertrophy</p>
                </div>
                <p className="text-5xl font-display font-black text-white italic">+6.5<span className="text-emerald-500 text-2xl">KG</span></p>
              </div>
            </div>

            {/* HIGH-CONVERSION BUTTON */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between w-full group bg-white hover:bg-emerald-600 transition-all duration-500 p-1 pl-10 rounded-none overflow-hidden"
            >
              <span className="text-black group-hover:text-white font-black uppercase tracking-[0.3em] text-xs">
                Apply for Transformation
              </span>
              <div className="bg-zinc-950 w-16 h-16 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-500">
                <ArrowRight className="text-emerald-500 group-hover:rotate-[-45deg] transition-transform duration-500" size={24} />
              </div>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TransformationSlider;