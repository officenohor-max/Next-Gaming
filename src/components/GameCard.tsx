import React, { useState } from 'react';
import { Game } from '../types';
import { Calendar, Cpu, ArrowUpRight, BookOpen, Star, Sparkles } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game, tabFocus?: 'story' | 'overview') => void;
  showRankingBadge?: number;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onSelect,
  showRankingBadge
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onSelect(game)}
      className="group cursor-pointer flex flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-[#0e121c] transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/20"
    >
      {/* Visual Cover Area */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        {!imgError ? (
          <img
            src={game.coverImage}
            alt={game.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 p-4 text-center">
            <span className="text-sm font-bold text-slate-400">{game.title}</span>
            <span className="text-xs text-slate-500 mt-1">{game.genres.join(', ')}</span>
          </div>
        )}

        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e121c] via-transparent to-black/20" />

        {/* Rank indicator if ranking list */}
        {showRankingBadge !== undefined && (
          <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-md bg-purple-600/90 font-mono text-xs font-bold text-white shadow-md">
            #{showRankingBadge}
          </div>
        )}

        {/* Release Status or Review score overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {game.isReleased && game.rating ? (
            <div className="flex items-center gap-1 rounded bg-amber-500/90 px-2 py-0.5 text-xs font-bold text-black shadow-sm">
              <Star className="h-3 w-3 fill-black" />
              <span>{game.rating}</span>
            </div>
          ) : (
            <div className="rounded bg-slate-900/90 border border-slate-700/60 px-2 py-0.5 text-[11px] font-semibold text-purple-300 backdrop-blur-sm">
              {game.releaseStatus}
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div className="space-y-2">
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <span className="text-purple-400 font-medium">{game.genres[0]}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{game.developer}</span>
            {game.engine && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-500">{game.engine.split(' ')[0]}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
            {game.title}
          </h3>

          {/* Short summary */}
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {game.tagline || game.overview}
          </p>
        </div>

        {/* Card Footer: Date & Affordance */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            <span className="font-medium text-slate-300">{game.releaseDate}</span>
          </div>

          <div className="flex items-center gap-1 text-purple-400 font-medium group-hover:translate-x-0.5 transition-transform">
            <span>Details</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
};
