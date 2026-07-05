import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Howl, Howler } from 'howler';

interface AudioContextType {
  isPlaying: boolean;
  startAudio: () => void;
  toggleMute: () => void;
  playSfx: (type: 'click' | 'sparkle' | 'pageTurn') => void;
  playVoice: (url: string) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const bgMusicRef = useRef<Howl | null>(null);
  
  useEffect(() => {
    // Initialize global settings
    Howler.volume(1.0);

    bgMusicRef.current = new Howl({
      src: ['https://incompetech.com/music/royalty-free/mp3-royaltyfree/Fairytale%20Waltz.mp3'], // A magical, princess-like orchestral waltz
      loop: true,
      volume: 0.4,
      html5: true, // Force HTML5 audio to allow streaming before full download
    });

    return () => {
      bgMusicRef.current?.unload();
    };
  }, []);

  const startAudio = () => {
    if (!hasStarted && bgMusicRef.current) {
      setHasStarted(true);
      setIsPlaying(true);
      bgMusicRef.current.play();
    }
  };

  const toggleMute = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    Howler.mute(!nextState); // Global mute toggle
  };

  const playSfx = (type: 'click' | 'sparkle' | 'pageTurn') => {
    if (!isPlaying) return;
    
    // In a real production app, map 'type' to actual tiny mp3 files here
    // Example:
    // const sfx = new Howl({ src: [`/sounds/${type}.mp3`], volume: 0.5 });
    // sfx.play();
  };

  const playVoice = (url: string) => {
    if (!isPlaying) return;
    const voice = new Howl({ src: [url], volume: 1.0 });
    voice.play();
  };

  return (
    <AudioContext.Provider value={{ isPlaying, startAudio, toggleMute, playSfx, playVoice }}>
      {children}
      
      {/* Floating Mute/Unmute Button (only shows after audio has started) */}
      {hasStarted && (
        <button 
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-[100] p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-white/20 transition-all active:scale-95"
          aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6 text-princess-gold drop-shadow-md" />
          ) : (
            <VolumeX className="w-6 h-6 text-white/50" />
          )}
        </button>
      )}
    </AudioContext.Provider>
  );
};
