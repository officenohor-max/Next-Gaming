import React, { useState } from 'react';
import { Game } from '../types';
import { Cpu, Monitor, HardDrive, CheckCircle2, AlertTriangle, XCircle, Sparkles, SlidersHorizontal } from 'lucide-react';

interface SystemRequirementsCheckerProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
}

export const SystemRequirementsChecker: React.FC<SystemRequirementsCheckerProps> = ({
  games,
  onSelectGame
}) => {
  const [selectedGameId, setSelectedGameId] = useState<string>(games[0]?.id || '');
  const [userGpuTier, setUserGpuTier] = useState<number>(3); // 1 = entry, 2 = mid, 3 = high, 4 = ultra
  const [userRam, setUserRam] = useState<number>(16); // in GB
  const [userStorage, setUserStorage] = useState<string>('nvme'); // 'hdd' | 'sata' | 'nvme'

  const activeGame = games.find((g) => g.id === selectedGameId) || games[0];

  const evaluatePerformance = (game: Game) => {
    let score = 0;
    const notes: string[] = [];

    // GPU evaluation
    if (userGpuTier === 4) {
      score += 3;
      notes.push('GPU is capable of 1440p / 4K Ultra with full Ray Tracing / Path Tracing.');
    } else if (userGpuTier === 3) {
      score += 2;
      notes.push('GPU meets recommended specifications for 1440p High 60+ FPS.');
    } else if (userGpuTier === 2) {
      score += 1;
      notes.push('GPU satisfies 1080p medium settings, DLSS/FSR upscaling advised.');
    } else {
      if (game.slug === 'grand-theft-auto-vi' || game.slug === 'cyberpunk-project-orion') {
        notes.push('Entry-level GPU will struggle with heavy volumetric geometry and path tracing.');
      } else {
        notes.push('Capable of running at minimum settings 1080p 30-45 FPS.');
      }
    }

    // RAM evaluation
    if (userRam >= 32) {
      score += 2;
      notes.push('32GB+ RAM provides optimal headroom without pagefile stutter.');
    } else if (userRam >= 16) {
      score += 1;
      notes.push('16GB meets baseline requirements for modern AAA gaming.');
    } else {
      notes.push('8GB RAM is below recommended specifications and may cause texture hitching.');
    }

    // Storage evaluation
    if (userStorage === 'nvme') {
      score += 2;
      notes.push('Fast NVMe storage satisfies DirectStorage and high-velocity asset streaming.');
    } else if (userStorage === 'sata') {
      score += 1;
      if (game.minRequirements.notes?.includes('NVMe')) {
        notes.push('SATA SSD may lead to asset pop-in during high-speed vehicle or flight traversal.');
      }
    } else {
      notes.push('Mechanical HDD is incompatible with modern asset streaming architectures.');
    }

    let verdict = 'Compatible: High-End Ultra';
    let statusClass = 'text-purple-400 border-purple-500/50 bg-purple-950/20';

    if (score >= 6) {
      verdict = 'Optimal: Recommended Ultra Ready (60+ FPS)';
      statusClass = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20';
    } else if (score >= 4) {
      verdict = 'Playable: Medium-High Target (1080p / 1440p)';
      statusClass = 'text-blue-400 border-blue-500/40 bg-blue-950/20';
    } else {
      verdict = 'Entry Level: Low-Medium Settings with Upscaling';
      statusClass = 'text-amber-400 border-amber-500/40 bg-amber-950/20';
    }

    return { verdict, statusClass, notes };
  };

  const result = activeGame ? evaluatePerformance(activeGame) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
          <Cpu className="h-8 w-8 text-purple-400" />
          <span>PC Hardware & System Requirements Benchmark</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
          Match your desktop specifications against verified minimum and recommended PC requirements for upcoming AAA games.
        </p>
      </div>

      {/* Hardware Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Your PC Specs Rig Configurator (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800/80 bg-[#0e121c] p-5 sm:p-6 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <SlidersHorizontal className="h-4 w-4 text-purple-400" />
            <span>Select Your PC Rig Configuration</span>
          </h2>

          {/* Game Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Game</label>
            <select
              value={selectedGameId}
              onChange={(e) => setSelectedGameId(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-[#080a11] px-3 py-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
            >
              {games.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title} ({g.releaseStatus})
                </option>
              ))}
            </select>
          </div>

          {/* GPU Class */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Graphics Card (GPU Tier)</label>
            <select
              value={userGpuTier}
              onChange={(e) => setUserGpuTier(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-800 bg-[#080a11] px-3 py-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
            >
              <option value={1}>Tier 1: GTX 1060 / GTX 1660 / RX 580 (6GB)</option>
              <option value={2}>Tier 2: RTX 2060 / RTX 3060 / RX 6600 (8-12GB)</option>
              <option value={3}>Tier 3: RTX 4070 / RTX 3080 / RX 7800 XT (12-16GB)</option>
              <option value={4}>Tier 4: RTX 4080 / RTX 4090 / RX 7900 XTX (16-24GB)</option>
            </select>
          </div>

          {/* RAM */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">System Memory (RAM)</label>
            <div className="grid grid-cols-4 gap-2">
              {[8, 16, 32, 64].map((gb) => (
                <button
                  key={gb}
                  onClick={() => setUserRam(gb)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    userRam === gb
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {gb} GB
                </button>
              ))}
            </div>
          </div>

          {/* Storage Device */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Primary Storage Type</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'hdd', label: 'HDD (7200 RPM)' },
                { id: 'sata', label: 'SATA SSD' },
                { id: 'nvme', label: 'NVMe Gen4 SSD' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setUserStorage(st.id)}
                  className={`py-2 px-2 text-center rounded-lg text-xs font-semibold transition-all ${
                    userStorage === st.id
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Compatibility Assessment (7 cols) */}
        {activeGame && result && (
          <div className="lg:col-span-7 space-y-6">
            
            {/* Verdict Box */}
            <div className={`rounded-xl border p-5 sm:p-6 space-y-3 ${result.statusClass}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-bold">Benchmark Assessment</span>
                <span className="text-xs font-semibold">{activeGame.title}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold">{result.verdict}</h2>
              <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                {result.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-current shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Target Specs Breakdown */}
            <div className="rounded-xl border border-slate-800 bg-[#0e121c] p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
                <span>Official Studio Specifications: {activeGame.title}</span>
                <button
                  onClick={() => onSelectGame(activeGame)}
                  className="text-xs text-purple-400 hover:text-purple-300 underline font-normal"
                >
                  View Full Game Lore
                </button>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <span className="font-bold text-slate-300 block">Minimum Spec</span>
                  <div className="text-slate-400 space-y-1">
                    <div>CPU: <span className="text-slate-200">{activeGame.minRequirements?.cpu || 'Intel Core i5 / AMD Ryzen 5'}</span></div>
                    <div>GPU: <span className="text-slate-200">{activeGame.minRequirements?.gpu || 'GTX 1060 / RX 580'}</span></div>
                    <div>RAM: <span className="text-slate-200">{activeGame.minRequirements?.ram || '16 GB'}</span></div>
                    <div>Storage: <span className="text-slate-200">{activeGame.minRequirements?.storage || '100 GB SSD'}</span></div>
                  </div>
                </div>

                <div className="space-y-2 p-3 rounded-lg bg-purple-950/20 border border-purple-900/40">
                  <span className="font-bold text-purple-300 block">Recommended Spec</span>
                  <div className="text-slate-400 space-y-1">
                    <div>CPU: <span className="text-slate-200">{activeGame.recommendedRequirements?.cpu || 'Intel Core i7 / AMD Ryzen 7'}</span></div>
                    <div>GPU: <span className="text-slate-200">{activeGame.recommendedRequirements?.gpu || 'RTX 4070 / RX 7800 XT'}</span></div>
                    <div>RAM: <span className="text-slate-200">{activeGame.recommendedRequirements?.ram || '32 GB'}</span></div>
                    <div>Storage: <span className="text-slate-200">{activeGame.recommendedRequirements?.storage || '100 GB NVMe SSD'}</span></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
