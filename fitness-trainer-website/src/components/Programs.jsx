import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Zap, Target, Activity, ArrowUpRight } from 'lucide-react';

const programs = [
  {
    id: '01',
    title: "Bodybuilding",
    desc: "Hypertrophy-focused training designed to maximize muscle volume and aesthetic symmetry.",
    icon: <Dumbbell className="w-8 h-8" />,
    tag: "Mass Gain"
  },
  {
    id: '02',
    title: "Fat Shred",
    desc: "High-intensity metabolic conditioning to torch fat while preserving lean muscle mass.",
    icon: <Zap className="w-8 h-8" />,
    tag: "Weight Loss"
  },
  {
    id: '03',
    title: "Strength Elite",
    desc: "Powerlifting-based routines to break through plateaus and master the big compound lifts.",
    icon: <Target className="w-8 h-8" />,
    tag: "Power"
  },
  {
    id: '04',
    title: "Online Coaching",
    desc: "Personalized nutrition and workout plans delivered via our app, wherever you are.",
    icon: <Activity className="w-8 h-8" />,
    tag: "Global Access"
  }
];

const Programs = () => {
  return (
    <section id="programs" className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/5 -skew-x-12 translate-x-32 z-0" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-emerald-500 font-bold tracking-[0.4em] uppercase text-xs mb-4"
            >
              Professional Services
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-black text-white uppercase italic leading-none"
            >
              Choose Your <span className="text-transparent stroke-text">Specialty</span>
            </motion.h3>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 max-w-xs border-l border-emerald-500/30 pl-6 py-2"
          >
            Scientifically backed methods tailored for the Ethiopian physique and lifestyle.
          </motion.p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-zinc-900/50 border border-white/5 p-8 h-[450px] flex flex-col justify-between overflow-hidden hover:border-emerald-500/40 transition-all duration-500"
            >
              {/* Card Background Glow */}
              <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-emerald-600/10 rounded-full blur-[80px] group-hover:bg-emerald-600/20 transition-all duration-500" />
              
              {/* Top Row: Icon & ID */}
              <div className="flex justify-between items-start">
                <div className="p-4 bg-zinc-800 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  {p.icon}
                </div>
                <span className="text-4xl font-display font-black text-white/10 group-hover:text-emerald-500/20 transition-colors">
                  {p.id}
                </span>
              </div>

              {/* Bottom Content */}
              <div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 mb-4 inline-block">
                  {p.tag}
                </span>
                <h4 className="text-3xl font-display font-black text-white uppercase italic mb-4 tracking-tighter">
                  {p.title}
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {p.desc}
                </p>
                
                <button className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest group-hover:text-emerald-500 transition-colors">
                  View Details <ArrowUpRight size={16} />
                </button>
              </div>

              {/* Decorative Accent Line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Custom CTA for the whole section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-zinc-500 text-sm mb-6 uppercase tracking-widest font-bold">Not sure which one fits you?</p>
          <button className="border-b-2 border-emerald-500 text-white font-display font-black text-2xl italic pb-1 hover:text-emerald-500 transition-colors">
            TAKE THE FITNESS QUIZ
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;