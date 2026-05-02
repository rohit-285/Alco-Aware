import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import Button from '../ui/Button';

// Utility for Tooltip later
const Tooltip = ({ children, text }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }} 
          animate={{ opacity: 1, y: -5 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-bg-surface border border-border rounded-lg text-xs w-48 text-center text-text-primary shadow-xl z-20 pointer-events-none"
        >
          {text}
        </motion.div>
      )}
    </div>
  );
};

const FormulaPill = ({ label, value, explanation, color }) => (
  <Tooltip text={explanation}>
    <div className="glass-panel px-3 py-2 flex items-center justify-center rounded-lg border hover:bg-white/5 transition-colors cursor-help group">
      <span className="font-inter text-xs text-text-muted mr-2">{label}</span>
      <span className={`font-mono font-bold ${color}`}>{value}</span>
    </div>
  </Tooltip>
);

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12 lg:py-0 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left column */}
        <div className="flex-1 flex flex-col items-start text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-8 uppercase tracking-wider"
          >
            <span role="img" aria-label="microscope">🔬</span> Educational Tool Only
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-sora font-extrabold text-white leading-tight tracking-tight mb-4"
          >
            Alco<span className="text-primary drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">Aware</span>
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-inter font-medium text-text-muted mb-6"
          >
            Know Before You Pour.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-text-primary/70 max-w-xl mb-10 leading-relaxed font-inter"
          >
            A smart, interactive calculator to estimate your Blood Alcohol Content (BAC). Make informed decisions and understand how alcohol affects your body.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              onClick={() => {
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-lg py-4 px-8"
            >
              Calculate My BAC <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Formula Breakdown */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } }
            }}
            className="mt-16 w-full max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-3 text-sm text-text-muted font-inter">
              <Info size={16} /> The Widmark Formula:
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <FormulaPill label="BAC" value="%" explanation="Blood Alcohol Content" color="text-danger" />
              </motion.div>
              <div className="text-text-muted font-mono">=</div>
              
              <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                <FormulaPill label="Alcohol" value="(g)" explanation="Derived from Drink Type × ABV × Volume" color="text-primary" />
              </motion.div>
              <div className="text-text-muted font-mono">÷</div>

              <div className="flex items-center gap-2 px-2 py-1 border border-border/50 rounded-xl bg-bg-surface/30">
                <div className="text-text-muted font-mono">(</div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  <FormulaPill label="Weight" value="(g)" explanation="Your body mass in grams" color="text-accent" />
                </motion.div>
                <div className="text-text-muted font-mono">×</div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  <FormulaPill label="r" value="Factor" explanation="Widmark constant: 0.68 for men, 0.55 for women" color="text-success" />
                </motion.div>
                <div className="text-text-muted font-mono">)</div>
              </div>

              <div className="text-text-muted font-mono">×</div>
              <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                <FormulaPill label="Multiplier" value="100" explanation="Percentage conversion" color="text-white" />
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Right column / Floating element */}
        <div className="flex-1 w-full max-w-md lg:max-w-full hidden md:block">
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="glass-panel rounded-[2rem] p-8 relative"
          >
            {/* Simple decorative preview gauge */}
            <div className="w-full aspect-square relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="62.8" className="opacity-30" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="200" className="animate-pulse" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-mono font-bold text-white drop-shadow-md">0.00</span>
                <span className="text-sm font-inter text-text-muted mt-2 tracking-wider">PREVIEW</span>
              </div>
            </div>
            
            {/* Overlay blurs */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 blur-xl -z-10 rounded-[3rem]" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
