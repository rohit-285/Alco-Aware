import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useBAC } from '../../context/BACContext';
import { getDrinkDetails, standardDrinks } from '../../utils/drinkData';
import Button from '../ui/Button';

const schema = z.object({
  weight: z.number().min(30, "Weight must be at least 30kg").max(200, "Weight cannot exceed 200kg"),
  gender: z.enum(['male', 'female'], { required_error: "Please select a gender" }),
  experience: z.enum(['first', 'occasional', 'experienced'], { required_error: "Select experience level" }),
  drinkType: z.enum(['beer', 'wine', 'whisky', 'vodka', 'rum'], { required_error: "Select a drink type" }),
  drinkCount: z.number().min(1).max(15)
});

const Calculator = () => {
  const { calculate, isCalculating } = useBAC();
  const [sliderLabel, setSliderLabel] = useState("");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      weight: 70,
      gender: 'male',
      experience: 'occasional',
      drinkType: 'beer',
      drinkCount: 3
    }
  });

  const watchDrinkType = watch("drinkType");
  const watchDrinkCount = watch("drinkCount");
  const watchGender = watch("gender");
  const watchExperience = watch("experience");

  useEffect(() => {
    const details = getDrinkDetails(watchDrinkType);
    if (details) {
      const totalVol = details.volume * watchDrinkCount;
      const totalGrams = (details.alcoholG * watchDrinkCount).toFixed(1);
      setSliderLabel(`${watchDrinkCount} Drinks = ${totalVol} ml of ${details.name} (~${totalGrams}g alcohol)`);
    }
  }, [watchDrinkType, watchDrinkCount]);

  const onSubmit = async (data) => {
    const success = await calculate(data);
    if (success) {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="glass-panel max-w-2xl mx-auto rounded-2xl p-8 shadow-2xl relative z-10"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-sora font-bold text-white inline-block relative">
          Calculate Your BAC
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full" />
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Row 1: Weight & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weight */}
          <div>
            <label className="block text-sm font-inter text-text-muted mb-2">Weight (kg)</label>
            <input 
              type="number"
              {...register("weight", { valueAsNumber: true })}
              className={`w-full bg-bg-surface/50 border ${errors.weight ? 'border-danger/50 focus:ring-danger/50' : 'border-border focus:ring-primary/50'} rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:ring-2 transition-all`}
              placeholder="e.g. 70"
            />
            {errors.weight && <p className="text-danger text-xs mt-1">{errors.weight.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-inter text-text-muted mb-2">
              Gender <span className="text-xs opacity-50 ml-1">(Affects r factor)</span>
            </label>
            <div className="flex bg-bg-surface/50 p-1 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setValue('gender', 'male')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${watchGender === 'male' ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md' : 'text-text-muted hover:text-white'}`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setValue('gender', 'female')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${watchGender === 'female' ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md' : 'text-text-muted hover:text-white'}`}
              >
                Female
              </button>
            </div>
            {errors.gender && <p className="text-danger text-xs mt-1">{errors.gender.message}</p>}
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-inter text-text-muted mb-2">Experience Level</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'first', emoji: '🥛', label: 'First Timer' },
              { id: 'occasional', emoji: '🍻', label: 'Occasional' },
              { id: 'experienced', emoji: '🥃', label: 'Experienced' }
            ].map(exp => (
              <button
                key={exp.id}
                type="button"
                onClick={() => setValue('experience', exp.id)}
                className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl text-sm border transition-all ${
                  watchExperience === exp.id 
                  ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                  : 'border-border bg-bg-surface/30 text-text-muted hover:bg-bg-surface'
                }`}
              >
                <span className="text-2xl mb-1">{exp.emoji}</span>
                <span className="text-xs font-medium text-center">{exp.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Drink Type */}
        <div>
          <label className="block text-sm font-inter text-text-muted mb-2">Alcohol Type</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(standardDrinks).map(([key, drink]) => {
              const isSelected = watchDrinkType === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setValue('drinkType', key)}
                  className={`relative flex flex-col items-center p-3 rounded-xl border transition-all ${
                    isSelected 
                    ? 'border-accent bg-accent/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
                    : 'border-border bg-bg-surface/30 text-text-muted hover:bg-bg-surface'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-accent rounded-full p-0.5">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                  <span className="text-2xl mb-1">{drink.emoji}</span>
                  <span className="text-xs font-semibold mb-1">{drink.name}</span>
                  <span className="text-[10px] opacity-70">{drink.abv}% ABV</span>
                  <span className="text-[10px] opacity-70">{drink.volume}ml</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Drink Count Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-inter text-text-muted">Number of Drinks</label>
            <span className="font-mono font-bold text-primary">{watchDrinkCount}</span>
          </div>
          <div className="relative py-4">
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              {...register("drinkCount", { valueAsNumber: true })}
              className="w-full h-2 bg-bg-surface rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
              style={{
                background: `linear-gradient(to right, var(--primary) ${(watchDrinkCount-1)/14*100}%, var(--bg-surface) ${(watchDrinkCount-1)/14*100}%)`
              }}
            />
            {/* Custom slider thumb styles defined in index.css */}
          </div>
          <p className="text-center text-xs text-text-muted font-inter mt-1">
            {sliderLabel}
          </p>
        </div>

        {/* Submit button */}
        <Button 
          type="submit" 
          disabled={isCalculating}
          className="w-full text-lg py-4"
        >
          {isCalculating ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculating...
            </span>
          ) : 'Calculate BAC'}
        </Button>

      </form>
    </motion.div>
  );
};

export default Calculator;
