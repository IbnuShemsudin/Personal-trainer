import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Maximize2, X, ChevronRight, Camera, Loader2, Plus } from 'lucide-react';

// 1. IMPORT YOUR LOCAL IMAGES HERE
import img1 from '../assets/heroImage1.png';
import img2 from '../assets/heroImage1.png';
import img3 from '../assets/heroImage1.png';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImg, setSelectedImg] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [visibleCount, setVisibleCount] = useState(4); // "Load More" initial count

  const categories = ['all', 'bodybuilding', 'strength', 'lifestyle'];

  // 2. DEFINE YOUR IMAGE DATA
  const images = [
    { 
      id: 1, 
      url: img1, 
      category: 'strength', 
      span: "md:col-span-2 md:row-span-2", 
      label: "Limitless Power" 
    },
    { 
      id: 2, 
      url: img2, 
      category: 'bodybuilding', 
      span: "md:col-span-1 md:row-span-1", 
      label: "Aesthetic Core" 
    },
    { 
      id: 3, 
      url: img3, 
      category: 'bodybuilding', 
      span: "md:col-span-1 md:row-span-2", 
      label: "The Grind" 
    },
    { 
      id: 4, 
      url: "https://images.unsplash.com/photo-1594381898411-846e7d193883", 
      category: 'lifestyle', 
      span: "md:col-span-1 md:row-span-1", 
      label: "Daily Ritual" 
    },
    { 
      id: 5, 
      url: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf", 
      category: 'lifestyle', 
      span: "md:col-span-2 md:row-span-1",
      label: "Addis Strength" 
    },
    { 
      id: 6, 
      url: "https://images.unsplash.com/photo-1517960413843-1b8f5d3b1f9c",
      category: 'strength',
      span: "md:col-span-1 md:row-span-1",
      label: "Iron Resolve" 
    },  
  ];

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  // Logic for filtering + Load More
  const allFiltered = filter === 'all' ? images : images.filter(img => img.category === filter);
  const filteredImages = allFiltered.slice(0, visibleCount);
  const hasMore = visibleCount < allFiltered.length;

  return (
    <section id="gallery" className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
      
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 p-10 md:p-20 opacity-[0.02] pointer-events-none">
        <Camera size={400} className="w-[200px] h-[200px] md:w-[400px] md:h-[400px]" />
      </div>

      <div className="container mx-auto px-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-20 gap-10">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-emerald-500" />
              <span className="text-emerald-500 font-black tracking-[0.5em] uppercase text-[9px] md:text-[10px]">Visual Archives</span>
            </motion.div>
            <h3 className="text-5xl md:text-8xl font-display font-black text-white uppercase italic leading-[0.8] tracking-tighter">
              THE <span className="text-transparent stroke-text">IRON</span> LAB
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 bg-zinc-900/50 p-1.5 md:p-2 border border-white/5 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setVisibleCount(4); }}
                className={`px-5 md:px-8 py-2 md:py-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  filter === cat 
                  ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                  : 'text-zinc-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Professional Bento Grid - Fixed for mobile visibility */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px] md:auto-rows-[300px]">
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                onClick={() => setSelectedImg(img)}
                className={`${img.span} relative group overflow-hidden bg-zinc-900 border border-white/5 cursor-crosshair active:scale-[0.98] transition-transform`}
              >
                {/* 1. Shimmer Loading State */}
                {!loadedImages[img.id] && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center bg-zinc-900">
                    <Loader2 className="text-emerald-500 animate-spin" size={24} />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  </div>
                )}

                {/* Content Overlay - Mobile optimized visibility */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/20 lg:via-transparent to-transparent opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-700 p-6 md:p-8 flex flex-col justify-end">
                  <div className="translate-y-0 lg:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-emerald-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-2">{img.category}</p>
                    <h4 className="text-white font-display text-2xl md:text-3xl font-black italic uppercase leading-none">{img.label}</h4>
                  </div>
                </div>

                {/* Subtle Grid Pattern Overlay */}
                <div className="hidden lg:block absolute inset-0 z-10 opacity-20 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" 
                     style={{ backgroundImage: 'radial-gradient(circle, #ffffff10 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <img 
                  src={img.url} 
                  alt={img.label} 
                  onLoad={() => handleImageLoad(img.id)}
                  className={`w-full h-full object-cover transition-all duration-1000 ease-out ${loadedImages[img.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-110'} lg:grayscale group-hover:grayscale-0 group-hover:scale-110`}
                />

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-emerald-600 border-l-[40px] border-l-transparent opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-start justify-end p-1">
                   <Maximize2 size={12} className="text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* "LOAD MORE" ARCHIVE BUTTON */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="flex items-center gap-4 bg-white text-black px-10 py-4 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-colors duration-300"
            >
              <Plus size={16} strokeWidth={3} /> Load More Archives
            </motion.button>
          </div>
        )}

        {/* Instagram Footer */}
        <div className="mt-24 border-t border-white/5 pt-12 flex flex-col items-center">
          <p className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.4em] mb-8">Daily Updates on Socials</p>
          <a href="#" className="group relative px-12 py-5 overflow-hidden border border-emerald-500/20 transition-all hover:border-emerald-500">
            <div className="absolute inset-0 bg-emerald-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative flex items-center gap-4 text-white">
              <Instagram size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Follow the Progress</span>
              <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </a>
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 md:top-8 md:right-8 text-white/20 hover:text-white transition-all"><X size={32} md:size={48} /></button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              className="relative max-w-5xl w-full h-[60vh] md:h-[70vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImg.url} className="w-full h-full object-contain" alt="Selected" />
              <div className="mt-6 md:mt-10 text-center">
                <span className="text-emerald-500 font-black uppercase tracking-[0.5em] text-[10px]">{selectedImg.category}</span>
                <h2 className="text-3xl md:text-6xl font-display font-black text-white italic uppercase mt-2">{selectedImg.label}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;