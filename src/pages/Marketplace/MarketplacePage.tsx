import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { mockProjects, mockUsers, refreshMockData } from '../../utils/mockData';
import { ProjectCard } from '../../components/Project/ProjectCard';
import { ProjectFilters } from '../../components/Project/ProjectFilters';
import { Platform, ProjectStatus } from '../../types';
import { Button } from '../../components/UI/Button';
import { Link } from 'react-router-dom';
import { Target, Plus } from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('open');
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 0]);

  // Refresh data when component mounts to get latest from localStorage
  useEffect(() => {
    refreshMockData();
    setProjects([...mockProjects]);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = selectedPlatform === 'all' || project.platform === selectedPlatform;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      const matchesBudget = budgetRange[0] === 0 && budgetRange[1] === 0 ||
                           (project.budget && project.budget >= budgetRange[0] && 
                            (budgetRange[1] === 0 || project.budget <= budgetRange[1]));
      
      return matchesSearch && matchesPlatform && matchesStatus && matchesBudget;
    });
  }, [projects, searchTerm, selectedPlatform, selectedStatus, budgetRange]);

  const handleClaimProject = (projectId: string) => {
    // In a real app, this would make an API call
    alert(`Mission ${projectId} claimed! This would update the mission status and assign it to you.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Mission Marketplace</h1>
            <p className="mt-2 text-slate-300">
              Discover collaborative opportunities in the swarm
            </p>
          </div>
          {user?.role === 'creator' && (
            <div className="mt-4 sm:mt-0">
              <Link to="/create-project">
                <Button variant="cyber">
                  <Plus className="h-4 w-4 mr-2" />
                  Deploy Mission
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <ProjectFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        budgetRange={budgetRange}
        onBudgetRangeChange={setBudgetRange}
      />

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-slate-300">
            {filteredProjects.length} mission{filteredProjects.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="h-8 w-8 text-slate-400" />
          </div>
          <div className="text-slate-400 mb-4">No missions match your current filters</div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedPlatform('all');
              setSelectedStatus('all');
              setBudgetRange([0, 0]);
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => {
            const creator = mockUsers.find(u => u.id === project.creatorId) || mockUsers[0];
            return (
              <ProjectCard
                key={project.id}
                project={project}
                creator={creator!}
                showClaimButton={user?.role === 'finisher'}
                onClaim={handleClaimProject}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};