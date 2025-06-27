// Treasury data management for SWARM token investments

interface TreasuryData {
  totalTokens: number;
  userInvestments: Record<string, number>;
  lastUpdated: Date;
}

const STORAGE_KEY = 'app-finisher-treasury';

// Load treasury data from localStorage
const loadTreasuryData = (): TreasuryData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        lastUpdated: new Date(parsed.lastUpdated),
      };
    }
  } catch (error) {
    console.warn('Failed to load treasury data from localStorage:', error);
  }
  
  // Return default treasury data
  return {
    totalTokens: 125000, // Starting treasury pool
    userInvestments: {},
    lastUpdated: new Date(),
  };
};

// Save treasury data to localStorage
const saveTreasuryData = (data: TreasuryData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save treasury data to localStorage:', error);
  }
};

// Get current treasury data
export const getTreasuryData = (): TreasuryData => {
  return loadTreasuryData();
};

// Invest SWARM tokens in the treasury
export const investInTreasury = (userId: string, amount: number): boolean => {
  try {
    const treasuryData = loadTreasuryData();
    
    // Add to user's investment
    treasuryData.userInvestments[userId] = (treasuryData.userInvestments[userId] || 0) + amount;
    
    // Add to total treasury pool
    treasuryData.totalTokens += amount;
    
    // Update timestamp
    treasuryData.lastUpdated = new Date();
    
    // Save updated data
    saveTreasuryData(treasuryData);
    
    return true;
  } catch (error) {
    console.error('Failed to process treasury investment:', error);
    return false;
  }
};

// Get user's total investment in treasury
export const getUserInvestment = (userId: string): number => {
  const treasuryData = loadTreasuryData();
  return treasuryData.userInvestments[userId] || 0;
};

// Simulate treasury growth (for demo purposes)
export const simulateTreasuryGrowth = (): void => {
  const treasuryData = loadTreasuryData();
  
  // Simulate small growth in treasury value (0.1% to 0.5% daily)
  const growthRate = 0.001 + Math.random() * 0.004;
  
  // Apply growth to user investments
  Object.keys(treasuryData.userInvestments).forEach(userId => {
    treasuryData.userInvestments[userId] *= (1 + growthRate);
  });
  
  treasuryData.lastUpdated = new Date();
  saveTreasuryData(treasuryData);
};

// Get treasury statistics
export const getTreasuryStats = () => {
  const treasuryData = loadTreasuryData();
  const totalInvestors = Object.keys(treasuryData.userInvestments).length;
  const averageInvestment = totalInvestors > 0 
    ? Object.values(treasuryData.userInvestments).reduce((sum, inv) => sum + inv, 0) / totalInvestors 
    : 0;
  
  return {
    totalTokens: treasuryData.totalTokens,
    totalInvestors,
    averageInvestment,
    lastUpdated: treasuryData.lastUpdated,
  };
};

// Clear treasury data (for testing)
export const clearTreasuryData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};