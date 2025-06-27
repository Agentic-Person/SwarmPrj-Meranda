import React from 'react';
import { clsx } from 'clsx';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helper,
  className,
  id,
  ...props
}) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          id={textareaId}
          className={clsx(
            'block w-full rounded-lg bg-slate-800/50 border border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 transition-all duration-300 backdrop-blur-sm resize-none',
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