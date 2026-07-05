import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';

import mapImg from '../../assets/pink_castle.png';

// Scenes
import { CelebrantScene } from './CelebrantScene';
import { MemoriesScene } from './MemoriesScene';
import { ThemeScene } from './ThemeScene';
import { DetailsScene } from './DetailsScene';
import { CountdownScene } from './CountdownScene';
import { RSVPScene } from './RSVPScene';

const ScrollSection = ({ children, index }: { children: React.ReactNode, index: number }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.8, y: 150 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ type: "spring", bounce: 0.6, duration: 1 }}
      className={`min-h-[100svh] flex flex-col items-center justify-center relative z-10`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-20">
        {children}
      </div>
    </motion.section>
  );
};

export const ScrollJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Parallax background scale
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);
  const sunsetOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  useEffect(() => {
    // Initialize smooth scrolling with Lenis for the specific container
    const lenis = new Lenis({
      wrapper: containerRef.current!,
      content: containerRef.current?.firstElementChild as HTMLElement,
      lerp: 0.08,
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[100svh] overflow-y-auto overflow-x-hidden relative bg-pink-50 custom-scrollbar">
      
      {/* Sticky Parallax Background */}
      <motion.div 
        className="fixed inset-0 w-full h-[100svh] z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${mapImg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center top',
          scale: bgScale,
          opacity: bgOpacity
        }}
      >
        {/* Soft magical haze */}
        <div className="absolute inset-0 bg-white/20"></div>
      </motion.div>

      {/* Sunset overlay transition */}
      <motion.div 
        className="fixed inset-0 w-full h-[100svh] z-0 pointer-events-none bg-gradient-to-b from-orange-300/40 via-pink-400/30 to-purple-500/50 mix-blend-multiply"
        style={{ opacity: sunsetOpacity }}
      ></motion.div>

      {/* Content Wrapper for Lenis */}
      <div className="relative w-full">
        
        {/* Title Header Section */}
        <section className="min-h-[80svh] flex flex-col items-center justify-end pb-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-center"
          >
            <h1 className="text-white font-disney text-6xl md:text-8xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] tracking-wide mb-6">
              Zia's Magical Kingdom
            </h1>
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-white font-sans font-bold tracking-[0.3em] uppercase text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Scroll to Explore</span>
              <svg className="w-8 h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        </section>

        <ScrollSection index={1}>
          <CelebrantScene />
        </ScrollSection>

        <ScrollSection index={2}>
          <div className="bg-white/50 backdrop-blur-xl rounded-[3rem] border-4 border-white/60 shadow-[0_10px_40px_rgba(255,105,180,0.3)] p-4 md:p-8">
            <MemoriesScene />
          </div>
        </ScrollSection>

        <ScrollSection index={3}>
          <div className="bg-gradient-to-br from-pink-200/60 to-white/60 backdrop-blur-xl rounded-[3rem] border-4 border-white/80 shadow-[0_10px_40px_rgba(255,105,180,0.3)] p-4 md:p-8">
             <ThemeScene />
          </div>
        </ScrollSection>

        <ScrollSection index={4}>
          <div className="bg-gradient-to-bl from-sky-200/60 to-white/60 backdrop-blur-xl rounded-[3rem] border-4 border-white/80 shadow-[0_10px_40px_rgba(255,105,180,0.3)] p-4 md:p-8">
            <DetailsScene />
          </div>
        </ScrollSection>

        <ScrollSection index={5}>
          <CountdownScene />
        </ScrollSection>

        <ScrollSection index={6}>
          <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] border-4 border-pink-400 shadow-[0_0_50px_rgba(255,105,180,0.6)] p-4 md:p-8">
            <RSVPScene />
          </div>
        </ScrollSection>

        {/* Footer spacer */}
        <div className="h-[20svh] w-full flex items-center justify-center z-10 relative">
          <p className="text-pink-600 font-serif font-bold text-sm tracking-widest uppercase drop-shadow-[0_2px_5px_rgba(255,255,255,0.8)]">The End</p>
        </div>
      </div>
    </div>
  );
};
