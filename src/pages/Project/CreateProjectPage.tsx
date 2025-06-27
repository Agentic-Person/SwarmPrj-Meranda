import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { Textarea } from '../../components/UI/Textarea';
import { Platform } from '../../types';
import { Zap, Target, Brain, CheckCircle } from 'lucide-react';

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    desiredOutcome: '',
    platform: 'bolt.new' as Platform,
    appLink: '',
    budget: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would create the project and run the diagnostic engine
    alert('Mission deployed successfully! The swarm intelligence is analyzing your request...');
    
    setIsSubmitting(false);
    navigate('/dashboard');
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
      </div>

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
                
                <Input
                  label="Budget Allocation (Optional)"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="0"
                  helper="Budget in USD for mission completion"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                variant="cyber"
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
          
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
            <h3 className="font-semibold text-cyan-300 mb-3">💡 Optimization Tips</h3>
            <ul className="space-y-2 text-sm text-cyan-200">
              <li>• Provide detailed technical specifications</li>
              <li>• Include relevant documentation or examples</li>
              <li>• Specify performance and security requirements</li>
              <li>• Set realistic timelines and budget expectations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};