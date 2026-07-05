import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Crown, Star, Mail, Heart } from 'lucide-react';
import mapImg from '../../assets/pink_castle.png';

// Import our scenes (mini stories)
import { MemoriesScene } from './MemoriesScene';
import { ThemeScene } from './ThemeScene';
import { DetailsScene } from './DetailsScene';
import { RSVPScene } from './RSVPScene';
import { CelebrantScene } from './CelebrantScene';

type Hotspot = {
  id: string;
  label: string;
  x: string;
  y: string;
  icon: React.ReactNode;
  component: React.ReactNode;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "memories",
    label: "Portrait Gallery",
    x: "15%",
    y: "30%",
    icon: <ImageIcon className="w-8 h-8 text-princess-gold drop-shadow-md" />,
    component: <MemoriesScene />
  },
  {
    id: "theme",
    label: "Dress Code",
    x: "85%",
    y: "35%",
    icon: <Crown className="w-8 h-8 text-princess-gold drop-shadow-md" />,
    component: <ThemeScene />
  },
  {
    id: "details",
    label: "The Grand Carriage",
    x: "70%",
    y: "75%",
    icon: <Star className="w-8 h-8 text-princess-gold drop-shadow-md" />,
    component: <DetailsScene />
  },
  {
    id: "celebrant",
    label: "The Birthday Princess",
    x: "48%",
    y: "55%",
    icon: <Heart className="w-8 h-8 text-pink-400 drop-shadow-md fill-pink-400" />,
    component: <CelebrantScene />
  },
  {
    id: "rsvp",
    label: "Royal Mailbox",
    x: "30%",
    y: "80%",
    icon: <Mail className="w-8 h-8 text-princess-gold drop-shadow-md" />,
    component: <RSVPScene />
  }
];

export const InteractiveMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);
  const [foundItems, setFoundItems] = useState<string[]>([]);
  
  const handleSpotClick = (spot: Hotspot) => {
    if (!foundItems.includes(spot.id)) {
      setFoundItems(prev => [...prev, spot.id]);
    }
    setActiveSpot(spot);
  };
  
  return (
    <div ref={containerRef} className="w-full h-[100svh] overflow-hidden bg-black relative">
      
      {/* Draggable Map Canvas */}
      <motion.div 
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        animate={{
          scale: activeSpot ? 1.4 : 1,
          opacity: activeSpot ? 0.3 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="w-[200vw] h-[200vh] md:w-[150vw] md:h-[150vh] absolute top-[-50vh] left-[-50vw] md:top-[-25vh] md:left-[-25vw] cursor-grab active:cursor-grabbing touch-none"
        style={{ 
          backgroundImage: `url(${mapImg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center'
        }}
      >
        {/* Render Hotspots */}
        {HOTSPOTS.map((spot) => {
          const isFound = foundItems.includes(spot.id);

          return (
            <div 
              key={spot.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
              style={{ left: spot.x, top: spot.y }}
              onClick={() => handleSpotClick(spot)}
            >
              {/* Pulsing glow */}
              <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${isFound ? 'bg-princess-gold' : 'bg-white'}`}></div>
              
              {/* The Icon */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={isFound ? { rotateY: [0, 360] } : {}}
                transition={{ duration: 0.6 }}
                className={`relative w-16 h-16 md:w-20 md:h-20 backdrop-blur-md rounded-full border-2 shadow-[0_0_20px_rgba(243,198,35,0.8)] flex items-center justify-center transition-colors ${
                  isFound 
                    ? 'bg-white/20 border-princess-gold hover:bg-white/40' 
                    : 'bg-black/40 border-white/50 hover:bg-black/60'
                }`}
              >
                {isFound ? spot.icon : <Sparkles className="w-8 h-8 text-white animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />}
              </motion.div>
              
              {/* Label */}
              <AnimatePresence>
                {isFound && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/70 backdrop-blur-sm text-princess-gold font-serif px-4 py-1.5 rounded-full text-xs md:text-sm shadow-xl whitespace-nowrap border border-princess-gold/30 pointer-events-none"
                  >
                    {spot.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>

      {/* Persistent UI Overlay */}
      <div className="absolute top-8 left-0 w-full flex justify-center pointer-events-none z-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[#f3c623] font-disney text-3xl md:text-5xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-wide bg-black/50 px-8 py-3 rounded-full backdrop-blur-md border border-[#f3c623]/30"
        >
          Zia's Magical Kingdom
        </motion.h1>
      </div>
      <div className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none z-20">
        <div className="bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-princess-gold/50 text-[#f3c623] text-xs md:text-sm font-sans shadow-lg uppercase tracking-[0.2em] animate-pulse">
          Find the hidden magic! Tap glowing stars to reveal.
        </div>
      </div>

      {/* Modal Overlay for the Mini Stories */}
      <AnimatePresence>
        {activeSpot && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(15px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 overflow-y-auto"
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveSpot(null)}
              className="fixed top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-princess-gold flex items-center justify-center text-white text-xl hover:bg-princess-gold/40 hover:scale-110 transition-all z-[60] shadow-[0_0_15px_rgba(243,198,35,0.4)] cursor-pointer"
            >
              ✕
            </button>

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring", bounce: 0.3 }}
              className="w-full max-w-5xl mx-auto p-4 md:p-8 min-h-[80vh] flex flex-col items-center justify-center relative my-auto pt-24 pb-12"
            >
              <div className="w-full bg-gradient-to-br from-princess-dark/60 to-black/60 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] border border-princess-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-2 md:p-6 relative">
                 {/* Internal Scroll if content is too tall */}
                 <div className="w-full max-h-[75vh] overflow-y-auto custom-scrollbar">
                   {activeSpot.component}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
