import React from 'react';
import { useLottie } from 'lottie-react';
import sparkleAnimation from '../assets/sparkles.json';

const Sparkle = () => {
  const options = {
    animationData: sparkleAnimation,
    loop: true
  };
  const { View } = useLottie(options);
  return <>{View}</>;
};

export const ParticleEffects = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 mix-blend-screen flex items-center justify-center">
      {/* Repeating lottie to cover more ground */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2"><Sparkle /></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2"><Sparkle /></div>
      <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2"><Sparkle /></div>
    </div>
  );
};
