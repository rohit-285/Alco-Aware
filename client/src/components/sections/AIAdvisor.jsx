import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import api from '../../services/api';

const AIAdvisor = () => {
  const [userPlan, setUserPlan] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    if (!userPlan.trim()) return;
    setLoading(true);
    try {
      const response = await api.post('/ai/advice', { userPlan, userProfile: { weight: 70, gender: 'male' } });
      setAdvice(response.advice || response.data?.advice);
    } catch {
      setAdvice('Pace at one standard drink per hour, eat before your first drink, alternate every drink with water, arrange transport before going out, and stop early if you feel impaired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-primary" />
          <h3 className="text-2xl font-sora font-bold text-white">AI drink advisor</h3>
        </div>
        <textarea
          value={userPlan}
          onChange={(event) => setUserPlan(event.target.value)}
          rows={4}
          className="w-full rounded-xl bg-bg-surface border border-border px-4 py-3 text-white outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Describe your night plan..."
        />
        <button onClick={getAdvice} disabled={loading} className="mt-3 rounded-xl bg-primary px-5 py-3 text-black font-semibold disabled:opacity-60">
          {loading ? 'Thinking...' : 'Get AI Advice'}
        </button>
        {advice && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-xl bg-white/5 border border-border p-5 text-text-primary leading-relaxed">
            {advice}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AIAdvisor;
