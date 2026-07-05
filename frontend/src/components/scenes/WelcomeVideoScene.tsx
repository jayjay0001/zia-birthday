import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ziaVideo from '../../assets/zia.mp4';
import { TEMPLATE_CONFIG } from '../../config/template';

export const WelcomeVideoScene = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { star } = TEMPLATE_CONFIG;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen relative py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut", type: "spring", bounce: 0.4 }}
        className="w-full max-w-5xl flex flex-col items-center gap-10"
      >
        {/* Intro Text */}
        <div className="text-center">
          <p className="text-princess-gold font-serif text-xs md:text-sm tracking-[0.4em] uppercase mb-4 drop-shadow-md">
            Introducing
          </p>
          <h2 
            className="text-5xl md:text-7xl text-white tracking-wide text-center drop-shadow-[0_2px_15px_rgba(255,215,0,0.6)]"
            style={{ fontFamily: 'var(--font-disney)' }}
          >
            {star.name}
          </h2>
        </div>

        {/* Video and Stats Container */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          
          {/* Left Stats */}
          <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto justify-center px-2 order-2 md:order-1">
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

          {/* Center Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            className="relative w-full max-w-sm md:max-w-md aspect-[4/5] rounded-3xl p-2 bg-gradient-to-tr from-princess-gold via-yellow-200 to-princess-gold shadow-[0_0_50px_rgba(255,215,0,0.4)] order-1 md:order-2"
          >
            <div className="absolute inset-0 rounded-3xl border border-white/50 animate-pulse opacity-30" />
            <div className="w-full h-full rounded-[1.25rem] overflow-hidden bg-princess-dark relative border-4 border-princess-dark">
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] pointer-events-none z-10" />
              <video 
                ref={videoRef}
                src={ziaVideo} 
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Stats */}
          <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto justify-center px-2 order-3">
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
      </motion.div>
    </div>
  );
};
