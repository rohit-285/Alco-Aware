import React from 'react';
import { motion } from 'framer-motion';
import { standardDrinks } from '../../utils/drinkData';

const StrengthComparison = () => {
  // Use beer as the baseline (13g alcohol)
  const baselineGrams = standardDrinks.beer.alcoholG;

  return (
    <section className="py-24 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-sora font-semibold text-white">What's Actually In Your Glass 🔎</h2>
        <p className="text-text-muted mt-3">Comparing standard portions across different drinks.</p>
      </div>

      <div className="space-y-8 glass-panel p-6 md:p-10 rounded-3xl">
        {Object.entries(standardDrinks).map(([key, drink], idx) => {
          // Calculate max width percentage visually (cap at 100%)
          const ratio = drink.alcoholG / baselineGrams;
          const displayPercentage = Math.min((ratio / 1.5) * 100, 100); // Scale relative to 1.5x baseline for visual spread

          let note = "";
          if (key === 'beer') note = "1 standard beer = baseline reference";
          else note = `1 ${drink.name.toLowerCase()} portion ≈ ${(ratio).toFixed(1)} standard beers`;

          return (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-end mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{drink.emoji}</span>
                  <span className="font-sora font-semibold text-white">{drink.name}</span>
                  <span className="text-xs text-text-muted font-inter">({drink.abv}% ABV, {drink.volume}ml)</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-primary">{drink.alcoholG}g</span>
                  <span className="text-xs text-text-muted ml-1">alcohol</span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-3 bg-bg-surface rounded-full overflow-hidden border border-border">
                <motion.div 
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${displayPercentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 w-1/3 animate-[translateX_2s_infinite]" />
                </motion.div>
              </div>

              <div className="text-xs text-text-muted font-inter italic text-right">
                {note}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StrengthComparison;
