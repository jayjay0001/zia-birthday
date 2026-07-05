import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleEffects } from '../ParticleEffects';
import loadingBg from '../../assets/disney_intro.png';
import { useAudio } from '../AudioProvider';

// Minimalist, premium SVG Butterfly
const ButterflyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <path d="M12 2C12 2 12 10 12 12C12 14 12 22 12 22" />
    <path d="M12 12C12 12 16 6 20 8C24 10 20 16 12 12Z" />
    <path d="M12 12C12 12 8 6 4 8C0 10 4 16 12 12Z" />
    <path d="M12 12C12 12 16 18 20 16C24 14 20 8 12 12Z" />
    <path d="M12 12C12 12 8 18 4 16C0 14 4 8 12 12Z" />
  </svg>
);

export const LoadingScene = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const { startAudio } = useAudio();

  useEffect(() => {
    // Artificial load time before unlocking the enter button
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    startAudio(); // Unlock and play the magical Disney audio!
    setIsVisible(false);
    setTimeout(onComplete, 1500); // Wait for the smooth 1.5s exit animation
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Animated Cinematic Background (The Trees) */}
          <motion.div 
            className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${loadingBg})` }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
          />

          {/* Subtle vignette instead of heavy dark overlay so trees are visible */}
          <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-0 pointer-events-none"></div>

          <div className="absolute inset-0 opacity-80 z-10 pointer-events-none"><ParticleEffects /></div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center z-20"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-12"
            >
              <ButterflyIcon className="w-24 h-24 text-[#f3c623] drop-shadow-[0_0_25px_rgba(243,198,35,0.8)]" />
            </motion.div>

            {/* Interaction Layer to Unlock Audio */}
            <div className="h-20 flex items-center justify-center">
              {isReady ? (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleEnter}
                  className="px-8 py-3 rounded-full border border-[#f3c623]/50 text-[#f3c623] uppercase tracking-[0.3em] text-sm backdrop-blur-md bg-black/20 hover:bg-[#f3c623]/20 transition-all active:scale-95 shadow-[0_0_20px_rgba(243,198,35,0.2)]"
                >
                  Enter Forest
                </motion.button>
              ) : (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#f3c623]/70 font-sans text-sm tracking-[0.3em] uppercase animate-pulse"
                >
                  Awakening...
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
