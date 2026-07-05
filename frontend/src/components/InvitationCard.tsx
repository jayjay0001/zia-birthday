import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';


export const InvitationCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 kuromi-bg w-full">
      <motion.div
        className="relative w-full max-w-md h-[550px] cursor-pointer perspective-1000"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isOpen ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of the Card */}
          <div 
            className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-kuromi-pink bg-kuromi-dark flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-kuromi-purple to-kuromi-pink mix-blend-overlay"></div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="z-10 w-56 h-56 mb-8 flex items-center justify-center border-2 border-dashed border-kuromi-pink/50 rounded-2xl"
            >
              {/* TODO: Insert Talking Kuromi Asset Here */}
              <span className="text-kuromi-pink/70 text-sm font-medium">Talking Kuromi Space</span>
            </motion.div>
            
            <h1 className="text-4xl font-bold text-kuromi-pink mb-4 drop-shadow-md z-10 font-sans tracking-wide">
              You're Invited!
            </h1>
            <p className="text-kuromi-purple font-medium text-lg z-10 animate-pulse">
              Tap to open
            </p>
          </div>

          {/* Back of the Card */}
          <div 
            className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl bg-gradient-to-br from-kuromi-dark to-kuromi-black border-4 border-kuromi-purple flex flex-col items-center justify-start p-8 text-center overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-kuromi-pink rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-kuromi-purple rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>
            
            <h2 className="text-3xl font-bold text-kuromi-white mt-8 mb-2 z-10 font-sans">
              Zia's 7th Birthday!
            </h2>
            <div className="w-16 h-1 bg-kuromi-pink rounded-full mb-10 z-10 mx-auto"></div>

            <div className="space-y-6 w-full max-w-sm z-10">
              <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-3 bg-kuromi-pink/20 rounded-lg">
                  <Calendar className="text-kuromi-pink w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-kuromi-white font-medium">Saturday, August 15th</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-3 bg-kuromi-purple/20 rounded-lg">
                  <Clock className="text-kuromi-purple w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Time</p>
                  <p className="text-kuromi-white font-medium">2:00 PM - 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="p-3 bg-kuromi-pink/20 rounded-lg">
                  <MapPin className="text-kuromi-pink w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-kuromi-white font-medium">123 Kuromi Castle St.</p>
                </div>
              </div>
            </div>

            <p className="mt-auto text-kuromi-purple text-sm font-medium z-10 mb-4">
              Don't forget to wear black or pink! 🖤🎀
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
