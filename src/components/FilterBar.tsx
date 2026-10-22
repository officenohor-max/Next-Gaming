import React from 'react';
import { FilterState, GameCategory, ReleaseStatus } from '../types';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  developers: string[];
  totalResults: number;
}

const CATEGORIES: GameCategory[] = [
  'Open World',
  'Action and Adventure',
  'RPG',
  'FPS and Tactical Shooter',
  'Survival and Horror',
  'Soulslike',
  'Racing and Simulation',
  'Strategy',
  'Sci-Fi',
  'Fantasy'
];

const STATUSES: { label: string; value: string }[] = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Upcoming', value: 'Upcoming' },
  { label: 'Recently Released', value: 'Recently Released' },
  { label: 'Confirmed Date', value: 'Confirmed' },
  { label: 'Estimated', value: 'Estimated' },
  { label: 'TBA', value: 'TBA' },
  { label: 'Released', value: 'Released' }
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  developers,
  totalResults
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleClearSearch = () => {
    onFilterChange({ ...filters, searchQuery: '' });
  };

  const handleResetAll = () => {
    onFilterChange({
      searchQuery: '',
      status: 'all',
      genre: 'all',
      developer: 'all',
      releaseYear: 'all',
      hardwareTier: 'all',
      sortBy: 'featured'
    });
  };

  const hasActiveFilters = 
    filters.searchQuery !== '' ||
    filters.status !== 'all' ||
    filters.genre !== 'all' ||
    filters.developer !== 'all' ||
    filters.releaseYear !== 'all' ||
    filters.hardwareTier !== 'all' ||
    filters.sortBy !== 'featured';

  return (
    <div className="w-full space-y-4 rounded-xl border border-slate-800/80 bg-[#0c101a] p-4 sm:p-5">
      
      {/* Top row: Search input + Sorting selector */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={handleTextChange}
            placeholder="Search by title, character, developer, engine, or keywords..."
            className="w-full rounded-lg border border-slate-800 bg-[#080a11] pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 whitespace-nowrap">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
            className="rounded-lg border border-slate-800 bg-[#080a11] px-3 py-2.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="releaseDate">Upcoming Release Date</option>
            <option value="trending">Most Anticipated / Trending</option>
            <option value="newest">Recently Updated</option>
          </select>
        </div>
      </div>

      {/* Filter Row: Facets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-800/60">
        
        {/* Status */}
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Release Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-[#080a11] px-2.5 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Genre Category</label>
          <select
            value={filters.genre}
            onChange={(e) => onFilterChange({ ...filters, genre: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-[#080a11] px-2.5 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
          >
            <option value="all">All Genres</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Developer */}
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Developer / Studio</label>
          <select
            value={filters.developer}
            onChange={(e) => onFilterChange({ ...filters, developer: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-[#080a11] px-2.5 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
          >
            <option value="all">All Studios</option>
            {developers.map((dev) => (
              <option key={dev} value={dev}>{dev}</option>
            ))}
          </select>
        </div>

        {/* Release Year */}
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Release Year</label>
          <select
            value={filters.releaseYear}
            onChange={(e) => onFilterChange({ ...filters, releaseYear: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-[#080a11] px-2.5 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
          >
            <option value="all">Any Year</option>
            <option value="2024">2024 (Released)</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027+</option>
            <option value="TBA">Date TBA</option>
          </select>
        </div>

        {/* Hardware Tier */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1">
          <label className="block text-[11px] font-medium text-slate-400 mb-1">PC Hardware Level</label>
          <select
            value={filters.hardwareTier}
            onChange={(e) => onFilterChange({ ...filters, hardwareTier: e.target.value })}
            className="w-full rounded-md border border-slate-800 bg-[#080a11] px-2.5 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
          >
            <option value="all">All Specifications</option>
            <option value="accessible">Accessible / GTX 1060 / 1660</option>
            <option value="midrange">Mid-Range / RTX 3060 / RX 6700</option>
            <option value="highend">High-End / RTX 4080 / Path Tracing</option>
          </select>
        </div>

      </div>

      {/* Result Count and Reset Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <div className="flex items-center gap-2">
          <span>Found <strong className="text-white">{totalResults}</strong> matching PC games</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetAll}
            className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

    </div>
  );
};
