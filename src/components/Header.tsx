import React, { useState } from 'react';
import { Search, ShieldAlert, Calendar, BookOpen, Flame, Newspaper, SlidersHorizontal, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenSearch: () => void;
  isAdmin: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  isAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080a10]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-3.5">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="group text-left text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 transition-colors hover:text-purple-400"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
            NL
          </span>
          <span className="font-extrabold tracking-tight text-white">NextLevel</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Gaming</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('upcoming')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              currentTab === 'upcoming' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : 'text-slate-300'
            }`}
          >
            Upcoming AAA
          </button>
          <button
            onClick={() => onNavigate('stories')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              currentTab === 'stories' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : 'text-slate-300'
            }`}
          >
            Game Stories & Lore
          </button>
          <button
            onClick={() => onNavigate('calendar')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              currentTab === 'calendar' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : 'text-slate-300'
            }`}
          >
            Release Calendar
          </button>
          <button
            onClick={() => onNavigate('news')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              currentTab === 'news' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : 'text-slate-300'
            }`}
          >
            Gaming News
          </button>
          <button
            onClick={() => onNavigate('hardware')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              currentTab === 'hardware' ? 'text-purple-400 font-semibold border-b-2 border-purple-500' : 'text-slate-300'
            }`}
          >
            Hardware Specs
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-all whitespace-nowrap shrink-0"
            title="Search games, lore, and developers"
          >
            <Search className="h-3.5 w-3.5 text-purple-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline text-[10px] text-slate-500 border border-slate-700/80 rounded px-1">⌘K</kbd>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              isAdmin || currentTab === 'admin'
                ? 'bg-purple-600 text-white shadow-sm hover:bg-purple-500'
                : 'border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Admin CMS</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0c0f17] px-4 py-3 space-y-2">
          <button
            onClick={() => { onNavigate('upcoming'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-sm text-slate-300 hover:text-purple-400"
          >
            Upcoming AAA Games
          </button>
          <button
            onClick={() => { onNavigate('stories'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-sm text-slate-300 hover:text-purple-400"
          >
            Game Stories & Lore
          </button>
          <button
            onClick={() => { onNavigate('calendar'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-sm text-slate-300 hover:text-purple-400"
          >
            Release Calendar
          </button>
          <button
            onClick={() => { onNavigate('news'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-sm text-slate-300 hover:text-purple-400"
          >
            Gaming News
          </button>
          <button
            onClick={() => { onNavigate('hardware'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-sm text-slate-300 hover:text-purple-400"
          >
            Hardware Specs
          </button>
        </div>
      )}
    </header>
  );
};
