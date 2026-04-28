import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  const cards = [
    {
      title: "How BAC Works",
      desc: "Alcohol absorbs in 30–90 min to reach peak BAC. Your liver metabolizes ~0.015% BAC per hour — there is no shortcut, coffee doesn't help.",
      icon: "⏱️",
      tag: "Metabolism"
    },
    {
      title: "Body Weight & Composition",
      desc: "Heavier bodies hold more water, diluting alcohol more. Muscle holds more water than fat — so people with the same weight can have different BACs.",
      icon: "⚖️",
      tag: "Biology"
    },
    {
      title: "Why Everyone Is Different",
      desc: "Genetics affect ADH enzyme levels. Hydration, food in stomach, medications, and sleep all change how quickly your body processes alcohol.",
      icon: "🧬",
      tag: "Genetics"
    },
    {
      title: "The Tolerance Myth",
      desc: "Experienced drinkers may feel less intoxicated — but their BAC is identical. Tolerance is just your brain adapting to impairment, not liver efficiency.",
      icon: "🧠",
      tag: "Psychology"
    }
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-sora font-semibold text-white">How It All Works 🔬</h2>
        <p className="text-text-muted mt-3">The science behind the sip.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-8 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:scale-110 transition-transform duration-500">
              {card.icon}
            </div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="text-4xl bg-white/5 p-3 rounded-2xl shrink-0 border border-white/5">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-sora font-semibold text-white mb-3">
                  {card.title}
                </h3>
                <p className="font-inter text-text-muted text-sm leading-relaxed mb-6">
                  {card.desc}
                </p>
                <div className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full border border-accent/20">
                  {card.tag}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
