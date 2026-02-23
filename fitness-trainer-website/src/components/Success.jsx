import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-10">
          <ShieldCheck className="text-emerald-500 w-10 h-10" />
        </div>

        <h1 className="text-6xl md:text-7xl font-display font-black text-white uppercase italic leading-none mb-6">
          PROTOCOL <br /> <span className="text-emerald-500">INITIATED</span>
        </h1>

        <p className="text-zinc-400 text-lg mb-12 font-medium tracking-wide leading-relaxed">
          Your dossier has been uploaded to the Command Centre. Check your <span className="text-white italic">inbox</span> for the Welcome Protocol and standby for WhatsApp contact.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-3 bg-white text-black px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all"
          >
            Back to Base <ChevronRight size={14} />
          </Link>
          
          <a 
            href="https://wa.me/YOUR_PHONE_NUMBER" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 border border-white/10 text-white px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
          >
            Direct Intel <MessageSquare size={14} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;