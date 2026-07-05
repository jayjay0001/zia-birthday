import React from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_CONFIG } from '../../config/template';

export const EndingScene = () => {
  const { goodbye } = TEMPLATE_CONFIG;

  // Generate random fireworks
  const fireworks = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 80 + 10}%`,
    delay: Math.random() * 2,
    scale: Math.random() * 0.6 + 0.4,
  }));

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] relative text-center py-20 overflow-hidden">
      
      {/* Fireworks Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fireworks.map((fw) => (
          <motion.div
            key={fw.id}
            className="absolute w-4 h-4 rounded-full bg-transparent"
            style={{ left: fw.left, top: fw.top, scale: fw.scale }}
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: [0, 1, 0],
              boxShadow: [
                "0 0 0px 0px rgba(243,198,35,0)",
                "0 -30px 15px 3px rgba(243,198,35,1), 30px -15px 15px 3px rgba(243,198,35,1), -30px -15px 15px 3px rgba(243,198,35,1), 20px 20px 15px 3px rgba(243,198,35,1), -20px 20px 15px 3px rgba(243,198,35,1)",
                "0 -60px 15px 0px rgba(243,198,35,0), 60px -30px 15px 0px rgba(243,198,35,0), -60px -30px 15px 0px rgba(243,198,35,0), 40px 40px 15px 0px rgba(243,198,35,0), -40px 40px 15px 0px rgba(243,198,35,0)"
              ]
            }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 2, repeat: Infinity, delay: fw.delay, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Grand Glowing Orb */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[40rem] h-[40rem] bg-princess-gold rounded-full blur-[150px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10"
      >
        {/* Placeholder for Princess Returns Video/Image */}
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-princess-gold/50 mx-auto mb-8 bg-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(243,198,35,0.3)]">
           <span className="text-4xl">👋</span>
        </div>
        
        <h2 className="font-serif text-3xl md:text-5xl text-princess-gold mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] tracking-wide px-4">
          {goodbye.title}
        </h2>
        
        <p className="font-sans text-xl md:text-2xl text-white/90 font-light tracking-wide mb-12">
          {goodbye.subtitle}
        </p>

        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-princess-gold to-transparent mx-auto"></div>
      </motion.div>
    </div>
  );
};
