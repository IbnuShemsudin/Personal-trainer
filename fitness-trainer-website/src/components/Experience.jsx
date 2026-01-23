import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Target, Trophy } from 'lucide-react';

const Experience = () => {
  const milestones = [
    {
      year: "2018",
      title: "Foundation & Certification",
      desc: "Earned international coaching credentials and began specializing in metabolic conditioning.",
      icon: <Target size={20} />
    },
    {
      year: "2021",
      title: "National Physique Ranking",
      desc: "Placed Top 5 in Ethiopia's Premier Bodybuilding Championship, mastering contest prep.",
      icon: <Trophy size={20} />
    },
    {
      year: "2024",
      title: "Ethio Fit Launch",
      desc: "Architected a hybrid training system merging science-based hypertrophy with local nutrition.",
      icon: <Shield size={20} />
    }
  ];

  return (
    <section id="experience" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Professional Path</h2>
            <h3 className="text-5xl md:text-6xl font-display font-black text-white uppercase italic">
              Expertise <span className="text-transparent stroke-text">Forged in Iron</span>
            </h3>
          </div>

          <div className="relative border-l border-zinc-800 ml-4 md:ml-0 md:left-1/2">
            {milestones.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`relative mb-16 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right md:-left-full' : 'md:pl-12 md:left-0'}`}
              >
                {/* Timeline Dot */}
                <div className="absolute top-0 -left-[13px] md:left-auto md:right-[-13px] w-6 h-6 bg-emerald-600 rounded-full border-4 border-zinc-950 z-10" 
                     style={i % 2 !== 0 ? { left: '-13px' } : {}} />
                
                <div className="bg-zinc-900/50 p-8 border border-white/5 hover:border-emerald-500/30 transition-all duration-500">
                  <div className={`flex items-center gap-4 mb-4 ${i % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
                    <span className="text-emerald-500 font-display font-black text-2xl">{item.year}</span>
                    <div className="p-2 bg-emerald-600/10 text-emerald-500">{item.icon}</div>
                  </div>
                  <h4 className="text-white font-black uppercase tracking-tight text-xl mb-2">{item.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Experience;