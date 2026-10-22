import React, { useState, useEffect } from 'react';
import { Play, BookOpen, ChevronRight, ChevronLeft, ArrowRight, Monitor, Cpu } from 'lucide-react';
import { Game } from '../types';

interface HeroCarouselProps {
  games: Game[];
  onSelectGame: (game: Game, tabFocus?: 'story' | 'overview') => void;
  onPlayTrailer: (youtubeId: string, title: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  games,
  onSelectGame,
  onPlayTrailer
}) => {
  const featuredGames = games.filter((g) => g.isFeatured).length > 0
    ? games.filter((g) => g.isFeatured)
    : games.slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!isAutoPlay || featuredGames.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isAutoPlay, featuredGames.length]);

  const currentGame = featuredGames[currentIndex] || games[0];

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
  };

  if (!currentGame) return null;

  return (
    <section className="relative w-full overflow-hidden border-b border-slate-800/80 bg-[#090b10]">
      {/* Background Image with Cinematic Scrim */}
      <div className="relative min-h-[580px] lg:min-h-[660px] w-full flex items-end">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {!imageError ? (
            <img
              src={currentGame.heroBanner || currentGame.coverImage}
              alt={currentGame.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-center transition-all duration-1000 scale-100 filter brightness-80"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-tr from-slate-950 via-[#131726] to-[#1c182f]" />
          )}

          {/* Measured Scrim: 4.5:1 text legibility contract */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090d] via-[#08090d]/60 to-transparent" />
          {/* Subtle accent ambiance */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
          <div className="max-w-3xl space-y-5">
            
            {/* Zero-Pill Unboxed Clean Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
              <span>{currentGame.releaseStatus} Release</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">{currentGame.releaseDate}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">{currentGame.developer}</span>
              {currentGame.engine && (
                <>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-400">{currentGame.engine}</span>
                </>
              )}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {currentGame.title}
            </h1>

            {/* Tagline / Teaser */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-balance">
              {currentGame.tagline || currentGame.overview}
            </p>

            {/* Platform and Genre Details */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="text-slate-500 font-medium">Platforms:</span>
              <span>{Array.isArray(currentGame.platforms) ? currentGame.platforms.join(', ') : 'PC'}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-500 font-medium">Genre:</span>
              <span>{Array.isArray(currentGame.genres) ? currentGame.genres.join(', ') : 'Action and Adventure'}</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectGame(currentGame, 'overview')}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-purple-900/30 transition-all flex items-center gap-2 group whitespace-nowrap shrink-0"
              >
                <span>Explore Game</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onSelectGame(currentGame, 'story')}
                className="px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <BookOpen className="h-4 w-4 text-purple-400" />
                <span>Read Full Story & Lore</span>
              </button>

              {currentGame.trailerYoutubeId && (
                <button
                  onClick={() => onPlayTrailer(currentGame.trailerYoutubeId, currentGame.title)}
                  className="px-4 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Play className="h-4 w-4 text-blue-400 fill-blue-400" />
                  <span>Watch Official Trailer</span>
                </button>
              )}
            </div>

          </div>

          {/* Carousel Navigation Strip */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Carousel Item Selector Tabs (Functional Buttons) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {featuredGames.map((game, idx) => (
                <button
                  key={game.id}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs transition-all whitespace-nowrap shrink-0 ${
                    currentIndex === idx
                      ? 'bg-purple-950/70 text-purple-300 border border-purple-600/50'
                      : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-slate-800/50'
                  }`}
                >
                  <span className="font-semibold block">{game.title}</span>
                  <span className="text-[11px] text-slate-500 font-normal">{game.releaseDate}</span>
                </button>
              ))}
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Previous featured game"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                {currentIndex + 1} / {featuredGames.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Next featured game"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
