import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import bgImg from './assets/disney_garden.png';
import { ParticleEffects } from './components/ParticleEffects';
import Lenis from 'lenis';

// Scenes
import { LoadingScene } from './components/scenes/LoadingScene';
import { CinematicHero } from './components/scenes/CinematicHero';
import { IntroScene } from './components/scenes/IntroScene';

import { MemoriesScene } from './components/scenes/MemoriesScene';
import { ThemeIntroScene } from './components/scenes/ThemeIntroScene';
import { ThemeScene } from './components/scenes/ThemeScene';
import { DetailsScene } from './components/scenes/DetailsScene';
import { CountdownScene } from './components/scenes/CountdownScene';
import { RSVPScene } from './components/scenes/RSVPScene';
import { EndingScene } from './components/scenes/EndingScene';
import { WelcomeVideoScene } from './components/scenes/WelcomeVideoScene';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOpenedDoors, setHasOpenedDoors] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenDoors = () => {
    setHasOpenedDoors(true);
    setTimeout(() => {
      document.getElementById('welcome-video')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Parallax effect: moves the background image down slightly as the user scrolls
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Move decorative orbs up slightly for depth
  const orbsY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <main 
      ref={containerRef}
      className="min-h-screen w-full relative text-princess-white bg-princess-dark overflow-x-hidden"
    >
      {/* Loading Scene (z-50) overlays everything, allowing the app to render and video to buffer behind it */}
      {isLoading && <LoadingScene onComplete={() => setIsLoading(false)} />}

      {/* Parallax Background */}
      <motion.div 
        className="fixed inset-0 w-full h-[120vh] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"
        style={{ backgroundImage: `url(${bgImg})`, y: backgroundY }}
      />
      
      {/* Dark Overlay for readability */}
      <div className="fixed inset-0 bg-princess-dark/60 pointer-events-none z-0"></div>
      
      {/* Global Magical Particles constantly floating */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-60">
        <ParticleEffects />
      </div>

      {/* Decorative Parallax Orbs */}
      <motion.div style={{ y: orbsY }} className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-princess-rose blur-[120px] opacity-20 pointer-events-none z-0"></motion.div>
      <motion.div style={{ y: orbsY }} className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-princess-gold blur-[150px] opacity-15 pointer-events-none z-0"></motion.div>

      {/* Main Content (always rendered to allow video buffering) */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Seamless Cinematic Video Sequence (Scroll Locked automatically) */}
        <section id="hero" className="w-full relative h-[100svh]">
          <CinematicHero startVideo={!isLoading} onOpenDoors={handleOpenDoors} />
        </section>
        
        {/* ONLY RENDER the rest of the site AFTER the doors are unlocked! */}
        {hasOpenedDoors && (
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-12 pb-20 mt-12">
            <section id="welcome-video" className="w-full"><WelcomeVideoScene /></section>
            <section id="welcome" className="w-full mt-20"><IntroScene /></section>
            
            {/* Storybook spans full width for horizontal scroll */}
            <section id="storybook" className="w-full mt-20"><MemoriesScene /></section>
            
            <section id="theme-intro" className="w-full mt-10"><ThemeIntroScene /></section>
            <section id="dress-code" className="w-full -mt-10"><ThemeScene /></section>
            <section id="details" className="w-full mt-20"><DetailsScene /></section>
            <section id="countdown" className="w-full mt-10"><CountdownScene /></section>
            <section id="rsvp" className="w-full mt-20"><RSVPScene /></section>
            <section id="goodbye" className="w-full mt-32"><EndingScene /></section>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
