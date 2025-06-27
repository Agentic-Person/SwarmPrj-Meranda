import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Code2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please check your credentials or register a new account.');
    }
  };

  // Demo account helper
  const loginWithDemo = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setError('');
    
    const success = await login(demoEmail, 'demo123');
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen neural-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="relative">
              <Code2 className="h-12 w-12 text-purple-400" />
              <div className="absolute inset-0 bg-purple-400 opacity-20 blur-lg"></div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Connect to AI Swarm
          </h2>
          <p className="mt-2 text-center text-sm text-slate-300">
            Or{' '}
            <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
              join the collaborative intelligence network
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              {error}
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              variant="cyber"
            >
              Connect
            </Button>
          </div>
        </form>

        {/* Demo Accounts Section */}
        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-600">
          <h3 className="text-sm font-medium text-slate-300 mb-3">Demo Accounts</h3>
          <div className="space-y-2">
            <button
              onClick={() => loginWithDemo('alex@example.com')}
              className="w-full text-left px-3 py-2 text-sm bg-slate-700/50 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
              disabled={isLoading}
            >
              <div className="font-medium">Alex Chen (Creator)</div>
              <div className="text-xs text-slate-400">alex@example.com</div>
            </button>
            <button
              onClick={() => loginWithDemo('sarah@example.com')}
              className="w-full text-left px-3 py-2 text-sm bg-slate-700/50 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
              disabled={isLoading}
            >
              <div className="font-medium">Sarah Johnson (Finisher)</div>
              <div className="text-xs text-slate-400">sarah@example.com</div>
            </button>
            <button
              onClick={() => loginWithDemo('marcus@example.com')}
              className="w-full text-left px-3 py-2 text-sm bg-slate-700/50 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
              disabled={isLoading}
            >
              <div className="font-medium">Marcus Rodriguez (Finisher)</div>
              <div className="text-xs text-slate-400">marcus@example.com</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};