import React, { useState } from 'react';
import { Plus, Square } from 'lucide-react';
import DrinkLimitGoal from './DrinkLimitGoal';

const LiveSessionTracker = ({ calculationResult }) => {
  const [active, setActive] = useState(false);
  const [drinks, setDrinks] = useState([]);

  const addDrink = () => {
    setActive(true);
    setDrinks((current) => [...current, { type: 'quick drink', time: new Date().toLocaleTimeString() }]);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-5">
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-text-muted">Live session</div>
              <h3 className="text-2xl font-sora font-bold text-white">{active ? 'Tracking tonight' : 'Ready to track'}</h3>
            </div>
            <button onClick={addDrink} className="rounded-full bg-primary text-black p-4"><Plus /></button>
          </div>
          <div className="space-y-3 min-h-32">
            {drinks.length ? drinks.map((drink, index) => (
              <div key={`${drink.time}-${index}`} className="flex justify-between rounded-xl bg-white/5 border border-border p-3">
                <span className="text-white">Drink {index + 1}</span>
                <span className="text-text-muted">{drink.time}</span>
              </div>
            )) : <div className="text-text-muted">Start a session or calculate BAC to populate your timeline.</div>}
          </div>
          {active && <button onClick={() => setActive(false)} className="mt-5 rounded-xl border border-border px-4 py-3 text-white flex items-center gap-2"><Square size={16} /> End Session</button>}
        </div>
        <DrinkLimitGoal drinks={calculationResult?.drinks?.length ? calculationResult.drinks : drinks} currentBAC={Number(calculationResult?.bac || 0)} />
      </div>
    </section>
  );
};

export default LiveSessionTracker;
