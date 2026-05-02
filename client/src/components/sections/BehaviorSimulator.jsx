import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Eye, Gauge } from 'lucide-react';
import { useBAC } from '../../context/BACContext';

const BAC_STAGES = [
  { range: [0, 0.02], label: 'Sober', color: '#22c55e', reactionTime: 'Normal', vision: 'Clear', coordination: 'Normal', decisions: 'Steady' },
  { range: [0.02, 0.05], label: 'Relaxed', color: '#84cc16', reactionTime: '+10%', vision: 'Slight blur', coordination: 'Slightly reduced', decisions: 'Looser' },
  { range: [0.05, 0.08], label: 'Euphoric', color: '#eab308', reactionTime: '+25%', vision: 'Blurred', coordination: 'Reduced', decisions: 'Riskier' },
  { range: [0.08, 0.15], label: 'Excited', color: '#f97316', reactionTime: '+50%', vision: 'Double vision risk', coordination: 'Poor', decisions: 'Impaired' },
  { range: [0.15, 0.25], label: 'Confused', color: '#ef4444', reactionTime: '+100%', vision: 'Severe blur', coordination: 'Very poor', decisions: 'Unsafe' },
  { range: [0.25, 0.35], label: 'Stupor', color: '#7f1d1d', reactionTime: 'Unresponsive', vision: 'Blackout risk', coordination: 'None', decisions: 'Emergency' },
  { range: [0.35, 1], label: 'Coma Risk', color: '#111827', reactionTime: 'N/A', vision: 'N/A', coordination: 'N/A', decisions: 'Emergency' }
];

const BehaviorSimulator = () => {
  const { calculationResult } = useBAC();
  const bac = Number(calculationResult?.bac || 0);
  const stage = BAC_STAGES.find((item) => bac >= item.range[0] && bac < item.range[1]) || BAC_STAGES[0];
  const wobble = Math.min(10, bac * 70);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 items-stretch">
        <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="text-sm uppercase tracking-[0.25em] text-text-muted mb-2">Behavior simulator</div>
          <motion.div
            animate={{ rotate: [0, -wobble, wobble, 0], x: [0, wobble / 2, -wobble / 2, 0] }}
            transition={{ repeat: Infinity, duration: Math.max(1.2, 3 - bac * 6), ease: 'easeInOut' }}
            className="w-36 h-52 my-5 relative"
          >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-16 h-16 rounded-full border-4" style={{ borderColor: stage.color }} />
            <div className="absolute left-1/2 top-16 -translate-x-1/2 w-3 h-24 rounded-full" style={{ backgroundColor: stage.color }} />
            <div className="absolute left-1/2 top-24 -translate-x-1/2 w-32 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
            <div className="absolute left-[52px] top-36 w-3 h-20 rounded-full origin-top rotate-12" style={{ backgroundColor: stage.color }} />
            <div className="absolute right-[52px] top-36 w-3 h-20 rounded-full origin-top -rotate-12" style={{ backgroundColor: stage.color }} />
          </motion.div>
          <h3 className="text-3xl font-sora font-bold" style={{ color: stage.color }}>{stage.label}</h3>
          <p className="text-text-muted mt-2">Estimated BAC {bac.toFixed(3)}%</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Activity, label: 'Reaction time', value: stage.reactionTime },
            { icon: Eye, label: 'Vision quality', value: stage.vision },
            { icon: Gauge, label: 'Balance', value: stage.coordination },
            { icon: Brain, label: 'Decision making', value: stage.decisions }
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-panel rounded-2xl p-5">
              <Icon className="text-primary mb-4" size={28} />
              <div className="text-text-muted text-sm">{label}</div>
              <div className="text-2xl font-sora font-semibold text-white mt-2">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BehaviorSimulator;
