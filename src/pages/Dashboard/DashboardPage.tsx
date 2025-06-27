import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { mockProjects, mockUsers, refreshMockData } from '../../utils/mockData';
import { ProjectCard } from '../../components/Project/ProjectCard';
import { Button } from '../../components/UI/Button';
import { Link } from 'react-router-dom';
import { Plus, Clock, CheckCircle, DollarSign, Zap, Activity, Target } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState(mockProjects);

  // Refresh data when component mounts to get latest from localStorage
  useEffect(() => {
    refreshMockData();
    setProjects([...mockProjects]);
  }, []);

  const userProjects = projects.filter(p => 
    user?.role === 'creator' ? p.creatorId === user.id : p.finisherId === user.id
  );

  const activeProjects = userProjects.filter(p => 
    p.status === 'open' || p.status === 'in-progress' || p.status === 'in-review'
  );

  const completedProjects = userProjects.filter(p => p.status === 'completed');

  const stats = [
    {
      label: 'Active Missions',
      value: activeProjects.length,
      icon: Activity,
      color: 'text-cyan-400 bg-cyan-500/20',
      border: 'border-cyan-500/30',
    },
    {
      label: 'In Progress',
      value: userProjects.filter(p => p.status === 'in-progress').length,
      icon: Clock,
      color: 'text-yellow-400 bg-yellow-500/20',
      border: 'border-yellow-500/30',
    },
    {
      label: 'Completed',
      value: completedProjects.length,
      icon: CheckCircle,
      color: 'text-green-400 bg-green-500/20',
      border: 'border-green-500/30',
    },
    {
      label: 'Total Earned',
      value: `$${completedProjects.reduce((sum, p) => sum + (p.budget || 0), 0)}`,
      icon: DollarSign,
      color: 'text-purple-400 bg-purple-500/20',
      border: 'border-purple-500/30',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.agentName || user?.name}
            </h1>
            <p className="text-slate-300 text-lg">
              {user?.role === 'creator' 
                ? 'Command center for your mission deployments and progress tracking'
                : 'Your active missions and swarm opportunities await'
              }
            </p>
          </div>
          <div className="mt-6 sm:mt-0 flex space-x-3">
            {user?.role === 'creator' ? (
              <Link to="/create-project">
                <Button variant="cyber" size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Deploy Mission
                </Button>
              </Link>
            ) : (
              <Link to="/marketplace">
                <Button variant="cyber" size="lg">
                  <Target className="h-5 w-5 mr-2" />
                  Browse Missions
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border ${stat.border} p-6 cyber-card`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Projects */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Active Missions</h2>
          {activeProjects.length > 0 && (
            <Link to="/projects" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
              View all missions
            </Link>
          )}
        </div>
        
        {activeProjects.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600 p-12 text-center cyber-card">
            <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Activity className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              No active missions
            </h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              {user?.role === 'creator' 
                ? 'Deploy your first mission to start building with the swarm'
                : 'Browse the mission marketplace to find collaborative opportunities'
              }
            </p>
            {user?.role === 'creator' ? (
              <Link to="/create-project">
                <Button variant="cyber">
                  <Plus className="h-4 w-4 mr-2" />
                  Deploy Mission
                </Button>
              </Link>
            ) : (
              <Link to="/marketplace">
                <Button variant="cyber">
                  <Target className="h-4 w-4 mr-2" />
                  Browse Missions
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeProjects.slice(0, 6).map(project => {
              const otherUser = user?.role === 'creator' 
                ? mockUsers.find(u => u.id === project.finisherId)
                : mockUsers.find(u => u.id === project.creatorId);
              
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  creator={otherUser || mockUsers[0]}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600 cyber-card">
          <div className="p-6">
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-slate-400">No recent activity</p>
              <p className="text-slate-500 text-sm mt-1">Your mission activity will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};