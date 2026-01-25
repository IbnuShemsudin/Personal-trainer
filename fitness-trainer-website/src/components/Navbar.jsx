import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Instagram, Send, Globe, ChevronRight, MessageSquare, Twitter } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Training', href: '#programs' },
    { name: 'Results', href: '#results' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed w-full z-[100]">
      {/* 1. Progress Bar */}
      <motion.div 
        className="h-[3px] bg-gradient-to-r from-emerald-600 to-emerald-400 origin-left fixed top-0 left-0 right-0 z-[110]"
        style={{ scaleX }}
      />

      {/* 2. Top Info Bar */}
      <div className={`hidden md:flex bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-2 transition-all duration-700 ${scrolled ? 'opacity-0 -translate-y-full' : 'opacity-100'}`}>
        <div className="container mx-auto px-6 flex justify-between text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">
          <div className="flex gap-8">
            <span className="flex items-center gap-2 group cursor-default">
              <Globe size={12} className="text-emerald-500 animate-pulse" /> 
              Addis Ababa, <span className="text-zinc-300">Ethiopia</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              Accepting New Clients
            </span>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Telegram</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">TikTok</a>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation */}
      <nav className={`transition-all duration-500 ${
        scrolled 
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-4' 
          : 'bg-transparent py-8'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo Branding */}
          <a href="#home" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="bg-emerald-600 text-white w-16 h-11 flex items-center justify-center font-black italic skew-x-[-12deg] group-hover:skew-x-0 group-hover:bg-white group-hover:text-black transition-all duration-500">
                HAYDI
              </div>
              <div className="absolute inset-0 border border-emerald-500/50 translate-x-1.5 translate-y-1.5 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-black text-white tracking-tighter leading-none uppercase">
                ETHIO<span className="text-emerald-500 italic">ASTHETICS</span>
              </span>
              <span className="text-[8px] uppercase text-zinc-500 tracking-[0.5em] font-black group-hover:text-emerald-500 transition-colors">Physical Excellence</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em] hover:text-emerald-500 transition-all relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
            
            {/* CTA Button Linked to Contact */}
            <a 
              href="#contact" 
              className="relative group overflow-hidden border border-emerald-500/50 px-8 py-3 transition-all duration-500 hover:border-emerald-500 block"
            >
              <span className="relative z-10 text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                Join The Elite <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden relative z-[130] text-white w-12 h-12 flex items-center justify-center bg-zinc-900 border border-white/10 overflow-hidden group" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} className="relative">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* 4. Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 h-screen bg-zinc-950 z-[120] flex flex-col lg:hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
               <span className="absolute -right-20 top-20 text-[40vh] font-black text-white/5 italic select-none">EF</span>
            </div>

            <div className="container mx-auto px-10 flex flex-col h-full pt-32 pb-12 relative z-10">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, i) => (
                  <motion.a 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-5xl md:text-7xl font-display font-black text-white uppercase italic hover:text-emerald-500 transition-all flex items-center gap-4 group"
                  >
                    <span className="text-emerald-500 text-xl font-sans not-italic group-hover:translate-x-2 transition-transform">0{i+1}</span>
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <a 
                  href="#contact" 
                  onClick={() => setIsOpen(false)}
                  className="bg-emerald-600 text-white text-center py-4 font-black uppercase tracking-widest text-xs block"
                >
                  Join The Elite Now
                </a>
              </motion.div>

              <div className="mt-auto grid grid-cols-2 gap-10 pt-10 border-t border-white/10">
                <div className="space-y-2">
                  <p className="text-emerald-500 font-black uppercase tracking-widest text-[10px]">Direct Contact</p>
                  <p className="text-white font-display text-lg uppercase tracking-tighter">+251 963 764285</p>
                </div>
                <div className="space-y-4">
                  <p className="text-emerald-500 font-black uppercase tracking-widest text-[10px]">Follow Us</p>
                  <div className="flex gap-6">
                     <a href="https://www.Instagram.com/@haydi_ethio_aesthetics" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer"><Instagram className="text-white hover:text-emerald-500 transition-colors" size={20} /></a>
                      <a href="https://t.me/@H_Man" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer"><Send className="text-white hover:text-emerald-500 transition-colors" size={20} /></a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;