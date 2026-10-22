import React, { useState, useEffect, useMemo } from 'react';
import { Game, NewsArticle, FilterState, GameCategory } from './types';
import { storageService } from './services/storageService';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { GameCard } from './components/GameCard';
import { NewsCard } from './components/NewsCard';
import { FilterBar } from './components/FilterBar';
import { ReleaseCalendar } from './components/ReleaseCalendar';
import { GameDetailPage } from './components/GameDetailPage';
import { NewsDetailPage } from './components/NewsDetailPage';
import { SystemRequirementsChecker } from './components/SystemRequirementsChecker';
import { AdminCMS } from './components/AdminCMS';
import { TrailerModal } from './components/TrailerModal';
import { SeoModal } from './components/SeoModal';
import { Footer } from './components/Footer';
import { 
  Flame, Sparkles, BookOpen, Clock, Calendar, ArrowRight, 
  Layers, CheckCircle2, Trophy, Search, Cpu 
} from 'lucide-react';

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

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'upcoming' | 'stories' | 'calendar' | 'news' | 'hardware' | 'admin' | 'game-detail' | 'news-detail'>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [gameDetailInitialTab, setGameDetailInitialTab] = useState<'story' | 'overview'>('overview');
  
  // Modals
  const [trailerData, setTrailerData] = useState<{ id: string; title: string } | null>(null);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    status: 'all',
    genre: 'all',
    developer: 'all',
    releaseYear: 'all',
    hardwareTier: 'all',
    sortBy: 'featured'
  });

  // Load storage data and subscribe
  useEffect(() => {
    const loadData = () => {
      setGames(storageService.getGames());
      setNews(storageService.getNews());
      setIsAdminLoggedIn(storageService.isAdminAuthenticated());
    };

    loadData();
    const unsubscribe = storageService.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  // Sync browser URL parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gameSlug = params.get('game');
    const newsSlug = params.get('news');
    const tab = params.get('tab');

    if (gameSlug) {
      const found = storageService.getGameBySlug(gameSlug);
      if (found) {
        setSelectedGame(found);
        setCurrentView('game-detail');
        return;
      }
    }

    if (newsSlug) {
      const found = storageService.getNewsBySlug(newsSlug);
      if (found) {
        setSelectedNews(found);
        setCurrentView('news-detail');
        return;
      }
    }

    if (tab && ['home', 'upcoming', 'stories', 'calendar', 'news', 'hardware', 'admin'].includes(tab)) {
      setCurrentView(tab as any);
    }
  }, []);

  // Update dynamic document title & meta description for SEO
  useEffect(() => {
    if (currentView === 'game-detail' && selectedGame) {
      document.title = `${selectedGame.title} – PC Story, Release Date & Specs | NextLevel`;
    } else if (currentView === 'news-detail' && selectedNews) {
      document.title = `${selectedNews.title} | NextLevel Gaming`;
    } else if (currentView === 'calendar') {
      document.title = 'PC Game Release Calendar 2025-2027 | NextLevel Gaming';
    } else if (currentView === 'hardware') {
      document.title = 'PC Hardware Specs & System Benchmark | NextLevel Gaming';
    } else if (currentView === 'admin') {
      document.title = 'Editorial Admin CMS | NextLevel Gaming';
    } else {
      document.title = 'NextLevel Gaming – Discover the Next Generation of PC Gaming';
    }
  }, [currentView, selectedGame, selectedNews]);

  // Navigation Handlers
  const handleNavigate = (tab: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedGame(null);
    setSelectedNews(null);
    
    // Update URL query
    const url = new URL(window.location.href);
    url.searchParams.delete('game');
    url.searchParams.delete('news');
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());

    setCurrentView(tab as any);
  };

  const handleSelectGame = (game: Game, tabFocus: 'story' | 'overview' = 'overview') => {
    setSelectedGame(game);
    setGameDetailInitialTab(tabFocus);
    setCurrentView('game-detail');
    const url = new URL(window.location.href);
    url.searchParams.delete('news');
    url.searchParams.delete('tab');
    url.searchParams.set('game', game.slug);
    window.history.pushState({}, '', url.toString());
  };

  const handleSelectNews = (article: NewsArticle) => {
    setSelectedNews(article);
    setCurrentView('news-detail');
    const url = new URL(window.location.href);
    url.searchParams.delete('game');
    url.searchParams.delete('tab');
    url.searchParams.set('news', article.slug);
    window.history.pushState({}, '', url.toString());
  };

  const handlePlayTrailer = (youtubeId: string, title: string) => {
    setTrailerData({ id: youtubeId, title });
  };

  const handleSelectCategory = (cat: GameCategory) => {
    setFilters({ ...filters, genre: cat, searchQuery: '' });
    setCurrentView('upcoming');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter and Sort Games
  const uniqueDevelopers = useMemo(() => {
    return Array.from(new Set(games.map((g) => g.developer))).sort();
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Search
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(q);
        const matchesDev = game.developer.toLowerCase().includes(q);
        const matchesEngine = game.engine.toLowerCase().includes(q);
        const matchesGenre = game.genres.some((gen) => gen.toLowerCase().includes(q));
        const matchesChar = game.characters.some((c) => c.name.toLowerCase().includes(q));
        const matchesOverview = game.overview.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDev && !matchesEngine && !matchesGenre && !matchesChar && !matchesOverview) {
          return false;
        }
      }

      // Status
      if (filters.status !== 'all') {
        if (filters.status === 'Upcoming') {
          if (game.isReleased) return false;
        } else if (filters.status === 'Recently Released') {
          if (!game.isReleased) return false;
        } else {
          if (game.releaseStatus !== filters.status) return false;
        }
      }

      // Genre
      if (filters.genre !== 'all') {
        if (!game.genres.includes(filters.genre as GameCategory)) return false;
      }

      // Developer
      if (filters.developer !== 'all') {
        if (game.developer !== filters.developer) return false;
      }

      // Release Year
      if (filters.releaseYear !== 'all') {
        if (filters.releaseYear === 'TBA') {
          if (game.releaseStatus !== 'TBA') return false;
        } else {
          if (!game.releaseDate.includes(filters.releaseYear) && !game.releaseDateSortable.startsWith(filters.releaseYear)) {
            return false;
          }
        }
      }

      // Hardware tier
      if (filters.hardwareTier !== 'all') {
        if (filters.hardwareTier === 'accessible') {
          if (!game.minRequirements.gpu.includes('1060') && !game.minRequirements.gpu.includes('1660') && !game.minRequirements.gpu.includes('650')) {
            return false;
          }
        } else if (filters.hardwareTier === 'highend') {
          if (!game.recommendedRequirements.gpu.includes('4070') && !game.recommendedRequirements.gpu.includes('4080') && !game.recommendedRequirements.gpu.includes('7900')) {
            return false;
          }
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.rankingScore || 0) - (a.rankingScore || 0);
      }
      if (filters.sortBy === 'trending') {
        return (b.rankingScore || 0) - (a.rankingScore || 0);
      }
      if (filters.sortBy === 'releaseDate') {
        if (a.releaseStatus === 'TBA' && b.releaseStatus !== 'TBA') return 1;
        if (b.releaseStatus === 'TBA' && a.releaseStatus !== 'TBA') return -1;
        return a.releaseDateSortable.localeCompare(b.releaseDateSortable);
      }
      if (filters.sortBy === 'newest') {
        return b.id.localeCompare(a.id);
      }
      return 0;
    });
  }, [games, filters]);

  // Section collections
  const upcomingGames = games.filter((g) => !g.isReleased);
  const recentlyReleasedGames = games.filter((g) => g.isReleased);
  const storyGames = games.filter((g) => g.storyConfirmed.length > 50 || g.worldBuilding.length > 50);
  const trendingGames = [...games].sort((a, b) => (b.rankingScore || 0) - (a.rankingScore || 0)).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#08090d] text-[#e2e8f0] flex flex-col font-sans selection:bg-purple-600/30 selection:text-white">
      
      {/* 3-Zone Clean Header */}
      <Header
        currentTab={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => {
          setCurrentView('upcoming');
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }}
        isAdmin={isAdminLoggedIn}
      />

      {/* Main Content Router */}
      <div className="flex-1">
        
        {/* VIEW 1: GAME DETAIL PAGE */}
        {currentView === 'game-detail' && selectedGame && (
          <GameDetailPage
            game={selectedGame}
            allGames={games}
            allNews={news}
            onBack={() => handleNavigate('home')}
            onSelectGame={handleSelectGame}
            onSelectNews={handleSelectNews}
            onPlayTrailer={handlePlayTrailer}
            initialTab={gameDetailInitialTab}
          />
        )}

        {/* VIEW 2: NEWS DETAIL PAGE */}
        {currentView === 'news-detail' && selectedNews && (
          <NewsDetailPage
            article={selectedNews}
            allNews={news}
            allGames={games}
            onBack={() => handleNavigate('news')}
            onSelectGame={handleSelectGame}
            onSelectNews={handleSelectNews}
          />
        )}

        {/* VIEW 3: RELEASE CALENDAR */}
        {currentView === 'calendar' && (
          <ReleaseCalendar
            games={games}
            onSelectGame={handleSelectGame}
          />
        )}

        {/* VIEW 4: SYSTEM REQUIREMENTS & HARDWARE BENCHMARK */}
        {currentView === 'hardware' && (
          <SystemRequirementsChecker
            games={games}
            onSelectGame={handleSelectGame}
          />
        )}

        {/* VIEW 5: ADMIN CMS */}
        {currentView === 'admin' && (
          <AdminCMS
            games={games}
            news={news}
            onRefresh={() => {
              setGames(storageService.getGames());
              setNews(storageService.getNews());
            }}
            onExit={() => setCurrentView('home')}
          />
        )}

        {/* VIEW 6: STORIES & LORE BROWSE VIEW */}
        {currentView === 'stories' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="border-b border-slate-800 pb-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2.5">
                <BookOpen className="h-7 w-7 text-purple-400" />
                <span>PC Game Stories, Narratives & Deep Lore</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl">
                Explore confirmed lore, world-building overviews, and character backgrounds. Spoiler warnings are strictly applied for major revelations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storyGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => handleSelectGame(game, 'story')}
                  className="group cursor-pointer rounded-xl border border-slate-800 bg-[#0e121c] overflow-hidden hover:border-purple-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full bg-slate-900">
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e121c] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-700/80 px-2 py-0.5 rounded text-[11px] font-semibold text-purple-300">
                      {game.genres[0]}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h2 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {game.title}
                      </h2>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mt-2">
                        {game.storyConfirmed}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-semibold">
                      <span>Read Story & Lore</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 7: NEWS EDITORIAL ARCHIVE */}
        {currentView === 'news' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="border-b border-slate-800 pb-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2.5">
                <Clock className="h-7 w-7 text-purple-400" />
                <span>PC Gaming Editorial News & Announcements</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl">
                Independent analysis, hardware breakthroughs, studio interviews, and verified PC patch updates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onSelect={handleSelectNews}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 8: UPCOMING & SEARCH GRID (OR DEFAULT HOMEPAGE) */}
        {(currentView === 'home' || currentView === 'upcoming') && (
          <div>
            
            {/* Hero Carousel on Home */}
            {currentView === 'home' && (
              <HeroCarousel
                games={games}
                onSelectGame={handleSelectGame}
                onPlayTrailer={handlePlayTrailer}
              />
            )}

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
              
              {/* Category Quick Filter Bar */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Explore By PC Gaming Genre
                  </h2>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  <button
                    onClick={() => setFilters({ ...filters, genre: 'all' })}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                      filters.genre === 'all'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    All Genres
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, genre: cat })}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                        filters.genre === cat
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>

              {/* SECTION: Trending Games Leaderboard (Ranked #1 to #5) */}
              {currentView === 'home' && trendingGames.length > 0 && (
                <section className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-purple-400" />
                      <h2 className="text-xl sm:text-2xl font-bold text-white">Trending & Most Anticipated PC Games</h2>
                    </div>
                    <span className="text-xs text-slate-500">Anticipation Ranking</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {trendingGames.map((game, idx) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        onSelect={handleSelectGame}
                        showRankingBadge={idx + 1}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* SECTION: Global Search & Faceted Filter System */}
              <section id="search-section" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {currentView === 'upcoming' ? 'Upcoming & Released PC Games Catalog' : 'Explore PC Games & Database'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Filter by release status, studio, hardware tier, or release calendar year.
                    </p>
                  </div>
                </div>

                {/* Filter Toolbar */}
                <FilterBar
                  filters={filters}
                  onFilterChange={setFilters}
                  developers={uniqueDevelopers}
                  totalResults={filteredGames.length}
                />

                {/* Filtered Games Grid */}
                {filteredGames.length === 0 ? (
                  <div className="rounded-xl border border-slate-800 bg-[#0e121c] p-12 text-center text-slate-400 space-y-2">
                    <Search className="h-8 w-8 mx-auto text-slate-600 mb-2" />
                    <p className="text-base font-semibold text-white">No games match your search criteria</p>
                    <p className="text-xs text-slate-500">
                      Try adjusting the search query, genre category, or hardware specification level.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        onSelect={handleSelectGame}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* SECTION: Latest Gaming News (Homepage layout) */}
              {currentView === 'home' && news.length > 0 && (
                <section className="space-y-6 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">Latest Gaming News & Hardware Analysis</h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        In-depth technical coverage, engine breakdowns, and publisher announcements.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('news')}
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                    >
                      <span>View All Articles</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {news.slice(0, 4).map((art) => (
                      <NewsCard
                        key={art.id}
                        article={art}
                        onSelect={handleSelectNews}
                        layout="horizontal"
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* SECTION: PC Hardware Benchmarking & Specs Promo */}
              {currentView === 'home' && (
                <section className="rounded-2xl border border-purple-900/40 bg-gradient-to-r from-[#111422] via-[#0d101b] to-[#140e24] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block">
                      Hardware Optimization
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Will Your PC Run Grand Theft Auto VI or The Witcher 4?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Compare your CPU, GPU, RAM, and NVMe DirectStorage speeds against official studio minimum and recommended system requirements.
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavigate('hardware')}
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold rounded-lg shadow-lg shadow-purple-900/40 transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <Cpu className="h-4 w-4" />
                    <span>Launch Hardware Benchmark Tool</span>
                  </button>
                </section>
              )}

              {/* SECTION: Explore Game Stories & Lore Spotlights */}
              {currentView === 'home' && storyGames.length > 0 && (
                <section className="space-y-6 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">Explore Deep Game Stories & World Lore</h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Immerse yourself in complex narratives, world-building lore, and unforgettable characters.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('stories')}
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                    >
                      <span>Explore Stories Hub</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {storyGames.slice(0, 3).map((game) => (
                      <div
                        key={game.id}
                        onClick={() => handleSelectGame(game, 'story')}
                        className="group cursor-pointer rounded-xl border border-slate-800 bg-[#0e121c] p-4 space-y-3 hover:border-purple-500/40 transition-colors"
                      >
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-900">
                          <img
                            src={game.coverImage}
                            alt={game.title}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                          {game.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {game.storyConfirmed}
                        </p>
                        <div className="text-xs text-purple-400 font-medium flex items-center gap-1 pt-1">
                          <span>Read Full Story</span>
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          </div>
        )}

      </div>

      {/* Trailer Playback Modal */}
      {trailerData && (
        <TrailerModal
          youtubeId={trailerData.id}
          title={trailerData.title}
          onClose={() => setTrailerData(null)}
        />
      )}

      {/* SEO & Sitemap Inspection Modal */}
      {isSeoModalOpen && (
        <SeoModal
          games={games}
          news={news}
          onClose={() => setIsSeoModalOpen(false)}
        />
      )}

      {/* Domain-Native Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenSeo={() => setIsSeoModalOpen(true)}
        onOpenAdmin={() => handleNavigate('admin')}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

    </div>
  );
}
