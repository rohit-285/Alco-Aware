import React, { useState } from 'react';
import { Pill } from 'lucide-react';

const INTERACTIONS = [
  { name: 'Metronidazole', severity: 'SEVERE', effect: 'Can cause violent nausea, vomiting, and flushing.' },
  { name: 'Antidepressants', severity: 'HIGH', effect: 'May increase sedation and worsen mood symptoms.' },
  { name: 'Warfarin', severity: 'HIGH', effect: 'Can increase bleeding risk.' },
  { name: 'Paracetamol', severity: 'MODERATE', effect: 'Can increase liver stress.' },
  { name: 'Antihistamines', severity: 'LOW', effect: 'Can increase drowsiness.' },
  { name: 'NSAIDs', severity: 'MODERATE', effect: 'Can increase stomach bleeding risk.' }
];

const MedicationChecker = () => {
  const [query, setQuery] = useState('');
  const matches = INTERACTIONS.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && query);

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-4"><Pill className="text-primary" /><h3 className="text-xl font-sora text-white">Medication checker</h3></div>
      <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-xl bg-bg-surface border border-border px-4 py-3 text-white" placeholder="Search medication..." />
      <div className="mt-4 space-y-3">
        {(matches.length ? matches : INTERACTIONS.slice(0, 2)).map((item) => (
          <div key={item.name} className="rounded-xl bg-white/5 border border-border p-4">
            <div className="flex justify-between gap-3">
              <span className="text-white font-semibold">{item.name}</span>
              <span className="text-danger text-xs font-bold">{item.severity}</span>
            </div>
            <p className="text-text-muted text-sm mt-2">{item.effect}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationChecker;
