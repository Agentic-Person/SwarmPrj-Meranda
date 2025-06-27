import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Code2, User, LogOut, Settings, Star, Zap, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Code2 className="h-8 w-8 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-purple-400 opacity-20 blur-lg group-hover:bg-cyan-400 transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold cyber-font text-white neon-text">AI SWARM</span>
              <span className="text-xs text-purple-300 terminal-font tracking-wider">COLLABORATIVE INTELLIGENCE</span>
            </div>
          </Link>

          {/* Navigation */}
          {user && (
            <nav className="hidden md:flex space-x-1">
              <Link
                to="/marketplace"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 terminal-font uppercase tracking-wide ${
                  isActive('/marketplace')
                    ? 'text-cyan-300 bg-cyan-500/20 border border-cyan-500/50 neon-border'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 border border-transparent hover:border-slate-600'
                }`}
              >
                <Activity className="h-4 w-4 inline mr-2" />
                Missions
              </Link>
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 terminal-font uppercase tracking-wide ${
                  isActive('/dashboard')
                    ? 'text-purple-300 bg-purple-500/20 border border-purple-500/50 neon-border'
                    : 'text-slate-300 hover:text-purple-300 hover:bg-slate-800/50 border border-transparent hover:border-slate-600'
                }`}
              >
                <Zap className="h-4 w-4 inline mr-2" />
                Command Center
              </Link>
              {user.role === 'creator' && (
                <Link
                  to="/create-project"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 terminal-font uppercase tracking-wide ${
                    isActive('/create-project')
                      ? 'text-pink-300 bg-pink-500/20 border border-pink-500/50 neon-border'
                      : 'text-slate-300 hover:text-pink-300 hover:bg-slate-800/50 border border-transparent hover:border-slate-600'
                  }`}
                >
                  Deploy Mission
                </Link>
              )}
            </nav>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Agent Status */}
                <div className="hidden sm:flex items-center space-x-3 px-3 py-1 bg-slate-800/50 rounded-lg border border-slate-600">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 terminal-font text-xs uppercase tracking-wider">ONLINE</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-yellow-400">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="terminal-font">{user.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* User Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-3 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-600 hover:border-purple-500/50 transition-all duration-300 group-hover:bg-slate-700/50">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-white terminal-font">{user.agentName || user.name}</div>
                      <div className="text-xs text-purple-300 terminal-font uppercase tracking-wider">
                        {user.primaryRole || user.role} Agent
                      </div>
                    </div>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-sm rounded-lg border border-purple-500/30 shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <div className="px-4 py-2 border-b border-slate-700">
                      <div className="text-sm font-medium text-white terminal-font">{user.agentName || user.name}</div>
                      <div className="text-xs text-purple-300 terminal-font">
                        {user.personalityArchetype?.type && (
                          <span className="capitalize">{user.personalityArchetype.type} Archetype</span>
                        )}
                      </div>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-slate-300 hover:text-cyan-300 hover:bg-slate-700/50 transition-colors terminal-font"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Agent Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-slate-300 hover:text-cyan-300 hover:bg-slate-700/50 transition-colors terminal-font"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      System Config
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors terminal-font"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-cyan-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors terminal-font uppercase tracking-wide border border-transparent hover:border-slate-600"
                >
                  Connect
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 terminal-font uppercase tracking-wide cyber-button"
                >
                  Join Swarm
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};