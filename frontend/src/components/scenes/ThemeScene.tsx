import React from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_CONFIG } from '../../config/template';
import { Crown, Sparkles } from 'lucide-react';

export const ThemeScene = () => {
  const { dressCode } = TEMPLATE_CONFIG;

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] relative py-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-12 z-10"
      >
        <p className="text-pink-500 font-serif font-bold text-xs md:text-sm tracking-[0.4em] uppercase mb-2">
          Attire
        </p>
        <h2 className="text-4xl md:text-6xl font-serif text-pink-600 font-bold tracking-wide drop-shadow-[0_2px_5px_rgba(255,105,180,0.4)]">
          Dress Code
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-4xl px-4 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          animate={{ y: [0, -10, 0] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          className="flex-1 bg-white/40 backdrop-blur-xl border-2 border-pink-300 rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-white/60 transition-all shadow-[0_10px_30px_rgba(255,105,180,0.2)]"
        >
          <Crown className="w-16 h-16 text-pink-500 mb-6 group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(255,105,180,0.4)]" />
          <h3 className="text-2xl font-serif text-pink-600 font-bold mb-3">{dressCode.option1.title}</h3>
          <p className="text-pink-800 font-sans font-medium leading-relaxed">
            {dressCode.option1.description}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          animate={{ y: [0, -10, 0] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
          className="flex-1 bg-white/40 backdrop-blur-xl border-2 border-pink-300 rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-white/60 transition-all shadow-[0_10px_30px_rgba(255,105,180,0.2)]"
        >
          <Sparkles className="w-16 h-16 text-pink-500 mb-6 group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(255,105,180,0.4)]" />
          <h3 className="text-2xl font-serif text-pink-600 font-bold mb-3">{dressCode.option2.title}</h3>
          <p className="text-pink-800 font-sans font-medium leading-relaxed">
            {dressCode.option2.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
