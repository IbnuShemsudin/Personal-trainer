import React from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const TelegramFloat = () => {
  const location = useLocation();
  const telegramHandle = "Haydi982"; // Removed @ for the URL string

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[500]">
      <motion.a
        href={`https://t.me/${telegramHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center group"
      >
        {/* The "Pro" Tooltip: Slides out from the left */}
        <AnimatePresence>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileHover={{ x: -12, opacity: 1 }}
            className="absolute right-full mr-4 pointer-events-none hidden md:block"
          >
            <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-emerald-500/20 px-4 py-2 flex flex-col items-end shadow-2xl">
              <span className="text-emerald-500 text-[8px] font-black uppercase tracking-[0.4em] mb-0.5">Direct Line</span>
              <span className="text-white text-[11px] font-display font-bold uppercase italic italic tracking-wider">Connect via Telegram</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* The Main Button Core */}
        <div className="relative flex items-center justify-center">
          {/* Sonar Pulse Rings */}
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping group-hover:animate-none opacity-50" />
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-pulse scale-150" />

          {/* Icon Container */}
          <div className="relative h-14 w-14 md:h-16 md:w-16 bg-[#050505] border border-emerald-500/40 flex items-center justify-center overflow-hidden group-hover:border-emerald-400 transition-colors shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            
            {/* Glossy Overlay */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5 skew-y-[-10deg] -translate-y-full group-hover:translate-y-[-20%] transition-transform duration-500" />
            
            {/* Icon Switch: Swaps Send for MessageSquare on hover */}
            <div className="relative z-10 text-emerald-500 group-hover:text-white transition-colors duration-300">
              <motion.div
                initial={false}
                animate={{ rotate: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Send size={26} strokeWidth={1.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.div>
            </div>

            {/* Background Hover Flash */}
            <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>

          {/* Bottom Badge (Mobile Only) */}
          <div className="absolute -bottom-2 md:hidden bg-emerald-500 text-[8px] font-black px-2 py-0.5 text-black uppercase tracking-tighter">
            Online
          </div>
        </div>
      </motion.a>
    </div>
  );
};

export default TelegramFloat;