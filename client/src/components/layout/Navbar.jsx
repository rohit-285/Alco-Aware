import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthModal from '../auth/AuthModal';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [authOpen, setAuthOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

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
            Alco<span className="text-primary">Aware</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            to="/stats" 
            className={`font-inter text-sm font-medium transition-colors ${
              !isHome ? 'text-primary' : 'text-text-muted hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-text-muted">Hi, {user.name}</span>
              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-text-muted hover:text-white hover:bg-white/5"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-black"
            >
              Login
            </button>
          )}
        </div>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </motion.nav>
  );
};

export default Navbar;
