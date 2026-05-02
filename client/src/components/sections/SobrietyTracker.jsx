import React, { useState } from 'react';
import { Award } from 'lucide-react';
import toast from 'react-hot-toast';

const BADGES = [
  { id: 'first_week', name: '7-Day Clear', days: 7 },
  { id: 'two_weeks', name: 'Fortnight Free', days: 14 },
  { id: 'one_month', name: '30-Day Champion', days: 30 },
  { id: 'three_months', name: 'Quarter Master', days: 90 }
];

const SobrietyTracker = () => {
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('alcoaware_streak') || 0));
  const checkIn = () => {
    const next = streak + 1;
    setStreak(next);
    localStorage.setItem('alcoaware_streak', next);
    toast.success('Sober day checked in.');
  };

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4"><Award className="text-primary" /><h3 className="text-xl font-sora text-white">Sobriety streak</h3></div>
      <div className="text-5xl font-mono text-primary">{streak}</div>
      <div className="text-text-muted">clear days</div>
      <button onClick={checkIn} className="mt-4 rounded-xl bg-primary text-black px-4 py-3 font-semibold">Check in sober day</button>
      <div className="grid grid-cols-2 gap-3 mt-5">
        {BADGES.map((badge) => (
          <div key={badge.id} className={`rounded-xl border p-3 ${streak >= badge.days ? 'border-primary bg-primary/10' : 'border-border bg-white/5 opacity-60'}`}>
            <div className="text-white font-semibold">{badge.name}</div>
            <div className="text-text-muted text-sm">{badge.days} days</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SobrietyTracker;
