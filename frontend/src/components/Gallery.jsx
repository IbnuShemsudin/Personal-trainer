import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Maximize2, X, ChevronRight, Camera, Loader2, Plus, ArrowUpRight } from 'lucide-react';

// 1. IMPORT YOUR LOCAL IMAGES HERE
import img1 from '../assets/heroimage1.png';
import img2 from '../assets/heroimage1.png';
import img3 from '../assets/heroimage1.png';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImg, setSelectedImg] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = ['all', 'bodybuilding', 'strength', 'lifestyle'];

  // 2. IMAGE DATA - Optimized for a high-end Bento Grid
  const images = [
    { id: 1, url: img1, category: 'strength', span: "md:col-span-2 md:row-span-2", label: "Limitless Power" },
    { id: 2, url: img2, category: 'bodybuilding', span: "md:col-span-1 md:row-span-1", label: "Aesthetic Core" },
    { id: 3, url: img3, category: 'bodybuilding', span: "md:col-span-1 md:row-span-2", label: "The Grind" },
    { id: 4, url: "https://images.unsplash.com/photo-1594381898411-846e7d193883", category: 'lifestyle', span: "md:col-span-1 md:row-span-1", label: "Daily Ritual" },
    { id: 5, url: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf", category: 'lifestyle', span: "md:col-span-2 md:row-span-1", label: "Addis Strength" },
    { id: 6, url: "https://images.unsplash.com/photo-1517960413843-1b8f5d3b1f9c", category: 'strength', span: "md:col-span-1 md:row-span-1", label: "Iron Resolve" },  
  ];

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const allFiltered = filter === 'all' ? images : images.filter(img => img.category === filter);
  const filteredImages = allFiltered.slice(0, visibleCount);
  const hasMore = visibleCount < allFiltered.length;

  return (
    <section id="gallery" className="py-24 md:py-40 bg-[#050505] relative overflow-hidden">
      
      {/* Background Decor - Scanning lines effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:100%_40px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-emerald-500" />
              <span className="text-emerald-500 font-bold tracking-[0.6em] uppercase text-[10px]">Vault Records / 003</span>
            </motion.div>
            <h3 className="text-6xl md:text-9xl font-display font-black text-white uppercase italic leading-[0.75] tracking-tighter">
              THE <span className="text-transparent stroke-text opacity-30">IRON</span> LAB
            </h3>
          </div>

          <div className="flex flex-wrap gap-1 bg-white/[0.02] p-1.5 border border-white/5 backdrop-blur-3xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setVisibleCount(4); }}
                className={`px-6 md:px-10 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                  filter === cat 
                  ? 'bg-emerald-600 text-white' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Professional Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[320px]">
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedImg(img)}
                className={`${img.span} relative group overflow-hidden bg-zinc-900 border border-white/10 cursor-none`}
              >
                {/* 1. Shimmer Loading State */}
                {!loadedImages[img.id] && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0a0a0a]">
                    <Loader2 className="text-emerald-500 animate-spin" size={24} />
                  </div>
                )}

                {/* Technical Overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 p-10 flex flex-col justify-end">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="w-8 h-[1px] bg-emerald-500" />
                       <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">{img.category}</p>
                    </div>
                    <h4 className="text-white font-display text-4xl font-black italic uppercase leading-none mb-6">{img.label}</h4>
                    <div className="flex items-center gap-2 text-white/50 text-[9px] uppercase font-bold tracking-widest">
                       <Maximize2 size={12} /> Click to Expand
                    </div>
                  </div>
                </div>

                {/* Hover Scale Effect */}
                <img 
                  src={img.url} 
                  alt={img.label} 
                  onLoad={() => handleImageLoad(img.id)}
                  className={`w-full h-full object-cover transition-all duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) ${loadedImages[img.id] ? 'opacity-40 lg:opacity-30 group-hover:opacity-100 group-hover:scale-110' : 'opacity-0'} grayscale group-hover:grayscale-0`}
                />

                {/* Top Corner Badge (Aesthetic Only) */}
                <div className="absolute top-6 left-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="bg-emerald-600 text-white text-[8px] font-black px-2 py-1 uppercase tracking-tighter">
                     Live_Feed_0{img.id}
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button - Luxury Style */}
        {hasMore && (
          <div className="mt-20 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="group flex items-center gap-8 bg-transparent border border-white/10 px-12 py-6 text-white font-black uppercase text-[10px] tracking-[0.4em] hover:border-emerald-500 transition-all duration-500"
            >
              <div className="relative">
                <Plus size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              </div>
              Expand Archive
            </motion.button>
          </div>
        )}

        {/* Social Bridge */}
        <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 items-center gap-20 border-t border-white/5 pt-20">
          <div>
            <h4 className="text-4xl md:text-5xl font-display font-black text-white uppercase italic leading-tight">
              CONSTANT <span className="text-emerald-500">EVOLUTION</span> <br /> 
              ON THE FEED
            </h4>
          </div>
          <div className="flex justify-start lg:justify-end">
            <a href="#" className="group relative px-16 py-8 overflow-hidden bg-emerald-600">
              <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
              <div className="relative flex items-center gap-6 text-white group-hover:text-black transition-colors duration-500">
                <Instagram size={24} />
                <span className="text-sm font-black uppercase tracking-[0.3em]">Follow @EthioFitVault</span>
                <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-20"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-10 right-10 text-white/20 hover:text-emerald-500 transition-all hover:rotate-90">
              <X size={48} strokeWidth={1} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative group w-full aspect-video md:aspect-auto">
                <img src={selectedImg.url} className="w-full max-h-[70vh] object-contain border border-white/10" alt="Selected" />
                <div className="absolute -bottom-24 left-0 w-full text-left">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px]">{selectedImg.category}</span>
                    <div className="h-[1px] flex-grow bg-white/10" />
                  </div>
                  <h2 className="text-4xl md:text-7xl font-display font-black text-white italic uppercase">{selectedImg.label}</h2>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;