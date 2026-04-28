import React, { useState } from 'react';
import { useBAC } from '../../context/BACContext';
import { motion, AnimatePresence } from 'framer-motion';

const PersonalityEngine = () => {
  const { personality, rerollPersonality, calculationResult } = useBAC();
  const [isFlipped, setIsFlipped] = useState(false);

  if (!calculationResult || !personality) return null;

  const handleReroll = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      rerollPersonality();
    }, 250); // half way through animation
  };

  return (
    <section className="py-12 max-w-sm mx-auto w-full px-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-sora text-primary">Your Drunk Alter Ego</h3>
      </div>
      
      <div className="perspective-1000">
        <motion.div 
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 60, damping: 15 }}
          className="relative w-full preserve-3d cursor-pointer"
          onClick={handleReroll}
        >
          {/* Front */}
          <div className={`glass-panel p-8 rounded-3xl text-center border-primary/20 bg-gradient-to-b from-primary/10 to-transparent shadow-[0_0_30px_rgba(245,158,11,0.1)] backface-hidden ${isFlipped ? 'invisible' : 'visible'}`}>
            <div className="text-[80px] leading-none mb-4 filter drop-shadow-md">
              {personality.emoji}
            </div>
            <h4 className="font-sora text-2xl font-bold text-primary mb-2">
              {personality.name}
            </h4>
            <p className="font-inter text-text-muted text-sm leading-relaxed mb-6">
              "{personality.desc}"
            </p>
            <button className="text-xs bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full font-medium inline-flex items-center transition-colors">
              🎲 Re-roll Personality
            </button>
          </div>

          {/* Back (mirrored content conceptually, just to complete the flip) */}
          <div className={`absolute top-0 left-0 w-full h-full glass-panel p-8 rounded-3xl text-center border-accent/20 bg-gradient-to-b from-accent/10 to-transparent shadow-[0_0_30px_rgba(139,92,246,0.1)] backface-hidden [transform:rotateY(180deg)] ${!isFlipped ? 'invisible' : 'visible'}`}>
             <div className="text-[80px] leading-none mb-4 filter drop-shadow-md">
              {personality.emoji}
            </div>
            <h4 className="font-sora text-2xl font-bold text-accent mb-2">
              {personality.name}
            </h4>
            <p className="font-inter text-text-muted text-sm leading-relaxed mb-6">
              "{personality.desc}"
            </p>
            <button className="text-xs bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full font-medium inline-flex items-center transition-colors">
              🎲 Re-roll Personality
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalityEngine;
