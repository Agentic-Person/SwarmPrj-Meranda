import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';
import { mockUsers, updateUserSwarmTokens, addMockUser } from '../utils/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  updateUser: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to get all users from localStorage
const getAllUsers = (): User[] => {
  try {
    const stored = localStorage.getItem('app-finisher-all-users');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((user: any) => ({
        ...user,
        createdAt: new Date(user.createdAt),
      }));
    }
  } catch (error) {
    console.warn('Failed to load users from localStorage:', error);
  }
  return [...mockUsers]; // Return copy of mock users as default
};

// Helper function to save all users to localStorage
const saveAllUsers = (users: User[]): void => {
  try {
    localStorage.setItem('app-finisher-all-users', JSON.stringify(users));
  } catch (error) {
    console.warn('Failed to save users to localStorage:', error);
  }
};

// Helper function to generate mock wallet for new users
const generateMockWallet = (userId: string, swarmTokens: number = 1000) => {
  return {
    address: `0x${Math.random().toString(16).substr(2, 40)}`,
    isConnected: true,
    network: 'ethereum' as const,
    tokens: [
      {
        symbol: 'ETH',
        name: 'Ethereum',
        balance: Math.random() * 2 + 0.1,
        decimals: 18,
        usdValue: 0,
        contractAddress: '0x0000000000000000000000000000000000000000',
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        balance: Math.random() * 500 + 100,
        decimals: 6,
        usdValue: 0,
        contractAddress: '0xA0b86a33E6441c8C4C4C4C4C4C4C4C4C4C4C4C4C',
      },
      {
        symbol: 'SWARM',
        name: 'SWARM Token',
        balance: swarmTokens,
        decimals: 18,
        usdValue: swarmTokens * 0.85,
        contractAddress: '0xSWARM1234567890abcdef1234567890abcdef12',
      },
    ],
    nfts: [
      {
        id: `nft-${userId}-1`,
        name: 'AI Agent #' + Math.floor(Math.random() * 9999),
        collection: 'Swarm Agents',
        image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400',
        rarity: 'Rare',
      },
    ],
  };
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('app-finisher-user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Ensure SWARM tokens are consistent with wallet
      if (parsedUser.wallet) {
        const swarmToken = parsedUser.wallet.tokens.find((t: any) => t.symbol === 'SWARM');
        if (swarmToken && parsedUser.swarmTokens !== swarmToken.balance) {
          parsedUser.swarmTokens = swarmToken.balance;
        }
      }
      
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get all users (including newly registered ones)
    const allUsers = getAllUsers();
    
    // Find user by email
    const foundUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      // In a real app, you'd verify the password hash here
      // For demo purposes, we'll accept any password for existing users
      
      // Ensure SWARM tokens are consistent with wallet
      if (foundUser.wallet) {
        const swarmToken = foundUser.wallet.tokens.find(t => t.symbol === 'SWARM');
        if (swarmToken && foundUser.swarmTokens !== swarmToken.balance) {
          foundUser.swarmTokens = swarmToken.balance;
        }
      }
      
      setUser(foundUser);
      localStorage.setItem('app-finisher-user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get all existing users
    const allUsers = getAllUsers();
    
    // Check if email already exists
    const existingUser = allUsers.find(u => u.email.toLowerCase() === userData.email?.toLowerCase());
    if (existingUser) {
      setIsLoading(false);
      return false; // Email already exists
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'creator',
      skills: userData.skills || [],
      bio: userData.bio || '',
      rating: 0,
      reviewCount: 0,
      completedProjects: 0,
      createdAt: new Date(),
      onboardingCompleted: false,
      swarmTokens: 1000, // Start new users with 1000 SWARM tokens
      wallet: generateMockWallet(`user-${Date.now()}`, 1000),
    };
    
    // Add to all users list
    allUsers.push(newUser);
    saveAllUsers(allUsers);
    
    // Also add to mock data for consistency
    addMockUser(newUser);
    
    setUser(newUser);
    localStorage.setItem('app-finisher-user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const updateUser = (userData: User) => {
    // Sync SWARM tokens with wallet if wallet exists
    if (userData.wallet) {
      const swarmToken = userData.wallet.tokens.find(t => t.symbol === 'SWARM');
      if (swarmToken) {
        swarmToken.balance = userData.swarmTokens || 0;
        swarmToken.usdValue = (userData.swarmTokens || 0) * 0.85;
      }
    }
    
    setUser(userData);
    localStorage.setItem('app-finisher-user', JSON.stringify(userData));
    
    // Update in the all users list as well
    const allUsers = getAllUsers();
    const userIndex = allUsers.findIndex(u => u.id === userData.id);
    if (userIndex !== -1) {
      allUsers[userIndex] = userData;
      saveAllUsers(allUsers);
    }
    
    // Update the mock data as well
    updateUserSwarmTokens(userData.id, userData.swarmTokens || 0);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('app-finisher-user');
  };

  return {
    user,
    login,
    register,
    updateUser,
    logout,
    isLoading,
  };
};

export { AuthContext };