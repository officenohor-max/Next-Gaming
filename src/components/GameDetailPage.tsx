import React, { useState, useEffect } from 'react';
import { Game, NewsArticle } from '../types';
import { 
  Calendar, Cpu, Monitor, HardDrive, ShieldCheck, AlertTriangle, 
  Share2, Play, Eye, EyeOff, CheckCircle2, ChevronRight, ArrowLeft, 
  Layers, Sparkles, ExternalLink, Copy, Check, Users, Compass, Sword
} from 'lucide-react';

interface GameDetailPageProps {
  game: Game;
  allGames: Game[];
  allNews: NewsArticle[];
  onBack: () => void;
  onSelectGame: (game: Game) => void;
  onSelectNews: (article: NewsArticle) => void;
  onPlayTrailer: (youtubeId: string, title: string) => void;
  initialTab?: 'story' | 'overview';
}

export const GameDetailPage: React.FC<GameDetailPageProps> = ({
  game,
  allGames,
  allNews,
  onBack,
  onSelectGame,
  onSelectNews,
  onPlayTrailer,
  initialTab = 'overview'
}) => {
  const [showSpoilers, setShowSpoilers] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (initialTab === 'story') {
        const el = document.getElementById('story-lore');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      console.warn(e);
    }
  }, [game?.slug, initialTab]);

  const handleCopyLink = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
    } catch (e) {
      console.warn(e);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const gameGenres = Array.isArray(game?.genres) ? game.genres : [];
  const relatedGames = (allGames || [])
    .filter((g) => g?.id !== game?.id && Array.isArray(g?.genres) && g.genres.some((genre) => gameGenres.includes(genre)))
    .slice(0, 3);

  const relatedArticles = (allNews || [])
    .filter((n) => n?.relatedGameSlug === game?.slug || (Array.isArray(n?.tags) && n.tags.some((t) => game?.title?.toLowerCase().includes(t.toLowerCase()))))
    .slice(0, 2);

  const tableOfContents = [
    { id: 'overview', title: 'Game Overview' },
    { id: 'trailer', title: 'Official Trailer' },
    { id: 'story-lore', title: 'Full Story & Lore' },
    { id: 'characters', title: 'Characters & Factions' },
    { id: 'world-setting', title: 'World & Setting' },
    { id: 'mechanics-combat', title: 'Gameplay & Combat' },
    { id: 'visuals-engine', title: 'Graphics & Engine' },
    { id: 'system-specs', title: 'PC System Requirements' },
    { id: 'screenshots', title: 'Screenshots' },
    { id: 'updates', title: 'Latest Updates' }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    try {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <article className="min-h-screen bg-[#08090d] text-slate-200 pb-20">
      
      {/* Breadcrumb Navigation */}
      <div className="border-b border-slate-800/80 bg-[#0a0d14]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-slate-400">
          <nav className="flex items-center gap-2 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
            <button onClick={onBack} className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Games</span>
            </button>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>Games</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-slate-500">{game.genres[0]}</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-purple-400 font-medium truncate max-w-[200px]">{game.title}</span>
          </nav>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md shrink-0"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5 text-purple-400" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Cinematic Hero Header */}
      <header className="relative w-full overflow-hidden border-b border-slate-800 bg-[#080a11]">
        <div className="relative min-h-[380px] lg:min-h-[460px] w-full flex items-end">
          <img
            src={game.heroBanner || game.coverImage}
            alt={game.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover object-center filter brightness-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08090d] via-transparent to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full space-y-4">
            
            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
              <span className="text-emerald-400">{game.releaseStatus}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-200">{game.releaseDate}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{game.developer}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">{game.publisher}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {game.title}
            </h1>

            <p className="text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              {game.tagline}
            </p>

            {/* Quick Fact Ribbon */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div>
                <span className="text-slate-500 font-medium">Platforms: </span>
                <span className="text-slate-200">{game.platforms.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Engine: </span>
                <span className="text-slate-200">{game.engine || 'Proprietary'}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Genres: </span>
                <span className="text-slate-200">{game.genres.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Verified: </span>
                <span className="text-slate-200">{game.lastVerifiedDate}</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container with Sidebar Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Editorial Article Column (8 cols) */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* 1. Game Overview */}
            <section id="overview" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
                Overview & Production Background
              </h2>
              <div className="text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
                <p>{game.overview}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-slate-800/80 bg-[#0e121c] p-4 text-xs">
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider block font-semibold mb-1">Lead Developer</span>
                    <span className="text-white font-medium text-sm">{game.developer}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider block font-semibold mb-1">Global Publisher</span>
                    <span className="text-white font-medium text-sm">{game.publisher}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider block font-semibold mb-1">Target Engine</span>
                    <span className="text-purple-300 font-medium text-sm">{game.engine}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase tracking-wider block font-semibold mb-1">Development Phase</span>
                    <span className="text-emerald-400 font-medium text-sm">{game.releaseStatus} ({game.releaseDate})</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Official Trailer */}
            {game.trailerYoutubeId && (
              <section id="trailer" className="scroll-mt-24 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Play className="h-5 w-5 text-purple-400 fill-purple-400" />
                    <span>Official Cinematic Trailer</span>
                  </h2>
                  <span className="text-xs text-slate-500">Official Studio Asset</span>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${game.trailerYoutubeId}?rel=0&modestbranding=1`}
                    title={`${game.title} Official Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              </section>
            )}

            {/* 3. Full Story and Lore */}
            <section id="story-lore" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-2xl font-bold text-white">Full Game Story & Narrative Lore</h2>
                <p className="text-xs text-slate-400 mt-1">
                  {game.isReleased 
                    ? 'Verified narrative plot summary from official game campaign.' 
                    : 'What we know about the story so far based on confirmed developer statements.'}
                </p>
              </div>

              {/* Confirmed Story Summary */}
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <div className="rounded-xl border border-purple-900/40 bg-purple-950/20 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                    <span>Confirmed Story Outline</span>
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mt-2">{game.storyConfirmed}</p>
                </div>

                {/* Unreleased Speculation vs Confirmed info */}
                {game.storySpeculation && (
                  <div className="rounded-xl border border-slate-800 bg-[#0e121c] p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      <span>Developer Hints & Confirmed Narrative Direction</span>
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mt-2">{game.storySpeculation}</p>
                  </div>
                )}

                {/* Spoiler Gate (For Released Games) */}
                {game.hasSpoilers && game.spoilerContent && (
                  <div className="rounded-xl border border-amber-900/60 bg-amber-950/20 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                        <AlertTriangle className="h-5 w-5 text-amber-400" />
                        <span>Major Campaign Spoilers Warning</span>
                      </div>
                      <button
                        onClick={() => setShowSpoilers(!showSpoilers)}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors"
                      >
                        {showSpoilers ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        <span>{showSpoilers ? 'Hide Spoilers' : 'Reveal Spoilers'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-amber-200/80">
                      The section below reveals climactic plot conclusions, endings, and character revelations.
                    </p>

                    {showSpoilers && (
                      <div className="pt-3 border-t border-amber-800/50 text-slate-300 text-sm leading-relaxed animate-fade-in">
                        {game.spoilerContent}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* 4. Characters & Factions */}
            {game.characters && game.characters.length > 0 && (
              <section id="characters" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span>Main Characters & Key Figures</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {game.characters.map((char) => (
                    <div key={char.id} className="rounded-xl border border-slate-800/80 bg-[#0e121c] p-4 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white text-base">{char.name}</span>
                        <span className="text-purple-400 font-medium">{char.role}</span>
                      </div>
                      {char.faction && (
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider">
                          Faction: {char.faction}
                        </div>
                      )}
                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        {char.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. World & Environment */}
            <section id="world-setting" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Compass className="h-5 w-5 text-purple-400" />
                <span>World-Building, Setting & Atmosphere</span>
              </h2>
              <div className="rounded-xl border border-slate-800 bg-[#0e121c] p-5 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>{game.worldBuilding}</p>
                {game.missionsAndExploration && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400">
                    <strong className="text-white block mb-1">Missions & Traversal:</strong>
                    {game.missionsAndExploration}
                  </div>
                )}
              </div>
            </section>

            {/* 6. Gameplay & Combat Mechanics */}
            <section id="mechanics-combat" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Sword className="h-5 w-5 text-purple-400" />
                <span>Gameplay Mechanics & Combat System</span>
              </h2>
              
              {game.combatSystem && (
                <p className="text-sm text-slate-300 leading-relaxed">
                  {game.combatSystem}
                </p>
              )}

              <div className="space-y-2 pt-2">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400">Key Confirmed Mechanics</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                  {game.gameplayMechanics.map((mech, i) => (
                    <li key={i} className="flex items-start gap-2 rounded-lg border border-slate-800/80 bg-[#0e121c] p-3">
                      <span className="font-mono text-purple-400 font-bold">0{i+1}.</span>
                      <span>{mech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {game.weaponsAndVehicles && (
                <div className="rounded-xl border border-slate-800 bg-[#0e121c] p-4 text-xs text-slate-400 space-y-1">
                  <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px]">Weapons, Vehicles & Gear:</span>
                  <p>{game.weaponsAndVehicles.join(' · ')}</p>
                </div>
              )}
            </section>

            {/* 7. Graphics & Engine Features */}
            <section id="visuals-engine" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span>Graphics, Lighting & Next-Gen PC Tech</span>
              </h2>
              
              <div className="rounded-xl border border-slate-800 bg-[#0e121c] p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-3">
                  <span>Engine Architecture:</span>
                  <span className="text-purple-300 font-bold text-sm">{game.engine}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {game.visualFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 8. PC System Requirements */}
            <section id="system-specs" className="scroll-mt-24 space-y-6">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-purple-400" />
                    <span>PC System Requirements</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Verified minimum and recommended desktop specifications.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Minimum Requirements */}
                <div className="rounded-xl border border-slate-800 bg-[#0c101a] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm font-bold text-slate-200">Minimum Requirements</span>
                    <span className="text-[11px] font-mono text-slate-500">1080p 30-60 FPS Target</span>
                  </div>

                  <dl className="space-y-2.5 text-xs">
                    <div>
                      <dt className="text-slate-500 font-medium">Operating System</dt>
                      <dd className="text-white font-mono mt-0.5">{game.minRequirements.os}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 font-medium">Processor (CPU)</dt>
                      <dd className="text-white font-mono mt-0.5">{game.minRequirements.cpu}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 font-medium">Graphics Card (GPU)</dt>
                      <dd className="text-white font-mono mt-0.5">{game.minRequirements.gpu}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <dt className="text-slate-500 font-medium">System RAM</dt>
                        <dd className="text-white font-mono mt-0.5">{game.minRequirements.ram}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500 font-medium">Video Memory (VRAM)</dt>
                        <dd className="text-white font-mono mt-0.5">{game.minRequirements.vram}</dd>
                      </div>
                    </div>
                    <div>
                      <dt className="text-slate-500 font-medium">Storage</dt>
                      <dd className="text-white font-mono mt-0.5">{game.minRequirements.storage}</dd>
                    </div>
                    {game.minRequirements.notes && (
                      <div className="pt-2 text-[11px] text-amber-400/90 italic">
                        * {game.minRequirements.notes}
                      </div>
                    )}
                  </dl>
                </div>

                {/* Recommended Requirements */}
                <div className="rounded-xl border border-purple-800/40 bg-[#101422] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-900/50 pb-2">
                    <span className="text-sm font-bold text-purple-300">Recommended Specifications</span>
                    <span className="text-[11px] font-mono text-purple-400">1440p / 4K Ultra Settings</span>
                  </div>

                  <dl className="space-y-2.5 text-xs">
                    <div>
                      <dt className="text-slate-400 font-medium">Operating System</dt>
                      <dd className="text-white font-mono mt-0.5">{game.recommendedRequirements.os}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 font-medium">Processor (CPU)</dt>
                      <dd className="text-white font-mono mt-0.5">{game.recommendedRequirements.cpu}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 font-medium">Graphics Card (GPU)</dt>
                      <dd className="text-white font-mono mt-0.5">{game.recommendedRequirements.gpu}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <dt className="text-slate-400 font-medium">System RAM</dt>
                        <dd className="text-white font-mono mt-0.5">{game.recommendedRequirements.ram}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-400 font-medium">Video Memory (VRAM)</dt>
                        <dd className="text-white font-mono mt-0.5">{game.recommendedRequirements.vram}</dd>
                      </div>
                    </div>
                    <div>
                      <dt className="text-slate-400 font-medium">Storage</dt>
                      <dd className="text-white font-mono mt-0.5">{game.recommendedRequirements.storage}</dd>
                    </div>
                    {game.recommendedRequirements.notes && (
                      <div className="pt-2 text-[11px] text-purple-300/90 italic">
                        * {game.recommendedRequirements.notes}
                      </div>
                    )}
                  </dl>
                </div>

              </div>
            </section>

            {/* 9. Screenshots Gallery */}
            <section id="screenshots" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
                Official Screenshots & Artwork
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {game.screenshots.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedScreenshot(img)}
                    className="group cursor-pointer relative aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-900"
                  >
                    <img
                      src={img}
                      alt={`${game.title} visual ${i+1}`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-semibold text-white bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
                        View Fullscreen
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 10. Official Updates & Developer News */}
            <section id="updates" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3">
                Latest Official Updates & Studio Statements
              </h2>

              <div className="space-y-3">
                {game.recentUpdates.map((update, i) => (
                  <div key={i} className="rounded-xl border border-slate-800 bg-[#0e121c] p-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="text-purple-400 font-semibold">{update.title}</span>
                      <span>{update.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {update.summary}
                    </p>
                    <div className="text-[11px] text-slate-500 pt-1">
                      Source: {update.source}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sources & Citations */}
            <div className="rounded-xl border border-slate-800/80 bg-[#0a0d14] p-4 text-xs text-slate-500 space-y-2">
              <span className="font-semibold text-slate-400 uppercase tracking-wider block">Official Sources & Attributions:</span>
              <ul className="space-y-1">
                {game.sources.map((src, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <ExternalLink className="h-3 w-3 text-purple-400" />
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 underline">
                      {src.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </main>

          {/* Sticky Sidebar Navigation (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Table of Contents Box */}
            <div className="sticky top-20 space-y-6">
              
              <div className="rounded-xl border border-slate-800/80 bg-[#0c101a] p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-400" />
                  <span>Table of Contents</span>
                </h3>
                <nav className="space-y-1 text-xs font-medium">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left py-1.5 px-2.5 rounded-md transition-colors ${
                        activeSection === item.id
                          ? 'bg-purple-900/40 text-purple-300 font-semibold border-l-2 border-purple-500'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Related Games Box */}
              {relatedGames.length > 0 && (
                <div className="rounded-xl border border-slate-800/80 bg-[#0c101a] p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Related PC Games</h3>
                  <div className="space-y-3">
                    {relatedGames.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onSelectGame(rel)}
                        className="group cursor-pointer flex items-center gap-3 rounded-lg p-1.5 hover:bg-slate-800/60 transition-colors"
                      >
                        <img
                          src={rel.coverImage}
                          alt={rel.title}
                          referrerPolicy="no-referrer"
                          className="h-12 w-16 object-cover rounded bg-slate-900 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-white group-hover:text-purple-300 truncate block">
                            {rel.title}
                          </span>
                          <span className="text-[11px] text-slate-500 block">{rel.releaseDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="rounded-xl border border-slate-800/80 bg-[#0c101a] p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recommended Editorial</h3>
                  <div className="space-y-2.5">
                    {relatedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => onSelectNews(art)}
                        className="group cursor-pointer p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-colors"
                      >
                        <span className="text-xs font-bold text-white group-hover:text-purple-300 line-clamp-2">
                          {art.title}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-1">{art.readTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>

        </div>
      </div>

      {/* Fullscreen Screenshot Modal */}
      {selectedScreenshot && (
        <div
          onClick={() => setSelectedScreenshot(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-pointer animate-fade-in"
        >
          <img
            src={selectedScreenshot}
            alt="Fullscreen preview"
            referrerPolicy="no-referrer"
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}

    </article>
  );
};
