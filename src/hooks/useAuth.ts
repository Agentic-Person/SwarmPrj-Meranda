import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';
import { mockUsers, updateUserSwarmTokens } from '../utils/mockData';

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
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
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
    
    const newUser: User = {
      id: Date.now().toString(),
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
    };
    
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