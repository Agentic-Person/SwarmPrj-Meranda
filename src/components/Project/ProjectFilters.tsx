import React from 'react';
import { Platform, ProjectStatus } from '../../types';
import { Select } from '../UI/Select';
import { Input } from '../UI/Input';
import { Search } from 'lucide-react';

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPlatform: Platform | 'all';
  onPlatformChange: (platform: Platform | 'all') => void;
  selectedStatus: ProjectStatus | 'all';
  onStatusChange: (status: ProjectStatus | 'all') => void;
  budgetRange: [number, number];
  onBudgetRangeChange: (range: [number, number]) => void;
}

const platformOptions = [
  { value: 'all', label: 'All Platforms' },
  { value: 'bolt.new', label: 'Bolt.new' },
  { value: 'bubble', label: 'Bubble' },
  { value: 'webflow', label: 'Webflow' },
  { value: 'adalo', label: 'Adalo' },
  { value: 'glide', label: 'Glide' },
  { value: 'flutterflow', label: 'FlutterFlow' },
  { value: 'appgyver', label: 'AppGyver' },
  { value: 'other', label: 'Other' },
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'in-review', label: 'In Review' },
  { value: 'completed', label: 'Completed' },
];

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
  selectedStatus,
  onStatusChange,
  budgetRange,
  onBudgetRangeChange,
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 mb-6 cyber-card">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search missions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select
          options={platformOptions}
          value={selectedPlatform}
          onChange={(e) => onPlatformChange(e.target.value as Platform | 'all')}
        />
        
        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value as ProjectStatus | 'all')}
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300 uppercase tracking-wider">
            Budget Range
          </label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={budgetRange[0] || ''}
              onChange={(e) => onBudgetRangeChange([parseInt(e.target.value) || 0, budgetRange[1]])}
            />
            <Input
              type="number"
              placeholder="Max"
              value={budgetRange[1] || ''}
              onChange={(e) => onBudgetRangeChange([budgetRange[0], parseInt(e.target.value) || 0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};