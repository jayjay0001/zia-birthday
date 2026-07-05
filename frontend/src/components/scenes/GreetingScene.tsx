import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useAudio } from '../AudioProvider';
import { TEMPLATE_CONFIG } from '../../config/template';
import { ChevronDown } from 'lucide-react';
import arielImg from '../../assets/ariel.png';

export const GreetingScene = () => {
  const { startAudio, playSfx } = useAudio();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // GSAP Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Framer Motion Scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    // Cinematic GSAP Entrance
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Initial State
    gsap.set([avatarRef.current, textRef.current, btnRef.current], { autoAlpha: 0, y: 50 });
    gsap.set(glowRef.current, { scale: 0, autoAlpha: 0 });
    gsap.set(avatarRef.current, { scale: 0.8 });

    tl.to(glowRef.current, { duration: 2, scale: 1, autoAlpha: 0.3, ease: "slow" })
      .to(avatarRef.current, { duration: 1.5, autoAlpha: 1, scale: 1, y: 0 }, "-=1.5")
      .to(textRef.current, { duration: 1.2, autoAlpha: 1, y: 0 }, "-=0.8")
      .to(btnRef.current, { duration: 1, autoAlpha: 1, y: 0 }, "-=0.6");

    // Continuous GSAP animation for the glow
    gsap.to(glowRef.current, {
      duration: 10,
      rotate: 360,
      scale: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleBegin = () => {
    startAudio();
    playSfx('click');
    const nextSection = document.getElementById('welcome');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      ref={sectionRef}
      style={{ opacity, y }}
      className="w-full flex flex-col items-center justify-center min-h-screen relative pt-10"
    >
      <div ref={containerRef} className="relative z-10 flex flex-col items-center">
        
        {/* Magical Glow Behind Avatar */}
        <div 
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-princess-gold rounded-full blur-[100px] pointer-events-none -z-10"
        />

        {/* Avatar Container */}
        <div 
          ref={avatarRef}
          className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[4px] border-princess-gold/50 shadow-[0_0_50px_rgba(243,198,35,0.4)] overflow-hidden bg-white/5 backdrop-blur-md mb-8"
        >
          <img 
            src={arielImg} 
            alt="Princess" 
            className="w-full h-full object-cover object-top opacity-95"
          />
        </div>

        {/* Greeting Text */}
        <div ref={textRef} className="text-center px-4 flex flex-col items-center">
          <h2 className="font-serif text-3xl md:text-5xl text-princess-gold mb-4 drop-shadow-[0_0_10px_rgba(243,198,35,0.5)]">
            {TEMPLATE_CONFIG.hero.greeting}
          </h2>
          <p className="font-sans text-lg md:text-2xl text-white/90 font-light tracking-wide max-w-lg mx-auto leading-relaxed mb-10">
            {TEMPLATE_CONFIG.hero.subtitle}
          </p>
        </div>

        {/* The Audio Trigger Button */}
        <button 
          ref={btnRef}
          onClick={handleBegin}
          className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-md border border-princess-gold/50 text-white font-serif text-lg tracking-[0.2em] uppercase rounded-full shadow-[0_0_20px_rgba(243,198,35,0.2)] hover:shadow-[0_0_40px_rgba(243,198,35,0.5)] hover:bg-white/20 transition-all duration-500 active:scale-95"
        >
          {TEMPLATE_CONFIG.hero.buttonText}
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 z-10 flex flex-col items-center cursor-pointer"
        onClick={handleBegin}
      >
        <span className="text-princess-gold font-sans text-xs tracking-widest uppercase mb-2">Scroll</span>
        <ChevronDown className="text-princess-gold w-6 h-6" />
      </motion.div>

    </motion.div>
  );
};
