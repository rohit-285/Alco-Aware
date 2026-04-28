import React from 'react';
import { useBAC } from '../../context/BACContext';
import { motion } from 'framer-motion';

const statuses = {
  safe:     { color: 'var(--success)',  label: 'Safe Zone',     desc: "You appear unaffected. Stay aware." },
  mild:     { color: 'var(--warning)',  label: 'Mild Effects',  desc: "You may feel relaxed. Don't drive." },
  impaired: { color: '#f97316',         label: 'Impaired',      desc: "Judgement is impaired. Stop drinking." }, // orange-500
  danger:   { color: 'var(--danger)',   label: 'Danger Zone',   desc: "Serious risk. Seek support immediately." },
  critical: { color: 'var(--critical)', label: 'Critical',      desc: "EMERGENCY LEVEL. Call for help now." }
};

const BACGauge = ({ bac, level }) => {
  const currentStatus = statuses[level] || statuses.safe;
  
  // Calculate sweep angle (max BAC 0.25 for display purposes)
  const maxBac = 0.25;
  const percentage = Math.min(bac / maxBac, 1);
  // SVG Arc from 135 deg to 405 deg (270 degree sweep)
  const angle = 135 + (percentage * 270);
  
  // Needle rotation
  const needleTransform = `rotate(${angle} 50 50)`;

  return (
    <div className="relative w-64 h-64 mx-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Definitions for gradients */}
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="100%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--success)" />
            <stop offset="25%" stopColor="var(--warning)" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="75%" stopColor="var(--danger)" />
            <stop offset="100%" stopColor="var(--critical)" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background track (dimmed) */}
        <path 
          d="M 20 80 A 45 45 0 1 1 80 80" 
          fill="none" 
          stroke="var(--bg-surface)" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        
        {/* Colored arc */}
        <path 
          d="M 20 80 A 45 45 0 1 1 80 80" 
          fill="none" 
          stroke="url(#arcGradient)" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />

        {/* Needle (Pivot at 50,50) */}
        <motion.g 
          initial={{ rotate: 135 }}
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 50, damping: 12, delay: 0.2 }}
          style={{ transformOrigin: '50px 50px' }}
        >
          {/* Needle Base */}
          <circle cx="50" cy="50" r="4" fill="var(--text-primary)" />
          {/* Needle Pointer */}
          <path d="M 48 50 L 50 15 L 52 50 Z" fill="var(--text-primary)" filter="url(#glow)"/>
        </motion.g>

      </svg>
      
      {/* Center Text Labels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="text-4xl font-mono font-bold"
          style={{ color: currentStatus.color, textShadow: `0 0 10px ${currentStatus.color}40` }}
        >
          {bac.toFixed(3)}%
        </motion.div>
        <span className="text-sm font-sora font-semibold tracking-wide mt-1" style={{ color: currentStatus.color }}>
          {currentStatus.label}
        </span>
      </div>
    </div>
  );
};

export default BACGauge;
