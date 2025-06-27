import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { 
  TrendingUp, 
  ChevronDown, 
  Star, 
  DollarSign, 
  Wallet,
  ArrowUpRight,
  PiggyBank,
  Target
} from 'lucide-react';
import { getTreasuryData, investInTreasury } from '../../utils/treasuryData';

export const TreasuryWidget: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [investAmount, setInvestAmount] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const treasuryData = getTreasuryData();
  const userBalance = user?.swarmTokens || 0;
  const userInvestment = treasuryData.userInvestments[user?.id || ''] || 0;
  const swarmTokenPrice = 0.85; // $0.85 per SWARM token

  const handleInvest = async () => {
    if (!user || !investAmount) return;
    
    const amount = parseInt(investAmount);
    if (amount <= 0 || amount > userBalance) {
      alert('Invalid investment amount. Please check your balance.');
      return;
    }

    setIsInvesting(true);
    
    // Simulate investment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update treasury and user data
    const success = investInTreasury(user.id, amount);
    
    if (success) {
      // Update user's SWARM token balance
      const updatedUser = {
        ...user,
        swarmTokens: userBalance - amount,
      };
      
      updateUser(updatedUser);
      setInvestAmount('');
      alert(`Successfully invested ${amount} SWARM tokens in the treasury! 🎉`);
    } else {
      alert('Investment failed. Please try again.');
    }
    
    setIsInvesting(false);
  };

  const calculateROI = () => {
    if (userInvestment === 0) return 0;
    // Simulate 5-15% ROI based on treasury performance
    const baseROI = 8 + (treasuryData.totalTokens / 100000) * 2;
    return Math.min(baseROI, 15);
  };

  const estimatedValue = userInvestment * (1 + calculateROI() / 100);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-600 hover:border-green-500/50 transition-all duration-300 group min-w-[140px] h-12"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <PiggyBank className="h-4 w-4 text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-white terminal-font">
              Invest $SWARM
            </div>
            <div className="text-xs text-green-300 terminal-font">
              750 SWARM
            </div>
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-slate-800/95 backdrop-blur-sm rounded-lg border border-purple-500/30 shadow-2xl py-2 z-50">
          {/* Treasury Header */}
          <div className="px-4 py-3 border-b border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white terminal-font">
                SWARM Treasury
              </h3>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+{calculateROI().toFixed(1)}% APY</span>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              Invest in the liquidity pool and earn rewards as the SWARM ecosystem grows
            </p>
          </div>

          {/* Treasury Stats */}
          <div className="px-4 py-3 border-b border-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="h-4 w-4 text-purple-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Total Pool</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {treasuryData.totalTokens.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">
                  ${(treasuryData.totalTokens * swarmTokenPrice).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Token Price</span>
                </div>
                <div className="text-lg font-bold text-white">
                  ${swarmTokenPrice}
                </div>
                <div className="text-xs text-green-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +2.3% (24h)
                </div>
              </div>
            </div>
          </div>

          {/* User Investment Status */}
          {userInvestment > 0 && (
            <div className="px-4 py-3 border-b border-slate-700">
              <h4 className="text-sm font-medium text-slate-300 mb-3 uppercase tracking-wider">
                Your Investment
              </h4>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-300">Invested Amount</span>
                  <span className="text-sm font-bold text-white">{userInvestment} SWARM</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-300">Current Value</span>
                  <span className="text-sm font-bold text-white">
                    {estimatedValue.toFixed(0)} SWARM
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-300">USD Value</span>
                  <span className="text-sm font-bold text-green-400">
                    ${(estimatedValue * swarmTokenPrice).toFixed(2)}
                  </span>
                </div>
                {estimatedValue > userInvestment && (
                  <div className="mt-2 pt-2 border-t border-green-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-300">Profit</span>
                      <span className="text-xs font-bold text-green-400">
                        +{(estimatedValue - userInvestment).toFixed(0)} SWARM 
                        (+${((estimatedValue - userInvestment) * swarmTokenPrice).toFixed(2)})
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Investment Form */}
          <div className="px-4 py-3">
            <h4 className="text-sm font-medium text-slate-300 mb-3 uppercase tracking-wider">
              Make Investment
            </h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Available Balance</span>
                  <span className="text-sm font-medium text-white">
                    {userBalance} SWARM
                  </span>
                </div>
                <Input
                  type="number"
                  placeholder="Enter amount to invest"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  max={userBalance}
                  min="1"
                  className="bg-slate-700/50 border-slate-600"
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setInvestAmount(Math.floor(userBalance * 0.25).toString())}
                  className="flex-1 px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                >
                  25%
                </button>
                <button
                  onClick={() => setInvestAmount(Math.floor(userBalance * 0.5).toString())}
                  className="flex-1 px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                >
                  50%
                </button>
                <button
                  onClick={() => setInvestAmount(Math.floor(userBalance * 0.75).toString())}
                  className="flex-1 px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                >
                  75%
                </button>
                <button
                  onClick={() => setInvestAmount(userBalance.toString())}
                  className="flex-1 px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                >
                  MAX
                </button>
              </div>
              
              {investAmount && (
                <div className="bg-slate-700/30 rounded-lg p-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Investment Amount:</span>
                    <span>{investAmount} SWARM</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>USD Value:</span>
                    <span>${(parseInt(investAmount || '0') * swarmTokenPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-400 font-medium">
                    <span>Est. Annual Return:</span>
                    <span>+{(parseInt(investAmount || '0') * calculateROI() / 100).toFixed(0)} SWARM</span>
                  </div>
                </div>
              )}
              
              <Button
                onClick={handleInvest}
                disabled={!investAmount || parseInt(investAmount) <= 0 || parseInt(investAmount) > userBalance}
                loading={isInvesting}
                className="w-full"
                variant="cyber"
              >
                {isInvesting ? 'Processing Investment...' : 'Invest in Treasury'}
              </Button>
            </div>
          </div>

          {/* Treasury Info */}
          <div className="px-4 py-3 border-t border-slate-700">
            <div className="text-xs text-slate-400 space-y-1">
              <p>• Earn rewards as the SWARM ecosystem grows</p>
              <p>• Liquidity pool supports token stability</p>
              <p>• Returns are estimated and not guaranteed</p>
              <p>• Investments help fund platform development</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};