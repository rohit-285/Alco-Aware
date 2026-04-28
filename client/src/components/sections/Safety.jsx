import React from 'react';
import { motion } from 'framer-motion';

const Safety = () => {
  const safetyRules = [
    { icon: '🚫', title: 'Never Drink & Drive', desc: 'It kills. Full stop. Call a cab or rideshare.' },
    { icon: '💧', title: 'Hydrate', desc: 'One glass of water for every alcoholic drink.' },
    { icon: '🍽️', title: 'Eat Before Drinking', desc: 'Food slows alcohol absorption significantly.' },
    { icon: '📏', title: 'Know Your Limits', desc: 'BAC doesn\'t care about your "tolerance".' },
    { icon: '🧑🤝🧑', title: 'Don\'t Drink Alone', desc: 'Always have someone you trust nearby.' },
    { icon: '🏥', title: 'Recognize Warning Signs', desc: 'Confusion, vomiting, passing out = stop now.' },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 border-t border-border mt-12">
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-sora font-semibold text-white">Drink Responsibly 🛡️</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Col - Safety Rules */}
        <div>
          <h3 className="text-xl font-sora text-primary mb-6">Essential Safety Rules</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {safetyRules.map((rule, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-5 rounded-2xl hover:bg-bg-surface transition-colors"
              >
                <div className="text-3xl mb-3">{rule.icon}</div>
                <h4 className="font-sora font-semibold text-white text-sm mb-2">{rule.title}</h4>
                <p className="font-inter text-text-muted text-xs leading-relaxed">{rule.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Col - Emergency Card */}
        <div className="flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full glass-panel p-8 rounded-3xl border-danger/40 bg-gradient-to-br from-danger/20 to-bg-surface relative overflow-hidden group"
          >
            {/* Animated pulsing border effect */}
            <div className="absolute inset-0 border-2 border-danger/30 rounded-3xl animate-[pulse_3s_ease-in-out_infinite]" />
            
            <h3 className="text-2xl font-sora font-bold text-danger mb-6 flex items-center gap-2">
              <span className="animate-pulse">🆘</span> If Someone Is Unresponsive
            </h3>
            
            <div className="space-y-4 mb-8 text-sm md:text-base font-inter">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center font-bold shrink-0 mt-0.5">1</div>
                <p className="text-white">Call emergency services <strong>immediately</strong>.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center font-bold shrink-0 mt-0.5">2</div>
                <p className="text-white">Place them in the <strong>recovery position</strong> (on their side) to prevent choking on vomit.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center font-bold shrink-0 mt-0.5">3</div>
                <p className="text-white">Do <strong>NOT</strong> leave them alone under any circumstances.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center font-bold shrink-0 mt-0.5">4</div>
                <p className="text-white">Do <strong>NOT</strong> give them coffee, water, or food to "sober them up". It does not work and can be a choking hazard.</p>
              </div>
            </div>

            <div className="bg-bg-base/80 rounded-2xl p-5 border border-white/10">
              <h4 className="font-sora text-text-muted text-sm uppercase tracking-wider mb-3">Emergency Contacts (India)</h4>
              <ul className="space-y-2 font-mono text-lg">
                <li className="flex justify-between items-center text-white">
                  <span>Standard Emergency</span>
                  <a href="tel:112" className="text-danger font-bold hover:underline">112</a>
                </li>
                <li className="flex justify-between items-center text-white">
                  <span className="text-sm">Vandrevala Foundation (Mental Health)</span>
                  <a href="tel:18602662345" className="text-danger hover:underline text-sm">1860-2662-345</a>
                </li>
                <li className="flex justify-between items-center text-white">
                  <span className="text-sm">iCall (Psychosocial Helpline)</span>
                  <a href="tel:9152987821" className="text-danger hover:underline text-sm">9152987821</a>
                </li>
              </ul>
            </div>
            
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Safety;
