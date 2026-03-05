import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Target, Trophy, ChevronRight, X, FileCheck, ExternalLink, Calendar } from 'lucide-react';

const milestones = [
  {
    id: 'm1',
    year: "2018",
    title: "Foundation & Certification",
    desc: "Earned international coaching credentials and began specializing in metabolic conditioning.",
    icon: <Target className="w-6 h-6" />,
    stats: "Certified Specialist",
    details: {
      location: "International Sports Science Association",
      focus: "Hypertrophy & Metabolic Architecture",
      achievement: "Graduated with Honors in Strength & Conditioning.",
      longDesc: "This period marked the transition from enthusiast to professional. I spent over 2,000 hours studying biomechanics and nutritional biochemistry to ensure every client's program is backed by data, not just effort."
    }
  },
  {
    id: 'm2',
    year: "2021",
    title: "National Physique Ranking",
    desc: "Placed Top 5 in Ethiopia's Premier Bodybuilding Championship, mastering contest prep.",
    icon: <Trophy className="w-6 h-6" />,
    stats: "Top 5 Elite",
    details: {
      location: "Addis Ababa, ET",
      focus: "Men's Physique Category",
      achievement: "Top 5 National Finalist",
      longDesc: "Competing at a national level provided the ultimate laboratory for peaking science. I applied advanced carbohydrate cycling and water manipulation techniques that I now use to help my lifestyle clients reach photoshoot-ready conditioning."
    }
  },
  {
    id: 'm3',
    year: "2024",
    title: "Ethio Fit Launch",
    desc: "Architected a hybrid training system merging science-based hypertrophy with local nutrition.",
    icon: <Shield className="w-6 h-6" />,
    stats: "Founder / Head Coach",
    details: {
      location: "Ethio Fit Headquarters",
      focus: "Hybrid Transformation Systems",
      achievement: "500+ Active Clients",
      longDesc: "The launch of Ethio Fit represents the culmination of 6 years of grit. We've built a digital and physical infrastructure designed to transform the fitness landscape in Ethiopia, prioritizing long-term health and sustainable muscle growth."
    }
  }
];

const Experience = () => {
  const [activeMilestone, setActiveMilestone] = useState(null);

  return (
    <section id="experience" className="py-32 bg-zinc-950 relative overflow-hidden">
      
      {/* Background Polish */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-emerald-500" />
              <span className="text-emerald-500 font-black tracking-[0.5em] uppercase text-[10px]">Professional Evolution</span>
            </motion.div>
            <h3 className="text-6xl md:text-8xl font-display font-black text-white uppercase italic leading-[0.85] tracking-tighter">
              EXPERTISE <br />
              <span className="text-transparent stroke-text">FORGED IN IRON</span>
            </h3>
          </div>
        </div>

        {/* Linear Timeline Grid */}
        <div className="grid grid-cols-1 gap-4 relative">
          <div className="absolute left-[31px] top-0 bottom-0 w-[1px] bg-white/5 hidden md:block" />

          {milestones.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onClick={() => setActiveMilestone(item)}
              className="group relative flex flex-col md:flex-row gap-8 md:gap-16 items-start py-12 border-b border-white/5 last:border-0 cursor-pointer transition-all hover:px-4"
            >
              {/* Year & Icon */}
              <div className="flex md:flex-col items-center gap-6 md:w-16 z-10">
                <div className="w-16 h-16 bg-zinc-900 border border-white/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shrink-0">
                  {item.icon}
                </div>
                <span className="text-2xl font-display font-black text-white italic md:rotate-90 md:my-8">
                  {item.year}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2 block">{item.stats}</span>
                  <h4 className="text-3xl md:text-4xl font-display font-black text-white uppercase italic mb-4 group-hover:text-emerald-500 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl font-light italic">"{item.desc}"</p>
                </div>

                <div className="md:col-span-4 flex md:justify-end">
                  <div className="px-6 py-4 border-l-2 border-emerald-500 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <p className="text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                      Official Records <ExternalLink size={14} />
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Dynamic Footer Stats */}
        <div className="mt-24 p-12 bg-zinc-900/50 border border-white/5 flex flex-wrap justify-around gap-12 text-center">
          {[
            { label: "Years Active", val: "06+" },
            { label: "Clients Served", val: "500+" },
            { label: "Unified Vision", val: "01" }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-display font-black text-white italic">{stat.val}</p>
              <p className="text-emerald-500 text-[9px] uppercase font-black tracking-widest mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ACHIEVEMENT MODAL */}
      <AnimatePresence>
        {activeMilestone && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-black/98 backdrop-blur-xl" onClick={() => setActiveMilestone(null)} />
            
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-3xl bg-zinc-900 border border-white/10 p-8 md:p-16 overflow-hidden"
            >
              <button onClick={() => setActiveMilestone(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
                <X size={32} />
              </button>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8 text-emerald-500">
                  <FileCheck size={40} />
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="font-display text-4xl font-black italic">{activeMilestone.year}</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase italic mb-2">
                  {activeMilestone.title}
                </h2>
                <p className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.4em] mb-12">
                  Verified Achievement
                </p>

                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-white text-[10px] uppercase font-black tracking-widest mb-2 opacity-40">Institution / Context</h5>
                      <p className="text-zinc-300 font-bold">{activeMilestone.details.location}</p>
                    </div>
                    <div>
                      <h5 className="text-white text-[10px] uppercase font-black tracking-widest mb-2 opacity-40">Primary Focus</h5>
                      <p className="text-zinc-300 font-bold">{activeMilestone.details.focus}</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-white text-[10px] uppercase font-black tracking-widest mb-2 opacity-40">Narrative</h5>
                    <p className="text-zinc-400 text-sm leading-relaxed italic">"{activeMilestone.details.longDesc}"</p>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveMilestone(null)}
                  className="w-full py-5 border border-emerald-500/50 text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-emerald-500 hover:text-white transition-all"
                >
                  Close Records
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;