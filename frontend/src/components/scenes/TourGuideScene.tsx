import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ziaVideo from '../../assets/zia.mp4';
import { TEMPLATE_CONFIG } from '../../config/template';

export const TourGuideScene = ({ onStartTour }: { onStartTour: () => void }) => {
  const [showButton, setShowButton] = useState(false);
  const { star } = TEMPLATE_CONFIG;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    // Play the cute voice text-to-speech
    const speakWelcome = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const voices = window.speechSynthesis.getVoices();
        const msg = new SpeechSynthesisUtterance(`Hello my friend! Welcome to ${star.name}'s magical kingdom! Let me give you a grand tour!`);
        
        const cuteVoice = voices.find(v => 
          v.name.includes('Female') || 
          v.name.includes('Samantha') || 
          v.name.includes('Google UK English Female') ||
          v.name.includes('Zira')
        );
        
        if (cuteVoice) {
          msg.voice = cuteVoice;
        }
        
        msg.pitch = 1.6; 
        msg.rate = 1.1;
        
        // Show button slightly after the speech finishes
        msg.onend = () => {
           setShowButton(true);
        };
        
        window.speechSynthesis.speak(msg);
        
        // Fallback to show button in case onend doesn't fire
        timer = setTimeout(() => setShowButton(true), 4500);
      } else {
        // Fallback if TTS not supported
        timer = setTimeout(() => setShowButton(true), 3000);
      }
    };

    // Delay slightly for animation to finish
    const initTimer = setTimeout(() => {
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', speakWelcome, { once: true });
      } else {
        speakWelcome();
      }
    }, 1000);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [star.name]);

  return (
    <div className="w-full h-[100svh] flex flex-col items-center justify-center relative bg-black/90 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", type: "spring", bounce: 0.4 }}
        className="w-full max-w-2xl flex flex-col items-center gap-8"
      >
        {/* Intro Text */}
        <div className="text-center h-24 flex items-center justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-4xl md:text-5xl text-white tracking-wide text-center drop-shadow-[0_2px_15px_rgba(255,215,0,0.6)] leading-tight"
            style={{ fontFamily: 'var(--font-disney)' }}
          >
            "Hello my friend! <br/> Welcome to my magical kingdom!"
          </motion.h2>
        </div>

        {/* Video Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
          className="relative w-full max-w-xs md:max-w-sm aspect-[4/5] rounded-3xl p-2 bg-gradient-to-tr from-princess-gold via-yellow-200 to-princess-gold shadow-[0_0_50px_rgba(255,215,0,0.4)]"
        >
          <div className="absolute inset-0 rounded-3xl border border-white/50 animate-pulse opacity-30" />
          <div className="w-full h-full rounded-[1.25rem] overflow-hidden bg-princess-dark relative border-4 border-princess-dark">
            <video 
              src={ziaVideo} 
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Start Tour Button */}
        <div className="h-20 flex items-center justify-center">
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartTour}
              className="px-8 py-4 bg-princess-gold/20 backdrop-blur-md border border-princess-gold text-princess-gold font-serif text-lg md:text-xl rounded-full shadow-[0_0_30px_rgba(243,198,35,0.4)] hover:bg-princess-gold hover:text-black transition-all cursor-pointer"
            >
              Start the Tour ✨
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
