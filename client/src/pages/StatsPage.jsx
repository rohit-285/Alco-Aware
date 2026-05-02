import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const SkeletonCard = () => (
  <div className="glass-panel p-6 rounded-2xl h-32 animate-pulse flex flex-col justify-between">
    <div className="h-4 w-1/2 bg-white/10 rounded" />
    <div className="h-8 w-1/3 bg-white/10 rounded" />
  </div>
);

const SkeltetonChart = () => (
  <div className="glass-panel p-6 rounded-3xl h-80 animate-pulse flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
  </div>
);

const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        toast.error('Failed to load global statistics');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Format data for Recharts
  const drinkData = stats?.drinkTypeBreakdown?.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    count: item.count
  })) || [];

  const activityData = stats?.calculationsPerDay?.map(item => {
    // Format date string to 'MMM DD'
    const dateObj = new Date(item._id);
    const formatted = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    return { date: formatted, calculations: item.count };
  }) || [];

  const pieColors = {
    safe: 'var(--success)',
    mild: 'var(--warning)',
    impaired: '#f97316',
    danger: 'var(--danger)',
    critical: 'var(--critical)'
  };
  const pieData = stats?.bacLevelBreakdown?.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
    color: pieColors[item._id] || '#ffffff'
  })) || [];

  // Custom Tooltip style for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 border-border rounded-xl shadow-xl text-sm font-inter">
          <p className="font-semibold text-white mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name || 'Count'}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-12 mb-20">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-sora font-bold text-white mb-4">Global Insights 📊</h1>
          <p className="text-text-muted font-inter max-w-2xl text-lg">
            Aggregated, anonymous statistics from all AlcoAware calculations worldwide.
          </p>
        </div>

        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {isLoading ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />) : (
            <>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-panel p-6 rounded-2xl border-t border-t-primary/50 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-4 -mt-4 transition-transform group-hover:scale-150" />
                <h3 className="text-text-muted font-sora text-sm tracking-wider uppercase mb-2">Total Scans</h3>
                <div className="text-4xl font-mono font-bold text-white">{stats.totalCalculations.toLocaleString()}</div>
              </motion.div>
              
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-2xl border-t border-t-accent/50 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl -mr-4 -mt-4 transition-transform group-hover:scale-150" />
                <h3 className="text-text-muted font-sora text-sm tracking-wider uppercase mb-2">Most Popular</h3>
                <div className="text-2xl font-sora font-bold text-white capitalize flex items-center h-[40px]">{stats.mostPopularDrink}</div>
              </motion.div>
              
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-2xl border-t border-t-success/50 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-24 h-24 bg-success/10 rounded-full blur-2xl -mr-4 -mt-4 transition-transform group-hover:scale-150" />
                <h3 className="text-text-muted font-sora text-sm tracking-wider uppercase mb-2">Global Avg BAC</h3>
                <div className="text-4xl font-mono font-bold text-white">{stats.avgBAC.toFixed(3)}%</div>
              </motion.div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-2xl border-t border-t-white/30 relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-4 -mt-4 transition-transform group-hover:scale-150" />
                <h3 className="text-text-muted font-sora text-sm tracking-wider uppercase mb-2">Total Reviews</h3>
                <div className="text-4xl font-mono font-bold text-white">{stats.totalReviews.toLocaleString()}</div>
              </motion.div>
            </>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Activity Area Chart */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-sora text-xl text-white ml-2">Activity (Last 30 Days)</h3>
            {isLoading ? <SkeltetonChart /> : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-4 md:p-6 rounded-3xl h-[400px]">
                {!activityData.length ? (
                  <div className="w-full h-full flex items-center justify-center text-text-muted">No data available</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCalculations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="calculations" name="Scans" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorCalculations)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </motion.div>
            )}
          </div>

          {/* Right Col Charts */}
          <div className="space-y-6">
            
            {/* Drink Popularity Bar */}
            <div className="space-y-4">
              <h3 className="font-sora text-xl text-white ml-2">Drink Types</h3>
              {isLoading ? <SkeltetonChart /> : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-4 rounded-3xl h-[200px]">
                   {!drinkData.length ? (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">No data available</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={drinkData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                        <Bar dataKey="count" fill="var(--accent)" radius={[0, 4, 4, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </motion.div>
              )}
            </div>

            {/* BAC Level Distribution Pie */}
            <div className="space-y-4">
              <h3 className="font-sora text-xl text-white ml-2">Safety Distribution</h3>
              {isLoading ? <SkeltetonChart /> : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-4 rounded-3xl h-[230px]">
                   {!pieData.length ? (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">No data available</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </motion.div>
              )}
            </div>

          </div>

        </div>

      </div>
    </PageWrapper>
  );
};

export default StatsPage;
