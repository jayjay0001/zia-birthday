import React from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_CONFIG } from '../../config/template';

export const ThemeIntroScene = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] relative py-10">
      
      {/* Floating Magic Element (Castle / Fish depending on theme) */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-40 h-40 md:w-56 md:h-56 bg-princess-gold/10 rounded-full blur-2xl absolute top-1/4"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-[100px] md:text-[150px] leading-none mb-8 drop-shadow-[0_0_30px_rgba(243,198,35,0.5)]"
      >
        🏰
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center z-10"
      >
        <p className="text-white/60 font-sans text-sm md:text-base tracking-[0.4em] uppercase mb-4 drop-shadow-md">
          Today's Theme
        </p>
        <h2 className="text-5xl md:text-7xl font-serif text-princess-gold tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {TEMPLATE_CONFIG.theme.name}
        </h2>
      </motion.div>
    </div>
  );
};
