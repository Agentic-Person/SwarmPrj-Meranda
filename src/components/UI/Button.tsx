import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'cyber' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl border border-purple-500/50 focus:ring-purple-500',
    secondary: 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white shadow-lg hover:shadow-xl border border-slate-500/50 focus:ring-slate-500',
    outline: 'border-2 border-purple-500/70 bg-transparent hover:bg-purple-500/20 text-purple-200 hover:text-white focus:ring-purple-500 hover:border-purple-400',
    ghost: 'hover:bg-slate-800/50 text-slate-200 hover:text-white focus:ring-slate-500',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl border border-red-500/50 focus:ring-red-500',
    cyber: 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl border border-cyan-500/50 neon-border focus:ring-cyan-500',
    neon: 'bg-transparent border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/20 hover:text-cyan-200 neon-text focus:ring-cyan-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="cyber-loading mr-2"></div>
      )}
      <span className="relative z-10 font-bold text-white drop-shadow-lg">
        {children}
      </span>
    </button>
  );
};