import React from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_CONFIG } from '../../config/template';

export const IntroScene = () => {
  return (
    <div className="text-center flex flex-col items-center w-full max-w-lg mx-auto min-h-[60vh] justify-center">
      <motion.div 
        className="relative w-full bg-white/10 backdrop-blur-2xl border-2 border-princess-gold/40 rounded-t-[5rem] rounded-b-3xl p-10 md:p-14 shadow-[0_20px_50px_rgba(243,198,35,0.15)] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Decorative inner borders */}
        <div className="absolute inset-4 border border-princess-gold/20 rounded-t-[4rem] rounded-b-2xl pointer-events-none"></div>
        <div className="absolute inset-5 border border-white/10 rounded-t-[3.8rem] rounded-b-xl pointer-events-none"></div>

        {/* Ambient glow inside card */}
        <motion.div 
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-princess-gold/30 blur-[60px] pointer-events-none"
        />

        <p className="text-princess-gold font-serif text-sm md:text-base tracking-[0.3em] uppercase mb-6 drop-shadow-md">
          {TEMPLATE_CONFIG.welcome.title}
        </p>

        <h1 className="text-5xl md:text-7xl font-disney text-white mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-tight">
          {TEMPLATE_CONFIG.welcome.subtitle}
        </h1>

        <div className="w-12 h-0.5 bg-princess-gold mx-auto mb-8 shadow-[0_0_10px_rgba(243,198,35,1)]"></div>
        
        {/* Optional small confetti element could go here */}
      </motion.div>
    </div>
  );
};
