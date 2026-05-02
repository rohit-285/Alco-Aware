import React from 'react';
import { TrendingDown } from 'lucide-react';
import { useBAC } from '../../context/BACContext';

const ToleranceProfile = () => {
  const { calculationResult } = useBAC();
  const tonight = Number(calculationResult?.bac || 0);
  const personalAverage = Number(localStorage.getItem('alcoaware_avg_bac') || 0.045);
  const trend = tonight <= personalAverage ? 'improving' : tonight > personalAverage * 1.2 ? 'worsening' : 'stable';

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4"><TrendingDown className="text-primary" /><h3 className="text-xl font-sora text-white">Tolerance profile</h3></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/5 p-4 border border-border"><div className="text-text-muted text-sm">Average peak</div><div className="text-2xl text-white font-mono">{personalAverage.toFixed(3)}%</div></div>
        <div className="rounded-xl bg-white/5 p-4 border border-border"><div className="text-text-muted text-sm">Tonight</div><div className="text-2xl text-white font-mono">{tonight.toFixed(3)}%</div></div>
      </div>
      <div className="mt-4 rounded-xl bg-primary/10 border border-primary/30 p-4 text-white capitalize">{trend} trend</div>
    </div>
  );
};

export default ToleranceProfile;
