export interface User {
  id: string;
  name: string;
  email: string;
  role: 'creator' | 'finisher';
  skills?: string[];
  bio?: string;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  avatar?: string;
  createdAt: Date;
  // New onboarding fields
  agentName?: string;
  primaryRole?: 'builder' | 'validator' | 'approver';
  personalityArchetype?: PersonalityArchetype;
  onboardingCompleted?: boolean;
}

export interface PersonalityArchetype {
  type: 'innovator' | 'strategist' | 'collaborator' | 'perfectionist' | 'explorer' | 'catalyst';
  traits: string[];
  workStyle: string;
  strengths: string[];
  description: string;
}

export interface OnboardingQuestion {
  id: string;
  question: string;
  options: OnboardingOption[];
  category: 'approach' | 'communication' | 'problem-solving' | 'teamwork' | 'decision-making' | 'motivation';
}

export interface OnboardingOption {
  id: string;
  text: string;
  archetypeWeights: {
    innovator: number;
    strategist: number;
    collaborator: number;
    perfectionist: number;
    explorer: number;
    catalyst: number;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  desiredOutcome: string;
  platform: Platform;
  appLink: string;
  budget?: number;
  status: ProjectStatus;
  creatorId: string;
  finisherId?: string;
  createdAt: Date;
  updatedAt: Date;
  brief?: ProjectBrief;
}

export interface ProjectBrief {
  id: string;
  projectId: string;
  identifiedIssue: string;
  suspectedLocation: string;
  actionableSteps: string[];
  definitionOfDone: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  projectId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export type Platform = 
  | 'bolt.new'
  | 'bubble'
  | 'webflow'
  | 'adalo'
  | 'glide'
  | 'flutterflow'
  | 'appgyver'
  | 'other';

export type ProjectStatus = 
  | 'open'
  | 'in-progress'
  | 'in-review'
  | 'completed'
  | 'cancelled';

export type TaskType = 
  | 'bug-fix'
  | 'new-feature'
  | 'ui-polish'
  | 'optimization'
  | 'integration'
  | 'other';