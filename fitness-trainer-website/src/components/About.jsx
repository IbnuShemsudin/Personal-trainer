import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Zap, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: Layered Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background Decorative Element */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl" />
            
            {/* Main Image Frame */}
            <div className="relative z-10 border border-white/10 p-3 bg-zinc-900/50 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887" 
                alt="Trainer Profile" 
                className="w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
              
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-10 -right-10 bg-emerald-600 p-8 shadow-[0_20px_50px_rgba(5,150,105,0.3)] hidden md:block"
              >
                <p className="text-white font-display font-black text-5xl italic leading-none">100%</p>
                <p className="text-white/80 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Dedication</p>
              </motion.div>
            </div>

            {/* Ghost Frame */}
            <div className="absolute top-10 left-10 w-full h-full border-2 border-emerald-500/20 -z-0" />
          </motion.div>

          {/* RIGHT: Biography & Values */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-xs mb-4">The Architect</h2>
              <h3 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic leading-none mb-8">
                More Than Just <br /> 
                <span className="text-transparent stroke-text">A Trainer</span>
              </h3>
            </motion.div>

            <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-light">
              With over a decade of experience in the fitness industry, I’ve seen that true transformation happens when elite sports science meets an unbreakable mindset. My mission is to bring professional-grade coaching to <span className="text-white font-bold">Addis Ababa</span>, helping you rebuild your physique from the ground up.
            </p>

            {/* Achievement Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                { icon: <Award size={20}/>, text: "Certified IFBB Coach" },
                { icon: <Zap size={20}/>, text: "Hypertrophy Specialist" },
                { icon: <Users size={20}/>, text: "500+ Client Successes" },
                { icon: <CheckCircle2 size={20}/>, text: "Nutrition Consultant" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="text-emerald-500 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-zinc-300 font-bold uppercase tracking-tighter text-sm italic">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Signature Area */}
            <div className="pt-10 border-t border-white/5 flex items-center gap-6">
              <div className="flex flex-col">
                <p className="text-white font-display text-2xl font-black italic tracking-widest uppercase">Ethio Fit</p>
                <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold">Founder & Head Coach</p>
              </div>
              <button className="ml-auto text-emerald-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors flex items-center gap-2">
                Learn My Story <div className="w-8 h-[1px] bg-emerald-500" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;