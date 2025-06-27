import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';
import { mockUsers } from '../utils/mockData';

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
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
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
    };
    
    setUser(newUser);
    localStorage.setItem('app-finisher-user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('app-finisher-user', JSON.stringify(userData));
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