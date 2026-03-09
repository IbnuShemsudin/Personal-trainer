import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, Zap, Shield, Target, ArrowRight, 
  Play, Cpu, Database, Microscope, Fingerprint 
} from "lucide-react";

// Components
import TransformationSlider from "../components/TransformationSlider"; 
import BioAuditModal from "../components/BioAuditModal"; // Assuming you saved the previous component

const TransformationsPage = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cases = [
    { id: "002", name: "Sarah J.", role: "Executive", loss: "-12%", gain: "+3kg", duration: "8 Weeks", type: "Recomposition" },
    { id: "003", name: "Michael K.", role: "Athlete", loss: "-5%", gain: "+8kg", duration: "16 Weeks", type: "Hypertrophy" },
    { id: "004", name: "Elena R.", role: "Physician", loss: "-18%", gain: "+2kg", duration: "12 Weeks", type: "Metabolic Shift" },
    { id: "005", name: "David L.", role: "Engineer", loss: "-10%", gain: "+5kg", duration: "10 Weeks", type: "Strength Focus" }
  ];

  const handleOpenAudit = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
    // Note: Here you would ideally trigger your 'Admin Intel Feed' via a socket/API
    console.log(`SECURE_ACCESS: ${client.id} triggered.`);
  };

  return (
    <div className="bg-zinc-950 min-h-screen pt-24 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 border border-emerald-500/30 rounded-full mb-6"
          >
            <span className="text-emerald-500 font-black tracking-[0.3em] text-[10px] uppercase flex items-center gap-2">
              <Fingerprint size={12} /> Physical Audit • 2024 - 2026
            </span>
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.8] mb-8">
            The <span className="text-emerald-500">Proof</span> <br /> 
            Is In The <span className="text-transparent stroke-text">Data</span>
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-500 uppercase font-bold tracking-widest text-[10px] leading-relaxed">
            We don't do "Before and Afters." We perform biological upgrades. 
            View the verified documentation of our elite conditioning protocols.
          </p>
        </div>
      </section>

      {/* --- MAIN FEATURED CASE (Slider) --- */}
      <div className="border-y border-white/5 bg-zinc-900/20">
         <TransformationSlider />
      </div>

      {/* --- BIO-INTELLIGENCE VIDEO SECTION --- */}
      <section className="py-32 px-6 border-b border-white/5">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group cursor-pointer">
              <div className="aspect-video bg-zinc-900 border border-white/10 overflow-hidden relative">
                 <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070" 
                    alt="Protocol Video" 
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-emerald-500 flex items-center justify-center bg-zinc-950/80 group-hover:bg-emerald-600 transition-colors">
                        <Play className="text-emerald-500 group-hover:text-white fill-current" size={32} />
                    </div>
                 </div>
                 {/* Visual HUD Overlay */}
                 <div className="absolute top-4 left-4 font-mono text-[8px] text-emerald-500/50 uppercase leading-tight">
                    Rec: 00:42:12 <br /> FPS: 120 <br /> ISO: 400
                 </div>
                 <div className="absolute inset-x-0 h-[2px] bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)] top-0 animate-scan" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-emerald-600 p-6 hidden md:block shadow-2xl">
                 <Microscope className="text-white" size={32} />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-4xl font-black text-white italic uppercase leading-tight">
                Movement <span className="text-emerald-500">Analysis</span> <br /> & Biomechanic Audits
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed italic border-l-2 border-emerald-500/50 pl-6">
                Every transformation is backed by high-speed video analysis. We track joint angles, force production, and neural adaptation to ensure performance matches aesthetic results.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                 <div className="p-4 border border-white/5 bg-white/[0.02] flex items-center gap-4">
                    <Cpu size={20} className="text-emerald-500" />
                    <p className="text-white font-black uppercase text-[10px] tracking-widest">Neural Mapping</p>
                 </div>
                 <div className="p-4 border border-white/5 bg-white/[0.02] flex items-center gap-4">
                    <Database size={20} className="text-emerald-500" />
                    <p className="text-white font-black uppercase text-[10px] tracking-widest">Data Logging</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS OVERVIEW --- */}
      <section className="py-20 border-b border-white/5 bg-zinc-950">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Fat Purged", value: "1,240kg", icon: Activity },
            { label: "Muscle Mass", value: "850kg", icon: Zap },
            { label: "Success Rate", value: "98.4%", icon: Shield },
            { label: "Protocols", value: "150+", icon: Target },
          ].map((stat, i) => (
            <div key={i} className="group cursor-default">
              <stat.icon className="mx-auto text-emerald-500/20 group-hover:text-emerald-500 transition-colors duration-500 mb-4" size={24} />
              <p className="text-4xl md:text-5xl font-black text-white italic">{stat.value}</p>
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- HISTORICAL ARCHIVE GRID --- */}
      <section className="py-32 px-6 bg-grid-pattern">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-16">
             <div className="h-px flex-1 bg-white/10" />
             <h2 className="text-white font-black uppercase italic tracking-[0.3em] text-xs">Historical Archive</h2>
             <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {cases.map((client) => (
              <div key={client.id} className="group bg-zinc-950 p-12 hover:bg-zinc-900 transition-all duration-500 overflow-hidden relative">
                {/* Background ID Watermark */}
                <span className="absolute top-4 right-4 text-[60px] font-black text-white/[0.02] italic pointer-events-none group-hover:text-emerald-500/5 transition-colors">
                  {client.id}
                </span>

                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div>
                    <span className="text-emerald-500 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2">
                       <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                       CASE_FILE_{client.id}
                    </span>
                    <h4 className="text-4xl font-black text-white italic uppercase mt-2 group-hover:text-emerald-500 transition-colors">
                      {client.name}
                    </h4>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.3em] mt-1 italic">
                      {client.role} // <span className="text-white">{client.type}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest">Duration</span>
                    <p className="text-white font-display italic font-black text-xl leading-none">{client.duration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12 relative z-10">
                  <div className="border-l-2 border-emerald-500 pl-6 py-4 bg-emerald-500/[0.03]">
                    <p className="text-zinc-500 text-[9px] uppercase font-black tracking-widest mb-1">Fat Reduction</p>
                    <p className="text-5xl font-black text-white italic">{client.loss}</p>
                  </div>
                  <div className="border-l-2 border-white/10 pl-6 py-4">
                    <p className="text-zinc-500 text-[9px] uppercase font-black tracking-widest mb-1">Muscle Growth</p>
                    <p className="text-5xl font-black text-white italic">{client.gain}</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleOpenAudit(client)}
                  className="flex items-center gap-4 text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] group-hover:gap-8 transition-all relative z-10"
                >
                  Access Full Audit <ArrowRight size={14} className="group-hover:-rotate-45 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODAL INTEGRATION --- */}
      <BioAuditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        clientData={selectedClient} 
      />

      {/* --- CTA SECTION --- */}
      <section className="py-40 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="mb-8 flex justify-center"
          >
             <div className="bg-zinc-950 p-6 rounded-full shadow-2xl">
                <Target className="text-emerald-500" size={40} />
             </div>
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black text-zinc-950 italic uppercase tracking-tighter mb-12 leading-[0.85]">
            Secure Your <br /> Metabolic Future
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-zinc-950 text-white px-16 py-8 font-black uppercase tracking-[0.4em] text-sm italic hover:bg-white hover:text-black transition-all shadow-2xl"
          >
            Initiate Protocol
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default TransformationsPage;