import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, Lock, Cpu } from 'lucide-react';

const SystemBoot = ({ onComplete, userName }) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const steps = [
    "Initializing Neural Link...",
    "Decrypting Personnel File...",
    "Syncing Aesthetic Protocols...",
    "Access Granted: " + (userName || "RECRUIT")
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(timer);
        setTimeout(onComplete, 800); // Small delay before closing
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Background Matrix Grid Effect */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10 w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180, 270, 360] 
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="text-emerald-500"
          >
            <Cpu size={48} strokeWidth={1} />
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="h-1 w-full bg-zinc-900 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(loadingStep + 1) * 25}%` }}
              className="h-full bg-emerald-500"
            />
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.3em]">
            <AnimatePresence mode="wait">
              <motion.div
                key={loadingStep}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-3"
              >
                <span className="text-emerald-500 font-black">[{loadingStep + 1}/4]</span>
                <span className="text-zinc-400">{steps[loadingStep]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* HUD Data Fragments */}
        <div className="absolute -top-20 -left-20 opacity-20 pointer-events-none">
          <Activity className="text-emerald-500" size={120} />
        </div>
      </div>
    </motion.div>
  );
};

export default SystemBoot;