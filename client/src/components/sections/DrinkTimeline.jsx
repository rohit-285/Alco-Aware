import React from 'react';
import { useBAC } from '../../context/BACContext';
import { motion } from 'framer-motion';

const timelineNodes = [
  { count: 1, color: 'text-success border-success/50 bg-success/10',    message: "You feel relaxed. Tension fades away." },
  { count: 2, color: 'text-success border-success/50 bg-success/10',    message: "Confidence rises. You own the conversation." },
  { count: 3, color: 'text-warning border-warning/50 bg-warning/10',    message: "You might start humming. Volume creeping up." },
  { count: 4, color: 'text-orange-500 border-orange-500/50 bg-orange-500/10', message: "Coordination slips. Watch your step." },
  { count: 5, color: 'text-orange-500 border-orange-500/50 bg-orange-500/10', message: "Your friends exchange quiet glances." },
  { count: 6, color: 'text-danger border-danger/50 bg-danger/10',      message: "Serious impairment. Please stop now." },
  { count: 7, color: 'text-danger border-danger/50 bg-danger/10',      message: "Your liver filed a formal HR complaint." },
  { count: 8, color: 'text-critical border-critical/50 bg-critical/20',message: "Medical emergency territory. Get help." },
  // 9+ repeats the critical warning
];

const DrinkTimeline = () => {
  const { lastInputs } = useBAC();

  if (!lastInputs || !lastInputs.drinkCount) return null;

  const drinkCount = lastInputs.drinkCount;
  // Generate a list of nodes up to max(user count, 8) to show progression
  const displayNodes = timelineNodes.slice(0, Math.max(drinkCount, 4));

  return (
    <section className="py-20 max-w-3xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-sora text-white">Drink Progression Timeline</h2>
        <p className="text-text-muted mt-2">What's happening at every glass.</p>
      </div>

      <div className="relative border-l border-border/50 ml-6 md:ml-12 space-y-8">
        {displayNodes.map((node, i) => {
          const isReached = node.count <= drinkCount;
          const isCurrent = node.count === drinkCount;
          const isFuture = !isReached;

          // For counts > 8
          const actualNode = node.count >= 8 && drinkCount >= 8 
            ? { count: isCurrent ? drinkCount : node.count, color: node.color, message: node.message } // show actual drink count for the final node if >= 8
            : node;

          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className={`relative pl-8 md:pl-12 transition-all ${isFuture ? 'opacity-30 grayscale' : ''}`}
            >
              {/* Timeline Connector Dot */}
              <div 
                className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center -translate-x-1/2 -ml-[0.5px] border-2 bg-bg-surface z-10 ${
                  isReached ? actualNode.color.split(' ')[1] : 'border-border'
                } ${isCurrent ? 'shadow-[0_0_15px_currentColor]' : ''}`}
              >
                <div className={`w-3 h-3 rounded-full ${isReached ? (actualNode.color.split(' ').find(c=>c.startsWith('bg-')).replace('bg-', 'bg-').split('/')[0]) : 'bg-surface'}`} />
              </div>
              
              {/* Card */}
              <div className={`p-5 rounded-2xl border ${isReached ? actualNode.color.split(' ').slice(1).join(' ') : 'border-border bg-bg-surface/30'} flex flex-col md:flex-row items-start md:items-center gap-4`}>
                <div className={`font-mono text-xl font-bold flex-shrink-0 ${isReached ? actualNode.color.split(' ')[0] : 'text-text-muted'}`}>
                  Drink {actualNode.count}{actualNode.count >= 8 ? '+' : ''}
                </div>
                <p className="font-inter text-text-primary/90 text-sm md:text-base leading-relaxed flex-1">
                  {isFuture && <span className="mr-2 opacity-50">🔒</span>}
                  {actualNode.message}
                </p>
                {isCurrent && (
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl animate-pulse">
                    👈
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default DrinkTimeline;
