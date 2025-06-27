import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { WalletWidget } from '../Wallet/WalletWidget';
import { TreasuryWidget } from '../Treasury/TreasuryWidget';
import { Code2, User, LogOut, Settings } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-4 group min-w-[280px]">
            <div className="relative">
              <Code2 className="h-10 w-10 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-purple-400 opacity-20 blur-lg group-hover:bg-cyan-400 transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold cyber-font text-white neon-text">AI SWARM</span>
              <span className="text-xs text-purple-300 terminal-font tracking-wider">COLLABORATIVE INTELLIGENCE</span>
            </div>
          </Link>

          {/* Center Navigation */}
          {user && (
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                to="/marketplace"
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 terminal-font uppercase tracking-wide border min-w-[140px] flex items-center justify-center ${
                  isActive('/marketplace')
                    ? 'text-cyan-300 bg-cyan-500/20 border-cyan-500/50 neon-border'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 border-slate-600 hover:border-slate-500'
                }`}
              >
                MISSIONS
              </Link>
              <Link
                to="/dashboard"
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 terminal-font uppercase tracking-wide border min-w-[140px] flex items-center justify-center ${
                  isActive('/dashboard')
                    ? 'text-purple-300 bg-purple-500/20 border-purple-500/50 neon-border'
                    : 'text-slate-300 hover:text-purple-300 hover:bg-slate-800/50 border-slate-600 hover:border-slate-500'
                }`}
              >
                COMMAND CENTER
              </Link>
              {user.role === 'creator' && (
                <Link
                  to="/create-project"
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 terminal-font uppercase tracking-wide border min-w-[140px] flex items-center justify-center ${
                    isActive('/create-project')
                      ? 'text-pink-300 bg-pink-500/20 border-pink-500/50 neon-border'
                      : 'text-slate-300 hover:text-pink-300 hover:bg-slate-800/50 border-slate-600 hover:border-slate-500'
                  }`}
                >
                  DEPLOY MISSION
                </Link>
              )}
            </nav>
          )}

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {/* Treasury and Wallet Widgets - Blockchain Integration */}
                <div className="hidden md:flex items-center space-x-4">
                  <TreasuryWidget />
                  <WalletWidget />
                </div>

                {/* User Profile */}
                <div className="relative group">
                  <button className="flex items-center space-x-3 px-6 py-3 bg-slate-800/50 rounded-lg border border-slate-600 hover:border-purple-500/50 transition-all duration-300 group-hover:bg-slate-700/50 min-w-[200px]">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-sm font-medium text-white terminal-font truncate">
                        {user.agentName || user.name}
                      </div>
                      <div className="text-xs text-purple-300 terminal-font uppercase tracking-wider">
                        {user.primaryRole || user.role} AGENT
                      </div>
                    </div>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-sm rounded-lg border border-purple-500/30 shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 top-full">
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
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  to="/login"
                  className="px-6 py-3 text-slate-300 hover:text-cyan-300 rounded-lg text-sm font-medium transition-colors terminal-font uppercase tracking-wide border border-slate-600 hover:border-slate-500 min-w-[120px] flex items-center justify-center"
                >
                  CONNECT
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg text-sm font-medium transition-all duration-300 terminal-font uppercase tracking-wide cyber-button border border-purple-500/50 min-w-[140px] flex items-center justify-center"
                >
                  JOIN SWARM
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && (
          <div className="lg:hidden border-t border-slate-700 py-4">
            <nav className="flex flex-wrap gap-3">
              <Link
                to="/marketplace"
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 terminal-font uppercase tracking-wide border flex items-center ${
                  isActive('/marketplace')
                    ? 'text-cyan-300 bg-cyan-500/20 border-cyan-500/50'
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 border-slate-600'
                }`}
              >
                MISSIONS
              </Link>
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 terminal-font uppercase tracking-wide border flex items-center ${
                  isActive('/dashboard')
                    ? 'text-purple-300 bg-purple-500/20 border-purple-500/50'
                    : 'text-slate-300 hover:text-purple-300 hover:bg-slate-800/50 border-slate-600'
                }`}
              >
                COMMAND
              </Link>
              {user.role === 'creator' && (
                <Link
                  to="/create-project"
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 terminal-font uppercase tracking-wide border flex items-center ${
                    isActive('/create-project')
                      ? 'text-pink-300 bg-pink-500/20 border-pink-500/50'
                      : 'text-slate-300 hover:text-pink-300 hover:bg-slate-800/50 border-slate-600'
                  }`}
                >
                  DEPLOY
                </Link>
              )}
              
              {/* Mobile Treasury and Wallet */}
              <div className="flex space-x-2 md:hidden">
                <TreasuryWidget />
                <WalletWidget />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};