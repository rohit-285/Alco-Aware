import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const DrinkLimitGoal = ({ drinks = [], currentBAC = 0 }) => {
  const [drinkLimit, setDrinkLimit] = useState(() => Number(localStorage.getItem('alcoaware_drink_limit') || 4));
  const [bacLimit, setBacLimit] = useState(() => Number(localStorage.getItem('alcoaware_bac_limit') || 0.06));
  const drinkProgress = Math.min(100, (drinks.length / drinkLimit) * 100);
  const bacProgress = Math.min(100, (currentBAC / bacLimit) * 100);

  useEffect(() => {
    localStorage.setItem('alcoaware_drink_limit', drinkLimit);
    localStorage.setItem('alcoaware_bac_limit', bacLimit);
  }, [drinkLimit, bacLimit]);

  useEffect(() => {
    if (drinks.length === Math.ceil(drinkLimit * 0.8)) toast('You are close to your drink limit.');
    if (drinks.length === drinkLimit) toast.error('Drink limit reached. Stop for the night.');
  }, [drinks.length, drinkLimit]);

  return (
    <div className="glass-panel rounded-2xl p-5">
      <h3 className="text-xl font-sora font-bold text-white mb-4">Drink limit goal</h3>
      <label className="text-sm text-text-muted">Nightly drink limit: {drinkLimit}</label>
      <input type="range" min="1" max="10" value={drinkLimit} onChange={(event) => setDrinkLimit(Number(event.target.value))} className="w-full accent-primary" />
      <label className="text-sm text-text-muted">BAC limit: {bacLimit.toFixed(2)}%</label>
      <input type="range" min="0.02" max="0.08" step="0.01" value={bacLimit} onChange={(event) => setBacLimit(Number(event.target.value))} className="w-full accent-primary" />
      <div className="mt-4 space-y-3">
        <div className="h-3 rounded-full bg-bg-surface overflow-hidden"><div className="h-full bg-warning" style={{ width: `${drinkProgress}%` }} /></div>
        <div className="h-3 rounded-full bg-bg-surface overflow-hidden"><div className="h-full bg-danger" style={{ width: `${bacProgress}%` }} /></div>
      </div>
    </div>
  );
};

export default DrinkLimitGoal;
