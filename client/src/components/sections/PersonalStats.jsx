import React, { useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Trash2 } from 'lucide-react';
import { useBAC } from '../../context/BACContext';

const getMonthKey = (dateValue) => {
  const date = new Date(dateValue);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const formatMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric'
  });
};

const PersonalStats = () => {
  const { history, deleteHistoryEntry, clearHistory } = useBAC();
  const [selectedMonth, setSelectedMonth] = useState(() => getMonthKey(new Date()));

  const availableMonths = useMemo(() => {
    const months = new Set([getMonthKey(new Date())]);
    history.forEach((entry) => months.add(getMonthKey(entry.createdAt)));
    return Array.from(months).sort().reverse();
  }, [history]);

  const stats = useMemo(() => {
    const monthEntries = history.filter((entry) => {
      return getMonthKey(entry.createdAt) === selectedMonth;
    });
    const drinksThisMonth = monthEntries.reduce((sum, entry) => sum + (entry.result?.drinks?.length || entry.inputs?.drinkCount || 0), 0);
    const peakBAC = monthEntries.reduce((peak, entry) => Math.max(peak, Number(entry.result?.bac || 0)), 0);
    const avgBAC = monthEntries.length
      ? monthEntries.reduce((sum, entry) => sum + Number(entry.result?.bac || 0), 0) / monthEntries.length
      : 0;
    const chartData = monthEntries.slice().reverse().map((entry) => ({
      name: new Date(entry.createdAt).toLocaleDateString(undefined, { day: 'numeric' }),
      drinks: entry.result?.drinks?.length || entry.inputs?.drinkCount || 0,
      bac: Number(entry.result?.bac || 0)
    }));

    return { monthEntries, drinksThisMonth, peakBAC, avgBAC, chartData };
  }, [history, selectedMonth]);

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-text-muted">Your stats</div>
          <h3 className="text-2xl font-sora font-bold text-white mt-2">{formatMonthLabel(selectedMonth)}</h3>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            className="rounded-xl border border-border bg-bg-surface px-4 py-2 text-sm text-white outline-none focus:border-primary"
            aria-label="Select stats month"
          >
            {availableMonths.map((monthKey) => (
              <option key={monthKey} value={monthKey}>
                {formatMonthLabel(monthKey)}
              </option>
            ))}
          </select>
          {history.length > 0 && (
            <button onClick={clearHistory} className="rounded-xl border border-danger/40 px-4 py-2 text-danger">
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="rounded-xl bg-white/5 border border-border p-4">
          <div className="text-sm text-text-muted">Drinks logged</div>
          <div className="text-3xl font-mono text-primary">{stats.drinksThisMonth}</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-border p-4">
          <div className="text-sm text-text-muted">Average BAC</div>
          <div className="text-3xl font-mono text-white">{stats.avgBAC.toFixed(3)}%</div>
        </div>
        <div className="rounded-xl bg-white/5 border border-border p-4">
          <div className="text-sm text-text-muted">Peak BAC</div>
          <div className="text-3xl font-mono text-danger">{stats.peakBAC.toFixed(3)}%</div>
        </div>
      </div>

      <div className="h-56 rounded-xl bg-white/5 border border-border p-4 mb-5">
        {stats.chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData}>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)' }} />
              <Bar dataKey="drinks" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-text-muted">No BAC calculations logged for {formatMonthLabel(selectedMonth)}.</div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 mb-3">
        <h4 className="font-sora text-lg font-semibold text-white">History</h4>
        <span className="text-sm text-text-muted">{history.length} saved total</span>
      </div>
      <div className="space-y-3 max-h-80 overflow-auto pr-1">
        {history.map((entry) => (
          <div key={entry.localId} className="rounded-xl bg-bg-surface/70 border border-border p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-white font-semibold">{new Date(entry.createdAt).toLocaleString()}</div>
              <div className="text-sm text-text-muted">
                {entry.result?.drinks?.length || 0} drink(s), BAC {Number(entry.result?.bac || 0).toFixed(3)}%, sober in {Number(entry.result?.hoursToSober || 0).toFixed(1)}h
              </div>
            </div>
            <button onClick={() => deleteHistoryEntry(entry.localId)} className="rounded-lg border border-border p-2 text-danger" aria-label="Delete wrong entry">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalStats;
