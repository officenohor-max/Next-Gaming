import React, { useState } from 'react';
import { Game, ReleaseStatus } from '../types';
import { Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle2, Bookmark, Bell, ArrowRight, ExternalLink } from 'lucide-react';

interface ReleaseCalendarProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
}

export const ReleaseCalendar: React.FC<ReleaseCalendarProps> = ({ games, onSelectGame }) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [remindedGames, setRemindedGames] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleReminder = (gameId: string, gameTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowReminded = !remindedGames[gameId];
    setRemindedGames((prev) => ({ ...prev, [gameId]: isNowReminded }));
    
    setToastMessage(isNowReminded ? `Reminder set for ${gameTitle}!` : `Removed reminder for ${gameTitle}.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter games for calendar
  const filteredGames = games.filter((game) => {
    // Year filter
    if (selectedYear !== 'all') {
      if (selectedYear === 'TBA') {
        if (game.releaseStatus !== 'TBA' && !game.releaseDate.includes('TBA')) return false;
      } else {
        if (!game.releaseDate.includes(selectedYear) && !game.releaseDateSortable.startsWith(selectedYear)) return false;
      }
    }

    // Status filter
    if (selectedStatus !== 'all') {
      if (game.releaseStatus !== selectedStatus) return false;
    }

    return true;
  });

  // Sort by date
  const sortedGames = [...filteredGames].sort((a, b) => {
    if (a.releaseStatus === 'TBA' && b.releaseStatus !== 'TBA') return 1;
    if (b.releaseStatus === 'TBA' && a.releaseStatus !== 'TBA') return -1;
    return a.releaseDateSortable.localeCompare(b.releaseDateSortable);
  });

  // Group into Confirmed, Estimated, Delayed, and TBA
  const confirmedList = sortedGames.filter((g) => g.releaseStatus === 'Confirmed');
  const estimatedList = sortedGames.filter((g) => g.releaseStatus === 'Estimated');
  const delayedList = sortedGames.filter((g) => g.releaseStatus === 'Delayed');
  const tbaList = sortedGames.filter((g) => g.releaseStatus === 'TBA');
  const releasedList = sortedGames.filter((g) => g.releaseStatus === 'Released');

  const getStatusBadge = (status: ReleaseStatus) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Confirmed Date</span>
          </span>
        );
      case 'Estimated':
        return (
          <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
            <Clock className="h-3.5 w-3.5" />
            <span>Estimated Window</span>
          </span>
        );
      case 'Delayed':
        return (
          <span className="flex items-center gap-1 text-rose-400 text-xs font-semibold">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Delayed</span>
          </span>
        );
      case 'Released':
        return (
          <span className="flex items-center gap-1 text-blue-400 text-xs font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Released</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
            <Clock className="h-3.5 w-3.5" />
            <span>Date TBA</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-xl animate-fade-in flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Editorial Disclaimer */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">PC Game Release Calendar</h1>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Track confirmed PC launch dates, publisher release windows, and confirmed development schedules. Never guessed, strictly verified.
            </p>
          </div>

          {/* Verification Badge */}
          <div className="rounded-lg border border-slate-800 bg-[#0d101a] p-3 text-xs text-slate-400 flex items-start gap-2.5 max-w-md">
            <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Editorial Verification Policy:</span> We never list unconfirmed leaks or community guesses as confirmed dates. Estimated dates are labeled explicitly.
            </div>
          </div>
        </div>

        {/* Filter Controls: Year & Status Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          {/* Year selector buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg overflow-x-auto">
            {['all', '2024', '2025', '2026', '2027', 'TBA'].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  selectedYear === year
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {year === 'all' ? 'All Years' : year === 'TBA' ? 'TBA Only' : year}
              </button>
            ))}
          </div>

          {/* Status filter dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Release Types</option>
              <option value="Confirmed">Confirmed Date</option>
              <option value="Estimated">Estimated Window</option>
              <option value="Delayed">Delayed</option>
              <option value="TBA">To Be Announced</option>
              <option value="Released">Released</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calendar List View */}
      {sortedGames.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#0e121c] p-12 text-center text-slate-400">
          <CalendarIcon className="h-8 w-8 mx-auto text-slate-600 mb-2" />
          <p className="text-base font-semibold text-white">No games found for this selection</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the year or release status filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedGames.map((game) => {
            const isReminded = remindedGames[game.id];

            return (
              <div
                key={game.id}
                onClick={() => onSelectGame(game)}
                className="group cursor-pointer rounded-xl border border-slate-800/80 bg-[#0e121c] p-4 sm:p-5 transition-all duration-200 hover:border-purple-500/50 hover:bg-[#121624] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Thumbnail & Core info */}
                <div className="flex items-start sm:items-center gap-4">
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    className="h-16 w-24 sm:h-20 sm:w-32 rounded-lg object-cover shrink-0 bg-slate-900 border border-slate-800"
                  />

                  <div className="space-y-1">
                    {/* Unboxed Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      {getStatusBadge(game.releaseStatus)}
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-purple-400 font-medium">
                        {Array.isArray(game.genres) && game.genres.length > 0 ? game.genres[0] : 'PC Game'}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{game.developer}</span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {game.title}
                    </h2>

                    <p className="text-xs text-slate-400 line-clamp-1">
                      Engine: {game.engine} · Platforms: {Array.isArray(game.platforms) ? game.platforms.join(', ') : 'PC'}
                    </p>
                  </div>
                </div>

                {/* Right: Date Box & Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800/60 shrink-0 gap-2">
                  <div className="text-left sm:text-right">
                    <span className="text-xs uppercase tracking-wider text-slate-500 block">Target Date</span>
                    <span className="text-sm sm:text-base font-bold text-white font-mono tabular-nums">
                      {game.releaseDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleToggleReminder(game.id, game.title, e)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        isReminded
                          ? 'bg-purple-900/60 text-purple-300 border border-purple-600/50'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                      title={isReminded ? 'Reminder active' : 'Notify me on release updates'}
                    >
                      <Bell className={`h-3.5 w-3.5 ${isReminded ? 'fill-purple-400 text-purple-400' : ''}`} />
                      <span>{isReminded ? 'Reminder Set' : 'Set Alert'}</span>
                    </button>

                    <div className="p-2 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Release Status Legend */}
      <div className="mt-8 rounded-xl border border-slate-800/80 bg-[#0a0d14] p-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Release Status Terminology</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-400">
          <div>
            <span className="font-semibold text-emerald-400 block mb-0.5">Confirmed Date</span>
            Formally announced by publisher with exact day or firm release month.
          </div>
          <div>
            <span className="font-semibold text-amber-400 block mb-0.5">Estimated Window</span>
            Based on investor filings, earnings guidance, or publisher quarters (e.g. "Q2 2026").
          </div>
          <div>
            <span className="font-semibold text-rose-400 block mb-0.5">Delayed</span>
            Previously announced date rescheduled by developer for polish or engine rework.
          </div>
          <div>
            <span className="font-semibold text-slate-300 block mb-0.5">Date TBA</span>
            Confirmed in active development, but no specific calendar window announced yet.
          </div>
        </div>
      </div>

    </div>
  );
};
