import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Zap, ArrowRight } from 'lucide-react';

const TransformationSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const xText = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <section id="results" ref={containerRef} className="py-32 bg-zinc-950 overflow-hidden relative">
      
      {/* Background Aesthetic Text */}
      <motion.div 
        style={{ x: xText }}
        className="absolute top-20 left-0 text-[15vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none uppercase italic"
      >
        Transformation Evolution Results
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-emerald-500"></div>
            <span className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-xs">Case Study: 01</span>
          </motion.div>
          <h3 className="text-6xl md:text-8xl font-display font-black text-white uppercase italic leading-[0.8]">
            The <span className="text-transparent stroke-text">Blueprint</span><br />
            of Success
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Interactive Comparison Slider */}
          <div className="lg:col-span-7">
            <div 
              className="relative aspect-[16/10] w-full overflow-hidden cursor-ew-resize rounded-sm border border-white/10 group shadow-2xl"
              onMouseMove={(e) => handleMove(e.clientX)}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            >
              {/* After Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1583454110551-21f2fa200220?q=80&w=2070')` }}
              >
                <div className="absolute top-6 right-6 bg-emerald-500 px-4 py-2 text-[10px] font-black text-black uppercase tracking-tighter">
                  Result: Post 12 Weeks
                </div>
              </div>

              {/* Before Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center border-r-[1px] border-emerald-500/50"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')`,
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
                }}
              >
                <div className="absolute top-6 left-6 bg-zinc-900/80 backdrop-blur-md px-4 py-2 text-[10px] font-black text-white uppercase tracking-tighter border border-white/10">
                  Status: Day 01
                </div>
              </div>

              {/* Slider Handle UI */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-emerald-500 flex items-center justify-center -translate-x-1/2"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 w-12 h-12 bg-emerald-500/30 rounded-full animate-ping -translate-x-[45%] -translate-y-[40%]"></div>
                  <div className="w-12 h-12 bg-zinc-950 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] relative z-10">
                    <div className="flex gap-0.5 text-emerald-500">
                      <ChevronLeft size={18} strokeWidth={3} />
                      <ChevronRight size={18} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial & Data */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full space-y-10">
            <div className="relative">
              <Quote className="absolute -top-10 -left-6 text-emerald-500 w-20 h-20 opacity-10" />
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-display font-bold text-white italic leading-tight relative z-10"
              >
                "I never thought my body could look like this. The Ethio Fit methodology didn't just change my weight, it changed my entire mindset."
              </motion.p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <Zap size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-white font-black uppercase tracking-widest text-lg italic">Abdurezak, Shemsu</p>
                <p className="text-emerald-500/60 text-xs font-bold uppercase tracking-widest">Software Engineer • 12 Week Program</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/5 backdrop-blur-md p-8 group hover:border-emerald-500/30 transition-colors">
                <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.2em] mb-2">Body Fat</p>
                <p className="text-4xl font-display font-black text-white group-hover:text-emerald-500 transition-colors">-14%</p>
              </div>
              <div className="bg-white/[0.03] border border-white/5 backdrop-blur-md p-8 group hover:border-emerald-500/30 transition-colors">
                <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.2em] mb-2">Lean Muscle</p>
                <p className="text-4xl font-display font-black text-white group-hover:text-emerald-500 transition-colors">+6.5kg</p>
              </div>
            </div>

            {/* CALL TO ACTION BUTTON */}
            <motion.a
              href="#contact"
              whileHover={{ x: 5 }}
              className="inline-flex items-center justify-between group bg-emerald-600 hover:bg-white transition-colors duration-500 p-1 pl-8 rounded-sm"
            >
              <span className="text-white group-hover:text-black font-black uppercase tracking-[0.2em] text-sm">
                Start Your Story
              </span>
              <div className="bg-zinc-950 w-14 h-14 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-500">
                <ArrowRight className="text-white group-hover:rotate-[-45deg] transition-transform duration-500" size={24} />
              </div>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TransformationSlider;