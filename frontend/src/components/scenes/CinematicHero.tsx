import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import allSceneVideo from '../../assets/all_scene.mp4';

export const CinematicHero = ({ startVideo, onOpenDoors }: { startVideo?: boolean, onOpenDoors: () => void }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [subtitle, setSubtitle] = useState("");
  const [isAtDoor, setIsAtDoor] = useState(false);

  useEffect(() => {
    if (startVideo) {
      if (audioRef.current) audioRef.current.play().catch(console.error);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(console.error);
      }
    }
  }, [startVideo]);

  const handleAudioTimeUpdate = () => {
    if (!audioRef.current) return;
    const t = audioRef.current.currentTime;
    
    // Perfectly mapped to the 19.4-second Director's Cut
    if (t >= 0.0 && t < 2.5) setSubtitle("Beyond the enchanted forest...");
    else if (t >= 2.5 && t < 6.5) setSubtitle("Where every flower blooms with magic...");
    else if (t >= 6.5 && t < 10.0) setSubtitle("...lies a kingdom, waiting to be discovered.");
    else if (t >= 10.0 && t < 13.0) setSubtitle("A grand castle...");
    else if (t >= 13.0 && t < 16.5) setSubtitle("...preparing for a very special celebration.");
    else if (t >= 16.5 && t < 19.5) setSubtitle("Welcome... to Zia's magical day.");
    else setSubtitle("");
  };

  const handleVideoEnded = () => {
    setIsAtDoor(true);
  };

  return (
    <div className="relative w-full h-[100svh] overflow-hidden bg-black flex items-center justify-center">
      {/* Hidden Dedicated Audio Clock for perfect sync */}
      <audio 
        ref={audioRef} 
        src="/narration.mp3" 
        onTimeUpdate={handleAudioTimeUpdate} 
      />

      {/* Unified All Scene Video - Removed loop so it naturally stops at the door */}
      <video
        ref={videoRef}
        src={allSceneVideo}
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Very subtle gradient just for subtitles to be readable, instead of blacking out the whole screen */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10"></div>

      {/* Disney Cinematic Subtitles Overlay */}
      <div className="absolute bottom-[10%] left-0 w-full flex justify-center z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          {!isAtDoor && subtitle && (
            <motion.p
              key={subtitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-[#f3c623] font-disney text-3xl md:text-5xl text-center px-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-wide"
            >
              {subtitle}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* The Big Interactive Door Button - Moved to absolute center */}
      <div className="absolute inset-0 flex items-center justify-center z-40">
        <AnimatePresence>
          {isAtDoor && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              onClick={onOpenDoors}
              className="px-12 py-6 bg-black/40 backdrop-blur-md border-2 border-[#f3c623] text-[#f3c623] font-disney text-5xl md:text-6xl rounded-2xl shadow-[0_0_50px_rgba(243,198,35,0.6)] hover:bg-[#f3c623]/20 hover:scale-110 hover:shadow-[0_0_80px_rgba(243,198,35,1)] transition-all duration-300 cursor-pointer"
            >
              Open the Doors
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Skip Button */}
      <div className="absolute top-12 right-6 z-50">
        <button
          onClick={onOpenDoors}
          className="px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/30 text-white/70 text-xs uppercase tracking-widest rounded-full hover:bg-white/20 hover:text-white transition-all"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
};
