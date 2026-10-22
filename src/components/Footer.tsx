import React from 'react';
import { GameCategory } from '../types';
import { ShieldCheck, FileCode, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: GameCategory) => void;
  onOpenSeo: () => void;
  onOpenAdmin: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSeo,
  onOpenAdmin,
  onScrollToTop
}) => {
  const categories: GameCategory[] = [
    'Open World',
    'Action and Adventure',
    'RPG',
    'FPS and Tactical Shooter',
    'Survival and Horror',
    'Soulslike',
    'Sci-Fi',
    'Fantasy'
  ];

  return (
    <footer className="border-t border-slate-800/80 bg-[#06080d] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 text-white font-black text-xs">
                NL
              </span>
              <span className="text-base font-extrabold text-white tracking-tight">NextLevel Gaming</span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Discover the next generation of PC gaming. In-depth game lore, verified release calendar schedules, official trailer archives, and hardware requirements.
            </p>

            <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-purple-400 shrink-0" />
              <span>Independent editorial coverage. Confirmed facts strictly separated from community theories.</span>
            </div>
          </div>

          {/* Gaming Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Popular Genres</h3>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-purple-400 transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Platform & Tools</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenSeo} className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
                  <FileCode className="h-3.5 w-3.5" />
                  <span>Sitemap & Robots.txt</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-purple-400 transition-colors">
                  Editorial CMS Admin
                </button>
              </li>
              <li>
                <span className="text-slate-500">PC Hardware Benchmarking</span>
              </li>
              <li>
                <span className="text-slate-500">Release Verification Log</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} NextLevel Gaming. All game titles, trademarks, and registered marks belong to their respective publishers and developers.
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
