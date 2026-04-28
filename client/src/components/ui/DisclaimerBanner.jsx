import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const DisclaimerBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 pointer-events-none flex justify-center">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="pointer-events-auto bg-bg-surface/90 backdrop-blur-xl border border-warning/30 shadow-lg shadow-warning/10 rounded-2xl p-3 max-w-2xl w-full mx-auto flex items-start gap-3"
      >
        <div className="text-warning mt-0.5 shrink-0">
          <AlertTriangle size={20} />
        </div>
        <p className="text-sm text-text-muted font-inter leading-relaxed">
          <strong className="text-warning font-sora mr-1">WARNING:</strong>
          Alcohol is injurious to health. This tool is for educational and awareness purposes only. Never drink and drive. Always drink responsibly.
        </p>
      </motion.div>
    </div>
  );
};

export default DisclaimerBanner;
