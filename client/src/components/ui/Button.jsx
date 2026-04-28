import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  variant = 'primary', // primary, glass, outline
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-inter font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-primary/50 overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 border border-white/10 px-6 py-3",
    glass: "glass-panel text-text-primary hover:bg-white/5 disabled:hover:bg-bg-glass px-5 py-2.5",
    outline: "border-2 border-primary/50 text-primary hover:bg-primary/10 px-5 py-2.5"
  };

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === 'primary' && !disabled && (
        <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.button>
  );
};

export default Button;
