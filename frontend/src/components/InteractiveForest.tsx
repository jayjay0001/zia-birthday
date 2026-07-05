import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

export const InteractiveForest = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  
  // Interactions State
  const [mushroomActive, setMushroomActive] = useState(false);
  const [flowerActive, setFlowerActive] = useState(false);
  const [riverActive, setRiverActive] = useState(false);

  // Cursor Sparkle Logic
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Throttle slightly by only creating a sparkle 30% of the time to avoid DOM overload
    if (Math.random() > 0.3) return;

    const newSparkle = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
    setSparkles((prev) => [...prev, newSparkle]);
    
    // Remove sparkle after 800ms
    setTimeout(() => {
      setSparkles((prev) => prev.filter(s => s.id !== newSparkle.id));
    }, 800);
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="absolute pointer-events-none text-xs drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] z-50"
          style={{ left: s.x, top: s.y, transform: 'translate(-50%, -50%)' }}
        >
          ✨
        </motion.div>
      ))}

      {/* Hitboxes */}
      
      {/* 1. Mushroom (Bottom Left) */}
      <div 
        className="absolute bottom-[25%] left-[15%] w-[20%] h-[15%] rounded-[50%] cursor-pointer z-40"
        onClick={() => setMushroomActive(true)}
      >
        {mushroomActive && (
          <motion.div 
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: -40 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
            onAnimationComplete={() => setTimeout(() => setMushroomActive(false), 2000)}
          >
            ✨
          </motion.div>
        )}
      </div>

      {/* 2. Flower/Tree (Middle Right) */}
      <div 
        className="absolute top-[55%] right-[15%] w-[15%] h-[20%] rounded-full cursor-pointer z-40"
        onClick={() => setFlowerActive(true)}
      >
        {flowerActive && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
            onAnimationComplete={() => setTimeout(() => setFlowerActive(false), 1500)}
          >
            🌸
          </motion.div>
        )}
      </div>

      {/* 3. River (Center) */}
      <div 
        className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-[30%] h-[10%] rounded-[50%] cursor-pointer z-40"
        onClick={() => setRiverActive(true)}
      >
        {riverActive && (
          <motion.div 
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-4 border-2 border-white/50 rounded-[50%] pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            onAnimationComplete={() => setRiverActive(false)}
          />
        )}
      </div>

      {/* Ambient FX */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Fireflies */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute w-1.5 h-1.5 bg-[#ffff99] rounded-full blur-[2px] shadow-[0_0_10px_#ffff99]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
};
