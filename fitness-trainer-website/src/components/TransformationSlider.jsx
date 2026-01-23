import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TransformationSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <section id="results" className="py-32 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-emerald-500 font-bold tracking-[0.5em] uppercase text-xs mb-4"
          >
            Real Results
          </motion.h2>
          <h3 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic">
            Proven <span className="text-transparent stroke-text">Evolution</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Interactive Comparison Slider */}
          <div 
            className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden cursor-ew-resize border border-white/10 select-none shadow-2xl"
            onMouseMove={handleMove}
            onTouchMove={(e) => handleMove(e.touches[0])}
          >
            {/* After Image (Background) */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')` }}
            >
               <div className="absolute bottom-6 right-6 bg-emerald-600 px-4 py-1 text-[10px] font-black text-white uppercase italic">After 12 Weeks</div>
            </div>

            {/* Before Image (Overlay) */}
            <div 
              className="absolute inset-0 bg-cover bg-center border-r-2 border-emerald-500"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070')`,
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
              }}
            >
               <div className="absolute bottom-6 left-6 bg-zinc-800 px-4 py-1 text-[10px] font-black text-white uppercase italic">Initial Stage</div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-emerald-500 flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-glow">
                <div className="flex gap-1 text-white">
                  <ChevronLeft size={14} strokeWidth={3} />
                  <ChevronRight size={14} strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial & Data */}
          <div className="space-y-8">
            <Quote className="text-emerald-500 w-16 h-16 opacity-20" />
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-2xl md:text-3xl font-display font-bold text-white italic leading-tight"
            >
              "I never thought my body could look like this. The Ethio Fit methodology didn't just change my weight, it changed my entire mindset towards discipline."
            </motion.p>
            
            <div className="flex flex-col gap-2">
              <p className="text-emerald-500 font-black uppercase tracking-widest">- Abel Tadesse</p>
              <p className="text-zinc-500 text-sm">Software Engineer & Amateur Bodybuilder</p>
            </div>

            {/* Stat Badges */}
            <div className="grid grid-cols-2 gap-4 pt-10">
              <div className="bg-zinc-900 border border-white/5 p-6">
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">Body Fat</p>
                <p className="text-3xl font-display font-black text-white">-14%</p>
              </div>
              <div className="bg-zinc-900 border border-white/5 p-6">
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">Lean Muscle</p>
                <p className="text-3xl font-display font-black text-white">+6.5KG</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TransformationSlider;