import { User, Project, Review, Message } from '../types';

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
    budget: 2500,
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
    budget: 1800,
    status: 'open',
    creatorId: 'user-1',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
  },
];

// Initialize data from localStorage or defaults
export let mockUsers: User[] = loadFromStorage(STORAGE_KEYS.USERS, getDefaultUsers());
export let mockProjects: Project[] = loadFromStorage(STORAGE_KEYS.PROJECTS, getDefaultProjects());
export let mockReviews: Review[] = loadFromStorage(STORAGE_KEYS.REVIEWS, []);
export let mockMessages: Message[] = loadFromStorage(STORAGE_KEYS.MESSAGES, []);

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