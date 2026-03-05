import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Added for internal routing
import { Plus, Minus, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: "How soon will I see visible results?",
    answer: "Consistency is the variable. Typically, metabolic shifts occur within 14 days, with significant aesthetic hypertrophy or fat loss becoming undeniably visible between weeks 6 and 8 of a dedicated cycle."
  },
  {
    question: "Do I need prior experience in bodybuilding?",
    answer: "No. My systems are architected for all levels. Whether you're picking up your first dumbbell in Addis or preparing for a national stage, the programming scales to your current physiological threshold."
  },
  {
    question: "Is the nutrition plan based on local Ethiopian food?",
    answer: "Absolutely. I specialize in integrating local staples like Injera, Shiro, and lean local proteins into a high-performance macronutrient profile. You don't need imported supplements to build an elite physique."
  },
  {
    question: "How does the 1-on-1 coaching work?",
    answer: "It’s a digital-physical hybrid. We track your metrics via my dedicated portal, with weekly check-ins to adjust volume, intensity, and nutrition based on your body's bio-feedback."
  },
  {
    question: "What if I have a busy schedule?",
    answer: "My programs are designed for maximum efficiency. Even with a packed schedule, I can tailor your training to fit into 3-4 focused sessions per week without sacrificing results."
  },
  {
    question: "Can I combine this with other fitness activities?",
    answer: "Yes, but with caveats. Supplementary activities should complement your primary goals. I’ll help you structure cross-training without impeding recovery or hypertrophic adaptations."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left: Branding & CTA */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-emerald-500" />
                <span className="text-emerald-500 font-black tracking-[0.5em] uppercase text-[10px]">Information Hub</span>
              </div>
              <h3 className="text-6xl md:text-7xl font-display font-black text-white uppercase italic leading-[0.85] mb-8 tracking-tighter">
                FREQUENT <br />
                <span className="text-transparent stroke-text">INTEL</span>
              </h3>
              <p className="text-zinc-500 text-lg mb-10 max-w-sm font-light italic">
                Everything you need to know before stepping into the iron lab. No fluff, just the facts.
              </p>

              {/* Linked CTA Card */}
              <Link to="/contact" className="block group">
                <div className="p-8 bg-zinc-900 border border-white/5 relative overflow-hidden transition-all duration-500 group-hover:border-emerald-500/50 active:scale-[0.98]">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600 transition-all duration-500 group-hover:w-full group-hover:opacity-10 -z-10" />
                  <HelpCircle className="text-emerald-500 mb-4 group-hover:rotate-12 transition-transform" size={32} />
                  <h4 className="text-white font-black uppercase mb-2">Still have questions?</h4>
                  <p className="text-zinc-500 text-sm mb-6">DM me directly on Telegram or Instagram for a 5-minute consultation.</p>
                  <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                    Contact Now <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    className={`w-full text-left p-6 md:p-8 flex items-center justify-between transition-all duration-500 border active:scale-[0.99] md:active:scale-100 ${
                      activeIndex === i 
                      ? 'bg-zinc-900 border-emerald-500/50' 
                      : 'bg-zinc-900/30 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <span className={`text-lg md:text-xl font-black uppercase italic transition-colors ${
                      activeIndex === i ? 'text-emerald-500' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 ml-4 transition-transform duration-500 ${activeIndex === i ? 'rotate-180 text-emerald-500' : 'text-zinc-600'}`}>
                      {activeIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="p-8 bg-zinc-900/50 border-x border-b border-white/5 text-zinc-400 leading-relaxed font-light">
                          <div className="flex gap-4">
                            <MessageSquare className="text-emerald-500/20 shrink-0" size={20} />
                            <p className="text-sm md:text-base">{faq.answer}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;