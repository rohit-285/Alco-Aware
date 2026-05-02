import React from 'react';
import { Brain, Droplets, Flame, HeartPulse, ShieldAlert } from 'lucide-react';
import { useBAC } from '../../context/BACContext';

const Meter = ({ label, value, tone = 'bg-primary' }) => (
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span className="text-text-muted">{label}</span>
      <span className="font-mono text-white">{Math.round(value)}%</span>
    </div>
    <div className="h-3 rounded-full bg-bg-surface overflow-hidden">
      <div className={`h-full ${tone}`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  </div>
);

const HealthDashboard = () => {
  const { calculationResult } = useBAC();
  const bac = Number(calculationResult?.bac || 0);
  const drinks = calculationResult?.drinks || [];
  const totalAlcohol = Number(calculationResult?.totalAlcoholG || 0);
  const calories = calculationResult?.calories || Math.round(totalAlcohol * 7);
  const liverStress = Math.min(100, (bac / 0.4) * 100);
  const dehydrationRisk = Math.min(100, drinks.length * 15);
  const riskScore = Math.min(10, Math.max(1, Math.ceil((bac / 0.2) * 10)));

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-text-muted">Health dashboard</div>
            <h3 className="text-3xl font-sora font-bold text-white mt-2">Tonight's body load</h3>
          </div>
          <div className="rounded-xl bg-danger/10 border border-danger/30 px-4 py-3">
            <div className="text-xs text-text-muted">Short-term risk</div>
            <div className="text-3xl font-mono text-danger">{riskScore}/10</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="space-y-5 lg:col-span-2">
            <Meter label="Liver stress estimate" value={liverStress} tone="bg-danger" />
            <Meter label="Dehydration risk" value={dehydrationRisk} tone="bg-warning" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Flame, label: 'Alcohol calories', value: calories },
                { icon: Droplets, label: 'Drinks logged', value: drinks.length },
                { icon: ShieldAlert, label: 'Sober estimate', value: `${Number(calculationResult?.hoursToSober || 0).toFixed(1)}h` }
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl bg-white/5 border border-border p-4">
                  <Icon className="text-primary mb-3" />
                  <div className="text-sm text-text-muted">{label}</div>
                  <div className="text-2xl text-white font-sora font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-bg-surface/60 border border-border p-5">
            <div className="text-sm text-text-muted mb-4">Organ impact</div>
            {[
              { icon: HeartPulse, label: 'Heart', text: bac > 0.08 ? 'Elevated strain' : 'Monitor pace' },
              { icon: Brain, label: 'Brain', text: bac > 0.05 ? 'Judgement affected' : 'Low impairment' },
              { icon: ShieldAlert, label: 'Liver', text: liverStress > 40 ? 'High processing load' : 'Processing alcohol' }
            ].map(({ icon: Icon, label, text }) => (
              <div key={label} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                <Icon className="text-primary" />
                <div>
                  <div className="text-white font-medium">{label}</div>
                  <div className="text-sm text-text-muted">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthDashboard;
