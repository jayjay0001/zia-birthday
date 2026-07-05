import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Scenes
import { LoadingScene } from './components/scenes/LoadingScene';
import { CinematicHero } from './components/scenes/CinematicHero';
import { InteractiveMap } from './components/scenes/InteractiveMap';
import { ParticleEffects } from './components/ParticleEffects';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOpenedDoors, setHasOpenedDoors] = useState(false);

  return (
    <main className="w-full h-[100svh] overflow-hidden relative text-princess-white bg-black">
      {/* Loading Scene (z-50) overlays everything, allowing the app to render and video to buffer behind it */}
      {isLoading && <LoadingScene onComplete={() => setIsLoading(false)} />}

      {/* Global Magical Particles constantly floating */}
      <div className="fixed inset-0 z-[5] pointer-events-none opacity-60">
        <ParticleEffects />
      </div>

      <AnimatePresence mode="wait">
        {!hasOpenedDoors ? (
          <motion.div 
            key="cinematic"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0 z-20"
          >
            <CinematicHero startVideo={!isLoading} onOpenDoors={() => setHasOpenedDoors(true)} />
          </motion.div>
        ) : (
          <motion.div 
            key="map"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full h-full absolute inset-0 z-10"
          >
            <InteractiveMap />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
