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
    missionCost: '',
    swarmTokenReward: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const missionCost = formData.missionCost ? parseInt(formData.missionCost) : 0;
    
    // Check if user has enough SWARM tokens
    if (missionCost > 0 && (user?.swarmTokens || 0) < missionCost) {
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
      budget: missionCost || undefined,
      swarmTokenReward: formData.swarmTokenReward ? parseInt(formData.swarmTokenReward) : undefined,
      status: 'open',
      creatorId: user!.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add the project to mock data
    addMockProject(newProject);
    
    // Deduct SWARM tokens from user if mission cost is specified
    if (missionCost > 0 && user) {
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
      missionCost: '',
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
          <span className="text-yellow-400 font-semibold">{user?.swarmTokens || 0} SWARM</span>
        </div>
      </div>

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
                  <Input
                    label="Mission Cost (Optional)"
                    type="number"
                    value={formData.missionCost}
                    onChange={(e) => handleInputChange('missionCost', e.target.value)}
                    placeholder="0"
                    helper="SWARM Tokens required to deploy this mission"
                  />
                  
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
                disabled={showSuccess}
              >
                {isSubmitting ? 'Deploying Mission...' : 'Deploy Mission'}
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
              SWARM Token Economy
            </h3>
            <div className="space-y-2 text-sm text-yellow-200">
              <p>• Reward agents with SWARM tokens for mission completion</p>
              <p>• Higher rewards attract more skilled agents</p>
              <p>• Tokens can be used for premium features and governance</p>
              <p>• Build reputation through consistent quality delivery</p>
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