import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Added for multi-page redirect
import { 
  Dumbbell, Zap, Target, Activity, ArrowUpRight, 
  X, CheckCircle2, Loader2, Crown 
} from 'lucide-react';

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
  const navigate = useNavigate(); // Initialize navigation
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const fullName = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email'); 
    const userGoals = formData.get('goals'); 

    try {
      // 1. Send to MongoDB Backend
      await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email, 
          program: selectedProgram.title,
          goals: userGoals 
        })
      });

      // 2. Send to Telegram
      // NOTE: Ensure CHAT_ID is your personal ID (e.g. 123456789), not the bot token.
      const BOT_TOKEN = "8490723136:AAGQSpa3sV7MuaQCE0xBFTNeU3WzGi12deY"; 
      const CHAT_ID = "8490723136"; 
      const MESSAGE = `🚀 *NEW APPLICATION*\n\n👤 *Name:* ${fullName}\n📞 *Contact:* ${phone}\n📧 *Email:* ${email}\n🏋️ *Program:* ${selectedProgram.title}\n🎯 *Goals:* ${userGoals}`;

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: MESSAGE, parse_mode: 'Markdown' })
      });

      // 3. Navigate to Success Page
      navigate('/success');

    } catch (error) {
      alert("Submission error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="programs" className="py-32 bg-[#050505] relative overflow-hidden">
      
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-emerald-500" />
              <span className="text-emerald-500 font-bold tracking-[0.6em] uppercase text-[10px]">Specialized Warfare</span>
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              className="text-7xl md:text-9xl font-display font-black text-white uppercase italic leading-[0.75] tracking-tighter"
            >
              SELECT YOUR <br /><span className="text-transparent stroke-text opacity-30">PROGRAM</span>
            </motion.h3>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="lg:max-w-xs border-l-2 border-emerald-500/30 pl-8 py-4">
            <p className="text-zinc-500 text-sm font-medium leading-relaxed tracking-wide">
              Professional training systems built for maximum physical transformation and metabolic efficiency.
            </p>
          </motion.div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 border border-white/5">
          {programs.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedProgram(p)}
              className="group relative h-[650px] flex flex-col justify-end p-12 overflow-hidden border-white/5 md:border-r last:border-r-0 cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale scale-110 group-hover:scale-100 group-hover:grayscale-0 transition-all duration-[1500ms]" 
                  style={{ backgroundImage: `url(${p.bgImage})` }} 
                />
                <div className="absolute inset-0 bg-[#050505]/90 group-hover:bg-[#050505]/40 transition-all duration-700" />
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="relative z-20 transition-transform duration-500 group-hover:-translate-y-4">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 mb-6 inline-block border border-emerald-500/20">
                  {p.tag}
                </span>
                
                <h4 className="text-4xl font-display font-black text-white uppercase italic mb-6 leading-none group-hover:text-emerald-400 transition-colors">
                  {p.title}
                </h4>

                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out">
                  <p className="text-zinc-400 text-sm mb-8 leading-relaxed overflow-hidden">
                    {p.desc}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-[0.4em]">
                  <span className="group-hover:text-emerald-400 transition-colors">Enroll Now</span>
                  <div className="h-[1px] w-8 bg-white/20 group-hover:w-16 group-hover:bg-emerald-500 transition-all duration-500" />
                  <ArrowUpRight size={18} className="text-emerald-500" />
                </div>
              </div>

              {/* Architectural ID */}
              <span className="absolute top-10 right-10 text-white/5 font-display font-black text-8xl group-hover:text-emerald-500/10 transition-colors">
                {p.id}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 lg:p-12"
          >
            <div className="absolute inset-0 bg-black/98 backdrop-blur-xl" onClick={() => !isSubmitting && setSelectedProgram(null)} />
            
            <motion.div 
              initial={{ scale: 0.95, y: 30 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 30 }} 
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 grid lg:grid-cols-2 overflow-hidden shadow-2xl shadow-emerald-500/5"
            >
              {!isSubmitting && (
                <button onClick={() => setSelectedProgram(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-emerald-500 z-10 transition-all hover:rotate-90">
                  <X size={32} strokeWidth={1}/>
                </button>
              )}
              
              <div className="p-16 bg-[#0f0f0f] border-r border-white/5 relative">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 text-emerald-500 mb-8 bg-emerald-500/5 border border-emerald-500/20 px-3 py-1">
                    <Crown size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Intake Status: Open</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-display font-black text-white uppercase italic mb-10 leading-none">
                    JOIN <br/><span className="text-emerald-500">{selectedProgram.title}</span>
                  </h2>
                  <div className="space-y-8">
                    {["Custom Nutrition Strategy", "Weekly Video Check-ins", "Exclusive App Access"].map((item) => (
                      <div key={item} className="flex items-center gap-5 text-zinc-400 font-bold uppercase text-[10px] tracking-[0.3em]">
                        <CheckCircle2 size={20} className="text-emerald-500 shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-16 flex flex-col justify-center bg-[#0a0a0a]">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="group">
                    <label className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500 mb-2 block group-focus-within:text-emerald-500 transition-colors">Your Full Name</label>
                    <input 
                      name="name" 
                      required 
                      autoComplete="off"
                      className="w-full bg-transparent border-b border-white/10 p-3 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-800 text-xl font-display uppercase italic" 
                      placeholder="Abebe Kebede" 
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500 mb-2 block group-focus-within:text-emerald-500 transition-colors">Email Address</label>
                    <input 
                      name="email" 
                      type="email"
                      required 
                      autoComplete="off"
                      className="w-full bg-transparent border-b border-white/10 p-3 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-800 text-xl font-display uppercase italic" 
                      placeholder="RECRUIT@WARFARE.COM" 
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500 mb-2 block group-focus-within:text-emerald-500 transition-colors">WhatsApp Contact</label>
                    <input 
                      name="phone" 
                      required 
                      autoComplete="off"
                      className="w-full bg-transparent border-b border-white/10 p-3 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-800 text-xl font-display uppercase italic" 
                      placeholder="+251 ..." 
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500 mb-2 block group-focus-within:text-emerald-500 transition-colors">Your Fitness Goals</label>
                    <textarea 
                      name="goals" 
                      required 
                      rows="2"
                      className="w-full bg-transparent border-b border-white/10 p-3 text-white focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-800 text-lg font-display uppercase italic resize-none" 
                      placeholder="E.G. LOSE 10KG, BUILD MUSCLE..." 
                    />
                  </div>

                  <button 
                    disabled={isSubmitting} 
                    className="group relative w-full bg-emerald-600 text-white py-6 font-black uppercase tracking-[0.4em] text-xs transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
                    <span className="relative z-10 group-hover:text-black flex items-center justify-center gap-3">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit Application"}
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Programs;