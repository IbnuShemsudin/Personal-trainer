import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Droplets, Target, Wind, Zap } from 'lucide-react';

const BioAuditModal = ({ isOpen, onClose, clientData }) => {
  if (!clientData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-zinc-900 border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden"
          >
            {/* Technical Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">
                  Data Decryption // File: {clientData.id}
                </span>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid lg:grid-cols-2">
              {/* LEFT: VISUAL DATA */}
              <div className="p-8 border-r border-white/5">
                <h3 className="text-4xl font-black text-white italic uppercase mb-8">
                  {clientData.name} <span className="text-emerald-500 text-sm block not-italic font-mono tracking-widest mt-2">{clientData.type} Protocol</span>
                </h3>
                
                <div className="space-y-8">
                  {/* Metric Row 1 */}
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 flex items-center justify-center">
                       <Activity className="text-emerald-500" size={24} />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">Metabolic Rate</p>
                      <p className="text-2xl font-black text-white italic">+450 kcal/day (Base)</p>
                    </div>
                  </div>

                  {/* Metric Row 2 */}
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 flex items-center justify-center">
                       <Droplets className="text-emerald-500" size={24} />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">Insulin Sensitivity</p>
                      <p className="text-2xl font-black text-white italic">Optimized (Tier 1)</p>
                    </div>
                  </div>

                  {/* Metric Row 3 */}
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 flex items-center justify-center">
                       <Zap className="text-emerald-500" size={24} />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">Force Output</p>
                      <p className="text-2xl font-black text-white italic">+28% Torque Capacity</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: COMPARISON STATS */}
              <div className="p-8 bg-black/40">
                <p className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em] mb-10">Verification Log</p>
                
                <div className="space-y-12">
                   {/* Fat Chart Simulation */}
                   <div>
                     <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                        <span className="text-zinc-400">Adipose Concentration</span>
                        <span className="text-emerald-500">{clientData.loss} Reduction</span>
                     </div>
                     <div className="h-1 w-full bg-zinc-800">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5 }}
                          className="h-full bg-emerald-500" 
                        />
                     </div>
                   </div>

                   {/* Hypertrophy Chart Simulation */}
                   <div>
                     <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                        <span className="text-zinc-400">Lean Tissue Density</span>
                        <span className="text-emerald-500">{clientData.gain} Increase</span>
                     </div>
                     <div className="h-1 w-full bg-zinc-800">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 1.8 }}
                          className="h-full bg-emerald-500" 
                        />
                     </div>
                   </div>

                   {/* Technical Footer inside Modal */}
                   <div className="pt-10 border-t border-white/5">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="p-3 bg-emerald-500/10 border border-emerald-500/20">
                            <Wind className="text-emerald-500" size={20} />
                         </div>
                         <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-bold tracking-widest">
                            Audit performed via <span className="text-white">DEXA Scan Integration</span> and verified by EthioAesthetics Biometrics Unit.
                         </p>
                      </div>
                      <button className="w-full py-4 bg-emerald-600 text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-colors">
                        Download Full Bio-PDF
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BioAuditModal;