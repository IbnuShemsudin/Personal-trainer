import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { CheckCircle2, Award, Zap, Users, Target, MoveRight, X, Flame, Shield, Brain } from 'lucide-react';

// Import local image
import coachImage from '../assets/heroImage1.png'; 

// --- COUNTER COMPONENT ---
const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true }); // Starts when scrolled into view
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

const About = () => {
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const pillars = [
    { icon: <Flame />, title: "Intensity", desc: "We don't do 'easy'. Growth lives in the final two reps where most people quit." },
    { icon: <Shield />, title: "Longevity", desc: "Old-school grit meets new-school science. We train hard, but we train smart." },
    { icon: <Brain />, title: "Mindset", desc: "The body follows the mind. If the head isn't right, the iron won't move." }
  ];

  return (
    <section id="about" className="py-32 bg-zinc-950 relative overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute top-20 right-[-5%] pointer-events-none select-none">
        <h2 className="text-[18vw] font-display font-black text-white/[0.01] uppercase leading-none italic tracking-tighter">
          DISCIPLINE
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Visual Stack */}
          <div className="lg:col-span-5 relative order-2 lg:order-1 mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl -z-10" />
              
              <div className="relative z-10 overflow-hidden border border-white/5 group aspect-[4/5] bg-zinc-900">
                <motion.img 
                  style={{ y: imageY }}
                  src={coachImage} 
                  alt="Head Coach" 
                  className="w-full h-[120%] object-cover hover:grayscale transition-all duration-1000 scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-8 left-8">
                   <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     Elite Status
                   </p>
                   <p className="text-white font-display text-2xl italic font-black uppercase tracking-tighter">Head Coach</p>
                </div>
              </div>

              {/* Floating Stat Card with Counter */}
              <motion.div 
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute -bottom-6 -right-4 lg:-right-8 bg-zinc-900 border-l-4 border-emerald-500 p-6 lg:p-8 shadow-2xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col text-right">
                    <span className="text-emerald-500 font-display text-5xl font-black italic leading-none">
                      <AnimatedNumber value={6} />+
                    </span>
                    <span className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-bold mt-2">Years Exp</span>
                  </div>
                  <Target className="text-emerald-500 w-8 h-8 opacity-40" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT: Biography */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-emerald-500" />
                <h2 className="text-emerald-500 font-black tracking-[0.5em] uppercase text-[10px]">Head Coach • Founder</h2>
              </div>
              <h3 className="text-5xl md:text-8xl font-display font-black text-white uppercase italic leading-[0.85] mb-12 tracking-tighter">
                THE MIND <br /> 
                <span className="text-transparent stroke-text">BEHIND THE IRON</span>
              </h3>
            </motion.div>

            <p className="text-zinc-400 text-xl leading-relaxed mb-16 font-light max-w-2xl italic">
              "I don’t just count reps; I make <span className="text-white font-medium italic">every rep count</span>. Results are not given, they are earned through cold, hard discipline."
            </p>

            {/* Achievement Grid with Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 mb-16">
                <div className="group flex items-center gap-5">
                  <div className="p-3 bg-zinc-900 border border-white/5 text-emerald-500"><Award /></div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm mb-1 italic">
                        Elite Status
                    </h4>
                    <p className="text-zinc-600 text-[9px] uppercase tracking-widest">Global Standards</p>
                  </div>
                </div>

                <div className="group flex items-center gap-5">
                  <div className="p-3 bg-zinc-900 border border-white/5 text-emerald-500"><Users /></div>
                  <div>
                    <h4 className="text-white font-black uppercase text-sm mb-1 italic">
                        <AnimatedNumber value={500} />+ Results
                    </h4>
                    <p className="text-zinc-600 text-[9px] uppercase tracking-widest">Transformations</p>
                  </div>
                </div>
            </div>

            {/* Signature Area */}
            <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center gap-12">
              <div className="flex flex-col">
                <span className="text-white font-display text-4xl font-black italic tracking-tighter uppercase leading-none">Ethio Aesthetics</span>
                <span className="text-emerald-600 text-[9px] uppercase tracking-[0.6em] font-black mt-3 text-center sm:text-left">Addis Ababa</span>
              </div>
              
              <motion.button 
                whileHover={{ x: 10 }}
                onClick={() => setIsPhilosophyOpen(true)}
                className="group flex items-center gap-6 text-white bg-white/5 hover:bg-emerald-600/10 px-8 py-4 border border-white/10 hover:border-emerald-500/50 transition-all duration-500"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Learn My Philosophy</span>
                <MoveRight size={20} className="text-emerald-500" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal remains the same... */}
      <AnimatePresence>
        {isPhilosophyOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/98 backdrop-blur-xl" onClick={() => setIsPhilosophyOpen(false)} />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative bg-zinc-900 border border-white/10 p-12 max-w-4xl w-full">
              <button onClick={() => setIsPhilosophyOpen(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><X size={32}/></button>
              <h2 className="text-4xl font-display font-black text-white uppercase italic mb-12">The <span className="text-emerald-500">Ethio Aesthetics</span> Pillars</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {pillars.map((p, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/5 hover:border-emerald-500/50 transition-colors">
                    <div className="text-emerald-500 mb-6">{p.icon}</div>
                    <h4 className="text-white font-black uppercase text-lg mb-4">{p.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;