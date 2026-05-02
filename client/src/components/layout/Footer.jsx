import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-10 mt-20 border-t border-border bg-bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-text-muted font-inter gap-4">
        <div>&copy; {new Date().getFullYear()} AlcoAware. All rights reserved.</div>
        <div className="flex items-center gap-2">
          <span>Made for awareness with</span>
          <Heart size={14} className="text-danger" fill="currentColor" />
        </div>
        <div className="max-w-xl text-center md:text-right">
          AlcoAware is for educational and awareness purposes only. BAC estimates are approximations and should never replace a certified breathalyzer. Never drink and drive. Follow your local laws.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
