import React from 'react';
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const hourly = [
  { hour: '6p', bac: 0.015 },
  { hour: '8p', bac: 0.028 },
  { hour: '10p', bac: 0.052 },
  { hour: '12a', bac: 0.061 },
  { hour: '2a', bac: 0.044 }
];
const drinks = [{ name: 'Beer', count: 42 }, { name: 'Whisky', count: 25 }, { name: 'Wine', count: 18 }];
const ratio = [{ name: 'Low risk', value: 68 }, { name: 'High risk', value: 32 }];

const CommunityFeed = () => (
  <section className="max-w-6xl mx-auto px-4 py-12">
    <div className="glass-panel rounded-2xl p-6">
      <div className="text-sm uppercase tracking-[0.25em] text-text-muted">Community insights</div>
      <h3 className="text-2xl font-sora font-bold text-white mt-2 mb-5">Live tonight snapshot</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white/5 border border-border p-4">
          <div className="text-text-muted text-sm">Active sessions</div>
          <div className="text-4xl text-primary font-mono">128</div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={hourly}><XAxis dataKey="hour" stroke="#64748b" /><YAxis hide /><Tooltip /><Area dataKey="bac" stroke="#f59e0b" fill="#f59e0b33" /></AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl bg-white/5 border border-border p-4">
          <div className="text-text-muted text-sm mb-3">Popular drinks</div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={drinks}><XAxis dataKey="name" stroke="#64748b" /><YAxis hide /><Tooltip /><Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl bg-white/5 border border-border p-4">
          <div className="text-text-muted text-sm mb-3">Safe vs high risk</div>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart><Pie data={ratio} dataKey="value" innerRadius={45} outerRadius={75}>{ratio.map((entry, index) => <Cell key={entry.name} fill={index ? '#ef4444' : '#22c55e'} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </section>
);

export default CommunityFeed;
