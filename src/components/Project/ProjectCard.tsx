import React from 'react';
import { Link } from 'react-router-dom';
import { Project, User } from '../../types';
import { Clock, DollarSign, Globe, User as UserIcon } from 'lucide-react';
import { Button } from '../UI/Button';

interface ProjectCardProps {
  project: Project;
  creator: User;
  showClaimButton?: boolean;
  onClaim?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  creator,
  showClaimButton = false,
  onClaim,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-review':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getPlatformIcon = (platform: string) => {
    return <Globe className="h-4 w-4" />;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600 hover:border-purple-500/50 transition-all duration-300 cyber-card">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Link to={`/project/${project.id}`}>
              <h3 className="text-lg font-semibold text-white hover:text-purple-300 transition-colors mb-2">
                {project.title}
              </h3>
            </Link>
            <div className="flex items-center space-x-4 text-sm text-slate-400 mb-3">
              <div className="flex items-center space-x-1">
                {getPlatformIcon(project.platform)}
                <span className="capitalize">{project.platform.replace('.', ' ')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
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
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
            {project.status.replace('-', ' ')}
          </span>
        </div>

        <p className="text-slate-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <UserIcon className="h-4 w-4" />
            <span>{creator.name}</span>
            <span>•</span>
            <span>{creator.rating.toFixed(1)} ★</span>
          </div>
          
          {showClaimButton && project.status === 'open' && (
            <Button
              size="sm"
              onClick={() => onClaim?.(project.id)}
              variant="cyber"
            >
              Claim Mission
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};