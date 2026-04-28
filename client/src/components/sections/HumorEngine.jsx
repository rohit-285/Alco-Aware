import React from 'react';
import { useBAC } from '../../context/BACContext';
import { motion, AnimatePresence } from 'framer-motion';

const HumorEngine = () => {
  const { humorMessages, rerollHumor, calculationResult } = useBAC();

  if (!calculationResult || humorMessages.length === 0) return null;

  return (
    <section className="py-12 max-w-2xl mx-auto w-full px-4">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-sora text-white">The Vibe Right Now</h3>
        <button 
          onClick={rerollHumor}
          className="text-primary hover:text-white text-sm font-medium transition-colors"
        >
          🎰 New Messages
        </button>
      </div>
      
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {humorMessages.map((msg, idx) => (
            <motion.div
              key={msg + idx} // Just to force re-render/animation on shuffle
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-4 rounded-xl border-l-4 border-l-primary flex items-start"
            >
               <p className="font-inter text-text-primary text-sm italic">"{msg}"</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HumorEngine;
