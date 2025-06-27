import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={clsx(
            'block w-full rounded-lg bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 transition-all duration-300 backdrop-blur-sm',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400',
            className
          )}
          {...props}
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-slate-400">{helper}</p>
      )}
    </div>
  );
};