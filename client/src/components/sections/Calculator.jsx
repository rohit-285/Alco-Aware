import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useBAC } from '../../context/BACContext';
import { standardDrinks } from '../../utils/drinkData';
import Button from '../ui/Button';
import VoiceInput from './VoiceInput';
import DrinkPhotoUpload from './DrinkPhotoUpload';

const schema = z.object({
  weight: z.number().min(30, 'Weight must be at least 30kg').max(200, 'Weight cannot exceed 200kg'),
  gender: z.enum(['male', 'female']),
  experience: z.enum(['first', 'occasional', 'experienced']),
  drinkingDuration: z.number().min(0).max(24),
  mealType: z.enum(['empty', 'light', 'heavy']),
  waterGlasses: z.number().min(0).max(12),
  drinkingFrequency: z.enum(['rare', 'occasional', 'weekly', 'frequent'])
});

const createDrink = (type = 'beer') => ({
  id: crypto.randomUUID(),
  type,
  volume: standardDrinks[type]?.volume || 330,
  percentage: standardDrinks[type]?.abv || 5
});

const Calculator = ({ onCalculated }) => {
  const { calculate, isCalculating } = useBAC();
  const [drinks, setDrinks] = useState([createDrink('beer'), createDrink('beer')]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      weight: 70,
      gender: 'male',
      experience: 'occasional',
      drinkingDuration: 2,
      mealType: 'light',
      waterGlasses: 1,
      drinkingFrequency: 'occasional'
    }
  });

  const waterGlasses = watch('waterGlasses');
  const drinkingFrequency = watch('drinkingFrequency');
  const mealType = watch('mealType');
  const gender = watch('gender');
  const experience = watch('experience');

  const totalAlcohol = useMemo(() => drinks.reduce((sum, drink) => {
    return sum + (Number(drink.volume) * (Number(drink.percentage) / 100) * 0.789);
  }, 0), [drinks]);

  useEffect(() => {
    if (!drinks.length) setDrinks([createDrink('beer')]);
  }, [drinks.length]);

  const updateDrink = (id, key, value) => {
    setDrinks((current) => current.map((drink) => {
      if (drink.id !== id) return drink;
      if (key === 'type') {
        const preset = standardDrinks[value];
        return { ...drink, type: value, volume: preset.volume, percentage: preset.abv };
      }
      return { ...drink, [key]: Number(value) };
    }));
  };

  const addParsedDrinks = (parsedDrinks) => {
    setDrinks((current) => [
      ...current,
      ...parsedDrinks.map((drink) => ({
        id: crypto.randomUUID(),
        type: drink.type || 'custom',
        volume: drink.volume,
        percentage: drink.percentage || drink.abv
      }))
    ]);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      drinkType: drinks[0]?.type || 'custom',
      drinkCount: drinks.length,
      drinks: drinks.map(({ id, ...drink }) => drink)
    };
    const success = await calculate(payload);
    if (success) {
      onCalculated?.();
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      className="glass-panel max-w-5xl mx-auto rounded-2xl p-6 md:p-8 shadow-2xl relative z-10"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-text-muted">Advanced BAC engine</div>
          <h2 className="text-3xl font-sora font-bold text-white mt-2">Calculate Your BAC</h2>
        </div>
        <div className="rounded-xl bg-white/5 border border-border px-4 py-3">
          <div className="text-xs text-text-muted">Alcohol logged</div>
          <div className="font-mono text-primary text-xl">{totalAlcohol.toFixed(1)}g</div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm text-text-muted mb-2">Weight (kg)</label>
            <input type="number" {...register('weight', { valueAsNumber: true })} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-primary/40" />
            {errors.weight && <p className="text-danger text-xs mt-1">{errors.weight.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-2">Gender</label>
            <div className="flex bg-bg-surface/70 p-1 rounded-xl border border-border">
              {['male', 'female'].map((item) => (
                <button key={item} type="button" onClick={() => setValue('gender', item)} className={`flex-1 py-2 rounded-lg capitalize ${gender === item ? 'bg-primary text-black' : 'text-text-muted'}`}>{item}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-2">Drinking duration (hours)</label>
            <input type="number" step="0.5" {...register('drinkingDuration', { valueAsNumber: true })} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm text-text-muted mb-2">Meal type</label>
            <div className="grid grid-cols-3 gap-2">
              {['empty', 'light', 'heavy'].map((item) => (
                <button key={item} type="button" onClick={() => setValue('mealType', item)} className={`rounded-xl border px-3 py-3 capitalize ${mealType === item ? 'border-primary bg-primary/10 text-primary' : 'border-border text-text-muted'}`}>{item}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-2">Water during session: {waterGlasses} glass{waterGlasses === 1 ? '' : 'es'}</label>
            <input type="range" min="0" max="12" {...register('waterGlasses', { valueAsNumber: true })} className="w-full accent-primary" />
            <p className="text-xs text-text-muted mt-2">Water helps dehydration, but it does not make you sober faster.</p>
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-2">How often do you drink?</label>
            <select {...register('drinkingFrequency')} className="w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-white">
              <option value="rare">Rarely</option>
              <option value="occasional">Occasionally</option>
              <option value="weekly">Weekly</option>
              <option value="frequent">Frequently</option>
            </select>
            <p className="text-xs text-text-muted mt-2">{drinkingFrequency === 'frequent' ? 'Tolerance can hide danger. BAC still stays high.' : 'Used for risk notes, not to reduce BAC.'}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm text-text-muted">Individual drink logger</label>
            <button type="button" onClick={() => setDrinks((current) => [...current, createDrink('beer')])} className="rounded-lg bg-primary text-black px-3 py-2 flex items-center gap-2 text-sm font-semibold"><Plus size={16} /> Add Drink</button>
          </div>
          <div className="space-y-3">
            {drinks.map((drink, index) => (
              <div key={drink.id} className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr_auto] gap-3 rounded-xl bg-white/5 border border-border p-3">
                <select value={drink.type} onChange={(event) => updateDrink(drink.id, 'type', event.target.value)} className="bg-bg-surface border border-border rounded-lg px-3 py-2 text-white">
                  {Object.keys(standardDrinks).map((key) => <option key={key} value={key}>{standardDrinks[key].name}</option>)}
                </select>
                <div className="relative">
                  <input type="number" value={drink.volume} onChange={(event) => updateDrink(drink.id, 'volume', event.target.value)} className="w-full bg-bg-surface border border-border rounded-lg pl-3 pr-12 py-2 text-white" aria-label={`Drink ${index + 1} volume in ml`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">ml</span>
                </div>
                <div className="relative">
                  <input type="number" value={drink.percentage} onChange={(event) => updateDrink(drink.id, 'percentage', event.target.value)} className="w-full bg-bg-surface border border-border rounded-lg pl-3 pr-16 py-2 text-white" aria-label={`Drink ${index + 1} ABV percent`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">% ABV</span>
                </div>
                <button type="button" onClick={() => setDrinks((current) => current.filter((item) => item.id !== drink.id))} className="rounded-lg border border-border p-2 text-danger"><Trash2 /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VoiceInput onDrinksDetected={addParsedDrinks} />
          <DrinkPhotoUpload onDrinkIdentified={(drink) => addParsedDrinks([drink])} />
        </div>

        <div>
          <label className="block text-sm text-text-muted mb-2">Experience level</label>
          <div className="grid grid-cols-3 gap-3">
            {['first', 'occasional', 'experienced'].map((item) => (
              <button key={item} type="button" onClick={() => setValue('experience', item)} className={`rounded-xl border px-3 py-3 capitalize ${experience === item ? 'border-accent bg-accent/10 text-white' : 'border-border text-text-muted'}`}>{item}</button>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isCalculating} className="w-full text-lg py-4">
          {isCalculating ? 'Calculating...' : 'Calculate BAC'}
        </Button>
      </form>
    </motion.div>
  );
};

export default Calculator;
