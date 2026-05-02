import React, { useMemo, useState } from 'react';
import { MapPinned } from 'lucide-react';
import { INDIA_STATE_DATA } from '../../data/stateData';

const LegalMap = () => {
  const [selected, setSelected] = useState('Delhi');
  const [query, setQuery] = useState('');
  const states = useMemo(() => {
    return Object.entries(INDIA_STATE_DATA).filter(([name]) => name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);
  const info = INDIA_STATE_DATA[selected];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <MapPinned className="text-primary" />
          <div>
            <h3 className="text-2xl font-sora font-bold text-white">India legal awareness map</h3>
            <p className="text-sm text-text-muted">Search all 28 states and 8 union territories.</p>
          </div>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full mb-4 rounded-xl bg-bg-surface border border-border px-4 py-3 text-white"
          placeholder="Search state or union territory..."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-80 overflow-auto pr-1">
          {states.map(([name, data]) => (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className={`rounded-xl border p-3 text-left ${selected === name ? 'border-primary bg-primary/10' : 'border-border bg-white/5'}`}
            >
              <div className={`w-3 h-3 rounded-full mb-2 ${data.isDry ? 'bg-danger' : 'bg-success'}`} />
              <div className="text-white text-sm font-semibold break-words">{name}</div>
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-xl bg-bg-surface/70 border border-border p-5">
          <div className="text-xl font-sora text-white">{selected}</div>
          <div className="text-text-muted mt-2">Status: {info.isDry ? 'Dry state or restricted region' : 'Alcohol permitted with restrictions'}</div>
          <div className="text-text-muted">Legal BAC for driving: {info.legalBAC.toFixed(2)}%</div>
          <div className="text-text-muted">Dry days: {info.dryDays.join(', ')}</div>
          <div className="text-text-muted">Penalties: {info.penalties}</div>
        </div>
      </div>
    </section>
  );
};

export default LegalMap;
