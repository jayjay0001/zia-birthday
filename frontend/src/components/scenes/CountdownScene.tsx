import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_CONFIG } from '../../config/template';

export const CountdownScene = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const target = new Date(TEMPLATE_CONFIG.countdown.targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[40vh] relative py-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white/40 backdrop-blur-xl border-2 border-pink-300 rounded-3xl shadow-[0_10px_30px_rgba(255,105,180,0.3)]"
      >
        <div className="rounded-[23px] py-10 px-6 text-center">
          <p className="text-pink-500 font-bold font-sans text-xs md:text-sm tracking-[0.4em] uppercase mb-8">
            The Magic Begins In
          </p>

          <div className="flex justify-center gap-6 md:gap-12">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-serif text-pink-600 font-bold mb-2">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-pink-500 font-bold text-xs tracking-widest uppercase">Days</span>
            </div>
            
            <div className="text-4xl md:text-6xl font-serif text-pink-300 font-bold -mt-2">:</div>
            
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-serif text-pink-600 font-bold mb-2">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-pink-500 font-bold text-xs tracking-widest uppercase">Hours</span>
            </div>
            
            <div className="text-4xl md:text-6xl font-serif text-pink-300 font-bold -mt-2">:</div>
            
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-serif text-pink-600 font-bold mb-2">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-pink-500 font-bold text-xs tracking-widest uppercase">Mins</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
