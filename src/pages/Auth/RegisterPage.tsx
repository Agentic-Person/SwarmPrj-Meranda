import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { Textarea } from '../../components/UI/Textarea';
import { Code2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'creator' as 'creator' | 'finisher',
    bio: '',
    skills: [] as string[],
  });
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await register(formData);
    if (success) {
      navigate('/onboarding');
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const roleOptions = [
    { value: 'creator', label: 'Creator - Deploy missions and build applications' },
    { value: 'finisher', label: 'Finisher - Execute missions and deliver solutions' },
  ];

  return (
    <div className="min-h-screen neural-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="relative">
              <Code2 className="h-12 w-12 text-purple-400" />
              <div className="absolute inset-0 bg-purple-400 opacity-20 blur-lg"></div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Join AI Swarm
          </h2>
          <p className="mt-2 text-center text-sm text-slate-300">
            Or{' '}
            <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
              connect to existing agent
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              placeholder="Enter your full name"
            />
            
            <Input
              label="Email address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              placeholder="Enter your email"
            />
            
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              placeholder="Enter your password"
            />
            
            <Select
              label="Agent Type"
              options={roleOptions}
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
            />
            
            <Textarea
              label="Bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about your expertise..."
              rows={3}
            />
            
            {formData.role === 'finisher' && (
              <Input
                label="Skills"
                type="text"
                value={formData.skills.join(', ')}
                onChange={(e) => handleInputChange('skills', e.target.value.split(', ').filter(Boolean))}
                placeholder="e.g., React, Node.js, Python, AI/ML"
                helper="Separate skills with commas"
              />
            )}
          </div>

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              variant="cyber"
            >
              Join Swarm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};