import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Added for multi-page navigation
import { Instagram, Send, MapPin, Mail, Phone, ArrowUp, Twitter, Shield } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <Send size={18} />, href: "#", label: "Telegram" },
    { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { name: "Programs", href: "/#programs" },
    { name: "The Lab", href: "/#gallery" },
    { name: "Experience", href: "/#experience" },
    { name: "FAQ", href: "/#faq" }
  ];

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 p-10 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[20vw] font-display font-black italic leading-none uppercase">ETHIO</h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-display text-3xl font-black italic uppercase tracking-tighter mb-6">
              ETHIO <span className="text-emerald-500 italic">ASTHETICS</span>
            </h4>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-xs italic">
              "Precision coaching for the dedicated few. We don't build bodies; we build discipline through iron and science."
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation - Updated for React Router */}
          <div>
            <h5 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-8">Navigation</h5>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  {/* We use <a> here because we are targeting ID anchors on the home page */}
                  <a href={link.href} className="text-zinc-500 hover:text-emerald-500 text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-emerald-500 group-hover:w-4 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Intel */}
          <div>
            <h5 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-8">Base of Operations</h5>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-zinc-500">
                <MapPin className="text-emerald-500 shrink-0" size={18} />
                <span className="text-sm font-medium">Sar bet, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-4 text-zinc-500">
                <Mail className="text-emerald-500 shrink-0" size={18} />
                <span className="text-sm font-medium">coach@Haydi.com</span>
              </li>
              <li className="flex items-center gap-4 text-zinc-500">
                <Phone className="text-emerald-500 shrink-0" size={18} />
                <span className="text-sm font-medium">+251 900 000 000</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Join */}
          <div>
            <h5 className="text-white font-black uppercase text-[10px] tracking-[0.4em] mb-8">Join the Vanguard</h5>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-4">Get training updates & local diet tips</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-zinc-900 border border-white/10 px-4 py-4 text-[10px] font-black text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-2 hover:bg-emerald-500 transition-colors">
                <Send size={14} />
              </button>
            </form>
            
            {/* Hidden Admin Access */}
            <Link 
              to="/admin" 
              className="mt-8 flex items-center gap-2 text-zinc-800 hover:text-zinc-600 transition-colors text-[9px] font-black uppercase tracking-widest"
            >
              <Shield size={10} /> Secure Portal
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.5em]">
            © {currentYear} ETHIOASTHETICS. DESIGNED BY Abdurezak.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-4 text-zinc-500 hover:text-white transition-all"
          >
            <span className="text-[9px] font-black uppercase tracking-widest">Return to Summit</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-emerald-500 transition-all">
              <ArrowUp size={16} className="text-emerald-500 group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;