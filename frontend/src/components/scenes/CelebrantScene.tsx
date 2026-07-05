import React from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_CONFIG } from '../../config/template';

export const CelebrantScene = () => {
  const { star } = TEMPLATE_CONFIG;

  return (
    <div className="w-full relative py-10 md:py-20 flex flex-col items-center justify-center min-h-[60vh]">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center px-4 max-w-2xl"
      >
        <p className="text-pink-500 font-serif font-bold text-xs md:text-sm tracking-[0.4em] uppercase mb-4 drop-shadow-md">
          The Birthday Princess
        </p>
        
        {/* Floating Profile Picture / Avatar */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 h-40 md:w-56 md:h-56 mx-auto rounded-full border-4 border-princess-gold shadow-[0_0_30px_rgba(243,198,35,0.6)] overflow-hidden relative mb-8"
        >
           {/* Placeholder for the real image */}
           <div className="w-full h-full bg-princess-dark flex items-center justify-center bg-gradient-to-tr from-princess-dark to-pink-900">
              <span className="text-white/50 font-serif text-sm">[ {star.name} ]</span>
           </div>
           
           {/* Sparkle Overlay */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_2px)] bg-[size:15px_15px] opacity-30 animate-pulse"></div>
        </motion.div>

         <h2 className="text-5xl md:text-7xl font-disney text-pink-600 tracking-wide drop-shadow-[0_4px_5px_rgba(255,105,180,0.4)] mb-6">
          {star.name}
        </h2>
        
        <p className="text-pink-700 font-bold font-serif text-lg md:text-xl leading-relaxed italic mb-8 border-y border-pink-300/40 py-6 px-4 bg-white/40 rounded-2xl backdrop-blur-sm">
          "Join us in celebrating the magic and wonder of our beautiful princess as she turns another year older. Let the fairy tale continue..."
        </p>
        
      </motion.div>
    </div>
  );
};
