import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface KuromiHostProps {
  dialogue: string;
}

export const KuromiHost: React.FC<KuromiHostProps> = ({ dialogue }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(dialogue.slice(0, i));
      i++;
      if (i > dialogue.length) {
        clearInterval(intervalId);
      }
    }, 40); // Typing speed

    return () => clearInterval(intervalId);
  }, [dialogue]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col md:flex-row items-end md:items-center gap-4 md:gap-6 z-20 relative p-2 md:p-4">
      {/* Kuromi Asset Placeholder */}
      <div className="w-32 h-40 md:w-56 md:h-72 shrink-0 flex flex-col items-center justify-center border-4 border-dashed border-kuromi-pink/50 rounded-3xl bg-kuromi-dark/50 backdrop-blur-sm relative shadow-[0_0_30px_rgba(252,165,165,0.2)] mx-auto md:mx-0">
        <div className="text-center p-2">
          <p className="text-kuromi-pink font-bold text-xs md:text-sm">Talking Kuromi<br className="hidden md:block"/> Asset</p>
          <p className="text-kuromi-purple text-[10px] md:text-xs mt-1 opacity-70">(WebM/Lottie)</p>
        </div>
      </div>

      {/* Dialogue Bubble */}
      <motion.div 
        key={dialogue} 
        className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-3xl rounded-tl-3xl md:rounded-tl-none md:rounded-bl-none shadow-2xl relative w-full"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute -top-4 left-6 md:-top-4 md:-left-4 bg-kuromi-pink text-kuromi-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
          Kuromi
        </div>
        <p className="text-kuromi-white font-sans text-lg md:text-xl leading-relaxed min-h-[80px]">
          {displayedText}
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-5 bg-kuromi-pink ml-1 align-middle"
          />
        </p>
      </motion.div>
    </div>
  );
};
