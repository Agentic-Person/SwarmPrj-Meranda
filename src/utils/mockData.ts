import { User, Project, Review, Message, WalletData } from '../types';

// Helper functions for localStorage persistence
const STORAGE_KEYS = {
  PROJECTS: 'app-finisher-projects',
  USERS: 'app-finisher-users',
  REVIEWS: 'app-finisher-reviews',
  MESSAGES: 'app-finisher-messages',
};

// Load data from localStorage or return default
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects for projects
      if (key === STORAGE_KEYS.PROJECTS) {
        return parsed.map((project: any) => ({
          ...project,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt),
        }));
      }
      // Convert date strings back to Date objects for users
      if (key === STORAGE_KEYS.USERS) {
        return parsed.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt),
        }));
      }
      // Convert date strings back to Date objects for messages
      if (key === STORAGE_KEYS.MESSAGES) {
        return parsed.map((message: any) => ({
          ...message,
          createdAt: new Date(message.createdAt),
        }));
      }
      // Convert date strings back to Date objects for reviews
      if (key === STORAGE_KEYS.REVIEWS) {
        return parsed.map((review: any) => ({
          ...review,
          createdAt: new Date(review.createdAt),
        }));
      }
      return parsed;
    }
  } catch (error) {
    console.warn(`Failed to load ${key} from localStorage:`, error);
  }
  return defaultValue;
};

// Save data to localStorage
const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error);
  }
};

// Mock wallet data generator
const generateMockWallet = (userId: string, swarmTokens: number = 1000): WalletData => {
  const addresses = {
    'user-1': '0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4',
    'user-2': '0x8ba1f109551bD432803012645Hac189451c4c4c4',
    'user-3': '0x1234567890abcdef1234567890abcdef12345678',
  };

  const baseTokens = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: Math.random() * 5 + 0.1,
      decimals: 18,
      usdValue: 0,
      contractAddress: '0x0000000000000000000000000000000000000000',
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: Math.random() * 1000 + 100,
      decimals: 6,
      usdValue: 0,
      contractAddress: '0xA0b86a33E6441c8C4C4C4C4C4C4C4C4C4C4C4C4C',
    },
    {
      symbol: 'SWARM',
      name: 'SWARM Token',
      balance: swarmTokens,
      decimals: 18,
      usdValue: 0,
      contractAddress: '0xSWARM1234567890abcdef1234567890abcdef12',
    },
  ];

  // Calculate USD values
  baseTokens[0].usdValue = baseTokens[0].balance * 2400; // ETH price
  baseTokens[1].usdValue = baseTokens[1].balance * 1; // USDC price
  baseTokens[2].usdValue = baseTokens[2].balance * 0.85; // SWARM token price

  return {
    address: addresses[userId as keyof typeof addresses] || addresses['user-1'],
    isConnected: true,
    network: 'ethereum',
    tokens: baseTokens,
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
};

// Initialize with some default demo data if localStorage is empty
const getDefaultUsers = (): User[] => [
  {
    id: 'user-1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    role: 'creator',
    bio: 'Full-stack developer with 8+ years experience building scalable web applications.',
    rating: 4.8,
    reviewCount: 23,
    completedProjects: 15,
    createdAt: new Date('2023-01-15'),
    agentName: 'CodeMaster Alex',
    primaryRole: 'builder',
    onboardingCompleted: true,
    swarmTokens: 1000, // Updated to match wallet
    wallet: generateMockWallet('user-1', 1000),
  },
  {
    id: 'user-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'finisher',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    bio: 'Frontend specialist who loves creating beautiful, accessible user interfaces.',
    rating: 4.9,
    reviewCount: 31,
    completedProjects: 22,
    createdAt: new Date('2023-02-20'),
    agentName: 'UI Wizard Sarah',
    primaryRole: 'validator',
    onboardingCompleted: true,
    swarmTokens: 3200,
    wallet: generateMockWallet('user-2', 3200),
  },
  {
    id: 'user-3',
    name: 'Marcus Rodriguez',
    email: 'marcus@example.com',
    role: 'finisher',
    skills: ['Python', 'Django', 'React', 'AWS'],
    bio: 'Backend engineer passionate about clean code and system architecture.',
    rating: 4.7,
    reviewCount: 18,
    completedProjects: 12,
    createdAt: new Date('2023-03-10'),
    agentName: 'Backend Beast Marcus',
    primaryRole: 'approver',
    onboardingCompleted: true,
    swarmTokens: 1800,
    wallet: generateMockWallet('user-3', 1800),
  },
];

const getDefaultProjects = (): Project[] => [
  {
    id: 'project-1',
    title: 'E-commerce Dashboard Enhancement',
    description: 'Need to add real-time analytics and improve the user management interface for our e-commerce platform.',
    desiredOutcome: 'A modern dashboard with live sales data, user activity tracking, and improved admin controls.',
    platform: 'bolt.new',
    appLink: 'https://demo-ecommerce.example.com',
    budget: 150,
    swarmTokenReward: 150,
    status: 'in-progress',
    creatorId: 'user-1',
    finisherId: 'user-2',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    brief: {
      id: 'brief-1',
      projectId: 'project-1',
      identifiedIssue: 'Dashboard lacks real-time data visualization and user management is cumbersome',
      suspectedLocation: 'Admin dashboard components and user management modules',
      actionableSteps: [
        'Implement WebSocket connection for real-time data',
        'Redesign user management interface with better UX',
        'Add analytics charts and KPI widgets',
        'Optimize database queries for dashboard performance'
      ],
      definitionOfDone: 'Dashboard shows live data updates, user management is intuitive, and page load time is under 2 seconds',
      createdAt: new Date('2024-01-10'),
    },
  },
  {
    id: 'project-2',
    title: 'Mobile App Authentication System',
    description: 'Implement secure user authentication with social login options and two-factor authentication.',
    desiredOutcome: 'Complete authentication system with email/password, Google/Apple sign-in, and 2FA support.',
    platform: 'flutterflow',
    appLink: 'https://github.com/example/mobile-auth',
    budget: 120,
    swarmTokenReward: 120,
    status: 'open',
    creatorId: 'user-1',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: 'project-3',
    title: 'AI-Powered Content Recommendation Engine',
    description: 'Build a machine learning system that analyzes user behavior and recommends personalized content.',
    desiredOutcome: 'ML model that increases user engagement by 40% through personalized recommendations.',
    platform: 'bolt.new',
    appLink: 'https://content-platform.example.com',
    budget: 200,
    swarmTokenReward: 200,
    status: 'in-progress',
    creatorId: 'user-1',
    finisherId: 'user-3',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-07'),
  },
  {
    id: 'project-4',
    title: 'Real-time Chat Application',
    description: 'Create a modern chat application with file sharing, emoji reactions, and group messaging.',
    desiredOutcome: 'Fully functional chat app with real-time messaging, file uploads, and user presence indicators.',
    platform: 'bubble',
    appLink: 'https://chat-app.example.com',
    budget: 80,
    swarmTokenReward: 80,
    status: 'open',
    creatorId: 'user-2',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: 'project-5',
    title: 'Blockchain Voting System',
    description: 'Develop a secure, transparent voting system using blockchain technology for organizational governance.',
    desiredOutcome: 'Decentralized voting platform with immutable records and real-time vote tracking.',
    platform: 'webflow',
    appLink: 'https://voting-platform.example.com',
    budget: 300,
    swarmTokenReward: 300,
    status: 'open',
    creatorId: 'user-1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'project-6',
    title: 'IoT Device Management Dashboard',
    description: 'Create a comprehensive dashboard for monitoring and controlling IoT devices across multiple locations.',
    desiredOutcome: 'Real-time device monitoring, remote control capabilities, and automated alert system.',
    platform: 'bolt.new',
    appLink: 'https://iot-dashboard.example.com',
    budget: 180,
    swarmTokenReward: 180,
    status: 'open',
    creatorId: 'user-2',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  // Adding the three missing to-do list projects
  {
    id: 'project-7',
    title: "Let's build a handy to-do list",
    description: 'Too many unorganized tasks to do. I need a very easy, simple to use, to-do task list that\'s AI-enabled.',
    desiredOutcome: 'A clean, intuitive to-do list application with AI assistance for task organization and prioritization.',
    platform: 'bolt.new',
    appLink: 'https://todo-app-v1.example.com',
    budget: 50,
    swarmTokenReward: 50,
    status: 'open',
    creatorId: 'user-1',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: 'project-8',
    title: 'A blockchain to-do list.',
    description: 'I need a handy to-do list that just is focused on my blockchain trades.',
    desiredOutcome: 'A specialized to-do list for tracking blockchain trades, portfolio management, and crypto-related tasks.',
    platform: 'bolt.new',
    appLink: 'https://blockchain-todo.example.com',
    budget: 100,
    swarmTokenReward: 100,
    status: 'open',
    creatorId: 'user-1',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: 'project-9',
    title: "Let's build a handy to-do list",
    description: 'I want to create a simple to-do list with AI assistant that when I create a schedule and I don\'t get everything done, it\'s easy to...',
    desiredOutcome: 'An AI-powered to-do list that automatically reschedules incomplete tasks and provides smart suggestions for task management.',
    platform: 'bolt.new',
    appLink: 'https://smart-todo.example.com',
    budget: 75,
    swarmTokenReward: 75,
    status: 'open',
    creatorId: 'user-1',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
];

// Initialize data from localStorage or defaults
export let mockUsers: User[] = loadFromStorage(STORAGE_KEYS.USERS, getDefaultUsers());
export let mockProjects: Project[] = loadFromStorage(STORAGE_KEYS.PROJECTS, getDefaultProjects());
export let mockReviews: Review[] = loadFromStorage(STORAGE_KEYS.REVIEWS, []);
export let mockMessages: Message[] = loadFromStorage(STORAGE_KEYS.MESSAGES, []);

// Function to distribute SWARM tokens when a project is completed
export const distributeSwarmTokens = (projectId: string, finisherId: string): boolean => {
  const projectIndex = mockProjects.findIndex(p => p.id === projectId);
  const finisherIndex = mockUsers.findIndex(u => u.id === finisherId);
  
  if (projectIndex === -1 || finisherIndex === -1) {
    return false;
  }
  
  const project = mockProjects[projectIndex];
  const finisher = mockUsers[finisherIndex];
  
  // Award SWARM tokens if the project has a reward
  if (project.swarmTokenReward) {
    finisher.swarmTokens = (finisher.swarmTokens || 0) + project.swarmTokenReward;
    
    // Update wallet SWARM token balance if wallet exists
    if (finisher.wallet) {
      const swarmToken = finisher.wallet.tokens.find(t => t.symbol === 'SWARM');
      if (swarmToken) {
        swarmToken.balance = finisher.swarmTokens;
        swarmToken.usdValue = swarmToken.balance * 0.85; // Update USD value
      }
    }
  }
  
  // Update project status
  project.status = 'completed';
  project.updatedAt = new Date();
  
  // Update finisher's completed projects count
  finisher.completedProjects += 1;
  
  // Save to localStorage
  saveToStorage(STORAGE_KEYS.PROJECTS, mockProjects);
  saveToStorage(STORAGE_KEYS.USERS, mockUsers);
  
  return true;
};

// Function to update user SWARM tokens and sync with wallet
export const updateUserSwarmTokens = (userId: string, newBalance: number): void => {
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex].swarmTokens = newBalance;
    
    // Update wallet SWARM token balance if wallet exists
    if (mockUsers[userIndex].wallet) {
      const swarmToken = mockUsers[userIndex].wallet!.tokens.find(t => t.symbol === 'SWARM');
      if (swarmToken) {
        swarmToken.balance = newBalance;
        swarmToken.usdValue = newBalance * 0.85;
      }
    }
    
    // Save to localStorage
    saveToStorage(STORAGE_KEYS.USERS, mockUsers);
  }
};

// Functions to add new data and persist to localStorage
export const addMockProject = (project: Project): void => {
  mockProjects.unshift(project); // Add to beginning of array
  saveToStorage(STORAGE_KEYS.PROJECTS, mockProjects);
};

export const updateMockProject = (projectId: string, updates: Partial<Project>): void => {
  const index = mockProjects.findIndex(p => p.id === projectId);
  if (index !== -1) {
    mockProjects[index] = { ...mockProjects[index], ...updates, updatedAt: new Date() };
    saveToStorage(STORAGE_KEYS.PROJECTS, mockProjects);
  }
};

export const addMockUser = (user: User): void => {
  mockUsers.push(user);
  saveToStorage(STORAGE_KEYS.USERS, mockUsers);
};

export const addMockMessage = (message: Message): void => {
  mockMessages.push(message);
  saveToStorage(STORAGE_KEYS.MESSAGES, mockMessages);
};

export const addMockReview = (review: Review): void => {
  mockReviews.push(review);
  saveToStorage(STORAGE_KEYS.REVIEWS, mockReviews);
};

// Function to clear all mock data (useful for testing)
export const clearMockData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  // Reset to defaults
  mockUsers.length = 0;
  mockProjects.length = 0;
  mockReviews.length = 0;
  mockMessages.length = 0;
  mockUsers.push(...getDefaultUsers());
  mockProjects.push(...getDefaultProjects());
};

// Function to get fresh data (useful for components that need to re-read)
export const refreshMockData = (): void => {
  mockUsers.length = 0;
  mockProjects.length = 0;
  mockReviews.length = 0;
  mockMessages.length = 0;
  
  mockUsers.push(...loadFromStorage(STORAGE_KEYS.USERS, getDefaultUsers()));
  mockProjects.push(...loadFromStorage(STORAGE_KEYS.PROJECTS, getDefaultProjects()));
  mockReviews.push(...loadFromStorage(STORAGE_KEYS.REVIEWS, []));
  mockMessages.push(...loadFromStorage(STORAGE_KEYS.MESSAGES, []));
};