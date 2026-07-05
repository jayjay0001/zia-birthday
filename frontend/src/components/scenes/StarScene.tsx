import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TEMPLATE_CONFIG } from '../../config/template';
import princessImg from '../../assets/princess_zia.png';

export const StarScene = () => {
  const { star } = TEMPLATE_CONFIG;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center min-h-screen relative overflow-hidden py-20 px-4">
      {/* Intro Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center mb-12 z-20"
      >
        <p className="text-princess-gold font-serif text-xs md:text-sm tracking-[0.4em] uppercase mb-4 drop-shadow-md">
          Introducing
        </p>
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-wide drop-shadow-[0_2px_20px_rgba(255,215,0,0.5)]">
          {star.name}
        </h2>
      </motion.div>

      {/* Portrait and Stats Container */}
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 z-10">
        
        {/* Left Stats (Desktop) / Top Stats (Mobile) */}
        <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto justify-center px-2">
          <motion.div 
            variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-princess-gold/30 rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-xl flex-1 md:w-48"
          >
            <span className="text-3xl md:text-4xl mb-2 drop-shadow-md">🎈</span>
            <span className="text-[10px] md:text-xs text-princess-gold uppercase tracking-widest mb-1">Age</span>
            <span className="font-serif text-lg md:text-2xl text-white">{star.age}</span>
          </motion.div>

          <motion.div 
            variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-princess-gold/30 rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-xl flex-1 md:w-48"
          >
            <span className="text-3xl md:text-4xl mb-2 drop-shadow-md">🎨</span>
            <span className="text-[10px] md:text-xs text-princess-gold uppercase tracking-widest mb-1">Color</span>
            <span className="font-serif text-lg md:text-xl text-white">{star.favoriteColor}</span>
          </motion.div>
        </div>

        {/* Center Portrait */}
        <motion.div 
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
          className="relative w-64 h-64 md:w-96 md:h-96 rounded-full p-2 bg-gradient-to-tr from-princess-gold via-yellow-200 to-princess-gold shadow-[0_0_50px_rgba(255,215,0,0.4)] flex-shrink-0"
        >
          {/* Inner animated ring */}
          <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-20" />
          
          {/* Image masked as circle */}
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-princess-dark relative bg-princess-dark">
             {/* Gradient overlay to blend the square image a bit */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] z-10 pointer-events-none" />
            <img 
              src={princessImg} 
              alt="Princess Zia" 
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </motion.div>

        {/* Right Stats (Desktop) / Bottom Stats (Mobile) */}
        <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto justify-center px-2">
          <motion.div 
            variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-princess-gold/30 rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-xl flex-1 md:w-48"
          >
            <span className="text-3xl md:text-4xl mb-2 drop-shadow-md">🍰</span>
            <span className="text-[10px] md:text-xs text-princess-gold uppercase tracking-widest mb-1">Food</span>
            <span className="font-serif text-lg md:text-xl text-white">{star.favoriteFood}</span>
          </motion.div>

          <motion.div 
            variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-princess-gold/30 rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-xl flex-1 md:w-48"
          >
            <span className="text-3xl md:text-4xl mb-2 drop-shadow-md">✨</span>
            <span className="text-[10px] md:text-xs text-princess-gold uppercase tracking-widest mb-1">Dream</span>
            <span className="font-serif text-lg md:text-xl text-white">{star.dream}</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
