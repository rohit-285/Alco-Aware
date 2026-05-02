import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useBAC } from '../../context/BACContext';
import { useCountdown } from '../../hooks/useCountdown';
import { generateSessionReport } from '../../utils/generateReport';
import BACGauge from '../charts/BACGauge';

const BACResult = () => {
  const { calculationResult, lastInputs } = useBAC();
  const countdown = useCountdown(calculationResult?.hoursToSober);

  if (!calculationResult) return null;

  const { bac, bacLevel, decayCurve = [], hoursToSober = 0 } = calculationResult;
  const alertMessages = {
    safe: 'You appear minimally affected. Stay aware.',
    mild: 'Relaxation can mask impairment. Do not drive.',
    impaired: 'Judgement is impaired. Stop drinking.',
    danger: 'Serious risk. Get support and avoid being alone.',
    critical: 'Emergency risk. Call for help now.'
  };

  return (
    <AnimatePresence>
      <motion.section
        id="result"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl mx-auto py-16 px-4"
      >
        <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-text-muted">Result</div>
            <h2 className="text-3xl font-sora text-white">Your Estimated BAC</h2>
          </div>
          <button
            onClick={() => generateSessionReport({ ...calculationResult, userProfile: lastInputs })}
            className="rounded-xl border border-border bg-white/5 px-4 py-3 text-white flex items-center gap-2"
          >
            <Download size={18} /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center">
            <BACGauge bac={bac} level={bacLevel} />
            <div className="mt-5 text-center">
              <div className="text-text-muted text-sm">Time to estimated sober</div>
              <div className="text-3xl font-mono text-primary">
                {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass-panel rounded-2xl p-5">
              <div className="text-sm uppercase tracking-[0.2em] text-text-muted">Status alert</div>
              <p className="text-xl text-white mt-2">{alertMessages[bacLevel]}</p>
              <p className="text-text-muted mt-2">Estimated sober in {Number(hoursToSober).toFixed(1)} hours. BAC estimates are not a driving clearance.</p>
              {calculationResult.impairmentNote && (
                <p className="text-sm text-primary mt-3">{calculationResult.impairmentNote}</p>
              )}
            </div>
            <div id="bac-decay-chart" className="glass-panel rounded-2xl p-5 h-72">
              <div className="text-sm text-text-muted mb-3">BAC decay curve</div>
              <ResponsiveContainer width="100%" height="88%">
                <LineChart data={decayCurve}>
                  <XAxis dataKey="hour" stroke="#64748b" label={{ value: 'Hours', position: 'insideBottom', offset: -4, fill: '#64748b' }} />
                  <YAxis stroke="#64748b" domain={[0, 'dataMax']} />
                  <Tooltip contentStyle={{ background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  <Line type="monotone" dataKey="bac" stroke="#f59e0b" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default BACResult;
