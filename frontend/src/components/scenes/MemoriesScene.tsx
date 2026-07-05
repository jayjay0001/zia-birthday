import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TEMPLATE_CONFIG } from '../../config/template';

export const MemoriesScene = () => {
  const { storybook } = TEMPLATE_CONFIG;
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({ container: scrollRef });

  return (
    <div className="w-full relative py-10 md:py-20 overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-10 z-10 px-4"
      >
        <p className="text-pink-500 font-serif font-bold text-xs md:text-sm tracking-[0.4em] uppercase mb-2">
          A Royal Journey
        </p>
        <h2 className="text-4xl md:text-6xl font-serif text-pink-600 font-bold tracking-wide drop-shadow-md">
          My Storybook
        </h2>
        <p className="text-pink-400 font-bold text-xs font-sans tracking-widest uppercase mt-4 animate-pulse">
          ← Swipe to explore →
        </p>
      </motion.div>
      
      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="w-full flex gap-6 md:gap-12 overflow-x-auto snap-x snap-mandatory px-[10vw] md:px-[20vw] pb-20 pt-10 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {storybook.map((memory, index) => (
          <motion.div 
            key={memory.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="snap-center shrink-0 relative w-[80vw] max-w-sm md:max-w-md aspect-[4/5] bg-white/90 backdrop-blur-xl p-4 pb-24 md:p-6 md:pb-28 rounded-[2rem] shadow-[0_10px_30px_rgba(255,105,180,0.3)] border-2 border-pink-200 flex flex-col group hover:-translate-y-2 transition-transform duration-500"
          >
            {/* Ambient Glow behind card */}
            <div className="absolute inset-0 bg-princess-gold/20 opacity-0 group-hover:opacity-100 blur-[50px] transition-opacity duration-700 pointer-events-none -z-10 rounded-[2rem]"></div>

            {/* The Photo/Video Area Placeholder */}
            <div className="flex-1 bg-pink-50 border-2 border-pink-200 flex flex-col items-center justify-center overflow-hidden relative shadow-inner rounded-xl group-hover:border-pink-300 transition-colors duration-500">
               <span className="text-pink-400 font-serif font-bold text-sm md:text-lg z-10 tracking-widest uppercase">
                 [ {memory.image} ]
               </span>
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffffff_2px,_transparent_3px)] bg-[size:20px_20px]"></div>
            </div>
            
            {/* The Frame Text */}
            <div className="absolute bottom-6 md:bottom-8 left-0 w-full text-center px-6">
              <p className="text-pink-600 font-serif font-bold text-xl md:text-2xl tracking-wide italic leading-relaxed">
                "{memory.caption}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* CSS to hide scrollbar for webkit */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};
