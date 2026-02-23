import React from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom'; // Import this

const TelegramFloat = () => {
  const location = useLocation();
  const telegramHandle = "YOUR_USERNAME"; 

  // HIDE LOGIC: If path starts with /admin, do not render
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <motion.a
      href={`https://t.me/${telegramHandle}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.1, x: -5 }}
      className="fixed bottom-8 right-8 z-[500] flex items-center gap-3 group"
    >
      <span className="bg-zinc-900 border border-emerald-500/30 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md shadow-xl">
        Establish Comms
      </span>

      <div className="bg-emerald-500 text-black p-4 rounded-none shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400 relative">
        <Send size={24} />
        {/* Subtle inner glow for that 'active' look */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="absolute inset-0 rounded-none bg-emerald-500/20 animate-ping -z-10" />
    </motion.a>
  );
};

export default TelegramFloat;