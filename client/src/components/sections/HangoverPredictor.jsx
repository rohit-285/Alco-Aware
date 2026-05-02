import React, { useMemo, useState } from 'react';
import { CloudRain } from 'lucide-react';
import { useBAC } from '../../context/BACContext';

const CONGENER_LEVELS = { vodka: 0.1, gin: 0.2, beer: 0.3, wine: 0.5, rum: 0.7, whiskey: 0.8, whisky: 0.8, brandy: 0.9 };

const HangoverPredictor = () => {
  const { calculationResult } = useBAC();
  const [lastMealHours, setLastMealHours] = useState(2);
  const prediction = useMemo(() => {
    const drinks = calculationResult?.drinks || [];
    const bac = Number(calculationResult?.bac || 0);
    const avgCongener = drinks.length ? drinks.reduce((sum, drink) => sum + (CONGENER_LEVELS[drink.type] || 0.5), 0) / drinks.length : 0;
    const score = (bac * 10) + (avgCongener * 3) + (lastMealHours * 0.5);
    if (score < 3) return { severity: 'Mild', tips: ['Drink water before bed', 'Eat a light breakfast'] };
    if (score < 6) return { severity: 'Moderate', tips: ['Use electrolytes tonight', 'Avoid coffee early', 'Eat a proper breakfast'] };
    return { severity: 'High', tips: ['Stop drinking now', 'Drink water slowly', 'Sleep in', 'Choose bland food tomorrow'] };
  }, [calculationResult, lastMealHours]);

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4"><CloudRain className="text-primary" /><h3 className="text-xl font-sora text-white">Hangover predictor</h3></div>
      <label className="text-sm text-text-muted">Hours since last meal: {lastMealHours}</label>
      <input type="range" min="0" max="10" value={lastMealHours} onChange={(event) => setLastMealHours(Number(event.target.value))} className="w-full accent-primary" />
      <div className="mt-4 rounded-xl bg-white/5 border border-border p-4">
        <div className="text-sm text-text-muted">Predicted severity</div>
        <div className="text-2xl text-white font-sora">{prediction.severity}</div>
        <ul className="mt-3 text-text-muted space-y-1">{prediction.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
      </div>
    </div>
  );
};

export default HangoverPredictor;
