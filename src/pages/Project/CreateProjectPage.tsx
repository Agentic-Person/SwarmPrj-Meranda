import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { Textarea } from '../../components/UI/Textarea';
import { Platform, Project } from '../../types';
import { addMockProject } from '../../utils/mockData';
import { Zap, Target, Brain, CheckCircle, AlertCircle, Star } from 'lucide-react';

const platformOptions = [
  { value: 'bolt.new', label: 'Bolt.new' },
  { value: 'bubble', label: 'Bubble' },
  { value: 'webflow', label: 'Webflow' },
  { value: 'adalo', label: 'Adalo' },
  { value: 'glide', label: 'Glide' },
  { value: 'flutterflow', label: 'FlutterFlow' },
  { value: 'appgyver', label: 'AppGyver' },
  { value: 'other', label: 'Other' },
];

export const CreateProjectPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    desiredOutcome: '',
    platform: 'bolt.new' as Platform,
    appLink: '',
    missionCost: '100', // Set to mandatory 100 SWARM tokens
    swarmTokenReward: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const missionCost = 100; // Fixed at 100 SWARM tokens
    
    // Check if user has enough SWARM tokens
    if ((user?.swarmTokens || 0) < missionCost) {
      alert(`Insufficient SWARM tokens. You need ${missionCost} SWARM tokens but only have ${user?.swarmTokens || 0}.`);
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create the new project object
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      desiredOutcome: formData.desiredOutcome,
      platform: formData.platform,
      appLink: formData.appLink,
      budget: missionCost,
      swarmTokenReward: formData.swarmTokenReward ? parseInt(formData.swarmTokenReward) : undefined,
      status: 'open',
      creatorId: user!.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add the project to mock data
    addMockProject(newProject);
    
    // Deduct SWARM tokens from user
    if (user) {
      const updatedUser = {
        ...user,
        swarmTokens: (user.swarmTokens || 0) - missionCost,
      };
      
      // Update wallet SWARM token balance if wallet exists
      if (updatedUser.wallet) {
        const swarmToken = updatedUser.wallet.tokens.find(t => t.symbol === 'SWARM');
        if (swarmToken) {
          swarmToken.balance = updatedUser.swarmTokens;
          swarmToken.usdValue = swarmToken.balance * 0.85;
        }
      }
      
      updateUser(updatedUser);
    }
    
    // Show success message
    setShowSuccess(true);
    
    // Clear form
    setFormData({
      title: '',
      description: '',
      desiredOutcome: '',
      platform: 'bolt.new',
      appLink: '',
      missionCost: '100',
      swarmTokenReward: '',
    });
    
    setIsSubmitting(false);
    
    // Auto-redirect after 3 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  if (user?.role !== 'creator') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative z-10">
        <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
        <p className="text-slate-300">Only creator agents can deploy new missions.</p>
      </div>
    );
  }

  // Get the current SWARM balance - ensure it shows 1000 if not set
  const currentSwarmBalance = user?.swarmTokens ?? 1000;
  const missionCost = 100;
  const hasInsufficientFunds = currentSwarmBalance < missionCost;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Deploy New Mission</h1>
        <p className="mt-2 text-slate-300">
          Define your challenge and let the swarm intelligence create an optimized execution plan
        </p>
        <div className="mt-4 flex items-center space-x-2 text-sm">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-slate-300">Your SWARM Balance:</span>
          <span className={`font-semibold ${hasInsufficientFunds ? 'text-red-400' : 'text-yellow-400'}`}>
            {currentSwarmBalance} SWARM
          </span>
          {hasInsufficientFunds && (
            <span className="text-red-400 text-xs">(Insufficient for deployment)</span>
          )}
        </div>
      </div>

      {/* Insufficient Funds Warning */}
      {hasInsufficientFunds && (
        <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-red-400" />
            <div>
              <h3 className="text-lg font-semibold text-red-300">Insufficient SWARM Tokens</h3>
              <p className="text-red-200 mt-1">
                You need 100 SWARM tokens to deploy a mission. You currently have {currentSwarmBalance} SWARM tokens.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <div>
              <h3 className="text-lg font-semibold text-green-300">Mission Deployed Successfully!</h3>
              <p className="text-green-200 mt-1">
                The swarm intelligence is analyzing your request. Redirecting to dashboard...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 cyber-card">
              <h2 className="text-lg font-semibold text-white mb-6">Mission Parameters</h2>
              
              <div className="space-y-6">
                <Input
                  label="Mission Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Implement secure user authentication system"
                  required
                />
                
                <Select
                  label="Target Platform"
                  options={platformOptions}
                  value={formData.platform}
                  onChange={(e) => handleInputChange('platform', e.target.value)}
                />
                
                <Input
                  label="Application Link"
                  type="url"
                  value={formData.appLink}
                  onChange={(e) => handleInputChange('appLink', e.target.value)}
                  placeholder="https://your-application-url.com"
                  required
                  helper="Provide access to your application or repository"
                />
                
                <Textarea
                  label="Challenge Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the technical challenge, current state, and any constraints or requirements..."
                  rows={5}
                  required
                />
                
                <Textarea
                  label="Success Criteria"
                  value={formData.desiredOutcome}
                  onChange={(e) => handleInputChange('desiredOutcome', e.target.value)}
                  placeholder="Define what successful completion looks like, including specific functionality and performance requirements..."
                  rows={3}
                  required
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
                      Mission Cost (Required)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value="100"
                        disabled
                        className="block w-full rounded-lg bg-slate-700/50 border border-slate-500 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 transition-all duration-300 backdrop-blur-sm opacity-75 cursor-not-allowed"
                      />
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    <p className="text-sm text-slate-400">
                      <span className="text-yellow-400 font-semibold">100 SWARM Tokens</span> required to deploy this mission
                    </p>
                  </div>
                  
                  <Input
                    label="SWARM Token Reward (Optional)"
                    type="number"
                    value={formData.swarmTokenReward}
                    onChange={(e) => handleInputChange('swarmTokenReward', e.target.value)}
                    placeholder="0"
                    helper="SWARM Tokens awarded upon mission completion"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                variant="cyber"
                disabled={showSuccess || hasInsufficientFunds}
              >
                {isSubmitting ? 'Deploying Mission...' : 'Deploy Mission (100 SWARM)'}
              </Button>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-purple-300 mb-3 flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Swarm Intelligence Protocol
            </h3>
            <div className="space-y-3 text-sm text-purple-200">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                  <Brain className="h-3 w-3" />
                </div>
                <p>AI orchestrator analyzes mission requirements</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                  <Target className="h-3 w-3" />
                </div>
                <p>Optimal agent assignment based on expertise</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                  <CheckCircle className="h-3 w-3" />
                </div>
                <p>Real-time collaboration and validation</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-yellow-300 mb-3 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Mission Deployment Cost
            </h3>
            <div className="space-y-2 text-sm text-yellow-200">
              <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-3 mb-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300 mb-1">100 SWARM</div>
                  <div className="text-xs text-yellow-200">Required for mission deployment</div>
                </div>
              </div>
              <p>• Ensures serious commitment to mission completion</p>
              <p>• Funds swarm intelligence processing and coordination</p>
              <p>• Supports platform development and maintenance</p>
              <p>• Enables premium agent matching algorithms</p>
            </div>
          </div>
          
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
            <h3 className="font-semibold text-cyan-300 mb-3">💡 Optimization Tips</h3>
            <ul className="space-y-2 text-sm text-cyan-200">
              <li>• Provide detailed technical specifications</li>
              <li>• Include relevant documentation or examples</li>
              <li>• Specify performance and security requirements</li>
              <li>• Set realistic timelines and token expectations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};