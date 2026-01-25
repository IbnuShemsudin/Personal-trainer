import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Zap, ArrowRight, X } from 'lucide-react';

// IMPORT YOUR LOCAL FILES HERE
import heroImage from '../assets/heroImage1.png';
import backgroundVideo from '../assets/background.mp4';
// import modalVideo from './assets/promo-video.mp4';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef(null);

  // Function to trigger Native Fullscreen
  const handleOpenVideo = () => {
    setIsVideoOpen(true);
    setTimeout(() => {
      if (videoRef.current) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          videoRef.current.webkitRequestFullscreen(); // Safari support
        }
      }
    }, 100);
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center bg-zinc-950 overflow-hidden pt-24 lg:pt-32">
      
      {/* 1. MAIN HERO LAYOUT */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        
        {/* LEFT: Local Image Side - Updated for full height on mobile */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="relative w-full lg:w-5/12 h-[65vh] md:h-[75vh] lg:h-screen overflow-hidden border-r border-white/5"
        >
          <img 
            src={heroImage}
            alt="Elite Trainer" 
            className="w-full h-full object-cover hover:grayscale transition-all duration-1000 scale-105"
          />
          {/* Enhanced Gradient for Mobile Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent lg:hidden" />
          
          <div className="absolute bottom-20 left-10 hidden lg:block">
             <div className="bg-emerald-600 px-6 py-2 skew-x-[-12deg]">
                <p className="text-white font-black uppercase tracking-[0.3em] text-[10px] skew-x-[12deg]">
                  Lead Trainer • Haydi
                </p>
             </div>
          </div>
        </motion.div>

        {/* RIGHT: Content & Local Background Video */}
        <div className="relative w-full lg:w-7/12 flex items-center px-6 md:px-16 lg:px-24 py-20 lg:py-0">
          
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-20 lg:opacity-30"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-zinc-950/60" />
          </div>

          <div className="relative z-10 w-full pt-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-emerald-600/10 border border-emerald-500/20 px-4 py-2 mb-8"
            >
              <Zap size={14} className="text-emerald-500 fill-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
                Elite Performance Coaching
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-black text-white leading-[0.8] uppercase tracking-tighter italic mb-4">
                LEVEL <span className="text-emerald-500">UP</span>
              </h1>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-black stroke-text leading-[0.8] uppercase tracking-tighter text-transparent">
                YOUR LEGACY
              </h1>
            </motion.div>

            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <a 
                href="#contact" 
                className="group bg-emerald-600 hover:bg-white text-white hover:text-black px-10 py-5 font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-4 border border-emerald-600"
              >
                Start Training
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              
              {/* VIDEO POPUP TRIGGER: Now uses handleOpenVideo */}
              <button 
                onClick={handleOpenVideo}
                className="group flex items-center gap-4 text-white uppercase font-black tracking-widest text-xs"
              >
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-emerald-500 transition-all relative">
                  <Play size={16} fill="white" className="ml-1" />
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 scale-0 group-hover:scale-125 transition-transform duration-500" />
                </div>
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. VIDEO MODAL (FULL SCREEN POP-UP) */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-emerald-500 z-[220] transition-colors p-2 bg-black/50 rounded-full"
            >
              <X size={32} />
            </button>
            
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full h-full flex items-center justify-center bg-black"
            >
              <video 
                ref={videoRef}
                controls 
                autoPlay 
                playsInline
                webkit-playsinline="true"
                className="w-full h-full object-contain"
                onEnded={() => setIsVideoOpen(false)}
              >
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Hero;