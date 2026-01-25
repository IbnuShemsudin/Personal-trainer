import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Zap, Target, Activity, ArrowUpRight, X, CheckCircle2, Loader2 } from 'lucide-react';

const programs = [
  {
    id: '01',
    title: "Bodybuilding",
    desc: "Hypertrophy-focused training designed to maximize muscle volume and aesthetic symmetry.",
    icon: <Dumbbell className="w-8 h-8" />,
    tag: "Mass Gain",
    bgImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?q=80&w=2070" 
  },
  {
    id: '02',
    title: "Fat Shred",
    desc: "High-intensity metabolic conditioning to torch fat while preserving lean muscle mass.",
    icon: <Zap className="w-8 h-8" />,
    tag: "Weight Loss",
    bgImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070"
  },
  {
    id: '03',
    title: "Strength Elite",
    desc: "Powerlifting-based routines to break through plateaus and master the big compound lifts.",
    icon: <Target className="w-8 h-8" />,
    tag: "Power",
    bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070"
  },
  {
    id: '04',
    title: "Online Coaching",
    desc: "Personalized nutrition and workout plans delivered via our app, wherever you are.",
    icon: <Activity className="w-8 h-8" />,
    tag: "Global Access",
    bgImage: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2085"
  }
];

const Programs = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');

    // CONFIGURATION (REPLACE THESE)
    const BOT_TOKEN = "8490723136:AAGQSpa3sV7MuaQCE0xBFTNeU3WzGi12deY"; 
    const CHAT_ID = "8490723136";
    const MESSAGE = `🚀 *NEW APPLICATION*\n\n👤 *Name:* ${name}\n📞 *Contact:* ${phone}\n🏋️ *Program:* ${selectedProgram.title}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: MESSAGE,
          parse_mode: 'Markdown'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setSelectedProgram(null);
        }, 3000);
      } else {
        throw new Error();
      }
    } catch (error) {
      alert("Something went wrong. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="programs" className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background Polish */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-12">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-emerald-500" />
              <span className="text-emerald-500 font-black tracking-[0.5em] uppercase text-[10px]">Specialized Programs</span>
            </motion.div>
            <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-display font-black text-white uppercase italic leading-[0.8] tracking-tighter">
              SELECT YOUR <br /><span className="text-transparent stroke-text">WARFARE</span>
            </motion.h3>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-zinc-500 lg:max-w-xs border-l border-emerald-500/30 pl-8 py-2">
            Professional systems built for maximum physical transformation and metabolic efficiency.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 border border-white/5">
          {programs.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedProgram(p)}
              className="group relative h-[600px] flex flex-col justify-end p-10 overflow-hidden border-white/5 md:border-r last:border-r-0 cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-cover bg-center grayscale scale-110 group-hover:scale-100 group-hover:grayscale-0 transition-all duration-1000" style={{ backgroundImage: `url(${p.bgImage})` }} />
                <div className="absolute inset-0 bg-zinc-950/90 group-hover:bg-zinc-950/40 transition-all duration-700" />
                <div className="absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="relative z-20">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 mb-4 inline-block">{p.tag}</span>
                <h4 className="text-4xl font-display font-black text-white uppercase italic mb-4 group-hover:text-emerald-500 transition-colors">{p.title}</h4>
                <div className="max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-700">
                  <p className="text-zinc-300 text-sm mb-8 leading-relaxed">{p.desc}</p>
                </div>
                <button className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.3em] group-hover:gap-6 transition-all">
                  Enroll Now <ArrowUpRight size={18} className="text-emerald-500" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 w-0 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ENROLLMENT MODAL */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10">
            <div className="absolute inset-0 bg-black/98 backdrop-blur-lg" onClick={() => !isSubmitting && setSelectedProgram(null)} />
            
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-4xl bg-zinc-900 border border-emerald-500/20 grid lg:grid-cols-2 overflow-hidden shadow-2xl">
              {!isSubmitting && <button onClick={() => setSelectedProgram(null)} className="absolute top-5 right-5 text-zinc-500 hover:text-white z-10"><X size={24}/></button>}
              
              <div className="p-12 bg-zinc-800 border-r border-white/5">
                <h2 className="text-4xl font-display font-black text-white uppercase italic mb-8 leading-none">Apply for <br/><span className="text-emerald-500">{selectedProgram.title}</span></h2>
                <div className="space-y-6">
                  {["Custom Macros & Diet Plan", "Weekly Video Check-ins", "Training App Access"].map((item) => (
                    <div key={item} className="flex items-center gap-4 text-zinc-300 font-bold uppercase text-[10px] tracking-widest">
                      <CheckCircle2 size={18} className="text-emerald-500" /> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-12 flex flex-col justify-center">
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                    <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-6" />
                    <h3 className="text-3xl font-display font-black text-white uppercase italic">Sent Successfully</h3>
                    <p className="text-zinc-500 text-sm mt-4">I will reach out to you personally.</p>
                  </motion.div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-2 block">Full Name</label>
                      <input name="name" required className="w-full bg-zinc-950 border border-white/10 p-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700" placeholder="Abebe Kebede" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-2 block">WhatsApp / Phone</label>
                      <input name="phone" required className="w-full bg-zinc-950 border border-white/10 p-4 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700" placeholder="+251 ..." />
                    </div>
                    <button disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-white text-white hover:text-black py-5 font-black uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-3">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Application"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Programs;