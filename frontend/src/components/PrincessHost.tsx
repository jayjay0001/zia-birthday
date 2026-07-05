import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import arielImg from '../assets/ariel.png';

interface PrincessHostProps {
  dialogue: string;
  sceneIndex: number;
}

export const PrincessHost: React.FC<PrincessHostProps> = ({ dialogue, sceneIndex }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    
    // Typing Animation
    setDisplayedText("");
    let i = 0;
    intervalId = setInterval(() => {
      setDisplayedText(dialogue.slice(0, i));
      i++;
      if (i > dialogue.length) {
        clearInterval(intervalId);
      }
    }, 20); // Sped up from 45ms to 20ms for a snappier feel

    return () => {
      clearInterval(intervalId);
    };
  }, [dialogue]);

  const isTyping = displayedText.length < dialogue.length;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={dialogue}
        className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-1/2 md:right-auto md:w-full md:max-w-2xl md:-translate-x-1/2 z-50 pointer-events-none"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="w-full bg-black/20 backdrop-blur-2xl border border-white/10 p-3 md:p-4 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] pointer-events-auto flex items-center gap-3 md:gap-4 relative overflow-hidden">
          
          {/* Subtle background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-princess-gold/10 to-transparent pointer-events-none" />

          {/* Avatar */}
          <motion.div 
            className="w-14 h-14 md:w-16 md:h-16 shrink-0 relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <motion.div 
              className="w-full h-full rounded-full border-[2px] border-princess-gold/60 overflow-hidden bg-white/5 backdrop-blur-sm"
              animate={isTyping ? { 
                boxShadow: [
                  "0 0 10px rgba(243,198,35,0.2)",
                  "0 0 20px rgba(243,198,35,0.5)",
                  "0 0 10px rgba(243,198,35,0.2)"
                ]
              } : { 
                boxShadow: "0 0 10px rgba(243,198,35,0.1)"
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src={arielImg} 
                alt="Princess Ariel" 
                className="w-full h-full object-cover object-top opacity-95"
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 py-1 z-10">
            <div className="text-princess-gold text-[10px] md:text-xs font-bold tracking-widest uppercase mb-0.5 flex items-center gap-1 drop-shadow-md">
              <span className="text-[10px]">✨</span> Princess Ariel
            </div>
            <p className="text-white/95 font-sans text-sm md:text-base leading-tight md:leading-snug font-light tracking-wide m-0 pr-2">
              {displayedText}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 md:w-2 h-4 md:h-5 bg-princess-gold/80 ml-1 align-middle rounded-full"
              />
            </p>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
