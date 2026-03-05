import React, { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Play, Zap, ArrowRight, X } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Grid } from '@react-three/drei';

// ASSETS
import heroimage from '../assets/heroimage1.png';
import backgroundVideo from '../assets/background.mp4';

// --- 3D GRID FLOOR COMPONENT ---
const GridFloor = () => {
  return (
    <Grid
      position={[0, -1.8, 0]}
      args={[10.5, 10.5]}
      cellSize={0.5}
      cellThickness={1}
      cellColor="#10b981"
      sectionSize={3}
      sectionThickness={1.5}
      sectionColor="#064e3b"
      fadeDistance={25}
      fadeStrength={1}
      infiniteGrid
    />
  );
};

// --- 3D ELEMENT COMPONENT ---
const CyberSphere = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.position.x = state.mouse.x * 0.2;
    meshRef.current.position.y = state.mouse.y * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1, 100, 100]} ref={meshRef} scale={1.4}>
        <MeshDistortMaterial
          color="#10b981"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
          wireframe
          opacity={0.4}
          transparent
        />
      </Sphere>
    </Float>
  );
};

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef(null);

  // --- UNIFIED 3D PHYSICS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for all 3D movements
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  // Container Rotations
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Text Parallax Offsets
  const textX = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleOpenVideo = () => {
    setIsVideoOpen(true);
    setTimeout(() => {
      if (videoRef.current) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          videoRef.current.webkitRequestFullscreen();
        }
      }
    }, 100);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex items-center bg-zinc-950 overflow-hidden pt-24 lg:pt-32"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* DIGITAL SCANLINE OVERLAY */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
          backgroundSize: '100% 2px, 3px 100%' 
        }} 
      />

      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        
        {/* LEFT: 3D Parallax Image Side */}
        <div 
          className="relative w-full lg:w-5/12 h-[65vh] md:h-[75vh] lg:h-screen overflow-visible border-r border-white/5 flex items-center justify-center perspective-[1200px]"
        >
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d" 
            }}
            className="relative w-full h-full"
          >
            <motion.img 
              src={heroimage}
              alt="Elite Trainer" 
              className="w-full h-full object-cover hover:grayscale transition-all duration-1000 scale-105"
              style={{ transform: "translateZ(30px)" }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent lg:hidden" />
            
            <motion.div 
              className="absolute bottom-20 left-10 hidden lg:block"
              style={{ transform: "translateZ(100px)" }}
            >
               <div className="bg-emerald-600 px-6 py-2 skew-x-[-12deg] shadow-[0_20px_50px_rgba(16,185,129,0.3)]">
                  <p className="text-white font-black uppercase tracking-[0.3em] text-[10px] skew-x-[12deg]">
                    Lead Trainer • Haydi
                  </p>
               </div>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT: Content & 3D Environment */}
        <div className="relative w-full lg:w-7/12 flex items-center px-6 md:px-16 lg:px-24 py-20 lg:py-0 perspective-[1200px]">
          
          {/* 3D CANVAS LAYER */}
          <div className="absolute inset-0 z-0">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 3.5]} />
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} color="#10b981" intensity={2} />
              <pointLight position={[-10, -5, 5]} color="#064e3b" intensity={1} />
              <Suspense fallback={null}>
                <CyberSphere />
                <GridFloor />
              </Suspense>
            </Canvas>
          </div>

          {/* BACKGROUND VIDEO OVERLAY */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-10">
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-zinc-950/40" />
          </div>

          {/* --- UPGRADED: 3D FLOATING CONTENT --- */}
          <motion.div 
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d" 
            }}
            className="relative z-10 w-full pt-10"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ x: textX, y: textY, transform: "translateZ(50px)" }}
              className="inline-flex items-center gap-2 bg-emerald-600/10 border border-emerald-500/20 px-4 py-2 mb-8"
            >
              <Zap size={14} className="text-emerald-500 fill-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
                Elite Performance Coaching
              </span>
            </motion.div>

            <div className="relative">
              {/* Layer 1: Forward Depth Text */}
              <motion.h1 
                style={{ 
                  x: textX, 
                  y: textY, 
                  transform: "translateZ(130px)" 
                }}
                className="text-5xl sm:text-7xl md:text-9xl font-display font-black text-white leading-[0.8] uppercase tracking-tighter italic mb-4 drop-shadow-2xl"
              >
                LEVEL <span className="text-emerald-500">UP</span>
              </motion.h1>

              {/* Layer 2: Deeper Depth Hollow Text */}
              <motion.h1 
                style={{ 
                  x: useTransform(smoothX, [-0.5, 0.5], [-40, 40]), 
                  y: useTransform(smoothY, [-0.5, 0.5], [-35, 35]),
                  transform: "translateZ(70px)" 
                }}
                className="text-5xl sm:text-7xl md:text-9xl font-display font-black stroke-text leading-[0.8] uppercase tracking-tighter text-transparent opacity-70"
              >
                YOUR LEGACY
              </motion.h1>
            </div>

            <motion.div 
              style={{ transform: "translateZ(40px)" }}
              className="mt-12 flex flex-col sm:flex-row gap-6"
            >
              <a 
                href="contact" 
                className="group bg-emerald-600 hover:bg-white text-white hover:text-black px-10 py-5 font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-4 border border-emerald-600"
              >
                Start Training
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              
              <button 
                onClick={handleOpenVideo}
                className="group flex items-center gap-4 text-white uppercase font-black tracking-widest text-xs"
              >
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-emerald-500 transition-all relative">
                  <Play size={16} fill="white" className="ml-1" />
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 scale-0 group-hover:scale-125 transition-transform duration-500" />
                </div>
                Free Consultation
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-emerald-500 z-[220] transition-colors p-2 bg-black/50 rounded-full"
            >
              <X size={32} />
            </button>
            
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full h-full flex items-center justify-center bg-black"
            >
              <video 
                ref={videoRef}
                controls 
                autoPlay 
                playsInline
                className="w-full h-full object-contain"
                onEnded={() => setIsVideoOpen(false)}
              >
                <source src={backgroundVideo} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Hero;