import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-40 border-b border-border bg-bg-base/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl" role="img" aria-label="beer">🍺</span>
          <span className="font-sora font-bold text-lg tracking-tight text-white group-hover:text-primary transition-colors">
            Booze<span className="text-primary">Meter</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            to="/stats" 
            className={`font-inter text-sm font-medium transition-colors ${
              !isHome ? 'text-primary' : 'text-text-muted hover:text-white'
            }`}
          >
            Insights & Stats
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
