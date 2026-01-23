import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Maximize2, X, ChevronRight } from 'lucide-react';

// Replace these with your actual local imports
// import img1 from '../assets/gallery/img1.jpg'; 

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImg, setSelectedImg] = useState(null);

  const categories = ['all', 'bodybuilding', 'strength', 'lifestyle'];

  const images = [
    { id: 1, url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48", category: 'strength', span: "md:col-span-2 md:row-span-2", label: "Peak Performance" },
    { id: 2, url: "https://images.unsplash.com/photo-1583454110551-21f2fa2ec617", category: 'bodybuilding', span: "md:col-span-1 md:row-span-1", label: "Muscle Definition" },
    { id: 3, url: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5", category: 'bodybuilding', span: "md:col-span-1 md:row-span-1", label: "Heavy Sets" },
    { id: 4, url: "https://images.unsplash.com/photo-1594381898411-846e7d193883", category: 'lifestyle', span: "md:col-span-1 md:row-span-2", label: "Daily Grind" },
    { id: 5, url: "https://images.unsplash.com/photo-1571731956622-39bd49526b33", category: 'strength', span: "md:col-span-2 md:row-span-1", label: "Addis Training" },
  ];

  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-32 bg-zinc-950 relative">
      <div className="container mx-auto px-6">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <h2 className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2">
              <div className="w-8 h-px bg-emerald-500" /> Visual Proof
            </h2>
            <h3 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic leading-none">
              The <span className="text-transparent stroke-text">Lab</span>
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  filter === cat 
                  ? 'bg-emerald-600 border-emerald-600 text-white' 
                  : 'border-white/10 text-zinc-500 hover:border-emerald-500/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]"
        >
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImg(img)}
                className={`${img.span} relative group overflow-hidden bg-zinc-900 cursor-pointer border border-white/5`}
              >
                {/* Image Overlay Label */}
                <div className="absolute top-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                  <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-1">Category: {img.category}</p>
                  <p className="text-white font-display text-2xl font-black italic uppercase leading-none">{img.label}</p>
                </div>

                <img 
                  src={img.url} 
                  alt={img.label} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                />

                {/* The "Professional" Border Flash */}
                <div className="absolute inset-0 border-0 group-hover:border-[12px] border-emerald-600/10 transition-all duration-500 pointer-events-none" />
                
                {/* Icon Trigger */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <div className="bg-emerald-600 p-3 shadow-2xl">
                    <Maximize2 size={18} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View on Instagram CTA */}
        <div className="mt-16 flex justify-center">
          <a href="#" className="group flex items-center gap-4 text-zinc-500 hover:text-white transition-all duration-300">
            <Instagram size={20} className="group-hover:text-emerald-500 group-hover:rotate-12 transition-all" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Explore the full feed</span>
            <ChevronRight size={16} className="text-emerald-500 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>

      {/* 3. Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button 
              className="absolute top-10 right-10 text-white/50 hover:text-white transition"
              onClick={() => setSelectedImg(null)}
            >
              <X size={40} />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              src={selectedImg.url} 
              className="max-w-full max-h-[80vh] object-contain shadow-2xl border border-white/10"
            />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
              <p className="text-emerald-500 font-display text-4xl font-black italic uppercase italic">{selectedImg.label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;