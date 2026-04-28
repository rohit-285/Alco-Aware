import React from 'react';
import { useBAC } from '../../context/BACContext';
import { motion, AnimatePresence } from 'framer-motion';
import BACGauge from '../charts/BACGauge';

const BACResult = () => {
  const { calculationResult } = useBAC();

  if (!calculationResult) return null;

  const { bac, bacLevel } = calculationResult;

  const levels = [
    { id: 'safe',     label: 'Safe Zone',     range: '< 0.03%',    icon: '✅', color: 'bg-success/20 border-success/50 text-success' },
    { id: 'mild',     label: 'Mild Effects',  range: '0.03–0.06%', icon: '🟡', color: 'bg-warning/20 border-warning/50 text-warning' },
    { id: 'impaired', label: 'Impaired',      range: '0.06–0.10%', icon: '🟠', color: 'bg-orange-500/20 border-orange-500/50 text-orange-500' },
    { id: 'danger',   label: 'Danger Zone',   range: '0.10–0.20%', icon: '🔴', color: 'bg-danger/20 border-danger/50 text-danger' },
    { id: 'critical', label: 'Critical',      range: '> 0.20%',    icon: '💀', color: 'bg-critical/30 border-critical/50 text-red-500' }
  ];

  const currentLevelData = levels.find(l => l.id === bacLevel) || levels[0];

  const alertMessages = {
    safe: "You appear unaffected. Stay aware.",
    mild: "You may feel relaxed. Don't drive.",
    impaired: "Judgement is impaired. Stop drinking.",
    danger: "Serious risk. Seek support immediately.",
    critical: "EMERGENCY LEVEL. Call for help now."
  };

  return (
    <AnimatePresence>
      <motion.div 
        id="result"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto py-16 px-4"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-sora text-white">Your Estimated BAC</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Gauge Column */}
          <div className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background ambient glow based on severity */}
            <div 
              className="absolute inset-0 opacity-10 blur-3xl -z-10"
              style={{ backgroundColor: currentLevelData.color.split(' ')[0].replace('bg-', '') }} // Hacky way to get raw color
            />
            <BACGauge bac={bac} level={bacLevel} />
          </div>

          {/* Table & Alert Column */}
          <div className="space-y-6">
            
            {/* Contextual Alert Card */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`p-5 rounded-2xl border ${currentLevelData.color} flex items-start gap-4 backdrop-blur-md`}
            >
              <span className="text-2xl">{currentLevelData.icon}</span>
              <div>
                <h4 className="font-sora font-semibold mb-1 uppercase tracking-wider text-sm">Status Alert</h4>
                <p className="font-inter text-sm opacity-90">{alertMessages[bacLevel]}</p>
              </div>
            </motion.div>

            {/* Classification Table */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-border">
              <div className="grid grid-cols-3 p-4 bg-white/5 border-b border-border text-xs font-inter text-text-muted uppercase tracking-wider">
                <div className="col-span-1">Level</div>
                <div className="col-span-1 text-center">BAC Range</div>
                <div className="col-span-1 text-right">Indicator</div>
              </div>
              <div className="p-2 flex flex-col gap-1">
                {levels.map((lvl) => {
                  const isActive = lvl.id === bacLevel;
                  return (
                    <div 
                      key={lvl.id}
                      className={`grid grid-cols-3 p-3 rounded-xl items-center transition-all ${
                        isActive ? 'bg-white/10 shadow-lg scale-[1.02] border border-white/10' : 'opacity-40 hover:opacity-70'
                      }`}
                    >
                      <div className="col-span-1 font-sora text-sm text-white flex items-center gap-2">
                        {lvl.icon} {lvl.label}
                      </div>
                      <div className="col-span-1 text-center font-mono text-xs text-text-muted">
                        {lvl.range}
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <div className={`w-3 h-3 rounded-full ${lvl.color.split(' ')[0]} border box-content shadow-[0_0_10px_currentColor]`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BACResult;
