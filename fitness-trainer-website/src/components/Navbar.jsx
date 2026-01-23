import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, Instagram, Send, Globe, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Training', href: '#programs' },
    { name: 'Transformations', href: '#results' },
    { name: 'Experience', href: '#about' },
  ];

  return (
    <header className="fixed w-full z-[100]">
      {/* 1. Subtle Reading Progress Bar */}
      <motion.div 
        className="h-[2px] bg-emerald-500 origin-left fixed top-0 left-0 right-0 z-[110]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 2. Top Info Bar (Hidden on Mobile) */}
      <div className={`hidden md:flex bg-black border-b border-white/5 py-2 transition-all duration-500 ${scrolled ? 'opacity-0 -translate-y-full' : 'opacity-100'}`}>
        <div className="container mx-auto px-6 flex justify-between text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Globe size={12} className="text-emerald-500" /> Addis Ababa, Ethiopia</span>
            <span>Available for Online Coaching</span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <span className="text-zinc-800">|</span>
            <a href="#" className="hover:text-white transition">Telegram</a>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation */}
      <nav className={`transition-all duration-500 ${
        scrolled 
          ? 'ethio-glass py-3' 
          : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Professional Logo Branding */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
               <div className="bg-emerald-600 text-white w-15 h-12 flex items-center justify-center font-black italic skew-x-[-10deg] group-hover:skew-x-0 transition-transform duration-300">
                HAYDI
              </div>
              <div className="absolute inset-0 border border-emerald-500 translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-black text-white tracking-tighter leading-none uppercase">
                ETHIO<span className="text-emerald-500 italic">ASTHETICS</span>
              </span>
              <span className="text-[9px] uppercase text-emerald-500/80 tracking-[0.4em] font-black">Elite Performance</span>
            </div>
          </div>

          {/* Desktop Links with Magnetic Underline */}
          <div className="hidden lg:flex items-center space-x-12">
            <div className="flex space-x-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] hover:text-white transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-emerald-500 transition-all group-hover:w-full" />
                </a>
              ))}
            </div>
            
            <button className="relative overflow-hidden group bg-white px-8 py-3 rounded-none transition-all duration-300">
              <span className="relative z-10 text-black text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                Get Started <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white w-10 h-10 flex items-center justify-center border border-white/10" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* 4. Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 90% 10%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 h-screen bg-zinc-950 z-[120] flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-20">
               <span className="text-2xl font-black text-white italic">EF</span>
               <button onClick={() => setIsOpen(false)} className="text-white border border-white/20 p-2 rounded-full">
                 <X size={24} />
               </button>
            </div>

            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.a 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-6xl font-display font-black text-white uppercase italic hover:text-emerald-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-4">
              <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Transform Today</p>
              <div className="flex gap-8">
                <Instagram className="text-white hover:text-emerald-500 transition cursor-pointer" />
                <Send className="text-white hover:text-emerald-500 transition cursor-pointer" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;