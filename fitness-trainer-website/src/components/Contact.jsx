import React from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, MapPin, Instagram, MessageCircle, Music2 } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-zinc-950 relative">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-emerald-500 font-bold tracking-[0.5em] uppercase text-xs mb-4"
          >
            Get Started
          </motion.h2>
          <h3 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic leading-none">
            Ready to <span className="text-transparent stroke-text">Evolve?</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
              Spaces for 1-on-1 coaching are limited. Fill out the form to secure your spot for a free consultation.
            </p>

            <div className="space-y-8">
              {/* Phone - Link opens dialer */}
              <a href="tel:+251963764285" className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Call Directly</p>
                  <p className="text-white font-display text-xl">+251 963764285</p>
                </div>
              </a>

              {/* Location - Link opens Google Maps */}
              <a href="https://maps.google.com/?q=SweatBox+SarBet+Branch+Addis+Ababa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Location</p>
                  <p className="text-white font-display text-xl">SweatBox SarBet Branch, Addis Ababa, ET</p>
                </div>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/haydi_ethio_aesthetics" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Instagram size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Instagram</p>
                  <p className="text-white font-display text-xl">@haydi_ethio_aesthetics</p>
                </div>           
              </a>

              {/* Telegram */}
              <a href="https://t.me/@H_Man" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Telegram</p>
                  <p className="text-white font-display text-xl">t.me/Telegram</p>
                </div>           
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@ethioaesthetics" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Music2 size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">TikTok</p>
                  <p className="text-white font-display text-xl">@ethioaesthetics</p>
                </div>           
              </a>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div className="lg:col-span-7">
            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/30 p-8 md:p-12 border border-white/5 backdrop-blur-sm"
            >
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-emerald-500 font-black tracking-widest">Full Name</label>
                <input type="text" placeholder="Abebe Bikila" className="w-full bg-zinc-950 border border-white/10 px-4 py-4 text-white focus:border-emerald-500 outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase text-emerald-500 font-black tracking-widest">Phone Number</label>
                <input type="tel" placeholder="+251..." className="w-full bg-zinc-950 border border-white/10 px-4 py-4 text-white focus:border-emerald-500 outline-none transition" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase text-emerald-500 font-black tracking-widest">Choose Program</label>
                <select className="w-full bg-zinc-950 border border-white/10 px-4 py-4 text-white focus:border-emerald-500 outline-none transition">
                  <option>Bodybuilding</option>
                  <option>Weight Loss</option>
                  <option>Strength Coaching</option>
                  <option>Online Coaching</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase text-emerald-500 font-black tracking-widest">Your Goals</label>
                <textarea rows="4" placeholder="Tell me about your fitness goals..." className="w-full bg-zinc-950 border border-white/10 px-4 py-4 text-white focus:border-emerald-500 outline-none transition resize-none"></textarea>
              </div>

              <div className="md:col-span-2">
                <button className="w-full bg-emerald-600 hover:bg-white text-white hover:text-black py-5 font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3">
                  Send Application <Send size={18} />
                </button>
              </div>
            </motion.form>
          </div>

        </div>
      </div>

      {/* Footer Minimal */}
      <footer className="mt-32 border-t border-white/5 py-10 text-center">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.5em] font-bold">
          &copy; 2026 EthioAsthetics. Built for the disciplined.
        </p>
      </footer>
    </section>
  );
};

export default Contact;