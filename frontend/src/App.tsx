import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Scenes
import { LoadingScene } from './components/scenes/LoadingScene';
import { CinematicHero } from './components/scenes/CinematicHero';

import { ScrollJourney } from './components/scenes/ScrollJourney';
import { ParticleEffects } from './components/ParticleEffects';
import { FairyDustCursor } from './components/FairyDustCursor';

type FlowState = 'intro' | 'map';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [flowState, setFlowState] = useState<FlowState>('intro');

  return (
    <main className="w-full h-[100svh] overflow-hidden relative text-princess-white bg-black">
      {/* Loading Scene (z-50) overlays everything, allowing the app to render and video to buffer behind it */}
      {isLoading && <LoadingScene onComplete={() => setIsLoading(false)} />}

      {/* Global Magical Particles constantly floating */}
      <div className="fixed inset-0 z-[5] pointer-events-none opacity-60">
        <ParticleEffects />
      </div>

      <FairyDustCursor />

      <AnimatePresence mode="wait">
        {flowState === 'intro' && (
          <motion.div 
            key="cinematic"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0 z-20"
          >
            <CinematicHero startVideo={!isLoading} onOpenDoors={() => setFlowState('map')} />
          </motion.div>
        )}



        {flowState === 'map' && (
          <motion.div 
            key="map"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full h-full absolute inset-0 z-10"
          >
            <ScrollJourney />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
