import React, { useState } from 'react'; // Added useState
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, MapPin, Instagram, MessageCircle, Music2, Loader2, CheckCircle } from 'lucide-react';

const Contact = () => {
  // --- BACKEND INTEGRATION STATE ---
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    program: 'Bodybuilding',
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ fullName: '', phone: '', program: 'Bodybuilding', goals: '' });
      }
    } catch (error) {
      console.error("Transmission failed:", error);
      alert("System Offline. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center bg-zinc-900/30 border border-emerald-500/20 p-12 text-center"
                >
                  <CheckCircle size={48} className="text-emerald-500 mb-4" />
                  <h4 className="text-3xl font-display font-black text-white uppercase italic">Inquiry Received</h4>
                  <p className="text-zinc-500 mt-2 uppercase tracking-widest text-[10px]">I will contact you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 text-emerald-500 uppercase text-[10px] font-black tracking-[0.3em] underline underline-offset-4">Send another</button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/30 p-8 md:p-12 border border-white/5 backdrop-blur-sm"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-emerald-500 font-black tracking-widest">Full Name</label>
                    <input 
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      type="text" 
                      placeholder="Abebe Bikila" 
                      className="w-full bg-zinc-950 border border-white/10 px-4 py-4 text-white focus:border-emerald-500 outline-none transition" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase text-emerald-500 font-black tracking-widest">Phone Number</label>
                    <input 
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel" 
                      placeholder="+251..." 
                      className="w-full bg-zinc-950 border border-white/10 px-4 py-4 text-white focus:border-emerald-500 outline-none transition" 
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase text-emerald-500 font-black tracking-widest">Choose Program</label>
                    <select 
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-white/10 px-4 py-4 text-white focus:border-emerald-500 outline-none transition"
                    >
                      <option value="Bodybuilding">Bodybuilding</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Strength Coaching">Strength Coaching</option>
                      <option value="Online Coaching">Online Coaching</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase text-emerald-500 font-black tracking-widest">Your Goals</label>
                    <textarea 
                      name="goals"
                      value={formData.goals}
                      onChange={handleChange}
                      rows="4" 
                      placeholder="Tell me about your fitness goals..." 
                      className="w-full bg-zinc-950 border border-white/10 px-4 py-4 text-white focus:border-emerald-500 outline-none transition resize-none"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-white text-white hover:text-black py-5 font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>Send Application <Send size={18} /></>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;