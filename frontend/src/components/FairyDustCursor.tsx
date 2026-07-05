import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Sparkle = {
  id: number;
  x: number;
  y: number;
  color: string;
};

const COLORS = ['#FF69B4', '#FFD700', '#FF1493', '#FFFFFF'];

export const FairyDustCursor = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Don't create too many, just every few pixels
      if (Math.random() > 0.4) return;
      
      const newSparkle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      };

      setSparkles(prev => [...prev.slice(-20), newSparkle]); // keep max 20

      // Remove after animation
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 1, scale: 0.5, x: sparkle.x - 10, y: sparkle.y - 10 }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              y: sparkle.y + 20 + Math.random() * 20,
              x: sparkle.x + (Math.random() - 0.5) * 40
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-4 h-4 rounded-full blur-[2px]"
            style={{ 
              backgroundColor: sparkle.color,
              boxShadow: `0 0 10px ${sparkle.color}`
            }}
          >
            {/* The inner core */}
            <div className="w-full h-full bg-white rounded-full opacity-80" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
