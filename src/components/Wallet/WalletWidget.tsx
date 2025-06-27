import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { WalletData, TokenBalance } from '../../types';
import { Wallet, ChevronDown, Copy, ExternalLink, Star, Coins, Zap } from 'lucide-react';

export const WalletWidget: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
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

  // Mock wallet connection for demo
  const mockWallet: WalletData = {
    address: '0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4',
    isConnected: true,
    network: 'ethereum',
    tokens: [
      {
        symbol: 'ETH',
        name: 'Ethereum',
        balance: 2.45,
        decimals: 18,
        usdValue: 5880,
        contractAddress: '0x0000000000000000000000000000000000000000',
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        balance: 1250,
        decimals: 6,
        usdValue: 1250,
        contractAddress: '0xA0b86a33E6441c8C4C4C4C4C4C4C4C4C4C4C4C4C',
      },
      {
        symbol: 'SWARM',
        name: 'SWARM Token',
        balance: user?.swarmTokens || 1000,
        decimals: 18,
        usdValue: (user?.swarmTokens || 1000) * 0.85,
        contractAddress: '0xSWARM1234567890abcdef1234567890abcdef12',
      },
    ],
    nfts: [
      {
        id: 'nft-1',
        name: 'AI Agent #1337',
        collection: 'Swarm Agents',
        image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Rare',
      },
      {
        id: 'nft-2',
        name: 'Neural Network #42',
        collection: 'Digital Minds',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Epic',
      },
    ],
  };

  const wallet = user?.wallet || mockWallet;
  const totalUsdValue = wallet.tokens.reduce((sum, token) => sum + token.usdValue, 0);
  const swarmBalance = user?.swarmTokens || 1000;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    // Show a brief feedback
    alert('Address copied to clipboard!');
  };

  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'ethereum': return 'text-blue-400 bg-blue-500/20';
      case 'polygon': return 'text-purple-400 bg-purple-500/20';
      case 'arbitrum': return 'text-cyan-400 bg-cyan-500/20';
      case 'optimism': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 rounded-lg border border-blue-500/50 hover:border-blue-400/70 transition-all duration-300 terminal-font uppercase tracking-wide font-bold text-sm min-w-[160px] flex items-center justify-center space-x-2"
      >
        <Wallet className="h-4 w-4" />
        <div className="flex flex-col items-center">
          <span>WALLET</span>
          <span className="text-xs">{swarmBalance} SWARM</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-sm rounded-lg border border-purple-500/30 shadow-2xl py-2 z-50">
          {/* Wallet Header */}
          <div className="px-4 py-3 border-b border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded text-xs font-medium ${getNetworkColor(wallet.network)}`}>
                  {wallet.network.charAt(0).toUpperCase() + wallet.network.slice(1)}
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <button
                onClick={copyAddress}
                className="text-slate-400 hover:text-cyan-300 transition-colors"
                title="Copy address"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sm text-slate-300 terminal-font mb-1">
              {formatAddress(wallet.address)}
            </div>
            <div className="text-lg font-bold text-white">
              ${totalUsdValue.toFixed(2)} USD
            </div>
          </div>

          {/* Token Balances */}
          <div className="px-4 py-3">
            <h3 className="text-sm font-medium text-slate-300 mb-3 uppercase tracking-wider">
              Token Balances
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {wallet.tokens.map((token, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                      {token.symbol === 'SWARM' ? (
                        <Star className="h-4 w-4 text-yellow-400" />
                      ) : token.symbol === 'ETH' ? (
                        <Zap className="h-4 w-4 text-blue-400" />
                      ) : (
                        <Coins className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{token.symbol}</div>
                      <div className="text-xs text-slate-400">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">
                      {token.balance.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">
                      ${token.usdValue.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NFTs Section */}
          {wallet.nfts && wallet.nfts.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-700">
              <h3 className="text-sm font-medium text-slate-300 mb-3 uppercase tracking-wider">
                NFTs ({wallet.nfts.length})
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {wallet.nfts.slice(0, 6).map((nft) => (
                  <div key={nft.id} className="aspect-square bg-slate-700/30 rounded-lg overflow-hidden">
                    <img 
                      src={nft.image} 
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wallet Actions */}
          <div className="px-4 py-3 border-t border-slate-700">
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-purple-600/20 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-colors text-sm">
                <ExternalLink className="h-4 w-4" />
                <span>Explorer</span>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700/70 transition-colors text-sm"
              >
                <Wallet className="h-4 w-4" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};