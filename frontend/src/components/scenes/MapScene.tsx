import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export const MapScene = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] relative">
      <motion.div 
        className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-princess-gold/30 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden rounded-3xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 text-center drop-shadow-md">
          Kingdom Map
        </h2>
        
        <p className="text-princess-gold text-center font-sans tracking-widest uppercase text-sm mb-8">
          Navigate to the Royal Castle
        </p>

        {/* Map Placeholder */}
        <div className="w-full h-64 md:h-80 bg-[#a68c69]/20 rounded-2xl border-2 border-dashed border-princess-gold/50 flex flex-col items-center justify-center relative overflow-hidden group">
          {/* Faux map texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#ffffff_2px,_transparent_3px)] bg-[size:20px_20px]"></div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="z-10"
          >
            <MapPin className="text-princess-gold w-12 h-12 mb-2 drop-shadow-[0_0_15px_rgba(243,198,35,0.8)]" />
          </motion.div>
          <span className="text-white/60 font-serif italic text-lg z-10">[ Interactive Map Placeholder ]</span>
          <span className="text-white/40 font-sans text-xs mt-2 z-10">(Google Maps embed will go here)</span>
        </div>
      </motion.div>
    </div>
  );
};
