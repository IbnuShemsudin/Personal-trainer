import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Award, Zap, Users, Target } from 'lucide-react';

const About = () => {
  // Optional: Add a subtle parallax to the image for that "Premium" feel
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="about" className="py-32 bg-zinc-950 relative overflow-hidden">
      
      {/* 1. Background Text Decoration */}
      <div className="absolute top-20 right-[-5%] pointer-events-none select-none">
        <h2 className="text-[15vw] font-display font-black text-white/[0.02] uppercase leading-none italic">
          DISCIPLINE
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: Elevated Visual Stack (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* Decorative "Emerald" Frame Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/20 to-transparent blur-2xl -z-10" />
              
              {/* Main Image Container */}
              <div className="relative z-10 overflow-hidden border border-white/10 group">
                <motion.img 
                  style={{ y: imageY }}
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887" 
                  alt="Trainer Profile" 
                  className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-110"
                />
                
                {/* Image Overlay Texture */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                
                {/* Bottom Left Detail */}
                <div className="absolute bottom-6 left-6">
                   <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-1">Status</p>
                   <p className="text-white font-display text-xl italic font-black uppercase tracking-tighter">Elite Active</p>
                </div>
              </div>

              {/* Advanced Floating Stat Card */}
              <motion.div 
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-8 -right-8 bg-zinc-900 border-l-4 border-emerald-500 p-8 shadow-2xl z-20 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-emerald-500 font-display text-5xl font-black italic leading-none">10+</span>
                    <span className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-bold mt-2">Years of Grit</span>
                  </div>
                  <div className="h-12 w-px bg-white/10 mx-2" />
                  <Target className="text-emerald-500 w-8 h-8 opacity-50" />
                </div>
              </motion.div>

              {/* Moving Geometric Ghost Frame */}
              <motion.div 
                animate={{ 
                  rotate: [0, 2, 0],
                  x: [0, 5, 0] 
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 w-full h-full border border-emerald-500/30 -z-10" 
              />
            </motion.div>
          </div>

          {/* RIGHT: High-Contrast Biography (7 Cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-emerald-500" />
                <h2 className="text-emerald-500 font-bold tracking-[0.5em] uppercase text-[10px]">Head Coach & Founder</h2>
              </div>

              <h3 className="text-6xl md:text-8xl font-display font-black text-white uppercase italic leading-[0.85] mb-10 tracking-tighter">
                THE MIND <br /> 
                <span className="text-transparent stroke-text">BEHIND THE IRON</span>
              </h3>
            </motion.div>

            <p className="text-zinc-400 text-xl leading-relaxed mb-12 font-light max-w-xl">
              I don’t just count reps; I make <span className="text-white font-medium">every rep count</span>. My approach combines the raw intensity of old-school bodybuilding with modern biomechanics to ensure your growth is sustainable, surgical, and <span className="text-emerald-500 font-bold italic underline underline-offset-8">undeniable</span>.
            </p>

            {/* Achievement Grid with Hover Reveal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 mb-16">
              {[
                { icon: <Award className="w-5 h-5"/>, title: "IFBB Pro Level", sub: "International Certification" },
                { icon: <Zap className="w-5 h-5"/>, title: "Metabolic Specialist", sub: "Fat Loss Architecture" },
                { icon: <Users className="w-5 h-5"/>, title: "500+ Results", sub: "Proven Transformations" },
                { icon: <CheckCircle2 className="w-5 h-5"/>, title: "Elite Nutrition", sub: "Performance Fueling" },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-default"
                >
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-zinc-900 border border-white/5 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-black uppercase tracking-tight text-sm mb-1">{item.title}</h4>
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest">{item.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Signature & CTA Section */}
            <div className="pt-12 border-t border-white/10 flex flex-wrap items-center gap-10">
              <div className="flex flex-col">
                <span className="text-white font-display text-3xl font-black italic tracking-tighter uppercase leading-none">ETHIO FIT</span>
                <span className="text-emerald-600 text-[9px] uppercase tracking-[0.5em] font-black mt-2">Addis Ababa, ET</span>
              </div>
              
              <motion.button 
                whileHover={{ x: 10 }}
                className="group flex items-center gap-4 text-white"
              >
                <span className="text-xs font-black uppercase tracking-widest group-hover:text-emerald-500 transition-colors">Learn My Philosophy</span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-all">
                   <Zap size={16} className="text-emerald-500" />
                </div>
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;