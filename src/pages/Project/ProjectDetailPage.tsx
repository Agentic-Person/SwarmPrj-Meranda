import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { mockProjects, mockUsers, mockMessages, refreshMockData } from '../../utils/mockData';
import { Button } from '../../components/UI/Button';
import { Textarea } from '../../components/UI/Textarea';
import { 
  Calendar, 
  DollarSign, 
  Globe, 
  User, 
  MessageCircle, 
  CheckCircle,
  Clock,
  ExternalLink,
  Star,
  Target
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [project, setProject] = useState(mockProjects.find(p => p.id === id));
  const [creator, setCreator] = useState<any>(null);
  const [finisher, setFinisher] = useState<any>(null);
  const [projectMessages, setProjectMessages] = useState(mockMessages.filter(m => m.projectId === id));

  // Refresh data when component mounts or project ID changes
  useEffect(() => {
    refreshMockData();
    const foundProject = mockProjects.find(p => p.id === id);
    setProject(foundProject);
    
    if (foundProject) {
      setCreator(mockUsers.find(u => u.id === foundProject.creatorId));
      setFinisher(foundProject.finisherId ? mockUsers.find(u => u.id === foundProject.finisherId) : null);
    }
    
    setProjectMessages(mockMessages.filter(m => m.projectId === id));
  }, [id]);

  if (!project || !creator) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative z-10">
        <h1 className="text-2xl font-bold text-white mb-4">Mission not found</h1>
        <Link to="/marketplace" className="text-purple-400 hover:text-purple-300">
          Back to marketplace
        </Link>
      </div>
    );
  }

  const canViewProject = user && (
    user.id === project.creatorId || 
    user.id === project.finisherId ||
    project.status === 'open'
  );

  if (!canViewProject) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center relative z-10">
        <h1 className="text-2xl font-bold text-white mb-4">Access denied</h1>
        <p className="text-slate-300 mb-4">You don't have permission to view this mission.</p>
        <Link to="/marketplace" className="text-purple-400 hover:text-purple-300">
          Back to marketplace
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setNewMessage('');
    setIsSubmitting(false);
    alert('Message sent! (This would be added to the conversation in a real app)');
  };

  const handleClaimProject = () => {
    alert('Mission claimed! This would assign the mission to you and change its status.');
  };

  const handleCompleteProject = () => {
    alert('Mission marked as complete! This would notify the creator for review.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Header */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 cyber-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{project.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span className="capitalize">{project.platform.replace('.', ' ')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  {project.budget && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>${project.budget}</span>
                    </div>
                  )}
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ')}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Challenge Description</h3>
                <p className="text-slate-300">{project.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2">Success Criteria</h3>
                <p className="text-slate-300">{project.desiredOutcome}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2">Application Link</h3>
                <a 
                  href={project.appLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300"
                >
                  {project.appLink}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Project Brief */}
          {project.brief && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-purple-300 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Swarm Analysis & Execution Plan
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-purple-200 mb-2">Identified Challenge</h3>
                  <p className="text-purple-100">{project.brief.identifiedIssue}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-purple-200 mb-2">Target Location</h3>
                  <p className="text-purple-100">{project.brief.suspectedLocation}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-purple-200 mb-2">Execution Steps</h3>
                  <ol className="list-decimal list-inside space-y-1 text-purple-100">
                    {project.brief.actionableSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h3 className="font-semibold text-purple-200 mb-2">Completion Criteria</h3>
                  <p className="text-purple-100">{project.brief.definitionOfDone}</p>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 cyber-card">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Mission Communication
            </h2>
            
            <div className="space-y-4 mb-6">
              {projectMessages.length === 0 ? (
                <p className="text-slate-400 text-center py-4">No messages yet. Start the collaboration!</p>
              ) : (
                projectMessages.map(message => {
                  const sender = mockUsers.find(u => u.id === message.senderId);
                  const isCurrentUser = user?.id === message.senderId;
                  
                  return (
                    <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-100'} rounded-lg p-3`}>
                        <div className="text-sm font-medium mb-1">
                          {isCurrentUser ? 'You' : sender?.name}
                        </div>
                        <div className="text-sm">{message.content}</div>
                        <div className={`text-xs mt-1 ${isCurrentUser ? 'text-purple-200' : 'text-slate-400'}`}>
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            {(user?.id === project.creatorId || user?.id === project.finisherId) && (
              <form onSubmit={handleSendMessage}>
                <div className="flex space-x-3">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={2}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={!newMessage.trim()}
                    variant="cyber"
                  >
                    Send
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 cyber-card">
            <h3 className="font-semibold text-white mb-4">Actions</h3>
            
            {user?.role === 'finisher' && project.status === 'open' && !project.finisherId && (
              <Button
                onClick={handleClaimProject}
                className="w-full mb-3"
                variant="cyber"
              >
                Claim Mission
              </Button>
            )}
            
            {user?.id === project.finisherId && project.status === 'in-progress' && (
              <Button
                onClick={handleCompleteProject}
                className="w-full mb-3"
                variant="cyber"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
            )}
            
            {project.status === 'in-review' && user?.id === project.creatorId && (
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  Request Changes
                </Button>
                <Button className="w-full" variant="cyber">
                  Approve & Complete
                </Button>
              </div>
            )}
          </div>

          {/* Creator Info */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 cyber-card">
            <h3 className="font-semibold text-white mb-4">Mission Creator</h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-white">{creator.name}</div>
                <div className="flex items-center space-x-1 text-sm text-slate-400">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{creator.rating.toFixed(1)}</span>
                  <span>({creator.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            
            {creator.bio && (
              <p className="text-slate-300 text-sm mb-4">{creator.bio}</p>
            )}
            
            <div className="text-sm text-slate-400">
              <div>Missions completed: {creator.completedProjects}</div>
              <div>Member since: {new Date(creator.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Finisher Info */}
          {finisher && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 cyber-card">
              <h3 className="font-semibold text-white mb-4">Assigned Agent</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white">{finisher.name}</div>
                  <div className="flex items-center space-x-1 text-sm text-slate-400">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{finisher.rating.toFixed(1)}</span>
                    <span>({finisher.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              {finisher.skills && finisher.skills.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-white mb-2">Expertise</div>
                  <div className="flex flex-wrap gap-1">
                    {finisher.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {finisher.bio && (
                <p className="text-slate-300 text-sm mb-4">{finisher.bio}</p>
              )}
              
              <div className="text-sm text-slate-400">
                <div>Missions completed: {finisher.completedProjects}</div>
              </div>
            </div>
          )}

          {/* Mission Timeline */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 cyber-card">
            <h3 className="font-semibold text-white mb-4">Timeline</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div>
                  <div className="text-white">Mission deployed</div>
                  <div className="text-slate-400">{new Date(project.createdAt).toLocaleString()}</div>
                </div>
              </div>
              
              {project.finisherId && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <div>
                    <div className="text-white">Agent assigned</div>
                    <div className="text-slate-400">{new Date(project.updatedAt).toLocaleString()}</div>
                  </div>
                </div>
              )}
              
              {project.status === 'completed' && (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <div className="text-white">Mission completed</div>
                    <div className="text-slate-400">{new Date(project.updatedAt).toLocaleString()}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};