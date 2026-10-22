import React, { useState } from 'react';
import { Game, NewsArticle, ReleaseStatus, GameCategory } from '../types';
import { storageService } from '../services/storageService';
import { 
  Plus, Trash2, Edit3, Save, X, RotateCcw, Download, Upload, 
  ShieldCheck, Check, AlertCircle, Database, Film, FileText, CheckCircle2 
} from 'lucide-react';

interface AdminCMSProps {
  games: Game[];
  news: NewsArticle[];
  onRefresh: () => void;
  onExit: () => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  games,
  news,
  onRefresh,
  onExit
}) => {
  const [activeTab, setActiveTab] = useState<'games' | 'news' | 'database'>('games');
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [isCreatingNews, setIsCreatingNews] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Game Form Handler
  const handleSaveGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGame) return;

    if (isCreatingGame) {
      storageService.addGame(editingGame);
      showNotification(`Added new game: ${editingGame.title}`);
    } else {
      storageService.updateGame(editingGame.id, editingGame);
      showNotification(`Updated game: ${editingGame.title}`);
    }

    setEditingGame(null);
    setIsCreatingGame(false);
    onRefresh();
  };

  const handleDeleteGame = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      storageService.deleteGame(id);
      showNotification(`Deleted ${title}`);
      onRefresh();
    }
  };

  // News Form Handler
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;

    if (isCreatingNews) {
      storageService.addNews(editingNews);
      showNotification(`Published news: ${editingNews.title}`);
    } else {
      storageService.updateNews(editingNews.id, editingNews);
      showNotification(`Updated news: ${editingNews.title}`);
    }

    setEditingNews(null);
    setIsCreatingNews(false);
    onRefresh();
  };

  const handleDeleteNews = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete article "${title}"?`)) {
      storageService.deleteNews(id);
      showNotification(`Deleted article`);
      onRefresh();
    }
  };

  // Database Export & Import
  const handleExport = () => {
    const jsonStr = storageService.exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nextlevel-gaming-db-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showNotification('Database exported successfully.');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = storageService.importData(importJsonText);
    if (success) {
      showNotification('Database imported successfully!');
      setImportJsonText('');
      onRefresh();
    } else {
      alert('Failed to parse database JSON. Ensure the structure contains "games" and "news" arrays.');
    }
  };

  const handleReset = () => {
    if (confirm('Reset database to default verified seed data? Any custom games/articles will be replaced.')) {
      storageService.resetToDefaults();
      showNotification('Database restored to default verified state.');
      onRefresh();
    }
  };

  const startNewGame = () => {
    const template: Game = {
      id: '',
      slug: 'new-pc-game',
      title: 'New Upcoming PC Game',
      tagline: 'Tagline describing the game experience.',
      coverImage: '/src/assets/images/hero_vice_overdrive_1792661617541.jpg',
      heroBanner: '/src/assets/images/hero_vice_overdrive_1792661617541.jpg',
      releaseDate: '2026',
      releaseDateSortable: '2026-12-01',
      releaseStatus: 'Estimated',
      developer: 'Independent Studio',
      publisher: 'Global Interactive',
      platforms: ['PC (Steam)', 'Epic Games Store'],
      genres: ['Action and Adventure', 'RPG'],
      engine: 'Unreal Engine 5.4',
      trailerYoutubeId: 'QdBZY2fkU-0',
      overview: 'Overview of the upcoming PC title...',
      storyConfirmed: 'Confirmed story details and background...',
      storySpeculation: 'Community theories and speculation...',
      isReleased: false,
      hasSpoilers: false,
      worldBuilding: 'Vast detailed setting...',
      characters: [
        { id: '1', name: 'Protagonist', role: 'Main Character', description: 'Hero of the journey.' }
      ],
      gameplayMechanics: ['Real-time tactical combat', 'Open world exploration'],
      missionsAndExploration: 'Nonlinear progression across open world sectors.',
      visualFeatures: ['DirectX 12 Ultimate', 'Ray Tracing', 'DLSS 3.7'],
      combatSystem: 'Dynamic combat mechanics.',
      weaponsAndVehicles: ['Modular weapons system'],
      minRequirements: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i5-8400 or AMD Ryzen 5 2600',
        gpu: 'NVIDIA GeForce GTX 1660 Super or AMD RX 5600 XT',
        ram: '16 GB',
        vram: '6 GB',
        storage: '80 GB SSD space'
      },
      recommendedRequirements: {
        os: 'Windows 11 64-bit',
        cpu: 'Intel Core i7-12700K or AMD Ryzen 7 5800X3D',
        gpu: 'NVIDIA GeForce RTX 4070 or AMD RX 7800 XT',
        ram: '32 GB',
        vram: '12 GB',
        storage: '80 GB NVMe SSD space'
      },
      screenshots: ['/src/assets/images/hero_vice_overdrive_1792661617541.jpg'],
      recentUpdates: [
        { date: 'Recent', title: 'Studio Update', summary: 'Production milestone reached.', source: 'Official Site' }
      ],
      sources: [{ title: 'Studio Press Page', url: 'https://example.com' }],
      lastVerifiedDate: 'October 2026',
      isFeatured: false,
      isTrending: false,
      rankingScore: 80
    };
    setEditingGame(template);
    setIsCreatingGame(true);
  };

  const startNewNews = () => {
    const template: NewsArticle = {
      id: '',
      slug: 'new-editorial-article',
      title: 'Breaking: Major PC Gaming Announcement',
      teaser: 'Summary of the recent news announcement and what it means for PC players.',
      content: `### Industry Milestone\n\nFull article contents and verified studio quotes go here.\n\n### Technical Implications\n\nHardware benchmarks and engine updates.`,
      author: {
        name: 'Staff Editor',
        role: 'Senior Tech Reporter'
      },
      publishedAt: 'Today',
      category: 'Breaking News',
      readTime: '4 min read',
      coverImage: '/src/assets/images/hero_cyber_orion_1792661614409.jpg',
      tags: ['PC Gaming', 'Hardware', 'News'],
      keyTakeaways: [
        'Confirmed release timing announced by publisher.',
        'PC specific features detailed in developer blog.'
      ],
      isFeatured: false
    };
    setEditingNews(template);
    setIsCreatingNews(true);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-200 pb-20">
      
      {/* Top Banner */}
      <div className="border-b border-slate-800 bg-[#0c101a] sticky top-14 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white font-bold text-xs">
              CMS
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">NextLevel Editorial CMS & Database</h1>
              <span className="text-[11px] text-slate-400">Content Management & Live Storage</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
            >
              Exit to Live Site
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="h-4 w-4" />
          <span>{notification}</span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-800/80 bg-[#0e121c] p-4">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">Total Games</span>
            <span className="text-2xl font-bold text-white mt-1 block font-mono">{games.length}</span>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-[#0e121c] p-4">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">News Articles</span>
            <span className="text-2xl font-bold text-white mt-1 block font-mono">{news.length}</span>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-[#0e121c] p-4">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">Featured Carousel</span>
            <span className="text-2xl font-bold text-purple-400 mt-1 block font-mono">
              {games.filter((g) => g.isFeatured).length}
            </span>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-[#0e121c] p-4">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">Confirmed Launches</span>
            <span className="text-2xl font-bold text-emerald-400 mt-1 block font-mono">
              {games.filter((g) => g.releaseStatus === 'Confirmed').length}
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => { setActiveTab('games'); setEditingGame(null); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'games'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Manage Games & Lore ({games.length})
          </button>
          <button
            onClick={() => { setActiveTab('news'); setEditingNews(null); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'news'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Manage News & Articles ({news.length})
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'database'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Backup & Database JSON
          </button>
        </div>

        {/* TAB 1: GAMES MANAGEMENT */}
        {activeTab === 'games' && (
          <div className="space-y-6">
            {!editingGame ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Database Games & Lore</h2>
                  <button
                    onClick={startNewGame}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New PC Game</span>
                  </button>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#0e121c] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#121624] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                        <tr>
                          <th className="py-3 px-4">Game Title</th>
                          <th className="py-3 px-4">Release Target</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Developer</th>
                          <th className="py-3 px-4">Featured</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {games.map((game) => (
                          <tr key={game.id} className="hover:bg-slate-900/40">
                            <td className="py-3 px-4 font-bold text-white flex items-center gap-3">
                              <img
                                src={game.coverImage}
                                alt={game.title}
                                referrerPolicy="no-referrer"
                                className="h-8 w-12 rounded object-cover bg-slate-800"
                              />
                              <span>{game.title}</span>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-300">{game.releaseDate}</td>
                            <td className="py-3 px-4">
                              <span className="text-purple-300 font-semibold">{game.releaseStatus}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-400">{game.developer}</td>
                            <td className="py-3 px-4">
                              {game.isFeatured ? (
                                <span className="text-emerald-400 font-semibold">Featured</span>
                              ) : (
                                <span className="text-slate-600">Standard</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => { setEditingGame(game); setIsCreatingGame(false); }}
                                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                                title="Edit"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteGame(game.id, game.title)}
                                className="p-1.5 rounded hover:bg-rose-950/40 text-rose-400 hover:text-rose-300"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              /* Game Edit/Create Form */
              <form onSubmit={handleSaveGame} className="rounded-xl border border-slate-800 bg-[#0e121c] p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h2 className="text-lg font-bold text-white">
                    {isCreatingGame ? 'Add New Game to Platform' : `Edit Game: ${editingGame.title}`}
                  </h2>
                  <button
                    type="button"
                    onClick={() => { setEditingGame(null); setIsCreatingGame(false); }}
                    className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Game Title</label>
                    <input
                      type="text"
                      required
                      value={editingGame.title}
                      onChange={(e) => setEditingGame({ ...editingGame, title: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Slug (URL friendly)</label>
                    <input
                      type="text"
                      required
                      value={editingGame.slug}
                      onChange={(e) => setEditingGame({ ...editingGame, slug: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Tagline / Teaser</label>
                    <input
                      type="text"
                      value={editingGame.tagline}
                      onChange={(e) => setEditingGame({ ...editingGame, tagline: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Release Date String</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. November 2025, Q2 2026, Release Date TBA"
                      value={editingGame.releaseDate}
                      onChange={(e) => setEditingGame({ ...editingGame, releaseDate: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Release Status</label>
                    <select
                      value={editingGame.releaseStatus}
                      onChange={(e) => setEditingGame({ ...editingGame, releaseStatus: e.target.value as ReleaseStatus })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Estimated">Estimated</option>
                      <option value="Delayed">Delayed</option>
                      <option value="TBA">TBA</option>
                      <option value="Released">Released</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Lead Developer</label>
                    <input
                      type="text"
                      required
                      value={editingGame.developer}
                      onChange={(e) => setEditingGame({ ...editingGame, developer: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Publisher</label>
                    <input
                      type="text"
                      required
                      value={editingGame.publisher}
                      onChange={(e) => setEditingGame({ ...editingGame, publisher: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Engine</label>
                    <input
                      type="text"
                      value={editingGame.engine}
                      onChange={(e) => setEditingGame({ ...editingGame, engine: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Cover Image URL</label>
                    <input
                      type="text"
                      value={editingGame.coverImage}
                      onChange={(e) => setEditingGame({ ...editingGame, coverImage: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">YouTube Trailer Video ID</label>
                    <input
                      type="text"
                      placeholder="e.g. QdBZY2fkU-0"
                      value={editingGame.trailerYoutubeId}
                      onChange={(e) => setEditingGame({ ...editingGame, trailerYoutubeId: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                {/* Story and Lore Editors */}
                <div className="space-y-4 pt-4 border-t border-slate-800 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Overview Description</label>
                    <textarea
                      rows={3}
                      value={editingGame.overview}
                      onChange={(e) => setEditingGame({ ...editingGame, overview: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Confirmed Story and Lore</label>
                    <textarea
                      rows={4}
                      value={editingGame.storyConfirmed}
                      onChange={(e) => setEditingGame({ ...editingGame, storyConfirmed: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">World-Building & Environment Details</label>
                    <textarea
                      rows={3}
                      value={editingGame.worldBuilding}
                      onChange={(e) => setEditingGame({ ...editingGame, worldBuilding: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  {/* System Requirements Edit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-800 bg-[#0c0f18]">
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-200">Minimum Hardware Requirements</h4>
                      <input
                        type="text"
                        placeholder="CPU"
                        value={editingGame.minRequirements.cpu}
                        onChange={(e) => setEditingGame({
                          ...editingGame,
                          minRequirements: { ...editingGame.minRequirements, cpu: e.target.value }
                        })}
                        className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-white"
                      />
                      <input
                        type="text"
                        placeholder="GPU"
                        value={editingGame.minRequirements.gpu}
                        onChange={(e) => setEditingGame({
                          ...editingGame,
                          minRequirements: { ...editingGame.minRequirements, gpu: e.target.value }
                        })}
                        className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-white"
                      />
                      <input
                        type="text"
                        placeholder="RAM (e.g. 16 GB)"
                        value={editingGame.minRequirements.ram}
                        onChange={(e) => setEditingGame({
                          ...editingGame,
                          minRequirements: { ...editingGame.minRequirements, ram: e.target.value }
                        })}
                        className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-purple-300">Recommended Hardware Requirements</h4>
                      <input
                        type="text"
                        placeholder="CPU"
                        value={editingGame.recommendedRequirements.cpu}
                        onChange={(e) => setEditingGame({
                          ...editingGame,
                          recommendedRequirements: { ...editingGame.recommendedRequirements, cpu: e.target.value }
                        })}
                        className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-white"
                      />
                      <input
                        type="text"
                        placeholder="GPU"
                        value={editingGame.recommendedRequirements.gpu}
                        onChange={(e) => setEditingGame({
                          ...editingGame,
                          recommendedRequirements: { ...editingGame.recommendedRequirements, gpu: e.target.value }
                        })}
                        className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-white"
                      />
                      <input
                        type="text"
                        placeholder="RAM (e.g. 32 GB)"
                        value={editingGame.recommendedRequirements.ram}
                        onChange={(e) => setEditingGame({
                          ...editingGame,
                          recommendedRequirements: { ...editingGame.recommendedRequirements, ram: e.target.value }
                        })}
                        className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-white"
                      />
                    </div>
                  </div>

                  {/* Featured / Trending toggles */}
                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingGame.isFeatured}
                        onChange={(e) => setEditingGame({ ...editingGame, isFeatured: e.target.checked })}
                        className="rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-0"
                      />
                      <span className="font-semibold text-slate-300">Feature in Homepage Hero Carousel</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingGame.isTrending}
                        onChange={(e) => setEditingGame({ ...editingGame, isTrending: e.target.checked })}
                        className="rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-0"
                      />
                      <span className="font-semibold text-slate-300">Highlight in Trending Rankings</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => { setEditingGame(null); setIsCreatingGame(false); }}
                    className="px-4 py-2 border border-slate-800 hover:bg-slate-800 text-xs text-slate-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white rounded-lg flex items-center gap-1.5"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save to Live Platform</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: NEWS MANAGEMENT */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {!editingNews ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Editorial News & Analysis</h2>
                  <button
                    onClick={startNewNews}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create News Article</span>
                  </button>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#0e121c] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#121624] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                        <tr>
                          <th className="py-3 px-4">Headline</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Author</th>
                          <th className="py-3 px-4">Published</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {news.map((art) => (
                          <tr key={art.id} className="hover:bg-slate-900/40">
                            <td className="py-3 px-4 font-bold text-white flex items-center gap-3">
                              <img
                                src={art.coverImage}
                                alt={art.title}
                                referrerPolicy="no-referrer"
                                className="h-8 w-12 rounded object-cover bg-slate-800"
                              />
                              <span className="line-clamp-1 max-w-md">{art.title}</span>
                            </td>
                            <td className="py-3 px-4 text-purple-400">{art.category}</td>
                            <td className="py-3 px-4 text-slate-300">{art.author.name}</td>
                            <td className="py-3 px-4 text-slate-400">{art.publishedAt}</td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => { setEditingNews(art); setIsCreatingNews(false); }}
                                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                                title="Edit Article"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteNews(art.id, art.title)}
                                className="p-1.5 rounded hover:bg-rose-950/40 text-rose-400 hover:text-rose-300"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              /* News Article Form */
              <form onSubmit={handleSaveNews} className="rounded-xl border border-slate-800 bg-[#0e121c] p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h2 className="text-lg font-bold text-white">
                    {isCreatingNews ? 'Write Editorial Article' : `Edit Article: ${editingNews.title}`}
                  </h2>
                  <button
                    type="button"
                    onClick={() => { setEditingNews(null); setIsCreatingNews(false); }}
                    className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Article Headline</label>
                    <input
                      type="text"
                      required
                      value={editingNews.title}
                      onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Category</label>
                    <select
                      value={editingNews.category}
                      onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value as any })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    >
                      <option value="Breaking News">Breaking News</option>
                      <option value="Hardware & Tech">Hardware & Tech</option>
                      <option value="Developer Interview">Developer Interview</option>
                      <option value="Game Preview">Game Preview</option>
                      <option value="Analysis">Analysis</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Author Name</label>
                    <input
                      type="text"
                      required
                      value={editingNews.author.name}
                      onChange={(e) => setEditingNews({
                        ...editingNews,
                        author: { ...editingNews.author, name: e.target.value }
                      })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Cover Image URL</label>
                    <input
                      type="text"
                      value={editingNews.coverImage}
                      onChange={(e) => setEditingNews({ ...editingNews, coverImage: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Deck / Lead Teaser</label>
                    <input
                      type="text"
                      required
                      value={editingNews.teaser}
                      onChange={(e) => setEditingNews({ ...editingNews, teaser: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Article Content (Markdown sections with ###)</label>
                    <textarea
                      rows={8}
                      required
                      value={editingNews.content}
                      onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => { setEditingNews(null); setIsCreatingNews(false); }}
                    className="px-4 py-2 border border-slate-800 hover:bg-slate-800 text-xs text-slate-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white rounded-lg flex items-center gap-1.5"
                  >
                    <Save className="h-4 w-4" />
                    <span>Publish Article</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: BACKUP & DATABASE JSON */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-800 bg-[#0e121c] p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-400" />
                <span>Persistent Database Operations</span>
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                The database is persisted in browser storage and can be backed up as a JSON file or imported on any device.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 border border-slate-700"
                >
                  <Download className="h-4 w-4 text-purple-400" />
                  <span>Export Database JSON</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 text-xs font-semibold rounded-lg flex items-center gap-2 border border-rose-800/50"
                >
                  <RotateCcw className="h-4 w-4 text-rose-400" />
                  <span>Restore Verified Default Data</span>
                </button>
              </div>
            </div>

            {/* JSON Import Box */}
            <div className="rounded-xl border border-slate-800 bg-[#0e121c] p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Upload className="h-4 w-4 text-purple-400" />
                <span>Import Database JSON</span>
              </h3>
              <textarea
                rows={5}
                placeholder="Paste valid NextLevel Gaming JSON database export here..."
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs font-mono text-slate-300 focus:border-purple-500 focus:outline-none"
              />
              <button
                onClick={handleImport}
                disabled={!importJsonText.trim()}
                className="px-4 py-2 bg-purple-600 disabled:opacity-50 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg"
              >
                Execute Import & Sync
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
