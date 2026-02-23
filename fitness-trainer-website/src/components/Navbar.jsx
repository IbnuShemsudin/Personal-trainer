import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Instagram, Send, Globe, ChevronRight, 
  Shield, User, LogOut, Power 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  // Get User Session from LocalStorage
  const user = JSON.parse(localStorage.getItem('user'));

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

  const handleLogout = () => {
    localStorage.clear(); // Wipe Vault session
    setIsOpen(false);
    navigate('/login');
    window.location.reload(); // Ensures UI resets immediately
  };

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Training', href: '/#programs' },
    { name: 'Results', href: '/#results' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed w-full z-[100]">
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
          </div>
          <div className="flex gap-6 items-center">
             {user && (
               <span className="text-emerald-500 border-r border-white/10 pr-6 mr-2 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                 Active Session: <span className="text-white">{user.name}</span>
               </span>
             )}
            <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Telegram</a>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation */}
      <nav className={`transition-all duration-500 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-4 group">
            <div className="bg-emerald-600 text-white w-16 h-11 flex items-center justify-center font-black italic skew-x-[-12deg] group-hover:skew-x-0 transition-all duration-500 text-sm">
              HAYDI
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-black text-white tracking-tighter uppercase">
                ETHIO<span className="text-emerald-500 italic">ASTHETICS</span>
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <div className="flex space-x-8 border-r border-white/10 pr-10">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em] hover:text-emerald-500 transition-all py-2">
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-8">
              {user ? (
                <div className="flex items-center gap-6">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors bg-emerald-500/10 px-3 py-2 border border-emerald-500/20">
                      <Shield size={14} /> Command
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest border border-red-500/20 px-4 py-2 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Power size={12} /> Terminate
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.3em] flex items-center gap-2 transition-colors">
                  <User size={14} className="text-emerald-500" /> Login
                </Link>
              )}
              
              <a href="/#contact" className="relative group overflow-hidden border border-emerald-500/50 px-8 py-3 transition-all duration-500 hover:border-emerald-500 block">
                <span className="relative z-10 text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                  Join Elite <ChevronRight size={14} />
                </span>
                <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>
            </div>
          </div>

          <button className="lg:hidden relative z-[130] text-white w-12 h-12 flex items-center justify-center bg-zinc-900 border border-white/10" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* 4. Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 h-screen bg-zinc-950 z-[120] flex flex-col lg:hidden">
            <div className="container mx-auto px-10 flex flex-col h-full pt-32 pb-12 relative z-10">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link, i) => (
                  <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-5xl font-display font-black text-white uppercase italic hover:text-emerald-500 transition-all">
                    {link.name}
                  </a>
                ))}
                
                <div className="pt-10 border-t border-white/10">
                  {user ? (
                    <div className="space-y-6">
                      <div className="text-emerald-500 font-black text-xl italic">{user.name} // {user.role.toUpperCase()}</div>
                      {user.role === 'admin' && <Link to="/admin" onClick={() => setIsOpen(false)} className="text-white text-3xl font-display font-black uppercase italic block underline underline-offset-8">Admin Vault</Link>}
                      <button onClick={handleLogout} className="text-red-500 text-3xl font-display font-black uppercase italic flex items-center gap-4 hover:text-white transition-colors"><LogOut /> Terminate Session</button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-5xl font-display font-black text-zinc-700 uppercase italic hover:text-emerald-500">Personnel Login</Link>
                  )}
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