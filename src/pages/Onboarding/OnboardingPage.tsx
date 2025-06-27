import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { onboardingQuestions, calculatePersonalityArchetype } from '../../utils/onboardingData';
import { ChevronLeft, ChevronRight, Sparkles, Users, Shield } from 'lucide-react';

type OnboardingStep = 'agent-creation' | 'personality-assessment' | 'results';

export const OnboardingPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('agent-creation');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [agentData, setAgentData] = useState({
    agentName: '',
    primaryRole: 'builder' as 'builder' | 'validator' | 'approver'
  });
  
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [personalityResult, setPersonalityResult] = useState<any>(null);

  const primaryRoleOptions = [
    { value: 'builder', label: 'Builder - Forge epic applications' },
    { value: 'validator', label: 'Validator - Ensure quality and standards' },
    { value: 'approver', label: 'Approver - Guide strategic decisions' }
  ];

  const handleAgentCreation = () => {
    if (!agentData.agentName.trim()) return;
    setCurrentStep('personality-assessment');
  };

  const handleAnswerSelect = (optionId: string) => {
    const currentQuestion = onboardingQuestions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < onboardingQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate personality archetype
      const archetype = calculatePersonalityArchetype(answers);
      setPersonalityResult(archetype);
      setCurrentStep('results');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setCurrentStep('agent-creation');
    }
  };

  const handleJoinSwarm = async () => {
    setIsSubmitting(true);
    
    // Simulate API call to update user profile
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update user with onboarding data
    const updatedUser = {
      ...user!,
      agentName: agentData.agentName,
      primaryRole: agentData.primaryRole,
      personalityArchetype: personalityResult,
      onboardingCompleted: true
    };
    
    updateUser(updatedUser);
    setIsSubmitting(false);
    navigate('/dashboard');
  };

  const currentQuestion = onboardingQuestions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion?.id];
  const progress = ((currentQuestionIndex + 1) / onboardingQuestions.length) * 100;

  if (currentStep === 'agent-creation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to AI SWARM
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Join the decentralized network of AI agents building epic applications through peer-to-peer collaboration, real-time validation, and next-gen vibe coding.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Create Your Agent
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Agent Name
                </label>
                <Input
                  value={agentData.agentName}
                  onChange={(e) => setAgentData(prev => ({ ...prev, agentName: e.target.value }))}
                  placeholder=""
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Primary Role (will be optimized based on your profile)
                </label>
                <Select
                  options={primaryRoleOptions}
                  value={agentData.primaryRole}
                  onChange={(e) => setAgentData(prev => ({ ...prev, primaryRole: e.target.value as any }))}
                  className="bg-slate-700/50 border-slate-600 text-white focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              
              <Button
                onClick={handleAgentCreation}
                disabled={!agentData.agentName.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
              >
                Continue to Profile Setup
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'personality-assessment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Discover Your Archetype
            </h1>
            <p className="text-slate-300 text-lg">
              Question {currentQuestionIndex + 1} of {onboardingQuestions.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedAnswer === option.id
                      ? 'border-purple-500 bg-purple-500/20 text-white'
                      : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button
                onClick={handleBack}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    const getRoleIcon = (role: string) => {
      switch (role) {
        case 'builder': return <Sparkles className="h-8 w-8" />;
        case 'validator': return <Shield className="h-8 w-8" />;
        case 'approver': return <Users className="h-8 w-8" />;
        default: return <Sparkles className="h-8 w-8" />;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Agent Profile
            </h1>
            <p className="text-slate-300 text-lg">
              Ready to join the swarm and start collaborating
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
            {/* Agent Summary */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
                {getRoleIcon(agentData.primaryRole)}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {agentData.agentName}
              </h2>
              <p className="text-purple-300 capitalize">
                {agentData.primaryRole} Agent
              </p>
            </div>

            {/* Personality Archetype */}
            <div className="bg-slate-700/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Your Archetype: <span className="text-purple-300 capitalize">{personalityResult.type}</span>
              </h3>
              <p className="text-slate-300 mb-4">
                {personalityResult.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Key Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {personalityResult.traits.map((trait: string) => (
                      <span key={trait} className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {personalityResult.strengths.map((strength: string) => (
                      <span key={strength} className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-full text-sm">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-white mb-2">Work Style</h4>
                <p className="text-slate-300 text-sm">{personalityResult.workStyle}</p>
              </div>
            </div>

            <Button
              onClick={handleJoinSwarm}
              loading={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 text-lg font-semibold"
            >
              {isSubmitting ? 'Joining the Swarm...' : 'Join the Swarm'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};